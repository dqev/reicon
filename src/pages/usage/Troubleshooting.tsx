import SyntaxBlock from '../../components/usage/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Troubleshooting({ copiedField, onCopy }: Props) {
  return (
    <section id="troubleshooting" data-section className="mb-16 scroll-mt-24">
      <h2 className="text-xl font-serif text-white mb-4">Troubleshooting</h2>
      <p className="text-white/50 text-[14px] mb-6 leading-relaxed">
        Common issues and their solutions. If you don't find your answer here, open an issue on{' '}
        <a
          href="https://github.com/dqev/reicon/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6C5CE7] hover:underline"
        >
          GitHub
        </a>.
      </p>

      {/* Item 1 */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Icons are not rendering (CDN)</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Make sure the CDN script is loaded before any <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code> elements. Place the script tag in your <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<head>'}</code> or before your markup.
      </p>
      <SyntaxBlock
        title="Fix"
        onCopy={() => onCopy('<!-- ✅ Place in <head> -->\n<script src="https://unpkg.com/reicon/cdn/reicon.min.js"></script>', 'faq-cdn')}
        copied={copiedField === 'faq-cdn'}
      >
        <span className="text-emerald-400/60">{'<!-- ✅ Place in <head> -->'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-[#d19a66]"> src</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"https://unpkg.com/reicon/cdn/reicon.min.js"</span>
        <span className="text-white/70">{'></'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* Item 2 */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Wrong icon weight showing</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        The <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">weight</code> prop is case-sensitive in the React/Vue packages. Use <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">"Outline"</code> or <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">"Filled"</code> (PascalCase). In the CDN, use lowercase: <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">"outline"</code> or <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">"filled"</code>.
      </p>
      <SyntaxBlock
        title="Fix"
        onCopy={() => onCopy('// ✅ React / Vue — PascalCase\n<Star weight="Filled" />\n\n// ✅ CDN — lowercase\n<re-icon icon="star" weight="filled"></re-icon>\n\n// ❌ Wrong casing\n<Star weight="filled" />\n<re-icon icon="star" weight="Filled"></re-icon>', 'faq-weight')}
        copied={copiedField === 'faq-weight'}
      >
        <span className="text-emerald-400/60">{'// ✅ React / Vue — PascalCase'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e5c07b]">Star</span>
        <span className="text-[#d19a66]"> weight</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"Filled"</span>
        <span className="text-white/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-emerald-400/60">{'// ✅ CDN — lowercase'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-[#d19a66]"> icon</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"star"</span>
        <span className="text-[#d19a66]"> weight</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"filled"</span>
        <span className="text-white/70">{'></'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-white/70">{'>'}</span>
        {'\n\n'}
        <span className="text-red-400/60">{'// ❌ Wrong casing'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e5c07b]">Star</span>
        <span className="text-[#d19a66]"> weight</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"filled"</span>
        <span className="text-white/70"> /{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-[#d19a66]"> icon</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"star"</span>
        <span className="text-[#d19a66]"> weight</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"Filled"</span>
        <span className="text-white/70">{'></'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* Item 3 */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Icons look blurry or wrong size</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        The <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">size</code> prop accepts a number (pixels). Don't pass units like "24px" — just pass the number. For the CDN, pass the number as a string attribute.
      </p>
      <SyntaxBlock
        title="Fix"
        onCopy={() => onCopy('// ✅ Correct\n<Home size={24} />\n<re-icon icon="home" size="24"></re-icon>\n\n// ❌ Don\'t include units\n<Home size="24px" />', 'faq-size')}
        copied={copiedField === 'faq-size'}
      >
        <span className="text-emerald-400/60">{'// ✅ Correct'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-[#d19a66]"> size</span>
        <span className="text-white/50">=</span>
        <span className="text-white/70">{'{'}24{'}'}</span>
        <span className="text-white/70"> /{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-[#d19a66]"> icon</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"home"</span>
        <span className="text-[#d19a66]"> size</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"24"</span>
        <span className="text-white/70">{'></'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-white/70">{'>'}</span>
        {'\n\n'}
        <span className="text-red-400/60">{'// ❌ Don\'t include units'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-[#d19a66]"> size</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"24px"</span>
        <span className="text-white/70"> /{'>'}</span>
      </SyntaxBlock>

      {/* Item 4 */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">TypeScript can't find icon names</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Make sure you're importing from <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">"reicon-react"</code> (not "reicon"). The package ships with full type definitions. If autocomplete isn't working, restart your TypeScript server.
      </p>
      <SyntaxBlock
        title="Fix"
        onCopy={() => onCopy('// ✅ Correct package name\nimport { Home } from \'reicon-react\';\n\n// ❌ Wrong package\nimport { Home } from \'reicon\';', 'faq-ts')}
        copied={copiedField === 'faq-ts'}
      >
        <span className="text-emerald-400/60">{'// ✅ Correct package name'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-white/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-white/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-react'</span>
        <span className="text-white/30">;</span>
        {'\n\n'}
        <span className="text-red-400/60">{'// ❌ Wrong package'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-white/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-white/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon'</span>
        <span className="text-white/30">;</span>
      </SyntaxBlock>

      {/* Item 5 */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Bundle size is too large</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        You might be using a wildcard import. Switch to named imports (tree-shakeable) or direct imports for the smallest possible bundle.
      </p>
      <SyntaxBlock
        title="Fix"
        onCopy={() => onCopy('// ❌ Pulls in everything\nimport * as Icons from \'reicon-react\';\n\n// ✅ Tree-shakeable\nimport { Home, Bell } from \'reicon-react\';\n\n// ✅ Smallest possible\nimport Home from \'reicon-react/icons/Home\';', 'faq-bundle')}
        copied={copiedField === 'faq-bundle'}
      >
        <span className="text-red-400/60">{'// ❌ Pulls in everything'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-white/70"> * </span>
        <span className="text-[#c678dd]">as</span>
        <span className="text-[#e5c07b]"> Icons</span>
        <span className="text-[#c678dd]"> from</span>
        <span className="text-[#98c379]"> 'reicon-react'</span>
        <span className="text-white/30">;</span>
        {'\n\n'}
        <span className="text-emerald-400/60">{'// ✅ Tree-shakeable'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-white/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-white/70">, </span>
        <span className="text-[#e5c07b]">Bell</span>
        <span className="text-white/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-react'</span>
        <span className="text-white/30">;</span>
        {'\n\n'}
        <span className="text-emerald-400/60">{'// ✅ Smallest possible'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-[#e5c07b]"> Home</span>
        <span className="text-[#c678dd]"> from</span>
        <span className="text-[#98c379]"> 'reicon-react/icons/Home'</span>
        <span className="text-white/30">;</span>
      </SyntaxBlock>

      {/* Item 6 */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Icon color not changing</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Icons use <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">currentColor</code> by default. If you set a <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">color</code> prop, it overrides inheritance. Check that no parent CSS is overriding the color. For Tailwind, use <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">text-*</code> utilities on the icon's <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">className</code>.
      </p>
      <SyntaxBlock
        title="Fix"
        onCopy={() => onCopy('// Color via prop\n<Heart color="#ef4444" />\n\n// Color via Tailwind\n<Heart className="text-red-500" />\n\n// Color via parent inheritance\n<div style={{ color: "#ef4444" }}>\n  <Heart />  {/* inherits red */}\n</div>', 'faq-color')}
        copied={copiedField === 'faq-color'}
      >
        <span className="text-white/30">{'// Color via prop'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e5c07b]">Heart</span>
        <span className="text-[#d19a66]"> color</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"#ef4444"</span>
        <span className="text-white/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-white/30">{'// Color via Tailwind'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e5c07b]">Heart</span>
        <span className="text-[#d19a66]"> className</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"text-red-500"</span>
        <span className="text-white/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-white/30">{'// Color via parent inheritance'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e06c75]">div</span>
        <span className="text-[#d19a66]"> style</span>
        <span className="text-white/50">=</span>
        <span className="text-white/70">{'{'}{'{'} </span>
        <span className="text-[#e06c75]">color</span>
        <span className="text-white/50">: </span>
        <span className="text-[#98c379]">"#ef4444"</span>
        <span className="text-white/70"> {'}'}{'}'}{'>'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e5c07b]">Heart</span>
        <span className="text-white/70"> /{'>'}</span>
        <span className="text-white/30">{'  {/* inherits red */}'}</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span>
        <span className="text-[#e06c75]">div</span>
        <span className="text-white/70">{'>'}</span>
      </SyntaxBlock>
    </section>
  );
}
