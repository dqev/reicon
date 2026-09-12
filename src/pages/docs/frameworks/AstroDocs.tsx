import SectionHeader from '../../../components/docs/SectionHeader';
import { AstroIcon } from '../../../components/docs/framework/icons';
import CodeBlock from '../../../components/docs/CodeBlock';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function AstroDocs({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="astro-docs" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="astro-docs"
        title="Astro"
        level="h2"
        markdownContent={markdownContent}
        icon={<AstroIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The official Astro package for Reicon. Import handcrafted icons as Astro components (<code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">.astro</code>) with full TypeScript support, tree-shaking, and zero dependencies. Works seamlessly in Astro SSG, SSR, and island architecture.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Import icons as individual <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">.astro</code> components</li>
        <li>Customize size, color, weight, and SVG attributes via props</li>
        <li>Tree-shake unused icons to keep build output minimal</li>
        <li>Full TypeScript support with autocompletion</li>
        <li>Works out-of-the-box in Astro 3, 4, and 5</li>
        <li>Apply CSS classes and inline styles directly</li>
      </ul>

      {/* Installation */}
      <div className="mb-8">
        <h3 className="text-lg font-serif text-text-base mb-3">Installation</h3>
        <CodeBlock
          code="npm install reicon-astro"
          language="bash"
          copied={copiedField === 'astro-install'}
          onCopy={() => onCopy('npm install reicon-astro', 'astro-install')}
        />
      </div>

      {/* Basic Usage */}
      <div className="mb-8">
        <h3 className="text-lg font-serif text-text-base mb-3">Basic Usage</h3>
        <p className="text-text-base/60 text-[14px] leading-relaxed mb-3">
          Import icons by their PascalCase name from <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-astro</code> in your component script frontmatter (<code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">---</code>).
        </p>
        <CodeBlock
          code={`---\nimport { Home, ShieldCheck, Bell } from 'reicon-astro';\n---\n\n<Home size={24} />\n<ShieldCheck size={24} color="#9B8AFB" />\n<Bell size={24} weight="Filled" />`}
          language="astro"
          copied={copiedField === 'astro-usage'}
          onCopy={() => onCopy(`---\nimport { Home, ShieldCheck, Bell } from 'reicon-astro';\n---\n\n<Home size={24} />\n<ShieldCheck size={24} color="#9B8AFB" />\n<Bell size={24} weight="Filled" />`, 'astro-usage')}
        />
      </div>

      {/* Direct Import */}
      <div className="mb-8">
        <h3 className="text-lg font-serif text-text-base mb-3">Direct Subpath Import</h3>
        <p className="text-text-base/60 text-[14px] leading-relaxed mb-3">
          For the absolute smallest bundle size, import icons directly from their subpath:
        </p>
        <CodeBlock
          code={`---\nimport Home from 'reicon-astro/icons/Home.astro';\nimport ShieldCheck from 'reicon-astro/icons/ShieldCheck.astro';\n---`}
          language="astro"
          copied={copiedField === 'astro-direct'}
          onCopy={() => onCopy(`---\nimport Home from 'reicon-astro/icons/Home.astro';\nimport ShieldCheck from 'reicon-astro/icons/ShieldCheck.astro';\n---`, 'astro-direct')}
        />
      </div>

      {/* Tailwind CSS */}
      <div className="mb-8">
        <h3 className="text-lg font-serif text-text-base mb-3">Using with Tailwind CSS</h3>
        <CodeBlock
          code={`---\nimport { Home, ShieldCheck } from 'reicon-astro';\n---\n\n<Home class="text-gray-500 hover:text-gray-700 transition-colors" />\n\n<button class="flex items-center gap-2 text-white bg-indigo-600 px-4 py-2 rounded-lg">\n  <ShieldCheck size={20} class="text-green-400" />\n  <span>Verified</span>\n</button>`}
          language="astro"
          copied={copiedField === 'astro-tailwind'}
          onCopy={() => onCopy(`---\nimport { Home, ShieldCheck } from 'reicon-astro';\n---\n\n<Home class="text-gray-500 hover:text-gray-700 transition-colors" />\n\n<button class="flex items-center gap-2 text-white bg-indigo-600 px-4 py-2 rounded-lg">\n  <ShieldCheck size={20} class="text-green-400" />\n  <span>Verified</span>\n</button>`, 'astro-tailwind')}
        />
      </div>
    </section>
  );
}
