import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function CompleteExample({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 id="compose-complete" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Full Composable Example
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        A grid of icons in both weights:
      </p>

      <SyntaxBlock
        title="Kotlin"
        onCopy={() => onCopy(
          "import dev.reicon.Heart\nimport dev.reicon.Home\nimport dev.reicon.ReiconIcon\n\n@Composable\nfun IconRow() {\n  Row {\n    ReiconIcon(Home.Outline, contentDescription = \"Home\")\n    Icon(Home.Filled, contentDescription = null)\n    ReiconIcon(Heart.Filled, contentDescription = \"Like\", tint = Color.Red)\n  }\n}",
          'compose-complete'
        )}
        copied={copiedField === 'compose-complete'}
      >
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> dev.reicon.Heart</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> dev.reicon.Home</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> dev.reicon.ReiconIcon</span>
        {'\n\n'}
        <span className="text-[#c678dd]">@Composable</span>
        {'\n'}
        <span className="text-[#c678dd]">fun</span> <span className="text-[#61afef]">IconRow</span><span className="text-text-base/70">() {'{'}</span>
        {'\n  '}
        <span className="text-[#61afef]">Row</span><span className="text-text-base/70"> {'{'}</span>
        {'\n    '}
        <span className="text-[#61afef]">ReiconIcon</span><span className="text-text-base/70">(</span><span className="text-[#e5c07b]">Home</span><span className="text-text-base/70">.</span><span className="text-[#e5c07b]">Outline</span><span className="text-text-base/30">,</span><span className="text-text-base/70"> contentDescription = </span><span className="text-[#98c379]">"Home"</span><span className="text-text-base/70">)</span>
        {'\n    '}
        <span className="text-[#61afef]">Icon</span><span className="text-text-base/70">(</span><span className="text-[#e5c07b]">Home</span><span className="text-text-base/70">.</span><span className="text-[#e5c07b]">Filled</span><span className="text-text-base/30">,</span><span className="text-text-base/70"> contentDescription = </span><span className="text-[#c678dd]">null</span><span className="text-text-base/70">)</span>
        {'\n    '}
        <span className="text-[#61afef]">ReiconIcon</span><span className="text-text-base/70">(</span><span className="text-[#e5c07b]">Heart</span><span className="text-text-base/70">.</span><span className="text-[#e5c07b]">Filled</span><span className="text-text-base/30">,</span><span className="text-text-base/70"> contentDescription = </span><span className="text-[#98c379]">"Like"</span><span className="text-text-base/30">,</span><span className="text-text-base/70"> tint = </span><span className="text-[#61afef]">Color</span><span className="text-text-base/70">.</span><span className="text-[#e5c07b]">Red</span><span className="text-text-base/70">)</span>
        {'\n  '}
        <span className="text-text-base/70">{'}'}</span>
        {'\n'}
        <span className="text-text-base/70">{'}'}</span>
      </SyntaxBlock>
    </>
  );
}
