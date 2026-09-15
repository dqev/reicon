import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type SortOption = 'az' | 'za';

interface DesktopFilterDropdownProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const OPTIONS = [
  {
    id: 'az' as SortOption,
    label: 'Alphabetical (A – Z)',
    icon: <re-icon icon="list-arrow-down2" size="16" color="currentColor" />,
  },
  {
    id: 'za' as SortOption,
    label: 'Alphabetical (Z – A)',
    icon: <re-icon icon="list-arrow-up2" size="16" color="currentColor" />,
  },
];

export default function DesktopFilterDropdown({ sortBy, onSortChange }: DesktopFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      window.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside, true);
    };
  }, [open]);

  return (
    <div className="relative hidden lg:block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer' }}
        className={`flex items-center justify-center p-2.5 rounded-full bg-text-base/[0.04] hover:bg-text-base/10 text-text-base/70 hover:text-text-base transition-all shrink-0 cursor-pointer ${
          open ? 'bg-text-base/10 text-text-base' : ''
        }`}
        aria-label={open ? "Close menu" : "Sort & Filter"}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-opacity duration-150">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <re-icon icon="sort-alpha" size="18" color="currentColor" className="transition-opacity duration-150" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 6 }}
            transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute right-0 top-full mt-2.5 w-52 p-1.5 rounded-2xl bg-[var(--dropdown-bg)] shadow-2xl z-50 text-sm select-none"
          >
            {/* Top caret arrow pointer */}
            <div className="absolute -top-1.5 right-3.5 w-3 h-3 bg-[var(--dropdown-bg)] rotate-45 z-10 pointer-events-none" />

            <div className="px-3 py-1.5 border-b border-text-base/6 text-[11px] font-semibold tracking-wider text-text-base/40 uppercase">
              Sort Order
            </div>

            <div className="py-1 flex flex-col gap-0.5">
              {OPTIONS.map((opt) => {
                const isSelected = sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      onSortChange(opt.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer rounded-xl ${
                      isSelected
                        ? 'text-[#9B8AFB] bg-[#9B8AFB]/10 font-semibold'
                        : 'text-text-base/70 hover:text-text-base hover:bg-text-base/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={isSelected ? 'text-[#9B8AFB]' : 'opacity-60'}>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </div>
                    {isSelected && (
                      <svg className="w-3.5 h-3.5 text-[#9B8AFB] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
