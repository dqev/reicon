import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Restart } from 'reicon-react';

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function ColorPicker({ color, onChange, theme }: { color: string; onChange: (c: string) => void; theme: string }) {
    const isLight = theme === 'light';
    const presets = isLight
        ? ['#111111', '#9B8AFB', '#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#06b6d4']
        : ['#ffffff', '#9B8AFB', '#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#06b6d4'];
    const safeColor = HEX_RE.test(color) ? color : (isLight ? '#111111' : '#ffffff');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <label className="text-[13px] text-text-base/50 mb-2 block">Color</label>
            <div className="grid grid-cols-8 gap-1.5 mb-2">
                {presets.map((c) => (
                    <button
                        key={c}
                        onClick={() => onChange(c)}
                        aria-label={`Set color ${c}`}
                        title={c}
                        className={`w-full aspect-square rounded-md transition-transform hover:scale-110 cursor-pointer ${color.toLowerCase() === c.toLowerCase()
                            ? 'ring-2 ring-text-base/70 ring-offset-2 ring-offset-bg-base'
                            : 'border border-text-base/15'
                            }`}
                        style={{ backgroundColor: c }}
                    />
                ))}
            </div>
            <div className="flex items-center gap-1.5 relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Pick a custom color"
                    className="w-9 h-9 shrink-0 rounded-lg border border-text-base/10 cursor-pointer bg-transparent flex items-center justify-center hover:bg-text-base/5"
                >
                    <span className="w-5 h-5 rounded-md border border-text-base/20 shadow-sm" style={{ backgroundColor: safeColor }} />
                </button>
                <input
                    type="text"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    spellCheck={false}
                    className="flex-1 min-w-0 bg-text-base/5 border border-text-base/10 rounded-lg px-3 py-2 text-[13px] text-text-base/70 font-mono outline-none focus:border-text-base/20 uppercase"
                />
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <div className="absolute left-0 bottom-full mb-2 z-50 bg-[var(--dropdown-bg)] border border-text-base/8 rounded-xl p-3.5 shadow-lg flex flex-col gap-2.5 min-w-[200px]">
                            <HexColorPicker color={safeColor} onChange={onChange} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function PlaygroundControls({
    color,
    onChangeColor,
    theme,
    size,
    onChangeSize,
    weight,
    onChangeWeight,
    onReset,
}: {
    color: string;
    onChangeColor: (c: string) => void;
    theme: string;
    size: number;
    onChangeSize: (s: number) => void;
    weight: 'outline' | 'filled';
    onChangeWeight: (w: 'outline' | 'filled') => void;
    onReset: () => void;
}) {
    return (
        <div className="w-full mt-6 pt-5 border-t border-text-base/6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.08em] text-text-base/30 font-semibold">Controls</span>
                <button onClick={onReset} className="w-7 h-7 flex items-center justify-center rounded-md text-text-base/30 hover:text-text-base/60 hover:bg-text-base/5 transition-colors cursor-pointer" title="Reset" aria-label="Reset controls">
                    <Restart size={16} />
                </button>
            </div>

            <ColorPicker color={color} onChange={onChangeColor} theme={theme} />

            <div>
                <div className="flex justify-between mb-2">
                    <label className="text-[13px] text-text-base/50">Size</label>
                    <span className="text-[13px] text-text-base/30 font-mono">{size}px</span>
                </div>
                <input type="range" min={16} max={48} value={size} onChange={(e) => onChangeSize(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none bg-text-base/10 accent-[#9B8AFB] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#9B8AFB] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(155, 138, 251,0.5)]"
                />
            </div>

            <div>
                <label className="text-[13px] text-text-base/50 mb-2 block">Weight</label>
                <div className="flex gap-2">
                    {(['outline', 'filled'] as const).map((w) => (
                        <button key={w} onClick={() => onChangeWeight(w)}
                            className={`flex-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${weight === w
                                ? 'bg-[#9B8AFB]/15 text-[#9B8AFB] border border-[#9B8AFB]/30'
                                : 'bg-text-base/5 text-text-base/40 border border-text-base/10 hover:text-text-base/60'
                                }`}
                        >
                            {w.charAt(0).toUpperCase() + w.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
