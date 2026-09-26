import { motion, AnimatePresence } from 'motion/react';
import { VanillaSnippet, CdnSnippet, ReactSnippet, AngularSnippet, ReactNativeSnippet, VueSnippet, SvelteSnippet, AstroSnippet, FlutterSnippet, ComposeSnippet, DirectSnippet } from './Snippets';
import { EASE } from './utils';

interface CodeTabsProps {
  codeTab: string;
  setCodeTab: (tab: any) => void;
  copiedField: string | null;
  handleCopy: (text: string, field: string) => void;
  CODE_TABS: { id: string; label: string; icon: React.ReactNode; raw: string }[];
  activeTab: { id: string; label: string; icon: React.ReactNode; raw: string };
  pascalName: string;
  name: string;
  fw: boolean;
}

export default function CodeTabs({
  codeTab, setCodeTab, copiedField, handleCopy,
  CODE_TABS, activeTab, pascalName, name, fw,
}: CodeTabsProps) {
  return (
    <figure className="relative rounded-xl bg-text-base/3 border border-text-base/8 text-sm">
      <div className="flex items-center w-full h-11 pl-3 border-b border-text-base/8 overflow-x-auto">
        <div className="flex items-center h-full gap-1 shrink-0">
          {CODE_TABS.map((tab) => {
            const isActive = codeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setCodeTab(tab.id as any)}
                className={`relative flex items-center gap-1.5 h-full px-2.5 text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer ${isActive ? 'text-text-base' : 'text-text-base/40 hover:text-text-base/70'}`}>
                <span className={isActive ? '' : 'opacity-50'}>{tab.icon}</span>
                {tab.label}
                {isActive && <motion.span layoutId="code-tab-underline" className="absolute bottom-0 left-2 right-2 h-[2px] rounded-t-full bg-[#9B8AFB]" style={{ boxShadow: '0 0 8px rgba(155, 138, 251,0.45)' }} />}
              </button>
            );
          })}
        </div>
      </div>
      <div className="px-1.5 py-1.5 overflow-x-auto">
        <div className="bg-bg-base rounded-md min-h-[92px] min-w-[360px] relative">
          <button onClick={() => handleCopy(activeTab.raw, `code-${codeTab}`)} aria-label="Copy code"
            className="absolute top-1.5 right-1.5 z-10 inline-flex items-center justify-center w-7 h-7 rounded-md bg-bg-base text-text-base/30 hover:text-text-base hover:bg-text-base/8 transition-colors cursor-pointer">
            {copiedField === `code-${codeTab}` ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
            )}
          </button>
          <AnimatePresence mode="wait">
            <motion.pre
              key={codeTab}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="p-4 text-[13px] font-mono leading-[1.7] overflow-x-auto whitespace-pre focus-visible:outline-none text-text-base"
            >
              {codeTab === 'vanilla' && <VanillaSnippet pascalName={pascalName} filled={fw} />}
              {codeTab === 'cdn' && <CdnSnippet name={name} filled={fw} />}
              {codeTab === 'react' && <ReactSnippet pascalName={pascalName} filled={fw} />}
              {codeTab === 'angular' && <AngularSnippet pascalName={pascalName} name={name} filled={fw} />}
              {codeTab === 'react-native' && <ReactNativeSnippet pascalName={pascalName} filled={fw} />}
              {codeTab === 'vue' && <VueSnippet pascalName={pascalName} filled={fw} />}
              {codeTab === 'svelte' && <SvelteSnippet pascalName={pascalName} filled={fw} />}
              {codeTab === 'astro' && <AstroSnippet pascalName={pascalName} filled={fw} />}
              {codeTab === 'flutter' && <FlutterSnippet pascalName={pascalName} flutterName={name ? name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) : ''} filled={fw} />}
              {codeTab === 'compose' && <ComposeSnippet pascalName={pascalName} filled={fw} />}
              {codeTab === 'direct' && <DirectSnippet pascalName={pascalName} />}
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
    </figure>
  );
}
