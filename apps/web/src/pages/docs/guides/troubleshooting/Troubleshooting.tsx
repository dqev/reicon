import SectionHeader from '@/components/docs/SectionHeader';
import { troubleshootingItems } from './data';
import TroubleshootingItem from './TroubleshootingItem';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Troubleshooting({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="troubleshooting" data-section className="mb-16 scroll-mt-24">
      <SectionHeader id="troubleshooting" title="Troubleshooting" level="h2" markdownContent={markdownContent} />
      <p className="text-text-base/50 text-[14px] mb-6 leading-relaxed">
        Common issues and their solutions. If you don't find your answer here, open an issue on{' '}
        <a
          href="https://github.com/dqev/reicon/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#9B8AFB] hover:underline"
        >
          GitHub
        </a>.
      </p>

      {troubleshootingItems.map((item) => (
        <TroubleshootingItem
          key={item.copyField}
          item={item}
          copiedField={copiedField}
          onCopy={onCopy}
        />
      ))}
    </section>
  );
}
