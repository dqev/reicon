export interface BlogPostAuthor {
  name: string;
  role: string;
  avatar: string;
  handle?: string;
  url?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  headline: string;
  description: string;
  publishedAt: string;
  dateFormatted: string;
  readingTime: string;
  author: BlogPostAuthor;
  ogImage: string;
  canonical: string;
  keywords: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-find-best-icons-with-reicon-mcp',
    title: 'How to Find the Best Icons with Reicon MCP in AI Agents',
    headline: 'Stop dealing with made-up icon names in Cursor and Claude Code. How offline semantic search lets coding agents find the right icon on the first try.',
    description: 'Learn how to search and find the right SVG icons using Reicon MCP. Offline semantic search eliminates hallucinated icon names in Cursor, Claude Code, and AI agents.',
    publishedAt: '2026-11-24',
    dateFormatted: 'Nov 24, 2026',
    readingTime: '5 min read',
    author: {
      name: 'Dev Chauhan',
      role: 'Founder and maintainer',
      avatar: '/dev.jpeg',
      handle: '@devchauhann3',
      url: 'https://devc.in',
    },
    ogImage: 'https://reicon.dev/og/blog/1.png',
    canonical: 'https://reicon.dev/blog/how-to-find-best-icons-with-reicon-mcp',
    keywords: [
      'reicon mcp',
      'cursor icon search',
      'claude code icons',
      'model context protocol icons',
      'ai agent icon search',
      'semantic icon search',
      'react icons ai'
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
