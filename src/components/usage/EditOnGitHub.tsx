import { SiGithub } from 'react-icons/si';

const REPO_BASE = 'https://github.com/dqev/reicon';

interface EditOnGitHubProps {
  /** Path relative to repo root, e.g. "src/pages/usage/ReactUsage.tsx" */
  filePath: string;
  /** Branch name — defaults to "main" */
  branch?: string;
}

export default function EditOnGitHub({ filePath, branch = 'main' }: EditOnGitHubProps) {
  const editUrl = `${REPO_BASE}/edit/${branch}/${filePath}`;
  const viewUrl = `${REPO_BASE}/blob/${branch}/${filePath}`;

  return (
    <div className="mt-16 pt-8 border-t border-text-base/6 flex flex-wrap items-center gap-4 text-[13px]">
      <a
        href={editUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-text-base/40 hover:text-text-base/80 transition-colors group cursor-pointer"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:text-[#6C5CE7] transition-colors"
        >
          <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
        Edit this page
      </a>

      <span className="text-text-base/10">·</span>

      <a
        href={viewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-text-base/40 hover:text-text-base/80 transition-colors group cursor-pointer"
      >
        <SiGithub size={13} className="group-hover:text-text-base transition-colors" />
        View source
      </a>

      <span className="text-text-base/10">·</span>

      <a
        href={`${REPO_BASE}/issues/new`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-text-base/40 hover:text-text-base/80 transition-colors cursor-pointer"
      >
        Report issue
      </a>
    </div>
  );
}
