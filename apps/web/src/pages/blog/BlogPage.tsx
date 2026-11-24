import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '@/data/blog-posts';
import BlogCard from './BlogCard';

export default function BlogPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Helmet>
        <title>Blog — Reicon</title>
        <meta
          name="description"
          content="Notes on icons, AI coding agents, and design engineering from the creator of Reicon."
        />
        <link rel="canonical" href="https://reicon.dev/blog" />
        <meta
          name="keywords"
          content="reicon blog, reicon mcp, cursor icons, ai agent icon search, claude code icons, svg vector icons"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/blog" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Blog — Reicon" />
        <meta
          property="og:description"
          content="Notes on icons, AI coding agents, and design engineering from the creator of Reicon."
        />
        <meta property="og:image" content="https://reicon.dev/og/blog.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Blog — Reicon" />
        <meta
          name="twitter:description"
          content="Notes on icons, AI coding agents, and design engineering from the creator of Reicon."
        />
        <meta name="twitter:image" content="https://reicon.dev/og/blog.png" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Reicon', item: 'https://reicon.dev' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://reicon.dev/blog' },
          ],
        })}</script>
      </Helmet>

      <main className="max-w-[1160px] mx-auto w-full flex flex-col flex-1 px-4 sm:px-6 md:px-10 py-12 md:py-16">
        {/* Header */}
        <header className="mb-10 sm:mb-12">
          <h1 className="font-display text-[32px] sm:text-[44px] leading-[1.05] tracking-[-0.03em] text-[#fefefe] mb-3">
            Blog
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#8f8f8f] max-w-[600px]">
            Notes on icons, AI coding agents, and design engineering from the creator of Reicon.
          </p>
        </header>

        {/* Posts List */}
        <section aria-label="Articles" className="w-full max-w-[760px]">
          <div className="space-y-6">
            {BLOG_POSTS.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
