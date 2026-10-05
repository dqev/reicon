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
    icon: <SiReact className="text-[#61DAFB] shrink-0" size={16} />,
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
    icon: <FaReact className="text-[#61DAFB] shrink-0" size={16} />,
  },
  {
    to: '/docs/vanilla',
    title: 'JavaScript',
    icon: <SiJavascript className="text-[#F7DF1E] shrink-0" size={15} />,
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
    <section className="relative w-full flex flex-col items-center justify-center pt-4 pb-6 md:pt-8 md:pb-12 px-4 sm:px-6">
      <div className="w-full max-w-[1160px] mx-auto flex flex-col">
        {/* Main 2-column hero: Left text/actions, Right isometric illustration */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-8 items-center">
          {/* Left Column — below the illustration on mobile */}
          <div className="hero-left-col order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-16 xl:pl-24">
            {/* Top hero badge */}
            <div className="hero-badge flex items-center justify-center gap-1.5 leading-none font-sans font-normal text-[13px] self-center lg:self-start">
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

          {/* Right Column: Isometric Illustration — first on mobile */}
          <div className="w-full order-1 lg:order-2 flex items-center justify-center lg:justify-end">
            <HeroIsometric />
          </div>
        </div>

        {/* Integrations Infinite Marquee Ribbon */}
        <div className="mt-12 md:mt-16 pt-2 flex flex-col items-center justify-center gap-4 select-none w-full max-w-[780px] mx-auto overflow-hidden">
          <span className="text-[13px] text-white/40 font-normal font-sans text-center">
            Frameworks &amp; tools supported by Reicon
          </span>

          <div className="hero-marquee-container w-full overflow-hidden py-1">
            <div className="hero-marquee-track flex gap-3 items-center">
              {/* Set 1 */}
              {INTEGRATIONS.map((item, idx) => (
                <Link
                  key={`int-1-${idx}`}
                  to={item.to}
                  title={item.title}
                  className="hero-integration-pill"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}

              {/* Set 2 (seamless duplication for infinite loop) */}
              {INTEGRATIONS.map((item, idx) => (
                <Link
                  key={`int-2-${idx}`}
                  to={item.to}
                  title={item.title}
                  className="hero-integration-pill"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

