import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function RuntimeLookup({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 id="flutter-runtime" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Runtime Lookup
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Dynamically look up icons by name:
      </p>

      <SyntaxBlock
        title="Dart"
        onCopy={() => onCopy(
          "String? icon = Reicon.outline['home'];\n\nfor (final name in Reicon.outline.names) {\n  print('$name: ${Reicon.outline[name]}');\n}",
          'flutter-runtime'
        )}
        copied={copiedField === 'flutter-runtime'}
      >
        <span className="text-text-base/30">// Look up an icon at runtime</span>
        {'\n'}
        <span className="text-[#c678dd]">String</span><span className="text-text-base/30">?</span> icon = <span className="text-[#61afef]">Reicon</span><span className="text-text-base/30">.outline[</span><span className="text-[#98c379]">'home'</span><span className="text-text-base/30">];</span>
        {'\n\n'}
        <span className="text-text-base/30">// Iterate all icon names</span>
        {'\n'}
        <span className="text-[#c678dd]">for</span> (<span className="text-[#c678dd]">final</span> name <span className="text-[#c678dd]">in</span> <span className="text-[#61afef]">Reicon</span><span className="text-text-base/30">.outline.names</span>)
        {'\n  '}
        <span className="text-[#61afef]">print</span>(<span className="text-[#98c379]">'</span><span className="text-[#e5c07b]">{'$'}name</span><span className="text-[#98c379]">: </span><span className="text-[#e5c07b]">{'${'}</span><span className="text-[#61afef]">Reicon</span><span className="text-text-base/30">.outline[name]</span><span className="text-[#e5c07b]">{'}'}</span><span className="text-[#98c379]">'</span>);
      </SyntaxBlock>
    </>
  );
}
