import { ChevronExpandY, Copy, Check, ArrowLeft, ArrowRight } from 'reicon-react';
import { SiClaude } from 'react-icons/si';

interface Props {
  copiedPage: boolean;
  openDropdown: boolean;
  openDropdownRef: React.RefObject<HTMLDivElement | null>;
  onCopyMarkdown: () => void;
  onOpenDropdown: (v: boolean) => void;
  onOpenInLLM: (platform: string) => void;
  githubEditUrl?: string;
  githubUrl?: string;
  hasPrevFw?: boolean;
  hasNextFw?: boolean;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
}

export default function DocsActionsBar({
  copiedPage,
  openDropdown,
  openDropdownRef,
  onCopyMarkdown,
  onOpenDropdown,
  onOpenInLLM,
  hasPrevFw,
  hasNextFw,
  onNavigatePrev,
  onNavigateNext,
}: Props) {
  return (
    <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full">
      {/* Split Button: Copy Page | Dropdown Arrow */}
      <div ref={openDropdownRef} className="relative inline-flex items-center">
        <div className="flex items-center bg-text-base/[0.04] backdrop-blur-lg rounded-full p-1 border-0 shadow-2xs">
          {/* Main Copy Action */}
          <button
            onClick={onCopyMarkdown}
            className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3.5 sm:py-1.5 text-xs sm:text-[13px] font-medium text-text-base/80 hover:text-text-base rounded-full hover:bg-text-base/10 transition-colors cursor-pointer select-none"
            aria-label="Copy page as markdown"
          >
            {copiedPage ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <Copy size={14} className="text-text-base/70" />
            )}
            <span className="hidden sm:inline">{copiedPage ? 'Copied!' : 'Copy Page'}</span>
          </button>

          {/* Vertical Divider */}
          <div className="w-[1px] h-3.5 bg-text-base/10 my-auto mx-0.5" />

          {/* Chevron Dropdown Trigger */}
          <button
            onClick={() => onOpenDropdown(!openDropdown)}
            className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-text-base/10 text-text-base/60 hover:text-text-base transition-colors cursor-pointer"
            aria-label="Open markdown & AI options"
          >
            <ChevronExpandY size={13} className="text-text-base/60" />
          </button>
        </div>

        {/* Dropdown Menu */}
        {openDropdown && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--dropdown-bg)] backdrop-blur-2xl border border-text-base/8 rounded-2xl shadow-xl z-50 overflow-hidden p-1.5 flex flex-col gap-0.5 font-sans">
            {/* View as Markdown */}
            <button
              onClick={() => onOpenInLLM('markdown')}
              className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-medium text-text-base/80 hover:text-text-base hover:bg-text-base/6 rounded-xl transition-colors cursor-pointer text-left group"
            >
              <span className="flex items-center gap-2.5">
                <svg viewBox="0 0 208 128" className="w-4 h-4 shrink-0 text-text-base/70 group-hover:text-text-base transition-colors" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" stroke="currentColor" strokeWidth="10" d="M15 5h178a10 10 0 0 1 10 10v98a10 10 0 0 1-10 10H15a10 10 0 0 1-10-10V15A10 10 0 0 1 15 5z" />
                  <path fill="currentColor" d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39H30zm125 0-30-33h20V30h20v35h20l-30 33z" />
                </svg>
                View as Markdown
              </span>
              <re-icon icon="copy" size={12} className="text-text-base/30" />
            </button>

            {/* Open in v0 */}
            <button
              onClick={() => onOpenInLLM('v0')}
              className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-medium text-text-base/80 hover:text-text-base hover:bg-text-base/6 rounded-xl transition-colors cursor-pointer text-left group"
            >
              <span className="flex items-center gap-2.5">
                <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0 text-text-base/70 group-hover:text-text-base transition-colors" fill="currentColor" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M9.50321 5.5H13.2532C13.3123 5.5 13.3704 5.5041 13.4273 5.51203L9.51242 9.42692C9.50424 9.36912 9.5 9.31006 9.5 9.25L9.5 5.5L8 5.5L8 9.25C8 10.7688 9.23122 12 10.75 12H14.5V10.5L10.75 10.5C10.6899 10.5 10.6309 10.4958 10.5731 10.4876L14.4904 6.57028C14.4988 6.62897 14.5032 6.68897 14.5032 6.75V10.5H16.0032V6.75C16.0032 5.23122 14.772 4 13.2532 4H9.50321V5.5ZM0 5V5.00405L5.12525 11.5307C5.74119 12.3151 7.00106 11.8795 7.00106 10.8822V5H5.50106V9.58056L1.90404 5H0Z" />
                </svg>
                Open in v0
              </span>
              <re-icon icon="arrow-up-right" size={12} className="text-text-base/30" />
            </button>

            {/* Open in ChatGPT */}
            <button
              onClick={() => onOpenInLLM('chatgpt')}
              className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-medium text-text-base/80 hover:text-text-base hover:bg-text-base/6 rounded-xl transition-colors cursor-pointer text-left group"
            >
              <span className="flex items-center gap-2.5">
                <svg viewBox="0 0 256 260" className="w-4 h-4 shrink-0 text-text-base/70 group-hover:text-text-base transition-colors" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
                </svg>
                Open in ChatGPT
              </span>
              <re-icon icon="arrow-up-right" size={12} className="text-text-base/30" />
            </button>

            {/* Open in Claude */}
            <button
              onClick={() => onOpenInLLM('claude')}
              className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-medium text-text-base/80 hover:text-text-base hover:bg-text-base/6 rounded-xl transition-colors cursor-pointer text-left"
            >
              <span className="flex items-center gap-2.5">
                <img src="/framework-logos/claude.svg" alt="" className="w-4 h-4 shrink-0" />
                Open in Claude
              </span>
              <re-icon icon="arrow-up-right" size={12} className="text-text-base/30" />
            </button>


          </div>
        )}
      </div>

      {/* Prev / Next Circular Navigation Buttons */}
      {(onNavigatePrev || onNavigateNext) && (
        <div className="flex items-center gap-1.5">
          <button
            onClick={onNavigatePrev}
            disabled={!hasPrevFw}
            aria-label="Previous framework"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-text-base/[0.04] backdrop-blur-lg hover:bg-text-base/10 text-text-base/80 hover:text-text-base transition-colors cursor-pointer border-0 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            onClick={onNavigateNext}
            disabled={!hasNextFw}
            aria-label="Next framework"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-text-base/[0.04] backdrop-blur-lg hover:bg-text-base/10 text-text-base/80 hover:text-text-base transition-colors cursor-pointer border-0 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
