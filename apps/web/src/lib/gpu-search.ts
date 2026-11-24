import { createPredictor, isSupported, type Backend, type Prediction, type Predictor } from 'gpu-icons-search';
import { loadAliasTable, predictFromTable, type AliasTable } from 'gpu-icons-search/fallback';

export type PredictMode = 'webgpu' | 'cpu' | 'table' | 'none';

export interface GpuSearchState {
  status: 'idle' | 'loading' | 'ready' | 'error';
  mode: PredictMode;
  error?: string;
}

let predictorPromise: Promise<Predictor | null> | null = null;
let activePredictor: Predictor | null = null;
let aliasTable: AliasTable | null = null;
let currentMode: PredictMode = 'none';
let currentStatus: GpuSearchState['status'] = 'idle';
let currentError: string | undefined;

const stateListeners = new Set<(state: GpuSearchState) => void>();

function notifyState() {
  const state: GpuSearchState = {
    status: currentStatus,
    mode: currentMode,
    error: currentError,
  };
  for (const listener of stateListeners) {
    listener(state);
  }
}

export function subscribeGpuSearchState(listener: (state: GpuSearchState) => void): () => void {
  stateListeners.add(listener);
  listener({
    status: currentStatus,
    mode: currentMode,
    error: currentError,
  });
  return () => {
    stateListeners.delete(listener);
  };
}

export function getGpuSearchState(): GpuSearchState {
  return {
    status: currentStatus,
    mode: currentMode,
    error: currentError,
  };
}

/**
 * Initializes the icon search predictor.
 * Attempts WebGPU first, then CPU, then static alias table fallback.
 */
export async function initGpuSearch(): Promise<PredictMode> {
  if (activePredictor) return currentMode;
  if (predictorPromise) {
    await predictorPromise;
    return currentMode;
  }

  currentStatus = 'loading';
  notifyState();

  predictorPromise = (async () => {
    // 1. Try WebGPU if available in browser
    if (isSupported()) {
      try {
        const p = await createPredictor({
          backend: 'webgpu',
          weights: '/model.bin',
        });
        activePredictor = p;
        currentMode = 'webgpu';
        currentStatus = 'ready';
        notifyState();
        return p;
      } catch (err) {
        console.warn('[Reicon GPU Search] WebGPU init failed, falling back to CPU:', err);
      }
    }

    // 2. Try CPU model with model.bin
    try {
      const p = await createPredictor({
        backend: 'cpu',
        weights: '/model.bin',
      });
      activePredictor = p;
      currentMode = 'cpu';
      currentStatus = 'ready';
      notifyState();
      return p;
    } catch (err) {
      console.warn('[Reicon GPU Search] CPU model init failed, falling back to alias table:', err);
    }

    // 3. Fallback to static alias table
    try {
      aliasTable = await loadAliasTable('/aliases.json');
      currentMode = 'table';
      currentStatus = 'ready';
      notifyState();
      return null;
    } catch (err) {
      console.error('[Reicon GPU Search] All predictor initializations failed:', err);
      currentMode = 'none';
      currentStatus = 'error';
      currentError = String(err);
      notifyState();
      return null;
    }
  })();

  await predictorPromise;
  return currentMode;
}

// In-memory prediction cache for fast repeat searches
const predictionCache = new Map<string, Prediction[]>();

/**
 * Get semantic icon word predictions for a query.
 */
export async function predictIconWords(
  query: string,
  options: { limit?: number; signal?: AbortSignal } = {}
): Promise<Prediction[]> {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const cacheKey = `${trimmed}:${options.limit ?? 12}`;
  if (predictionCache.has(cacheKey)) {
    return predictionCache.get(cacheKey)!;
  }

  // Ensure initialized
  if (!activePredictor && !aliasTable && currentStatus !== 'error') {
    await initGpuSearch();
  }

  options.signal?.throwIfAborted();

  let predictions: Prediction[] = [];

  if (activePredictor) {
    try {
      predictions = await activePredictor.predict(trimmed, {
        limit: options.limit ?? 12,
        minScore: 0.3,
        signal: options.signal,
      });
    } catch (err: any) {
      if (err?.name === 'AbortError') throw err;
      console.error('[Reicon GPU Search] predict error:', err);
    }
  } else if (aliasTable) {
    predictions = predictFromTable(aliasTable, trimmed, options.limit ?? 12);
  }

  if (predictions.length > 0) {
    predictionCache.set(cacheKey, predictions);
  }

  return predictions;
}
