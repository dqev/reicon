import { useState, useEffect, useMemo, useDeferredValue, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import IconCard, { IconCardSkeleton } from '../components/IconCard';
import { Magnifier } from 'reicon-react';

import newIconsData from '../data/new-icons-added.json';

const NEW_ICONS_SET = new Set(newIconsData as string[]);

const LS_ICONS = 'reicon-icons-cache';
const LS_CATS = 'reicon-cats-cache';

const BATCH_SIZE = 60;

function loadCache(): { icons: string[]; categories: string[] } {
  try {
    const i = localStorage.getItem(LS_ICONS);
    const c = localStorage.getItem(LS_CATS);
    return { icons: i ? JSON.parse(i) : [], categories: c ? JSON.parse(c) : [] };
  } catch {
    return { icons: [], categories: [] };
  }
}

function saveCache(icons: string[], categories: string[]) {
  try {
    localStorage.setItem(LS_ICONS, JSON.stringify(icons));
    localStorage.setItem(LS_CATS, JSON.stringify(categories));
  } catch { }
}

export default function IconsPage() {
  const [searchParams] = useSearchParams();
  const [allIcons, setAllIcons] = useState<string[]>(() => loadCache().icons);
  const [categories, setCategories] = useState<string[]>(() => loadCache().categories);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSet, setActiveSet] = useState('all');
  const [activeStyle, setActiveStyle] = useState('All');
  const [activeSize, setActiveSize] = useState('32');
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [showNew, setShowNew] = useState(searchParams.get('new') === 'true');
  const [ready, setReady] = useState(false);

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  // Use a ref-based callback pattern instead of sentinelRef.current as a dep.
  // This gives us a stable way to attach/detach the observer whenever the
  // sentinel element mounts or unmounts (e.g. after a filter change resets the list).
  const observerRef = useRef<IntersectionObserver | null>(null);
  const totalCardsRef = useRef(0);

  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    function loadIcons() {
      if (window.Reicon?.icons && window.Reicon?.categories) {
        setAllIcons(window.Reicon.icons);
        setCategories(window.Reicon.categories);
        saveCache(window.Reicon.icons, window.Reicon.categories);
        setCategoryMap(window.Reicon.categoryMap);
        setReady(true);
      } else {
        setTimeout(loadIcons, 100);
      }
    }
    loadIcons();
  }, []);

  const filteredIcons = useMemo(() => {
    let icons = allIcons;
    if (showNew) {
      icons = icons.filter((name) => NEW_ICONS_SET.has(name));
    }
    if (activeSet !== 'all' && Object.keys(categoryMap).length > 0) {
      icons = icons.filter((name) => categoryMap[name] === activeSet);
    }
    const q = deferredQuery.trim().toLowerCase();
    if (q) {
      icons = icons.filter((name) => name.toLowerCase().includes(q));
    }
    return icons;
  }, [deferredQuery, allIcons, activeSet, categoryMap, showNew]);

  // Reset visible count whenever the filtered set changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [filteredIcons]);

  useEffect(() => {
    if (window.Reicon?.preload && filteredIcons.length > 0) {
      const namesToPreload = activeStyle === 'All'
        ? filteredIcons.slice(0, BATCH_SIZE / 2)
        : filteredIcons.slice(0, BATCH_SIZE);
      window.Reicon.preload(namesToPreload);
    }
  }, [filteredIcons, activeStyle]);

  const displaySize = parseInt(activeSize) || 32;
  const displayWeight = activeStyle === 'Filled' ? 'filled' : 'outline';

  const visibleCards = useMemo(() => {
    if (activeStyle === 'All') {
      const nameSliceCount = Math.ceil(visibleCount / 2);
      return filteredIcons.slice(0, nameSliceCount).flatMap((name) => [
        <IconCard key={`${name}-outline`} name={name} weight="outline" size={displaySize} />,
        <IconCard key={`${name}-filled`} name={name} weight="filled" size={displaySize} />,
      ]);
    }
    return filteredIcons.slice(0, visibleCount).map((name) => (
      <IconCard key={name} name={name} weight={displayWeight} size={displaySize} />
    ));
  }, [filteredIcons, visibleCount, activeStyle, displaySize, displayWeight]);

  const totalCards = activeStyle === 'All' ? filteredIcons.length * 2 : filteredIcons.length;
  const hasMore = visibleCount < totalCards;

  // Always keep the ref current so the stable observer callback reads the latest value
  totalCardsRef.current = totalCards;

  // ref-callback pattern: called with the DOM node when it mounts, null when it unmounts.
  // This fires reliably on every mount/unmount without needing sentinelRef.current as a dep.
  const sentinelRef = useCallback((node: HTMLDivElement | null) => {
    // Tear down any existing observer first
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!node) return; // sentinel unmounted — nothing more to do

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setVisibleCount((prev) => {
          const next = Math.min(prev + BATCH_SIZE, totalCardsRef.current);
          // No change? Don't trigger a re-render.
          return next === prev ? prev : next;
        });
      },
      { rootMargin: '600px' }
    );

    observer.observe(node);
    observerRef.current = observer;
  }, []); // stable — no deps needed because we read everything via refs

  // Eagerly fill the viewport on first render or after a filter change.
  // Without this, if BATCH_SIZE is smaller than a full screen, the sentinel
  // is immediately visible but the observer's initial callback may fire only
  // once before more icons are needed.
  useEffect(() => {
    if (hasMore) {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, totalCards));
    }
    // Only run when the filtered set changes (effectively on mount + filter changes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredIcons, totalCards]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Helmet>
        <title>Browse 2700+ Free Icons — Reicon Icon Library</title>
        <meta name="description" content="Browse and search 2700+ free, open-source SVG icons. Filter by category, weight, and size. Copy React, Vue, or HTML code instantly." />
        <link rel="canonical" href="https://reicon.dev/icons" />
        <meta name="keywords" content="browse icons, search icons, SVG icons, free icons, icon library, outline icons, filled icons, Vue icons, React icons, reicon" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/icons" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Browse 2700+ Free Icons — Reicon" />
        <meta property="og:description" content="Browse and search 2700+ free, open-source SVG icons. Filter by category, weight, and size." />
        <meta property="og:image" content="https://reicon.dev/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Browse 2700+ Free Icons — Reicon" />
        <meta name="twitter:description" content="Browse and search 2700+ free, open-source SVG icons. Filter by category, weight, and size." />
        <meta name="twitter:image" content="https://reicon.dev/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "Icons", "item": "https://reicon.dev/icons" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Reicon Icon Library",
          "description": "Browse and search 2700+ free, open-source SVG icons.",
          "url": "https://reicon.dev/icons",
          "isPartOf": { "@type": "WebSite", "name": "Reicon", "url": "https://reicon.dev" }
        })}</script>
      </Helmet>
      <Header />

      <div className="flex flex-1 pt-14">
        <Sidebar
          activeSet={activeSet}
          onSetChange={setActiveSet}
          activeStyle={activeStyle}
          onStyleChange={setActiveStyle}
          activeSize={activeSize}
          onSizeChange={setActiveSize}
          showNew={showNew}
          onNewToggle={setShowNew}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden">
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                <Magnifier size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search icons..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/25 focus:bg-white/10 transition-all"
              />
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden ml-auto flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm font-medium transition-colors shrink-0"
              aria-label="Open filters"
            >
              <re-icon icon="filter" size="15" />
              Filters
            </button>
          </div>

          <div className="text-[12px] text-white/30 mb-4">
            {ready ? (
              <>{filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''}</>
            ) : (
              <span className="inline-block h-3 w-16 rounded bg-white/[0.07] animate-pulse align-middle" />
            )}
          </div>

          {!ready ? (
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1.5">
              {Array.from({ length: 96 }).map((_, i) => (
                <IconCardSkeleton key={i} size={displaySize} />
              ))}
            </div>
          ) : filteredIcons.length > 0 ? (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1.5">
                {visibleCards}
              </div>

              {/* Sentinel — always rendered when hasMore, attached via ref callback */}
              {hasMore && (
                <div ref={sentinelRef} className="flex justify-center py-8">
                  <div className="flex items-center gap-2 text-white/30 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
                    Loading more icons…
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-white/30">
              <re-icon icon="ghost" size={48} color="rgba(255,255,255,0.1)" />
              <p className="text-sm mt-4">No icons found for "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-[#6C5CE7] text-sm hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}