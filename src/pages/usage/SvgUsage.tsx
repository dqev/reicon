import SectionHeader from '../../components/usage/SectionHeader';
import SyntaxBlock from '../../components/usage/SyntaxBlock';
import { FiDownload } from 'react-icons/fi';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

const SvgIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 300 300">
    <g stroke="#000" strokeWidth="38.009">
      <g id="svgstar-svgpage" transform="translate(150 150)">
        <path id="svgbar-svgpage" fill="#ffb13b" d="M-84.149-15.851a22.417 22.417 0 1 0 0 31.702H84.15a22.417 22.417 0 1 0 0-31.702Z"/>
        <use href="#svgbar-svgpage" transform="rotate(45)"/>
        <use href="#svgbar-svgpage" transform="rotate(90)"/>
        <use href="#svgbar-svgpage" transform="rotate(135)"/>
      </g>
    </g>
    <use href="#svgstar-svgpage"/>
  </svg>
);

export default function SvgUsage({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="svg-usage" className="mb-16 scroll-mt-24">
      <SectionHeader
        id="svg-usage"
        title="Raw SVGs"
        level="h2"
        markdownContent={markdownContent}
        icon={<SvgIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        Download and integrate raw SVG vector files directly into vanilla HTML layouts, static sites, or design platforms. We provide pre-compiled, optimized icon sheets in both Outline and Filled weights.
      </p>

      <div className="mt-8 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">1. Download ZIP Archive</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          Get the complete, compressed package containing all 2,700+ icons in both Outline and Filled weights (total 5,400+ vectors).
        </p>
      </div>

      <div className="bg-text-base/3 rounded-2xl p-6 border border-text-base/4 mb-8">
        <h4 className="text-text-base font-medium text-[15px] mb-3">Complete SVG Assets Pack:</h4>
        <p className="text-text-base/50 text-[14px] leading-relaxed mb-4">
          All icons are compressed and optimized for lightweight load speeds, pre-colored in black (#000000) for standard vector previews.
        </p>
        <a
          href="/reicon-icons.zip"
          download
          className="inline-flex items-center gap-2 bg-[#6C5CE7] hover:bg-[#5A4BD1] text-text-base text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <FiDownload size={15} />
          Download SVG Assets (.zip)
        </a>
      </div>

      <div className="mt-10 mb-6 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">2. Embedding in HTML</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          Use raw SVG code directly in your HTML documents. This allows you to style them dynamically using CSS.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium text-text-base mb-3">Outline Style Integration:</h4>
          <SyntaxBlock
            title="HTML Outline Example"
            onCopy={() => onCopy('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n  <!-- Icon paths go here -->\n</svg>', "svg-outline-code")}
            copied={copiedField === 'svg-outline-code'}
          >
            <span className="text-[#e06c75]">{'<svg'}</span>
            <span className="text-[#d19a66]">{' xmlns'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"http://www.w3.org/2000/svg"'}</span>
            <span className="text-[#d19a66]">{' width'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"24"'}</span>
            <span className="text-[#d19a66]">{' height'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"24"'}</span>
            <span className="text-[#d19a66]">{' viewBox'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"0 0 24 24"'}</span>
            <span className="text-[#d19a66]">{' fill'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"none"'}</span>
            <span className="text-[#d19a66]">{' stroke'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"currentColor"'}</span>
            <span className="text-[#d19a66]">{' stroke-width'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"2"'}</span>
            <span className="text-[#e06c75]">{'>'}</span>
            {'\n  '}
            <span className="text-text-base/40">{'<!-- Icon stroke paths -->'}</span>
            {'\n'}
            <span className="text-[#e06c75]">{`</svg>`}</span>
          </SyntaxBlock>
        </div>

        <div>
          <h4 className="text-md font-medium text-text-base mb-3">Filled Style Integration:</h4>
          <SyntaxBlock
            title="HTML Filled Example"
            onCopy={() => onCopy('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n  <path d="..." fill="currentColor" />\n</svg>', "svg-filled-code")}
            copied={copiedField === 'svg-filled-code'}
          >
            <span className="text-[#e06c75]">{'<svg'}</span>
            <span className="text-[#d19a66]">{' xmlns'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"http://www.w3.org/2000/svg"'}</span>
            <span className="text-[#d19a66]">{' width'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"24"'}</span>
            <span className="text-[#d19a66]">{' height'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"24"'}</span>
            <span className="text-[#d19a66]">{' viewBox'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"0 0 24 24"'}</span>
            <span className="text-[#d19a66]">{' fill'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"none"'}</span>
            <span className="text-[#e06c75]">{'>'}</span>
            {'\n  '}
            <span className="text-[#e06c75]">{`<path`}</span>
            <span className="text-[#d19a66]">{' d'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"..."'}</span>
            <span className="text-[#d19a66]">{' fill'}</span>
            <span className="text-text-base/70">{'='}</span>
            <span className="text-[#98c379]">{'"currentColor"'}</span>
            <span className="text-[#e06c75]">{` />`}</span>
            {'\n'}
            <span className="text-[#e06c75]">{`</svg>`}</span>
          </SyntaxBlock>
        </div>
      </div>

      <div className="mt-12 mb-6 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">3. Dynamic Styling via CSS</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          Since Reicon SVGs use <code>currentColor</code> for stroke and fill mapping, you can colorize them dynamically by setting the color on parent elements.
        </p>
      </div>

      <div className="bg-text-base/3 rounded-2xl p-6 border border-text-base/4 space-y-4">
        <p className="text-text-base/50 text-[14px] leading-relaxed">
          Set custom dimensions and hover effects using standard CSS:
        </p>
        <SyntaxBlock
          title="CSS Styling Example"
          onCopy={() => onCopy(".icon-container {\n  color: #6C5CE7;\n  width: 32px;\n  height: 32px;\n  transition: color 0.2s;\n}\n.icon-container:hover {\n  color: #5A4BD1;\n}", "svg-css-code")}
          copied={copiedField === 'svg-css-code'}
        >
          <span className="text-[#e5c07b]">.icon-container</span>
          <span className="text-text-base/70"> {'{'}</span>
          {'\n  '}
          <span className="text-[#e06c75]">color</span>
          <span className="text-text-base/50">:</span>
          <span className="text-[#98c379]"> #6C5CE7</span>
          <span className="text-text-base/30">;</span>
          {'\n  '}
          <span className="text-[#e06c75]">width</span>
          <span className="text-text-base/50">:</span>
          <span className="text-[#d19a66]"> 32px</span>
          <span className="text-text-base/30">;</span>
          {'\n  '}
          <span className="text-[#e06c75]">height</span>
          <span className="text-text-base/50">:</span>
          <span className="text-[#d19a66]"> 32px</span>
          <span className="text-text-base/30">;</span>
          {'\n'}
          <span className="text-text-base/70">{'}'}</span>
        </SyntaxBlock>
      </div>
    </section>
  );
}
