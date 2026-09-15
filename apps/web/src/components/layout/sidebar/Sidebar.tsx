import React, { useEffect, useState } from 'react';
import { STYLE_OPTIONS, SIZE_OPTIONS } from './constants';

interface SidebarProps {
  activeSet: string;
  onSetChange: (set: string) => void;
  activeStyle: string;
  onStyleChange: (style: string) => void;
  activeSize: string;
  onSizeChange: (size: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
}


function Sidebar({
  activeSet,
  onSetChange,
  activeStyle,
  onStyleChange,
  activeSize,
  onSizeChange,
  isOpen = false,
  onClose,
  collapsed = false,
}: SidebarProps) {
  const [categories, setCategories] = useState<string[]>([]);

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

  function renderNavItem(id: string, label: string, isActive: boolean, isBeta?: boolean) {
    return (
      <button
        key={id}
        type="button"
        onClick={() => {
          if (id.startsWith('weight-')) { onStyleChange(id.replace('weight-', '')); }
          else if (id.startsWith('size-')) { onSizeChange(id.replace('size-', '')); }
          else if (id === 'cat-all') { onSetChange('all'); }
          else { onSetChange(id.replace('cat-', '')); }
        }}
        className={`sidebar-item ${isActive ? 'active' : ''}`}
      >
        <span className="truncate">{label}</span>
        {isBeta && (
          <span className="ml-auto shrink-0 px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-md bg-[#9B8AFB]/15 text-[#9B8AFB] border border-[#9B8AFB]/30 leading-none">
            Beta
          </span>
        )}
      </button>
    );
  }

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Weights */}
      <div className="reicon-sidebar-group">
        <div className="sidebar-section-header">
          <div className="sidebar-icon-box">
            <re-icon icon="palette" size="13" />
          </div>
          <span>Weights</span>
        </div>
        <div className="sidebar-items-container">
          <div className="sidebar-section-line" style={{ background: 'linear-gradient(to bottom, var(--border-base) 0%, var(--border-base) 60%, transparent 100%)' }} />
          {STYLE_OPTIONS.map((style) =>
            renderNavItem(
              `weight-${style}`,
              style,
              activeStyle === style,
              style === 'Duotone'
            )
          )}
        </div>
      </div>

      {/* Grid Size */}
      <div className="reicon-sidebar-group">
        <div className="sidebar-section-header">
          <div className="sidebar-icon-box">
            <re-icon icon="ruler" size="13" />
          </div>
          <span>Grid Size</span>
        </div>
        <div className="sidebar-items-container">
          <div className="sidebar-section-line" style={{ background: 'linear-gradient(to bottom, var(--border-base) 0%, var(--border-base) 60%, transparent 100%)' }} />
          {SIZE_OPTIONS.map((sz) =>
            renderNavItem(`size-${sz}`, `${sz}px`, activeSize === sz)
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="reicon-sidebar-group">
        <div className="sidebar-section-header">
          <div className="sidebar-icon-box">
            <re-icon icon="category2" size="13" />
          </div>
          <span>Categories</span>
        </div>
        <div className="sidebar-items-container">
          <div className="sidebar-section-line" style={{ background: 'linear-gradient(to bottom, var(--border-base) 0%, var(--border-base) 60%, transparent 100%)' }} />
          {renderNavItem('cat-all', 'All Categories', activeSet === 'all')}
          {categories.map((cat) =>
            renderNavItem(`cat-${cat}`, fmt(cat), activeSet === cat)
          )}
        </div>
      </div>
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
          width: 13.5rem;
          height: calc(100vh - 3.5rem);
          position: sticky;
          top: 3.5rem;
          align-self: flex-start;
          overflow-y: auto;
          padding: 1.25rem 0.5rem 2rem 0;
          margin-left: 0;
          z-index: 30;
          background-color: var(--bg-base);
          scrollbar-width: none;
          flex-shrink: 0;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, margin 0.3s ease, padding 0.3s ease;
        }
        #nd-sidebar.is-collapsed {
          width: 0;
          padding: 0;
          margin: 0;
          opacity: 0;
          overflow: hidden;
          pointer-events: none;
        }
        #nd-sidebar::-webkit-scrollbar { display: none; }

        .reicon-sidebar-group {
          position: relative;
          display: flex;
          flex-direction: column;
          margin-top: 1.25rem;
        }
        .reicon-sidebar-group:first-child {
          margin-top: 0;
        }
        .sidebar-section-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.375rem;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-more-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .sidebar-icon-box {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 5px;
          background-color: var(--surface-hover);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .sidebar-items-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }
        .sidebar-section-line {
          position: absolute;
          left: 0.625rem;
          top: -0.375rem;
          bottom: 0.5rem;
          width: 1px;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .sidebar-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.375rem 0.5rem 0.375rem 1.625rem;
          border-radius: 8px;
          cursor: pointer;
          background: transparent;
          min-height: 2rem;
          font-size: 13px;
          color: var(--text-base);
          transition: color 0.15s ease, background-color 0.15s ease;
          user-select: none;
          border: 0;
          width: 100%;
          text-align: left;
        }
        .sidebar-item:hover {
          color: var(--text-muted);
          background: transparent;
        }
        .sidebar-item.active {
          color: #9B8AFB;
          font-weight: 600;
          background: transparent;
        }
        .sidebar-item-text {
          display: flex;
          align-items: center;
          width: 100%;
        }

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
          width:28px; height:28px; border-radius:9999px;
          background: var(--surface-base); border:none;
          color: var(--text-muted); cursor:pointer;
          transition:color 0.15s, background-color 0.15s;
        }
        .reicon-sidebar-close:hover { background: var(--surface-hover); color: var(--text-base); }
        @media(min-width:1024px) { .reicon-sidebar-backdrop,.reicon-sidebar-drawer{display:none;} }
        @media(max-width:1023.98px) { #nd-sidebar{display:none;} }
      `}</style>

      <aside id="nd-sidebar" className={`hidden lg:block ${collapsed ? 'is-collapsed' : ''}`} data-lenis-prevent>
        {sidebarContent}
      </aside>

      {isOpen && <div onClick={onClose} className="reicon-sidebar-backdrop" aria-hidden />}

      <aside className={`reicon-sidebar-drawer ${isOpen ? 'is-open' : ''}`} data-lenis-prevent>
        <div className="reicon-sidebar-drawer-head">
          <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-base)' }}>Filters</span>
          {onClose && (
            <button onClick={onClose} className="reicon-sidebar-close" aria-label="Close sidebar">
              <re-icon icon="x" size="16" color="currentColor" style={{ color: 'var(--text-muted)' }} />
            </button>
          )}
        </div>
        {sidebarContent}
      </aside>
    </>
  );
}

export default React.memo(Sidebar);
