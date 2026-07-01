import SyntaxBlock from '../../components/usage/SyntaxBlock';
import SectionHeader from '../../components/usage/SectionHeader';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function TypeScriptSection({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="typescript" data-section className="mb-16 scroll-mt-24">
      <SectionHeader id="typescript" title="TypeScript" level="h2" markdownContent={markdownContent} />
      <p className="text-text-base/50 text-[14px] mb-6 leading-relaxed">
        Reicon ships with full TypeScript support out of the box. All icon components are typed with the following interface:
      </p>

      <SyntaxBlock
        title="Type Definition"
        onCopy={() => onCopy("interface ReIconProps {\n  size?: number;\n  color?: string;\n  weight?: 'Outline' | 'Filled';\n  className?: string;\n}", 'ts')}
        copied={copiedField === 'ts'}
      >
        <span className="text-[#c678dd]">interface</span>
        <span className="text-[#e5c07b]"> ReIconProps</span>
        <span className="text-text-base/70"> {'{'}</span>
        {'\n  '}
        <span className="text-[#e06c75]">size</span>
        <span className="text-text-base/50">?:</span>
        <span className="text-[#e5c07b]"> number</span>
        <span className="text-text-base/30">;</span>
        {'\n  '}
        <span className="text-[#e06c75]">color</span>
        <span className="text-text-base/50">?:</span>
        <span className="text-[#e5c07b]"> string</span>
        <span className="text-text-base/30">;</span>
        {'\n  '}
        <span className="text-[#e06c75]">weight</span>
        <span className="text-text-base/50">?:</span>
        <span className="text-[#98c379]"> 'Outline'</span>
        <span className="text-text-base/50"> | </span>
        <span className="text-[#98c379]">'Filled'</span>
        <span className="text-text-base/30">;</span>
        {'\n  '}
        <span className="text-[#e06c75]">className</span>
        <span className="text-text-base/50">?:</span>
        <span className="text-[#e5c07b]"> string</span>
        <span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-text-base/70">{'}'}</span>
      </SyntaxBlock>
    </section>
  );
}
