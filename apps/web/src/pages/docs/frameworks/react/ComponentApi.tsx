import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function ComponentApi({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Customizing Icons</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Every icon component accepts the following props to customize its appearance. You can also pass any standard HTML/SVG attributes.
      </p>

      <SyntaxBlock
        title="Props"
        onCopy={() => onCopy('// Size\n<Home size={16} />\n<Home size={24} />\n<Home size={32} />\n\n// Color\n<Heart color="#ef4444" />\n<Heart color="rgb(99, 102, 241)" />\n\n// Weight\n<Star />                     // Outline (default)\n<Star weight="Filled" />     // Filled\n\n// ClassName\n<Home className="text-blue-500 hover:text-blue-600" />', 'react-props')}
        copied={copiedField === 'react-props'}
      >
        <span className="text-text-base/30">{'// Size'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}16{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}32{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'// Color'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#ef4444"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"rgb(99, 102, 241)"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'// Weight'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-text-base/70"> /{'>'}</span><span className="text-text-base/30">{'                     // Outline (default)'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-text-base/70"> /{'>'}</span><span className="text-text-base/30">{'     // Filled'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'// ClassName'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> className</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"text-blue-500 hover:text-blue-600"</span><span className="text-text-base/70"> /{'>'}</span>
      </SyntaxBlock>
    </>
  );
}
