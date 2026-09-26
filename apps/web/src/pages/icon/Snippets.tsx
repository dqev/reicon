import { AstroIcon, ComposeIcon, FlutterIcon } from '@/components/docs/framework/icons';

export const AstroLogo = () => <AstroIcon size={14} />;
export const FlutterLogo = () => <FlutterIcon size={14} />;
export const ComposeLogo = () => <ComposeIcon size={14} />;
export const CdnLogo = ({ size = 14 }: { size?: number }) => (
  <svg width={size * (452 / 520)} height={size} viewBox="0 0 452 520" fill="none">
    <path fill="#e34f26" d="M41 460L0 0h451l-41 460-185 52" />
    <path fill="#ef652a" d="M226 472l149-41 35-394H226" />
    <path fill="#ecedee" d="M226 208h-75l-5-58h80V94H84l15 171h127zm0 147l-64-17-4-45h-56l7 89 117 32z" />
    <path fill="#fff" d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z" />
  </svg>
);

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

export function ComposeSnippet({ pascalName, filled }: { pascalName: string; filled: boolean }) {
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> dev.reicon.</span><span className="text-[#e5c07b]">{pascalName}</span>
      {'\n'}
      <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> dev.reicon.ReiconIcon</span>
      {'\n\n'}
      <span className="text-[#61afef]">ReiconIcon</span><span className="text-text-base/70">(</span><span className="text-[#e5c07b]">{pascalName}</span><span className="text-text-base/70">.</span><span className="text-[#e5c07b]">{filled ? 'Filled' : 'Outline'}</span><span className="text-text-base/30">,</span><span className="text-text-base/70"> contentDescription = </span><span className="text-[#98c379]">"{pascalName}"</span><span className="text-text-base/70">)</span>
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

export function AngularSnippet({ pascalName, name, filled }: { pascalName: string; name: string; filled: boolean }) {
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-text-base/70">{' { '}</span>
      <span className="text-[#e5c07b]">Component</span><span className="text-text-base/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> '@angular/core'</span><span className="text-text-base/30">;</span>
      {'\n'}
      <span className="text-[#c678dd]">import</span><span className="text-text-base/70">{' { '}</span>
      <span className="text-[#e5c07b]">{pascalName}Component</span><span className="text-text-base/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-angular'</span><span className="text-text-base/30">;</span>
      {'\n\n'}
      <span className="text-text-base/70">{'// Add '}</span><span className="text-[#e5c07b]">{pascalName}Component</span><span className="text-text-base/70">{' to @Component({ imports: [...] })'}</span>
      {'\n'}
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">ri-{name}</span>
      <span className="text-[#d19a66]"> [size]</span><span className="text-text-base/50">=</span><span className="text-text-base/70">"24"</span>
      {filled && (<><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span></>)}
      <span className="text-text-base/70">{'></ri-'}</span><span className="text-[#e06c75]">{name}</span><span className="text-text-base/70">&gt;</span>
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
