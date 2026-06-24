import SyntaxBlock from '../../components/usage/SyntaxBlock';
import SectionHeader from '../../components/usage/SectionHeader';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Styling({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="styling" data-section className="mb-16 scroll-mt-24">
      <SectionHeader id="styling" title="Styling & Color" level="h2" markdownContent={markdownContent} />
      <p className="text-white/50 text-[14px] mb-6 leading-relaxed">
        Reicon icons render as inline SVGs that inherit <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">currentColor</code> by
        default. You can control appearance via props, CSS, or Tailwind utilities.
      </p>

      {/* currentColor inheritance */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Color Inheritance</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        With no <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">color</code> prop, icons inherit the text color of their parent — just like regular text.
      </p>

      <SyntaxBlock
        title="Inheriting Color"
        onCopy={() => onCopy('<div style={{ color: "#6C5CE7" }}>\n  <Home size={20} />       {/* purple */}\n  <Bell size={20} />        {/* purple */}\n</div>\n\n<div style={{ color: "#ef4444" }}>\n  <Heart size={20} />       {/* red */}\n</div>', 'style-inherit')}
        copied={copiedField === 'style-inherit'}
      >
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">div</span><span className="text-[#d19a66]"> style</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}{'{'} </span><span className="text-[#e06c75]">color</span><span className="text-white/50">: </span><span className="text-[#98c379]">"#6C5CE7"</span><span className="text-white/70"> {'}'}{'}'}{'>'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}20{'}'}</span><span className="text-white/70"> /{'>'}</span>
        <span className="text-white/30">{'       {/* purple */}'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Bell</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}20{'}'}</span><span className="text-white/70"> /{'>'}</span>
        <span className="text-white/30">{'        {/* purple */}'}</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">div</span><span className="text-white/70">{'>'}</span>
        {'\n\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">div</span><span className="text-[#d19a66]"> style</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}{'{'} </span><span className="text-[#e06c75]">color</span><span className="text-white/50">: </span><span className="text-[#98c379]">"#ef4444"</span><span className="text-white/70"> {'}'}{'}'}{'>'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}20{'}'}</span><span className="text-white/70"> /{'>'}</span>
        <span className="text-white/30">{'       {/* red */}'}</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">div</span><span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* Stroke Width */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Stroke Width</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Adjust the thickness of outline icons with the <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">strokeWidth</code> prop.
        This overrides the default stroke width on all stroked paths in the icon.
      </p>

      <SyntaxBlock
        title="Stroke Width"
        onCopy={() => onCopy('<Home strokeWidth={1} />      // Thin\n<Home strokeWidth={1.5} />    // Default\n<Home strokeWidth={2.5} />    // Bold', 'style-stroke')}
        copied={copiedField === 'style-stroke'}
      >
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> strokeWidth</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}1{'}'}</span><span className="text-white/70"> /{'>'}</span>
        <span className="text-white/30">{'      // Thin'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> strokeWidth</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}1.5{'}'}</span><span className="text-white/70"> /{'>'}</span>
        <span className="text-white/30">{'    // Default'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> strokeWidth</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}2.5{'}'}</span><span className="text-white/70"> /{'>'}</span>
        <span className="text-white/30">{'    // Bold'}</span>
      </SyntaxBlock>

      {/* CSS Animations */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">CSS Animations</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Since icons render as standard SVG elements, you can apply any CSS animation or transition
        via <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">className</code> or <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">style</code>.
      </p>

      <SyntaxBlock
        title="Spin & Pulse"
        onCopy={() => onCopy('/* CSS */\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n@keyframes pulse {\n  50% { opacity: 0.5; }\n}\n.icon-spin { animation: spin 1s linear infinite; }\n.icon-pulse { animation: pulse 2s ease-in-out infinite; }\n\n/* JSX */\n<Loader className="icon-spin" size={20} />\n<Bell className="icon-pulse" size={20} />', 'style-anim')}
        copied={copiedField === 'style-anim'}
      >
        <span className="text-white/30">{'/* CSS */'}</span>
        {'\n'}
        <span className="text-[#c678dd]">@keyframes</span><span className="text-[#e5c07b]"> spin</span><span className="text-white/70"> {'{'}</span>
        {'\n  '}
        <span className="text-[#d19a66]">to</span><span className="text-white/70"> {'{ '}</span><span className="text-[#e06c75]">transform</span><span className="text-white/50">: </span><span className="text-[#61afef]">rotate</span><span className="text-white/70">(360deg)</span><span className="text-white/30">; </span><span className="text-white/70">{'}'}</span>
        {'\n'}
        <span className="text-white/70">{'}'}</span>
        {'\n'}
        <span className="text-[#d19a66]">.icon-spin</span><span className="text-white/70"> {'{ '}</span><span className="text-[#e06c75]">animation</span><span className="text-white/50">: </span><span className="text-white/70">spin 1s linear infinite</span><span className="text-white/30">;</span><span className="text-white/70"> {'}'}</span>
        {'\n\n'}
        <span className="text-white/30">{'/* JSX */'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Loader</span><span className="text-[#d19a66]"> className</span><span className="text-white/50">=</span><span className="text-[#98c379]">"icon-spin"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}20{'}'}</span><span className="text-white/70"> /{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Bell</span><span className="text-[#d19a66]"> className</span><span className="text-white/50">=</span><span className="text-[#98c379]">"icon-pulse"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}20{'}'}</span><span className="text-white/70"> /{'>'}</span>
      </SyntaxBlock>

      {/* Inline styles */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Inline Styles</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        The <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">style</code> prop merges with the icon's base styles, letting you add
        transitions, transforms, or any CSS property.
      </p>

      <SyntaxBlock
        title="Inline Style"
        onCopy={() => onCopy('<Heart\n  size={24}\n  style={{\n    transition: "transform 0.2s ease",\n    cursor: "pointer",\n  }}\n  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}\n  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}\n/>', 'style-inline')}
        copied={copiedField === 'style-inline'}
      >
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Heart</span>
        {'\n  '}
        <span className="text-[#d19a66]">size</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}24{'}'}</span>
        {'\n  '}
        <span className="text-[#d19a66]">style</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}{'{'}</span>
        {'\n    '}
        <span className="text-[#e06c75]">transition</span><span className="text-white/50">: </span><span className="text-[#98c379]">"transform 0.2s ease"</span><span className="text-white/30">,</span>
        {'\n    '}
        <span className="text-[#e06c75]">cursor</span><span className="text-white/50">: </span><span className="text-[#98c379]">"pointer"</span><span className="text-white/30">,</span>
        {'\n  '}
        <span className="text-white/70">{'}'}{'}'}</span>
        {'\n'}
        <span className="text-white/70">/{'>'}</span>
      </SyntaxBlock>
    </section>
  );
}
