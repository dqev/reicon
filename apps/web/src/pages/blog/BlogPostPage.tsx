import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getBlogPostBySlug } from '@/data/blog-posts';
import SyntaxBlock from '@/components/docs/SyntaxBlock';

const MCP_CONFIG = `{
  "mcpServers": {
    "reicon": {
      "command": "npx",
      "args": ["reicon-mcp"]
    }
  }
}`;

const AGENT_PROMPT = `You have access to the reicon MCP server (2,700+ icons, outline & filled).
- Always call \`search_icons\` to find the exact icon name before writing an import or JSX component. Never guess icon names.
- When you find the right icon, call \`get_icon_code\` with the user's framework (react, vue, svelte) or use standard \`import { IconName } from 'reicon-react'\`.
- Prefer outline weight unless the user asks for filled icons.`;

const REACT_CODE = `import { Lock, Calendar, MovieClap, ShieldCheck } from 'reicon-react';

export function SettingsItem() {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/[0.06]">
      <ShieldCheck size={20} className="text-[#9B8AFB]" />
      <span className="text-[14px] text-white">Two-factor authentication</span>
    </div>
  );
}`;

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1600);
  };

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="flex-1 flex flex-col">
      <Helmet>
        <title>{`${post.title} — Reicon`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={post.canonical} />
        <meta name="keywords" content={post.keywords.join(', ')} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={post.canonical} />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.ogImage} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:creator" content={post.author.handle || '@reicon_dev'} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.ogImage} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': post.canonical,
          },
          headline: post.title,
          description: post.description,
          image: [post.ogImage],
          datePublished: post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.author.name,
            url: post.author.url,
            jobTitle: post.author.role,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Reicon',
            url: 'https://reicon.dev',
            logo: {
              '@type': 'ImageObject',
              url: 'https://reicon.dev/favicon/favicon.svg',
            },
          },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Reicon', item: 'https://reicon.dev' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://reicon.dev/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: post.canonical },
          ],
        })}</script>
      </Helmet>

      <main className="max-w-[1160px] mx-auto w-full flex flex-1 flex-col px-4 sm:px-6 md:px-10 pt-10 md:pt-14 pb-20 overflow-x-hidden">
        <article className="max-w-[720px] w-full">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#767676] hover:text-[#ededed] transition-colors mb-8"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Blog</span>
          </Link>

          {/* Title */}
          <h1 className="font-display text-[30px] sm:text-[44px] leading-[1.08] tracking-[-0.03em] text-[#fefefe] mb-4">
            {post.title}
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#9e9e9e]">
            {post.headline}
          </p>

          {/* Author line */}
          <div className="mt-8 flex items-center gap-3 border-y border-[#262626] py-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full bg-[#e9e9e9] object-cover ring-1 ring-white/10"
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[13px] text-[#ededed]">{post.author.name}</span>
              <span className="h-3 w-px bg-[#262626]" aria-hidden="true" />
              <span className="font-mono text-[11px] text-[#767676]">{post.author.role}</span>
              <span className="h-3 w-px bg-[#262626]" aria-hidden="true" />
              <span className="font-mono text-[11px] text-[#767676]">{post.dateFormatted}</span>
              <span className="h-3 w-px bg-[#262626]" aria-hidden="true" />
              <span className="font-mono text-[11px] text-[#767676]">{post.readingTime}</span>
            </div>
          </div>

          {/* Body */}
          <div className="mt-10 space-y-8 text-[15px] sm:text-[16px] leading-[1.8] text-[#b5b5b5]">
            <section>
              <h2 className="font-sans font-normal text-[18px] sm:text-[20px] text-[#fefefe] tracking-[-0.02em] mb-3">
                The problem with AI agents and icons
              </h2>
              <p className="mb-4">
                When you ask Cursor, Claude Code, or Windsurf to write UI code, it moves fast. But icons are where it usually breaks.
              </p>
              <p className="mb-4">
                Language models do not know what icon packages you actually have installed, or what exact names those packages export. So the model guesses. It invents names like <code className="text-white text-[13px] font-mono">PadlockIcon</code>, <code className="text-white text-[13px] font-mono">FiAppointmentCalendar</code>, or <code className="text-white text-[13px] font-mono">UserCheckMark</code>.
              </p>
              <p>
                Then you run the dev server, TypeScript throws an error because the export does not exist, and you have to stop what you are doing to manually find and paste the real icon name.
              </p>
            </section>

            <section>
              <h2 className="font-sans font-normal text-[18px] sm:text-[20px] text-[#fefefe] tracking-[-0.02em] mb-3">
                How Reicon MCP fixes this
              </h2>
              <p className="mb-4">
                We built <code className="text-[#9B8AFB] text-[13px] font-mono">reicon-mcp</code> to give your coding agent a direct search tool over all 2,700+ Reicon icons.
              </p>
              <p className="mb-4">
                Instead of guessing names out of thin air, your agent calls <code className="text-white text-[13px] font-mono">search_icons</code> to query the library and pick the best match.
              </p>
              <p>
                In the latest version, we added an offline semantic search engine to the MCP server. It runs completely locally on your machine in under 1 millisecond. No API key, no external servers, and no GPU needed.
              </p>
            </section>

            <section>
              <h2 className="font-sans font-normal text-[18px] sm:text-[20px] text-[#fefefe] tracking-[-0.02em] mb-3">
                Why semantic search matters for icons
              </h2>
              <p className="mb-4">
                Traditional icon search relies on exact keyword matching. But people (and AI agents) almost never search for the literal file name.
              </p>
              <p className="mb-4">
                If you are building an auth modal, you think of "padlock", not just "lock". If you are building a movie app, you search "cinema", but the icon might be named "movie-clap" or "film". If you are making a booking feature, you search "appointment", but the icon is named "calendar".
              </p>
              <p className="mb-4">
                With simple substring search, every single one of those returns zero results.
              </p>
              <p>
                The offline neural engine in Reicon MCP maps those concepts automatically:
              </p>

              {/* Clean table */}
              <div className="overflow-x-auto my-6 border border-[#262626] rounded-xl bg-[#161616]">
                <table className="w-full text-left text-[13px] font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-[#262626] text-[#767676]">
                      <th className="py-2.5 px-4 font-normal">Agent Search</th>
                      <th className="py-2.5 px-4 font-normal">Exact Match</th>
                      <th className="py-2.5 px-4 font-normal text-[#9B8AFB]">Reicon MCP Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626]">
                    <tr>
                      <td className="py-2.5 px-4 text-white">padlock</td>
                      <td className="py-2.5 px-4 text-[#767676]">0 results</td>
                      <td className="py-2.5 px-4 text-white">lock, lock-open, key</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 text-white">cinema</td>
                      <td className="py-2.5 px-4 text-[#767676]">0 results</td>
                      <td className="py-2.5 px-4 text-white">movie-clap, film, video</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 text-white">appointment</td>
                      <td className="py-2.5 px-4 text-[#767676]">0 results</td>
                      <td className="py-2.5 px-4 text-white">calendar, clock</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 text-white">settinsg (typo)</td>
                      <td className="py-2.5 px-4 text-[#767676]">0 results</td>
                      <td className="py-2.5 px-4 text-white">settings, gear, sliders</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-sans font-normal text-[18px] sm:text-[20px] text-[#fefefe] tracking-[-0.02em] mb-3">
                Setting it up in Cursor and Claude
              </h2>
              <p className="mb-4">
                You do not need to install anything globally. You can run Reicon MCP directly through <code className="text-white text-[13px] font-mono">npx</code>.
              </p>
              <p className="mb-3">
                In Cursor, create or edit <code className="text-white text-[13px] font-mono">.cursor/mcp.json</code>:
              </p>

              <SyntaxBlock
                title=".cursor/mcp.json"
                onCopy={() => handleCopy(MCP_CONFIG, 'mcp-config')}
                copied={copiedKey === 'mcp-config'}
              >
                {MCP_CONFIG}
              </SyntaxBlock>

              <p className="mt-4 mb-2">
                For Claude Code CLI, add it with:
              </p>
              <div className="p-3 rounded-lg bg-[#161616] border border-[#262626] font-mono text-[13px] text-[#ededed] flex items-center justify-between">
                <span>claude mcp add reicon npx reicon-mcp</span>
                <button
                  type="button"
                  onClick={() => handleCopy('claude mcp add reicon npx reicon-mcp', 'cli')}
                  className="text-xs text-[#767676] hover:text-white transition-colors cursor-pointer"
                >
                  {copiedKey === 'cli' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </section>

            <section>
              <h2 className="font-sans font-normal text-[18px] sm:text-[20px] text-[#fefefe] tracking-[-0.02em] mb-3">
                The prompt rule to stop hallucinations
              </h2>
              <p className="mb-4">
                Even with MCP configured, an agent might sometimes fall back on its training data if not instructed. Add this short rule to your <code className="text-white text-[13px] font-mono">.cursorrules</code> file or Claude project prompt:
              </p>

              <SyntaxBlock
                title=".cursorrules prompt"
                onCopy={() => handleCopy(AGENT_PROMPT, 'prompt-rule')}
                copied={copiedKey === 'prompt-rule'}
              >
                {AGENT_PROMPT}
              </SyntaxBlock>

              <p className="mt-4">
                With this rule in place, whenever you ask the agent to add an icon or build a screen, it will call <code className="text-white text-[13px] font-mono">search_icons</code> first, find the real export name, and import it cleanly.
              </p>
            </section>

            <section>
              <h2 className="font-sans font-normal text-[18px] sm:text-[20px] text-[#fefefe] tracking-[-0.02em] mb-3">
                Generating framework-ready components
              </h2>
              <p className="mb-4">
                Once the agent picks an icon, it can call <code className="text-[#9B8AFB] text-[13px] font-mono">get_icon_code</code> to get the exact import and component structure for React, Vue, or Svelte:
              </p>

              <SyntaxBlock
                title="React example"
                onCopy={() => handleCopy(REACT_CODE, 'react-code')}
                copied={copiedKey === 'react-code'}
              >
                {REACT_CODE}
              </SyntaxBlock>
            </section>

            <section>
              <h2 className="font-sans font-normal text-[18px] sm:text-[20px] text-[#fefefe] tracking-[-0.02em] mb-3">
                Summary
              </h2>
              <p className="mb-4">
                Reicon MCP makes icon search work the way it should for AI coding assistants: offline, instant, and tolerant of human conceptual queries.
              </p>
              <p>
                Check the full <Link to="/docs/mcp" className="text-[#9B8AFB] hover:underline">MCP Documentation</Link> for available tools, or browse all 2,700+ icons in the <Link to="/icons" className="text-[#9B8AFB] hover:underline">Icon Library</Link>.
              </p>
            </section>
          </div>

          {/* Footer bio */}
          <footer className="mt-14 pt-8 border-t border-[#262626]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full bg-[#262626] object-cover ring-1 ring-white/10"
                />
                <div>
                  <div className="text-[13px] font-medium text-[#ededed]">{post.author.name}</div>
                  <div className="text-[11px] font-mono text-[#767676]">{post.author.role}</div>
                </div>
              </div>

              <a
                href="https://github.com/dqev/reicon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#767676] hover:text-[#ededed] transition-colors"
              >
                GitHub &rarr;
              </a>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}
