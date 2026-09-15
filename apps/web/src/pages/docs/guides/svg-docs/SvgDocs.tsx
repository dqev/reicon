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
    <section id="svg-docs" className="mb-16 scroll-mt-24">
      <SectionHeader
        id="svg-docs"
        title="Raw SVGs"
        level="h2"
        markdownContent={markdownContent}
        icon={<SvgIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        Download and integrate raw SVG vector files directly into vanilla HTML layouts, static sites, or design platforms. We provide pre-compiled, optimized icon sheets in both Outline and Filled weights.
      </p>

      {/* Download ZIP Archive */}
      <h3 id="svg-download" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Download ZIP Archive
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Get the complete, compressed package containing all 2,700+ icons in both Outline and Filled weights (total 5,400+ vectors). All icons are compressed and optimized for lightweight load speeds, pre-colored in black (#000000) for standard vector previews.
      </p>

      <div className="mb-8">
        <a
          href="/reicon-icons.zip"
          download
          className="inline-flex items-center gap-2 bg-[#9B8AFB] hover:bg-[#8B7AFB] text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          <FiDownload size={15} />
          Download SVG Assets (.zip)
        </a>
      </div>

      {/* Embedding in HTML */}
      <h3 id="svg-embedding" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Embedding in HTML
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        Use raw SVG code directly in your HTML documents. This allows you to style them dynamically using CSS.
      </p>

      <div className="space-y-6 mb-8">
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

      {/* Dynamic Styling via CSS */}
      <h3 id="svg-styling" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Dynamic Styling via CSS
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Since Reicon SVGs use <code>currentColor</code> for stroke and fill mapping, you can colorize them dynamically by setting the color on parent elements.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4 mt-6">
        Set custom dimensions and hover effects using standard CSS:
      </p>

      <SyntaxBlock
        title="CSS Styling Example"
        onCopy={() => onCopy(".icon-container {\n  color: #9B8AFB;\n  width: 32px;\n  height: 32px;\n  transition: color 0.2s;\n}\n.icon-container:hover {\n  color: #8B7AFB;\n}", "svg-css-code")}
        copied={copiedField === 'svg-css-code'}
      >
        <span className="text-[#e5c07b]">.icon-container</span>
        <span className="text-text-base/70"> {'{'}</span>
        {'\n  '}
        <span className="text-[#e06c75]">color</span>
        <span className="text-text-base/50">:</span>
        <span className="text-[#98c379]"> #9B8AFB</span>
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
      <div className="mb-12" />
    </section>
  );
}
