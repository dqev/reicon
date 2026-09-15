import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function FlutterSvg({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 id="flutter-svg" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Flutter + flutter_svg
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Use with the <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">flutter_svg</code> package to render icons as widgets:
      </p>

      <SyntaxBlock
        title="Dart"
        onCopy={() => onCopy(
          "import 'package:flutter_svg/flutter_svg.dart';\n\nSvgPicture.string(\n  reiconSvg(Reicon.outline.heart, size: 24),\n  colorFilter: ColorFilter.mode(\n    Colors.red,\n    BlendMode.srcIn,\n  ),\n);",
          'flutter-svg'
        )}
        copied={copiedField === 'flutter-svg'}
      >
        <span className="text-[#c678dd]">import</span> <span className="text-[#98c379]">'package:flutter_svg/flutter_svg.dart'</span><span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-[#61afef]">SvgPicture</span><span className="text-text-base/30">.</span><span className="text-[#61afef]">string</span><span className="text-text-base/70">(</span>
        {'\n  '}
        <span className="text-[#61afef]">reiconSvg</span><span className="text-text-base/70">(</span><span className="text-[#61afef]">Reicon</span><span className="text-text-base/30">.outline</span><span className="text-text-base/70">.heart</span><span className="text-text-base/30">,</span>
        {'\n    '}
        <span className="text-[#d19a66]">size</span><span className="text-text-base/30">: </span><span className="text-[#d19a66]">24</span><span className="text-text-base/30">,</span>
        {'\n  '}
        <span className="text-text-base/70">)</span><span className="text-text-base/30">,</span>
        {'\n  '}
        <span className="text-[#d19a66]">colorFilter</span><span className="text-text-base/30">: </span><span className="text-[#61afef]">ColorFilter</span><span className="text-text-base/30">.</span><span className="text-[#61afef]">mode</span><span className="text-text-base/70">(</span>
        {'\n    '}
        <span className="text-[#61afef]">Colors</span><span className="text-text-base/30">.</span><span className="text-[#e5c07b]">red</span><span className="text-text-base/30">,</span>
        {'\n    '}
        <span className="text-[#61afef]">BlendMode</span><span className="text-text-base/30">.</span><span className="text-[#e5c07b]">srcIn</span><span className="text-text-base/30">,</span>
        {'\n  '}
        <span className="text-text-base/70">)</span><span className="text-text-base/30">,</span>
        {'\n'}
        <span className="text-text-base/70">)</span><span className="text-text-base/30">;</span>
      </SyntaxBlock>

      <div className="mt-4 bg-[#47C5FB]/5 border border-[#47C5FB]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
        <span className="text-[#47C5FB] font-medium">Note:</span> The <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">flutter_svg</code> package is the most common way to render SVGs in Flutter, but you can also pass the raw SVG string to any widget that accepts HTML or custom painting.
      </div>
    </>
  );
}
