export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-text-base/10 border-t-[#9B8AFB] rounded-full animate-spin" />
        <span className="text-sm text-text-base/40 font-mono">Loading…</span>
      </div>
    </div>
  );
}
