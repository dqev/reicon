import { useState, useEffect, useMemo, useDeferredValue, useCallback, useRef } from 'react';
import { useSemanticIconSearch } from '@/hooks/useIconSearch';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import IconsHelmet from './IconsHelmet';
import IconSearchBar from './IconSearchBar';
import IconCount from './IconCount';
import IconGrid from './IconGrid';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { loadIconData } from '@/lib/icon-data';
import { waitForReicon } from '@/lib/reicon-loader';
import { useDuotoneData } from '@/hooks/useDuotoneData';
import { SortOption } from '@/components/ui/DesktopFilterDropdown';
import type { CustomSvgIcon } from '@/components/ui/CustomSvgCard';
import { loadGlassIcons } from '@/lib/glass-icons';
import { loadFileIcons } from '@/lib/file-icons';
import { warmGlassCache } from '@/utils/glassCache';
import { track } from '@/lib/analytics';

const LS_ICONS = 'reicon-icons-cache';
const LS_MAP = 'reicon-map-cache';

const BATCH_SIZE = 144;

function loadCache(): { icons: string[]; categoryMap: Record<string, string> } {
  try {
    const i = localStorage.getItem(LS_ICONS);
    const m = localStorage.getItem(LS_MAP);
    return {
      icons: i ? JSON.parse(i) : [],
      categoryMap: m ? JSON.parse(m) : {},
    };
  } catch {
    return { icons: [], categoryMap: {} };
  }
}

function saveCache(icons: string[], categoryMap: Record<string, string>) {
  try {
    localStorage.setItem(LS_ICONS, JSON.stringify(icons));
    localStorage.setItem(LS_MAP, JSON.stringify(categoryMap));
  } catch { }
}

export default function IconsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const cached = useMemo(() => loadCache(), []);
  const [allIcons, setAllIcons] = useState<string[]>(() => cached.icons);
  const initialQuery = searchParams.get('q') || searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const searchQueryRef = useRef(searchQuery);
  searchQueryRef.current = searchQuery;
  const lastSyncedQRef = useRef(initialQuery);
  
  const getSetFromLocation = useCallback(() => {
    const p = location.pathname.toLowerCase();
    if (p === '/flags') return 'flags';
    if (p === '/brands') return 'social-media';
    if (p === '/file-icons') return 'file-icons';
    const cat = searchParams.get('category') || searchParams.get('set');
    if (p === '/glass') return cat || 'glass';
    return cat || 'all';
  }, [location.pathname, searchParams]);

  const initialSet = getSetFromLocation();
  const initialStyle = useMemo(() => {
    const w = searchParams.get('weight')?.toLowerCase();
    if (w === 'filled') return 'Filled';
    if (w === 'duotone') return 'Duotone';
    return 'Outline';
  }, [searchParams]);

  const [activeSet, setActiveSet] = useState(initialSet);
  const [activeStyle, setActiveStyle] = useState(initialStyle);
  const [activeSize, setActiveSize] = useState('40');
  const [glassColor, setGlassColor] = useState('#9B8AFB');
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>(() => cached.categoryMap);
  const [ready, setReady] = useState(() => cached.icons.length > 0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const initialSort = (searchParams.get('sort')?.toLowerCase() === 'za' ? 'za' : 'az') as SortOption;
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleSortChange = useCallback((newSort: SortOption) => {
    setSortBy(newSort);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newSort === 'za') {
        next.set('sort', 'za');
      } else {
        next.delete('sort');
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  // Custom icon sets (Flags, Brands, and Glass)
  const [flagsData, setFlagsData] = useState<CustomSvgIcon[] | null>(null);
  const [brandsData, setBrandsData] = useState<CustomSvgIcon[] | null>(null);
  const [glassData, setGlassData] = useState<CustomSvgIcon[] | null>(null);
  const [fileData, setFileData] = useState<CustomSvgIcon[] | null>(null);
  const [customLoading, setCustomLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleSearchClear = useCallback(() => {
    lastSyncedQRef.current = '';
    setSearchQuery('');
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('q');
      next.delete('search');
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const handleSelectPrediction = useCallback((word: string) => {
    lastSyncedQRef.current = word;
    setSearchQuery(word);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('q', word);
      next.delete('search');
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const handleIconCopy = useCallback((name: string) => {
    showToast(`${name} SVG copied!`);
  }, [showToast]);

  const isGlassRoute = location.pathname.toLowerCase() === '/glass';
  const isGlass = activeSet === 'glass' || isGlassRoute;
  const isCustomSet =
    activeSet === 'flags' ||
    activeSet === 'social-media' ||
    activeSet === 'file-icons' ||
    isGlass;

  const handleStyleChange = (style: string) => {
    setActiveStyle(style);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('weight', style.toLowerCase());
    setSearchParams(newParams, { replace: true });
  };

  const handleSetChange = (set: string, source: 'ui' | 'glass' = isGlassRoute ? 'glass' : 'ui') => {
    const currentQ = searchParams.get('q') || searchParams.get('search') || '';
    const qParam = currentQ ? `?q=${encodeURIComponent(currentQ)}` : '';

    if (set === 'flags') {
      setActiveSet('flags');
      navigate(`/flags${qParam}`);
      return;
    }
    if (set === 'social-media') {
      setActiveSet('social-media');
      navigate(`/brands${qParam}`);
      return;
    }
    if (set === 'file-icons') {
      setActiveSet('file-icons');
      navigate(`/file-icons${qParam}`);
      return;
    }
    if (set === 'glass') {
      setActiveSet('glass');
      navigate(`/glass${qParam}`);
      return;
    }

    setActiveSet(set);
    if (source === 'glass' && (set === 'all' || set === 'ui')) {
      navigate(`/glass${qParam}`);
      return;
    }

    const newParams = new URLSearchParams();
    const w = searchParams.get('weight');
    if (w) newParams.set('weight', w);
    if (currentQ) newParams.set('q', currentQ);
    const sort = searchParams.get('sort');
    if (sort) newParams.set('sort', sort);
    if (set !== 'all' && set !== 'ui') {
      newParams.set('category', set);
    }
    const query = newParams.toString();
    const basePath = source === 'glass' ? '/glass' : '/icons';
    navigate(`${basePath}${query ? `?${query}` : ''}`);
  };

  const { duotoneMap, loading: duotoneLoading } = useDuotoneData(activeStyle);

  useEffect(() => {
    const w = searchParams.get('weight')?.toLowerCase();
    const newStyle = w === 'filled' ? 'Filled' : w === 'duotone' ? 'Duotone' : 'Outline';
    setActiveStyle((prev) => (prev !== newStyle ? newStyle : prev));

    const nextSet = getSetFromLocation();
    setActiveSet((prev) => (prev !== nextSet ? nextSet : prev));

    const urlQ = searchParams.get('q') || searchParams.get('search') || '';
    if (urlQ !== lastSyncedQRef.current) {
      lastSyncedQRef.current = urlQ;
      setSearchQuery(urlQ);
    }

    const urlSort = (searchParams.get('sort')?.toLowerCase() === 'za' ? 'za' : 'az') as SortOption;
    setSortBy((prev) => (prev !== urlSort ? urlSort : prev));
  }, [searchParams, getSetFromLocation]);

  // Persist current route with full query in sessionStorage for detail back navigation
  useEffect(() => {
    try {
      const p = new URLSearchParams(searchParams);
      const q = searchQuery.trim();
      if (q) p.set('q', q);
      else { p.delete('q'); p.delete('search'); }
      sessionStorage.setItem('reicon_last_icons_url', `${location.pathname}?${p.toString()}`);
    } catch {}
  }, [searchQuery, location.pathname, searchParams]);

  // Flush pending query to browser history entry right before unmounting
  useEffect(() => {
    return () => {
      const trimmed = searchQueryRef.current.trim();
      try {
        const url = new URL(window.location.href);
        if (trimmed) {
          url.searchParams.set('q', trimmed);
          url.searchParams.delete('search');
        } else {
          url.searchParams.delete('q');
          url.searchParams.delete('search');
        }
        window.history.replaceState(window.history.state, '', url.toString());
      } catch {}
    };
  }, []);

  // Redirect legacy or query-based /icons?category=flags to /flags, social-media to /brands, glass to /glass
  useEffect(() => {
    const cat = (searchParams.get('category') || searchParams.get('set'))?.toLowerCase();
    if (cat === 'flags' || cat === 'flag') {
      navigate('/flags', { replace: true });
    } else if (cat === 'social-media' || cat === 'brands' || cat === 'brand') {
      navigate('/brands', { replace: true });
    } else if (cat === 'glass') {
      navigate('/glass', { replace: true });
    }
  }, [searchParams, navigate]);

  // Load normal Reicon icons
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [iconData] = await Promise.all([loadIconData(), waitForReicon()]);
        if (cancelled) return;
        const newCatMap: Record<string, string> = {};
        if (iconData?.searchIndex) {
          for (const entry of iconData.searchIndex) {
            newCatMap[entry.n] = entry.c;
          }
        }
        if (window.Reicon?.categoryMap) {
          Object.assign(newCatMap, window.Reicon.categoryMap);
        }
        setCategoryMap(newCatMap);

        if (window.Reicon?.icons && window.Reicon.icons.length > 0) {
          setAllIcons(window.Reicon.icons);
          saveCache(window.Reicon.icons, newCatMap);
        } else if (iconData?.searchIndex) {
          const names = iconData.searchIndex.map((e) => e.n);
          setAllIcons(names);
          saveCache(names, newCatMap);
        }
        setReady(true);
      } catch {
        if (!cancelled) setLoadError('Failed to load icon data');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Lazy-load custom datasets (Flags / Brands) on demand
  useEffect(() => {
    if (activeSet === 'flags' && !flagsData) {
      setCustomLoading(true);
      import('@/data/flag.json')
        .then((mod) => {
          const list = (mod.default?.icons || (mod as any).icons || []) as CustomSvgIcon[];
          setFlagsData(list);
          setCustomLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load flags:', err);
          setCustomLoading(false);
        });
    } else if (activeSet === 'social-media' && !brandsData) {
      setCustomLoading(true);
      import('@/data/brands.json')
        .then((mod) => {
          const list = (mod.default?.icons || (mod as any).icons || []) as CustomSvgIcon[];
          setBrandsData(list);
          setCustomLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load brands:', err);
          setCustomLoading(false);
        });
    } else if (activeSet === 'file-icons' && !fileData) {
      setCustomLoading(true);
      loadFileIcons()
        .then((list) => {
          setFileData(list);
          setCustomLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load file icons:', err);
          setCustomLoading(false);
        });
    } else if (isGlassRoute && !glassData) {
      setCustomLoading(true);
      loadGlassIcons()
        .then((list) => {
          setGlassData(list);
          setCustomLoading(false);
          warmGlassCache(list, glassColor, displaySize, 120);
        })
        .catch((err) => {
          console.error('Failed to load glass icons:', err);
          setCustomLoading(false);
        });
    }
  }, [activeSet, isGlassRoute, flagsData, brandsData, fileData, glassData]);

  const getSectionGroup = (set: string, isGlass: boolean) => {
    if (isGlass || set === 'glass') return 'glass';
    if (set === 'flags') return 'flags';
    if (set === 'social-media') return 'social-media';
    if (set === 'file-icons') return 'file-icons';
    return 'ui';
  };

  // Grid-only loading loop when switching top-level sections (sidebar/search stay visible).
  const [sectionLoading, setSectionLoading] = useState(false);
  const sectionTimer = useRef(0);
  const prevSectionGroupRef = useRef<string>(getSectionGroup(initialSet, isGlassRoute));

  useEffect(() => {
    const currentGroup = getSectionGroup(activeSet, isGlassRoute);
    if (prevSectionGroupRef.current === currentGroup) {
      return;
    }
    prevSectionGroupRef.current = currentGroup;

    setSectionLoading(true);
    window.clearTimeout(sectionTimer.current);
    sectionTimer.current = window.setTimeout(() => setSectionLoading(false), 200);
    return () => window.clearTimeout(sectionTimer.current);
  }, [activeSet, isGlassRoute]);

  const deferredQuery = useDeferredValue(searchQuery);
  const { results: searchResults, predictions } = useSemanticIconSearch(deferredQuery, 500);
  const lastTrackedSearch = useRef('');

  // Debounced URL sync: only updates URL 300ms after user pauses typing
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const trimmed = searchQuery.trim();
      const currentQ = searchParams.get('q') || searchParams.get('search') || '';
      if (trimmed !== currentQ) {
        lastSyncedQRef.current = trimmed;
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          if (trimmed) {
            next.set('q', trimmed);
            next.delete('search');
          } else {
            next.delete('q');
            next.delete('search');
          }
          return next;
        }, { replace: true });
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchQuery, searchParams, setSearchParams]);

  useEffect(() => {
    const q = deferredQuery.trim();
    if (q.length < 2 || q === lastTrackedSearch.current) return;
    const timer = window.setTimeout(() => {
      lastTrackedSearch.current = q;
      track('icon_search', { search_term: q });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [deferredQuery]);

  // Filter normal icons
  const filteredIcons = useMemo(() => {
    let icons = allIcons;
    if (activeSet !== 'all' && activeSet !== 'ui') {
      if (Object.keys(categoryMap).length > 0) {
        icons = icons.filter((name) => categoryMap[name] === activeSet);
      }
    }
    const q = deferredQuery.trim().toLowerCase();
    if (q) {
      const ranked = new Map(searchResults.map((r, i) => [r.name, i]));
      icons = icons
        .filter((name) => ranked.has(name))
        .sort((a, b) => (ranked.get(a) ?? Infinity) - (ranked.get(b) ?? Infinity));
    }
    return icons;
  }, [deferredQuery, allIcons, activeSet, categoryMap, searchResults]);

  const sortedIcons = useMemo(() => {
    const q = deferredQuery.trim();
    if (q) {
      if (sortBy === 'za') return [...filteredIcons].reverse();
      return filteredIcons;
    }
    if (sortBy === 'za') return [...filteredIcons].sort((a, b) => b.localeCompare(a));
    return [...filteredIcons].sort((a, b) => a.localeCompare(b));
  }, [filteredIcons, sortBy, deferredQuery]);

  // Filter & sort custom icons (Flags, Brands, Glass)
  const filteredCustomIcons = useMemo(() => {
    if (!isCustomSet) return null;
    const source =
      activeSet === 'flags'
        ? (flagsData || [])
        : isGlass
        ? (glassData || [])
        : activeSet === 'file-icons'
        ? (fileData || [])
        : (brandsData || []);
    const q = deferredQuery.trim().toLowerCase();
    let list = source;

    if (isGlass && activeSet !== 'glass' && activeSet !== 'all') {
      const catTarget = activeSet.toLowerCase();
      list = list.filter((icon) => {
        const c = (icon as any).category?.toLowerCase() || '';
        return c === catTarget || c.replace(/[^a-z0-9]+/g, '-') === catTarget;
      });
    }

    if (q) {
      const predWords = predictions.map((p) => p.word.toLowerCase());
      list = list.filter((icon) => {
        const nameMatch = icon.name.toLowerCase().includes(q);
        const tagsMatch = icon.tags ? icon.tags.toLowerCase().includes(q) : false;
        const urlMatch = icon.url ? icon.url.toLowerCase().includes(q) : false;
        if (nameMatch || tagsMatch || urlMatch) return true;
        return predWords.some((w) => icon.name.toLowerCase().includes(w) || (icon.tags ? icon.tags.toLowerCase().includes(w) : false));
      });
    }
    if (sortBy === 'za') {
      return [...list].sort((a, b) => b.name.localeCompare(a.name));
    }
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [isCustomSet, isGlass, activeSet, flagsData, brandsData, fileData, glassData, deferredQuery, sortBy, predictions]);

  useEffect(() => {
    if (window.Reicon?.preload && sortedIcons.length > 0 && !isCustomSet) {
      window.Reicon.preload(sortedIcons.slice(0, BATCH_SIZE));
    }
  }, [sortedIcons, isCustomSet]);

  const displaySize = parseInt(activeSize) || 32;
  const displayWeight = activeStyle === 'Filled' ? 'filled' : 'outline';

  const customDataReady = isGlass
    ? glassData !== null
    : activeSet === 'flags'
    ? flagsData !== null
    : activeSet === 'social-media'
    ? brandsData !== null
    : activeSet === 'file-icons'
    ? fileData !== null
    : true;
  const isReady = isCustomSet ? (!customLoading && customDataReady) : ready;
  const currentCount = isCustomSet
    ? (filteredCustomIcons ? filteredCustomIcons.length : 0)
    : sortedIcons.length;

  if (loadError) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-sm">{loadError}</p>
        <button onClick={() => window.location.reload()} className="text-sm text-[#9B8AFB] hover:underline cursor-pointer">Retry</button>
      </div>
    );
  }

  if (!ready && allIcons.length === 0 && !isCustomSet) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex-1">
      <IconsHelmet />

      <div className="max-w-[1240px] mx-auto w-full flex flex-1 pt-2 md:pt-4 px-5 md:px-10">
        <Sidebar
          activeSet={activeSet}
          onSetChange={handleSetChange}
          activeStyle={activeStyle}
          onStyleChange={handleStyleChange}
          activeSize={activeSize}
          onSizeChange={setActiveSize}
          activeColor={glassColor}
          onColorChange={setGlassColor}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          glassRoute={isGlassRoute}
        />

        <main className={`flex-1 pb-4 md:pb-6 px-0 md:pr-0 ${sidebarCollapsed ? 'md:pl-0' : 'md:pl-6'} transition-all duration-300 ease-in-out`}>
          <div className="sticky top-[68px] z-20 bg-bg-base pt-0 pb-1 before:content-[''] before:absolute before:bottom-full before:left-0 before:right-0 before:h-[68px] before:bg-bg-base">
            <IconSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onFilterClick={() => setSidebarOpen(true)}
              isCollapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              predictions={predictions}
              onSelectPrediction={handleSelectPrediction}
            />

            <IconCount count={currentCount} ready={isReady && !sectionLoading} />
          </div>

          <IconGrid
            filteredIcons={sortedIcons}
            customIcons={isCustomSet ? filteredCustomIcons : null}
            customSetType={
              activeSet === 'flags'
                ? 'flag'
                : isGlass
                ? 'glass'
                : activeSet === 'file-icons'
                ? 'file'
                : 'brand'
            }
            glassColor={glassColor}
            activeStyle={activeStyle}
            displaySize={displaySize}
            displayWeight={displayWeight}
            ready={isReady}
            sectionLoading={sectionLoading}
            searchQuery={searchQuery}
            onSearchClear={handleSearchClear}
            duotoneMap={duotoneMap}
            duotoneLoading={duotoneLoading}
            onIconCopy={handleIconCopy}
          />
        </main>
      </div>

      {/* Floating Copy Feedback Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-[#1f1f1f]/95 backdrop-blur-md text-white text-xs font-medium rounded-xl border border-white/[0.12] shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#9B8AFB]" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
