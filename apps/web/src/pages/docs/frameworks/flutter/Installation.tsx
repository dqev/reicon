import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Installation({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 id="flutter-installation" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Installation
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Add to your <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">pubspec.yaml</code>:
      </p>

      <SyntaxBlock
        title="pubspec.yaml"
        onCopy={() => onCopy("dependencies:\n  reicon_flutter: ^1.0.0", 'flutter-install')}
        copied={copiedField === 'flutter-install'}
      >
        <span className="text-[#e5c07b]">dependencies</span><span className="text-text-base/30">:</span>
        {'\n'}
        <span className="pl-4"><span className="text-[#e5c07b]">reicon_flutter</span><span className="text-text-base/30">: </span><span className="text-[#98c379]">^1.0.0</span></span>
      </SyntaxBlock>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mt-6 mb-4">
        Then run:
      </p>

      <SyntaxBlock
        title="Terminal"
        onCopy={() => onCopy('flutter pub get', 'flutter-get')}
        copied={copiedField === 'flutter-get'}
      >
        <span className="text-[#ffbd2e]">$</span> <span className="text-[#e06c75]">flutter</span> pub get
      </SyntaxBlock>
    </>
  );
}
