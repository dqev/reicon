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
      className="lg:sticky lg:top-24 lg:self-start flex flex-col gap-5 bg-[#181818] border border-white/[0.06] rounded-3xl p-5 md:p-6 shadow-none card-inset"
    >
      <div
        className="relative w-full aspect-square border border-white/[0.08] rounded-2xl flex items-center justify-center overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]"
        style={{
          backgroundImage:
            'conic-gradient(rgba(255, 255, 255, 0.05) 90deg, transparent 90deg 180deg, rgba(255, 255, 255, 0.05) 180deg 270deg, transparent 270deg)',
          backgroundSize: '16px 16px',
        }}
      >
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
                style={{ color: useCustomColor ? customColor : '#ffffff' }}
                aria-label={`${pascalName} icon preview`}
                dangerouslySetInnerHTML={{ __html: duotoneSvgInnerHtml }}
              />
            ) : (
              <re-icon icon={name} weight={activeWeight} size={previewSize} color={useCustomColor ? customColor : '#ffffff'} aria-label={`${pascalName} icon preview`} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 px-0.5">
        <div className="min-w-0">
          <h2 className="text-xl font-display font-medium text-white truncate tracking-tight">{pascalName}</h2>
          {iconCategory && <p className="text-xs text-white/40 mt-0.5 font-sans">{iconCategory}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {contributorGithub && (
            <a
              href={`https://github.com/${contributorGithub}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`Contributed by @${contributorGithub}`}
              className="group flex items-center gap-1.5 bg-[#2a2a2a] hover:bg-[#323232] border border-white/10 rounded-full px-3 py-1 transition-all"
            >
              <img
                src={`https://github.com/${contributorGithub}.png?size=32`}
                alt={`@${contributorGithub}`}
                width={18}
                height={18}
                className="rounded-full shrink-0"
                loading="lazy"
              />
              <span className="text-xs text-white/60 group-hover:text-white transition-colors font-mono leading-none">
                @{contributorGithub}
              </span>
            </a>
          )}
          <code className="text-xs text-white/60 bg-[#2a2a2a] border border-white/10 rounded-full px-3 py-1 font-mono">{name}</code>
        </div>
      </div>

      <div className="bg-[#121212] border border-white/[0.06] rounded-2xl p-4 flex flex-col gap-4 card-inset">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.1em] text-white/40 font-mono font-semibold">Customize</span>
          <button onClick={onReset} title="Reset" aria-label="Reset" className="w-7 h-7 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.5 2.8L3 8" /><path d="M3 3v5h5" /></svg>
          </button>
        </div>

        <div>
          <label className="text-xs text-white/50 mb-2 block font-medium">Weight</label>
          <div className="flex gap-2">
            {availableWeights.map((w) => (
              <button key={w} onClick={() => onSetActiveWeight(w)}
                className={`flex-1 px-3 py-2 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${activeWeight === w ? 'bg-[#9B8AFB] text-white border border-[#9B8AFB]' : 'bg-[#2a2a2a] text-white/50 border border-white/10 hover:text-white hover:bg-[#323232]'}`}>
                <span>{w.charAt(0).toUpperCase() + w.slice(1)}</span>
                {w === 'duotone' && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/20 text-white">Beta</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-white/50 font-medium">Size</label>
            <span className="text-xs text-white/40 font-mono">{previewSize}px</span>
          </div>
          <input type="range" min={16} max={256} value={previewSize} onChange={(e) => onSetPreviewSize(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-white/10 accent-[#9B8AFB] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#9B8AFB] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(155,138,251,0.6)]" />
        </div>
      </div>
    </motion.div>
  );
}


