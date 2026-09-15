import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Theming({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Using with Tailwind CSS</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Reicon works seamlessly with Tailwind CSS. Use the <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">className</code> prop to apply Tailwind utilities. The icon inherits <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">currentColor</code> by default, so Tailwind's text color classes work out of the box.
      </p>

      <SyntaxBlock
        title="Tailwind CSS"
        onCopy={() => onCopy('<Home className="text-gray-500 hover:text-gray-700 w-6 h-6 transition-colors" />\n\n<button className="flex items-center gap-2 text-text-base">\n  <ShieldCheck size={20} className="text-green-500" />\n  Verified\n</button>', 'react-tw')}
        copied={copiedField === 'react-tw'}
      >
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> className</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"text-gray-500 hover:text-gray-700 w-6 h-6 transition-colors"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">button</span><span className="text-[#d19a66]"> className</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"flex items-center gap-2 text-text-base"</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">ShieldCheck</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}20{'}'}</span><span className="text-[#d19a66]"> className</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"text-green-500"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n  '}
        <span className="text-text-base/60">Verified</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">button</span><span className="text-text-base/70">{'>'}</span>
      </SyntaxBlock>
    </>
  );
}
