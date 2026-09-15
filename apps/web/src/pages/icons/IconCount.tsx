interface IconCountProps {
  count: number;
  ready: boolean;
}

export default function IconCount({ count, ready }: IconCountProps) {
  return (
    <div className="text-[12px] text-text-base/30 mb-4">
      {ready ? (
        <>{count} icon{count !== 1 ? 's' : ''}</>
      ) : (
        <span className="inline-block h-3 w-16 rounded bg-text-base/7 animate-pulse align-middle" />
      )}
    </div>
  );
}
