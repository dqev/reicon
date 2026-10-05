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
    <figure className="relative rounded-xl bg-white/[0.03] text-sm shadow-none overflow-hidden min-w-0 w-full my-0">
      {/* Header bar with framework tabs and right-aligned copy button */}
      <div className="relative flex items-center justify-between w-full h-10 pl-5 pr-1.5 min-w-0">
        <div className="flex items-center h-full gap-x-4 overflow-x-auto no-scrollbar scroll-smooth shrink min-w-0">
          {CODE_TABS.map((tab) => {
            const isActive = codeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCodeTab(tab.id as any)}
                className={`relative flex items-center gap-1.5 h-full text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                <span className={isActive ? 'text-[#9B8AFB]' : 'opacity-50'}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Copy Button in Header Bar */}
        <button
          onClick={() => handleCopy(activeTab.raw, `code-${codeTab}`)}
          aria-label="Copy code"
          className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
        >
          {copiedField === `code-${codeTab}` ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
          )}
        </button>
      </div>

      {/* Code body area — inset card matching InstallTabs */}
      <div className="px-1.5 pb-1.5 min-w-0 w-full">
        <div className="bg-[#121212] rounded-md min-h-[96px] w-full min-w-0 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.pre
              key={codeTab}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="px-5 py-4 text-[13px] font-mono leading-[1.7] overflow-x-auto whitespace-pre no-scrollbar focus-visible:outline-none text-white/90"
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
