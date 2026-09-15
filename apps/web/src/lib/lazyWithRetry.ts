import { lazy, ComponentType } from 'react';

/**
 * Wraps React.lazy to automatically reload with cache-busting when a dynamic import fails
 * due to deployment chunk updates (e.g. "Failed to fetch dynamically imported module").
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      const pageHasAlreadyBeenRetried = sessionStorage.getItem('reicon_chunk_retry');
      const component = await componentImport();
      if (pageHasAlreadyBeenRetried) {
        sessionStorage.removeItem('reicon_chunk_retry');
      }
      return component;
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : String(error);
      const isChunkError =
        errMessage.includes('Failed to fetch dynamically imported module') ||
        errMessage.includes('Importing a module script failed') ||
        errMessage.includes('Failed to load module script') ||
        (error as { name?: string })?.name === 'ChunkLoadError';

      const pageHasAlreadyBeenRetried = sessionStorage.getItem('reicon_chunk_retry');

      if (isChunkError && !pageHasAlreadyBeenRetried) {
        sessionStorage.setItem('reicon_chunk_retry', 'true');
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }

      throw error;
    }
  });
}
