import SyntaxBlock from '@/components/docs/SyntaxBlock';
import SectionHeader from '@/components/docs/SectionHeader';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Styling({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="styling" data-section className="mb-16 scroll-mt-24">
      <SectionHeader id="styling" title="Styling & Color" level="h2" markdownContent={markdownContent} />
      
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        Reicon icons render as clean, inline SVGs that inherit <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">currentColor</code> by default. You can customize appearance using props, CSS classes, Tailwind utilities, or inline styles across all framework integrations.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Inherit parent text colors automatically using <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">currentColor</code></li>
        <li>Pass custom hex, RGB, HSL, or CSS variable strings via props</li>
        <li>Adjust stroke width thickness (<code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">1.5</code> default, <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">1.0</code> thin, <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">2.5</code> bold)</li>
        <li>Style seamlessly with Tailwind CSS classes (<code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">text-indigo-500</code>, <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">w-6 h-6</code>)</li>
        <li>Apply keyframe animations, hover transforms, and CSS transitions</li>
        <li>Toggle light and dark mode colors dynamically with CSS custom properties</li>
      </ul>

      {/* Color Inheritance */}
      <h3 className="text-lg font-sans font-medium text-text-base mb-4 mt-10">Color Inheritance</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        With no <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">color</code> prop specified, icons automatically inherit the text color of their parent container:
      </p>

      <SyntaxBlock
        title="Inheriting Parent Color"
        onCopy={() => onCopy('<div style={{ color: "#9B8AFB" }}>\n  <Home size={20} />       {/* Purple */}\n  <Bell size={20} />        {/* Purple */}\n</div>\n\n<div style={{ color: "#ef4444" }}>\n  <Heart size={20} />       {/* Red */}\n</div>', 'style-inherit')}
        copied={copiedField === 'style-inherit'}
      >
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">div</span><span className="text-[#d19a66]"> style</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}{'{'} </span><span className="text-[#e06c75]">color</span><span className="text-text-base/50">: </span><span className="text-[#98c379]">"#9B8AFB"</span><span className="text-text-base/70"> {'}'}{'}'}{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}20{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        <span className="text-text-base/30">{'       {/* Purple */}'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Bell</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}20{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        <span className="text-text-base/30">{'        {/* Purple */}'}</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">div</span><span className="text-text-base/70">{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">div</span><span className="text-[#d19a66]"> style</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}{'{'} </span><span className="text-[#e06c75]">color</span><span className="text-text-base/50">: </span><span className="text-[#98c379]">"#ef4444"</span><span className="text-text-base/70"> {'}'}{'}'}{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}20{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        <span className="text-text-base/30">{'       {/* Red */}'}</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">div</span><span className="text-text-base/70">{'>'}</span>
      </SyntaxBlock>

      {/* Direct Color Props */}
      <h3 className="text-lg font-sans font-medium text-text-base mb-4 mt-10">Direct Color Props</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        You can pass Hex, RGB, HSL, or CSS variables directly into the <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">color</code> prop:
      </p>

      <SyntaxBlock
        title="Color Formats"
        onCopy={() => onCopy('<Home color="#9B8AFB" size={24} />           /* Hex */\n<Bell color="rgb(99, 102, 241)" size={24} />   /* RGB */\n<User color="hsl(245, 82%, 67%)" size={24} />  /* HSL */\n<Star color="var(--brand-primary)" size={24} />/* CSS Variable */', 'style-formats')}
        copied={copiedField === 'style-formats'}
      >
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#9B8AFB"</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        <span className="text-text-base/30">{'           /* Hex */'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Bell</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"rgb(99, 102, 241)"</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        <span className="text-text-base/30">{'   /* RGB */'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">User</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"hsl(245, 82%, 67%)"</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        <span className="text-text-base/30">{'  /* HSL */'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"var(--brand-primary)"</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        <span className="text-text-base/30">{'/* CSS Variable */'}</span>
      </SyntaxBlock>

      {/* Stroke Width */}
      <h3 className="text-lg font-sans font-medium text-text-base mb-4 mt-10">Stroke Width Customization</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Adjust stroke thickness on outline icons using the <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">strokeWidth</code> prop. This overrides default stroke widths on all outline paths:
      </p>

      <SyntaxBlock
        title="Stroke Width"
        onCopy={() => onCopy('<Home strokeWidth={1} />      // Thin (1.0px)\n<Home strokeWidth={1.5} />    // Default (1.5px)\n<Home strokeWidth={2.5} />    // Bold (2.5px)', 'style-stroke')}
        copied={copiedField === 'style-stroke'}
      >
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> strokeWidth</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}1{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        <span className="text-text-base/30">{'      // Thin (1.0px)'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> strokeWidth</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}1.5{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        <span className="text-text-base/30">{'    // Default (1.5px)'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> strokeWidth</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}2.5{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        <span className="text-text-base/30">{'    // Bold (2.5px)'}</span>
      </SyntaxBlock>

      {/* Tailwind CSS Integration */}
      <h3 className="text-lg font-sans font-medium text-text-base mb-4 mt-10">Tailwind CSS Integration</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Reicon components accept standard utility classes via <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">className</code>:
      </p>

      <SyntaxBlock
        title="Tailwind Classes"
        onCopy={() => onCopy('<Home className="w-6 h-6 text-indigo-500 hover:text-indigo-600 transition-colors" />\n<Bell className="w-5 h-5 text-slate-400 dark:text-slate-200 hover:rotate-12 transition-transform" />', 'style-tailwind')}
        copied={copiedField === 'style-tailwind'}
      >
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> className</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"w-6 h-6 text-indigo-500 hover:text-indigo-600 transition-colors"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Bell</span><span className="text-[#d19a66]"> className</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"w-5 h-5 text-slate-400 dark:text-slate-200 hover:rotate-12 transition-transform"</span><span className="text-text-base/70"> /{'>'}</span>
      </SyntaxBlock>

      {/* CSS Animations */}
      <h3 className="text-lg font-sans font-medium text-text-base mb-4 mt-10">CSS Animations &amp; Transitions</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Since icons render as native SVGs, you can apply standard CSS keyframe animations:
      </p>

      <SyntaxBlock
        title="Spin & Pulse Keyframes"
        onCopy={() => onCopy('/* CSS */\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n@keyframes pulse {\n  50% { opacity: 0.5; }\n}\n.icon-spin { animation: spin 1s linear infinite; }\n.icon-pulse { animation: pulse 2s ease-in-out infinite; }\n\n/* JSX */\n<Loader className="icon-spin" size={20} />\n<Bell className="icon-pulse" size={20} />', 'style-anim')}
        copied={copiedField === 'style-anim'}
      >
        <span className="text-text-base/30">{'/* CSS */'}</span>
        {'\n'}
        <span className="text-[#c678dd]">@keyframes</span><span className="text-[#e5c07b]"> spin</span><span className="text-text-base/70"> {'{'}</span>
        {'\n  '}
        <span className="text-[#d19a66]">to</span><span className="text-text-base/70"> {'{ '}</span><span className="text-[#e06c75]">transform</span><span className="text-text-base/50">: </span><span className="text-[#61afef]">rotate</span><span className="text-text-base/70">(360deg)</span><span className="text-text-base/30">; </span><span className="text-text-base/70">{'}'}</span>
        {'\n'}
        <span className="text-text-base/70">{'}'}</span>
        {'\n'}
        <span className="text-[#d19a66]">.icon-spin</span><span className="text-text-base/70"> {'{ '}</span><span className="text-[#e06c75]">animation</span><span className="text-text-base/50">: </span><span className="text-text-base/70">spin 1s linear infinite</span><span className="text-text-base/30">;</span><span className="text-text-base/70"> {'}'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'/* JSX */'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Loader</span><span className="text-[#d19a66]"> className</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"icon-spin"</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}20{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Bell</span><span className="text-[#d19a66]"> className</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"icon-pulse"</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}20{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
      </SyntaxBlock>

      {/* Inline styles */}
      <h3 className="text-lg font-sans font-medium text-text-base mb-4 mt-10">Inline Styles</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        The <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">style</code> prop merges directly with the SVG element's inline attributes:
      </p>

      <SyntaxBlock
        title="Inline Style"
        onCopy={() => onCopy('<Heart\n  size={24}\n  style={{\n    transition: "transform 0.2s ease",\n    cursor: "pointer",\n  }}\n  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}\n  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}\n/>', 'style-inline')}
        copied={copiedField === 'style-inline'}
      >
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span>
        {'\n  '}
        <span className="text-[#d19a66]">size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span>
        {'\n  '}
        <span className="text-[#d19a66]">style</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}{'{'}</span>
        {'\n    '}
        <span className="text-[#e06c75]">transition</span><span className="text-text-base/50">: </span><span className="text-[#98c379]">"transform 0.2s ease"</span><span className="text-text-base/30">,</span>
        {'\n    '}
        <span className="text-[#e06c75]">cursor</span><span className="text-text-base/50">: </span><span className="text-[#98c379]">"pointer"</span><span className="text-text-base/30">,</span>
        {'\n  '}
        <span className="text-text-base/70">{'}'}{'}'}</span>
        {'\n'}
        <span className="text-text-base/70">/{'>'}</span>
      </SyntaxBlock>

      <div className="mt-6 bg-[#9B8AFB]/6 rounded-xl p-4 text-[13px] text-text-base/60 leading-relaxed mb-12 border-0">
        <span className="text-[#9B8AFB] font-semibold">Tip:</span> Avoid setting fixed stroke colors inside global CSS overrides, as this can break automatic <code className="text-text-base/70">currentColor</code> adaptation when toggling dark and light mode themes.
      </div>
    </section>
  );
}
