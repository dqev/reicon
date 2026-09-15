export default function PlaygroundPreview({
  selected,
  size,
  weight,
  displayColor,
  pascalName,
}: {
  selected: string;
  size: number;
  weight: 'outline' | 'filled';
  displayColor: string;
  pascalName: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-square max-w-[220px] mx-auto bg-text-base/2 border border-text-base/8 rounded-2xl flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--border-muted) 1px, transparent 1px), linear-gradient(to bottom, var(--border-muted) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            backgroundPosition: 'center center',
          }}
        />
        <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-text-base/35 tabular-nums select-none">
          {size}px
        </span>
        <span className="absolute bottom-2.5 left-3 text-[8px] font-mono text-text-base/25 select-none lowercase">
          {weight}
        </span>

        <re-icon icon={selected} size={96} weight={weight} color={displayColor} />
      </div>

      <div className="w-full mt-3 flex items-center justify-start">
        <span className="text-[15px] font-serif font-semibold text-text-base truncate">{pascalName}</span>
      </div>
    </div>
  );
}
