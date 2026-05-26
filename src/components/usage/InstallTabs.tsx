import { useLayoutEffect, useRef, useState } from 'react';
import { SiPnpm, SiYarn, SiNpm, SiBun } from 'react-icons/si';
import { Copy } from 'reicon-react';

const TABS = [
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
 * Tabbed installer block with animated underline highlight, animate-ui style
 * "card-in-card" chrome, and your site's #6C5CE7 accent.
 */
export default function InstallTabs({ packageName, copiedField, onCopy }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('pnpm');
  const listRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState<{ left: number; width: number } | null>(null);

  // Re-measure the active trigger so the underline follows it.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLButtonElement>(`[data-tab="${activeTab}"]`);
    if (!el) return;
    const listRect = list.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setHighlight({ left: elRect.left - listRect.left, width: elRect.width });
  }, [activeTab]);

  const active = TABS.find((t) => t.id === activeTab)!;
  const fullCmd = `${active.cmd} ${packageName}`;
  const copyId = `install-${activeTab}`;
  const isCopied = copiedField === copyId;

  return (
    <figure className="reicon-cb relative my-0 overflow-hidden rounded-xl bg-[#0e0e10] text-sm">
      {/* Tab row */}
      <div className="relative flex items-center justify-between w-full h-10 pl-5 pr-1.5">
        <div ref={listRef} className="relative flex items-center h-full gap-x-4">
          {/* Animated underline */}
          {highlight && (
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 h-[2px] rounded-t-full bg-[#6C5CE7] transition-all duration-300 ease-out"
              style={{ left: highlight.left, width: highlight.width, boxShadow: '0 0 8px rgba(108, 92, 231, 0.45)' }}
            />
          )}

          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                data-tab={tab.id}
                data-state={isActive ? 'active' : 'inactive'}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 h-full text-[13px] font-medium transition-colors ${isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
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
          onClick={() => onCopy(fullCmd, copyId)}
          aria-label={isCopied ? 'Copied' : 'Copy command'}
          className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          {isCopied ? <CheckIcon /> : <Copy size={14} />}
        </button>
      </div>

      {/* Body — inset card */}
      <div className="px-1.5 pb-1.5">
        <div className="bg-[#09090b] rounded-md">
          <pre className="px-5 py-4 text-[13px] font-mono leading-[1.7] overflow-x-auto focus-visible:outline-none">
            <span className="text-[#c678dd]">{active.cmd}</span>
            <span className="text-white/75"> {packageName}</span>
          </pre>
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
