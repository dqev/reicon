/** Scoped CSS string for the Docs page sidebars. Injected via <style> tag. */
export const docsSidebarStyles = `
  #docs-sidebar {
    width: 14rem;
    position: fixed;
    top: 5.25rem;
    left: max(calc((100vw - 1240px) / 2 + 2.5rem), 2.5rem);
    max-height: calc(100vh - 6.25rem);
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0.25rem 0.5rem 2rem 0;
    margin-left: 0;
    z-index: 30;
    background-color: var(--bg-base);
    scrollbar-width: none;
    flex-shrink: 0;
    transition: background-color 0.3s ease;
  }
  #docs-sidebar::-webkit-scrollbar { display: none; }

  /* ── LEFT SIDEBAR GROUPS & CONNECTED LINE ── */
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
    font-weight: 500;
    color: var(--text-more-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .sidebar-icon-box {
    width: 1.25rem; /* 20px */
    height: 1.25rem; /* 20px */
    border-radius: 5px;
    background-color: var(--surface-hover);
    border: none;
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
    left: 0.625rem; /* 10px - centered under icon box */
    top: -0.375rem;
    bottom: 0.5rem;
    width: 1px;
    background: linear-gradient(to bottom, var(--border-base) 0%, var(--border-base) 60%, transparent 100%);
    transform: translateX(-50%);
    pointer-events: none;
  }

  .sidebar-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.35rem 0.5rem 0.35rem 1.75rem;
    font-size: 13px;
    color: var(--text-muted);
    border-radius: 6px;
    transition: color 0.15s ease, background-color 0.15s ease;
    cursor: pointer;
    user-select: none;
  }

  .sidebar-item-text {
    display: inline-block;
  }

  .sidebar-item:hover {
    color: var(--text-hover);
    background: transparent;
  }

  .sidebar-item.active {
    color: #9B8AFB;
    font-weight: 500;
    background: transparent;
  }

  /* ── RIGHT SIDEBAR: ON THIS PAGE ── */
  #otp-sidebar {
    width: 14rem;
    position: fixed;
    top: 5.25rem;
    right: max(calc((100vw - 1240px) / 2 + 2.5rem), 2.5rem);
    max-height: calc(100vh - 6.25rem);
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0.25rem 0 2rem 0.5rem;
    margin-right: 0;
    z-index: 30;
    background-color: var(--bg-base);
    scrollbar-width: none;
    flex-shrink: 0;
    transition: background-color 0.3s ease;
  }
  #otp-sidebar::-webkit-scrollbar { display: none; }

  /* Keep the article in the space the fixed sidebars would otherwise occupy. */
  @media (min-width: 1024px) {
    #docs-content { margin-left: 14rem; }
  }

  @media (min-width: 1280px) {
    #docs-content { margin-right: 14rem; }
  }

  /* ── HEADINGS IN DOCS: USE SANS (FONT-SANS) ── */
  main h1,
  main h2,
  main h3,
  main h4,
  main h5,
  main h6 {
    font-family: var(--font-sans) !important;
    font-weight: 500;
  }
`;
