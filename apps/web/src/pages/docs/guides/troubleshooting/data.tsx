import { ReactNode } from 'react';

export interface TroubleshootingItemData {
  question: string;
  answer: string;
  copyText: string;
  copyField: string;
  syntaxNode?: ReactNode;
}

export const troubleshootingItems: TroubleshootingItemData[] = [
  {
    question: "Icons are not rendering (CDN)",
    answer: "Make sure the CDN script is loaded before any <re-icon> elements. Place the script tag in your <head> or before your markup.",
    copyText: '<!-- ✅ Place in <head> -->\n<script src="https://unpkg.com/reicon/cdn/reicon.js"></script>',
    copyField: "faq-cdn",
    syntaxNode: (
      <>
        <span className="text-text-base/30">{'<!-- ✅ Place in <head> -->'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">script</span><span className="text-[#d19a66]"> src</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"https://unpkg.com/reicon/cdn/reicon.js"</span><span className="text-text-base/70">{'>'}</span><span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/70">{'>'}</span>
      </>
    )
  },
  {
    question: "Wrong icon weight showing",
    answer: 'The weight prop is case-sensitive in the React/Vue packages. Use "Outline" or "Filled" (PascalCase). In the CDN, use lowercase: "outline" or "filled".',
    copyText: '// ✅ React / Vue — PascalCase\n<Star weight="Filled" />\n\n// ✅ CDN — lowercase\n<re-icon icon="star" weight="filled"></re-icon>\n\n// ❌ Wrong casing\n<Star weight="filled" />\n<re-icon icon="star" weight="Filled"></re-icon>',
    copyField: "faq-weight",
    syntaxNode: (
      <>
        <span className="text-text-base/30">{'// ✅ React / Vue — PascalCase'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'// ✅ CDN — lowercase'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"star"</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"filled"</span><span className="text-text-base/70">{'>'}</span><span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-text-base/70">{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'// ❌ Wrong casing'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"filled"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"star"</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-text-base/70">{'>'}</span><span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-text-base/70">{'>'}</span>
      </>
    )
  },
  {
    question: "Icons look blurry or wrong size",
    answer: "The size prop accepts a number (pixels). Don't pass units like \"24px\" — just pass the number. For the CDN, pass the number as a string attribute.",
    copyText: '// ✅ Correct\n<Home size={24} />\n<re-icon icon="home" size="24"></re-icon>\n\n// ❌ Don\'t include units\n<Home size="24px" />',
    copyField: "faq-size",
    syntaxNode: (
      <>
        <span className="text-text-base/30">{'// ✅ Correct'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"home"</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-text-base/70">{'>'}</span><span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-text-base/70">{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{"// ❌ Don't include units"}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24px"</span><span className="text-text-base/70"> /{'>'}</span>
      </>
    )
  },
  {
    question: "TypeScript can't find icon names",
    answer: "Make sure you're importing from the correct package depending on your environment (e.g. \"reicon\" for vanilla JS or \"reicon-react\" for React). Both packages ship with full type definitions. If autocomplete isn't working, restart your TypeScript server.",
    copyText: "// ✅ For React projects\nimport { Home } from 'reicon-react';\n\n// ✅ For vanilla JS projects\nimport { Home } from 'reicon';",
    copyField: "faq-ts",
    syntaxNode: (
      <>
        <span className="text-text-base/30">{'// ✅ For React projects'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> {'{'} </span><span className="text-[#e5c07b]">Home</span><span className="text-text-base/70"> {'}'} </span><span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-react'</span><span className="text-text-base/70">;</span>
        {'\n\n'}
        <span className="text-text-base/30">{'// ✅ For vanilla JS projects'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> {'{'} </span><span className="text-[#e5c07b]">Home</span><span className="text-text-base/70"> {'}'} </span><span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon'</span><span className="text-text-base/70">;</span>
      </>
    )
  },
  {
    question: "Bundle size is too large",
    answer: 'You might be using a wildcard import. Switch to named imports (tree-shakeable) or direct imports for the smallest possible bundle.',
    copyText: "// ❌ Pulls in everything\nimport * as Icons from 'reicon-react';\n\n// ✅ Tree-shakeable\nimport { Home, Bell } from 'reicon-react';\n\n// ✅ Smallest possible\nimport Home from 'reicon-react/icons/Home';",
    copyField: "faq-bundle",
    syntaxNode: (
      <>
        <span className="text-text-base/30">{'// ❌ Pulls in everything'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> * </span><span className="text-[#c678dd]">as</span><span className="text-text-base/70"> Icons </span><span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-react'</span><span className="text-text-base/70">;</span>
        {'\n\n'}
        <span className="text-text-base/30">{'// ✅ Tree-shakeable'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> {'{'} </span><span className="text-[#e5c07b]">Home</span><span className="text-text-base/70">, </span><span className="text-[#e5c07b]">Bell</span><span className="text-text-base/70"> {'}'} </span><span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-react'</span><span className="text-text-base/70">;</span>
        {'\n\n'}
        <span className="text-text-base/30">{'// ✅ Smallest possible'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> Home </span><span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-react/icons/Home'</span><span className="text-text-base/70">;</span>
      </>
    )
  },
  {
    question: "Icon color not changing",
    answer: "Icons use currentColor by default. If you set a color prop, it overrides inheritance. Check that no parent CSS is overriding the color. For Tailwind, use text-* utilities on the icon's className.",
    copyText: '// Color via prop\n<Heart color="#ef4444" />\n\n// Color via Tailwind\n<Heart className="text-red-500" />\n\n// Color via parent inheritance\n<div style={{ color: "#ef4444" }}>\n  <Heart />  {/* inherits red */}\n</div>',
    copyField: "faq-color",
    syntaxNode: (
      <>
        <span className="text-text-base/30">{'// Color via prop'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#ef4444"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'// Color via Tailwind'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> className</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"text-red-500"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'// Color via parent inheritance'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">div</span><span className="text-[#d19a66]"> style</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}{'{'} </span><span className="text-[#e06c75]">color</span><span className="text-text-base/50">: </span><span className="text-[#98c379]">"#ef4444"</span><span className="text-text-base/70"> {'}'}{'}'}{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-text-base/70"> /{'>'}</span>
        <span className="text-text-base/30">{'  {/* inherits red */}'}</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">div</span><span className="text-text-base/70">{'>'}</span>
      </>
    )
  },
];
