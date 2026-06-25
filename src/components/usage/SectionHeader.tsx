import { useState } from 'react';
import { Link as LinkIcon, Copy as CopyIcon } from 'reicon-react';

interface Props {
  id: string;
  title: string;
  level?: 'h2' | 'h3' | 'h4';
  markdownContent: string;
  icon?: React.ReactNode;
}

export default function SectionHeader({ id, title, level = 'h3', markdownContent, icon }: Props) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  const copyLink = async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.error('Failed to copy link', e);
    }
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
    } catch (e) {
      console.error('Failed to copy markdown', e);
    }
  };

  const buttonClasses = "p-1 rounded-md bg-white/[0.04] border border-white/10 text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-150 cursor-pointer flex items-center justify-center relative group/btn";

  const actions = (
    <span className="ml-3 inline-flex items-center gap-1.5 align-middle select-none">
      {/* Copy deep link */}
      <button
        onClick={copyLink}
        className={buttonClasses}
        title="Copy deep link to section"
        aria-label="Copy deep link"
      >
        {copiedLink ? (
          <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        ) : (
          <LinkIcon size={14} />
        )}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 text-[10px] bg-[#0e0e10] border border-white/10 text-white/70 rounded opacity-0 pointer-events-none group-hover/btn:opacity-100 transition-opacity whitespace-nowrap z-50">
          {copiedLink ? 'Copied link!' : 'Copy Link'}
        </span>
      </button>

      {/* Copy section markdown */}
      <button
        onClick={copyMarkdown}
        className={buttonClasses}
        title="Copy section markdown"
        aria-label="Copy markdown"
      >
        {copiedMd ? (
          <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        ) : (
          <CopyIcon size={14} />
        )}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 text-[10px] bg-[#0e0e10] border border-white/10 text-white/70 rounded opacity-0 pointer-events-none group-hover/btn:opacity-100 transition-opacity whitespace-nowrap z-50">
          {copiedMd ? 'Copied markdown!' : 'Copy Markdown'}
        </span>
      </button>
    </span>
  );

  const iconWrapper = icon ? (
    <div className="shrink-0 flex items-center justify-center">
      {icon}
    </div>
  ) : null;

  if (level === 'h2') {
    return (
      <h2 id={id} className="text-2xl font-serif text-white mb-6 scroll-mt-24 group flex items-center justify-between w-full gap-3">
        <span className="flex items-center gap-3">
          {iconWrapper}
          <span>{title}</span>
        </span>
        {actions}
      </h2>
    );
  }

  if (level === 'h4') {
    return (
      <h4 id={id} className="text-md font-medium text-white mb-4 mt-8 scroll-mt-24 group flex items-center justify-between w-full gap-3">
        <span className="flex items-center gap-3">
          {iconWrapper}
          <span>{title}</span>
        </span>
        {actions}
      </h4>
    );
  }

  return (
    <h3 id={id} className="text-lg font-serif text-white mb-4 mt-10 scroll-mt-24 group flex items-center justify-between w-full gap-3">
      <span className="flex items-center gap-3">
        {iconWrapper}
        <span>{title}</span>
      </span>
      {actions}
    </h3>
  );
}
