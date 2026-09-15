import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function BasicUsage({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 id="flutter-usage" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Basic Usage
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Import the library and access icons by weight:
      </p>

      <SyntaxBlock
        title="Dart"
        onCopy={() => onCopy(
          "import 'package:reicon_flutter/reicon_flutter.dart';\n\n// Outline icons\nfinal homePath = Reicon.outline.home;\nfinal settingsPath = Reicon.outline.settings;\n\n// Filled icons\nfinal heartFilled = Reicon.filled.heart;\n\n// Build a complete SVG string\nfinal svg = reiconSvg(\n  Reicon.outline.star,\n  size: 32,\n  color: '#d97757',\n);",
          'flutter-basic'
        )}
        copied={copiedField === 'flutter-basic'}
      >
        <span className="text-[#c678dd]">import</span> <span className="text-[#98c379]">'package:reicon_flutter/reicon_flutter.dart'</span><span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-text-base/30">// Outline icons</span>
        {'\n'}
        <span className="text-[#c678dd]">final</span> homePath = <span className="text-[#61afef]">Reicon</span><span className="text-text-base/30">.outline</span><span className="text-text-base/70">.home</span><span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-[#c678dd]">final</span> settingsPath = <span className="text-[#61afef]">Reicon</span><span className="text-text-base/30">.outline</span><span className="text-text-base/70">.settings</span><span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-text-base/30">// Filled icons</span>
        {'\n'}
        <span className="text-[#c678dd]">final</span> heartFilled = <span className="text-[#61afef]">Reicon</span><span className="text-text-base/30">.filled</span><span className="text-text-base/70">.heart</span><span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-text-base/30">// Build a complete SVG string</span>
        {'\n'}
        <span className="text-[#c678dd]">final</span> svg = <span className="text-[#61afef]">reiconSvg</span><span className="text-text-base/70">(</span>
        {'\n  '}
        <span className="text-[#61afef]">Reicon</span><span className="text-text-base/30">.outline</span><span className="text-text-base/70">.star</span><span className="text-text-base/30">,</span>
        {'\n  '}
        <span className="text-[#d19a66]">size</span><span className="text-text-base/30">: </span><span className="text-[#d19a66]">32</span><span className="text-text-base/30">,</span>
        {'\n  '}
        <span className="text-[#d19a66]">color</span><span className="text-text-base/30">: </span><span className="text-[#98c379]">'#d97757'</span><span className="text-text-base/30">,</span>
        {'\n'}
        <span className="text-text-base/70">)</span><span className="text-text-base/30">;</span>
      </SyntaxBlock>
    </>
  );
}
