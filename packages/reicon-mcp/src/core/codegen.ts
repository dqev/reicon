import type { ApplyIconInput, ApplyIconOutput, IconEntry, IconWeight } from './types.js';

function weightProp(weight: IconWeight, framework: ApplyIconInput['framework']): string {
  if (weight === 'Outline') return '';
  if (framework === 'html') return ' weight="filled"';
  return ` weight="${weight}"`;
}

function sizeProp(size: number, framework: ApplyIconInput['framework']): string {
  if (framework === 'vue') return ` :size="${size}"`;
  if (framework === 'html') return ` size="${size}"`;
  if (framework === 'svelte' || framework === 'react' || framework === 'react-native') return ` size={${size}}`;
  return ` width="${size}" height="${size}"`;
}

function colorProp(color: string, framework: ApplyIconInput['framework']): string {
  if (framework === 'vue') return ` color="${color}"`;
  if (framework === 'html') return ` color="${color}"`;
  if (framework === 'svelte' || framework === 'react' || framework === 'react-native') {
    const val = color === 'currentColor' ? 'currentColor' : `"${color}"`;
    return ` color={${val}}`;
  }
  return ` color="${color}"`;
}

export function generateCode(
  icon: IconEntry,
  input: ApplyIconInput,
): ApplyIconOutput | { error: string } {
  const size = input.size ?? 24;
  const color = input.color ?? 'currentColor';
  const component = input.componentName ?? icon.pascal;
  const weight = input.weight;
  const weightData = icon.weights[weight];
  const hasColor = input.color !== undefined;

  if (!weightData) {
    return { error: `Icon "${icon.name}" does not have a ${weight} weight.` };
  }

  const colorAttr = (framework: ApplyIconInput['framework']) =>
    hasColor ? colorProp(color, framework) : '';

  switch (input.framework) {
    case 'react': {
      const importStatement = `import { ${component} } from 'reicon-react';`;
      const props = [
        sizeProp(size, 'react'),
        colorAttr('react'),
        weightProp(weight, 'react'),
      ].join('');
      const usageSnippet = `<${component}${props} />`;
      return { importStatement, usageSnippet };
    }
    case 'react-native': {
      const importStatement = `import { ${component} } from 'reicon-react-native';`;
      const props = [
        sizeProp(size, 'react-native'),
        colorAttr('react-native'),
        weightProp(weight, 'react-native'),
      ].join('');
      const usageSnippet = `<${component}${props} />`;
      return { importStatement, usageSnippet };
    }
    case 'vue': {
      const importStatement = `import { ${component} } from 'reicon-vue';`;
      const props = [
        sizeProp(size, 'vue'),
        colorAttr('vue'),
        weightProp(weight, 'vue'),
      ].join('');
      const usageSnippet = `<${component}${props} />`;
      return { importStatement, usageSnippet };
    }
    case 'svelte': {
      const importStatement = `import { ${component} } from 'reicon-svelte';`;
      const props = [
        sizeProp(size, 'svelte'),
        colorAttr('svelte'),
        weightProp(weight, 'svelte'),
      ].join('');
      const usageSnippet = `<${component}${props} />`;
      return { importStatement, usageSnippet };
    }
    case 'html': {
      const importStatement = '<script src="https://unpkg.com/reicon/cdn/reicon.min.js"></script>';
      const props = [
        ` icon="${icon.name}"`,
        sizeProp(size, 'html'),
        colorAttr('html'),
        weightProp(weight, 'html'),
      ].join('');
      const usageSnippet = `<re-icon${props}></re-icon>`;
      return { importStatement, usageSnippet };
    }
    case 'svg': {
      const importStatement = '';
      const usageSnippet = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${weightData.viewBox}" fill="none">${weightData.code}</svg>`;
      return { importStatement, usageSnippet };
    }
    default:
      return { error: `Unknown framework: ${input.framework}` };
  }
}

export function buildSvgMarkup(icon: IconEntry, weight: IconWeight): string | { error: string } {
  const weightData = icon.weights[weight];
  if (!weightData) {
    return { error: `Icon "${icon.name}" does not have a ${weight} weight.` };
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${weightData.viewBox}" fill="none">${weightData.code}</svg>`;
}
