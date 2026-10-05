import { motion } from 'motion/react';
import { HexColorPicker } from 'react-colorful';
import { EASE, EXPORT_SIZES } from './utils';

interface IconActionsProps {
  pascalName: string;
  name?: string;
  activeWeight: string;
  exportSize: number;
  useCustomColor: boolean;
  customColor: string;
  isColorPickerOpen: boolean;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
  onCopySvg: () => void;
  onDownloadSvg: () => void;
  onDownloadPng: () => void;
  onDownloadWebp: () => void;
  onSetExportSize: (s: number) => void;
  onSetUseCustomColor: (v: boolean) => void;
  onSetCustomColor: (c: string) => void;
  onSetIsColorPickerOpen: (v: boolean) => void;
}

export default function IconActions({
  pascalName, name, activeWeight, exportSize,
  useCustomColor, customColor, isColorPickerOpen, copiedField,
  onCopy, onCopySvg, onDownloadSvg, onDownloadPng, onDownloadWebp,
  onSetExportSize, onSetUseCustomColor, onSetCustomColor, onSetIsColorPickerOpen,
}: IconActionsProps) {
  return (
    <div className="bg-[#181818] border border-white/[0.06] rounded-3xl p-4 md:p-5 flex flex-col gap-3 shadow-none">
      <div className="flex flex-wrap gap-2">
        {([['Copy JSX', () => onCopy(`<${pascalName} />`, 'jsx'), 'jsx'],
        ['Copy Name', () => onCopy(name || '', 'name'), 'name'],
        ['Copy SVG', onCopySvg, 'svg']] as const).map(([label, fn, field]) => (
          <motion.button key={field} onClick={fn} whileTap={{ scale: 0.96 }}
            className={`flex-1 min-w-[110px] text-xs font-medium py-2 px-3.5 rounded-full border transition-all cursor-pointer ${copiedField === field ? 'bg-[#9B8AFB] border-[#9B8AFB] text-white' : 'bg-[#2a2a2a] border-white/10 text-white hover:bg-[#323232]'}`}>
            {copiedField === field ? 'Copied!' : label}
          </motion.button>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-white/40 uppercase tracking-[0.1em] font-mono font-semibold">Export size</span>
          <span className="text-xs text-white/50 font-mono">{exportSize}px</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {EXPORT_SIZES.map((s) => (
            <button key={s} onClick={() => onSetExportSize(s)}
              className={`flex-1 min-w-[38px] text-xs font-mono font-medium py-1 px-2 rounded-full border transition-all cursor-pointer ${exportSize === s ? 'bg-[#9B8AFB] border-[#9B8AFB] text-white' : 'bg-[#2a2a2a] border-white/10 text-white/50 hover:text-white hover:bg-[#323232]'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {([['SVG', onDownloadSvg], ['PNG', onDownloadPng], ['WebP', onDownloadWebp]] as const).map(([label, fn]) => (
          <motion.button key={label} onClick={fn} whileTap={{ scale: 0.96 }}
            className="flex-1 text-xs font-medium py-2 px-3.5 rounded-full border bg-[#2a2a2a] border-white/10 text-white hover:bg-[#323232] transition-all flex items-center justify-center gap-1.5 cursor-pointer">
            <svg className="w-3.5 h-3.5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
            {label}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] pt-2.5 mt-0.5 relative">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50 font-medium">Custom Color</span>
          <button
            onClick={() => onSetUseCustomColor(!useCustomColor)}
            className={`relative w-8 h-4.5 rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${useCustomColor ? 'bg-[#9B8AFB]' : 'bg-white/10'}`}
            aria-label="Toggle custom color"
          >
            <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200 shadow-sm absolute top-0.5 left-0.5 ${useCustomColor ? 'translate-x-3.5' : 'translate-x-0'}`} />
          </button>
        </div>

        {useCustomColor && (
          <div className="relative">
            <button
              onClick={() => onSetIsColorPickerOpen(!isColorPickerOpen)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#2a2a2a] border border-white/10 hover:bg-[#323232] text-xs font-mono text-white transition-colors cursor-pointer"
              style={{ borderColor: `${customColor}60` }}
            >
              <span className="w-3 h-3 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: customColor }} />
              {customColor.toUpperCase()}
            </button>

            {isColorPickerOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => onSetIsColorPickerOpen(false)} />
                <div className="absolute right-0 bottom-full mb-2 z-50 bg-[#1e1e1e] border border-white/10 rounded-2xl p-3.5 shadow-2xl flex flex-col gap-2.5 min-w-[200px]" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1)' }}>
                  <HexColorPicker color={customColor} onChange={onSetCustomColor} />
                  <div className="flex gap-1.5 items-center">
                    <span className="text-[10px] text-white/40 font-mono">HEX</span>
                    <input
                      type="text"
                      value={customColor}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.startsWith('#')) {
                          if (val.length <= 7) onSetCustomColor(val);
                        } else {
                          if (val.length <= 6) onSetCustomColor('#' + val);
                        }
                      }}
                      className="w-full bg-[#121212] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white text-center focus:outline-none focus:border-[#9B8AFB]/60"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
