import SectionHeader from '@/components/docs/SectionHeader';
import { FrameworkIcon } from '@/components/docs/framework/icons';
import { FRAMEWORKS } from '@/components/docs/framework/constants';
import DocsActionsBar from '@/components/docs/ActionsBar';


import ReactDocs from './frameworks/ReactDocs';
import AngularDocs from './frameworks/AngularDocs';
import ReactNativeDocs from './frameworks/ReactNativeDocs';
import VueDocs from './frameworks/VueDocs';
import SvelteDocs from './frameworks/SvelteDocs';
import AstroDocs from './frameworks/AstroDocs';
import FlutterDocs from './frameworks/FlutterDocs';
import CdnDocs from './frameworks/CdnDocs';
import FigmaDocs from './guides/FigmaDocs';
import VscodeDocs from './guides/VscodeDocs';
import McpDocs from './guides/McpDocs';
import SvgDocs from './guides/SvgDocs';
import PropsTable from './reference/PropsTable';
import Weights from './reference/Weights';
import TypeScriptSection from './reference/TypeScriptSection';
import Accessibility from './guides/Accessibility';
import Styling from './guides/Styling';
import Performance from './guides/Performance';
import Troubleshooting from './guides/Troubleshooting';

interface Props {
  contentRef: React.RefObject<HTMLDivElement | null>;
  fwParam: string | undefined;
  framework: string;
  switchFramework: (fw: any) => void;
  copiedField: string | null;
  copyToClipboard: (text: string, field: string) => void;
  toastMessage: string | null;
  isStandaloneFramework: (fw: string) => boolean;
  copiedPage: boolean;
  openDropdown: boolean;
  openDropdownRef: React.RefObject<HTMLDivElement | null>;
  githubEditUrl: string;
  githubUrl: string;
  handleCopyPageMarkdown: () => void;
  setOpenDropdown: (v: boolean) => void;
  openInLLM: (platform: 'markdown' | 'v0' | 'chatgpt' | 'claude' | 'scira') => void;
  prevFw?: any;
  nextFw?: any;
  navigatePrevFw?: () => void;
  navigateNextFw?: () => void;
  vanillaDocs: string;
  reactDocs: string;
  angularDocs: string;
  reactNativeDocs: string;
  vueDocs: string;
  svelteDocs: string;
  astroDocs: string;
  flutterDocs: string;
  figmaDocs: string;
  vscodeDocs: string;
  mcpDocs: string;
  svgDocs: string;
  propsDocs: string;
  weightsDocs: string;
  typescriptDocs: string;
  stylingDocs: string;
  accessibilityDocs: string;
  performanceDocs: string;
  troubleshootingDocs: string;
}

export default function DocsContent({
  contentRef,
  fwParam,
  framework,
  switchFramework,
  copiedField,
  copyToClipboard,
  toastMessage,
  isStandaloneFramework,
  copiedPage,
  openDropdown,
  openDropdownRef,
  githubEditUrl,
  githubUrl,
  handleCopyPageMarkdown,
  setOpenDropdown,
  openInLLM,
  prevFw,
  nextFw,
  navigatePrevFw,
  navigateNextFw,
  vanillaDocs,
  reactDocs,
  angularDocs,
  reactNativeDocs,
  vueDocs,
  svelteDocs,
  astroDocs,
  figmaDocs,
  vscodeDocs,
  mcpDocs,
  svgDocs,
  flutterDocs,
  propsDocs,
  weightsDocs,
  typescriptDocs,
  stylingDocs,
  accessibilityDocs,
  performanceDocs,
  troubleshootingDocs,
}: Props) {
  const isVanilla = framework === 'vanilla';
  const isReact = framework === 'react';
  const isReactNative = framework === 'react-native';
  const isVue = framework === 'vue';
  const isSvelte = framework === 'svelte';
  const isAstro = framework === 'astro';
  const isFigma = framework === 'figma';
  const isVscode = framework === 'vscode';
  const isMcp = framework === 'mcp';
  const isSvg = framework === 'svg';
  const isFlutter = framework === 'flutter';

  return (
    <main ref={contentRef} className="flex-1 min-w-0 px-0 md:px-6 lg:px-8 xl:px-10 py-5 pb-36 lg:pb-12 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-end mb-6">
          <DocsActionsBar
            copiedPage={copiedPage}
            openDropdown={openDropdown}
            openDropdownRef={openDropdownRef}
            githubEditUrl={githubEditUrl}
            githubUrl={githubUrl}
            onCopyMarkdown={handleCopyPageMarkdown}
            onOpenDropdown={setOpenDropdown}
            onOpenInLLM={openInLLM}
            hasPrevFw={!!prevFw}
            hasNextFw={!!nextFw}
            onNavigatePrev={navigatePrevFw}
            onNavigateNext={navigateNextFw}
          />
        </div>



            {/* What is Reicon — shown on base /docs route */}
            {!fwParam && (
              <>
                <section id="what-is-reicon" data-section className="mb-12 scroll-mt-24">
                  <SectionHeader id="what-is-reicon" title="What is Reicon?" level="h2" markdownContent={vanillaDocs} />
                  <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
                    Reicon is a free, open-source SVG icon library featuring <strong>2,700+ handcrafted UI icons</strong>.
                    The ecosystem offers native packages for <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon</code> (vanilla JS &amp; CDN),{' '}
                    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-react</code>,{' '}
                    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-angular</code>,{' '}
                    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-react-native</code>,{' '}
                    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-vue</code>,{' '}
                    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-svelte</code>,{' '}
                    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-astro</code>, and{' '}
                    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon_flutter</code>.
                  </p>
                  <p className="text-text-base/60 text-[15px] leading-[1.8]">
                    Icons come in Outline and Filled weights with zero external dependencies and full tree-shakeability.
                  </p>
                </section>
              </>
            )}

            {/* Framework selector grid — shown on base /docs route */}
            {!fwParam ? (
              <section className="mb-12">
                <h2 className="text-lg font-serif text-text-base mb-6">Choose an Integration</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FRAMEWORKS.map((fw) => (
                    <button
                      key={fw.id}
                      onClick={() => switchFramework(fw.id)}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-text-base/3 hover:bg-text-base/6 text-left transition-all border border-transparent hover:border-text-base/5 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-text-base/5 flex items-center justify-center text-lg shrink-0">
                        <FrameworkIcon id={fw.id} size={20} />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold text-text-base mb-0.5">{fw.label}</h3>
                        <p className="text-[12px] text-text-base/40">View the {fw.label} integration guide</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ) : (
              framework === 'react' ? (
                <ReactDocs markdownContent={reactDocs} copiedField={copiedField} onCopy={copyToClipboard} />
              ) : framework === 'angular' ? (
                <AngularDocs markdownContent={angularDocs} copiedField={copiedField} onCopy={copyToClipboard} />
              ) : framework === 'react-native' ? (
                <ReactNativeDocs markdownContent={reactNativeDocs} copiedField={copiedField} onCopy={copyToClipboard} />
              ) : framework === 'vue' ? (
                <VueDocs markdownContent={vueDocs} copiedField={copiedField} onCopy={copyToClipboard} />
              ) : framework === 'svelte' ? (
                <SvelteDocs markdownContent={svelteDocs} copiedField={copiedField} onCopy={copyToClipboard} />
              ) : framework === 'astro' ? (
                <AstroDocs markdownContent={astroDocs} copiedField={copiedField} onCopy={copyToClipboard} />
              ) : framework === 'flutter' ? (
                <FlutterDocs markdownContent={flutterDocs} copiedField={copiedField} onCopy={copyToClipboard} />
              ) : framework === 'figma' ? (
                <FigmaDocs markdownContent={figmaDocs} />
              ) : framework === 'vscode' ? (
                <VscodeDocs markdownContent={vscodeDocs} copiedField={copiedField} onCopy={copyToClipboard} />
              ) : framework === 'mcp' ? (
                <McpDocs markdownContent={mcpDocs} copiedField={copiedField} onCopy={copyToClipboard} />
              ) : framework === 'svg' ? (
                <SvgDocs markdownContent={svgDocs} copiedField={copiedField} onCopy={copyToClipboard} />
              ) : (
                <CdnDocs markdownContent={vanillaDocs} copiedField={copiedField} onCopy={copyToClipboard} />
              )
            )}


        {/* Shared docs sections — shown ONLY on framework pages */}
        {fwParam && !isStandaloneFramework(framework) && (
          <>
            <hr className="border-text-base/6 mb-12" />
            <PropsTable markdownContent={propsDocs} />
            <hr className="border-text-base/6 mb-12" />
            <Weights markdownContent={weightsDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            <hr className="border-text-base/6 mb-12" />
            <TypeScriptSection markdownContent={typescriptDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            <hr className="border-text-base/6 mb-12" />
            <Styling markdownContent={stylingDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            <hr className="border-text-base/6 mb-12" />
            <Accessibility markdownContent={accessibilityDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            <hr className="border-text-base/6 mb-12" />
            <Performance markdownContent={performanceDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            <hr className="border-text-base/6 mb-12" />
            <Troubleshooting markdownContent={troubleshootingDocs} copiedField={copiedField} onCopy={copyToClipboard} />
          </>
        )}



        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-[999] bg-[var(--dropdown-bg)] border border-text-base/8 text-text-base text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </main>
  );
}
