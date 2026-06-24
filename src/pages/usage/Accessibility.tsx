import SyntaxBlock from '../../components/usage/SyntaxBlock';
import SectionHeader from '../../components/usage/SectionHeader';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Accessibility({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="accessibility" data-section className="mb-16 scroll-mt-24">
      <SectionHeader id="accessibility" title="Accessibility" level="h2" markdownContent={markdownContent} />
      <p className="text-white/50 text-[14px] mb-6 leading-relaxed">
        Reicon components pass all extra props (including ARIA attributes) directly to the
        underlying <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<svg>'}</code> element. Use these patterns to make your icons accessible.
      </p>

      {/* Decorative vs informational */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Decorative Icons</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Icons that are purely visual (next to text labels) should be hidden from screen readers
        with <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">aria-hidden</code>.
      </p>

      <SyntaxBlock
        title="Decorative Icon"
        onCopy={() => onCopy('<button>\n  <Home size={20} aria-hidden="true" />\n  Settings\n</button>', 'a11y-decorative')}
        copied={copiedField === 'a11y-decorative'}
      >
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">button</span><span className="text-white/70">{'>'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}20{'}'}</span><span className="text-[#d19a66]"> aria-hidden</span><span className="text-white/50">=</span><span className="text-[#98c379]">"true"</span><span className="text-white/70"> /{'>'}</span>
        {'\n  '}
        <span className="text-white/60">Settings</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">button</span><span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* Informational */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Informational Icons</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Icons that convey meaning without accompanying text need an accessible label. Use{' '}
        <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">aria-label</code> and{' '}
        <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">role="img"</code> so screen readers announce them.
      </p>

      <SyntaxBlock
        title="Informational Icon"
        onCopy={() => onCopy('<AlertTriangle\n  size={20}\n  color="#ef4444"\n  role="img"\n  aria-label="Warning"\n/>', 'a11y-info')}
        copied={copiedField === 'a11y-info'}
      >
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">AlertTriangle</span>
        {'\n  '}
        <span className="text-[#d19a66]">size</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}20{'}'}</span>
        {'\n  '}
        <span className="text-[#d19a66]">color</span><span className="text-white/50">=</span><span className="text-[#98c379]">"#ef4444"</span>
        {'\n  '}
        <span className="text-[#d19a66]">role</span><span className="text-white/50">=</span><span className="text-[#98c379]">"img"</span>
        {'\n  '}
        <span className="text-[#d19a66]">aria-label</span><span className="text-white/50">=</span><span className="text-[#98c379]">"Warning"</span>
        {'\n'}
        <span className="text-white/70">/{'>'}</span>
      </SyntaxBlock>

      {/* Icon-only buttons */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Icon-Only Buttons</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        For buttons that contain only an icon, add <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">aria-label</code> to
        the button itself and hide the icon from the accessibility tree.
      </p>

      <SyntaxBlock
        title="Icon-Only Button"
        onCopy={() => onCopy('<button aria-label="Close dialog">\n  <X size={20} aria-hidden="true" />\n</button>\n\n<button aria-label="Delete item">\n  <Trash size={20} aria-hidden="true" />\n</button>', 'a11y-button')}
        copied={copiedField === 'a11y-button'}
      >
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">button</span><span className="text-[#d19a66]"> aria-label</span><span className="text-white/50">=</span><span className="text-[#98c379]">"Close dialog"</span><span className="text-white/70">{'>'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">X</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}20{'}'}</span><span className="text-[#d19a66]"> aria-hidden</span><span className="text-white/50">=</span><span className="text-[#98c379]">"true"</span><span className="text-white/70"> /{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">button</span><span className="text-white/70">{'>'}</span>
        {'\n\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">button</span><span className="text-[#d19a66]"> aria-label</span><span className="text-white/50">=</span><span className="text-[#98c379]">"Delete item"</span><span className="text-white/70">{'>'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Trash</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}20{'}'}</span><span className="text-[#d19a66]"> aria-hidden</span><span className="text-white/50">=</span><span className="text-[#98c379]">"true"</span><span className="text-white/70"> /{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">button</span><span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* Ref forwarding */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Ref Forwarding</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        All Reicon components use <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">forwardRef</code>, so you can
        attach a ref to the underlying SVG for focus management or measurements.
      </p>

      <SyntaxBlock
        title="Using Refs"
        onCopy={() => onCopy("import { useRef } from 'react';\nimport { Star } from 'reicon-react';\n\nfunction App() {\n  const iconRef = useRef<SVGSVGElement>(null);\n  return <Star ref={iconRef} size={24} tabIndex={0} />;\n}", 'a11y-ref')}
        copied={copiedField === 'a11y-ref'}
      >
        <span className="text-[#c678dd]">import</span>
        <span className="text-white/70">{' { '}</span>
        <span className="text-[#e5c07b]">useRef</span>
        <span className="text-white/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'react'</span>
        <span className="text-white/30">;</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-white/70">{' { '}</span>
        <span className="text-[#e5c07b]">Star</span>
        <span className="text-white/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-react'</span>
        <span className="text-white/30">;</span>
        {'\n\n'}
        <span className="text-[#c678dd]">function</span>
        <span className="text-[#61afef]"> App</span>
        <span className="text-white/70">() {'{'}</span>
        {'\n  '}
        <span className="text-[#c678dd]">const</span>
        <span className="text-[#e5c07b]"> iconRef</span>
        <span className="text-white/70"> = </span>
        <span className="text-[#61afef]">useRef</span>
        <span className="text-white/50">{'<'}</span>
        <span className="text-[#e5c07b]">SVGSVGElement</span>
        <span className="text-white/50">{'>'}</span>
        <span className="text-white/70">(</span>
        <span className="text-[#d19a66]">null</span>
        <span className="text-white/70">)</span>
        <span className="text-white/30">;</span>
        {'\n  '}
        <span className="text-[#c678dd]">return</span>
        <span className="text-white/70"> {'<'}</span>
        <span className="text-[#e06c75]">Star</span>
        <span className="text-[#d19a66]"> ref</span>
        <span className="text-white/50">=</span>
        <span className="text-white/70">{'{'}iconRef{'}'}</span>
        <span className="text-[#d19a66]"> size</span>
        <span className="text-white/50">=</span>
        <span className="text-white/70">{'{'}24{'}'}</span>
        <span className="text-[#d19a66]"> tabIndex</span>
        <span className="text-white/50">=</span>
        <span className="text-white/70">{'{'}0{'}'}</span>
        <span className="text-white/70"> /{'>'}</span>
        <span className="text-white/30">;</span>
        {'\n'}
        <span className="text-white/70">{'}'}</span>
      </SyntaxBlock>

      <div className="mt-6 bg-[#6C5CE7]/5 border border-[#6C5CE7]/15 rounded-xl p-4 text-[13px] text-white/50 leading-relaxed">
        <span className="text-[#6C5CE7] font-medium">Tip:</span> Since Reicon passes all props to the SVG element, you can use any standard SVG or ARIA attribute — <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">focusable</code>, <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">tabIndex</code>, <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">onFocus</code>, etc.
      </div>
    </section>
  );
}
