import { motion, AnimatePresence } from 'motion/react';
import { EASE } from './utils';
import { useDuotoneData } from '@/hooks/useDuotoneData';
import { useMemo, useEffect } from 'react';

interface IconPreviewProps {
  pascalName: string;
  iconCategory: string;
  contributorGithub: string | null;
  name?: string;
  activeWeight: string;
  previewSize: number;
  useCustomColor: boolean;
  customColor: string;
  onSetActiveWeight: (w: 'outline' | 'filled' | 'duotone') => void;
  onSetPreviewSize: (s: number) => void;
  onReset: () => void;
}

export default function IconPreview({
  pascalName, iconCategory, contributorGithub, name,
  activeWeight, previewSize, useCustomColor, customColor,
  onSetActiveWeight, onSetPreviewSize, onReset,
}: IconPreviewProps) {
  const { duotoneMap } = useDuotoneData('Duotone');

  const hasDuotone = useMemo(() => {
    return Boolean(name && duotoneMap && duotoneMap[name]?.code);
  }, [name, duotoneMap]);

  useEffect(() => {
    if (duotoneMap && !hasDuotone && activeWeight === 'duotone') {
      onSetActiveWeight('outline');
    }
  }, [duotoneMap, hasDuotone, activeWeight, onSetActiveWeight]);

  const availableWeights = useMemo(() => {
    return hasDuotone ? (['outline', 'filled', 'duotone'] as const) : (['outline', 'filled'] as const);
  }, [hasDuotone]);

  const duotoneSvgInnerHtml = useMemo(() => {
    if (activeWeight !== 'duotone' || !name || !duotoneMap?.[name]?.code) return null;
    const rawCode = duotoneMap[name].code;
    return rawCode.replace(/fill="#[A-Fa-f0-9]{6}"/gi, 'fill="currentColor"');
  }, [activeWeight, name, duotoneMap]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="lg:sticky lg:top-20 lg:self-start flex flex-col gap-4"
    >
      <div className="relative w-full aspect-square bg-text-base/2 border border-text-base/8 rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(to right, var(--border-muted) 1px, transparent 1px), linear-gradient(to bottom, var(--border-muted) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
        <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-text-base/35 tabular-nums select-none">{previewSize}px</span>
        <span className="absolute bottom-2.5 left-3 text-[8px] font-mono text-text-base/25 select-none lowercase">{activeWeight}</span>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeWeight}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="flex items-center justify-center"
          >
            {activeWeight === 'duotone' && duotoneSvgInnerHtml ? (
              <svg
                viewBox="0 0 24 24"
                width={previewSize}
                height={previewSize}
                style={{ color: useCustomColor ? customColor : 'var(--text-base)' }}
                aria-label={`${pascalName} icon preview`}
                dangerouslySetInnerHTML={{ __html: duotoneSvgInnerHtml }}
              />
            ) : (
              <re-icon icon={name} weight={activeWeight} size={previewSize} color={useCustomColor ? customColor : 'var(--text-base)'} aria-label={`${pascalName} icon preview`} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[18px] font-serif text-text-base truncate">{pascalName}</h2>
          {iconCategory && <p className="text-[12px] text-text-base/40 mt-0.5">{iconCategory}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {contributorGithub && (
            <a
              href={`https://github.com/${contributorGithub}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`Contributed by @${contributorGithub}`}
              className="group flex items-center gap-1.5 bg-text-base/4 hover:bg-text-base/8 border border-text-base/8 hover:border-text-base/15 rounded-lg px-2 py-1 transition-all"
            >
              <img
                src={`https://github.com/${contributorGithub}.png?size=32`}
                alt={`@${contributorGithub}`}
                width={18}
                height={18}
                className="rounded-full"
                loading="lazy"
              />
              <span className="text-[11px] text-text-base/40 group-hover:text-text-base/70 transition-colors font-mono leading-none">
                @{contributorGithub}
              </span>
            </a>
          )}
          <code className="text-[11px] text-text-base/40 bg-text-base/4 border border-text-base/6 rounded-md px-2 py-1 font-mono">{name}</code>
        </div>
      </div>

      <div className="bg-text-base/3 border border-text-base/8 rounded-2xl p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.08em] text-text-base/35 font-semibold">Customize</span>
          <button onClick={onReset} title="Reset" aria-label="Reset" className="w-7 h-7 flex items-center justify-center rounded-md text-text-base/30 hover:text-text-base/75 hover:bg-text-base/6 transition-colors cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.5 2.8L3 8" /><path d="M3 3v5h5" /></svg>
          </button>
        </div>

        <div>
          <label className="text-[12px] text-text-base/50 mb-2 block">Weight</label>
          <div className="flex gap-2">
            {availableWeights.map((w) => (
              <button key={w} onClick={() => onSetActiveWeight(w)}
                className={`flex-1 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1 ${activeWeight === w ? 'bg-[#9B8AFB]/15 text-[#9B8AFB] border border-[#9B8AFB]/30' : 'bg-text-base/5 text-text-base/40 border border-text-base/10 hover:text-text-base/60'}`}>
                <span>{w.charAt(0).toUpperCase() + w.slice(1)}</span>
                {w === 'duotone' && (
                  <span className="text-[8px] font-bold uppercase tracking-wider px-1 rounded bg-[#9B8AFB]/20 text-[#9B8AFB]">Beta</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-[12px] text-text-base/50">Size</label>
            <span className="text-[12px] text-text-base/40 font-mono">{previewSize}px</span>
          </div>
          <input type="range" min={16} max={256} value={previewSize} onChange={(e) => onSetPreviewSize(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-text-base/10 accent-[#9B8AFB] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#9B8AFB] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(155, 138, 251,0.5)]" />
        </div>
      </div>
    </motion.div>
  );
}


