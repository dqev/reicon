import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { getIconCode, subscribeIcons, iconsLoaded, toKebabCase } from "../utils/iconDataLoader";
import { getGlassSvg } from "../utils/glassCache";

export interface IconRendererProps {
  name: string;
  code?: string;
  size?: number;
  weight?: "outline" | "filled";
  color?: string;
  strokeWidth?: number;
  rotation?: number;
  flipH?: boolean;
  flipV?: boolean;
  className?: string;
  style?: React.CSSProperties;
  lazy?: boolean;
}

function useInView<T extends HTMLElement>(enabled: boolean, rootMargin = "400px"): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(() => !enabled || typeof window === "undefined" || typeof IntersectionObserver === "undefined");

  // Above-the-fold icons: mark visible BEFORE first paint so glass renders
  // immediately with no placeholder flash.
  useLayoutEffect(() => {
    if (!enabled || inView) return;
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const rect = el.getBoundingClientRect();
    const margin = 400;
    if (rect.top < window.innerHeight + margin && rect.bottom > -margin) {
      setInView(true);
    }
  }, [enabled, inView]);

  useEffect(() => {
    if (!enabled || inView) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [enabled, rootMargin, inView]);
  return [ref, inView];
}

export const IconRenderer = React.memo(function IconRenderer({
  name,
  code,
  size = 40,
  color = "#9B8AFB",
  rotation = 0,
  flipH = false,
  flipV = false,
  className = "",
  style = {},
  lazy = true,
}: IconRendererProps) {
  const kebabName = toKebabCase(name);
  const dataReady = useSyncExternalStore(subscribeIcons, iconsLoaded);
  const rawCode = code || (dataReady ? getIconCode(kebabName) : "");
  const [viewRef, inView] = useInView<HTMLDivElement>(lazy);

  const glassSvg = useMemo(() => {
    if (!rawCode || (lazy && !inView)) return "";
    return getGlassSvg(rawCode, kebabName, color, size);
  }, [rawCode, kebabName, color, size, lazy, inView]);

  const transformParts: string[] = [];
  if (rotation) transformParts.push(`rotate(${rotation}deg)`);
  if (flipH) transformParts.push("scaleX(-1)");
  if (flipV) transformParts.push("scaleY(-1)");

  const combinedStyle: React.CSSProperties = useMemo(
    () => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      ...(transformParts.length > 0 ? { transform: transformParts.join(" ") } : null),
      ...style,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rotation, flipH, flipV, size, JSON.stringify(style)],
  );

  if (!rawCode) {
    // Data still loading: shimmer. Data loaded but unknown icon: CDN fallback.
    if (!dataReady) {
      const dot = Math.max(12, Math.round(size * 0.45));
      return (
        <div ref={viewRef} style={combinedStyle} className={className}>
          <span
            aria-hidden="true"
            className="animate-pulse rounded-full bg-white/[0.08]"
            style={{ width: dot, height: dot }}
          />
        </div>
      );
    }
    return (
      <div ref={viewRef} style={combinedStyle} className={className}>
        <re-icon icon={kebabName} size={size} color={color} />
      </div>
    );
  }

  if (!glassSvg) {
    // Not near the viewport yet: neutral shimmer at final size (no layout
    // shift, never a half-styled icon).
    const dot = Math.max(12, Math.round(size * 0.45));
    return (
      <div ref={viewRef} style={combinedStyle} className={className}>
        <span
          aria-hidden="true"
          className="animate-pulse rounded-full bg-white/[0.08]"
          style={{ width: dot, height: dot }}
        />
      </div>
    );
  }

  return (
    <div
      ref={viewRef}
      style={combinedStyle}
      className={className}
      dangerouslySetInnerHTML={{ __html: glassSvg }}
    />
  );
});

export default IconRenderer;
