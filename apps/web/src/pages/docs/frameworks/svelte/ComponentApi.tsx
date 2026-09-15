import SyntaxBlock from '@/components/docs/SyntaxBlock';
import TypeTable from '@/components/docs/TypeTable';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

const PROPS = [
  { prop: 'size', type: 'number', default: '24', description: 'Width and height of the icon in pixels' },
  { prop: 'color', type: 'string', default: null, description: 'Icon color (any valid CSS color value)' },
  { prop: 'weight', type: `'Outline' | 'Filled'`, default: `'Outline'`, description: 'Icon style weight' },
  { prop: 'class', type: 'string', default: null, description: 'CSS class name(s) to apply to the SVG element' },
  { prop: 'style', type: 'string', default: null, description: 'Inline styles to apply to the SVG element' },
];

export default function ComponentApi({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Props</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Every icon component accepts the following props to customize its appearance.
      </p>

      <div className="mb-8">
        <TypeTable rows={PROPS} />
      </div>

      <SyntaxBlock
        title="Props"
        onCopy={() => onCopy('<Home size={16} />\n<Home size={24} />\n<Home size={32} />\n\n<Heart color="#ef4444" />\n<Heart color="rgb(99, 102, 241)" />\n\n<Star />                       <!-- Outline (default) -->\n<Star weight="Filled" />       <!-- Filled -->\n\n<Home class="my-icon" />', 'svelte-props')}
        copied={copiedField === 'svelte-props'}
      >
        <span className="text-text-base/30">{'<!-- Size -->'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-[#e5c07b]">{'{'}</span><span className="text-[#d19a66]">16</span><span className="text-[#e5c07b]">{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-[#e5c07b]">{'{'}</span><span className="text-[#d19a66]">24</span><span className="text-[#e5c07b]">{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-[#e5c07b]">{'{'}</span><span className="text-[#d19a66]">32</span><span className="text-[#e5c07b]">{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'<!-- Color -->'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#ef4444"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"rgb(99, 102, 241)"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'<!-- Weight -->'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-text-base/70"> /{'>'}</span><span className="text-text-base/30">{'                       <!-- Outline (default) -->'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-text-base/70"> /{'>'}</span><span className="text-text-base/30">{'       <!-- Filled -->'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'<!-- Class -->'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> class</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"my-icon"</span><span className="text-text-base/70"> /{'>'}</span>
      </SyntaxBlock>

      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Direct Import for Smaller Bundles</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        For the absolute smallest bundle size, import each icon directly from its own module.
      </p>

      <SyntaxBlock
        title="Direct Import"
        onCopy={() => onCopy("import Home from 'reicon-svelte/icons/Home.svelte';", 'svelte-direct')}
        copied={copiedField === 'svelte-direct'}
      >
        <span className="text-[#c678dd]">import</span><span className="text-[#e5c07b]"> Home</span><span className="text-[#c678dd]"> from</span><span className="text-[#98c379]"> 'reicon-svelte/icons/Home.svelte'</span><span className="text-text-base/30">;</span>
      </SyntaxBlock>

      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">SvelteKit</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Works out of the box with SvelteKit — just import and use. No plugins or configuration needed.
      </p>

      <SyntaxBlock
        title="SvelteKit"
        onCopy={() => onCopy("<script>\n  import { Home } from 'reicon-svelte';\n</script>\n\n<Home size={24} />", 'svelte-kit')}
        copied={copiedField === 'svelte-kit'}
      >
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}
        <span className="text-[#c678dd]">import</span>
        <span className="text-text-base/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-text-base/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-svelte'</span><span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/70">{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-[#e5c07b]">{'{'}</span><span className="text-[#d19a66]">24</span><span className="text-[#e5c07b]">{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
      </SyntaxBlock>

      <div className="mt-6 bg-[#FF3E00]/5 border border-[#FF3E00]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
        <span className="text-[#FF3E00] font-medium">Note:</span> All icon components are SSR-compatible and work with SvelteKit, Vite, and other Svelte frameworks out of the box.
      </div>
    </>
  );
}
