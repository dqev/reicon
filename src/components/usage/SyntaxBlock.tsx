interface SyntaxBlockProps {
  title: string;
  onCopy: () => void;
  copied: boolean;
  children: React.ReactNode;
}

export default function SyntaxBlock({ title, onCopy, copied, children }: SyntaxBlockProps) {
  return (
    <div className="bg-[#0e0e10] border border-white/[0.06] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">{title}</span>
        <button
          onClick={onCopy}
          className="text-[11px] text-white/30 hover:text-white/60 transition-colors flex items-center gap-1"
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-[13px] font-mono leading-[1.7] overflow-x-auto whitespace-pre-wrap break-all">
        {children}
      </pre>
    </div>
  );
}
