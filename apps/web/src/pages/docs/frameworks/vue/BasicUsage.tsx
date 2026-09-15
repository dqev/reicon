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
        Import icons by their PascalCase name from <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-vue</code>. Each icon is a Vue component that accepts standard props.
      </p>

      <SyntaxBlock
        title="Vue SFC"
        onCopy={() => onCopy("<script setup>\nimport { Home, ShieldCheck, AltArrowDown } from 'reicon-vue';\n</script>\n\n<template>\n  <Home />\n  <ShieldCheck :size=\"32\" color=\"#d97757\" />\n  <AltArrowDown weight=\"Filled\" />\n</template>", 'vue-basic')}
        copied={copiedField === 'vue-basic'}
      >
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">script setup</span><span className="text-text-base/70">{'>'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-text-base/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">ShieldCheck</span>
        <span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">AltArrowDown</span>
        <span className="text-text-base/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-vue'</span>
        <span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/70">{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">template</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">ShieldCheck</span><span className="text-[#d19a66]"> :size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"32"</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#d97757"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">AltArrowDown</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">template</span><span className="text-text-base/70">{'>'}</span>
      </SyntaxBlock>
    </>
  );
}
