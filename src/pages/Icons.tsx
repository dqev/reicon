import { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import IconCard from '../components/IconCard';
import { Magnifier } from 'reicon-react';

declare global {
  interface Window {
    Reicon?: {
      icons: string[];
      categories: string[];
      ready: Promise<void>;
      preload: (names: string[]) => void;
    };
  }
}

const LS_ICONS = 'reicon-icons-cache';
const LS_CATS = 'reicon-cats-cache';
const LS_CAT_MAP = 'reicon-cat-map-cache';

async function buildCategoryMap(categories: string[]): Promise<Record<string, string>> {
  try {
    const cached = localStorage.getItem(LS_CAT_MAP);
    if (cached) {
      const map = JSON.parse(cached);
      if (Object.keys(map).length > 0) return map;
    }
  } catch { }
  const map: Record<string, string> = {};
  try {
    const resp = await fetch('https://cdn.reicon.dev/cdn/reicon.min.js');
    const text = await resp.text();
    const regex = /"([^"]+)":\[(\d+),\{/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const catIndex = parseInt(match[2], 10);
      if (catIndex < categories.length) map[match[1]] = categories[catIndex];
    }
    localStorage.setItem(LS_CAT_MAP, JSON.stringify(map));
  } catch { }
  return map;
}

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
  const cached = loadCache();
  const [allIcons, setAllIcons] = useState<string[]>(cached.icons);
  const [categories, setCategories] = useState<string[]>(cached.categories);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSet, setActiveSet] = useState('all');
  const [activeStyle, setActiveStyle] = useState('All');
  const [activeSize, setActiveSize] = useState('All');
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

  useEffect(() => {
    function loadIcons() {
      if (window.Reicon?.icons && window.Reicon?.categories) {
        setAllIcons(window.Reicon.icons);
        setCategories(window.Reicon.categories);
        saveCache(window.Reicon.icons, window.Reicon.categories);
        buildCategoryMap(window.Reicon.categories).then(setCategoryMap);
      } else {
        setTimeout(loadIcons, 100);
      }
    }
    loadIcons();
  }, []);

  const filteredIcons = useMemo(() => {
    let icons = allIcons;
    if (activeSet !== 'all' && Object.keys(categoryMap).length > 0) {
      icons = icons.filter((name) => categoryMap[name] === activeSet);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      icons = icons.filter((name) => name.toLowerCase().includes(q));
    }
    return icons;
  }, [searchQuery, allIcons, activeSet, categoryMap]);

  // Batch preload all visible icons so each <re-icon> doesn't fetch individually
  useEffect(() => {
    if (window.Reicon?.preload && filteredIcons.length > 0) {
      window.Reicon.preload(filteredIcons.slice(0, 200));
    }
  }, [filteredIcons]);

  const displaySize = activeSize === 'All' ? 32 : parseInt(activeSize);
  const displayWeight = activeStyle === 'Filled' ? 'filled' : 'outline';

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Header />

      <div className="flex flex-1 pt-14">
        {/* Sidebar — desktop only */}
        <Sidebar
          activeSet={activeSet}
          onSetChange={setActiveSet}
          activeStyle={activeStyle}
          onStyleChange={setActiveStyle}
          activeSize={activeSize}
          onSizeChange={setActiveSize}
        />

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Search bar */}
          <div className="mb-4">
            <div className="relative">
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
          </div>

          {/* Mobile filters — category, weight, size */}
          <div className="lg:hidden grid grid-cols-2 gap-2 mb-4">
            <div className="relative">
              <select
                value={activeStyle}
                onChange={(e) => setActiveStyle(e.target.value)}
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg px-3 pr-8 py-2 text-sm text-white outline-none"
              >
                <option value="All">All Styles</option>
                <option value="Outline">Outline</option>
                <option value="Filled">Filled</option>
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </div>
            <div className="relative">
              <select
                value={activeSize}
                onChange={(e) => setActiveSize(e.target.value)}
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg px-3 pr-8 py-2 text-sm text-white outline-none"
              >
                <option value="All">All Sizes</option>
                <option value="12px">12px</option>
                <option value="18px">18px</option>
                <option value="24px">24px</option>
                <option value="32px">32px</option>
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </div>
            <div className="relative col-span-2">
              <select
                value={activeSet}
                onChange={(e) => setActiveSet(e.target.value)}
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg px-3 pr-8 py-2 text-sm text-white outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </div>
          </div>

          {/* Icon count */}
          <div className="text-[12px] text-white/30 mb-4">
            {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''}
          </div>

          {/* Icon grid */}
          {filteredIcons.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1.5">
              {activeStyle === 'All'
                ? filteredIcons.flatMap((name) => [
                  <IconCard key={`${name}-outline`} name={name} weight="outline" size={displaySize} />,
                  <IconCard key={`${name}-filled`} name={name} weight="filled" size={displaySize} />,
                ])
                : filteredIcons.map((name) => (
                  <IconCard
                    key={name}
                    name={name}
                    weight={displayWeight}
                    size={displaySize}
                  />
                ))}
            </div>
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
