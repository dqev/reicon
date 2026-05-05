import { useState } from 'react';
import { SiPnpm, SiYarn, SiNpm, SiBun } from 'react-icons/si';

const TABS = [
  { id: 'npm', label: 'npm', icon: SiNpm, color: '#CB3837', cmd: 'npm install' },
  { id: 'pnpm', label: 'pnpm', icon: SiPnpm, color: '#F69220', cmd: 'pnpm add' },
  { id: 'yarn', label: 'yarn', icon: SiYarn, color: '#2C8EBB', cmd: 'yarn add' },
  { id: 'bun', label: 'bun', icon: SiBun, color: '#fbf0df', cmd: 'bun add' },
] as const;

interface Props {
  packageName: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function InstallTabs({ packageName, copiedField, onCopy }: Props) {
  const [activeTab, setActiveTab] = useState<string>('npm');

  const activeCmd = TABS.find((t) => t.id === activeTab)!;
  const fullCmd = `${activeCmd.cmd} ${packageName}`;
  const copyId = `install-${activeTab}`;

  return (
    <div className="bg-[#0e0e10] border border-white/[0.06] rounded-xl overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center border-b border-white/[0.06]">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-colors relative ${isActive ? 'text-white/90' : 'text-white/40 hover:text-white/60'
                }`}
            >
              <Icon size={14} style={{ color: isActive ? tab.color : undefined }} className={isActive ? '' : 'opacity-40'} />
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6C5CE7]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Command */}
      <div className="relative group">
        <pre className="px-5 py-4 text-[13px] font-mono text-white/70 overflow-x-auto">
          <span className="text-[#c678dd]">{activeCmd.cmd}</span>
          <span className="text-white/60"> {packageName}</span>
        </pre>
        <button
          onClick={() => onCopy(fullCmd, copyId)}
          className="absolute top-3 right-3 text-[10px] text-white/30 hover:text-white/60 transition-colors opacity-0 group-hover:opacity-100 bg-white/5 px-2 py-1 rounded"
        >
          {copiedField === copyId ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
