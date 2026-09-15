import SectionHeader from '@/components/docs/SectionHeader';
import Installation from './vue/Installation';
import BasicUsage from './vue/BasicUsage';
import ComponentApi from './vue/ComponentApi';
import Theming from './vue/Theming';

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

export default function VueDocs({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="vue-docs" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="vue-docs"
        title="Vue"
        level="h2"
        markdownContent={markdownContent}
        icon={<VueIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The official Vue 3 package for Reicon. Import beautifully crafted icons as Vue components with full TypeScript support. All icons are tree-shakeable, ensuring only the icons you actually use end up in your bundle.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Import icons as individual Vue components</li>
        <li>Customize size, color, and weight via props</li>
        <li>Tree-shake unused icons to keep bundle sizes minimal</li>
        <li>Full TypeScript support with autocompletion</li>
        <li>Use icons in Nuxt 3, Vite, and more</li>
        <li>Apply CSS classes and inline styles directly</li>
      </ul>

      <Installation copiedField={copiedField} onCopy={onCopy} />
      <BasicUsage copiedField={copiedField} onCopy={onCopy} />
      <ComponentApi copiedField={copiedField} onCopy={onCopy} />
      <Theming copiedField={copiedField} onCopy={onCopy} />
    </section>
  );
}
