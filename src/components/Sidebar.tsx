import React, { useEffect, useState } from 'react';
import newIconsData from '../data/new-icons-added.json';

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

  const formatCategoryName = (name: string) =>
    name
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  const sidebarContent = (
    <div className="reicon-sidebar-list">
      {/* SECTION 1: QUICK ACCESS */}
      <div>
        <div className="sidebar-separator">
          <re-icon icon="star" size="12" />
          <span>Quick Access</span>
        </div>

        {/* New Icons */}
        <div
          onClick={() => onNewToggle(!showNew)}
          className={`sidebar-item ${showNew ? 'active' : ''}`}
        >
          <div className="sidebar-item-line" />
          {showNew ? (
            <div className="sidebar-item-active-bar" />
          ) : (
            <div className="sidebar-item-hover-bar" />
          )}
          <span className="sidebar-item-text sidebar-item-text-row">
            <span className="sidebar-item-label">
              <span className="sidebar-pulse-dot" />
              New Icons
            </span>
            <span className="sidebar-badge-new">{NEW_ICONS_COUNT}</span>
          </span>
        </div>
      </div>

      {/* SECTION 2: WEIGHTS */}
      <div>
        <div className="sidebar-separator">
          <re-icon icon="palette" size="12" />
          <span>Weights</span>
        </div>
        {STYLE_OPTIONS.map((style) => {
          const isActive = activeStyle === style;
          return (
            <div
              key={style}
              onClick={() => {
                onStyleChange(style);
                if (showNew) onNewToggle(false);
              }}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <div className="sidebar-item-line" />
              {isActive ? (
                <div className="sidebar-item-active-bar" />
              ) : (
                <div className="sidebar-item-hover-bar" />
              )}
              <span className="sidebar-item-text">{style} Icons</span>
            </div>
          );
        })}
      </div>

      {/* SECTION 3: SIZES */}
      <div>
        <div className="sidebar-separator">
          <re-icon icon="size2" size="12" />
          <span>Sizing</span>
        </div>
        {SIZE_OPTIONS.map((size) => {
          const isActive = activeSize === size;
          return (
            <div
              key={size}
              onClick={() => onSizeChange(size)}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <div className="sidebar-item-line" />
              {isActive ? (
                <div className="sidebar-item-active-bar" />
              ) : (
                <div className="sidebar-item-hover-bar" />
              )}
              <span className="sidebar-item-text">{size}px Grid</span>
            </div>
          );
        })}
      </div>

      {/* SECTION 4: CATEGORIES */}
      <div>
        <div className="sidebar-separator">
          <re-icon icon="category-22" size="12" />
          <span>Categories</span>
        </div>

        {/* All */}
        <div
          onClick={() => {
            onSetChange('all');
            if (showNew) onNewToggle(false);
          }}
          className={`sidebar-item ${activeSet === 'all' && !showNew ? 'active' : ''}`}
        >
          <div className="sidebar-item-line" />
          {activeSet === 'all' && !showNew ? (
            <div className="sidebar-item-active-bar" />
          ) : (
            <div className="sidebar-item-hover-bar" />
          )}
          <span className="sidebar-item-text">All Categories</span>
        </div>

        {/* Dynamic list */}
        {categories.map((cat) => {
          const isActive = activeSet === cat && !showNew;
          return (
            <div
              key={cat}
              onClick={() => {
                onSetChange(cat);
                if (showNew) onNewToggle(false);
              }}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <div className="sidebar-item-line" />
              {isActive ? (
                <div className="sidebar-item-active-bar" />
              ) : (
                <div className="sidebar-item-hover-bar" />
              )}
              <span className="sidebar-item-text">{formatCategoryName(cat)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <SidebarStyles />

      {/* Desktop sticky panel */}
      <aside id="nd-sidebar" className="hidden lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="reicon-sidebar-backdrop"
          aria-hidden
        />
      )}

      {/* Mobile drawer */}
      <aside className={`reicon-sidebar-drawer ${isOpen ? 'is-open' : ''}`}>
        <div className="reicon-sidebar-drawer-head">
          <span className="reicon-sidebar-drawer-title">Filters</span>
          {onClose && (
            <button
              onClick={onClose}
              className="reicon-sidebar-close"
              aria-label="Close sidebar"
            >
              <re-icon icon="x" size="16" />
            </button>
          )}
        </div>
        {sidebarContent}
      </aside>
    </>
  );
}

/**
 * Sidebar-scoped CSS — uses the Reicon site's dark theme tokens.
 * Background: #09090b · Accent: #6C5CE7 · Text: white with opacity layers.
 */
function SidebarStyles() {
  return (
    <style>{`
      /* ── DESKTOP STICKY PANEL ── */
      #nd-sidebar {
        width: 13rem;
        height: calc(100vh - 3.5rem);
        position: sticky;
        top: 3.5rem;
        overflow-y: auto;
        padding: 1.25rem 0.75rem;
        z-index: 30;
        background-color: #09090b;
        border-right: 1px solid rgba(255, 255, 255, 0.06);
        scrollbar-width: none;
        flex-shrink: 0;
      }
      #nd-sidebar::-webkit-scrollbar { display: none; }

      .reicon-sidebar-list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        width: 100%;
      }

      /* ── SECTION HEADERS ── */
      .sidebar-separator {
        padding: 0.5rem 0.75rem;
        margin-top: 1.25rem;
        margin-bottom: 0.25rem;
        font-size: 11px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.4);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .reicon-sidebar-list > div:first-child .sidebar-separator { margin-top: 0; }
      .sidebar-separator re-icon { color: rgba(255, 255, 255, 0.35); }

      /* ── ITEMS ── */
      .sidebar-item {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.375rem 0.5rem 0.375rem 1.5rem;
        margin-left: 0.25rem;
        border-radius: 8px;
        cursor: pointer;
        background: transparent;
        min-height: 2rem;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.5);
        transition: color 0.15s ease, background-color 0.15s ease;
        user-select: none;
        border: 0;
        width: calc(100% - 0.25rem);
        text-align: left;
      }
      .sidebar-item:hover {
        color: rgba(255, 255, 255, 0.85);
        background: rgba(255, 255, 255, 0.03);
      }
      .sidebar-item.active {
        color: #ffffff;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.05);
      }

      .sidebar-item-line {
        position: absolute;
        left: 0.625rem;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: rgba(255, 255, 255, 0.08);
      }
      .sidebar-item-active-bar {
        position: absolute;
        left: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        height: 56%;
        width: 3px;
        border-radius: 9999px;
        background-color: #6C5CE7;
        box-shadow: 0 0 8px rgba(108, 92, 231, 0.5);
      }
      .sidebar-item-hover-bar {
        position: absolute;
        left: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        height: 56%;
        width: 3px;
        border-radius: 9999px;
        background-color: rgba(255, 255, 255, 0.4);
        opacity: 0;
        transition: opacity 0.15s ease;
      }
      .sidebar-item:hover .sidebar-item-hover-bar { opacity: 0.6; }

      .sidebar-item-text {
        display: flex;
        align-items: center;
        width: 100%;
        padding-left: 0.375rem;
      }
      .sidebar-item-text-row { justify-content: space-between; gap: 0.5rem; }
      .sidebar-item-label { display: inline-flex; align-items: center; gap: 0.5rem; }

      .sidebar-pulse-dot {
        width: 6px;
        height: 6px;
        border-radius: 9999px;
        background: #4ade80;
        box-shadow: 0 0 6px rgba(74, 222, 128, 0.6);
        animation: sidebar-pulse 2s ease-in-out infinite;
      }
      @keyframes sidebar-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.85); }
      }

      .sidebar-badge-new {
        background: rgba(108, 92, 231, 0.18);
        color: #b3a8ff;
        font-size: 10px;
        font-weight: 700;
        padding: 2px 7px;
        border-radius: 9999px;
        line-height: 1;
        border: 1px solid rgba(108, 92, 231, 0.3);
      }
      .sidebar-item.active .sidebar-badge-new {
        background: rgba(108, 92, 231, 0.28);
        color: #ffffff;
      }

      /* ── MOBILE DRAWER ── */
      .reicon-sidebar-backdrop {
        position: fixed;
        inset: 0;
        z-index: 40;
        background-color: rgba(9, 9, 11, 0.7);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
      }

      .reicon-sidebar-drawer {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 16rem;
        background-color: #09090b;
        border-right: 1px solid rgba(255, 255, 255, 0.06);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        overflow-y: auto;
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        scrollbar-width: none;
      }
      .reicon-sidebar-drawer::-webkit-scrollbar { display: none; }
      .reicon-sidebar-drawer.is-open { transform: translateX(0); }

      .reicon-sidebar-drawer-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 0.75rem;
        margin-bottom: 0.25rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      .reicon-sidebar-drawer-title {
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
      }
      .reicon-sidebar-close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .reicon-sidebar-close:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
      }

      /* Hide drawer + backdrop on lg+ screens */
      @media (min-width: 1024px) {
        .reicon-sidebar-backdrop,
        .reicon-sidebar-drawer { display: none; }
      }
      /* Hide desktop panel below lg */
      @media (max-width: 1023.98px) {
        #nd-sidebar { display: none; }
      }
    `}</style>
  );
}

export default React.memo(Sidebar);
