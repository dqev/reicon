import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function TintWeight({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 id="compose-tint" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Tint &amp; Weight
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Every vector uses <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">currentColor</code> fills, so tint and size apply directly:
      </p>

      <SyntaxBlock
        title="Kotlin"
        onCopy={() => onCopy(
          "ReiconIcon(\n  Home.Outline,\n  contentDescription = \"Home\",\n  size = 32.dp,\n  tint = Color(0xFF9B8AFB)\n)",
          'compose-tint'
        )}
        copied={copiedField === 'compose-tint'}
      >
        <span className="text-[#61afef]">ReiconIcon</span><span className="text-text-base/70">(</span>
        {'\n  '}
        <span className="text-[#e5c07b]">Home</span><span className="text-text-base/70">.</span><span className="text-[#e5c07b]">Outline</span><span className="text-text-base/30">,</span>
        {'\n  '}
        <span className="text-text-base/70">contentDescription = </span><span className="text-[#98c379]">"Home"</span><span className="text-text-base/30">,</span>
        {'\n  '}
        <span className="text-text-base/70">size = </span><span className="text-[#d19a66]">32.dp</span><span className="text-text-base/30">,</span>
        {'\n  '}
        <span className="text-text-base/70">tint = </span><span className="text-[#61afef]">Color</span><span className="text-text-base/70">(</span><span className="text-[#d19a66]">0xFF9B8AFB</span><span className="text-text-base/70">)</span>
        {'\n'}
        <span className="text-text-base/70">)</span>
      </SyntaxBlock>
    </>
  );
}
