import SectionHeader from '@/components/docs/SectionHeader';
import Installation from './cdn/Installation';
import BasicUsage from './cdn/BasicUsage';
import AdvancedUsage from './cdn/AdvancedUsage';
import { IoLogoJavascript } from 'react-icons/io5';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function CdnDocs({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="cdn" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="cdn"
        title="CDN & JS"
        level="h2"
        markdownContent={markdownContent}
        icon={<IoLogoJavascript className="text-yellow-400" size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The official vanilla JavaScript package and CDN web components for Reicon. This package allows you to easily add precise, vector-based SVG icons to any JavaScript project or web application without framework dependencies.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Import individual icons as DOM element factories in vanilla JS</li>
        <li>Fetch SVG markup as strings directly (fully SSR/Node.js compatible)</li>
        <li>Register and render custom elements (<code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code>) inside HTML templates or SPAs</li>
        <li>Load all icons via CDN script tags without build steps or bundlers</li>
        <li>Tree-shake unused icons automatically when using modern bundlers</li>
      </ul>

      <Installation markdownContent={markdownContent} copiedField={copiedField} onCopy={onCopy} />
      <BasicUsage copiedField={copiedField} onCopy={onCopy} />
      <AdvancedUsage copiedField={copiedField} onCopy={onCopy} />
    </section>
  );
}
