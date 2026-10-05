import { useEffect, useRef } from 'react';

// Math and Geometry Helpers from hairline engine (hero-isometric.html)
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const rad = (d: number) => (d * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;
const poly = (pts: [number, number][]) => 'M' + pts.map((p) => `${r2(p[0])} ${r2(p[1])}`).join('L') + 'Z';
const openPath = (pts: [number, number][]) => (pts.length < 2 ? '' : 'M' + pts.map((p) => `${r2(p[0])} ${r2(p[1])}`).join('L'));

interface Camera {
  az: number;
  k: number;
  S: number;
  ox: number;
  oy: number;
}

const Cam = (azDeg: number, k: number, S: number): Camera => ({
  az: rad(azDeg),
  k,
  S,
  ox: 0,
  oy: 0,
});

function proj(C: Camera) {
  const c = Math.cos(C.az),
    s = Math.sin(C.az),
    zf = Math.sqrt(1 - C.k * C.k);
  return (x: number, y: number, z: number): [number, number] => {
    const X = x * c - y * s,
      Y = x * s + y * c;
    return [C.ox + C.S * X, C.oy + C.S * (Y * C.k - z * zf)];
  };
}

function unproj(C: Camera, sx: number, sy: number, z: number): [number, number] {
  const c = Math.cos(C.az),
    s = Math.sin(C.az),
    zf = Math.sqrt(1 - C.k * C.k);
  const X = (sx - C.ox) / C.S,
    Y = ((sy - C.oy) / C.S + z * zf) / C.k;
  return [X * c + Y * s, -X * s + Y * c];
}

function fit(C: Camera, pts: [number, number, number][], cx: number, cy: number) {
  C.ox = 0;
  C.oy = 0;
  const P = proj(C);
  let a = 1e9,
    b = -1e9,
    c = 1e9,
    d = -1e9;
  for (const p of pts) {
    const q = P(p[0], p[1], p[2]);
    a = Math.min(a, q[0]);
    b = Math.max(b, q[0]);
    c = Math.min(c, q[1]);
    d = Math.max(d, q[1]);
  }
  C.ox = cx - (a + b) / 2;
  C.oy = cy - (c + d) / 2;
}

interface RingPoint {
  u: number;
  v: number;
  nu: number;
  nv: number;
}

function rrect(u0: number, v0: number, u1: number, v1: number, r: number, n = 4): RingPoint[] {
  r = Math.max(0, Math.min(r, (u1 - u0) / 2, (v1 - v0) / 2));
  const out: RingPoint[] = [];
  for (const [cu, cv, a0] of [
    [u1 - r, v1 - r, 0],
    [u0 + r, v1 - r, 90],
    [u0 + r, v0 + r, 180],
    [u1 - r, v0 + r, 270],
  ]) {
    for (let k = 0; k <= n; k++) {
      const a = rad(a0 + (90 * k) / n),
        ca = Math.cos(a),
        sa = Math.sin(a);
      out.push({ u: cu + r * ca, v: cv + r * sa, nu: ca, nv: sa });
    }
  }
  return out;
}

function hull(input: [number, number][]): [number, number][] {
  const pts = input.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const x = (o: [number, number], a: [number, number], b: [number, number]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: [number, number][] = [],
    up: [number, number][] = [];
  for (const p of pts) {
    while (lo.length > 1 && x(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop();
    lo.push(p);
  }
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (up.length > 1 && x(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop();
    up.push(p);
  }
  lo.pop();
  up.pop();
  return lo.concat(up);
}

const ringAt = (P: (x: number, y: number, z: number) => [number, number], ring: RingPoint[], z: number): [number, number][] =>
  ring.map((q) => P(q.u, q.v, z));

const facing = (C: Camera) => {
  const s = Math.sin(C.az),
    c = Math.cos(C.az);
  return (q: RingPoint) => q.nu * s + q.nv * c >= -1e-6;
};

function run(ring: RingPoint[], keep: (q: RingPoint) => boolean): RingPoint[] {
  const n = ring.length;
  let s = -1;
  for (let i = 0; i < n; i++) {
    if (keep(ring[i]) && !keep(ring[(i + n - 1) % n])) {
      s = i;
      break;
    }
  }
  if (s < 0) return keep(ring[0]) ? ring.slice() : [];
  const out: RingPoint[] = [];
  for (let k = 0; k < n && keep(ring[(s + k) % n]); k++) {
    out.push(ring[(s + k) % n]);
  }
  return out;
}

function prism(
  P: (x: number, y: number, z: number) => [number, number],
  front: (q: RingPoint) => boolean,
  ring: RingPoint[],
  inner: RingPoint[] | null,
  z0: number,
  z1: number
) {
  return {
    sil: poly(hull(ringAt(P, ring, z1).concat(ringAt(P, ring, z0)))),
    crease: inner ? openPath(ringAt(P, run(inner, front), z1)) : '',
  };
}

const rings = (x0: number, y0: number, x1: number, y1: number, r: number, b: number): [RingPoint[], RingPoint[]] => [
  rrect(x0, y0, x1, y1, r),
  rrect(x0 + b, y0 + b, x1 - b, y1 - b, Math.max(0.3, r - b)),
];

interface Spring {
  x: number;
  v: number;
  t: number;
  k: number;
  c: number;
  m: number;
  eps: number;
}

function spring(x: number, o: { k?: number; c?: number; m?: number; eps?: number } = {}): Spring {
  return { x, v: 0, t: x, k: o.k ?? 100, c: o.c ?? 18, m: o.m ?? 1, eps: o.eps ?? 0.01 };
}

// Mirrors HL.reducedMotion(): when the reader asked for less motion,
// springs land at once instead of animating.
let reducedMotion = false;

function stepS(sp: Spring, dt: number): boolean {
  if (reducedMotion) {
    sp.x = sp.t;
    sp.v = 0;
    return false;
  }
  const n = Math.max(1, Math.ceil(dt * 240)),
    h = dt / n;
  for (let i = 0; i < n; i++) {
    const a = (-sp.k * (sp.x - sp.t) - sp.c * sp.v) / sp.m;
    sp.v += a * h;
    sp.x += sp.v * h;
  }
  if (Math.abs(sp.x - sp.t) < sp.eps && Math.abs(sp.v) < sp.eps * 10) {
    sp.x = sp.t;
    sp.v = 0;
    return false;
  }
  return true;
}

const NS = 'http://www.w3.org/2000/svg';

function mk<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number>,
  parent?: Element
): SVGElementTagNameMap[K] {
  const e = document.createElementNS(NS, tag);
  if (attrs) {
    for (const k in attrs) {
      e.setAttribute(k, String(attrs[k]));
    }
  }
  if (parent) parent.appendChild(e);
  return e;
}

interface SolidEl {
  g: SVGGElement;
  sil: SVGPathElement;
  cr: SVGPathElement;
}

function solid(parent: Element): SolidEl {
  const g = mk('g', {}, parent);
  return { g, sil: mk('path', { class: 'sil' }, g), cr: mk('path', { class: 'nf lo' }, g) };
}

const put = (el: SolidEl, s: { sil: string; crease: string }) => {
  el.sil.setAttribute('d', s.sil);
  el.cr.setAttribute('d', s.crease);
};

const flatDot = (parent: Element, C: Camera, r: number, cls: string) =>
  mk('ellipse', { rx: r2(r * C.S), ry: r2(r * C.S * C.k), class: cls }, parent);

const place = (el: SVGElement, q: [number, number]) => {
  el.setAttribute('cx', String(r2(q[0])));
  el.setAttribute('cy', String(r2(q[1])));
};

const N = 7;
const CELL = 14;
const FOOT = 8;
const EXT = N * CELL;
const PB = 6;
const BH = 10;
const LIFT = 9;

const falloff = (u: number) =>
  u <= 0 ? 1 : u <= 0.417 ? 1 - (u / 0.417) * 0.6875 : u <= 1 ? 0.3125 - ((u - 0.417) / 0.583) * 0.2185 : 0.094;

const sideOf = (v: number) => 12 + (v - 12) * 0.27;

export default function HeroIsometric({ value = 32 }: { value?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const apiRef = useRef<{ setSize: (v: number) => void } | null>(null);

  // Bench parity: the slider drives the block size (range 12–64, rest 32).
  // Applied without remounting, exactly like figure handle `set(v)`.
  useEffect(() => {
    apiRef.current?.setSize(value);
  }, [value]);

  useEffect(() => {
    const stage = containerRef.current;
    const svg = svgRef.current;
    if (!stage || !svg) return;

    // Camera setup exactly matching hero-isometric.html
    const C = Cam(45, 0.5, 1.7);
    fit(C, [[-8, -8, -PB], [EXT + 8, EXT + 8, -PB], [-6, -6, BH], [EXT + 6, EXT + 6, BH]], 200, 166);
    const P = proj(C);
    const front = facing(C);
    let size = value;
    let over: [number, number] | null = null;
    const R = CELL * 3;

    // Base plate solid
    const g = mk('g', {}, svg);
    const cols: Array<{
      i: number;
      j: number;
      h0: number;
      ring: RingPoint[];
      inner: RingPoint[];
      sp: Spring;
      el: SolidEl;
      drawn: number;
    }> = [];

    const [pr, pi] = rings(-8, -8, EXT + 8, EXT + 8, 10, 2.2);
    put(solid(g), prism(P, front, pr, pi, -PB, 0));

    // 7x7 Grid of peg columns
    for (let s = 0; s <= 2 * (N - 1); s++) {
      for (let i = 0; i < N; i++) {
        const j = s - i;
        if (j < 0 || j >= N) continue;
        const u = i / (N - 1);
        const v = j / (N - 1);
        const h0 =
          2.5 +
          2.5 * Math.exp(-((u - 0.3) ** 2 + (v - 0.7) ** 2) / 0.08) +
          1.8 * Math.exp(-((u - 0.75) ** 2 + (v - 0.25) ** 2) / 0.04);
        const x0 = i * CELL + (CELL - FOOT) / 2;
        const y0 = j * CELL + (CELL - FOOT) / 2;
        const [ring, inner] = rings(x0, y0, x0 + FOOT, y0 + FOOT, 2.2, 0.8);
        cols.push({ i, j, h0, ring, inner, sp: spring(h0, { eps: 0.04 }), el: solid(g), drawn: NaN });
      }
    }

    const peak = cols.reduce((a, b) => (b.h0 > a.h0 ? b : a));
    const cx0 = (peak.i + 0.5) * CELL;
    const cy0 = (peak.j + 0.5) * CELL;
    const bx = spring(cx0);
    const by = spring(cy0);
    const bel = solid(g);
    bel.sil.classList.toggle('hi', true);

    const mark = mk('g', {}, g);
    const md: SVGElement[] = [];
    for (let k = 0; k < 9; k++) {
      md.push(flatDot(mark, C, 0.55, k === 4 ? 'dot' : 'dot m'));
    }

    let drawnKey = '';

    function drawPeg(c: typeof cols[0]) {
      const h = Math.max(0.6, c.sp.x);
      if (h === c.drawn) return;
      c.drawn = h;
      put(c.el, prism(P, front, c.ring, c.inner, 0, h));
    }

    function drawBlock() {
      const side = sideOf(size);
      const x = bx.x;
      const y = by.x;
      const key = `${x.toFixed(2)},${y.toFixed(2)},${side.toFixed(2)}`;
      if (key === drawnKey) return;
      drawnKey = key;
      const [ring, inner] = rings(x - side / 2, y - side / 2, x + side / 2, y + side / 2, 3, 1.2);
      put(bel, prism(P, front, ring, inner, 0, BH));
      md.forEach((el, k) => place(el, P(x + ((k % 3) - 1) * 2.5, y + (Math.floor(k / 3) - 1) * 2.5, BH)));
    }

    // Frame loop mirroring HL.register(): one rAF while something moves,
    // paused while the stage is off-screen (IntersectionObserver).
    let raf = 0;
    let last = performance.now();
    let awake = true;
    let vis = true;

    function frame(now: number) {
      if (!awake) {
        raf = 0;
        return;
      }
      if (!vis) {
        // Stay awake so we resume on scroll back, but burn no frames.
        raf = 0;
        return;
      }
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;

      let m = false;
      for (const c of cols) {
        if (stepS(c.sp, dt)) m = true;
        drawPeg(c);
      }
      // Both springs must advance every tick (bench uses bitwise `|`).
      const stepX = stepS(bx, dt);
      const stepY = stepS(by, dt);
      if (stepX || stepY) m = true;
      drawBlock();

      awake = m;
      if (awake) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
      }
    }

    function wake() {
      awake = true;
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    }

    // Bench parity: honour prefers-reduced-motion, springs land at once.
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = mq.matches;
    const onMotion = () => {
      reducedMotion = mq.matches;
      wake();
    };
    mq.addEventListener('change', onMotion);

    const io = new IntersectionObserver(
      (entries) => {
        vis = entries[entries.length - 1].isIntersecting;
        if (vis) wake();
      },
      { rootMargin: '80px' }
    );
    io.observe(stage);

    // Initial render of pegs and block (bench ticks once on mount)
    for (const c of cols) drawPeg(c);
    drawBlock();
    wake();

    // Bench `set(v)`: resize the block without remounting.
    apiRef.current = {
      setSize: (v: number) => {
        size = v;
        drawnKey = '';
        wake();
      },
    };

    function retarget() {
      if (!over) {
        for (const c of cols) c.sp.t = c.h0;
        bx.t = cx0;
        by.t = cy0;
      } else {
        const i = clamp(Math.floor(over[0] / CELL), 0, N - 1);
        const j = clamp(Math.floor(over[1] / CELL), 0, N - 1);
        bx.t = (i + 0.5) * CELL;
        by.t = (j + 0.5) * CELL;
        for (const c of cols) {
          const dx = (c.i + 0.5) * CELL - over[0];
          const dy = (c.j + 0.5) * CELL - over[1];
          c.sp.t = c.h0 + LIFT * falloff(Math.hypot(dx, dy) / R);
        }
      }
      wake();
    }

    // ViewBox framing tightly around the illustration with safe margins
    const VB_X = 50;
    const VB_Y = 77;
    const VB_W = 300;
    const VB_H = 180;

    // Pointer events mapped to trimmed viewBox
    let tm = 0;
    const pt = (e: PointerEvent): [number, number] => {
      const r = stage.getBoundingClientRect();
      return [
        VB_X + ((e.clientX - r.left) / r.width) * VB_W,
        VB_Y + ((e.clientY - r.top) / r.height) * VB_H,
      ];
    };

    const handlePointerMove = (e: PointerEvent) => {
      window.clearTimeout(tm);
      const p = pt(e);
      over = unproj(C, p[0], p[1], BH);
      retarget();
    };

    const handlePointerDown = (e: PointerEvent) => {
      window.clearTimeout(tm);
      if (e.pointerType !== 'mouse') stage.releasePointerCapture?.(e.pointerId);
      const p = pt(e);
      over = unproj(C, p[0], p[1], BH);
      retarget();
    };

    const handlePointerLeave = (e: PointerEvent) => {
      window.clearTimeout(tm);
      tm = window.setTimeout(
        () => {
          over = null;
          retarget();
        },
        e.pointerType === 'mouse' ? 0 : 1400
      );
    };

    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerdown', handlePointerDown);
    stage.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      apiRef.current = null;
      window.clearTimeout(tm);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      mq.removeEventListener('change', onMotion);
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerdown', handlePointerDown);
      stage.removeEventListener('pointerleave', handlePointerLeave);
      svg.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-hairline-stage relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] aspect-[5/3] select-none mx-auto"
      style={{ cursor: 'grab' }}
      role="img"
      aria-label="Interactive isometric peg grid animation"
    >
      <svg
        ref={svgRef}
        viewBox="50 77 300 180"
        className="w-full h-full block absolute inset-0 overflow-visible pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
