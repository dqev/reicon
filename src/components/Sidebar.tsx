import { useState, useEffect } from 'react';

const STYLE_OPTIONS = ['All', 'Outline', 'Filled'] as const;
const SIZE_OPTIONS = ['All', '12px', '18px', '24px', '32px'] as const;

interface SidebarProps {
  activeSet: string;
  onSetChange: (set: string) => void;
  activeStyle: string;
  onStyleChange: (style: string) => void;
  activeSize: string;
  onSizeChange: (size: string) => void;
}

export default function Sidebar({
  activeSet,
  onSetChange,
  activeStyle,
  onStyleChange,
  activeSize,
  onSizeChange,
}: SidebarProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    function load() {
      if (window.Reicon?.categories) {
        setCategories(['all', ...window.Reicon.categories]);
      } else {
        setTimeout(load, 100);
      }
    }
    load();
  }, []);

  function formatLabel(cat: string): string {
    return cat
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  return (
    <aside className="w-52 shrink-0 hidden lg:block overflow-y-auto h-[calc(100vh-3.5rem)] sticky top-14 border-r border-white/[0.06] p-4">
      {/* Style Filter */}
      <div className="mb-6">
        <h3 className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-2">Style</h3>
        <div className="space-y-0.5">
          {STYLE_OPTIONS.map((style) => (
            <button
              key={style}
              onClick={() => onStyleChange(style)}
              className={`w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2 ${activeStyle === style
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
            >
              {activeStyle === style && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] shrink-0" />
              )}
              <span>{style}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <h3 className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-2">Size</h3>
        <div className="space-y-0.5">
          {SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2 ${activeSize === size
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
            >
              {activeSize === size && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] shrink-0" />
              )}
              <span>{size}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-2">Categories</h3>
        <ul className="space-y-0.5">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onSetChange(cat)}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-colors ${activeSet === cat
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`}
              >
                {formatLabel(cat)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
