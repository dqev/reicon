import { describe, it, expect } from 'vitest';
import { executeSearch, type SearchIndexEntry } from '../utils/search';

const mockIndex: SearchIndexEntry[] = [
  { n: 'calendar-1', c: 'ui', t: ['date', 'schedule', 'event'] },
  { n: 'calendar-check', c: 'ui', t: ['date', 'appointment'] },
  { n: 'film-roll', c: 'multimedia', t: ['cinema', 'reel'] },
  { n: 'video-camera', c: 'multimedia', t: ['record', 'stream'] },
  { n: 'movie-clap', c: 'multimedia', t: ['action', 'scene'] },
  { n: 'heart', c: 'ui', t: ['favorite', 'love', 'like'] },
];

describe('executeSearch with gpu-icons-search predictions', () => {
  it('finds exact matches without predictions', () => {
    const results = executeSearch('heart', mockIndex);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.name).toBe('heart');
  });

  it('corrects typos using predicted correction words', () => {
    // User types "calandar" (typo) - without predictions, it might not find calendar-1
    const rawResults = executeSearch('calandar', mockIndex);
    // With prediction:
    const predictedResults = executeSearch('calandar', mockIndex, {
      predictions: [
        { word: 'calendar', score: 0.498, from: 'calandar', kind: 'correction' },
      ],
    });

    expect(predictedResults.some((r) => r.name.startsWith('calendar'))).toBe(true);
    expect(predictedResults[0]?.name).toBe('calendar-1');
  });

  it('expands semantic queries using related predictions', () => {
    // User types "movie" - film-roll doesn't contain "movie" in name or tags (tags: cinema, reel)
    const withSemanticPredictions = executeSearch('movie', mockIndex, {
      predictions: [
        { word: 'cinema', score: 0.47, from: 'movie', kind: 'related' },
        { word: 'video', score: 0.45, from: 'movie', kind: 'related' },
      ],
    });

    // movie-clap is exact match, film-roll is matched via cinema prediction, video-camera via video
    expect(withSemanticPredictions[0]?.name).toBe('movie-clap');
    expect(withSemanticPredictions.some((r) => r.name === 'film-roll')).toBe(true);
    expect(withSemanticPredictions.some((r) => r.name === 'video-camera')).toBe(true);
  });

  it('prioritizes exact matches over predicted matches', () => {
    const results = executeSearch('movie', mockIndex, {
      predictions: [
        { word: 'cinema', score: 0.47, from: 'movie', kind: 'related' },
      ],
    });

    const movieClapIndex = results.findIndex((r) => r.name === 'movie-clap');
    const filmRollIndex = results.findIndex((r) => r.name === 'film-roll');

    expect(movieClapIndex).toBeLessThan(filmRollIndex);
  });
});
