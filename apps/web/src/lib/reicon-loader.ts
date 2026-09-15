let ready: Promise<void> | null = null;

export function waitForReicon(timeoutMs = 15000): Promise<void> {
  if (!ready) {
    ready = new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      if ((window as any).Reicon) {
        resolve();
        return;
      }

      const timer = setTimeout(() => {
        if ((window as any).Reicon) {
          resolve();
        } else {
          reject(new Error('Reicon failed to load'));
        }
      }, timeoutMs);

      // Fallback: Ensure script tag is present
      if (!document.querySelector('script[src*="reicon.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/reicon@latest/cdn/reicon.js';
        script.defer = true;
        document.head.appendChild(script);
      }

      function check() {
        if ((window as any).Reicon) {
          clearTimeout(timer);
          resolve();
        } else {
          setTimeout(check, 50);
        }
      }
      check();
    });
  }
  return ready;
}
