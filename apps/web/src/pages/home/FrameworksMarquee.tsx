import { Link } from 'react-router-dom';
import { SiJavascript, SiReact } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { FigmaIcon, VscodeIcon, VueIcon, SvelteIcon, McpIcon, FlutterIcon, ComposeIcon, AstroIcon } from './icons';
import { AngularIcon } from '@/components/docs/framework/icons';

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

export default function FrameworksMarquee() {
  return (
    <section className="reveal py-10 sm:py-14 max-w-[1160px] mx-auto px-4 sm:px-6">
      <div className="hero-marquee-wrap flex flex-col items-center justify-center gap-4 select-none w-full max-w-[780px] mx-auto overflow-hidden">
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
    </section>
  );
}

