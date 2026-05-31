import { Copy } from 'reicon-react';

interface CodeBlockProps {
  code: string;
  onCopy: () => void;
  copied: boolean;
  language?: string;
}

/**
 * Single-line / single-block code surface with the animate-ui "card-in-card"
 * chrome: outer #0e0e10 wrapper, inner #09090b code surface, floating copy
 * button in the top-right corner with rounded-bl-xl.
 */
export default function CodeBlock({ code, onCopy, copied }: CodeBlockProps) {
  return (
    <figure className="reicon-cb relative my-0 overflow-hidden rounded-xl bg-[#0e0e10] text-sm group">
      {/* Floating copy button */}
      <button
        onClick={onCopy}
        aria-label={copied ? 'Copied' : 'Copy code'}
        className="absolute right-0 top-0 z-[2] bg-[#0e0e10] p-1.5 rounded-bl-xl"
      >
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors">
          {copied ? (
            <CheckIcon />
          ) : (
            <Copy size={14} />
          )}
        </span>
      </button>

      {/* Body — inset card */}
      <div className="p-1.5">
        <div className="bg-[#09090b] rounded-md">
          <pre className="p-4 text-[13px] font-mono text-white/75 overflow-x-auto whitespace-pre-wrap break-words leading-[1.7] focus-visible:outline-none">
            {code}
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
