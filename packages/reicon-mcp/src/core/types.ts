export type IconWeight = 'Outline' | 'Filled';

export type Framework = 'react' | 'vue' | 'svelte' | 'html' | 'svg';

export interface IconWeightData {
  code: string;
  viewBox: string;
}

export interface IconEntry {
  name: string;
  pascal: string;
  category: string;
  tags: string[];
  weights: Partial<Record<IconWeight, IconWeightData>>;
}

export interface IconIndex {
  icons: IconEntry[];
  categories: string[];
}

export interface SearchResult {
  name: string;
  weight: IconWeight;
  category: string;
  tags: string[];
  score: number;
}

export interface ApplyIconInput {
  name: string;
  weight: IconWeight;
  framework: Framework;
  size?: number;
  color?: string;
  componentName?: string;
}

export interface ApplyIconOutput {
  importStatement: string;
  usageSnippet: string;
}
