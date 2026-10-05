export default function PlaygroundCode({
  selected,
  size,
  weight,
  displayColor,
  icons,
  onSelect,
  iconNamesData,
}: {
  selected: string;
  size: number;
  weight: 'outline' | 'filled';
  displayColor: string;
  icons: string[];
  onSelect: (name: string) => void;
  pascalName: string;
  iconNamesData: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] uppercase tracking-[0.08em] text-white/30 font-semibold">ICONS</span>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 border-l border-t border-white/[0.05] rounded-[16px] overflow-hidden">
          {icons.map((name) => {
            const isSelected = name === selected;
            return (
              <button
                key={name}
                onClick={() => onSelect(name)}
                title={(iconNamesData || {})[name] || name}
                className={`aspect-square flex items-center justify-center border-r border-b border-white/[0.05] transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-white/[0.08]'
                    : 'bg-transparent hover:bg-white/[0.04]'
                }`}
              >
                <re-icon
                  icon={name}
                  size={26}
                  weight={weight}
                  color={displayColor}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


