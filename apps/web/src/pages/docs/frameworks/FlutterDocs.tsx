import SectionHeader from '@/components/docs/SectionHeader';
import { FlutterIcon } from '@/components/docs/framework/icons';
import Installation from './flutter/Installation';
import BasicUsage from './flutter/BasicUsage';
import FlutterSvg from './flutter/FlutterSvg';
import RuntimeLookup from './flutter/RuntimeLookup';
import CompleteExample from './flutter/CompleteExample';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function FlutterDocs({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="flutter-docs" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="flutter-docs"
        title="Flutter"
        level="h2"
        markdownContent={markdownContent}
        icon={<FlutterIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The official Flutter &amp; Dart package for Reicon. Import 2700+ handcrafted SVG icons as raw path strings and render them with your preferred SVG library in any Dart or Flutter project.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Access all 2700+ icons in both Outline and Filled weights</li>
        <li>Use raw SVG path data with any SVG renderer</li>
        <li>Zero dependencies — pure Dart, works on all platforms</li>
        <li>Full autocompletion with all icon names as getters</li>
        <li>Look up icons by name at runtime</li>
      </ul>

      <Installation copiedField={copiedField} onCopy={onCopy} />
      <BasicUsage copiedField={copiedField} onCopy={onCopy} />
      <FlutterSvg copiedField={copiedField} onCopy={onCopy} />
      <RuntimeLookup copiedField={copiedField} onCopy={onCopy} />
      <CompleteExample copiedField={copiedField} onCopy={onCopy} />
    </section>
  );
}
