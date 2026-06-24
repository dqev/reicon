import SyntaxBlock from '../../components/usage/SyntaxBlock';
import SectionHeader from '../../components/usage/SectionHeader';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Weights({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="weights" data-section className="mb-16 scroll-mt-24">
      <SectionHeader id="weights" title="Icon Weights" level="h2" markdownContent={markdownContent} />
      <p className="text-white/50 text-[14px] mb-6 leading-relaxed">
        Every icon comes in two weights — Outline and Filled.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center">
          <div className="flex justify-center mb-4">
            <re-icon icon="home" size={48} color="white" />
          </div>
          <span className="text-white/70 text-sm font-medium">Outline</span>
          <p className="text-white/30 text-[12px] mt-1">Default weight</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center">
          <div className="flex justify-center mb-4">
            <re-icon icon="home" size={48} weight="filled" color="white" />
          </div>
          <span className="text-white/70 text-sm font-medium">Filled</span>
          <p className="text-white/30 text-[12px] mt-1">weight="Filled"</p>
        </div>
      </div>

      <div className="mt-6">
        <SyntaxBlock
          title="Using Weights"
          onCopy={() => onCopy('<Home />\n<Home weight="Filled" />', 'weights')}
          copied={copiedField === 'weights'}
        >
          <span className="text-white/30">{'// Outline (default)'}</span>
          {'\n'}
          <span className="text-white/70">{'<'}</span>
          <span className="text-[#e06c75]">Home</span>
          <span className="text-white/70"> /{'>'}</span>
          {'\n\n'}
          <span className="text-white/30">{'// Filled'}</span>
          {'\n'}
          <span className="text-white/70">{'<'}</span>
          <span className="text-[#e06c75]">Home</span>
          <span className="text-[#d19a66]"> weight</span>
          <span className="text-white/50">=</span>
          <span className="text-[#98c379]">"Filled"</span>
          <span className="text-white/70"> /{'>'}</span>
        </SyntaxBlock>
      </div>
    </section>
  );
}
