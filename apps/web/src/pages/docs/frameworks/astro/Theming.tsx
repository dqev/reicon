import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Theming({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Styling &amp; Tailwind CSS</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Icons inherit their parent's text color by default via <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">currentColor</code>. You can easily style icons using Tailwind CSS utility classes or custom inline CSS.
      </p>

      <SyntaxBlock
        title="Tailwind CSS Example"
        onCopy={() => onCopy(`---\nimport { Home, ShieldCheck, Heart } from 'reicon-astro';\n---\n\n<div class="flex items-center gap-4 text-gray-700 dark:text-gray-200">\n  <Home class="w-6 h-6 hover:text-indigo-500 transition-colors" />\n  <ShieldCheck class="w-6 h-6 text-green-500" />\n  <Heart class="w-6 h-6 text-rose-500 fill-current" />\n</div>`, 'astro-theming')}
        copied={copiedField === 'astro-theming'}
      >
        <span className="text-text-base/30">---</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-text-base/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">ShieldCheck</span>
        <span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">Heart</span>
        <span className="text-text-base/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-astro'</span>
        <span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-text-base/30">---</span>
        {'\n\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">div</span><span className="text-[#d19a66]"> class</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"flex items-center gap-4 text-gray-700 dark:text-gray-200"</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> class</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"w-6 h-6 hover:text-indigo-500 transition-colors"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">ShieldCheck</span><span className="text-[#d19a66]"> class</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"w-6 h-6 text-green-500"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> class</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"w-6 h-6 text-rose-500 fill-current"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">div</span><span className="text-text-base/70">{'>'}</span>
      </SyntaxBlock>
    </>
  );
}
