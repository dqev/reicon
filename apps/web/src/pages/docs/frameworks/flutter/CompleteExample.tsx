import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function CompleteExample({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 id="flutter-complete" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Full Widget Example
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Here's a complete Flutter widget using multiple Reicon icons with different configurations.
      </p>

      <SyntaxBlock
        title="Dart"
        onCopy={() => onCopy(
          "import 'package:flutter/material.dart';\nimport 'package:flutter_svg/flutter_svg.dart';\nimport 'package:reicon_flutter/reicon_flutter.dart';\n\nclass IconGrid extends StatelessWidget {\n  const IconGrid({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: const Text('Reicon Icons')),\n      body: Padding(\n        padding: const EdgeInsets.all(16),\n        child: Wrap(\n          spacing: 16,\n          runSpacing: 16,\n          children: [\n            SvgPicture.string(reiconSvg(Reicon.outline.home, size: 32)),\n            SvgPicture.string(\n              reiconSvg(Reicon.filled.heart, size: 32),\n              colorFilter: const ColorFilter.mode(Colors.red, BlendMode.srcIn),\n            ),\n            SvgPicture.string(\n              reiconSvg(Reicon.outline.star, size: 32),\n              colorFilter: const ColorFilter.mode(Colors.amber, BlendMode.srcIn),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}",
          'flutter-complete'
        )}
        copied={copiedField === 'flutter-complete'}
      >
        <span className="text-[#c678dd]">import</span> <span className="text-[#98c379]">'package:flutter/material.dart'</span><span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span> <span className="text-[#98c379]">'package:flutter_svg/flutter_svg.dart'</span><span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span> <span className="text-[#98c379]">'package:reicon_flutter/reicon_flutter.dart'</span><span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-[#c678dd]">class</span> <span className="text-[#61afef]">IconGrid</span> <span className="text-[#c678dd]">extends</span> <span className="text-[#61afef]">StatelessWidget</span> <span className="text-text-base/70">{'{'}</span>
        {'\n  '}
        <span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">IconGrid</span><span className="text-text-base/70">{'('}{'{'}</span><span className="text-[#c678dd]">super</span><span className="text-text-base/30">.</span>key<span className="text-text-base/70">{'}'}{')'};</span>
        {'\n\n  @override\n  '}
        <span className="text-[#61afef]">Widget</span> build<span className="text-text-base/70">{'('}</span><span className="text-[#61afef]">BuildContext</span> context<span className="text-text-base/70">{')'}{' {'}</span>
        {'\n    '}
        <span className="text-[#c678dd]">return</span> <span className="text-[#61afef]">Scaffold</span><span className="text-text-base/70">{'('}</span>
        {'\n      '}
        appBar: <span className="text-[#61afef]">AppBar</span><span className="text-text-base/70">{'('}</span>title: <span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">Text</span><span className="text-text-base/70">{'('}</span><span className="text-[#98c379]">'Reicon Icons'</span><span className="text-text-base/70">{')'}{')'},</span>
        {'\n      '}
        body: <span className="text-[#61afef]">Padding</span><span className="text-text-base/70">{'('}</span>
        {'\n        '}
        padding: <span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">EdgeInsets</span><span className="text-text-base/30">.</span>all<span className="text-text-base/70">{'('}</span><span className="text-[#d19a66]">16</span><span className="text-text-base/70">{')'},</span>
        {'\n        '}
        child: <span className="text-[#61afef]">Wrap</span><span className="text-text-base/70">{'('}</span>
        {'\n          '}
        spacing: <span className="text-[#d19a66]">16</span><span className="text-text-base/30">,</span>
        {'\n          '}
        runSpacing: <span className="text-[#d19a66]">16</span><span className="text-text-base/30">,</span>
        {'\n          '}
        children: <span className="text-text-base/70">{'['}</span>
        {'\n            '}
        <span className="text-[#61afef]">SvgPicture</span><span className="text-text-base/30">.</span><span className="text-[#61afef]">string</span><span className="text-text-base/70">{'('}</span><span className="text-[#61afef]">reiconSvg</span><span className="text-text-base/70">{'('}</span><span className="text-[#61afef]">Reicon</span><span className="text-text-base/30">.outline</span><span className="text-text-base/70">.home</span><span className="text-text-base/30">,</span> size: <span className="text-[#d19a66]">32</span><span className="text-text-base/70">{')'}{')'},</span>
        {'\n            '}
        <span className="text-[#61afef]">SvgPicture</span><span className="text-text-base/30">.</span><span className="text-[#61afef]">string</span><span className="text-text-base/70">{'('}</span>
        {'\n              '}
        <span className="text-[#61afef]">reiconSvg</span><span className="text-text-base/70">{'('}</span><span className="text-[#61afef]">Reicon</span><span className="text-text-base/30">.filled</span><span className="text-text-base/70">.heart</span><span className="text-text-base/30">,</span> size: <span className="text-[#d19a66]">32</span><span className="text-text-base/70">{')'},</span>
        {'\n              '}
        colorFilter: <span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">ColorFilter</span><span className="text-text-base/30">.</span><span className="text-[#61afef]">mode</span><span className="text-text-base/70">{'('}</span><span className="text-[#61afef]">Colors</span><span className="text-text-base/30">.</span>red<span className="text-text-base/30">,</span> <span className="text-[#61afef]">BlendMode</span><span className="text-text-base/30">.</span>srcIn<span className="text-text-base/70">{')'},</span>
        {'\n            '}
        <span className="text-text-base/70">{')'},</span>
        {'\n            '}
        <span className="text-[#61afef]">SvgPicture</span><span className="text-text-base/30">.</span><span className="text-[#61afef]">string</span><span className="text-text-base/70">{'('}</span>
        {'\n              '}
        <span className="text-[#61afef]">reiconSvg</span><span className="text-text-base/70">{'('}</span><span className="text-[#61afef]">Reicon</span><span className="text-text-base/30">.outline</span><span className="text-text-base/70">.star</span><span className="text-text-base/30">,</span> size: <span className="text-[#d19a66]">32</span><span className="text-text-base/70">{')'},</span>
        {'\n              '}
        colorFilter: <span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">ColorFilter</span><span className="text-text-base/30">.</span><span className="text-[#61afef]">mode</span><span className="text-text-base/70">{'('}</span><span className="text-[#61afef]">Colors</span><span className="text-text-base/30">.</span>amber<span className="text-text-base/30">,</span> <span className="text-[#61afef]">BlendMode</span><span className="text-text-base/30">.</span>srcIn<span className="text-text-base/70">{')'},</span>
        {'\n            '}
        <span className="text-text-base/70">{')'},</span>
        {'\n          '}
        <span className="text-text-base/70">{']'},</span>
        {'\n        '}
        <span className="text-text-base/70">{')'},</span>
        {'\n      '}
        <span className="text-text-base/70">{')'},</span>
        {'\n    '}
        <span className="text-text-base/70">{')'};</span>
        {'\n  '}
        <span className="text-text-base/70">{'}'}</span>
        {'\n'}
        <span className="text-text-base/70">{'}'}</span>
      </SyntaxBlock>

      <div className="mt-4 bg-[#47C5FB]/5 border border-[#47C5FB]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
        <span className="text-[#47C5FB] font-medium">Note:</span> This widget works on Android, iOS, Web, macOS, Windows, and Linux — Reicon icons are pure Dart with zero native dependencies.
      </div>
    </>
  );
}
