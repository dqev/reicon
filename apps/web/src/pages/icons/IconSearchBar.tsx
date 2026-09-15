import { Search3, SidebarLeft, SidebarRight } from 'reicon-react';
import DesktopFilterDropdown, { SortOption } from '@/components/ui/DesktopFilterDropdown';

interface IconSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  sortBy?: SortOption;
  onSortChange?: (sort: SortOption) => void;
}

export default function IconSearchBar({
  searchQuery,
  onSearchChange,
  onFilterClick,
  isCollapsed,
  onToggleCollapse,
  sortBy = 'az',
  onSortChange,
}: IconSearchBarProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      {onToggleCollapse && (
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center p-2.5 rounded-full bg-text-base/[0.04] hover:bg-text-base/10 text-text-base/70 hover:text-text-base transition-all shrink-0 cursor-pointer"
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

      <div className="relative flex-1">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-base/70">
          <Search3 size={16} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search arrow, user, star..."
          className="w-full bg-text-base/[0.04] rounded-full pl-10 pr-9 py-2.5 text-sm text-text-base placeholder:text-text-base/70 outline-none focus:bg-text-base/10 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-base/70 hover:text-text-base transition-colors cursor-pointer"
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
        className="lg:hidden ml-auto flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-text-base/[0.04] hover:bg-text-base/10 text-text-base/70 hover:text-text-base text-sm font-medium transition-colors shrink-0 cursor-pointer"
        aria-label="Open filters"
      >
        <re-icon icon="filter" size="15" color="currentColor" />
        Filters
      </button>
    </div>
  );
}
