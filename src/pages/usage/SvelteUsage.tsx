import SyntaxBlock from '../../components/usage/SyntaxBlock';
import InstallTabs from '../../components/usage/InstallTabs';
import SectionHeader from '../../components/usage/SectionHeader';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

const SvelteIcon = ({ size = 34 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 98.1 118" fill="none">
    <path
      d="M91.8 15.6C80.9-.1 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 15.7 32.6 20.3 48.2 10.4l27.5-17.5c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-9-.4-18.2-5.7-25.5"
      fill="#FF3E00"
    />
    <path
      d="M40.9 103.9c-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3.2-.9.4-1.7.6-2.6l.5-1.6 1.4 1c3.3 2.4 6.9 4.2 10.8 5.4l1 .3-.1 1c-.1 1.4.3 2.9 1.1 4.1 1.6 2.3 4.4 3.4 7.1 2.7.6-.2 1.2-.4 1.7-.8L65.4 72c1.4-.9 2.3-2.2 2.6-3.8.3-1.6-.1-3.3-1.1-4.6-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.8l-10.5 6.7c-1.7 1.1-3.6 1.9-5.6 2.4-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3.8-5.3 3.9-10 8.5-12.8l27.5-17.5c1.7-1.1 3.6-1.9 5.6-2.4 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.2.9-.4 1.7-.6 2.6l-.5 1.6-1.4-1c-3.3-2.4-6.9-4.2-10.8-5.4l-1-.3.1-1c.1-1.4-.3-2.9-1.1-4.1-1.6-2.3-4.4-3.4-7.1-2.7-.6.2-1.2.4-1.7.8L32.4 46.1c-1.4.9-2.3 2.2-2.6 3.8s.1 3.3 1.1 4.6c1.6 2.3 4.4 3.3 7.1 2.6.6-.2 1.2-.4 1.7-.8l10.5-6.7c1.7-1.1 3.6-1.9 5.6-2.4 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.8 5.3-3.9 10-8.5 12.8L47.3 101.6c-1.7 1.1-3.6 1.9-5.6 2.4l-.8-.1z"
      fill="#fff"
    />
  </svg>
);

export default function SvelteUsage({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="svelte-usage" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="svelte-usage"
        title="Svelte"
        level="h2"
        markdownContent={markdownContent}
        icon={<SvelteIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The official Svelte package for Reicon. Import beautifully crafted icons as Svelte components with full TypeScript support. All icons are tree-shakeable, ensuring only the icons you actually use end up in your bundle.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Import icons as individual Svelte components</li>
        <li>Customize size, color, and weight via props</li>
        <li>Tree-shake unused icons to keep bundle sizes minimal</li>
        <li>Full TypeScript support with autocompletion</li>
        <li>Use icons in SvelteKit, Vite, and more</li>
        <li>Apply CSS classes and inline styles directly</li>
      </ul>

      {/* Installation */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Installation</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Install the package using your preferred package manager.
      </p>

      <InstallTabs
        packageName="reicon-svelte"
        copiedField={copiedField}
        onCopy={onCopy}
      />

      {/* Basic Usage */}
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

      {/* Props */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Props</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Every icon component accepts the following props to customize its appearance.
      </p>

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

      {/* Direct Import */}
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

      {/* SvelteKit */}
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
    </section>
  );
}
