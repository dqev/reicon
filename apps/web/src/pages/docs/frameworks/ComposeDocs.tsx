import SectionHeader from '@/components/docs/SectionHeader';
import { ComposeIcon } from '@/components/docs/framework/icons';
import Installation from './compose/Installation';
import BasicUsage from './compose/BasicUsage';
import TintWeight from './compose/TintWeight';
import CompleteExample from './compose/CompleteExample';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function ComposeDocs({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="compose-docs" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="compose-docs"
        title="Compose"
        level="h2"
        markdownContent={markdownContent}
        icon={<ComposeIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The official Jetpack Compose package for Reicon. Import 2700+ handcrafted icons as native ImageVectors in any Compose project — no SVG renderer needed.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Access all 2700+ icons in both Outline and Filled weights</li>
        <li>Render with Material Icon or the ReiconIcon wrapper</li>
        <li>Zero runtime dependencies beyond Compose UI</li>
        <li>Full autocompletion with one object per icon</li>
        <li>Tree-shake unused icons — R8 strips the rest</li>
      </ul>

      <Installation copiedField={copiedField} onCopy={onCopy} />
      <BasicUsage copiedField={copiedField} onCopy={onCopy} />
      <TintWeight copiedField={copiedField} onCopy={onCopy} />
      <CompleteExample copiedField={copiedField} onCopy={onCopy} />
    </section>
  );
}
