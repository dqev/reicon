import { Search3, SidebarLeft, SidebarRight } from 'reicon-react';
import DesktopFilterDropdown, { SortOption } from '@/components/ui/DesktopFilterDropdown';
import type { Prediction } from 'gpu-icons-search';

interface IconSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  sortBy?: SortOption;
  onSortChange?: (sort: SortOption) => void;
  predictions?: Prediction[];
  onSelectPrediction?: (word: string) => void;
}

export default function IconSearchBar({
  searchQuery,
  onSearchChange,
  onFilterClick,
  isCollapsed,
  onToggleCollapse,
  sortBy = 'az',
  onSortChange,
  predictions = [],
  onSelectPrediction,
}: IconSearchBarProps) {
  // Distinct typo corrections vs related terms
  const corrections = predictions.filter((p) => p.kind === 'correction');
  const related = predictions.filter((p) => p.kind !== 'correction').slice(0, 5);

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.09] text-[#9a9a9a] hover:text-[#fbfbfb] transition-all shrink-0 cursor-pointer border border-white/[0.04]"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <SidebarRight size={18} color="currentColor" />
            ) : (
              <SidebarLeft size={18} color="currentColor" />
            )}
          </button>
        )}

        <div className="relative flex-1 min-w-0">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9a9a]">
            <Search3 size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search arrow, user, movie, calendar..."
            aria-label="Search icons"
            className="w-full bg-white/[0.05] border border-white/[0.04] rounded-full pl-10 pr-9 py-2.5 text-sm text-[#fbfbfb] placeholder:text-[#9a9a9a] outline-none focus:bg-white/[0.09] transition-all"
          />

          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9a9a9a] hover:text-[#fbfbfb] transition-colors cursor-pointer p-0.5"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {onSortChange && (
          <DesktopFilterDropdown sortBy={sortBy} onSortChange={onSortChange} />
        )}

        <button
          onClick={onFilterClick}
          className="lg:hidden ml-auto flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.09] text-[#9a9a9a] hover:text-[#fbfbfb] text-sm font-medium transition-colors shrink-0 cursor-pointer border border-white/[0.04]"
          aria-label="Open filters"
        >
          <re-icon icon="filter" size="15" color="currentColor" />
          Filters
        </button>
      </div>

      {/* Semantic suggestion pills when querying */}
      {searchQuery.trim().length >= 2 && (corrections.length > 0 || related.length > 0) && (
        <div className="mt-2 w-full max-w-full flex flex-wrap items-center gap-1.5 text-xs">
          {corrections.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-[#9a9a9a]">
              <span className="text-[11px] text-[#737373]">Did you mean:</span>
              {corrections.slice(0, 2).map((item) => (
                <button
                  key={item.word}
                  type="button"
                  onClick={() => onSelectPrediction?.(item.word)}
                  className="px-2.5 py-0.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30 transition-all cursor-pointer text-xs max-w-[130px] sm:max-w-none truncate"
                >
                  {item.word}
                </button>
              ))}
            </div>
          )}

          {related.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-[#9a9a9a]">
              <span className="text-[11px] text-[#737373]">Related:</span>
              {related.slice(0, 4).map((item) => (
                <button
                  key={item.word}
                  type="button"
                  onClick={() => onSelectPrediction?.(item.word)}
                  className="px-2.5 py-0.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] text-[#cfcfcf] hover:text-[#fbfbfb] border border-white/[0.06] transition-all cursor-pointer text-xs max-w-[130px] sm:max-w-none truncate"
                >
                  {item.word}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
