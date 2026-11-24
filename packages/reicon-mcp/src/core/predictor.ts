import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPredictor, type Prediction, type Predictor } from 'gpu-icons-search';

let predictorPromise: Promise<Predictor | null> | null = null;
let activePredictor: Predictor | null = null;
const cache = new Map<string, Prediction[]>();

function resolveModelPath(): string | null {
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(here, '..', 'data', 'model.bin'),
    join(here, '..', '..', 'src', 'data', 'model.bin'),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

export async function getMcpPredictor(): Promise<Predictor | null> {
  if (activePredictor) return activePredictor;
  if (predictorPromise) return predictorPromise;

  predictorPromise = (async () => {
    try {
      const modelPath = resolveModelPath();
      if (!modelPath) {
        console.warn('[reicon-mcp] model.bin not found, running with standard text matching.');
        return null;
      }
      const buffer = readFileSync(modelPath);
      // Ensure we extract an ArrayBuffer from the Node Buffer
      const weights = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      activePredictor = await createPredictor({ weights, backend: 'cpu' });
      return activePredictor;
    } catch (err) {
      console.warn('[reicon-mcp] Neural predictor init error (falling back to standard search):', err);
      return null;
    }
  })();

  return predictorPromise;
}

/**
 * Predicts related icon words for a query using the CPU neural model (~0.9ms).
 */
export async function predictSemanticWords(query: string, limit = 8): Promise<Prediction[]> {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed || trimmed.length < 2) return [];

  const cacheKey = `${trimmed}:${limit}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const predictor = await getMcpPredictor();
  if (!predictor) return [];

  try {
    const predictions = await predictor.predict(trimmed, { limit, minScore: 0.3 });
    cache.set(cacheKey, predictions);
    return predictions;
  } catch {
    return [];
  }
}
