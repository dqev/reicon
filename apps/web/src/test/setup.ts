import '@testing-library/jest-dom/vitest';

// Polyfill ResizeObserver for lenis in jsdom
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
