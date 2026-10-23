import { Link } from 'react-router-dom';
import { SiJavascript, SiReact } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import ClayButton from '@/components/ui/Button';
import HeroIsometric from './HeroIsometric';
import { FigmaIcon, VscodeIcon, VueIcon, SvelteIcon, McpIcon, FlutterIcon, ComposeIcon, AstroIcon } from './icons';
import { AngularIcon } from '@/components/docs/framework/icons';
import { Sparkles } from 'reicon-react';

const INTEGRATIONS = [
  {
    to: '/docs/react',
    title: 'React',
    icon: <SiReact className="text-[#61DAFB] shrink-0" size={16} title="React" aria-hidden="true" />,
  },
  {
    to: '/docs/angular',
    title: 'Angular',
    icon: <AngularIcon size={16} />,
  },
  {
    to: '/docs/vue',
    title: 'Vue 3',
    icon: <VueIcon size={16} />,
  },
  {
    to: '/docs/astro',
    title: 'Astro',
    icon: <AstroIcon size={15} />,
  },
  {
    to: '/docs/figma',
    title: 'Figma',
    icon: <FigmaIcon size={15} />,
  },
  {
    to: '/docs/svelte',
    title: 'Svelte',
    icon: <SvelteIcon size={15} />,
  },
  {
    to: '/docs/react-native',
    title: 'React Native',
    icon: <FaReact className="text-[#61DAFB] shrink-0" size={16} title="React Native" aria-hidden="true" />,
  },
  {
    to: '/docs/vanilla',
    title: 'JavaScript',
    icon: <SiJavascript className="text-[#F7DF1E] shrink-0" size={15} title="JavaScript" aria-hidden="true" />,
  },
  {
    to: '/docs/vscode',
    title: 'VS Code',
    icon: <VscodeIcon size={16} />,
  },
  {
    to: '/docs/flutter',
    title: 'Flutter',
    icon: <FlutterIcon size={14} />,
  },
  {
    to: '/docs/compose',
    title: 'Compose',
    icon: <ComposeIcon size={14} />,
  },
  {
    to: '/docs/mcp',
    title: 'MCP Server',
    icon: <McpIcon size={15} />,
  },
];

interface Props {
  stars?: number | null;
}

export default function Hero(_props: Props = {}) {
  return (
    <section className="hero-section relative w-full flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-[1160px] mx-auto flex flex-col">
        {/* Main 2-column hero: Left text/actions, Right isometric illustration */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8 md:gap-6 items-center">
          {/* Left Column - below the illustration on mobile */}
          <div className="hero-left-col order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Top hero badge */}
            <div className="hero-badge flex items-center justify-center gap-1.5 leading-none font-sans font-normal text-[13px] self-center md:self-start">
              <Sparkles size={14} color="#9B8AFB" weight="Filled" className="shrink-0" />
              <span className="leading-none font-sans font-normal">v2 is live</span>
            </div>

            {/* Main title */}
            <h1 className="hero-title">
              The icon library designers actually want.
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Free, open-source SVG icons. 2,700+ pixel-perfect icons in Outline and Filled, built for designers and developers.
            </p>

            {/* Primary & Secondary skill CTA row */}
            <div className="skill-cta-row">
              <ClayButton to="/icons" variant="primary" className="skill-btn skill-btn--primary">
                <span>Browse</span>
              </ClayButton>

              <ClayButton to="/docs" variant="secondary" className="skill-btn skill-btn--secondary">
                <span>Get Started</span>
              </ClayButton>
            </div>
          </div>

          {/* Right Column: Isometric Illustration - first on mobile */}
          <div className="w-full order-1 md:order-2 flex items-center justify-center lg:justify-end">
            <HeroIsometric />
          </div>
        </div>

        {/* Integrations Infinite Marquee Ribbon */}
        <div className="hero-marquee-wrap pt-2 flex flex-col items-center justify-center gap-4 select-none w-full max-w-[780px] mx-auto overflow-hidden">
          <span className="text-[13px] text-white/70 font-normal font-sans text-center">
            Frameworks &amp; tools supported by Reicon
          </span>

          <div className="hero-marquee-container w-full overflow-hidden py-1">
            <div className="hero-marquee-track flex gap-3 items-center">
              {/* Set 1: Accessible semantic links */}
              {INTEGRATIONS.map((item, idx) => (
                <Link
                  key={`int-1-${idx}`}
                  to={item.to}
                  title={item.title}
                  className="hero-integration-pill"
                >
                  <span aria-hidden="true" className="inline-flex shrink-0 items-center justify-center">
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </Link>
              ))}

              {/* Set 2: Purely visual duplication for infinite loop */}
              <div className="contents" aria-hidden="true">
                {INTEGRATIONS.map((item, idx) => (
                  <span
                    key={`int-2-${idx}`}
                    className="hero-integration-pill pointer-events-none select-none"
                  >
                    <span className="inline-flex shrink-0 items-center justify-center">
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

