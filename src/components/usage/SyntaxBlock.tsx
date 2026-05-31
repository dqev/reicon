import { Copy } from 'reicon-react';

interface SyntaxBlockProps {
  title: string;
  icon?: React.ReactNode;
  onCopy: () => void;
  copied: boolean;
  children: React.ReactNode;
}

/**
 * Titled code block with the animate-ui "card-in-card" chrome:
 *
 *   ┌─ #0e0e10 ─────────────────────────────────┐
 *   │  [icon] title                       [📋]  │   ← title row, h-10
 *   │  ┌─ #09090b ─────────────────────────┐    │
 *   │  │  highlighted code…                │    │
 *   │  └───────────────────────────────────┘    │
 *   └───────────────────────────────────────────┘
 */
export default function SyntaxBlock({
  title,
  icon,
  onCopy,
  copied,
  children,
}: SyntaxBlockProps) {
  return (
    <figure className="reicon-cb relative my-0 overflow-hidden rounded-xl bg-[#0e0e10] text-sm">
      {/* Title row */}
      <div className="flex items-center gap-2 h-10 pl-4 pr-1.5">
        {icon && (
          <span className="inline-flex items-center justify-center text-white/60 [&>svg]:w-3.5 [&>svg]:h-3.5">
            {icon}
          </span>
        )}
        <figcaption className="flex-1 truncate text-[12.5px] font-medium text-white/55">
          {title}
        </figcaption>
        <button
          onClick={onCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          {copied ? <CheckIcon /> : <Copy size={14} />}
        </button>
      </div>

      {/* Body — inset card */}
      <div className="px-1.5 pb-1.5">
        <div className="bg-[#09090b] rounded-md">
          <pre className="p-4 text-[13px] font-mono leading-[1.7] overflow-x-auto whitespace-pre-wrap break-words focus-visible:outline-none">
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
