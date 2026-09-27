import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function BasicUsage({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 id="compose-usage" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Basic Usage
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Import the library and access icons by weight:
      </p>

      <SyntaxBlock
        title="Kotlin"
        onCopy={() => onCopy(
          "import dev.reicon.Home\nimport dev.reicon.ReiconIcon\n\n// Outline icons\nReiconIcon(Home.Outline, contentDescription = \"Home\")\n\n// Filled icons\nIcon(Home.Filled, contentDescription = null)",
          'compose-basic'
        )}
        copied={copiedField === 'compose-basic'}
      >
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> dev.reicon.Home</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> dev.reicon.ReiconIcon</span>
        {'\n\n'}
        <span className="text-text-base/30">// Outline icons</span>
        {'\n'}
        <span className="text-[#61afef]">ReiconIcon</span><span className="text-text-base/70">(</span><span className="text-[#e5c07b]">Home</span><span className="text-text-base/70">.</span><span className="text-[#e5c07b]">Outline</span><span className="text-text-base/30">,</span><span className="text-text-base/70"> contentDescription = </span><span className="text-[#98c379]">"Home"</span><span className="text-text-base/70">)</span>
        {'\n\n'}
        <span className="text-text-base/30">// Filled icons</span>
        {'\n'}
        <span className="text-[#61afef]">Icon</span><span className="text-text-base/70">(</span><span className="text-[#e5c07b]">Home</span><span className="text-text-base/70">.</span><span className="text-[#e5c07b]">Filled</span><span className="text-text-base/30">,</span><span className="text-text-base/70"> contentDescription = </span><span className="text-[#c678dd]">null</span><span className="text-text-base/70">)</span>
      </SyntaxBlock>
    </>
  );
}
