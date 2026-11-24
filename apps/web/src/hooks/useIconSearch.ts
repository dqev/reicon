import { useState, useEffect, useMemo } from 'react';
import { searchIcons, type SearchResult } from '@/data/search-data';
import { predictIconWords, getGpuSearchState, subscribeGpuSearchState, initGpuSearch, type PredictMode } from '@/lib/gpu-search';
import type { Prediction } from 'gpu-icons-search';

export function useIconSearch(query: string, limit = 24): SearchResult[] {
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  // 1. Instant sync search for immediate UI responsiveness on every keystroke
  const syncResults = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    return searchIcons(trimmed, { limit });
  }, [query, limit]);

  // 2. Query neural model for semantic keyword predictions & typo corrections
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      setPredictions([]);
      return;
    }

    const controller = new AbortController();
    predictIconWords(trimmed, { limit: 8, signal: controller.signal })
      .then((preds) => {
        setPredictions(preds);
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') {
          // ignore error
        }
      });

    return () => {
      controller.abort();
    };
  }, [query]);

  // 3. Combine results: if predictions exist, re-score with semantic predictions
  return useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    if (predictions.length === 0) return syncResults;
    return searchIcons(trimmed, { limit, predictions });
  }, [query, limit, syncResults, predictions]);
}

/**
 * Extended search hook that provides both results and prediction metadata (e.g. for badges/suggestions).
 */
export function useSemanticIconSearch(query: string, limit = 500) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [gpuState, setGpuState] = useState(getGpuSearchState());

  useEffect(() => {
    initGpuSearch().catch(() => {});
    return subscribeGpuSearchState(setGpuState);
  }, []);

  const syncResults = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    return searchIcons(trimmed, { limit });
  }, [query, limit]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      setPredictions([]);
      return;
    }

    const controller = new AbortController();
    predictIconWords(trimmed, { limit: 8, signal: controller.signal })
      .then((preds) => {
        setPredictions(preds);
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') {
          // ignore
        }
      });

    return () => {
      controller.abort();
    };
  }, [query]);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    if (predictions.length === 0) return syncResults;
    return searchIcons(trimmed, { limit, predictions });
  }, [query, limit, syncResults, predictions]);

  return {
    results,
    predictions,
    gpuState,
  };
}

/**
 * Hook to inspect the active GPU / CPU search status
 */
export function useGpuSearchStatus(): { status: string; mode: PredictMode; isWebGpu: boolean } {
  const [state, setState] = useState(getGpuSearchState());

  useEffect(() => {
    initGpuSearch().catch(() => {});
    return subscribeGpuSearchState(setState);
  }, []);

  return {
    status: state.status,
    mode: state.mode,
    isWebGpu: state.mode === 'webgpu',
  };
}
