import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import IconCard, { IconCardSkeleton } from '@/components/ui/IconCard';
import DuotoneIconCard from '@/components/ui/DuotoneIconCard';
import { Highlight } from '@/components/ui/Highlight';
import { IconTooltipProvider } from '@/components/ui/IconTooltip';
import type { DuotoneIconInfo } from '@/hooks/useDuotoneData';

const INITIAL_BATCH = 120;
const STEP_BATCH = 200;

interface IconGridProps {
  filteredIcons: string[];
  activeStyle: string;
  displaySize: number;
  displayWeight: string;
  ready: boolean;
  searchQuery: string;
  onSearchClear: () => void;
  duotoneMap?: Record<string, DuotoneIconInfo> | null;
  duotoneLoading?: boolean;
}

export default function IconGrid({
  filteredIcons,
  activeStyle,
  displaySize,
  displayWeight,
  ready,
  searchQuery,
  onSearchClear,
  duotoneMap,
  duotoneLoading,
}: IconGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const totalCardsRef = useRef(0);

  const effectiveIcons = useMemo(() => {
    if (activeStyle === 'Duotone' && duotoneMap) {
      return filteredIcons.filter((name) => Boolean(duotoneMap[name]));
    }
    return filteredIcons;
  }, [filteredIcons, activeStyle, duotoneMap]);

  const totalCards = effectiveIcons.length;
  totalCardsRef.current = totalCards;

  useEffect(() => {
    setVisibleCount(INITIAL_BATCH);
  }, [effectiveIcons, activeStyle]);

  // Progressive auto-loader to continuously append icons in non-blocking frames
  useEffect(() => {
    if (visibleCount < totalCards) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + STEP_BATCH, totalCardsRef.current));
      }, 16);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, totalCards]);

  const visibleCards = useMemo(() => {
    if (activeStyle === 'Duotone' && duotoneMap) {
      return effectiveIcons.slice(0, visibleCount).map((name) => (
        <DuotoneIconCard
          key={name}
          name={name}
          code={duotoneMap[name]?.code || ''}
          size={displaySize}
        />
      ));
    }
    return effectiveIcons.slice(0, visibleCount).map((name) => (
      <IconCard key={name} name={name} weight={displayWeight} size={displaySize} />
    ));
  }, [effectiveIcons, visibleCount, activeStyle, displaySize, displayWeight, duotoneMap]);

  const hasMore = visibleCount < totalCards;

  const sentinelRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setVisibleCount((prev) => {
          const next = Math.min(prev + STEP_BATCH, totalCardsRef.current);
          return next === prev ? prev : next;
        });
      },
      { rootMargin: '800px' }
    );
    observer.observe(node);
    observerRef.current = observer;
  }, []);

  if (!ready || (activeStyle === 'Duotone' && duotoneLoading)) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1.5">
        {Array.from({ length: 96 }).map((_, i) => (
          <IconCardSkeleton key={i} size={displaySize} />
        ))}
      </div>
    );
  }

  if (filteredIcons.length === 0) {
    return (
      <>
        <div role="status" aria-live="polite" className="sr-only">No icons found</div>
        <div className="flex flex-col items-center justify-center py-20 text-text-base/30">
          <svg className="w-12 h-12 text-text-base/20 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <p className="text-sm mt-4">No icons found for &quot;{searchQuery}&quot;</p>
          <button
            onClick={onSearchClear}
            className="mt-2 text-[#9B8AFB] text-sm hover:underline cursor-pointer"
          >
            Clear search
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div role="status" aria-live="polite" className="sr-only">Showing {visibleCards.length} of {filteredIcons.length} icons</div>
      <IconTooltipProvider openDelay={100} closeDelay={120}>
        <Highlight
          className="absolute inset-0 rounded-xl ring-1 ring-text-base/20 bg-text-base/7 pointer-events-none"
        >
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1.5">
            {visibleCards}
          </div>
        </Highlight>
      </IconTooltipProvider>

      {hasMore && (
        <div key={visibleCount} ref={sentinelRef} className="flex justify-center py-8">
        </div>
      )}
    </>
  );
}
