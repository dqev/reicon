import SyntaxBlock from '@/components/docs/SyntaxBlock';
import { FaReact } from 'react-icons/fa';
import SectionHeader from '@/components/docs/SectionHeader';
import Installation from './react/Installation';
import BasicUsage from './react/BasicUsage';
import ComponentApi from './react/ComponentApi';
import Theming from './react/Theming';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function ReactDocs({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="react-docs" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="react-docs"
        title="React"
        level="h2"
        markdownContent={markdownContent}
        icon={<FaReact className="text-[#61DAFB]" size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The official React package for Reicon. Import beautifully crafted icons as React components with full TypeScript support. All icons are tree-shakeable, ensuring only the icons you actually use end up in your bundle.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Import icons as individual React components</li>
        <li>Customize size, color, and weight via props</li>
        <li>Tree-shake unused icons to keep bundle sizes minimal</li>
        <li>Full TypeScript support with autocompletion</li>
        <li>Use icons in Next.js, Vite, Create React App, and more</li>
        <li>Apply CSS classes and inline styles directly</li>
      </ul>

      <Installation copiedField={copiedField} onCopy={onCopy} />

      <BasicUsage copiedField={copiedField} onCopy={onCopy} />

      <ComponentApi copiedField={copiedField} onCopy={onCopy} />

      {/* Direct Import for Smaller Bundles */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Direct Import for Smaller Bundles</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        For the absolute smallest bundle size, you can import each icon directly from its own module. This guarantees only that single icon's code is included, which is ideal for production apps.
      </p>

      <SyntaxBlock
        title="Direct Import"
        onCopy={() => onCopy("import Home from 'reicon-react/icons/Home';\nimport ShieldCheck from 'reicon-react/icons/ShieldCheck';", 'react-direct')}
        copied={copiedField === 'react-direct'}
      >
        <span className="text-[#c678dd]">import</span><span className="text-[#e5c07b]"> Home</span><span className="text-[#c678dd]"> from</span><span className="text-[#98c379]"> 'reicon-react/icons/Home'</span><span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span><span className="text-[#e5c07b]"> ShieldCheck</span><span className="text-[#c678dd]"> from</span><span className="text-[#98c379]"> 'reicon-react/icons/ShieldCheck'</span><span className="text-text-base/30">;</span>
      </SyntaxBlock>

      <div className="mt-4 bg-[#9B8AFB]/5 border border-[#9B8AFB]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
        <span className="text-[#9B8AFB] font-medium">Tip:</span> Direct imports are recommended for production apps where bundle size matters. Each icon is its own module, so the bundler can't accidentally pull in other icons.
      </div>

      <Theming copiedField={copiedField} onCopy={onCopy} />

      {/* Full Component Example */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Full Component Example</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Here's a complete example of a React component using multiple Reicon icons with different configurations.
      </p>

      <SyntaxBlock
        title="Complete Example"
        onCopy={() => onCopy("import { Home, Bell, User, Star, ShieldCheck } from 'reicon-react';\n\nexport default function Navbar() {\n  return (\n    <nav className=\"flex items-center gap-4 p-4\">\n      <Home size={20} />\n      <Bell size={20} />\n      <User size={20} />\n      <Star size={20} weight=\"Filled\" color=\"#f59e0b\" />\n      <ShieldCheck size={20} color=\"#9B8AFB\" />\n    </nav>\n  );\n}", 'react-full')}
        copied={copiedField === 'react-full'}
      >
        <span className="text-[#c678dd]">import</span>
        <span className="text-text-base/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span><span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">Bell</span><span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">User</span><span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">Star</span><span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">ShieldCheck</span>
        <span className="text-text-base/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-react'</span><span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-[#c678dd]">export default function</span><span className="text-[#61afef]"> Navbar</span><span className="text-text-base/70">() {'{'}</span>
        {'\n  '}
        <span className="text-[#c678dd]">return</span><span className="text-text-base/70"> (</span>
        {'\n    '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">nav</span><span className="text-[#d19a66]"> className</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"flex items-center gap-4 p-4"</span><span className="text-text-base/70">{'>'}</span>
        {'\n      '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}20{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n      '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Bell</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}20{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n      '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">User</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}20{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n      '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}20{'}'}</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#f59e0b"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n      '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">ShieldCheck</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}20{'}'}</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#9B8AFB"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n    '}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">nav</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">);</span>
        {'\n'}
        <span className="text-text-base/70">{'}'}</span>
      </SyntaxBlock>

      <div className="mt-6 bg-[#61DAFB]/5 border border-[#61DAFB]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
        <span className="text-[#61DAFB] font-medium">Note:</span> All icon components are SSR-compatible and work with Next.js, Remix, and other React frameworks out of the box.
      </div>
    </section>
  );
}
