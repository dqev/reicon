import ClayButton from '@/components/ui/Button';
import HeroIsometric from './HeroIsometric';
import { formatCount, useNpmDownloads } from '@/hooks/useNpmDownloads';

interface Props {
  stars?: number | null;
}

export default function Hero(_props: Props = {}) {
  const { total } = useNpmDownloads();

  return (
    <section className="hero-section relative w-full flex flex-col items-center px-4 sm:px-6">
      {/* Precision Drafting Canvas background */}
      <div className="hero-blueprint-grid" aria-hidden="true" />
      <div className="hero-vector-stage-bg" aria-hidden="true">
        <div className="vector-ring-1" />
        <div className="vector-ring-2" />
      </div>

      <div className="w-full max-w-[1160px] mx-auto flex flex-col flex-1 relative z-[1]">
        {/* Flex-1 wrapper: centers hero content in available space */}
        <div className="flex-1 flex flex-col justify-center pt-4 pb-8">
          {/* Main 2-column hero: Left text/actions, Right isometric illustration */}
          <div className="w-full grid grid-cols-1 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8 md:gap-6 items-center">
            {/* Left Column */}
            <div className="hero-left-col order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
              {/* Top hero badge */}
              <div className="hero-badge flex items-center justify-center gap-1.5 leading-none font-sans font-normal text-[13px] self-center md:self-start">
                <span className="leading-none font-sans font-normal tabular-nums">
                  {total === null ? 'npm downloads' : `${formatCount(total)} downloads`}
                </span>
              </div>

              {/* Main title */}
              <h1 className="hero-title">
                The icon library designers actually want.
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle">
                Free, open-source SVG icons. 2,700+ pixel-perfect icons in Outline and Filled, built for designers and developers.
              </p>

              {/* Primary & Secondary skill CTA row - simple & clean */}
              <div className="skill-cta-row">
                <ClayButton to="/icons" variant="primary" className="skill-btn skill-btn--primary">
                  <span>Browse</span>
                </ClayButton>

                <ClayButton to="/docs" variant="secondary" className="skill-btn skill-btn--secondary">
                  <span>Get Started</span>
                </ClayButton>
              </div>
            </div>

            {/* Right Column: Isometric Illustration */}
            <div className="w-full order-1 md:order-2 flex items-center justify-center lg:justify-end relative">
              <div className="hero-isometric-glow" aria-hidden="true" />
              <HeroIsometric />
            </div>
          </div>
        </div>{/* end flex-1 centering wrapper */}

        {/* Centered Sponsor at the bottom of Hero (clean, no button bg, larger size) */}
        <div className="flex items-center justify-center pb-6 pt-3">
          <a
            href="https://uigoodies.com/?utm_source=reicon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Official Sponsor: Ui Goodies"
            className="group inline-flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <span className="text-[14px] sm:text-[15px] text-[#8f8f8f] font-normal tracking-[-0.01em]">
              Sponsored by
            </span>
            <img
              src="/ui/ui-goodies-logo.svg"
              alt="Ui Goodies"
              className="h-6 sm:h-7 w-auto shrink-0"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
