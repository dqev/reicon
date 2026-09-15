import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function BasicUsage({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Basic Usage</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Import icons by their PascalCase name from <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-svelte</code>. Each icon is a Svelte component that accepts standard props.
      </p>

      <SyntaxBlock
        title="Svelte"
        onCopy={() => onCopy("<script>\n  import { Home, ShieldCheck, AltArrowDown } from 'reicon-svelte';\n</script>\n\n<Home />\n<ShieldCheck size={32} color=\"#d97757\" />\n<AltArrowDown weight=\"Filled\" />", 'svelte-basic')}
        copied={copiedField === 'svelte-basic'}
      >
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}
        <span className="text-[#c678dd]">import</span>
        <span className="text-text-base/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">ShieldCheck</span>
        <span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">AltArrowDown</span>
        <span className="text-text-base/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-svelte'</span>
        <span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/70">{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">ShieldCheck</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-[#e5c07b]">{'{'}</span><span className="text-[#d19a66]">32</span><span className="text-[#e5c07b]">{'}'}</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#d97757"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">AltArrowDown</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-text-base/70"> /{'>'}</span>
      </SyntaxBlock>
    </>
  );
}
