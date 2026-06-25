import SyntaxBlock from '../../components/usage/SyntaxBlock';
import InstallTabs from '../../components/usage/InstallTabs';
import SectionHeader from '../../components/usage/SectionHeader';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

const VueIcon = ({ size = 34 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 122.88 106.42" fill="none">
    <polygon fill="#4DBA87" points="75.63,0 61.44,24.58 47.25,0 0,0 61.44,106.42 122.88,0 75.63,0" />
    <polygon fill="#425466" points="75.63,0 61.44,24.58 47.25,0 24.58,0 61.44,63.85 98.3,0 75.63,0" />
  </svg>
);

export default function VueUsage({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="vue-usage" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="vue-usage"
        title="Usage of Reicon Vue"
        level="h2"
        markdownContent={markdownContent}
        icon={<VueIcon size={30} />}
      />

      <p className="text-white/60 text-[15px] leading-[1.8] mb-6">
        The official Vue 3 package for Reicon. Import beautifully crafted icons as Vue components with full TypeScript support. All icons are tree-shakeable, ensuring only the icons you actually use end up in your bundle.
      </p>

      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-white/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Import icons as individual Vue components</li>
        <li>Customize size, color, and weight via props</li>
        <li>Tree-shake unused icons to keep bundle sizes minimal</li>
        <li>Full TypeScript support with autocompletion</li>
        <li>Use icons in Nuxt 3, Vite, and more</li>
        <li>Apply CSS classes and inline styles directly</li>
      </ul>

      {/* Installation */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Installation</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Install the package using your preferred package manager.
      </p>

      <InstallTabs
        packageName="reicon-vue"
        copiedField={copiedField}
        onCopy={onCopy}
      />

      {/* Basic Usage */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Basic Usage</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Import icons by their PascalCase name from <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">reicon-vue</code>. Each icon is a Vue component that accepts standard props.
      </p>

      <SyntaxBlock
        title="Vue SFC"
        onCopy={() => onCopy("<script setup>\nimport { Home, ShieldCheck, AltArrowDown } from 'reicon-vue';\n</script>\n\n<template>\n  <Home />\n  <ShieldCheck :size=\"32\" color=\"#d97757\" />\n  <AltArrowDown weight=\"Filled\" />\n</template>", 'vue-basic')}
        copied={copiedField === 'vue-basic'}
      >
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">script setup</span><span className="text-white/70">{'>'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-white/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-white/70">, </span>
        <span className="text-[#e5c07b]">ShieldCheck</span>
        <span className="text-white/70">, </span>
        <span className="text-[#e5c07b]">AltArrowDown</span>
        <span className="text-white/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-vue'</span>
        <span className="text-white/30">;</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">script</span><span className="text-white/70">{'>'}</span>
        {'\n\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">template</span><span className="text-white/70">{'>'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-white/70"> /{'>'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">ShieldCheck</span><span className="text-[#d19a66]"> :size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"32"</span><span className="text-[#d19a66]"> color</span><span className="text-white/50">=</span><span className="text-[#98c379]">"#d97757"</span><span className="text-white/70"> /{'>'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">AltArrowDown</span><span className="text-[#d19a66]"> weight</span><span className="text-white/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-white/70"> /{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">template</span><span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* Props */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Props</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Every icon component accepts the following props to customize its appearance. You can also pass any standard HTML/SVG attributes via <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">v-bind</code>.
      </p>

      <SyntaxBlock
        title="Props"
        onCopy={() => onCopy('<Home :size="16" />\n<Home :size="24" />\n<Home :size="32" />\n\n<Heart color="#ef4444" />\n<Heart color="rgb(99, 102, 241)" />\n\n<Star />                     <!-- Outline (default) -->\n<Star weight="Filled" />     <!-- Filled -->\n\n<Home class="my-icon" />', 'vue-props')}
        copied={copiedField === 'vue-props'}
      >
        <span className="text-white/30">{'<!-- Size -->'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> :size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"16"</span><span className="text-white/70"> /{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> :size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-white/70"> /{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> :size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"32"</span><span className="text-white/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-white/30">{'<!-- Color -->'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> color</span><span className="text-white/50">=</span><span className="text-[#98c379]">"#ef4444"</span><span className="text-white/70"> /{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> color</span><span className="text-white/50">=</span><span className="text-[#98c379]">"rgb(99, 102, 241)"</span><span className="text-white/70"> /{'>'}</span>
        {'\n\n'}
        <span className="text-white/30">{'<!-- Weight -->'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-white/70"> /{'>'}</span><span className="text-white/30">{'                     <!-- Outline (default) -->'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-[#d19a66]"> weight</span><span className="text-white/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-white/70"> /{'>'}</span><span className="text-white/30">{'     <!-- Filled -->'}</span>
        {'\n\n'}
        <span className="text-white/30">{'<!-- Class -->'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> class</span><span className="text-white/50">=</span><span className="text-[#98c379]">"my-icon"</span><span className="text-white/70"> /{'>'}</span>
      </SyntaxBlock>

      {/* Direct Import */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Direct Import for Smaller Bundles</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        For the absolute smallest bundle size, import each icon directly from its own module.
      </p>

      <SyntaxBlock
        title="Direct Import"
        onCopy={() => onCopy("import Home from 'reicon-vue/icons/Home';", 'vue-direct')}
        copied={copiedField === 'vue-direct'}
      >
        <span className="text-[#c678dd]">import</span><span className="text-[#e5c07b]"> Home</span><span className="text-[#c678dd]"> from</span><span className="text-[#98c379]"> 'reicon-vue/icons/Home'</span><span className="text-white/30">;</span>
      </SyntaxBlock>

      {/* Dynamic Icons */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Dynamic Icons</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Use Vue's <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<component :is="..." />'}</code> pattern with <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">shallowRef</code> for dynamic icon switching.
      </p>

      <SyntaxBlock
        title="Dynamic"
        onCopy={() => onCopy("<script setup>\nimport { Home, Settings, User } from 'reicon-vue';\nimport { shallowRef } from 'vue';\n\nconst currentIcon = shallowRef(Home);\n</script>\n\n<template>\n  <component :is=\"currentIcon\" :size=\"32\" />\n</template>", 'vue-dynamic')}
        copied={copiedField === 'vue-dynamic'}
      >
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">script setup</span><span className="text-white/70">{'>'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-white/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span><span className="text-white/70">, </span>
        <span className="text-[#e5c07b]">Settings</span><span className="text-white/70">, </span>
        <span className="text-[#e5c07b]">User</span>
        <span className="text-white/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-vue'</span><span className="text-white/30">;</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-white/70">{' { '}</span>
        <span className="text-[#e5c07b]">shallowRef</span>
        <span className="text-white/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'vue'</span><span className="text-white/30">;</span>
        {'\n\n'}
        <span className="text-[#c678dd]">const</span><span className="text-[#e5c07b]"> currentIcon</span><span className="text-white/70"> = </span><span className="text-[#61afef]">shallowRef</span><span className="text-white/70">(Home);</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">script</span><span className="text-white/70">{'>'}</span>
        {'\n\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">template</span><span className="text-white/70">{'>'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">component</span><span className="text-[#d19a66]"> :is</span><span className="text-white/50">=</span><span className="text-[#98c379]">"currentIcon"</span><span className="text-[#d19a66]"> :size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"32"</span><span className="text-white/70"> /{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">template</span><span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* Nuxt 3 */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Nuxt 3</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Works out of the box with Nuxt 3 — just import and use. No plugins or configuration needed.
      </p>

      <SyntaxBlock
        title="Nuxt 3"
        onCopy={() => onCopy("<script setup>\nimport { Home } from 'reicon-vue';\n</script>\n\n<template>\n  <Home :size=\"24\" />\n</template>", 'vue-nuxt')}
        copied={copiedField === 'vue-nuxt'}
      >
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">script setup</span><span className="text-white/70">{'>'}</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span>
        <span className="text-white/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-white/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-vue'</span><span className="text-white/30">;</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">script</span><span className="text-white/70">{'>'}</span>
        {'\n\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">template</span><span className="text-white/70">{'>'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> :size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-white/70"> /{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">template</span><span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      <div className="mt-6 bg-[#4DBA87]/5 border border-[#4DBA87]/15 rounded-xl p-4 text-[13px] text-white/50 leading-relaxed">
        <span className="text-[#4DBA87] font-medium">Note:</span> All icon components are SSR-compatible and work with Nuxt 3, Vite, and other Vue 3 frameworks out of the box.
      </div>
    </section>
  );
}
