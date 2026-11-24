import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blog-posts';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="pb-8 border-b border-[#262626]">
      <div className="flex items-center gap-2 font-mono text-[11px] text-[#767676] mb-2.5">
        <time dateTime={post.publishedAt}>{post.dateFormatted}</time>
        <span>•</span>
        <span>{post.readingTime}</span>
      </div>

      <h2 className="font-display font-medium text-[20px] sm:text-[23px] text-[#ededed] hover:text-white transition-colors leading-[1.3] mb-2.5 tracking-[-0.01em]">
        <Link to={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h2>

      <p className="text-[#8f8f8f] text-[14px] sm:text-[15px] leading-[1.65] mb-5">
        {post.headline}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            width={24}
            height={24}
            className="h-6 w-6 rounded-full bg-[#262626] object-cover ring-1 ring-white/10"
          />
          <span className="text-[13px] text-[#8f8f8f]">{post.author.name}</span>
        </div>

        <Link
          to={`/blog/${post.slug}`}
          className="text-[13px] text-[#ededed] hover:underline flex items-center gap-1 font-normal"
        >
          <span>Read post</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
