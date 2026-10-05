import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HexColorPicker } from 'react-colorful';
import { subscribeIcons } from '@/utils/iconDataLoader';
import './sidebar.css';

interface SidebarProps {
  activeSet: string;
  onSetChange: (set: string) => void;
  activeStyle: string;
  onStyleChange: (style: string) => void;
  activeSize: string;
  onSizeChange: (size: string) => void;
  activeColor?: string;
  onColorChange?: (color: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
}

interface SetDefinition {
  id: string;
  label: string;
  expandable?: boolean;
  categories?: string[];
  path?: string;
}

const DEFAULT_UI_CATEGORIES = [
  'arrows',
  'arrows-action',
  'astronomy',
  'building',
  'business',
  'call',
  'devices',
  'faces',
  'files',
  'folders',
  'food',
  'hands',
  'home',
  'it',
  'like',
  'list',
  'map',
  'medicine',
  'messages',
  'money',
  'nature',
  'newicons',
  'notes',
  'notifications',
  'parts',
  'school',
  'search',
  'security',
  'settings',
  'shopping',
  'sports',
  'text-formatting',
  'time',
  'tools',
  'ui',
  'users',
  'video',
  'weather',
];

const SETS: SetDefinition[] = [
  { id: 'ui', label: 'UI', expandable: true, path: '/icons' },
  { id: 'glass', label: 'Glass', expandable: true, path: '/glass' },
  { id: 'flags', label: 'Flags', path: '/flags' },
  { id: 'social-media', label: 'Social Media', path: '/brands' },
];

interface StyleOptionItem {
  id: string;
  label: string;
  value: string;
  iconType?: 'circle' | 'fill' | 'duotone';
  isBeta?: boolean;
}

const STYLE_OPTIONS_LIST: StyleOptionItem[] = [
  { id: 'Outline', label: 'Outline', value: 'Outline', iconType: 'circle' },
  { id: 'Filled', label: 'Filled', value: 'Filled', iconType: 'fill' },
  { id: 'Duotone', label: 'Duotone', value: 'Duotone', iconType: 'duotone', isBeta: true },
];

interface SizeOptionItem {
  id: string;
  label: string;
  value: string;
}

const SIZE_OPTIONS_LIST: SizeOptionItem[] = [
  { id: 'all', label: 'All', value: '40' },
  { id: '24', label: '24px', value: '24' },
  { id: '32', label: '32px', value: '32' },
  { id: '40', label: '40px', value: '40' },
  { id: '48', label: '48px', value: '48' },
];

const FLAG_SIZE_OPTIONS_LIST: SizeOptionItem[] = [
  { id: 'all', label: 'All', value: '40' },
  { id: '32', label: '32px', value: '32' },
  { id: '40', label: '40px', value: '40' },
  { id: '48', label: '48px', value: '48' },
  { id: '64', label: '64px', value: '64' },
];


function formatCategoryName(name: string) {
  const lower = name.toLowerCase();
  if (lower === 'ui') return 'UI';
  if (lower === 'it') return 'IT';
  if (lower === 'newicons') return 'New Icons';
  if (lower === 'ar/vr') return 'AR/VR';
  return name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function Sidebar({
  activeSet,
  onSetChange,
  activeStyle,
  onStyleChange,
  activeSize,
  onSizeChange,
  activeColor = '#9B8AFB',
  onColorChange,
  isOpen = false,
  onClose,
  collapsed = false,
}: SidebarProps) {
  const navigate = useNavigate();
  const [uiCategories, setUiCategories] = useState<string[]>(DEFAULT_UI_CATEGORIES);
  const [expandedSets, setExpandedSets] = useState<Record<string, boolean>>({});
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const isFlagsSet = activeSet === 'flags';
  const sizeOptions = isFlagsSet ? FLAG_SIZE_OPTIONS_LIST : SIZE_OPTIONS_LIST;

  const [selectedSizeId, setSelectedSizeId] = useState<string>(() => {
    const list = activeSet === 'flags' ? FLAG_SIZE_OPTIONS_LIST : SIZE_OPTIONS_LIST;
    const found = list.find((s) => s.value === activeSize && s.id !== 'all');
    return found ? found.id : 'all';
  });

  useEffect(() => {
    function loadCategories() {
      const win = window as any;
      if (win.Reicon?.categories && Array.isArray(win.Reicon.categories) && win.Reicon.categories.length > 0) {
        setUiCategories(win.Reicon.categories);
      } else if (win.Reicon?.categoryMap && Object.keys(win.Reicon.categoryMap).length > 0) {
        const unique = Array.from(new Set(Object.values(win.Reicon.categoryMap) as string[])).sort();
        setUiCategories(unique);
      }
    }
    loadCategories();
    const unsub = subscribeIcons(loadCategories);
    return () => unsub();
  }, []);

  useEffect(() => {
    // Reset to the list default when the current selection isn't in it
    // (e.g. switching to/from the flags page).
    if (!sizeOptions.some((s) => s.id === selectedSizeId)) {
      setSelectedSizeId('all');
      const fallback = sizeOptions.find((s) => s.id === 'all');
      if (fallback && activeSize !== fallback.value) {
        onSizeChange(fallback.value);
      }
      return;
    }
    if (activeSize && selectedSizeId !== 'all') {
      const match = sizeOptions.find((s) => s.value === activeSize && s.id !== 'all');
      if (match && match.id !== selectedSizeId) {
        setSelectedSizeId(match.id);
      }
    }
  }, [activeSize, selectedSizeId, sizeOptions, onSizeChange]);

  const toggleExpand = (setId: string) => {
    setExpandedSets((prev) => ({
      ...prev,
      [setId]: !prev[setId],
    }));
  };

  const handleSetClick = (set: SetDefinition) => {
    if (set.expandable) {
      setExpandedSets((prev) => ({
        ...prev,
        [set.id]: !prev[set.id],
      }));
      onSetChange(set.id === 'ui' ? 'all' : set.id);
      if (set.path) {
        navigate(set.path);
      }
    } else if (set.path) {
      onSetChange(set.id);
      navigate(set.path);
    } else {
      onSetChange(set.id);
    }
  };

  const isSetSelected = (set: SetDefinition) => {
    if (set.id === 'ui') {
      return activeSet === 'ui' || activeSet === 'all';
    }
    return activeSet === set.id;
  };

  const handleSizeSelect = (item: SizeOptionItem) => {
    setSelectedSizeId(item.id);
    onSizeChange(item.value);
  };

  // Reusable subcomponents for scrollable sets and fixed tools
  const renderSetsList = () => (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1">
        {SETS.map((set) => {
          const isExpanded = Boolean(expandedSets[set.id]);
          const isSelected = isSetSelected(set);

          return (
            <div key={set.id} className="flex flex-col">
              <button
                type="button"
                onClick={() => handleSetClick(set)}
                className={`sidebar-set-btn ${isSelected ? 'active' : ''}`}
              >
                {/* Expand / Collapse Icon or Spacer */}
                {set.expandable ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(set.id);
                    }}
                    className={`w-5 h-5 flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                      isExpanded || isSelected ? 'text-white' : 'text-[#8f8f8f] hover:text-white'
                    }`}
                    title={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    <re-icon
                      icon="chevron-down"
                      size="12"
                      color="currentColor"
                      className="sidebar-chevron-icon"
                      style={{
                        transform: isExpanded ? 'none' : 'rotate(-90deg)',
                        transition: 'transform 150ms ease',
                      }}
                    />
                  </span>
                ) : (
                  <span className="w-5 h-5 shrink-0" aria-hidden="true" />
                )}

                <span className="text-[13px] leading-tight truncate">{set.label}</span>
              </button>

              {/* Subcategories (Indented Accordion Content - Accent text only, NO background card) */}
              {set.expandable && isExpanded && (
                <div className="flex flex-col gap-0.5 pl-7 pr-1 pt-1 pb-1.5 transition-all">
                  {set.id === 'ui' || set.id === 'glass' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          if (set.id === 'glass') {
                            onSetChange('glass');
                            navigate('/glass');
                          } else {
                            onSetChange('all');
                            navigate('/icons');
                          }
                        }}
                        className={`sidebar-subcat-btn ${
                          (set.id === 'ui' && (activeSet === 'all' || activeSet === 'ui')) ||
                          (set.id === 'glass' && activeSet === 'glass')
                            ? 'active'
                            : ''
                        }`}
                      >
                        All Categories
                      </button>
                      {uiCategories.map((cat) => {
                        const isCatActive = activeSet === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              onSetChange(cat);
                              if (set.id === 'glass') {
                                navigate(`/glass?category=${cat}`);
                              } else {
                                navigate(`/icons?category=${cat}`);
                              }
                            }}
                            className={`sidebar-subcat-btn ${isCatActive ? 'active' : ''}`}
                          >
                            {formatCategoryName(cat)}
                          </button>
                        );
                      })}
                    </>
                  ) : set.categories && set.categories.length > 0 ? (
                    set.categories.map((cat) => {
                      const catId = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      const isCatActive = activeSet === catId;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => onSetChange(catId)}
                          className={`sidebar-subcat-btn ${isCatActive ? 'active' : ''}`}
                        >
                          {cat}
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-2.5 py-1 text-[12px] text-[#767676] italic">
                      No subcategories
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const isCustomSet = activeSet === 'flags' || activeSet === 'social-media' || activeSet === 'glass';

  const renderTools = () => (
    <div className="flex flex-col">
      <div className="sidebar-tools-divider" />

      {/* ─── Style Tool Section (Hidden for Flags & Brands) ─── */}
      {!isCustomSet && (
        <div className="flex flex-col mb-3">
          <div className="sidebar-tool-card">
            {STYLE_OPTIONS_LIST.map((item) => {
              const isChecked = activeStyle === item.value;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onStyleChange(item.value)}
                  className={`sidebar-tool-btn ${isChecked ? 'active' : ''}`}
                >
                  {/* Left checkmark or spacer */}
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    {isChecked && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="text-white"
                      >
                        <path
                          d="M2.5 6.2L4.8 8.5L9.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>

                  <span className="text-[13px] leading-none select-none flex items-center gap-1.5">
                    {item.label}
                    {item.isBeta && (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-[var(--pro-tint-bg)] text-[var(--pro-tint-ink)] leading-none select-none">
                        Beta
                      </span>
                    )}
                  </span>

                  {/* Right Indicator Icon */}
                  <span className="ml-auto flex items-center justify-center shrink-0">
                    {item.iconType === 'circle' && (
                      <span className="w-3.5 h-3.5 rounded-full border border-white/40 shrink-0" />
                    )}
                    {item.iconType === 'fill' && (
                      <span className="w-3.5 h-3.5 rounded-full bg-white/60 shrink-0" />
                    )}
                    {item.iconType === 'duotone' && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="shrink-0 text-white/60"
                      >
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M7 1.5A5.5 5.5 0 0 1 7 12.5V1.5Z" fill="currentColor" />
                      </svg>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Color Tool Section (Single Button with react-colorful Picker on Glass Page) ─── */}
      {activeSet === 'glass' && (
        <div className="flex flex-col mb-3 relative">
          <div className="sidebar-tool-card">
            <button
              type="button"
              onClick={() => setIsColorPickerOpen((prev) => !prev)}
              className="sidebar-tool-btn flex items-center justify-between cursor-pointer group"
            >
              <span className="text-[13px] leading-none select-none text-[#ededed] group-hover:text-white transition-colors">
                Color
              </span>

              {/* Right Accent Color Swatch */}
              <span className="flex items-center gap-1.5 shrink-0">
                <span
                  className="w-4 h-4 rounded-full shrink-0 border border-white/20 shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: activeColor || '#9B8AFB' }}
                />
              </span>
            </button>
          </div>

          {/* react-colorful Popover */}
          {isColorPickerOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsColorPickerOpen(false)}
              />
              <div
                className="absolute left-0 right-0 bottom-full mb-2 z-50 bg-[#1e1e1e] border border-white/10 rounded-2xl p-3 shadow-2xl flex flex-col gap-2.5"
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1)' }}
              >
                <div className="flex justify-center w-full [&_.react-colorful]:w-full [&_.react-colorful]:h-[150px]">
                  <HexColorPicker
                    color={activeColor || '#9B8AFB'}
                    onChange={(newColor) => onColorChange?.(newColor)}
                  />
                </div>
                <div className="flex gap-1.5 items-center">
                  <span className="text-[10px] text-white/40 font-mono">HEX</span>
                  <input
                    type="text"
                    value={activeColor || '#9B8AFB'}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.startsWith('#')) {
                        if (val.length <= 7) onColorChange?.(val);
                      } else {
                        if (val.length <= 6) onColorChange?.('#' + val);
                      }
                    }}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white text-center focus:outline-none focus:border-[#9B8AFB]/60 uppercase"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ─── Size Tool Section ─── */}
      <div className="flex flex-col">
        <div className="sidebar-tool-card">
          {sizeOptions.map((item) => {
            const isChecked = selectedSizeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSizeSelect(item)}
                className={`sidebar-tool-btn ${isChecked ? 'active' : ''}`}
              >
                {/* Left checkmark or spacer */}
                <span className="w-4 h-4 flex items-center justify-center shrink-0">
                  {isChecked && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M2.5 6.2L4.8 8.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>

                <span className="text-[13px] leading-none select-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar: Split into Upper Scrollable Sets & Pinned Bottom Tools */}
      <aside
        id="nd-sidebar"
        className={`hidden lg:flex flex-col ${collapsed ? 'is-collapsed' : ''}`}
        data-lenis-prevent
      >
        <div className="sidebar-scrollable-sets">
          {renderSetsList()}
        </div>

        <div className="sidebar-fixed-tools">
          {renderTools()}
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpen && <div onClick={onClose} className="reicon-sidebar-backdrop" aria-hidden />}

      {/* Mobile Drawer */}
      <aside
        className={`reicon-sidebar-drawer ${isOpen ? 'is-open' : ''}`}
        data-lenis-prevent
      >
        <div className="reicon-sidebar-drawer-head">
          <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-base)' }}>
            Filters
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="reicon-sidebar-close"
              aria-label="Close sidebar"
            >
              <re-icon
                icon="x"
                size="16"
                color="currentColor"
                style={{ color: 'var(--text-muted)' }}
              />
            </button>
          )}
        </div>
        <div className="sidebar-scrollable-sets">
          {renderSetsList()}
        </div>
        <div className="sidebar-fixed-tools">
          {renderTools()}
        </div>
      </aside>
    </>
  );
}

export default React.memo(Sidebar);
