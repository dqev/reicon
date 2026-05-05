interface CodeBlockProps {
  code: string;
  onCopy: () => void;
  copied: boolean;
}

export default function CodeBlock({ code, onCopy, copied }: CodeBlockProps) {
  return (
    <div className="relative group">
      <pre className="bg-black/30 border border-white/[0.06] rounded-lg px-4 py-3 text-[13px] text-white/70 font-mono overflow-x-auto whitespace-pre-wrap break-all">
        {code}
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 text-[10px] text-white/30 hover:text-white/60 transition-colors opacity-0 group-hover:opacity-100 bg-white/5 px-2 py-1 rounded"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
