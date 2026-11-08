import { useState } from 'react';
import { SiBun, SiNpm, SiPnpm, SiYarn } from 'react-icons/si';
import { Copy, Sparkles } from 'reicon-react';
import { getInstallPrompt } from './installPrompts';

const TABS = [
  { id: 'prompt', label: 'Prompt', icon: Sparkles, color: '#9B8AFB', cmd: '' },
  { id: 'pnpm', label: 'pnpm', icon: SiPnpm, color: '#F69220', cmd: 'pnpm add' },
  { id: 'npm', label: 'npm', icon: SiNpm, color: '#CB3837', cmd: 'npm install' },
  { id: 'yarn', label: 'yarn', icon: SiYarn, color: '#2C8EBB', cmd: 'yarn add' },
  { id: 'bun', label: 'bun', icon: SiBun, color: '#fbf0df', cmd: 'bun add' },
] as const;

type TabId = typeof TABS[number]['id'];

interface Props {
  packageName: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

/**
 * Tabbed installer block with "card-in-card" chrome.
 */
export default function InstallTabs({ packageName, copiedField, onCopy }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('prompt');

  const active = TABS.find((t) => t.id === activeTab)!;
  const isPrompt = activeTab === 'prompt';
  const prompt = getInstallPrompt(packageName);
  const copyText = isPrompt ? prompt : `${active.cmd} ${packageName}`;
  const copyId = isPrompt ? 'install-prompt' : `install-${activeTab}`;
  const isCopied = copiedField === copyId;

  return (
    <figure className="reicon-cb relative my-0 overflow-hidden rounded-xl bg-white/[0.03] text-sm">
      {/* Tab row */}
      <div className="relative flex items-center justify-between w-full h-10 pl-5 pr-1.5">
        <div className="flex items-center h-full gap-x-3 sm:gap-x-4 min-w-0 overflow-x-auto pr-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                data-tab={tab.id}
                data-state={isActive ? 'active' : 'inactive'}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex shrink-0 items-center gap-1.5 h-full text-[13px] font-medium transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                <Icon
                  size={13}
                  style={{ color: isActive ? tab.color : undefined }}
                  className={isActive ? '' : 'opacity-50'}
                />
                {tab.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onCopy(copyText, copyId)}
          aria-label={isCopied ? 'Copied' : isPrompt ? 'Copy prompt' : 'Copy command'}
          className="inline-flex shrink-0 items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          {isCopied ? <CheckIcon /> : <Copy size={14} />}
        </button>
      </div>

      {/* Body - inset card */}
      <div className="px-1.5 pb-1.5">
        <div className="bg-[#121212] rounded-md">
          {isPrompt ? (
            <pre className="max-h-[360px] overflow-y-auto whitespace-pre-wrap break-words px-5 py-4 text-[13px] font-sans leading-[1.7] text-white/75 focus-visible:outline-none">
              {prompt}
            </pre>
          ) : (
            <pre className="px-5 py-4 text-[13px] font-mono leading-[1.7] overflow-x-auto focus-visible:outline-none text-white">
              <span className="text-[#c678dd]">{active.cmd}</span>
              <span className="text-white/75"> {packageName}</span>
            </pre>
          )}
        </div>
      </div>
    </figure>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
