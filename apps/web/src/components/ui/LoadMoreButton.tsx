interface LoadMoreButtonProps {
  visibleCount: number;
  totalCount: number;
  onLoadMore: () => void;
  itemType?: string;
}

export default function LoadMoreButton({
  visibleCount,
  totalCount,
  onLoadMore,
}: LoadMoreButtonProps) {
  if (visibleCount >= totalCount) return null;

  return (
    <div className="mt-12 mb-8 flex items-center justify-center">
      <button
        type="button"
        onClick={onLoadMore}
        className="px-6 py-2.5 rounded-full text-xs font-medium bg-text-base text-bg-base hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-sm flex items-center gap-1"
      >
        <span>Load More</span>
        <re-icon icon="hand-heart" size="16" color="currentColor" />
      </button>
    </div>
  );
}
