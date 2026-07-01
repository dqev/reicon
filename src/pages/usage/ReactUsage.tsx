import SyntaxBlock from '../../components/usage/SyntaxBlock';
import InstallTabs from '../../components/usage/InstallTabs';
import { FaReact } from 'react-icons/fa';
import SectionHeader from '../../components/usage/SectionHeader';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function ReactUsage({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="react-usage" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="react-usage"
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

      {/* Installation */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Installation</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Install the package using your preferred package manager.
      </p>

      <InstallTabs
        packageName="reicon-react"
        copiedField={copiedField}
        onCopy={onCopy}
      />

      {/* Basic Usage */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Basic Usage</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Import icons by their PascalCase name from <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-react</code>. Each icon is a React component that accepts standard props.
      </p>

      <SyntaxBlock
        title="JSX"
        onCopy={() => onCopy("import { Home, ShieldCheck, Bell } from 'reicon-react';\n\nfunction App() {\n  return (\n    <div>\n      <Home size={24} />\n      <ShieldCheck size={24} color=\"#6C5CE7\" />\n      <Bell size={24} weight=\"Filled\" />\n    </div>\n  );\n}", 'react-basic')}
        copied={copiedField === 'react-basic'}
      >
        <span className="text-[#c678dd]">import</span>
        <span className="text-text-base/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">ShieldCheck</span>
        <span className="text-text-base/70">, </span>
        <span className="text-[#e5c07b]">Bell</span>
        <span className="text-text-base/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon-react'</span>
        <span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-[#c678dd]">function</span>
        <span className="text-[#61afef]"> App</span>
        <span className="text-text-base/70">() {'{'}</span>
        {'\n  '}
        <span className="text-[#c678dd]">return</span>
        <span className="text-text-base/70"> (</span>
        {'\n    '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">div</span><span className="text-text-base/70">{'>'}</span>
        {'\n      '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n      '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">ShieldCheck</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#6C5CE7"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n      '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Bell</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n    '}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">div</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">);</span>
        {'\n'}
        <span className="text-text-base/70">{'}'}</span>
      </SyntaxBlock>

      {/* Customizing Icons */}
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

      <div className="mt-4 bg-[#6C5CE7]/5 border border-[#6C5CE7]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
        <span className="text-[#6C5CE7] font-medium">Tip:</span> Direct imports are recommended for production apps where bundle size matters. Each icon is its own module, so the bundler can't accidentally pull in other icons.
      </div>

      {/* Using with Tailwind CSS */}
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

      {/* Full Component Example */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Full Component Example</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Here's a complete example of a React component using multiple Reicon icons with different configurations.
      </p>

      <SyntaxBlock
        title="Complete Example"
        onCopy={() => onCopy("import { Home, Bell, User, Star, ShieldCheck } from 'reicon-react';\n\nexport default function Navbar() {\n  return (\n    <nav className=\"flex items-center gap-4 p-4\">\n      <Home size={20} />\n      <Bell size={20} />\n      <User size={20} />\n      <Star size={20} weight=\"Filled\" color=\"#f59e0b\" />\n      <ShieldCheck size={20} color=\"#6C5CE7\" />\n    </nav>\n  );\n}", 'react-full')}
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
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">ShieldCheck</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}20{'}'}</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#6C5CE7"</span><span className="text-text-base/70"> /{'>'}</span>
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
