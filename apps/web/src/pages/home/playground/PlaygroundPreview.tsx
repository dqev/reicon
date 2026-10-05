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
      <div
        className="relative w-full aspect-square border border-white/[0.08] rounded-[16px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            'conic-gradient(rgba(255, 255, 255, 0.05) 90deg, transparent 90deg 180deg, rgba(255, 255, 255, 0.05) 180deg 270deg, transparent 270deg)',
          backgroundSize: '16px 16px',
        }}
      >
        <re-icon icon={selected} size={size} weight={weight} color={displayColor} />
      </div>

      <div className="w-full mt-3 flex items-center justify-start">
        <span className="text-[15px] font-sans font-medium text-[#ededed] truncate">{pascalName}</span>
      </div>
    </div>
  );
}


