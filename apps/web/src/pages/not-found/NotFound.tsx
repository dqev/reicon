import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Search3 } from 'reicon-react';
import ClayButton from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center py-20">
      <Helmet>
        <title>404 — Page Not Found | Reicon</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Icon // 404 inline */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 mb-5 select-none">
        <img src="/favicon/favicon.svg" alt="Reicon" loading="lazy" className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 select-none pointer-events-none" />
        <span className="font-mono text-[34px] sm:text-[44px] font-light text-text-base/20 tracking-tighter leading-none relative -top-[1px]">|</span>
        <span className="font-serif text-[42px] sm:text-[54px] font-normal text-text-base/30 leading-none">404</span>
      </div>

      <h1 className="font-serif text-[24px] sm:text-[32px] font-normal text-text-base leading-[1.2] mb-3">
        Page not found
      </h1>

      <p className="text-[14px] sm:text-[15px] text-text-base/45 leading-[1.6] max-w-[380px] mb-8">
        The page you're looking for doesn't exist, was moved, or has been deleted.
      </p>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        <ClayButton to="/" variant="primary" className="px-5 py-3 text-[14px] font-medium">
          <ArrowLeft size={15} />
          <span>Go Home</span>
        </ClayButton>
        <Link
          to="/icons"
          className="bg-text-base/[0.04] hover:bg-text-base/10 text-text-base text-[14px] font-medium px-5 py-3 rounded-full backdrop-blur-lg flex items-center justify-center gap-1.5 transition-all duration-150 shadow-2xs cursor-pointer"
        >
          <Search3 size={15} />
          <span>Browse Icons</span>
        </Link>
      </div>
    </div>
  );
}
