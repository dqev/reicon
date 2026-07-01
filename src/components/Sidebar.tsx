import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import newIconsData from '../data/new-icons-added.json';
import { Check } from 'reicon-react';

const STYLE_OPTIONS = ['All', 'Outline', 'Filled'] as const;
const SIZE_OPTIONS = ['12', '18', '24', '32'] as const;
const NEW_ICONS_COUNT = (newIconsData as string[]).length;

interface SidebarProps {
  activeSet: string;
  onSetChange: (set: string) => void;
  activeStyle: string;
  onStyleChange: (style: string) => void;
  activeSize: string;
  onSizeChange: (size: string) => void;
  showNew: boolean;
  onNewToggle: (val: boolean) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// EXACT animate-ui sidebar motion, translated to reicon dark theme.
//
// Source: apps/www/components/docs/sidebar.tsx — SidebarPageTree / SidebarLinkItem
//
// Per item:
//   <div relative hover:bg-transparent ml-2 pl-4>
//     <span  h-full w-px bg-border  absolute left-[9px] inset-y-0 />        ← guide line
//     <AnimatePresence> {isActive && <motion.span layoutId="active-bar">}    ← bg-primary bar
//     <AnimatePresence> {isHovered && <motion.span layoutId="hover-bar">}    ← neutral-600 bar
//     <motion.span animate={{ x: isHovered||isActive ? 3 : 0 }}>text        ← nudge
//   </div>
//
// Springs:
//   bars  → type:spring stiffness:500 damping:35
//   text  → type:spring stiffness:200 damping:20
//
// IMPORTANT: all items must be in ONE flat render so layoutId is shared globally.
// ─────────────────────────────────────────────────────────────────────────────

function Sidebar({
  activeSet,
  onSetChange,
  activeStyle,
  onStyleChange,
  activeSize,
  onSizeChange,
  showNew,
  onNewToggle,
  isOpen = false,
  onClose,
}: SidebarProps) {
  const [categories, setCategories] = useState<string[]>([]);
  // ONE hovered-item state shared across the entire sidebar — exactly like animate-ui
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    function load() {
      if (window.Reicon?.categories) {
        setCategories(window.Reicon.categories);
      } else {
        setTimeout(load, 100);
      }
    }
    load();
  }, []);

  const fmt = (name: string) =>
    name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // ── Render one nav item — inline, not a separate component ─────────────────
  // This is the exact pattern from animate-ui SidebarPageTree:
  //
  //   <SidebarItem className="relative hover:bg-transparent !bg-transparent ml-2 !pl-4 ...">
  //     <span className="h-full w-px bg-border absolute left-[9px] inset-y-0" />
  //     <AnimatePresence initial={false} mode="wait">
  //       {isActive && <motion.span layoutId="sidebar-item-active-indicator" ... />}
  //     </AnimatePresence>
  //     <AnimatePresence initial={false} mode="wait">
  //       {isHovered && <motion.span layoutId="sidebar-item-hover-indicator" ... />}
  //     </AnimatePresence>
  //     <motion.span animate={{ x: isHovered || isActive ? 3 : 0 }} ...>{text}</motion.span>
  //   </SidebarItem>
  // ──────────────────────────────────────────────────────────────────────────
  function renderItem(id: string, label: string, isActive: boolean) {
    const isHovered = hoveredItem === id;

    return (
      <div
        key={id}
        role="button"
        tabIndex={0}
        onMouseEnter={() => setHoveredItem(id)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => {
          if (id.startsWith('weight-')) { onStyleChange(id.replace('weight-', '')); if (showNew) onNewToggle(false); }
          else if (id.startsWith('size-')) { onSizeChange(id.replace('size-', '')); }
          else if (id === 'cat-all') { onSetChange('all'); if (showNew) onNewToggle(false); }
          else { onSetChange(id.replace('cat-', '')); if (showNew) onNewToggle(false); }
        }}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
        // Exact animate-ui: relative hover:bg-transparent !bg-transparent ml-2 !pl-4
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          marginLeft: '0.5rem',      // ml-2 = 8px
          paddingLeft: '1rem',       // !pl-4 = 16px
          paddingRight: '0.5rem',
          paddingTop: '0.3rem',
          paddingBottom: '0.3rem',
          minHeight: '2rem',
          borderRadius: '6px',
          background: 'transparent', // hover:bg-transparent — never changes
          cursor: 'pointer',
          userSelect: 'none',
          width: 'calc(100% - 0.5rem)',
        }}
      >
        {/* Guide line — h-full w-px bg-border absolute left-[9px] inset-y-0 */}
        <span
          style={{
            position: 'absolute',
            left: '9px',
            top: 0,
            bottom: 0,
            width: '1px',
            backgroundColor: 'var(--border-base)', // bg-border in dark
          }}
        />

        <AnimatePresence initial={false} mode="wait">
          {isActive && (
            <motion.span
              layoutId="sidebar-item-active-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                zIndex: 11,
                left: '8px',
                // Use top+bottom % instead of top:50%/transform:translateY(-50%)
                // because layoutId uses CSS transform internally and would
                // overwrite translateY(-50%), breaking the vertical centering.
                // top:22% + bottom:22% = 56% height, perfectly centred.
                top: '22%',
                bottom: '22%',
                width: '3px',
                borderRadius: '9999px',
                backgroundColor: '#6C5CE7',
                boxShadow: '0 0 8px rgba(108,92,231,0.45)',
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence initial={false} mode="wait">
          {isHovered && (
            <motion.span
              layoutId="sidebar-item-hover-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                zIndex: 10,
                left: '8px',
                // Same fix: use top+bottom instead of transform to avoid
                // conflict with layoutId's CSS transform.
                top: '22%',
                bottom: '22%',
                width: '3px',
                borderRadius: '9999px',
                backgroundColor: 'var(--text-more-muted)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Text — text-sm w-full pl-[12px], nudges x:3 on hover/active */}
        <motion.span
          animate={{ x: isHovered || isActive ? 3 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            // text-sm w-full pl-[12px]
            // text-neutral-700 dark:text-neutral-200  →  rgba(255,255,255,0.55)
            // (isActive||isHovered): text-black dark:text-white  →  #fff
            fontSize: '14px',   // text-sm
            width: '100%',
            paddingLeft: '12px',  // pl-[12px]
            color: isActive ? 'var(--text-base)' : isHovered ? 'var(--text-hover)' : 'var(--text-muted)',
            fontWeight: isActive ? 500 : 400,
            lineHeight: 1.4,
          }}
        >
          {label}
        </motion.span>
      </div>
    );
  }

  // ── Separator — SidebarSeparator equivalent ───────────────────────────────
  function renderSeparator(icon: string, label: string, first = false) {
    return (
      <div
        style={{
          padding: '0.4rem 0.5rem',
          marginTop: first ? 0 : '1.5rem',
          marginBottom: '0.25rem',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--text-more-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        <re-icon icon={icon} size="11" style={{ color: 'var(--text-more-muted)' }} />
        {label}
      </div>
    );
  }

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%' }}>

      {/* ── QUICK ACCESS ── */}
      {renderSeparator('star', 'Quick Access', true)}
      <div style={{ padding: '2px 4px' }}>
        <button
          onClick={() => onNewToggle(!showNew)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px',
            borderRadius: '10px',
            border: showNew ? '1px solid rgba(108,92,231,0.5)' : '1px solid var(--border-base)',
            background: showNew ? 'rgba(108,92,231,0.05)' : 'transparent',
            boxShadow: showNew ? '0 0 12px rgba(108,92,231,0.15)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={showNew ? {
              width: '10px', height: '10px', borderRadius: '9999px', flexShrink: 0,
              background: 'linear-gradient(135deg,#5a4bd1,#7c6cf0)',
              boxShadow: '0 0 8px rgba(124,108,240,0.8)',
            } : {
              width: '6px', height: '6px', borderRadius: '9999px', flexShrink: 0,
              background: '#6C5CE7', boxShadow: '0 0 6px rgba(108,92,231,0.6)',
              animation: 'sidebar-pulse 2s ease-in-out infinite',
            }} />
            <span style={{
              fontSize: '13px', fontWeight: 500,
              color: showNew ? '#6c5ce7' : 'var(--text-muted)',
              transition: 'color 0.2s',
            }}>
              Added {NEW_ICONS_COUNT} icons
            </span>
          </span>
          <span style={{
            width: '24px', height: '24px', borderRadius: '6px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: showNew ? '1px solid var(--border-base)' : '1px solid var(--border-muted)',
            background: showNew ? 'var(--surface-hover)' : 'transparent',
            color: showNew ? 'var(--text-base)' : 'transparent',
            transition: 'all 0.2s',
          }}>
            <Check size={14} />
          </span>
        </button>
      </div>

      {/* ── WEIGHTS ── */}
      {renderSeparator('palette', 'Weights')}
      {STYLE_OPTIONS.map((style) =>
        renderItem(`weight-${style}`, `${style} Icons`, activeStyle === style)
      )}

      {/* ── SIZING ── */}
      {renderSeparator('size2', 'Sizing')}
      {SIZE_OPTIONS.map((size) =>
        renderItem(`size-${size}`, `${size}px Grid`, activeSize === size)
      )}

      {/* ── CATEGORIES ── */}
      {renderSeparator('category-22', 'Categories')}
      {renderItem('cat-all', 'All Categories', activeSet === 'all' && !showNew)}
      {categories.map((cat) =>
        renderItem(`cat-${cat}`, fmt(cat), activeSet === cat && !showNew)
      )}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes sidebar-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(0.85); }
        }
        #nd-sidebar {
          width: 13rem;
          height: calc(100vh - 3.5rem);
          position: sticky;
          top: 3.5rem;
          overflow-y: auto;
          padding: 1rem 0.5rem;
          z-index: 30;
          background-color: var(--bg-base);
          scrollbar-width: none;
          flex-shrink: 0;
        }
        #nd-sidebar::-webkit-scrollbar { display: none; }
        .reicon-sidebar-backdrop {
          position:fixed; inset:0; z-index:40;
          background: var(--shadow-color); backdrop-filter:blur(6px);
        }
        .reicon-sidebar-drawer {
          position:fixed; top:0; left:0; bottom:0; z-index:50; width:16rem;
          background: var(--bg-base); border-right:1px solid var(--border-muted);
          padding:1rem; display:flex; flex-direction:column; gap:0.5rem;
          overflow-y:auto; transform:translateX(-100%);
          transition:transform 0.28s cubic-bezier(0.25,0.46,0.45,0.94);
          scrollbar-width:none;
        }
        .reicon-sidebar-drawer::-webkit-scrollbar { display:none; }
        .reicon-sidebar-drawer.is-open { transform:translateX(0); }
        .reicon-sidebar-drawer-head {
          display:flex; align-items:center; justify-content:space-between;
          padding-bottom:0.75rem; margin-bottom:0.25rem;
          border-bottom:1px solid var(--border-muted);
        }
        .reicon-sidebar-close {
          display:inline-flex; align-items:center; justify-content:center;
          width:28px; height:28px; border-radius:8px;
          background: var(--surface-base); border:1px solid var(--border-base);
          color: var(--text-muted); cursor:pointer;
          transition:color 0.15s, background-color 0.15s;
        }
        .reicon-sidebar-close:hover { background: var(--surface-hover); color: var(--text-base); }
        @media(min-width:1024px) { .reicon-sidebar-backdrop,.reicon-sidebar-drawer{display:none;} }
        @media(max-width:1023.98px) { #nd-sidebar{display:none;} }
      `}</style>

      {/* Desktop */}
      <aside id="nd-sidebar" className="hidden lg:flex" data-lenis-prevent>
        {sidebarContent}
      </aside>

      {/* Mobile backdrop */}
      {isOpen && <div onClick={onClose} className="reicon-sidebar-backdrop" aria-hidden />}

      {/* Mobile drawer */}
      <aside className={`reicon-sidebar-drawer ${isOpen ? 'is-open' : ''}`} data-lenis-prevent>
        <div className="reicon-sidebar-drawer-head">
          <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-base)' }}>Filters</span>
          {onClose && (
            <button onClick={onClose} className="reicon-sidebar-close" aria-label="Close sidebar">
              <re-icon icon="x" size="16" />
            </button>
          )}
        </div>
        {sidebarContent}
      </aside>
    </>
  );
}

export default React.memo(Sidebar);
