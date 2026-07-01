import SyntaxBlock from '../../components/usage/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function DirectImport({ copiedField, onCopy }: Props) {
  return (
    <section id="direct-import" data-section className="mb-16 scroll-mt-24">
      <h2 className="text-xl font-serif text-text-base mb-4">Direct Import</h2>
      <p className="text-text-base/50 text-[14px] mb-6 leading-relaxed">
        For the smallest possible bundle, import icons directly. This ensures only the icons you use are included.
      </p>

      <SyntaxBlock
        title="Direct Import"
        onCopy={() => onCopy("import Home from 'reicon-react/icons/Home';", 'direct')}
        copied={copiedField === 'direct'}
      >
        <span className="text-[#c678dd]">import</span>
        <span className="text-[#e5c07b]"> Home</span>
        <span className="text-[#c678dd]"> from</span>
        <span className="text-[#98c379]"> 'reicon-react/icons/Home'</span>
        <span className="text-text-base/30">;</span>
      </SyntaxBlock>

      <div className="mt-4 bg-[#6C5CE7]/5 border border-[#6C5CE7]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
        <span className="text-[#6C5CE7] font-medium">Tip:</span> Direct imports are recommended for production apps where bundle size matters. Each icon is its own module.
      </div>
    </section>
  );
}
