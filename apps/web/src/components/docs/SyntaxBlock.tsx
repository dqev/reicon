import { Copy } from 'reicon-react';

interface SyntaxBlockProps {
  title: string;
  icon?: React.ReactNode;
  onCopy: () => void;
  copied: boolean;
  children: React.ReactNode;
}

/**
 * Titled code block with the animate-ui "card-in-card" chrome.
 */
export default function SyntaxBlock({
  title,
  icon,
  onCopy,
  copied,
  children,
}: SyntaxBlockProps) {
  return (
    <figure className="reicon-cb relative my-0 overflow-hidden rounded-xl bg-text-base/3 text-sm">
      {/* Title row */}
      <div className="flex items-center gap-2 h-10 pl-4 pr-1.5">
        {icon && (
          <span className="inline-flex items-center justify-center text-text-base/60 [&>svg]:w-3.5 [&>svg]:h-3.5">
            {icon}
          </span>
        )}
        <figcaption className="flex-1 truncate text-[12.5px] font-medium text-text-base/55">
          {title}
        </figcaption>
        <button
          onClick={onCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="inline-flex items-center justify-center w-7 h-7 rounded-md text-text-base/40 hover:text-text-base hover:bg-text-base/8 transition-colors cursor-pointer"
        >
          {copied ? <CheckIcon /> : <Copy size={14} />}
        </button>
      </div>

      {/* Body — inset card */}
      <div className="px-1.5 pb-1.5">
        <div className="bg-bg-base rounded-md">
          <pre className="p-4 text-[13px] font-mono leading-[1.7] overflow-x-auto whitespace-pre-wrap break-words focus-visible:outline-none text-text-base">
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
