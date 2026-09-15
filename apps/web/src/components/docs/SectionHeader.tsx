import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronExpandY, Copy, Check, ArrowLeft, ArrowRight } from 'reicon-react';
import { FRAMEWORKS } from './framework/constants';

interface Props {
  id: string;
  title: string;
  level?: 'h2' | 'h3' | 'h4';
  markdownContent?: string;
  icon?: React.ReactNode;
}

export default function SectionHeader({
  id,
  title,
  level = 'h3',
  markdownContent = '',
  icon,
}: Props) {
  const { framework: fwParam } = useParams<{ framework?: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Framework sequence navigation logic (JavaScript/Vanilla is #1, SVG is last)
  const isFrameworkHeader = !!fwParam && level === 'h2';
  const currentIdx = fwParam ? FRAMEWORKS.findIndex((f) => f.id === fwParam) : -1;
  const hasPrevFw = currentIdx > 0;
  const hasNextFw = currentIdx >= 0 && currentIdx < FRAMEWORKS.length - 1;

  const handlePrevFw = () => {
    if (hasPrevFw) {
      const prevId = FRAMEWORKS[currentIdx - 1].id;
      navigate(`/docs/${prevId}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNextFw = () => {
    if (hasNextFw) {
      const nextId = FRAMEWORKS[currentIdx + 1].id;
      navigate(`/docs/${nextId}`);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyMarkdown = async () => {
    try {
      const textToCopy = markdownContent || `# ${title}\n\nSection anchor: #${id}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy markdown', e);
    }
  };

  const copyLink = async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      setOpenDropdown(false);
    } catch (e) {
      console.error('Failed to copy link', e);
    }
  };

  const openInLLM = async (platform: 'v0' | 'chatgpt' | 'claude') => {
    const textToCopy = markdownContent || `# ${title}\n\nSection anchor: #${id}`;
    try { await navigator.clipboard.writeText(textToCopy); } catch { /* silent */ }
    const promptText = `Here is the Reicon documentation section for "${title}":\n\n${textToCopy}`;
    const urls: Record<string, string> = {
      v0: `https://v0.dev/chat?q=${encodeURIComponent(promptText)}`,
      chatgpt: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(promptText)}`,
      claude: `https://claude.ai/new?q=${encodeURIComponent(promptText)}`,
    };
    setOpenDropdown(false);
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  const iconWrapper = icon ? (
    <div className="shrink-0 flex items-center justify-center">
      {icon}
    </div>
  ) : null;

  const actionButtonGroup = (
    <div className="flex items-center gap-2 select-none shrink-0 font-sans">
      {/* Split Button: Copy Page | Dropdown Chevron */}
      <div ref={dropdownRef} className="relative inline-flex items-center">
        <div className="flex items-center bg-text-base/[0.04] backdrop-blur-lg rounded-full p-1 border-0 shadow-2xs">
          {/* Main Copy Action */}
          <button
            onClick={copyMarkdown}
            className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3.5 sm:py-1.5 text-xs sm:text-[13px] font-sans font-medium text-text-base/80 hover:text-text-base rounded-full hover:bg-text-base/10 transition-colors cursor-pointer select-none"
            aria-label="Copy markdown"
          >
            {copied ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <Copy size={14} className="text-text-base/70" />
            )}
            <span className="hidden sm:inline font-sans text-[13px] font-medium tracking-normal">{copied ? 'Copied!' : 'Copy Page'}</span>
          </button>

          {/* Divider */}
          <div className="w-[1px] h-3.5 bg-text-base/10 my-auto mx-0.5" />

          {/* Chevron Dropdown Trigger */}
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-text-base/10 text-text-base/60 hover:text-text-base transition-colors cursor-pointer"
            aria-label="Open markdown & AI options"
          >
            <ChevronExpandY size={13} className="text-text-base/60" />
          </button>
        </div>

        {/* Dropdown Menu (Top-to-Down, Simple instant dropdown) */}
        {openDropdown && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-[var(--dropdown-bg)] backdrop-blur-2xl border border-text-base/8 rounded-2xl shadow-xl z-50 overflow-hidden p-1.5 flex flex-col gap-0.5 font-sans">
            {/* Copy Link */}
            <button
              onClick={copyLink}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[12px] font-medium text-text-base/80 hover:text-text-base hover:bg-text-base/6 rounded-xl transition-colors cursor-pointer text-left"
            >
              <span className="flex items-center gap-2">
                <re-icon icon="link2" size={12} className="text-text-base/60" />
                {copiedLink ? 'Copied Link!' : 'Copy Section Link'}
              </span>
            </button>

            {/* View / Copy Markdown */}
            <button
              onClick={() => { copyMarkdown(); setOpenDropdown(false); }}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[12px] font-medium text-text-base/80 hover:text-text-base hover:bg-text-base/6 rounded-xl transition-colors cursor-pointer text-left group"
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 208 128" className="w-3.5 h-3.5 shrink-0 text-text-base/70 group-hover:text-text-base transition-colors" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" stroke="currentColor" strokeWidth="10" d="M15 5h178a10 10 0 0 1 10 10v98a10 10 0 0 1-10 10H15a10 10 0 0 1-10-10V15A10 10 0 0 1 15 5z" />
                  <path fill="currentColor" d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39H30zm125 0-30-33h20V30h20v35h20l-30 33z" />
                </svg>
                Copy Markdown
              </span>
            </button>

            {/* Open in v0 */}
            <button
              onClick={() => openInLLM('v0')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[12px] font-medium text-text-base/80 hover:text-text-base hover:bg-text-base/6 rounded-xl transition-colors cursor-pointer text-left group"
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0 text-text-base/70 group-hover:text-text-base transition-colors" fill="currentColor" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M9.50321 5.5H13.2532C13.3123 5.5 13.3704 5.5041 13.4273 5.51203L9.51242 9.42692C9.50424 9.36912 9.5 9.31006 9.5 9.25L9.5 5.5L8 5.5L8 9.25C8 10.7688 9.23122 12 10.75 12H14.5V10.5L10.75 10.5C10.6899 10.5 10.6309 10.4958 10.5731 10.4876L14.4904 6.57028C14.4988 6.62897 14.5032 6.68897 14.5032 6.75V10.5H16.0032V6.75C16.0032 5.23122 14.772 4 13.2532 4H9.50321V5.5ZM0 5V5.00405L5.12525 11.5307C5.74119 12.3151 7.00106 11.8795 7.00106 10.8822V5H5.50106V9.58056L1.90404 5H0Z" />
                </svg>
                Open in v0
              </span>
              <re-icon icon="arrow-up-right" size={11} className="text-text-base/30" />
            </button>

            {/* Open in ChatGPT */}
            <button
              onClick={() => openInLLM('chatgpt')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[12px] font-medium text-text-base/80 hover:text-text-base hover:bg-text-base/6 rounded-xl transition-colors cursor-pointer text-left group"
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 256 260" className="w-3.5 h-3.5 shrink-0 text-text-base/70 group-hover:text-text-base transition-colors" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
                </svg>
                Open in ChatGPT
              </span>
              <re-icon icon="arrow-up-right" size={11} className="text-text-base/30" />
            </button>

            {/* Open in Claude */}
            <button
              onClick={() => openInLLM('claude')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[12px] font-medium text-text-base/80 hover:text-text-base hover:bg-text-base/6 rounded-xl transition-colors cursor-pointer text-left"
            >
              <span className="flex items-center gap-2">
                <img src="/framework-logos/claude.svg" alt="" className="w-3.5 h-3.5 shrink-0" />
                Open in Claude
              </span>
              <re-icon icon="arrow-up-right" size={11} className="text-text-base/30" />
            </button>
          </div>
        )}
      </div>

      {/* Prev / Next Circular Navigation Buttons — ONLY shown on /docs/:framework main headers */}
      {isFrameworkHeader && (
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevFw}
            disabled={!hasPrevFw}
            aria-label="Previous framework"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-text-base/[0.04] backdrop-blur-lg hover:bg-text-base/10 text-text-base/80 hover:text-text-base transition-colors cursor-pointer border-0 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            onClick={handleNextFw}
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

  if (level === 'h2') {
    return (
      <h2 id={id} className="text-2xl font-serif text-text-base mb-6 scroll-mt-24 flex items-center justify-between w-full gap-3 group">
        <span className="flex items-center gap-3">
          {iconWrapper}
          <span>{title}</span>
        </span>
        {actionButtonGroup}
      </h2>
    );
  }

  if (level === 'h4') {
    return (
      <h4 id={id} className="text-md font-medium text-text-base mb-4 mt-8 scroll-mt-24 flex items-center justify-between w-full gap-3 group">
        <span className="flex items-center gap-3">
          {iconWrapper}
          <span>{title}</span>
        </span>
        {actionButtonGroup}
      </h4>
    );
  }

  return (
    <h3 id={id} className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24 flex items-center justify-between w-full gap-3 group">
      <span className="flex items-center gap-3">
        {iconWrapper}
        <span>{title}</span>
      </span>
      {actionButtonGroup}
    </h3>
  );
}
