let readyPromise: Promise<void> | null = null;

export function waitForReicon(timeoutMs = 5000): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if ((window as any).Reicon) return Promise.resolve();

  if (!readyPromise) {
    readyPromise = new Promise((resolve) => {
      // Ensure local script tag is present
      if (!document.querySelector('script[src*="reicon.js"]')) {
        const script = document.createElement('script');
        script.src = '/cdn/reicon.js';
        script.defer = true;
        document.head.appendChild(script);
      }

      const start = Date.now();
      function check() {
        if ((window as any).Reicon) {
          resolve();
        } else if (Date.now() - start > timeoutMs) {
          // Gracefully resolve after timeout so custom elements still render without blocking the UI
          resolve();
        } else {
          setTimeout(check, 50);
        }
      }
      check();
    });
  }
  return readyPromise;
}
