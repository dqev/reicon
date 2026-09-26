import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Installation({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 id="compose-installation" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Installation
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Add the Maven repository and dependency:
      </p>

      <SyntaxBlock
        title="settings.gradle.kts"
        onCopy={() => onCopy('maven { url = uri("https://jitpack.io") }', 'compose-install')}
        copied={copiedField === 'compose-install'}
      >
        <span className="text-[#c678dd]">maven</span><span className="text-text-base/70"> {'{ '}url = uri(</span><span className="text-[#98c379]">"https://jitpack.io"</span><span className="text-text-base/70">){' }'}</span>
      </SyntaxBlock>

      <SyntaxBlock
        title="app/build.gradle.kts"
        onCopy={() => onCopy('implementation("dev.reicon:reicon-compose:1.0.0")', 'compose-dep')}
        copied={copiedField === 'compose-dep'}
      >
        <span className="text-[#61afef]">implementation</span><span className="text-text-base/70">(</span><span className="text-[#98c379]">"dev.reicon:reicon-compose:1.0.0"</span><span className="text-text-base/70">)</span>
      </SyntaxBlock>
    </>
  );
}
