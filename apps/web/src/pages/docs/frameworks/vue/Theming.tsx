import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Theming({ copiedField, onCopy }: Props) {
  return (
    <>
      {/* Dynamic Icons */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Dynamic Icons</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Use Vue's <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">{'<component :is="..." />'}</code> pattern with <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">shallowRef</code> for dynamic icon switching.
      </p>

      <SyntaxBlock
        title="Dynamic"
        onCopy={() => onCopy("<script setup>\nimport { Home, Settings, User } from 'reicon-vue';\nimport { shallowRef } from 'vue';\n\nconst currentIcon = shallowRef(Home);\n</script>\n\n<template>\n  <component :is=\"currentIcon\" :size=\"32\" />\n</template>", 'vue-dynamic')}
        copied={copiedField === 'vue-dynamic'}
      >
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">script setup</span><span className="text-text-base/70">{'>'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-text-base/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span><span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">Settings</span><span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">User</span>
        <span className="text-text-base/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-vue'</span><span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-text-base/70">{' { '}</span>
        <span className="text-[#e5c07b]">shallowRef</span>
        <span className="text-text-base/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'vue'</span><span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-[#c678dd]">const</span><span className="text-[#e5c07b]"> currentIcon</span><span className="text-text-base/70"> = </span><span className="text-[#61afef]">shallowRef</span><span className="text-text-base/70">(Home);</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/70">{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">template</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">component</span><span className="text-[#d19a66]"> :is</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"currentIcon"</span><span className="text-[#d19a66]"> :size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"32"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">template</span><span className="text-text-base/70">{'>'}</span>
      </SyntaxBlock>

      {/* Nuxt 3 */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Nuxt 3</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Works out of the box with Nuxt 3 — just import and use. No plugins or configuration needed.
      </p>

      <SyntaxBlock
        title="Nuxt 3"
        onCopy={() => onCopy("<script setup>\nimport { Home } from 'reicon-vue';\n</script>\n\n<template>\n  <Home :size=\"24\" />\n</template>", 'vue-nuxt')}
        copied={copiedField === 'vue-nuxt'}
      >
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">script setup</span><span className="text-text-base/70">{'>'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-text-base/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-text-base/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-vue'</span><span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/70">{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">template</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> :size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">template</span><span className="text-text-base/70">{'>'}</span>
      </SyntaxBlock>

      <div className="mt-6 bg-[#4DBA87]/5 border border-[#4DBA87]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
        <span className="text-[#4DBA87] font-medium">Note:</span> All icon components are SSR-compatible and work with Nuxt 3, Vite, and other Vue 3 frameworks out of the box.
      </div>
    </>
  );
}
