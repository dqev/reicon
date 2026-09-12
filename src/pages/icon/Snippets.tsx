import { AstroIcon, FlutterIcon } from '../../components/docs/framework/icons';

export const AstroLogo = () => <AstroIcon size={14} />;
export const FlutterLogo = () => <FlutterIcon size={14} />;

export function AstroSnippet({ pascalName, filled }: { pascalName: string; filled: boolean }) {
  return (
    <>
      <span className="text-text-base/30">---</span>
      {'\n'}
      <span className="text-[#c678dd]">import</span><span className="text-text-base/70">{' { '}</span>
      <span className="text-[#e5c07b]">{pascalName}</span><span className="text-text-base/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-astro'</span><span className="text-text-base/30">;</span>
      {'\n'}
      <span className="text-text-base/30">---</span>
      {'\n\n'}
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">{pascalName}</span>
      <span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span>
      {filled && (<><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span></>)}
      <span className="text-text-base/70"> /{'>'}</span>
    </>
  );
}

export function FlutterSnippet({ pascalName, flutterName, filled }: { pascalName: string; flutterName: string; filled: boolean }) {
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> 'package:flutter_svg/flutter_svg.dart'</span><span className="text-text-base/30">;</span>
      {'\n'}
      <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> 'package:reicon_flutter/reicon_flutter.dart'</span><span className="text-text-base/30">;</span>
      {'\n\n'}
      <span className="text-[#61afef]">SvgPicture</span><span className="text-text-base/70">.string(</span>
      {'\n'}
      <span className="text-text-base/70">  </span><span className="text-[#61afef]">reiconSvg</span><span className="text-text-base/70">(</span><span className="text-[#e5c07b]">Reicon</span><span className="text-text-base/70">.</span><span className="text-[#e5c07b]">{filled ? 'filled' : 'outline'}</span><span className="text-text-base/70">.</span><span className="text-[#e5c07b]">{flutterName}</span><span className="text-text-base/70">),</span>
      {'\n'}
      <span className="text-text-base/70">  width: </span><span className="text-[#d19a66]">24</span><span className="text-text-base/30">,</span>
      {'\n'}
      <span className="text-text-base/70">  height: </span><span className="text-[#d19a66]">24</span><span className="text-text-base/30">,</span>
      {'\n'}
      <span className="text-text-base/70">)</span>
    </>
  );
}

export function VueLogo() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 122.88 106.42" fill="none">
      <polygon fill="#4DBA87" points="75.63,0 61.44,24.58 47.25,0 0,0 61.44,106.42 122.88,0 75.63,0" />
      <polygon fill="#425466" points="75.63,0 61.44,24.58 47.25,0 24.58,0 61.44,63.85 98.3,0 75.63,0" />
    </svg>
  );
}

export function VanillaSnippet({ pascalName, filled }: { pascalName: string; filled: boolean }) {
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-text-base/70">{' { '}</span>
      <span className="text-[#e5c07b]">{pascalName}</span><span className="text-text-base/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon'</span><span className="text-text-base/30">;</span>
      {'\n\n'}
      <span className="text-[#c678dd]">const</span><span className="text-text-base/70"> icon = </span><span className="text-[#61afef]">{pascalName}</span><span className="text-text-base/70">({'{'} size: </span><span className="text-[#d19a66]">24</span>
      {filled && (<><span className="text-text-base/70">, weight: </span><span className="text-[#98c379]">'Filled'</span></>)}
      <span className="text-text-base/70"> {'}'});</span>
      {'\n'}
      <span className="text-text-base/70">document.body.</span><span className="text-[#61afef]">appendChild</span><span className="text-text-base/70">(icon);</span>
    </>
  );
}

export function ReactSnippet({ pascalName, filled }: { pascalName: string; filled: boolean }) {
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-text-base/70">{' { '}</span>
      <span className="text-[#e5c07b]">{pascalName}</span><span className="text-text-base/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-react'</span><span className="text-text-base/30">;</span>
      {'\n\n'}
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">{pascalName}</span>
      <span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span>
      {filled && (<><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span></>)}
      <span className="text-text-base/70"> /{'>'}</span>
    </>
  );
}

export function ReactNativeSnippet({ pascalName, filled }: { pascalName: string; filled: boolean }) {
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-text-base/70">{' { '}</span>
      <span className="text-[#e5c07b]">{pascalName}</span><span className="text-text-base/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-react-native'</span><span className="text-text-base/30">;</span>
      {'\n\n'}
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">{pascalName}</span>
      <span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span>
      {filled && (<><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span></>)}
      <span className="text-text-base/70"> /{'>'}</span>
    </>
  );
}

export function VueSnippet({ pascalName, filled }: { pascalName: string; filled: boolean }) {
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-text-base/70">{' { '}</span>
      <span className="text-[#e5c07b]">{pascalName}</span><span className="text-text-base/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-vue'</span><span className="text-text-base/30">;</span>
      {'\n\n'}
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">{pascalName}</span>
      <span className="text-[#d19a66]"> :size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span>
      {filled && (<><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span></>)}
      <span className="text-text-base/70"> /{'>'}</span>
    </>
  );
}

export function SvelteSnippet({ pascalName, filled }: { pascalName: string; filled: boolean }) {
  return (
    <>
      <span className="text-text-base/30">{'<'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/30">{'>'}</span>
      {'\n'}
      <span className="text-[#c678dd]">  import</span><span className="text-text-base/70">{' { '}</span>
      <span className="text-[#e5c07b]">{pascalName}</span><span className="text-text-base/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-svelte'</span><span className="text-text-base/30">;</span>
      {'\n'}
      <span className="text-text-base/30">{'</'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/30">{'>'}</span>
      {'\n\n'}
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">{pascalName}</span>
      <span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span>
      {filled && (<><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span></>)}
      <span className="text-text-base/70"> /{'>'}</span>
    </>
  );
}

export function DirectSnippet({ pascalName }: { pascalName: string }) {
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-[#e5c07b]"> {pascalName}</span>
      <span className="text-[#c678dd]"> from</span><span className="text-[#98c379]"> 'reicon-react/icons/{pascalName}'</span><span className="text-text-base/30">;</span>
    </>
  );
}

export function CdnSnippet({ name, filled }: { name: string; filled: boolean }) {
  return (
    <>
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">script</span>
      <span className="text-[#d19a66]"> src</span><span className="text-text-base/50">=</span>
      <span className="text-[#98c379]">"https://unpkg.com/reicon@latest/cdn/reicon.js"</span>
      <span className="text-text-base/70">{'></'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/70">{'>'}</span>
      {'\n'}
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span>
      <span className="text-[#d19a66]"> icon</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"{name}"</span>
      {filled && (<><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"filled"</span></>)}
      <span className="text-text-base/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-text-base/70">{'>'}</span>
    </>
  );
}
