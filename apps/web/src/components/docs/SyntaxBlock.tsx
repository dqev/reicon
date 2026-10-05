import { Copy } from 'reicon-react';

interface SyntaxBlockProps {
  title: string;
  icon?: React.ReactNode;
  onCopy: () => void;
  copied: boolean;
  children: React.ReactNode;
}

/**
 * Modern code block with dark surface matching website design system tokens.
 */
export default function SyntaxBlock({
  title,
  icon,
  onCopy,
  copied,
  children,
}: SyntaxBlockProps) {
  return (
    <figure className="reicon-cb relative my-4 overflow-hidden rounded-xl bg-white/[0.03] text-sm">
      {/* Title bar */}
      <div className="relative flex items-center justify-between w-full h-10 pl-5 pr-1.5">
        <div className="flex items-center gap-2 truncate text-[13px] font-mono font-medium text-white/70">
          {icon && (
            <span className="inline-flex items-center justify-center text-[#9B8AFB] [&>svg]:w-3.5 [&>svg]:h-3.5">
              {icon}
            </span>
          )}
          <figcaption className="truncate">
            {title}
          </figcaption>
        </div>
        <button
          onClick={onCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          {copied ? <CheckIcon /> : <Copy size={14} />}
        </button>
      </div>

      {/* Code Area — inset card matching InstallTabs */}
      <div className="px-1.5 pb-1.5">
        <div className="bg-[#121212] rounded-md overflow-hidden relative">
          <pre className="px-5 py-4 text-[13px] font-mono leading-[1.7] overflow-x-auto whitespace-pre no-scrollbar focus-visible:outline-none text-white/90">
            {children}
          </pre>
        </div>
      </div>
    </figure>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
