import { useState, useMemo, ReactNode } from 'react';
import { motion } from 'motion/react';
import { EASE } from './utils';

function Mockup({ i, children }: { i: number; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
      whileHover={{ y: -4 }}
      className="bg-text-base/3 border border-text-base/6 rounded-2xl p-5 min-h-[180px] flex flex-col"
    >
      {children}
    </motion.div>
  );
}

export function AppNavMockup({ name, pascalName, weight }: { name?: string; pascalName: string; weight: string }) {
  const [active, setActive] = useState(pascalName);
  const items = [
    { key: pascalName, label: pascalName, icon: name },
    { key: 'overview', label: 'Overview', icon: 'chart' },
    { key: 'activity', label: 'Activity', icon: 'clock' },
  ] as const;
  return (
    <div className="flex flex-col flex-1">
      <span className="text-[10px] uppercase tracking-wider text-text-base/25 font-semibold mb-3">Sidebar nav</span>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <button key={item.key} onClick={() => setActive(item.key)}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all cursor-pointer text-left w-full ${active === item.key ? 'bg-[#9B8AFB]/15 text-[#9B8AFB]' : 'text-text-base/40 hover:text-text-base/60 hover:bg-text-base/5'}`}>
            <re-icon icon={active === item.key ? name : item.icon} weight={weight} size={16} color="currentColor" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ButtonsMockup({ name, weight }: { name?: string; weight: string }) {
  const [clicked, setClicked] = useState<'primary' | 'secondary' | null>(null);
  return (
    <div className="flex flex-col flex-1">
      <span className="text-[10px] uppercase tracking-wider text-text-base/25 font-semibold mb-3">Buttons</span>
      <div className="flex flex-col gap-2.5 mt-auto">
        <button onClick={() => { setClicked('primary'); setTimeout(() => setClicked(null), 400); }}
          className={`flex items-center justify-center gap-2 text-white text-[13px] font-medium px-4 py-2.5 rounded-lg transition-all cursor-pointer ${clicked === 'primary' ? 'bg-[#7562FA] scale-95' : 'bg-[#9B8AFB] hover:bg-[#8B7AFB] active:scale-95'}`}>
          <re-icon icon={name} weight={weight} size={16} color="white" /> Click me
        </button>
        <button onClick={() => { setClicked('secondary'); setTimeout(() => setClicked(null), 400); }}
          className={`flex items-center justify-center gap-2 text-[13px] font-medium px-4 py-2.5 rounded-lg border transition-all cursor-pointer ${clicked === 'secondary' ? 'bg-[#9B8AFB]/15 border-[#9B8AFB]/30 text-[#9B8AFB] scale-95' : 'bg-text-base/6 text-text-base/70 border-text-base/10 hover:bg-text-base/10 hover:text-text-base active:scale-95'}`}>
          <re-icon icon={name} weight={weight} size={16} color="currentColor" /> Secondary
        </button>
      </div>
    </div>
  );
}

export function StatMockup({ name, weight }: { name?: string; weight: string }) {
  const [count, setCount] = useState(12480);
  const trend = useMemo(() => {
    const pct = ((Math.random() * 24) - 2).toFixed(1);
    return { value: Number(pct), up: Number(pct) >= 0 };
  }, [count]);
  return (
    <div className="flex flex-col flex-1">
      <span className="text-[10px] uppercase tracking-wider text-text-base/25 font-semibold mb-3">Metric card</span>
      <button onClick={() => setCount(c => c + Math.floor(Math.random() * 50))}
        className="flex items-start gap-3 mt-auto text-left w-full group cursor-pointer">
        <div className="w-11 h-11 rounded-xl bg-[#9B8AFB]/15 flex items-center justify-center shrink-0 group-hover:bg-[#9B8AFB]/25 transition-colors">
          <re-icon icon={name} weight={weight} size={20} color="#9B8AFB" />
        </div>
        <div>
          <div className="text-[22px] font-serif text-text-base leading-tight">{count.toLocaleString()}</div>
          <div className="text-[12px] text-text-base/40">Total this month</div>
        </div>
      </button>
      <div className={`mt-3 flex items-center gap-1 text-[11px] ${trend.up ? 'text-green-400' : 'text-red-400'}`}>
        <re-icon icon={trend.up ? 'arrow-up' : 'arrow-down'} size={12} color="currentColor" />
        {Math.abs(trend.value)}% vs last month
      </div>
    </div>
  );
}

export function ToastMockup({ name, weight }: { name?: string; weight: string }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return (
      <div className="flex flex-col flex-1">
        <span className="text-[10px] uppercase tracking-wider text-text-base/25 font-semibold mb-3">Notification</span>
        <div className="mt-auto flex items-center justify-center">
          <button onClick={() => setDismissed(false)}
            className="text-[12px] text-text-base/30 hover:text-text-base/60 underline underline-offset-2 cursor-pointer transition-colors">
            Show notification
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-1">
      <span className="text-[10px] uppercase tracking-wider text-text-base/25 font-semibold mb-3">Notification</span>
      <div className="mt-auto flex items-start gap-3 bg-[var(--dropdown-bg)] border border-text-base/8 rounded-xl px-3.5 py-3 shadow-lg">
        <div className="w-8 h-8 rounded-lg bg-[#9B8AFB]/15 flex items-center justify-center shrink-0">
          <re-icon icon={name} weight={weight} size={16} color="#9B8AFB" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-text-base/90">All changes saved</div>
          <div className="text-[12px] text-text-base/40 truncate">Your workspace is up to date.</div>
        </div>
        <button onClick={() => setDismissed(true)}
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded-md text-text-base/30 hover:text-text-base hover:bg-text-base/8 transition-colors cursor-pointer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}

export function InputMockup({ name, weight }: { name?: string; weight: string }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  return (
    <div className="flex flex-col flex-1">
      <span className="text-[10px] uppercase tracking-wider text-text-base/25 font-semibold mb-3">Input field</span>
      <div className="flex flex-col gap-2.5 mt-auto">
        <label className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-all cursor-text ${focused ? 'bg-text-base/5 border border-[#9B8AFB]/50' : 'bg-text-base/4 border border-text-base/8'}`}>
          <re-icon icon={name} weight={weight} size={18} color="currentColor" className={focused ? 'text-[#9B8AFB]' : 'text-text-base/40'} />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused ? '' : 'Type something\u2026'}
            className="bg-transparent text-[13px] text-text-base placeholder:text-text-base/25 outline-none flex-1 min-w-0"
          />
          {focused && <span className="w-px h-4 bg-[#9B8AFB] animate-pulse" />}
        </label>
        <div className="flex items-center gap-2.5 bg-text-base/4 border border-text-base/8 rounded-lg px-3 py-2.5">
          <re-icon icon={name} weight={weight} size={18} color="currentColor" className="text-text-base/30" />
          <span className="text-text-base/25 text-[13px]">Disabled</span>
        </div>
      </div>
    </div>
  );
}

export function MobileBarMockup({ name, weight }: { name?: string; weight: string }) {
  const [tab, setTab] = useState(0);
  const label = name?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') || '';
  const tabs = [
    { icon: name, label },
    { icon: 'home-smile2', label: 'Home' },
    { icon: 'magnifier', label: 'Search' },
    { icon: 'user', label: 'Profile' },
  ];
  return (
    <div className="flex flex-col flex-1">
      <span className="text-[10px] uppercase tracking-wider text-text-base/25 font-semibold mb-3">Bottom tab bar</span>
      <div className="mt-auto flex items-center justify-around bg-text-base/4 border border-text-base/8 rounded-2xl px-2 py-2">
        {tabs.map((t, i) => (
          <button key={t.icon} onClick={() => setTab(i)}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all cursor-pointer ${tab === i ? 'text-[#9B8AFB]' : 'text-text-base/30 hover:text-text-base/50'}`}>
            <re-icon icon={t.icon} weight={tab === i ? 'filled' : 'outline'} size={20} color="currentColor" />
            {tab === i && <span className="w-1 h-1 rounded-full bg-[#9B8AFB]" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Mockup;
