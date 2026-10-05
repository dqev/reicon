import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { EASE } from './utils';

export function MockupCard({ i, children, className = '' }: { i: number; children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
      className={`bg-[#141416] border border-white/[0.07] rounded-3xl p-5 md:p-6 relative overflow-hidden shadow-2xl backdrop-blur-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function InspectorMockup({ name, pascalName, weight }: { name?: string; pascalName: string; weight: string }) {
  const [selectedFamily, setSelectedFamily] = useState('Rotate');
  const [selectedType, setSelectedType] = useState('Large');
  const [selectedTheme, setSelectedTheme] = useState('Colorful');
  const [modeTab, setModeTab] = useState<'manual' | 'agent'>('manual');

  return (
    <div className="flex flex-col gap-5 text-left w-full h-full font-sans text-xs">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#222224] hover:bg-[#2a2a2d] border border-white/10 text-white text-xs font-medium transition-all cursor-pointer">
            <span>Presets</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <button className="w-8 h-8 rounded-full bg-[#222224] hover:bg-[#2a2a2d] border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer" title="Reset">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.5 2.8L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#222224] hover:bg-[#2a2a2d] border border-white/10 text-white text-xs font-medium transition-all cursor-pointer">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span>Copy prompt</span>
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 items-stretch">
        {/* Left Side: Gradient Stage Box with Active Icon */}
        <div className="md:col-span-5 bg-[#0D0D0F] border border-white/[0.06] rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group min-h-[220px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9B8AFB]/15 via-transparent to-purple-500/5 opacity-70 pointer-events-none" />
          
          <div className="relative z-10 w-24 h-24 rounded-3xl bg-[#1A1A1E] border border-white/10 flex flex-col items-center justify-center gap-2 transition-transform duration-300 group-hover:scale-105 shadow-[0_0_30px_rgba(155,138,251,0.2)]">
            <re-icon icon={name} weight={weight} size={40} color="#9B8AFB" />
          </div>

          <div className="absolute bottom-3 right-3 text-white/30 hover:text-white/70 transition-colors cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </div>
        </div>

        {/* Right Side: Detailed Control Inspector */}
        <div className="md:col-span-7 flex flex-col gap-3">
          {/* Segmented Control */}
          <div className="flex items-center justify-between gap-2 bg-[#0D0D0F] p-1 rounded-full border border-white/[0.06]">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setModeTab('manual')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${modeTab === 'manual' ? 'bg-[#242426] text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
              >
                Manual controls
              </button>
              <button
                onClick={() => setModeTab('agent')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${modeTab === 'agent' ? 'bg-[#242426] text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
              >
                Agent
              </button>
            </div>
            <div className="pr-2 text-white/40 hover:text-white/70 transition-colors cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            </div>
          </div>

          {/* Family section */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-white/40 font-mono">Family</span>
            <div className="flex gap-1.5">
              {['Rotate', 'Pulse'].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFamily(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${selectedFamily === f ? 'bg-[#242426] text-white border border-white/10' : 'bg-white/[0.03] text-white/40 hover:text-white/70 border border-transparent'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Type section */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-white/40 font-mono">Type</span>
            <div className="flex gap-1.5">
              {['Large', 'Small', 'Line'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${selectedType === t ? 'bg-[#242426] text-white border border-white/10' : 'bg-white/[0.03] text-white/40 hover:text-white/70 border border-transparent'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Color Theme section */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-white/40 font-mono">Color theme</span>
            <div className="flex flex-wrap gap-1.5">
              {['Colorful', 'Mono', 'Ocean', 'Sunset', 'Forest', 'Candy', 'Ice', 'Gold'].map((thm) => (
                <button
                  key={thm}
                  onClick={() => setSelectedTheme(thm)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all cursor-pointer ${selectedTheme === thm ? 'bg-[#9B8AFB] text-white shadow-md shadow-[#9B8AFB]/20' : 'bg-white/[0.03] text-white/40 hover:text-white/70 border border-transparent'}`}
                >
                  {thm}
                </button>
              ))}
            </div>
          </div>

          {/* Motion Section */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-white/40 font-mono">Motion</span>
            <div className="flex items-center justify-between bg-[#0D0D0F] border border-white/[0.06] rounded-full px-3.5 py-1.5">
              <span className="text-white/50 text-xs font-medium">Duration</span>
              <span className="text-white font-mono text-xs">1.96s</span>
            </div>
          </div>

          {/* Glow styling section */}
          <div className="flex flex-col gap-1.5 pt-1">
            <span className="text-[11px] text-white/40 font-mono">Glow styling</span>
            <div className="flex items-center justify-between bg-[#0D0D0F] border border-white/[0.06] rounded-full px-3.5 py-1.5">
              <span className="text-white/50 text-xs font-medium">Strength</span>
              <span className="text-white font-mono text-xs">100%</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="flex items-center justify-between bg-[#0D0D0F] border border-white/[0.06] rounded-full px-3 py-1.5">
                <span className="text-white/50 text-xs">Corner radius</span>
                <span className="text-white font-mono text-xs">16px</span>
              </div>
              <div className="flex items-center justify-between bg-[#0D0D0F] border border-white/[0.06] rounded-full px-3 py-1.5">
                <span className="text-white/50 text-xs">Size</span>
                <span className="text-white font-mono text-xs">1x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AgentChatMockup({ name, pascalName, weight }: { name?: string; pascalName: string; weight: string }) {
  return (
    <div className="flex flex-col justify-between gap-5 h-full font-sans text-xs min-h-[190px]">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-1 bg-[#0D0D0F] p-1 rounded-full border border-white/[0.06]">
          <span className="px-3 py-1 rounded-full text-[11px] font-medium text-white/40">Manual controls</span>
          <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#242426] text-white shadow-sm">Agent</span>
        </div>
        <div className="text-white/40 hover:text-white transition-colors cursor-pointer p-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        </div>
      </div>

      {/* User Prompt Message & Agent Response */}
      <div className="flex flex-col gap-4 my-auto pt-1">
        <div className="self-end bg-[#242426] text-white text-xs px-4 py-2 rounded-full border border-white/10 font-medium shadow-sm">
          Make it more subtle
        </div>

        {/* Agent Status Line with Active Icon */}
        <div className="flex items-center gap-2.5 text-white/70 text-xs font-mono pt-1">
          <svg className="w-3.5 h-3.5 text-[#9B8AFB] shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
          </svg>
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-4 h-4 rounded bg-[#9B8AFB]/15 inline-flex items-center justify-center shrink-0">
              <re-icon icon={name} weight={weight} size={12} color="#9B8AFB" />
            </span>
            <span className="truncate">Picking the knobs to move</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PresetsDropdownMockup({ name, pascalName, weight }: { name?: string; pascalName: string; weight: string }) {
  const [presets, setPresets] = useState(['subtle', 'bold', 'fast']);
  const [inputValue, setInputValue] = useState('New preset 5');

  const removePreset = (item: string) => {
    setPresets(presets.filter(p => p !== item));
  };

  return (
    <div className="flex flex-col items-end gap-3 h-full font-sans text-xs">
      {/* Trigger Button */}
      <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#222224] hover:bg-[#2a2a2d] border border-white/10 text-white text-xs font-medium transition-all cursor-pointer">
        <span>Presets</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
      </button>

      {/* Popover Dropdown Card */}
      <div className="w-full max-w-[300px] bg-[#0D0D0F] border border-white/10 rounded-2xl p-3.5 flex flex-col gap-2.5 shadow-2xl ml-auto">
        <div className="flex flex-col gap-1.5">
          {presets.map((p) => (
            <div key={p} className="flex items-center justify-between bg-[#1A1A1E] border border-white/[0.06] rounded-xl px-3 py-2 text-xs text-white/80 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#9B8AFB]/15 flex items-center justify-center shrink-0">
                  <re-icon icon={name} weight={weight} size={13} color="#9B8AFB" />
                </span>
                <span>{p}</span>
              </div>
              <button onClick={() => removePreset(p)} className="text-white/30 hover:text-white transition-colors cursor-pointer px-1">
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 pt-1 border-t border-white/[0.06]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-[#1A1A1E] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-[#9B8AFB]/60"
          />
        </div>
      </div>
    </div>
  );
}

export function BottomNavMockup({ name, pascalName, weight }: { name?: string; pascalName: string; weight: string }) {
  return (
    <div className="flex flex-col gap-3 font-sans text-xs">
      <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Bottom Navigation</span>
      <div className="bg-[#0D0D0F] border border-white/[0.08] rounded-full p-2 flex items-center justify-around shadow-lg">
        <div className="p-2 rounded-full text-white/40 hover:text-white transition-colors cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        </div>
        <div className="p-2 rounded-full text-white/40 hover:text-white transition-colors cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-[#9B8AFB]/20 border border-[#9B8AFB]/40 text-[#9B8AFB] flex items-center gap-1.5 shadow-[0_0_12px_rgba(155,138,251,0.3)]">
          <re-icon icon={name} weight={weight} size={18} color="#9B8AFB" />
          <span className="text-[11px] font-medium">{pascalName}</span>
        </div>
        <div className="p-2 rounded-full text-white/40 hover:text-white transition-colors cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </div>
        <div className="p-2 rounded-full text-white/40 hover:text-white transition-colors cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
      </div>
    </div>
  );
}

export function SidebarItemMockup({ name, pascalName, weight }: { name?: string; pascalName: string; weight: string }) {
  return (
    <div className="flex flex-col gap-3 font-sans text-xs">
      <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Sidebar Navigation</span>
      <div className="bg-[#0D0D0F] border border-white/[0.08] rounded-2xl p-2 flex flex-col gap-1">
        <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#9B8AFB]/15 border border-[#9B8AFB]/30 text-white font-medium">
          <div className="flex items-center gap-2.5">
            <re-icon icon={name} weight={weight} size={18} color="#9B8AFB" />
            <span>{pascalName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/60">⌘1</span>
            <span className="w-2 h-2 rounded-full bg-[#9B8AFB] animate-pulse" />
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-2 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer">
          <div className="flex items-center gap-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockupCard;
