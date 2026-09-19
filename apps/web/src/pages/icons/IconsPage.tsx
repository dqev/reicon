import { useState, useEffect, useMemo, useDeferredValue } from 'react';
import { useIconSearch } from '@/hooks/useIconSearch';
import { useSearchParams } from 'react-router-dom';
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

const LS_ICONS = 'reicon-icons-cache';
const LS_MAP = 'reicon-map-cache';

const BATCH_SIZE = 60;

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
  const cached = useMemo(() => loadCache(), []);
  const [allIcons, setAllIcons] = useState<string[]>(() => cached.icons);
  const [searchQuery, setSearchQuery] = useState('');
  
  const initialSet = searchParams.get('category') || searchParams.get('set') || 'all';
  const initialStyle = useMemo(() => {
    const w = searchParams.get('weight')?.toLowerCase();
    if (w === 'filled') return 'Filled';
    if (w === 'duotone') return 'Duotone';
    return 'Outline';
  }, [searchParams]);

  const [activeSet, setActiveSet] = useState(initialSet);
  const [activeStyle, setActiveStyle] = useState(initialStyle);
  const [activeSize, setActiveSize] = useState('36');
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>(() => cached.categoryMap);
  const [ready, setReady] = useState(() => cached.icons.length > 0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('az');
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleStyleChange = (style: string) => {
    setActiveStyle(style);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('weight', style.toLowerCase());
    setSearchParams(newParams, { replace: true });
  };

  const handleSetChange = (set: string) => {
    setActiveSet(set);
    const newParams = new URLSearchParams(searchParams);
    if (set !== 'all') {
      newParams.set('category', set);
    } else {
      newParams.delete('category');
      newParams.delete('set');
    }
    setSearchParams(newParams, { replace: true });
  };

  const { duotoneMap, loading: duotoneLoading } = useDuotoneData(activeStyle);

  useEffect(() => {
    const w = searchParams.get('weight')?.toLowerCase();
    const newStyle = w === 'filled' ? 'Filled' : w === 'duotone' ? 'Duotone' : 'Outline';
    setActiveStyle((prev) => (prev !== newStyle ? newStyle : prev));

    const cat = searchParams.get('category') || searchParams.get('set') || 'all';
    setActiveSet((prev) => (prev !== cat ? cat : prev));
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await Promise.all([loadIconData(), waitForReicon()]);
        if (cancelled) return;
        if (window.Reicon?.icons) {
          setAllIcons(window.Reicon.icons);
          saveCache(window.Reicon.icons, window.Reicon.categoryMap);
          setCategoryMap(window.Reicon.categoryMap);
        }
        setReady(true);
      } catch {
        if (!cancelled) setLoadError('Failed to load icon data');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const deferredQuery = useDeferredValue(searchQuery);
  const searchResults = useIconSearch(deferredQuery, 500);

  const filteredIcons = useMemo(() => {
    let icons = allIcons;
    if (activeSet !== 'all' && Object.keys(categoryMap).length > 0) {
      icons = icons.filter((name) => categoryMap[name] === activeSet);
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

  useEffect(() => {
    if (window.Reicon?.preload && sortedIcons.length > 0) {
      window.Reicon.preload(sortedIcons.slice(0, BATCH_SIZE));
    }
  }, [sortedIcons]);

  const displaySize = parseInt(activeSize) || 32;
  const displayWeight = activeStyle === 'Filled' ? 'filled' : 'outline';

  if (loadError) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-sm">{loadError}</p>
        <button onClick={() => window.location.reload()} className="text-sm text-[#9B8AFB] hover:underline cursor-pointer">Retry</button>
      </div>
    );
  }

  if (!ready && allIcons.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex-1">
      <IconsHelmet />

      <div className="flex flex-1 pt-14 px-4 md:px-10">
        <Sidebar
          activeSet={activeSet}
          onSetChange={handleSetChange}
          activeStyle={activeStyle}
          onStyleChange={handleStyleChange}
          activeSize={activeSize}
          onSizeChange={setActiveSize}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
        />

        <main className={`flex-1 py-4 md:py-6 px-0 md:pr-0 ${sidebarCollapsed ? 'md:pl-0' : 'md:pl-6'} transition-all duration-300 ease-in-out`}>
          <IconSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterClick={() => setSidebarOpen(true)}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <IconCount count={sortedIcons.length} ready={ready} />

          <IconGrid
            filteredIcons={sortedIcons}
            activeStyle={activeStyle}
            displaySize={displaySize}
            displayWeight={displayWeight}
            ready={ready}
            searchQuery={searchQuery}
            onSearchClear={() => setSearchQuery('')}
            duotoneMap={duotoneMap}
            duotoneLoading={duotoneLoading}
          />
        </main>
      </div>
    </div>
  );
}
