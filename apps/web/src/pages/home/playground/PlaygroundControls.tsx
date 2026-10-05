import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Restart } from 'reicon-react';

const PRESET_COLORS = [
  '#ffffff',
  '#9B8AFB',
  '#ef4444',
  '#f59e0b',
  '#22c55e',
  '#3b82f6',
  '#ec4899',
  '#06b6d4',
];

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export default function PlaygroundControls({
  color,
  onChangeColor,
  size,
  onChangeSize,
  weight,
  onChangeWeight,
  onReset,
}: {
  color: string;
  onChangeColor: (c: string) => void;
  size: number;
  onChangeSize: (s: number) => void;
  weight: 'outline' | 'filled';
  onChangeWeight: (w: 'outline' | 'filled') => void;
  onReset: () => void;
}) {
  const safeColor = HEX_RE.test(color) ? color : '#ffffff';
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="w-full flex flex-col gap-5 pt-3 border-t border-white/[0.06]">
      {/* Section Header & Reset */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/40">
          Controls
        </span>
        <button
          onClick={onReset}
          className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          title="Reset defaults"
          aria-label="Reset controls"
        >
          <Restart size={14} />
        </button>
      </div>

      {/* Color Control */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <label className="text-[12px] font-medium text-white/70">Color</label>
          <div className="flex items-center gap-2 relative">
            <span className="text-[11px] font-mono text-white/50 uppercase">{safeColor}</span>
            <button
              onClick={() => setShowPicker(!showPicker)}
              aria-label="Custom color picker"
              className="w-4.5 h-4.5 rounded-full border border-white/20 cursor-pointer transition-transform hover:scale-110 shrink-0"
              style={{ backgroundColor: safeColor }}
            />
            {showPicker && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowPicker(false)} />
                <div className="absolute right-0 bottom-full mb-2 z-50 bg-[#1e1e1e] border border-white/10 rounded-xl p-3 shadow-2xl">
                  <HexColorPicker color={safeColor} onChange={onChangeColor} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Swatches Grid */}
        <div className="grid grid-cols-8 gap-1.5">
          {PRESET_COLORS.map((c) => {
            const isActive = color.toLowerCase() === c.toLowerCase();
            return (
              <button
                key={c}
                onClick={() => onChangeColor(c)}
                aria-label={`Color ${c}`}
                title={c}
                className={`w-full aspect-square rounded-full transition-all cursor-pointer relative flex items-center justify-center ${
                  isActive ? 'scale-110 ring-2 ring-white/80' : 'hover:scale-105 opacity-85 hover:opacity-100'
                }`}
                style={{ backgroundColor: c }}
              >
                {isActive && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      c.toLowerCase() === '#ffffff' ? 'bg-black/70' : 'bg-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Control */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-[12px] font-medium text-white/70">Size</label>
          <span className="text-[12px] font-mono text-white/50">{size}px</span>
        </div>
        <input
          type="range"
          min={80}
          max={180}
          value={size}
          onChange={(e) => onChangeSize(Number(e.target.value))}
          className="w-full h-1 bg-white/15 rounded-full appearance-none accent-white cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110"
        />
      </div>

      {/* Weight Control (Segmented Control) */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-medium text-white/70">Weight</label>
        <div className="grid grid-cols-2 p-1 bg-black/40 rounded-xl border border-white/[0.06] gap-1">
          {(['outline', 'filled'] as const).map((w) => {
            const isActive = weight === w;
            return (
              <button
                key={w}
                onClick={() => onChangeWeight(w)}
                className={`h-8 rounded-lg text-[12px] font-medium transition-all cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'bg-white/15 text-white shadow-xs'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {w.charAt(0).toUpperCase() + w.slice(1)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
