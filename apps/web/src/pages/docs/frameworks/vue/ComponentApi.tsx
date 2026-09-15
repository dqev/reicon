import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function ComponentApi({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Props</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Every icon component accepts the following props to customize its appearance. You can also pass any standard HTML/SVG attributes via <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">v-bind</code>.
      </p>

      <SyntaxBlock
        title="Props"
        onCopy={() => onCopy('<Home :size="16" />\n<Home :size="24" />\n<Home :size="32" />\n\n<Heart color="#ef4444" />\n<Heart color="rgb(99, 102, 241)" />\n\n<Star />                     <!-- Outline (default) -->\n<Star weight="Filled" />     <!-- Filled -->\n\n<Home class="my-icon" />', 'vue-props')}
        copied={copiedField === 'vue-props'}
      >
        <span className="text-text-base/30">{'<!-- Size -->'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> :size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"16"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> :size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> :size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"32"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'<!-- Color -->'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#ef4444"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"rgb(99, 102, 241)"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'<!-- Weight -->'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-text-base/70"> /{'>'}</span><span className="text-text-base/30">{'                     <!-- Outline (default) -->'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-text-base/70"> /{'>'}</span><span className="text-text-base/30">{'     <!-- Filled -->'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'<!-- Class -->'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> class</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"my-icon"</span><span className="text-text-base/70"> /{'>'}</span>
      </SyntaxBlock>

      {/* Direct Import */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Direct Import for Smaller Bundles</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        For the absolute smallest bundle size, import each icon directly from its own module.
      </p>

      <SyntaxBlock
        title="Direct Import"
        onCopy={() => onCopy("import Home from 'reicon-vue/icons/Home';", 'vue-direct')}
        copied={copiedField === 'vue-direct'}
      >
        <span className="text-[#c678dd]">import</span><span className="text-[#e5c07b]"> Home</span><span className="text-[#c678dd]"> from</span><span className="text-[#98c379]"> 'reicon-vue/icons/Home'</span><span className="text-text-base/30">;</span>
      </SyntaxBlock>
    </>
  );
}
