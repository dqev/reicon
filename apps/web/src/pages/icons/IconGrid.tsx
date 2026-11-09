import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import IconCard, { IconCardSkeleton } from '@/components/ui/IconCard';
import DuotoneIconCard from '@/components/ui/DuotoneIconCard';
import CustomSvgCard, { type CustomSvgIcon } from '@/components/ui/CustomSvgCard';
import { Highlight } from '@/components/ui/Highlight';
import { IconTooltipProvider } from '@/components/ui/IconTooltip';
import type { DuotoneIconInfo } from '@/hooks/useDuotoneData';
import { warmGlassCache } from '@/utils/glassCache';

// 144 items per batch cleanly divides across all responsive grid column layouts (3, 6, 8, 9, 12, 16)
const INITIAL_BATCH = 144;
const STEP_BATCH = 144;

// Continuous runway buffer (in px): trigger loading the next batch when the user
// is within 1600px of the bottom (approx. 1.5 - 2 screen heights ahead) so scrolling
// is completely seamless and never interrupted.
const RUNWAY_THRESHOLD = 1600;

interface IconGridProps {
  filteredIcons: string[];
  customIcons?: CustomSvgIcon[] | null;
  customSetType?: 'brand' | 'flag' | 'glass';
  glassColor?: string;
  activeStyle: string;
  displaySize: number;
  displayWeight: string;
  ready: boolean;
  sectionLoading?: boolean;
  searchQuery: string;
  onSearchClear: () => void;
  duotoneMap?: Record<string, DuotoneIconInfo> | null;
  duotoneLoading?: boolean;
  onIconCopy?: (name: string) => void;
}

export default function IconGrid({
  filteredIcons,
  customIcons,
  customSetType = 'brand',
  glassColor = '#9B8AFB',
  activeStyle,
  displaySize,
  displayWeight,
  ready,
  sectionLoading = false,
  searchQuery,
  onSearchClear,
  duotoneMap,
  duotoneLoading,
  onIconCopy,
}: IconGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Stabilize callbacks with useRef to avoid breaking React.memo on cards
  const onIconCopyRef = useRef(onIconCopy);
  onIconCopyRef.current = onIconCopy;

  const stableOnSelect = useCallback((name: string) => {
    if (onIconCopyRef.current) {
      onIconCopyRef.current(name);
    }
  }, []);

  const effectiveIcons = useMemo(() => {
    if (activeStyle === 'Duotone' && duotoneMap) {
      return filteredIcons.filter((name) => Boolean(duotoneMap[name]));
    }
    return filteredIcons;
  }, [filteredIcons, activeStyle, duotoneMap]);

  const totalCards = customIcons ? customIcons.length : effectiveIcons.length;

  // Synchronous state adjustment during render when filteredIcons/customIcons/activeStyle changes
  const [prevIcons, setPrevIcons] = useState(effectiveIcons);
  const [prevCustomIcons, setPrevCustomIcons] = useState(customIcons);
  const [prevStyle, setPrevStyle] = useState(activeStyle);
  if (prevIcons !== effectiveIcons || prevCustomIcons !== customIcons || prevStyle !== activeStyle) {
    setPrevIcons(effectiveIcons);
    setPrevCustomIcons(customIcons);
    setPrevStyle(activeStyle);
    setVisibleCount(INITIAL_BATCH);
  }

  // Pre-warm glass icon cache in idle time for smooth scrolling
  useEffect(() => {
    if (customSetType === 'glass' && customIcons && customIcons.length > 0) {
      const nextSlice = customIcons.slice(visibleCount, visibleCount + STEP_BATCH);
      if (nextSlice.length > 0) {
        warmGlassCache(nextSlice, glassColor, displaySize);
      }
    }
  }, [customSetType, customIcons, visibleCount, displaySize, glassColor]);

  const visibleCards = useMemo(() => {
    if (customIcons) {
      const slice = customIcons.slice(0, visibleCount);
      return slice.map((icon) => (
        <CustomSvgCard
          key={icon.name}
          icon={icon}
          size={displaySize}
          setType={customSetType}
          color={customSetType === 'glass' ? glassColor : undefined}
          onSelect={stableOnSelect}
        />
      ));
    }
    const slice = effectiveIcons.slice(0, visibleCount);
    if (activeStyle === 'Duotone' && duotoneMap) {
      return slice.map((name) => (
        <DuotoneIconCard
          key={name}
          name={name}
          code={duotoneMap[name]?.code || ''}
          size={displaySize}
        />
      ));
    }
    return slice.map((name) => (
      <IconCard key={name} name={name} weight={displayWeight} size={displaySize} />
    ));
  }, [
    customIcons,
    effectiveIcons,
    visibleCount,
    activeStyle,
    displaySize,
    displayWeight,
    customSetType,
    glassColor,
    duotoneMap,
    stableOnSelect,
  ]);

  const hasMore = visibleCount < totalCards;

  // Central loadMore callback guarded against exceeding totalCards
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => {
      if (prev >= totalCards) return prev;
      return Math.min(prev + STEP_BATCH, totalCards);
    });
  }, [totalCards]);

  // Check remaining scroll distance to bottom and maintain continuous runway
  const checkRunway = useCallback(() => {
    if (visibleCount >= totalCards) return;

    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight
    );

    const remaining = documentHeight - (scrollY + viewportHeight);

    // If remaining content is less than RUNWAY_THRESHOLD, load next batch ahead of time
    if (remaining < RUNWAY_THRESHOLD) {
      loadMore();
    }
  }, [visibleCount, totalCards, loadMore]);

  // Continuous runway check: whenever visibleCount changes, check if we still need
  // more icons to fulfill the threshold (e.g. large monitors or fast scroll)
  useEffect(() => {
    if (visibleCount >= totalCards) return;

    const rafId = requestAnimationFrame(() => {
      checkRunway();
    });

    return () => cancelAnimationFrame(rafId);
  }, [visibleCount, totalCards, checkRunway]);

  // Passive high-frequency scroll & resize listeners for silky-smooth infinite stream
  useEffect(() => {
    if (!hasMore) return;

    let rafId: number | null = null;
    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        checkRunway();
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Initial check on mount
    onScrollOrResize();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [hasMore, checkRunway]);

  // Complementary IntersectionObserver on sentinel
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            loadMore();
          }
        },
        { rootMargin: '1200px 0px 1200px 0px' }
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [loadMore]
  );

  // Clean up observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  // Section-switch loader takes priority
  if (sectionLoading) {
    return (
      <div
        className="flex min-h-[55vh] items-center justify-center"
        role="status"
        aria-live="polite"
        aria-label="Loading icons"
      >
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-[#9B8AFB]" />
      </div>
    );
  }

  if (!ready || (activeStyle === 'Duotone' && duotoneLoading && !customIcons)) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-2 sm:gap-2.5">
        {Array.from({ length: 96 }).map((_, i) => (
          <IconCardSkeleton key={i} size={displaySize} />
        ))}
      </div>
    );
  }

  if (totalCards === 0) {
    return (
      <>
        <div role="status" aria-live="polite" className="sr-only">No icons found</div>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg className="w-12 h-12 text-white/20 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          {searchQuery ? (
            <>
              <p className="text-sm text-text-muted">No icons found for &quot;{searchQuery}&quot;</p>
              <button
                onClick={onSearchClear}
                className="mt-3 text-[#9B8AFB] text-sm hover:underline cursor-pointer"
              >
                Clear search
              </button>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-white mb-1">Icons coming soon</p>
              <p className="text-xs text-[#8f8f8f]">This set is being prepared and will be available soon.</p>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {customSetType === 'glass' && (
        <svg width="0" height="0" className="absolute -z-50 pointer-events-none opacity-0 invisible" aria-hidden="true">
          <defs>
            <filter id="reicon_glass_engrave" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="bg" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology radius="24.2857" operator="erode" in="SourceAlpha" />
              <feOffset dx="14.5714" dy="17" />
              <feGaussianBlur stdDeviation="9.71429" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.270757 0 0 0 0 0.230207 0 0 0 0 0.53433 0 0 0 0.35 0" />
              <feBlend mode="multiply" in2="bg" result="d1" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology radius="24.2857" operator="erode" in="SourceAlpha" />
              <feOffset dx="4.85714" dy="4.85714" />
              <feGaussianBlur stdDeviation="2.42857" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0469801 0 0 0 0 0 0 0 0 0 0.352351 0 0 0 0.25 0" />
              <feBlend mode="multiply" in2="d1" result="d2" />
              <feBlend mode="normal" in="SourceGraphic" in2="d2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="softTL" />
              <feOffset dx="-2.42857" dy="-2.42857" />
              <feGaussianBlur stdDeviation="1.21429" />
              <feComposite in2="softTL" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.130195 0 0 0 0 0.188321 0 0 0 0 0.420823 0 0 0 0.3 0" />
              <feBlend mode="normal" in2="shape" result="i1" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="softBR" />
              <feOffset dx="2.42857" dy="2.42857" />
              <feGaussianBlur stdDeviation="1.21429" />
              <feComposite in2="softBR" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0" />
              <feBlend mode="normal" in2="i1" result="i2" />
            </filter>
            <radialGradient id="reicon_glass_ink" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(120 80) rotate(70) scale(180 360)">
              <stop stopColor="#E4DEFD" />
              <stop offset="0.5" stopColor="#9B8AFB" />
              <stop offset="1" stopColor="#3820A0" />
            </radialGradient>
          </defs>
        </svg>
      )}
      <div role="status" aria-live="polite" className="sr-only">Showing {visibleCards.length} of {totalCards} icons</div>
      <IconTooltipProvider openDelay={100} closeDelay={120}>
        <Highlight
          className="absolute inset-0 rounded-2xl sm:rounded-[18px] border border-white/[0.08] bg-white/[0.04] pointer-events-none"
        >
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-2 sm:gap-2.5">
            {visibleCards}
          </div>
        </Highlight>
      </IconTooltipProvider>

      {hasMore && (
        <div
          ref={sentinelRef}
          className="flex justify-center items-center py-8 h-12 w-full min-h-[48px] select-none pointer-events-none"
          aria-hidden="true"
        >
          <span className="h-4 w-4 animate-spin rounded-full border border-white/20 border-t-[#9B8AFB] opacity-40" />
        </div>
      )}
    </>
  );
}
