import SyntaxBlock from '../../components/usage/SyntaxBlock';
import SectionHeader from '../../components/usage/SectionHeader';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Performance({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="performance" data-section className="mb-16 scroll-mt-24">
      <SectionHeader id="performance" title="Performance & Tree-Shaking" level="h2" markdownContent={markdownContent} />
      <p className="text-text-base/50 text-[14px] mb-6 leading-relaxed">
        Reicon is built with <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">sideEffects: false</code> in
        its package.json. Modern bundlers (Vite, webpack, Rollup) will automatically eliminate unused icons from your production bundle.
      </p>

      {/* Named imports */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Named Imports (Recommended)</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Import icons by name from the barrel export. Your bundler's tree-shaking will strip out everything you don't use.
      </p>

      <SyntaxBlock
        title="Named Imports"
        onCopy={() => onCopy("// ✅ Only Home and Bell are included in the bundle\nimport { Home, Bell } from 'reicon-react';", 'perf-named')}
        copied={copiedField === 'perf-named'}
      >
        <span className="text-text-base/30">{'// ✅ Only Home and Bell are included in the bundle'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-text-base/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">Bell</span>
        <span className="text-text-base/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-react'</span>
        <span className="text-text-base/30">;</span>
      </SyntaxBlock>

      {/* Direct imports */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Direct Imports (Smallest Bundle)</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        For absolute minimal bundle size, import each icon directly from its own module. This guarantees only that icon's code is included — no bundler analysis needed.
      </p>

      <SyntaxBlock
        title="Direct Imports"
        onCopy={() => onCopy("// ✅ Guaranteed single-icon inclusion\nimport Home from 'reicon-react/icons/Home';\nimport Bell from 'reicon-react/icons/Bell';", 'perf-direct')}
        copied={copiedField === 'perf-direct'}
      >
        <span className="text-text-base/30">{'// ✅ Guaranteed single-icon inclusion'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-[#e5c07b]"> Home</span>
        <span className="text-[#c678dd]"> from</span>
        <span className="text-[#98c379]"> 'reicon-react/icons/Home'</span>
        <span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-[#e5c07b]"> Bell</span>
        <span className="text-[#c678dd]"> from</span>
        <span className="text-[#98c379]"> 'reicon-react/icons/Bell'</span>
        <span className="text-text-base/30">;</span>
      </SyntaxBlock>

      {/* What to avoid */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">What to Avoid</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Avoid wildcard or star imports — they pull in every icon and defeat tree-shaking.
      </p>

      <SyntaxBlock
        title="Anti-patterns"
        onCopy={() => onCopy("// ❌ Imports ALL icons — entire library in bundle\nimport * as Icons from 'reicon-react';\n\n// ❌ Re-exporting everything defeats tree-shaking\nexport * from 'reicon-react';", 'perf-avoid')}
        copied={copiedField === 'perf-avoid'}
      >
        <span className="text-text-base/30">{'// ❌ Imports ALL icons — entire library in bundle'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-text-base/70"> * </span>
        <span className="text-[#c678dd]">as</span>
        <span className="text-[#e5c07b]"> Icons</span>
        <span className="text-[#c678dd]"> from</span>
        <span className="text-[#98c379]"> 'reicon-react'</span>
        <span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-text-base/30">{'// ❌ Re-exporting everything defeats tree-shaking'}</span>
        {'\n'}
        <span className="text-[#c678dd]">export</span>
        <span className="text-text-base/70"> * </span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-react'</span>
        <span className="text-text-base/30">;</span>
      </SyntaxBlock>

      {/* CDN caching */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">CDN Performance</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        When using the CDN, icons are fetched on demand and cached in the browser. Subsequent page loads use the cached SVGs — no duplicate network requests.
      </p>

      <div className="bg-text-base/3 border border-text-base/6 rounded-xl overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-text-base/6">
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-base/45 uppercase tracking-wider">Method</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-base/45 uppercase tracking-wider">Bundle Impact</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-base/45 uppercase tracking-wider">Best For</th>
            </tr>
          </thead>
          <tbody className="text-text-base/60">
            <tr className="border-b border-text-base/4">
              <td className="px-4 py-3"><code className="text-[#b3a8ff] bg-[#6C5CE7]/14 px-1.5 py-0.5 rounded text-[12px]">reicon-react</code></td>
              <td className="px-4 py-3">Only used icons</td>
              <td className="px-4 py-3">React / Next.js apps</td>
            </tr>
            <tr className="border-b border-text-base/4">
              <td className="px-4 py-3"><code className="text-[#b3a8ff] bg-[#6C5CE7]/14 px-1.5 py-0.5 rounded text-[12px]">reicon-react/icons/*</code></td>
              <td className="px-4 py-3">Single icon per import</td>
              <td className="px-4 py-3">Production builds</td>
            </tr>
            <tr className="border-b border-text-base/4">
              <td className="px-4 py-3"><code className="text-[#b3a8ff] bg-[#6C5CE7]/14 px-1.5 py-0.5 rounded text-[12px]">reicon-vue</code></td>
              <td className="px-4 py-3">Only used icons</td>
              <td className="px-4 py-3">Vue / Nuxt apps</td>
            </tr>
            <tr>
              <td className="px-4 py-3"><code className="text-[#b3a8ff] bg-[#6C5CE7]/14 px-1.5 py-0.5 rounded text-[12px]">CDN script</code></td>
              <td className="px-4 py-3">On-demand fetching</td>
              <td className="px-4 py-3">Static sites, prototyping</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
