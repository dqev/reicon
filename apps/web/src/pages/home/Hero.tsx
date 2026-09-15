import { Link } from 'react-router-dom';
import { HandHeart, Search3, Doc } from 'reicon-react';
import { SiJavascript, SiReact } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import Background from '@/components/layout/Background';
import ClayButton from '@/components/ui/Button';
import { FigmaIcon, VscodeIcon, VueIcon, SvelteIcon, McpIcon, FlutterIcon, AstroIcon } from './icons';
import { AngularIcon } from '@/components/docs/framework/icons';

interface Props {
  theme?: string;
  toggleTheme?: () => void;
  heroCardRef: React.RefObject<HTMLDivElement | null>;
  stars?: number | null;
}

export default function Hero({ heroCardRef }: Props) {
  return (
    <div className="relative min-h-screen flex items-start justify-center">
      <div
        ref={heroCardRef}
        className="sticky top-0 w-full h-screen overflow-hidden origin-top will-change-transform"
        style={{ transformOrigin: 'top center' }}
      >
        <Background />

        <div className="absolute inset-0 z-[2] flex flex-col justify-between pt-20 sm:pt-24 md:pt-28 pb-6 px-[18px] md:px-[40px]">
          {/* Rich top ambient smoke glow overlay */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[700px] sm:w-[850px] h-[320px] bg-gradient-to-b from-[#9B8AFB]/[0.14] via-[#9B8AFB]/[0.06] to-transparent rounded-full blur-[90px] pointer-events-none z-[1]" />

          {/* Center content */}
          <div className="my-auto text-center px-3 max-w-4xl mx-auto flex flex-col items-center justify-center">
            {/* Top pill badges */}
            <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
              <a
                href="https://github.com/dqev/reicon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[6px] bg-text-base/[0.04] hover:bg-text-base/10 backdrop-blur-lg rounded-full px-[14px] py-[6px] text-[12px] text-text-base/90 transition-colors"
              >
                <HandHeart size={16} color="currentColor" />
                <span>Open Source Library</span>
              </a>
            </div>

            <h1 className="font-serif text-[clamp(34px,6.8vw,84px)] font-semibold text-text-base leading-[1.06] tracking-[-0.03em] mb-4">
              The icon library<br />designers actually want.
            </h1>
            <p className="text-[clamp(13px,1.45vw,18px)] text-text-base/60 leading-[1.65] max-w-[620px] mx-auto mb-7">
              Free, open-source vector icon library with 2,700+ handcrafted, pixel-perfect SVG icons in Outline and Filled weights — built for designers &amp; developers.
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-3 max-w-[440px] sm:max-w-none mx-auto w-full sm:w-auto">
              <ClayButton to="/icons" variant="primary" className="px-5 sm:px-7 py-3 text-[13px] sm:text-[14px] whitespace-nowrap">
                <Search3 size={16} />
                <span className="whitespace-nowrap">Browse Icons</span>
              </ClayButton>

              <Link
                to="/docs"
                className="bg-text-base/[0.04] hover:bg-text-base/10 text-text-base text-[13px] sm:text-[14px] font-medium px-5 sm:px-7 py-3 rounded-full backdrop-blur-lg flex items-center justify-center gap-2 transition-all duration-150 shadow-2xs whitespace-nowrap"
              >
                <Doc size={16} color="currentColor" />
                <span className="whitespace-nowrap">Docs Guide</span>
              </Link>
            </div>

            {/* Integrations row */}
            <div className="mt-8 md:mt-10 flex flex-col items-center justify-center gap-3 select-none">
              <span className="text-[10px] tracking-[0.15em] text-text-base/35 dark:text-text-base/30 uppercase font-semibold">Integrations</span>
              <div className="flex items-center justify-center gap-x-5 gap-y-3 sm:gap-7 flex-wrap max-w-[250px] sm:max-w-[700px] mx-auto">
                <Link to="/docs/react" title="React" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <SiReact className="text-[#61DAFB]/70 hover:text-[#61DAFB] transition-colors" size={18} />
                  <span className="hidden sm:inline">React</span>
                </Link>
                <Link to="/docs/angular" title="Angular 20+" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <AngularIcon size={17} />
                  <span className="hidden sm:inline">Angular</span>
                </Link>
                <Link to="/docs/vue" title="Vue 3" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <VueIcon size={17} />
                  <span className="hidden sm:inline">Vue</span>
                </Link>
                <Link to="/docs/astro" title="Astro" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <AstroIcon size={16} />
                  <span className="hidden sm:inline">Astro</span>
                </Link>
                <Link to="/docs/figma" title="Figma" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <FigmaIcon size={16} />
                  <span className="hidden sm:inline">Figma</span>
                </Link>
                <Link to="/docs/svelte" title="Svelte" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <SvelteIcon size={16} />
                  <span className="hidden sm:inline">Svelte</span>
                </Link>
                <Link to="/docs/react-native" title="React Native" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <FaReact className="text-[#61DAFB]/60 hover:text-[#61DAFB] transition-colors" size={17} />
                  <span className="hidden sm:inline">React Native</span>
                </Link>
                <Link to="/docs/vanilla" title="Vanilla JavaScript" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <SiJavascript className="text-[#F7DF1E]/80 hover:text-[#F7DF1E] transition-colors" size={16} />
                  <span className="hidden sm:inline">JavaScript</span>
                </Link>
                <Link to="/docs/vscode" title="VS Code" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <VscodeIcon size={17} />
                  <span className="hidden sm:inline">VS Code</span>
                </Link>
                <Link to="/docs/flutter" title="Flutter" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <FlutterIcon size={14} />
                  <span className="hidden sm:inline">Flutter</span>
                </Link>
                <Link to="/docs/mcp" title="MCP Server" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <McpIcon size={16} />
                  <span className="hidden sm:inline">MCP Server</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom stats bar - mobile responsive */}
          <div className="flex items-end justify-center pb-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 sm:gap-6 px-3 sm:px-8 py-2 max-w-full text-center">
              {[
                { num: '2,700+', label: 'Icons' },
                { num: 'MIT', label: 'License' },
              ].map((s, idx) => (
                <div key={s.label} className="flex items-center gap-3 sm:gap-6">
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <span className="font-serif text-[13px] sm:text-[19px] font-semibold text-text-base leading-none">{s.num}</span>
                    <span className="text-[10px] sm:text-[12px] text-text-base/60 font-medium">{s.label}</span>
                  </div>
                  {idx < 1 && <div className="hidden sm:block w-[1px] h-3.5 bg-white/15" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
