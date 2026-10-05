import SectionHeader from '@/components/docs/SectionHeader';
import SyntaxBlock from '@/components/docs/SyntaxBlock';
import { FiDownload } from 'react-icons/fi';
import SvgIcon from './SvgIcon';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function SvgDocs({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="svg-docs" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="svg-docs"
        title="Raw SVGs & Assets"
        level="h2"
        markdownContent={markdownContent}
        icon={<SvgIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        Download and integrate raw SVG vector files directly into vanilla HTML layouts, static sites, build tools, or design platforms. We provide pre-compiled, optimized icon sheets in both Outline and Filled weights.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Download all 2,700+ icons as individual SVG files (5,400+ vectors total)</li>
        <li>Embed inline SVGs into any HTML document with full CSS control</li>
        <li>Load vector assets dynamically via CDN links (jsDelivr, unpkg)</li>
        <li>Create SVG sprite sheets using <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">&lt;svg&gt;&lt;use href="#id" /&gt;&lt;/svg&gt;</code></li>
        <li>Apply dynamic colors and hover effects using CSS <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">currentColor</code></li>
        <li>Zero JavaScript dependencies or bundler requirements</li>
      </ul>

      {/* Download ZIP Archive */}
      <h3 id="svg-download" data-section className="text-lg font-sans font-medium text-text-base mb-4 mt-10 scroll-mt-24">
        Download ZIP Archive
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Get the complete, compressed package containing all 2,700+ icons in both Outline and Filled weights (total 5,400+ vectors). All icons are compressed and optimized for lightweight load speeds, pre-colored in black (<code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">#000000</code>) for standard vector previews.
      </p>

      <div className="mb-8">
        <a
          href="/reicon-icons.zip"
          download
          className="inline-flex items-center gap-2 bg-text-base/5 hover:bg-text-base/10 text-text-base text-[13px] font-medium px-4 py-2 rounded-full transition-colors cursor-pointer select-none border-0"
        >
          <FiDownload size={15} />
          <span>Download SVG Assets (.zip)</span>
        </a>
      </div>

      {/* CDN & Direct URLs */}
      <h3 id="svg-cdn" data-section className="text-lg font-sans font-medium text-text-base mb-4 mt-10 scroll-mt-24">
        CDN &amp; Direct URLs
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Fetch raw SVG vectors on-demand via high-speed global CDNs without installing local packages:
      </p>

      <SyntaxBlock
        title="CDN Image Links"
        onCopy={() => onCopy("<!-- jsDelivr CDN -->\n<img src=\"https://cdn.jsdelivr.net/npm/reicon@latest/icons/outline/home.svg\" width=\"24\" height=\"24\" alt=\"Home\" />\n\n<!-- unpkg CDN -->\n<img src=\"https://unpkg.com/reicon@latest/icons/filled/star.svg\" width=\"24\" height=\"24\" alt=\"Star\" />", "svg-cdn-code")}
        copied={copiedField === 'svg-cdn-code'}
      >
        <span className="text-text-base/30">{'<!-- jsDelivr CDN -->'}</span>
        {'\n'}
        <span className="text-[#e06c75]">{'<img'}</span><span className="text-[#d19a66]"> src</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"https://cdn.jsdelivr.net/npm/reicon@latest/icons/outline/home.svg"</span><span className="text-[#d19a66]"> width</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-[#d19a66]"> height</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'<!-- unpkg CDN -->'}</span>
        {'\n'}
        <span className="text-[#e06c75]">{'<img'}</span><span className="text-[#d19a66]"> src</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"https://unpkg.com/reicon@latest/icons/filled/star.svg"</span><span className="text-[#d19a66]"> width</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-[#d19a66]"> height</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-text-base/70"> /{'>'}</span>
      </SyntaxBlock>

      {/* Embedding in HTML */}
      <h3 id="svg-embedding" data-section className="text-lg font-sans font-medium text-text-base mb-4 mt-10 scroll-mt-24">
        Embedding in HTML
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        Use raw SVG code directly in your HTML documents for full inline styling control:
      </p>

      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-md font-medium text-text-base mb-3">Outline Style Integration:</h4>
          <SyntaxBlock
            title="HTML Outline Example"
            onCopy={() => onCopy('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\n  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />\n  <polyline points="9 22 9 12 15 12 15 22" />\n</svg>', "svg-outline-code")}
            copied={copiedField === 'svg-outline-code'}
          >
            <span className="text-[#e06c75]">{'<svg'}</span>
            <span className="text-[#d19a66]">{' xmlns'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"http://www.w3.org/2000/svg"'}</span>
            <span className="text-[#d19a66]">{' width'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"24"'}</span>
            <span className="text-[#d19a66]">{' height'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"24"'}</span>
            <span className="text-[#d19a66]">{' viewBox'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"0 0 24 24"'}</span>
            <span className="text-[#d19a66]">{' fill'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"none"'}</span>
            <span className="text-[#d19a66]">{' stroke'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"currentColor"'}</span>
            <span className="text-[#d19a66]">{' stroke-width'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"1.5"'}</span>
            <span className="text-[#e06c75]">{'>'}</span>
            {'\n  '}
            <span className="text-[#e06c75]">{'<path'}</span><span className="text-[#d19a66]"> d</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">{'"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"'}</span><span className="text-[#e06c75]">{' />'}</span>
            {'\n  '}
            <span className="text-[#e06c75]">{'<polyline'}</span><span className="text-[#d19a66]"> points</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">{'"9 22 9 12 15 12 15 22"'}</span><span className="text-[#e06c75]">{' />'}</span>
            {'\n'}
            <span className="text-[#e06c75]">{`</svg>`}</span>
          </SyntaxBlock>
        </div>

        <div>
          <h4 className="text-md font-medium text-text-base mb-3">Filled Style Integration:</h4>
          <SyntaxBlock
            title="HTML Filled Example"
            onCopy={() => onCopy('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />\n</svg>', "svg-filled-code")}
            copied={copiedField === 'svg-filled-code'}
          >
            <span className="text-[#e06c75]">{'<svg'}</span>
            <span className="text-[#d19a66]">{' xmlns'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"http://www.w3.org/2000/svg"'}</span>
            <span className="text-[#d19a66]">{' width'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"24"'}</span>
            <span className="text-[#d19a66]">{' height'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"24"'}</span>
            <span className="text-[#d19a66]">{' viewBox'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"0 0 24 24"'}</span>
            <span className="text-[#d19a66]">{' fill'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"none"'}</span>
            <span className="text-[#e06c75]">{'>'}</span>
            {'\n  '}
            <span className="text-[#e06c75]">{`<path`}</span><span className="text-[#d19a66]">{' d'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"M12 2l3.09 6.26..."'}</span><span className="text-[#d19a66]">{' fill'}</span><span className="text-text-base/50">{'='}</span><span className="text-[#98c379]">{'"currentColor"'}</span><span className="text-[#e06c75]">{` />`}</span>
            {'\n'}
            <span className="text-[#e06c75]">{`</svg>`}</span>
          </SyntaxBlock>
        </div>
      </div>

      {/* SVG Sprites */}
      <h3 id="svg-sprites" data-section className="text-lg font-sans font-medium text-text-base mb-4 mt-10 scroll-mt-24">
        SVG Sprites &amp; &lt;use&gt; Tags
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Combine multiple icons into a single SVG sprite sheet to minimize network requests:
      </p>

      <SyntaxBlock
        title="SVG Sprite Usage"
        onCopy={() => onCopy("<!-- Sprite Definition -->\n<svg style=\"display: none;\">\n  <g id=\"icon-home\">\n    <path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"none\"/>\n  </g>\n</svg>\n\n<!-- Usage in HTML -->\n<svg class=\"icon\" width=\"24\" height=\"24\">\n  <use href=\"#icon-home\" />\n</svg>", "svg-sprite-code")}
        copied={copiedField === 'svg-sprite-code'}
      >
        <span className="text-text-base/30">{'<!-- Sprite Definition -->'}</span>
        {'\n'}
        <span className="text-[#e06c75]">{'<svg'}</span><span className="text-[#d19a66]"> style</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"display: none;"</span><span className="text-[#e06c75]">{'>'}</span>
        {'\n  '}
        <span className="text-[#e06c75]">{'<g'}</span><span className="text-[#d19a66]"> id</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"icon-home"</span><span className="text-[#e06c75]">{'>'}</span>
        {'\n    '}
        <span className="text-[#e06c75]">{'<path'}</span><span className="text-[#d19a66]"> d</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"M3 9l9-7..."</span><span className="text-[#d19a66]"> stroke</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"currentColor"</span><span className="text-[#e06c75]">{' />'}</span>
        {'\n  '}
        <span className="text-[#e06c75]">{'</g>'}</span>
        {'\n'}
        <span className="text-[#e06c75]">{'</svg>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'<!-- Usage in HTML -->'}</span>
        {'\n'}
        <span className="text-[#e06c75]">{'<svg'}</span><span className="text-[#d19a66]"> width</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-[#d19a66]"> height</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-[#e06c75]">{'>'}</span>
        {'\n  '}
        <span className="text-[#e06c75]">{'<use'}</span><span className="text-[#d19a66]"> href</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#icon-home"</span><span className="text-[#e06c75]"> {'/>'}</span>
        {'\n'}
        <span className="text-[#e06c75]">{'</svg>'}</span>
      </SyntaxBlock>

      {/* Dynamic Styling via CSS */}
      <h3 id="svg-styling" data-section className="text-lg font-sans font-medium text-text-base mb-4 mt-10 scroll-mt-24">
        Dynamic Styling via CSS
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Since Reicon SVGs use <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">currentColor</code> for stroke and fill mapping, you can colorize them dynamically by setting the color on parent elements.
      </p>

      <SyntaxBlock
        title="CSS Styling Example"
        onCopy={() => onCopy(".icon-container {\n  color: #9B8AFB;\n  width: 32px;\n  height: 32px;\n  transition: color 0.2s;\n}\n.icon-container:hover {\n  color: #8B7AFB;\n}", "svg-css-code")}
        copied={copiedField === 'svg-css-code'}
      >
        <span className="text-[#e5c07b]">.icon-container</span>
        <span className="text-text-base/70"> {'{'}</span>
        {'\n  '}
        <span className="text-[#e06c75]">color</span><span className="text-text-base/50">:</span><span className="text-[#98c379]"> #9B8AFB</span><span className="text-text-base/30">;</span>
        {'\n  '}
        <span className="text-[#e06c75]">width</span><span className="text-text-base/50">:</span><span className="text-[#d19a66]"> 32px</span><span className="text-text-base/30">;</span>
        {'\n  '}
        <span className="text-[#e06c75]">height</span><span className="text-text-base/50">:</span><span className="text-[#d19a66]"> 32px</span><span className="text-text-base/30">;</span>
        {'\n  '}
        <span className="text-[#e06c75]">transition</span><span className="text-text-base/50">:</span><span className="text-text-base/70"> color 0.2s ease</span><span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-text-base/70">{'}'}</span>
      </SyntaxBlock>

      {/* SVGO Optimization */}
      <h3 id="svg-optimization" data-section className="text-lg font-sans font-medium text-text-base mb-4 mt-10 scroll-mt-24">
        SVGO Optimization &amp; Standards
      </h3>
      <div className="bg-text-base/3 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed mb-12 border-0">
        <span className="text-text-base/80 font-medium">Tip:</span> All Reicon raw SVGs are pre-processed with SVGO to strip unnecessary metadata, precision-round coordinates, and ensure uniform <code className="text-text-base/70 font-mono text-[11px]">viewBox="0 0 24 24"</code> dimensions.
      </div>
    </section>
  );
}
