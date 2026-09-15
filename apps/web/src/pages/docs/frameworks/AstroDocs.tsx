import SectionHeader from '@/components/docs/SectionHeader';
import { AstroIcon } from '@/components/docs/framework/icons';
import Installation from './astro/Installation';
import BasicUsage from './astro/BasicUsage';
import ComponentApi from './astro/ComponentApi';
import Theming from './astro/Theming';

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

      <Installation copiedField={copiedField} onCopy={onCopy} />
      <BasicUsage copiedField={copiedField} onCopy={onCopy} />
      <ComponentApi copiedField={copiedField} onCopy={onCopy} />
      <Theming copiedField={copiedField} onCopy={onCopy} />
    </section>
  );
}
