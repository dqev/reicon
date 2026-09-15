import InstallTabs from '@/components/docs/InstallTabs';
import SectionHeader from '@/components/docs/SectionHeader';
import SyntaxBlock from '@/components/docs/SyntaxBlock';
import { AngularIcon } from '@/components/docs/framework/icons';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function AngularDocs({ markdownContent, copiedField, onCopy }: Props) {
  const basicExample = [
    "import { Component } from '@angular/core';",
    "import { HomeComponent, ShieldCheckComponent } from 'reicon-angular';",
    '',
    '@Component({',
    "  selector: 'app-root',",
    '  standalone: true,',
    '  imports: [HomeComponent, ShieldCheckComponent],',
    '})',
    'export class AppComponent {}',
  ].join('\n');

  const templateExample = [
    '<ri-home [size]="24"></ri-home>',
    '<ri-shield-check size="24" color="#9B8AFB"></ri-shield-check>',
    '<ri-star size="24" weight="Filled"></ri-star>',
  ].join('\n');

  return (
    <section id="angular-docs" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="angular-docs"
        title="Angular"
        level="h2"
        markdownContent={markdownContent}
        icon={<AngularIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The official Angular 20+ package for Reicon. Import standalone icon components with full TypeScript support, customize their inputs, and keep production bundles focused on the icons your application uses.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Import icons as Angular standalone components</li>
        <li>Customize size, color, weight, and stroke width via inputs</li>
        <li>Use Angular 20+ standalone or NgModule applications</li>
        <li>Tree-shake unused icons in production builds</li>
        <li>Keep full TypeScript autocomplete for icon names and inputs</li>
        <li>Forward common accessibility inputs to the SVG element</li>
      </ul>

      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Installation</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Install the package using your preferred package manager. Angular 20 or newer is required.
      </p>
      <InstallTabs packageName="reicon-angular" copiedField={copiedField} onCopy={onCopy} />

      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Basic Usage</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Import the standalone components you use and add them to the component's <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">imports</code> array. Selectors use the icon name in kebab-case with an <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">ri-</code> prefix.
      </p>
      <SyntaxBlock
        title="app.component.ts"
        onCopy={() => onCopy(basicExample, 'angular-basic')}
        copied={copiedField === 'angular-basic'}
      >
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> {'{'} </span><span className="text-[#e5c07b]">Component</span><span className="text-text-base/70"> {'}'}</span><span className="text-[#c678dd]"> from</span><span className="text-[#98c379]"> '@angular/core'</span><span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> {'{'} </span><span className="text-[#e5c07b]">HomeComponent</span><span className="text-text-base/70">, </span><span className="text-[#e5c07b]">ShieldCheckComponent</span><span className="text-text-base/70"> {'}'}</span><span className="text-[#c678dd]"> from</span><span className="text-[#98c379]"> 'reicon-angular'</span><span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-[#c678dd]">@Component</span><span className="text-text-base/70">({'{'}</span>
        {'\n  '}
        <span className="text-[#d19a66]">standalone</span><span className="text-text-base/50">: </span><span className="text-[#d19a66]">true</span><span className="text-text-base/30">,</span>
        {'\n  '}
        <span className="text-[#d19a66]">imports</span><span className="text-text-base/50">: [</span><span className="text-[#e5c07b]">HomeComponent</span><span className="text-text-base/50">, </span><span className="text-[#e5c07b]">ShieldCheckComponent</span><span className="text-text-base/50">],</span>
        {'\n'}
        <span className="text-text-base/70">{'})'}</span><span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-[#c678dd]">export class</span><span className="text-[#61afef]"> AppComponent</span><span className="text-text-base/70"> {'{}'}</span>
      </SyntaxBlock>

      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Sizing, color, and weights</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Icons default to Outline and inherit the surrounding CSS color. Use Angular inputs for one-off configuration.
      </p>
      <SyntaxBlock
        title="Template HTML"
        onCopy={() => onCopy(templateExample, 'angular-inputs')}
        copied={copiedField === 'angular-inputs'}
      >
        <span className="text-text-base/70">&lt;</span><span className="text-[#e06c75]">ri-home</span><span className="text-[#d19a66]"> [size]</span><span className="text-text-base/50">=</span><span className="text-text-base/70">"24"</span><span className="text-text-base/70">&gt;&lt;/</span><span className="text-[#e06c75]">ri-home</span><span className="text-text-base/70">&gt;</span>
        {'\n'}
        <span className="text-text-base/70">&lt;</span><span className="text-[#e06c75]">ri-shield-check</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#9B8AFB"</span><span className="text-text-base/70">&gt;&lt;/</span><span className="text-[#e06c75]">ri-shield-check</span><span className="text-text-base/70">&gt;</span>
        {'\n'}
        <span className="text-text-base/70">&lt;</span><span className="text-[#e06c75]">ri-star</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-text-base/70">&gt;&lt;/</span><span className="text-[#e06c75]">ri-star</span><span className="text-text-base/70">&gt;</span>
      </SyntaxBlock>

      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">NgModule applications</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Generated icons are standalone components. In a module-based application, add an icon component to the NgModule <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">imports</code> array instead of declaring it.
      </p>

      <div className="mt-6 bg-[#DD0031]/5 border border-[#DD0031]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
        <span className="text-[#DD0031] font-medium">Angular 20+:</span> Components are generated from the same <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">data/icon-data.json</code> source as every other Reicon package, so names and weights stay consistent across the ecosystem.
      </div>
    </section>
  );
}
