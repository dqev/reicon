#!/usr/bin/env python3
"""
build_kotlin.py — Generates Jetpack Compose ImageVectors from data/icon-data.json

Usage:
  python3 tool/build_kotlin.py [--icons home,search,heart,chat,send2] [--out library/src/main/kotlin/dev/reicon]

Output (per icon, both weights in one file — mirrors icon.weights in icon-data.json):
  library/src/main/kotlin/dev/reicon/Home.kt   # object Home { val Outline; val Filled }
  library/src/main/kotlin/dev/reicon/Reicon.kt # ReiconWeight enum + ReiconIcon composable (written once)

Mapping:
  fill="currentColor"/"white"/missing -> SolidColor(Color.Black) (tintable via Icon(tint=...))
  fill="none"                          -> fill = null
  stroke="currentColor"                -> stroke = SolidColor(Color.Black)
  stroke-width/cap/join/miterlimit     -> strokeLineWidth/Cap/Join/Miter
  fill-rule="evenodd"                  -> PathFillType.EvenOdd else NonZero
  clip-rule is ignored (no clipPath in ImageVector; Reicon only uses it == fill-rule)
  rect/circle/ellipse/line/polyline/polygon are rewritten as path data;
  rect transforms are baked into coordinates (translate + rotate only)
  opacity multiplies fillAlpha/strokeAlpha
  <g> is transparent; <defs>/<clipPath> are skipped (dataset clips are all
  viewport-sized rects, i.e. no-ops)
  stroke-dasharray is unsupported by ImageVector: warned, emitted solid
"""

import argparse
import json
import os
import re
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)
DATA_PATH = os.path.join(ROOT, "data", "icon-data.json")
TOOL_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_OUT = os.path.join(
    os.path.dirname(TOOL_DIR), "library", "src", "main", "kotlin", "dev", "reicon"
)


def to_pascal(kebab: str) -> str:
    parts = re.split(r"[^a-zA-Z0-9]+", kebab)
    out = "".join(p[:1].upper() + p[1:] for p in parts if p)
    if out and out[0].isdigit():
        out = "I" + out
    return out or "Icon"


def fmt(n: float) -> str:
    s = f"{n:.4f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def rect_d(x: float, y: float, w: float, h: float, rx: float, ry: float) -> str:
    rx = min(rx, w / 2)
    ry = min(ry, h / 2)
    x2, y2 = x + w, y + h
    return (
        f"M{fmt(x + rx)},{fmt(y)}"
        f"H{fmt(x + w - rx)}Q{fmt(x2)},{fmt(y)} {fmt(x2)},{fmt(y + ry)}"
        f"V{fmt(y + h - ry)}Q{fmt(x2)},{fmt(y2)} {fmt(x + w - rx)},{fmt(y2)}"
        f"H{fmt(x + rx)}Q{fmt(x)},{fmt(y2)} {fmt(x)},{fmt(y + h - ry)}"
        f"V{fmt(y + ry)}Q{fmt(x)},{fmt(y)} {fmt(x + rx)},{fmt(y)}Z"
    )


def bake_rect_transform(a: dict) -> tuple:
    import math

    x, y = float(a.get("x", 0)), float(a.get("y", 0))
    w, h = float(a.get("width", 0)), float(a.get("height", 0))
    rx = float(a.get("rx", 0))
    ry = float(a.get("ry", rx))
    m = (1.0, 0.0, 0.0, 1.0, 0.0, 0.0)

    def compose(o, acc):
        return (
            o[0] * acc[0] + o[2] * acc[1],
            o[1] * acc[0] + o[3] * acc[1],
            o[0] * acc[2] + o[2] * acc[3],
            o[1] * acc[2] + o[3] * acc[3],
            o[0] * acc[4] + o[2] * acc[5] + o[4],
            o[1] * acc[4] + o[3] * acc[5] + o[5],
        )

    for op, raw in re.findall(r"(\w+)\(([^)]*)\)", a.get("transform", "")):
        nums = [float(n) for n in re.split(r"[,\s]+", raw.strip()) if n != ""]
        if op == "translate":
            tx = nums[0]
            ty = nums[1] if len(nums) > 1 else 0.0
            m = compose((1, 0, 0, 1, tx, ty), m)
        elif op == "rotate":
            r = math.radians(nums[0])
            c, s = math.cos(r), math.sin(r)
            if len(nums) == 3:
                cx, cy = nums[1], nums[2]
                m = compose((1, 0, 0, 1, cx, cy), m)
                m = compose((c, s, -s, c, 0, 0), m)
                m = compose((1, 0, 0, 1, -cx, -cy), m)
            else:
                m = compose((c, s, -s, c, 0, 0), m)
        else:
            raise ValueError(f"unsupported transform op {op!r}")

    pts = [(x, y), (x + w, y), (x + w, y + h), (x, y + h)]
    tp = [(m[0] * px + m[2] * py + m[4], m[1] * px + m[3] * py + m[5]) for px, py in pts]
    xs = sorted(p[0] for p in tp)
    ys = sorted(p[1] for p in tp)
    if xs[0] + 0.01 < xs[1] or xs[2] + 0.01 < xs[3]:
        raise ValueError("non-axis-aligned rect transform")
    if ys[0] + 0.01 < ys[1] or ys[2] + 0.01 < ys[3]:
        raise ValueError("non-axis-aligned rect transform")
    return (xs[0], ys[0], xs[3] - xs[0], ys[3] - ys[0], rx, ry)


def shape_to_d(el) -> str:
    t = el.tag.split("}")[-1]
    a = el.attrib
    if t == "path":
        return a.get("d", "")
    if t == "circle":
        cx, cy = float(a.get("cx", 12)), float(a.get("cy", 12))
        r = float(a.get("r", 4))
        return (
            f"M{fmt(cx - r)},{fmt(cy)}"
            f"a{fmt(r)},{fmt(r)} 0 1,0 {fmt(2 * r)},0"
            f"a{fmt(r)},{fmt(r)} 0 1,0 {fmt(-2 * r)},0"
        )
    if t == "ellipse":
        cx, cy = float(a.get("cx", 12)), float(a.get("cy", 12))
        rx, ry = float(a.get("rx", 4)), float(a.get("ry", 4))
        return (
            f"M{fmt(cx - rx)},{fmt(cy)}"
            f"a{fmt(rx)},{fmt(ry)} 0 1,0 {fmt(2 * rx)},0"
            f"a{fmt(rx)},{fmt(ry)} 0 1,0 {fmt(-2 * rx)},0"
        )
    if t == "line":
        return f"M{a['x1']},{a['y1']}L{a['x2']},{a['y2']}"
    if t in ("polyline", "polygon"):
        nums = [float(n) for n in re.split(r"[,\s]+", a.get("points", "").strip()) if n != ""]
        pairs = [(nums[i], nums[i + 1]) for i in range(0, len(nums) - 1, 2)]
        d = f"M{fmt(pairs[0][0])},{fmt(pairs[0][1])}"
        d += "".join(f"L{fmt(px)},{fmt(py)}" for px, py in pairs[1:])
        return d + "Z" if t == "polygon" else d
    if t == "rect":
        box = (
            bake_rect_transform(a)
            if "transform" in a
            else (
                float(a.get("x", 0)),
                float(a.get("y", 0)),
                float(a.get("width", 0)),
                float(a.get("height", 0)),
                float(a.get("rx", 0)),
                float(a.get("ry", a.get("rx", 0))),
            )
        )
        return rect_d(*box)
    raise ValueError(f"unsupported element <{t}>")


def collect_shapes(code: str):
    wrapped = "<svg xmlns='http://www.w3.org/2000/svg'>" + code + "</svg>"
    root = ET.fromstring(wrapped)
    out = []
    for el in root.iter():
        t = el.tag.split("}")[-1]
        if t in ("svg", "g", "defs", "clipPath"):
            continue
        out.append((shape_to_d(el), el.attrib))
    return out


def el_to_path_args(d: str, a: dict) -> str:
    fill = a.get("fill", None)
    if fill in ("currentColor", "white", "#fff", "#ffffff"):
        fill_k, has_fill = "fill = SolidColor(Color.Black)", True
    elif fill == "none":
        fill_k, has_fill = "fill = null", False
    elif fill is None:
        has_stroke_attr = a.get("stroke", "none") not in ("none", None)
        fill_k = "fill = null" if has_stroke_attr else "fill = SolidColor(Color.Black)"
        has_fill = not has_stroke_attr
    else:
        fill_k, has_fill = "fill = SolidColor(Color.Black)", True

    stroke = a.get("stroke", None)
    if stroke in ("currentColor",):
        stroke_k, has_stroke = "stroke = SolidColor(Color.Black)", True
    elif stroke is None or stroke == "none":
        stroke_k, has_stroke = "stroke = null", False
    else:
        stroke_k, has_stroke = "stroke = SolidColor(Color.Black)", True

    sw = a.get("stroke-width", None)
    cap = a.get("stroke-linecap", None)
    join = a.get("stroke-linejoin", None)
    miter = a.get("stroke-miterlimit", None)
    rule = a.get("fill-rule", "nonzero")

    cap_map = {"round": "Round", "butt": "Butt", "square": "Square"}
    join_map = {"round": "Round", "miter": "Miter", "bevel": "Bevel"}

    fop = float(a.get("fill-opacity", "1"))
    sop = float(a.get("stroke-opacity", "1"))
    if a.get("opacity") is not None:
        fop *= float(a["opacity"])
        sop *= float(a["opacity"])

    args = [f'pathData = addPathNodes("{d}")']
    args.append(
        "pathFillType = PathFillType.EvenOdd"
        if rule == "evenodd"
        else "pathFillType = PathFillType.NonZero"
    )
    args.append(fill_k)
    if has_fill and fop != 1:
        args.append(f"fillAlpha = {fop}f")
    args.append(stroke_k)
    if sw is not None:
        args.append(f"strokeLineWidth = {sw}f")
    if cap in cap_map:
        args.append(f"strokeLineCap = StrokeCap.{cap_map[cap]}")
    if join in join_map:
        args.append(f"strokeLineJoin = StrokeJoin.{join_map[join]}")
    if miter is not None:
        args.append(f"strokeLineMiter = {miter}f")
    if has_stroke and sop != 1:
        args.append(f"strokeAlpha = {sop}f")
    return "            " + ",\n            ".join(args)


def header_for(uses_cap: bool, uses_join: bool) -> str:
    lines = [
        "// Auto-generated by tool/build_kotlin.py — do not edit.",
        "package dev.reicon",
        "",
        "import androidx.compose.ui.graphics.Color",
        "import androidx.compose.ui.graphics.PathFillType",
        "import androidx.compose.ui.graphics.SolidColor",
    ]
    if uses_cap:
        lines.append("import androidx.compose.ui.graphics.StrokeCap")
    if uses_join:
        lines.append("import androidx.compose.ui.graphics.StrokeJoin")
    lines += [
        "import androidx.compose.ui.graphics.vector.ImageVector",
        "import androidx.compose.ui.graphics.vector.addPathNodes",
        "import androidx.compose.ui.unit.dp",
    ]
    return "\n".join(lines) + "\n"


REICON_KT = """package dev.reicon

import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalContentColor
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

enum class ReiconWeight { Outline, Filled }

@Composable
fun ReiconIcon(
    icon: ImageVector,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    size: Dp = 24.dp,
    tint: Color = LocalContentColor.current
) {
    Icon(
        imageVector = icon,
        contentDescription = contentDescription,
        modifier = modifier.size(size),
        tint = tint
    )
}
"""


def generate(icon_filter=None, out_dir=DEFAULT_OUT, copy_to=None):

    with open(DATA_PATH) as f:
        data = json.load(f)

    icons = []
    seen = set()
    for cat_key, cat_data in (data.get("categories") or {}).items():
        for icon_key, icon in (cat_data.get("icons") or {}).items():
            if icon_filter and icon_key not in icon_filter:
                continue
            pascal = to_pascal(icon_key)
            if pascal.lower() in seen:
                pascal += to_pascal(cat_key)
            seen.add(pascal.lower())
            icons.append((icon_key, pascal, icon.get("weights", {})))

    if icon_filter:
        missing = icon_filter - {k for k, _, _ in icons}
        if missing:
            print(f"warning: not found: {sorted(missing)}", file=sys.stderr)

    icons.sort(key=lambda t: t[1])
    print(f"Found {len(icons)} icons")
    os.makedirs(out_dir, exist_ok=True)
    if copy_to:
        os.makedirs(copy_to, exist_ok=True)

    reicon_path = os.path.join(out_dir, "Reicon.kt")
    if not os.path.exists(reicon_path):
        with open(reicon_path, "w") as f:
            f.write(REICON_KT)
        print(f"Wrote {reicon_path}")
    if copy_to and not os.path.exists(os.path.join(copy_to, "Reicon.kt")):
        with open(os.path.join(copy_to, "Reicon.kt"), "w") as f:
            f.write(REICON_KT)
        print("Copied Reicon.kt")

    dashed = []
    for kebab, pascal, weights in icons:
        blocks = []
        uses_cap = False
        uses_join = False
        for weight in ("Outline", "Filled"):
            w = weights.get(weight, {})
            code = w.get("code", "")
            if not code:
                continue
            shapes = collect_shapes(code)
            addpath_calls = []
            for d, attrib in shapes:
                if attrib.get("stroke-linecap") in ("round", "butt", "square"):
                    uses_cap = True
                if attrib.get("stroke-linejoin") in ("round", "miter", "bevel"):
                    uses_join = True
                if attrib.get("stroke-dasharray") is not None:
                    dashed.append(f"{kebab}/{weight}")
                raw = el_to_path_args(d, attrib).strip()
                indented = raw.replace("\n            ", "\n                    ")
                addpath_calls.append(
                    "                addPath(\n                    "
                    + indented
                    + "\n                )"
                )
            paths_k = "\n".join(addpath_calls)
            blocks.append(
                f"""    val {weight}: ImageVector
        get() {{
            if (_{weight.lower()} != null) return _{weight.lower()}!!
            _{weight.lower()} = ImageVector.Builder(
                name = "{pascal}{weight}",
                defaultWidth = 24.dp,
                defaultHeight = 24.dp,
                viewportWidth = 24f,
                viewportHeight = 24f
            ).apply {{
{paths_k}
            }}.build()
            return _{weight.lower()}!!
        }}

    private var _{weight.lower()}: ImageVector? = null"""
            )
        body = "\n\n".join(blocks)
        content = f"""{header_for(uses_cap, uses_join)}
object {pascal} {{
{body}
}}
"""
        with open(os.path.join(out_dir, f"{pascal}.kt"), "w") as f:
            f.write(content)
        print(f"  {kebab} -> {pascal}.kt ({'/'.join(weights.keys())})")
        if copy_to:
            with open(os.path.join(copy_to, f"{pascal}.kt"), "w") as f:
                f.write(content)
            print(f"  copied {pascal}.kt")

    if dashed:
        print(
            f"warning: {len(dashed)} variants use stroke-dasharray, "
            f"unsupported by ImageVector, emitted solid: {sorted(set(dashed))}",
            file=sys.stderr,
        )


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--icons", default=None)
    ap.add_argument("--out", default=DEFAULT_OUT)
    ap.add_argument("--copy-to", default=None)
    args = ap.parse_args()
    filt = set(args.icons.split(",")) if args.icons else None
    generate(filt, args.out, args.copy_to)
