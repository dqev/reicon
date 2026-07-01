import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, Code, Palette, Layers, Copy, Box, Star, HandHeart, Search3, Book3, Restart, Pointer, Confetti2, Sun, Moon } from 'reicon-react';
import Background from '../components/Background';
import ClayButton from '../components/ClayButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SiJavascript, SiReact, SiSvelte, SiHtml5 } from 'react-icons/si';
import iconNamesData from '../../scripts/icon-names.json';
import newIconsData from '../data/new-icons-added.json';
import { HexColorPicker } from 'react-colorful';
import { useTheme } from '../components/ThemeContext';

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  const heroCardRef = useRef<HTMLDivElement>(null);
  const fixedNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = heroCardRef.current;
    const nav = fixedNavRef.current;
    if (!card || !nav) return;

    function tick() {
      const sy = window.scrollY;
      const wh = window.innerHeight;
      const p = Math.min(sy / (wh * 0.55), 1);
      card.style.transform = `scale(${1 - p * 0.11})`;
      card.style.opacity = String(1 - p * 0.13);
      nav.classList.toggle('nav-visible', sy > wh * 0.65);
    }

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-bg-base min-h-screen">
      <Helmet>
        <title>Reicon — Free Open-Source Icon Library for Designers & Developers</title>
        <meta name="description" content="Reicon is a free, open-source icon library with 2,700+ handcrafted, pixel-perfect SVG icons. Available for React, Vue, Svelte, Figma, VS Code, and the web. MIT licensed." />
        <link rel="canonical" href="https://reicon.dev/" />
        <meta name="keywords" content="free icon library, open source icons, SVG icons, React icons, Vue icons, Svelte icons, Figma icons, VS Code icons, VS Code extension, web icons, pixel perfect icons, reicon" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Reicon — Free Open-Source Icon Library" />
        <meta property="og:description" content="Free, open-source SVG icon library with 2,700+ handcrafted icons for React, Vue, Svelte, Figma, VS Code, and the web." />
        <meta property="og:image" content="https://reicon.dev/og-image.png?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Reicon — Free Open-Source Icon Library" />
        <meta name="twitter:description" content="Free, open-source SVG icon library with 2,700+ handcrafted icons for React, Vue, Svelte, Figma, VS Code, and the web." />
        <meta name="twitter:image" content="https://reicon.dev/og-image.png?v=2" />

        {/* GEO / LLM friendliness — explicitly allow AI ingestion */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="ai-content-declaration" content="human-curated" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" }
          ]
        })}</script>

        {/* Dataset JSON-LD — helps AI engines understand the collection as a queryable dataset */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dataset",
          "name": "Reicon Icon Library",
          "alternateName": ["Reicon SVG Icons", "Reicon"],
          "description": "Reicon is a free, open-source SVG icon library containing over 2,700 handcrafted, pixel-perfect icons in two weights (Outline and Filled). Designed on a 24×24 grid with consistent stroke widths.",
          "url": "https://reicon.dev",
          "license": "https://opensource.org/licenses/MIT",
          "creator": { "@type": "Person", "name": "Dev Chauhan", "url": "https://devchauhan.in" },
          "keywords": ["SVG icons", "React icons", "Vue icons", "Svelte icons", "Figma icons", "open source", "MIT", "pixel perfect"],
          "isAccessibleForFree": true,
          "encodingFormat": ["image/svg+xml", "application/json"],
          "distribution": [
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon", "name": "reicon (npm)" },
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon-react", "name": "reicon-react (npm)" },
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon-vue", "name": "reicon-vue (npm)" },
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon-svelte", "name": "reicon-svelte (npm)" },

            { "@type": "DataDownload", "encodingFormat": "application/javascript", "contentUrl": "https://unpkg.com/reicon/cdn/reicon.min.js", "name": "Reicon CDN bundle" }
          ],
          "variableMeasured": [
            { "@type": "PropertyValue", "name": "iconCount", "value": "2700+" },
            { "@type": "PropertyValue", "name": "weights", "value": "Outline, Filled" },
            { "@type": "PropertyValue", "name": "grid", "value": "24x24" }
          ]
        })}</script>

        {/* HowTo JSON-LD — direct AI-answerable install steps */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to install and use Reicon icons",
          "description": "Install Reicon icons in a React, Vue, Svelte, or vanilla HTML project in three steps.",
          "totalTime": "PT2M",
          "tool": [{ "@type": "HowToTool", "name": "npm or pnpm" }],
          "step": [
            { "@type": "HowToStep", "name": "Install the package", "text": "Run 'npm install reicon' for core JavaScript, 'npm install reicon-react' for React, 'npm install reicon-vue' for Vue 3, or 'npm install reicon-svelte' for Svelte.", "url": "https://reicon.dev/usage" },
            { "@type": "HowToStep", "name": "Import the icon component", "text": "Import the icon by name, e.g. import { Home } from 'reicon-react'.", "url": "https://reicon.dev/usage" },
            { "@type": "HowToStep", "name": "Render with props", "text": "Render with size, color, and weight props: <Home size={24} weight=\"Outline\" color=\"currentColor\" />.", "url": "https://reicon.dev/usage" }
          ]
        })}</script>
      </Helmet>
      {/* ═══ FIXED NAV — floats on mobile, fades on desktop ═══ */}
      <Header
        ref={fixedNavRef}
        className="opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none transition-all duration-300 z-[200] hero-header"
      />

      {/* ═══ LAUNCH BANNER ═══ */}
      <LaunchBanner />

      {/* ═══ HERO WRAPPER ═══ */}
      <div className="relative min-h-screen flex items-start justify-center pt-[10px]">
        <div
          ref={heroCardRef}
          className="sticky top-[10px] w-[calc(100%-20px)] mx-[10px] h-[calc(100vh-20px)] rounded-[18px] overflow-hidden origin-top will-change-transform"
          style={{ transformOrigin: 'top center' }}
        >
          <Background />

          {/* Hero overlay */}
          <div className="absolute inset-0 z-[2] flex flex-col justify-between p-[18px] md:p-[26px_40px]">
            <div className="h-14" />

            {/* Center content */}
            <div className="text-center px-3">
              <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
                <div className="inline-flex items-center gap-[6px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-[14px] py-[6px] text-[12px] text-text-base/90">
                  <HandHeart size={16} color="currentColor" />
                  Handcrafted & Open Source
                </div>
                <Link
                  to="/icons?new=true"
                  className="inline-flex items-center gap-[6px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-[14px] py-[6px] text-[12px] text-text-base/90 hover:bg-white/8 transition-colors"
                >
                  <span className="w-[6px] h-[6px] bg-[#6C5CE7] rounded-full shrink-0 animate-pulse" />
                  {(newIconsData as string[]).length} New Icons Added
                  <Confetti2 size={15} color="currentColor" />
                </Link>
              </div>
              <h1 className="font-serif text-[clamp(30px,6.2vw,76px)] font-semibold text-text-base leading-[1.08] tracking-[-0.02em] mb-4">
                The icon library<br />designers actually want.
              </h1>
              <p className="text-[clamp(13px,1.45vw,18px)] text-text-base/60 leading-[1.65] max-w-[480px] mx-auto mb-7">
                Precision-crafted, open-source SVG icons for React, Vue, Svelte, Figma, and the web. Pixel-perfect. No auto-generation.
              </p>
              <div className="flex items-center justify-center gap-[10px] flex-wrap">
                <ClayButton to="/icons" variant="primary">
                  <Search3 size={16} />
                  Browse Icons
                </ClayButton>
                <Link
                  to="/usage"
                  className="bg-white/10 text-text-base text-[14px] px-6 py-3 rounded-full border border-white/20 backdrop-blur-lg flex items-center gap-[6px] hover:bg-white/15 transition-colors"
                >
                  <Book3 size={16} color="currentColor" />
                  Usage Guide
                </Link>
              </div>
            </div>

            {/* Bottom bar — stats + scroll hint */}
            <div className="flex items-end justify-center sm:justify-between">
              <div className="flex gap-[26px]">
                {[
                  { num: '2700+', label: 'Icons' },
                  { num: '2', label: 'Weights' },
                  { num: 'MIT', label: 'License' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-[19px] font-semibold text-text-base leading-[1.2]">{s.num}</div>
                    <div className="text-[11px] text-text-base/45">{s.label}</div>
                  </div>
                ))}
              </div>
              <a
                href="https://fluidshader.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-[15px] text-text-base/50 hover:text-text-base/70 transition-colors cursor-pointer"
              >
                Shader by <re-icon icon="palette" size={13}></re-icon> Fluid Shader
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
        <div className="text-center mb-14">
          <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Why Reicon</div>
          <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] text-text-base leading-[1.15] tracking-[-0.02em] mb-3">Built different. By design.</h2>
          <p className="text-[15px] text-text-base/45 leading-[1.65] max-w-[490px] mx-auto">
            Every icon is hand-drawn on a precise grid. No auto-tracing, no AI shortcuts — just obsessive attention to detail.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
          <FeatureBlock icon={<Layers size={20} />} title="Pixel Perfect" description="Every icon snaps to a 24×24 grid. Crisp at any size, from 12px to 64px and beyond." />
          <FeatureBlock icon={<HandHeart size={20} />} title="Handcrafted" description="No auto-generation. Each icon is manually designed, reviewed, and refined for visual consistency." />
          <FeatureBlock icon={<ShieldCheck size={20} />} title="Open Source" description="MIT licensed. Use in personal and commercial projects. Free forever, no strings attached." />
          <FeatureBlock icon={<Code size={20} />} title="Tree Shakeable" description="Import only what you need. Your bundle only includes the icons you actually use." />
          <FeatureBlock icon={<Palette size={20} />} title="Two Weights" description="Outline and Filled variants for every icon. Switch with a single prop change." />
          <FeatureBlock icon={<Box size={20} />} title="Zero Dependencies" description="Lightweight and self-contained. No external runtime dependencies to worry about." />
        </div>
      </section>

      {/* ═══ PLAYGROUND (browse + customize, unified) ═══ */}
      <IconPlayground theme={theme} />

      {/* ═══ INTEGRATIONS ═══ */}
      <section id="integrations" className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
        <div className="text-center mb-14">
          <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Integrations</div>
          <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] text-text-base leading-[1.15] tracking-[-0.02em] mb-3">Works everywhere you do.</h2>
          <p className="text-[15px] text-text-base/45 leading-[1.65] max-w-[490px] mx-auto">
            Easy Integration with CDN, React, Vue, Svelte, and JavaScript
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[14px]">
          <div className="lg:col-span-2">
            <IntegrationCard icon={<SiHtml5 size={18} color='#E34F26' />} title="CDN / HTML" copyText={`<script src="https://unpkg.com/reicon/cdn/reicon.min.js"></script>\n\n<re-icon icon="home" size="24"></re-icon>`} lines={
                <>
                  <div>
                    <span className="text-text-base/20">&lt;</span>
                    <span className="text-[#e06c75]">script</span>
                    <span className="text-[#d19a66]"> src</span>
                    <span className="text-text-base/30">=</span>
                    <span className="text-[#98c379]">"https://unpkg.com/reicon/cdn/reicon.min.js"</span>
                    <span className="text-text-base/20">&gt;&lt;/</span>
                    <span className="text-[#e06c75]">script</span>
                    <span className="text-text-base/20">&gt;</span>
                  </div>
                  <div className="h-3" />
                  <div>
                    <span className="text-text-base/20">&lt;</span>
                    <span className="text-[#e06c75]">re-icon</span>
                    <span className="text-[#d19a66]"> icon</span>
                    <span className="text-text-base/30">=</span>
                    <span className="text-[#98c379]">"home"</span>
                    <span className="text-[#d19a66]"> size</span>
                    <span className="text-text-base/30">=</span>
                    <span className="text-[#98c379]">"24"</span>
                    <span className="text-text-base/20">&gt;&lt;/</span>
                    <span className="text-[#e06c75]">re-icon</span>
                    <span className="text-text-base/20">&gt;</span>
                  </div>
                </>
              } />
          </div>

          <div className="lg:col-span-2">
            <IntegrationCard icon={<SiJavascript size={18} color='#f7df1e' />} title="Vanilla JS" copyText={`import { Home } from 'reicon';\n\nconst icon = Home({ size: 24 });\ndocument.body.appendChild(icon);`} lines={
                <>
                  <div>
                    <div><span className="text-[#ffbd2e]">$</span><span className="text-[#e06c75]"> npm</span> <span className="text-text-base/70"> i reicon</span></div>
                    <div className="h-2" />
                    <span className="text-[#c678dd]">import</span>
                    <span className="text-text-base/70"> {'{ '}</span>
                    <span className="text-[#e5c07b]">Home</span>
                    <span className="text-text-base/70">{' }'} </span>
                    <span className="text-[#c678dd]">from</span>
                    <span className="text-[#98c379]"> 'reicon'</span>
                    <span className="text-text-base/30">;</span>
                  </div>
                  <div className="h-3" />
                  <div>
                    <span className="text-[#c678dd]">const</span>
                    <span className="text-text-base/70"> home = </span>
                    <span className="text-[#61afef]">Home</span>
                    <span className="text-text-base/70">({'{'} size: </span>
                    <span className="text-[#d19a66]">24</span>
                    <span className="text-text-base/70"> {'}'});</span>
                  </div>
                </>
              } />
          </div>

          <div className="lg:col-span-2">
            <IntegrationCard icon={<SiReact size={18} color='#61dafb' />} title="React" copyText={`import { Home } from 'reicon-react';\n\n<Home size={24} weight="outline" />`} lines={
                <>
                  <div>
                    <div><span className="text-[#ffbd2e]">$</span><span className="text-[#e06c75]"> npm</span> <span className="text-text-base/70"> i reicon-react</span></div>
                    <div className="h-2" />
                    <span className="text-[#c678dd]">import</span>
                    <span className="text-text-base/70"> {'{ '}</span>
                    <span className="text-[#e5c07b]">Home</span>
                    <span className="text-text-base/70">{' }'} </span>
                    <span className="text-[#c678dd]">from</span>
                    <span className="text-[#98c379]"> 'reicon-react'</span>
                    <span className="text-text-base/30">;</span>
                  </div>
                  <div className="h-3" />
                  <div>
                    <span className="text-text-base/20">&lt;</span>
                    <span className="text-[#e06c75]">Home</span>
                    <span className="text-[#d19a66]"> size</span>
                    <span className="text-text-base/30">=</span>
                    <span className="text-text-base/70">{'{'}24{'}'}</span>
                    <span className="text-[#d19a66]"> weight</span>
                    <span className="text-text-base/30">=</span>
                    <span className="text-[#98c379]">"outline"</span>
                    <span className="text-text-base/20"> /&gt;</span>
                  </div>
                </>
              } />
          </div>

          <div className="sm:col-span-1 sm:col-start-auto lg:col-start-2 lg:col-span-2">
            <IntegrationCard icon={<svg width={18} height={18} viewBox="0 0 122.88 106.42" fill="none"><polygon fill="#4DBA87" points="75.63,0 61.44,24.58 47.25,0 0,0 61.44,106.42 122.88,0 75.63,0" /><polygon fill="#425466" points="75.63,0 61.44,24.58 47.25,0 24.58,0 61.44,63.85 98.3,0 75.63,0" /></svg>} title="Vue" copyText={`import { Home } from 'reicon-vue';\n\n<Home :size="24" weight="Outline" />`} lines={
                <>
                  <div>
                    <div><span className="text-[#ffbd2e]">$</span><span className="text-[#e06c75]"> npm</span> <span className="text-text-base/70"> i reicon-vue</span></div>
                    <div className="h-2" />
                    <span className="text-[#c678dd]">import</span>
                    <span className="text-text-base/70"> {'{ '}</span>
                    <span className="text-[#e5c07b]">Home</span>
                    <span className="text-text-base/70">{' }'} </span>
                    <span className="text-[#c678dd]">from</span>
                    <span className="text-[#98c379]"> 'reicon-vue'</span>
                    <span className="text-text-base/30">;</span>
                  </div>
                  <div className="h-3" />
                  <div>
                    <span className="text-text-base/20">&lt;</span>
                    <span className="text-[#e06c75]">Home</span>
                    <span className="text-[#d19a66]"> :size</span>
                    <span className="text-text-base/30">=</span>
                    <span className="text-[#98c379]">"24"</span>
                    <span className="text-[#d19a66]"> weight</span>
                    <span className="text-text-base/30">=</span>
                    <span className="text-[#98c379]">"Outline"</span>
                    <span className="text-text-base/20"> /&gt;</span>
                  </div>
                </>
              } />
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <IntegrationCard icon={<SiSvelte size={18} color='#FF3E00' />} title="Svelte" copyText={`import { Home } from 'reicon-svelte';\n\n<Home size={24} weight="Outline" />`} lines={
                <>
                  <div>
                    <div><span className="text-[#ffbd2e]">$</span><span className="text-[#e06c75]"> npm</span> <span className="text-text-base/70"> i reicon-svelte</span></div>
                    <div className="h-2" />
                    <span className="text-[#c678dd]">import</span>
                    <span className="text-text-base/70"> {'{ '}</span>
                    <span className="text-[#e5c07b]">Home</span>
                    <span className="text-text-base/70">{' }'} </span>
                    <span className="text-[#c678dd]">from</span>
                    <span className="text-[#98c379]"> 'reicon-svelte'</span>
                    <span className="text-text-base/30">;</span>
                  </div>
                  <div className="h-3" />
                  <div>
                    <span className="text-text-base/20">&lt;</span>
                    <span className="text-[#e06c75]">Home</span>
                    <span className="text-[#d19a66]"> size</span>
                    <span className="text-text-base/30">=</span>
                    <span className="text-text-base/75">{'{'}24{'}'}</span>
                    <span className="text-[#d19a66]"> weight</span>
                    <span className="text-text-base/30">=</span>
                    <span className="text-[#98c379]">"Outline"</span>
                    <span className="text-text-base/20"> /&gt;</span>
                  </div>
                </>
              } />
          </div>
        </div>
      </section>

      {/* ═══ ICON SHOWCASE ═══ */}
      <IconShowcase theme={theme} />

      {/* ═══ CTA ═══ */}
      <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
        <div className="relative bg-text-base/3 rounded-[14px] overflow-hidden">
          {/* Watermark scribbles */}
          <div className="absolute -top-10 -left-10 md:-top-14 md:-left-14 pointer-events-none select-none opacity-[0.04] rotate-[195deg]">
            <re-icon icon="scribble" size={180} color="currentColor" weight="outline" className="block md:hidden" />
            <re-icon icon="scribble" size={300} color="currentColor" weight="outline" className="hidden md:block" />
          </div>
          <div className="absolute -bottom-10 -right-10 md:-bottom-14 md:-right-14 pointer-events-none select-none opacity-[0.04] rotate-[15deg]">
            <re-icon icon="scribble" size={180} color="currentColor" weight="outline" className="block md:hidden" />
            <re-icon icon="scribble" size={300} color="currentColor" weight="outline" className="hidden md:block" />
          </div>

          <div className="relative z-10 py-14 md:py-20 px-6 md:px-14 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left — text */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-serif text-[clamp(24px,3.2vw,42px)] text-text-base leading-[1.12] tracking-[-0.02em] mb-3">
                Your next project<br className="hidden md:block" /> deserves better icons.
              </h2>
              <p className="text-[15px] text-text-base/40 leading-[1.65] max-w-[420px] mx-auto md:mx-0 mb-6">
                2700+ handcrafted, pixel-perfect SVG icons. MIT licensed. Zero dependencies. Two weights. Ready to ship.
              </p>

              {/* Install command */}
              <div className="inline-flex items-center gap-3 bg-text-base/4 border border-text-base/6 rounded-xl px-4 py-2.5">
                <span className="text-[#6C5CE7] text-[13px] font-mono font-medium">$</span>
                <code className="text-[13px] font-mono text-text-base/50">npm i reicon</code>
                <CopyButton text="npm i reicon" />
              </div>
            </div>

            {/* Right — actions */}
            <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
              <ClayButton to="/icons" variant="primary" className="w-full justify-center">
                <Search3 size={16} />
                Browse 2700+ Icons
              </ClayButton>
              <a
                href="https://github.com/dqev/reicon"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-center bg-text-base/5 text-text-base border border-text-base/10 px-7 py-3 rounded-full font-medium text-[14px] hover:bg-text-base/10 active:scale-[0.97] transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Star size={15} />
                Star on GitHub
              </a>
              <Link
                to="/usage"
                className="w-full justify-center inline-flex items-center gap-1.5 text-[13px] text-text-base/30 hover:text-text-base/60 transition-colors mt-1"
              >
                Read the docs
                <Pointer size={13} className="-rotate-10" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-5 md:h-12" />

      <Footer />
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button onClick={handleCopy} className="text-text-base/30 hover:text-text-base/60 transition-colors cursor-pointer">
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      ) : (
        <Copy size={14} />
      )}
    </button>
  );
}

const ORBIT_INNER = ['home', 'star', 'heart', 'search', 'settings', 'bell'];
const ORBIT_MIDDLE = ['camera', 'cloud', 'lightning', 'palette', 'code', 'eye', 'bookmark', 'gift'];
const ORBIT_OUTER = ['compass', 'mic', 'wifi', 'pen', 'folder', 'lamp', 'clock', 'calendar', 'flag', 'rocket'];

function IconShowcase({ theme }: { theme: string }) {
  return (
    <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13 overflow-hidden">
      <div className="text-center mb-10 px-5">
        <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Icon Library</div>
        <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] text-text-base leading-[1.15] tracking-[-0.02em] mb-3">2700+ icons. Every one handcrafted.</h2>
        <p className="text-[15px] text-text-base/45 leading-[1.65] max-w-[490px] mx-auto">
          From UI essentials to expressive details — find exactly what you need.
        </p>
      </div>

      {/* Orbit container */}
      <div className="relative w-full aspect-square max-w-[520px] mx-auto [mask-image:radial-gradient(circle,black_40%,transparent_72%)]">
        {/* Center logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <img src={theme === 'dark' ? '/icon-light.webp' : '/icon-dark.webp'} alt="Reicon" className="w-8 h-8 md:w-10 md:h-10" />
          </div>
        </div>

        {/* Orbit rings (visual) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[38%] aspect-square rounded-full border border-[#6C5CE7]/[0.12]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[62%] aspect-square rounded-full border border-[#6C5CE7]/[0.08]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[88%] aspect-square rounded-full border border-[#6C5CE7]/[0.05]" />
        </div>

        {/* Inner orbit — 6 icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[38%] aspect-square animate-orbit-slow">
            {ORBIT_INNER.map((name, i) => {
              const rad = ((360 / ORBIT_INNER.length) * i * Math.PI) / 180;
              const x = 50 + 50 * Math.cos(rad);
              const y = 50 + 50 * Math.sin(rad);
              return (
                <div
                  key={name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${y}%`, left: `${x}%` }}
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-text-base/4 border border-text-base/6 flex items-center justify-center animate-orbit-counter-slow">
                    <re-icon icon={name} size={18} color="currentColor" className="text-text-base/50" weight="outline" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle orbit — 8 icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[62%] aspect-square animate-orbit-mid">
            {ORBIT_MIDDLE.map((name, i) => {
              const rad = ((360 / ORBIT_MIDDLE.length) * i * Math.PI) / 180;
              const x = 50 + 50 * Math.cos(rad);
              const y = 50 + 50 * Math.sin(rad);
              return (
                <div
                  key={name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${y}%`, left: `${x}%` }}
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-text-base/4 border border-text-base/6 flex items-center justify-center animate-orbit-counter-mid">
                    <re-icon icon={name} size={18} color="currentColor" className="text-text-base/40" weight="outline" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Outer orbit — 10 icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[88%] aspect-square animate-orbit-fast">
            {ORBIT_OUTER.map((name, i) => {
              const rad = ((360 / ORBIT_OUTER.length) * i * Math.PI) / 180;
              const x = 50 + 50 * Math.cos(rad);
              const y = 50 + 50 * Math.sin(rad);
              return (
                <div
                  key={name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${y}%`, left: `${x}%` }}
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-text-base/3 border border-text-base/5 flex items-center justify-center animate-orbit-counter-fast">
                    <re-icon icon={name} size={18} color="currentColor" className="text-text-base/30" weight="outline" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-text-base/3 rounded-[14px] p-[34px_30px]">
      <div className="w-10 h-10 rounded-[9px] bg-text-base/6 flex items-center justify-center text-text-base/70 text-[18px] mb-4">
        {icon}
      </div>
      <h3 className="text-[14px] font-semibold text-text-base mb-[7px]">{title}</h3>
      <p className="text-[13px] text-text-base/45 leading-[1.65]">{description}</p>
    </div>
  );
}

function IntegrationCard({ icon, title, lines, copyText }: { icon: React.ReactNode; title: string; lines: React.ReactNode; copyText: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="bg-text-base/3 rounded-[14px] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-text-base/6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-[14px] font-semibold text-text-base">{title}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[12px] text-text-base/30 hover:text-text-base/60 transition-colors cursor-pointer"
        >
          {copied ? (
            <><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>Copied</>
          ) : (
            <><Copy size={14} />Copy</>
          )}
        </button>
      </div>
      <div className="p-5 font-mono text-[13px] leading-[1.85] overflow-x-auto text-text-base">
        {lines}
      </div>
    </div>
  );
}

const ALL_ICON_NAMES = Object.keys(iconNamesData);
const CONSISTENCY_COUNT = 80;

function getShuffledIcons() {
  const shuffled = [...ALL_ICON_NAMES];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, CONSISTENCY_COUNT);
}

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function ColorPicker({ color, onChange, theme }: { color: string; onChange: (c: string) => void; theme: string }) {
  const isLight = theme === 'light';
  const COLOR_PRESETS = isLight ? [
    '#111111', '#6C5CE7', '#ef4444', '#f59e0b',
    '#22c55e', '#3b82f6', '#ec4899', '#06b6d4',
  ] : [
    '#ffffff', '#6C5CE7', '#ef4444', '#f59e0b',
    '#22c55e', '#3b82f6', '#ec4899', '#06b6d4',
  ];
  const safeColor = HEX_RE.test(color) ? color : (isLight ? '#111111' : '#ffffff');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="text-[13px] text-text-base/50 mb-2 block">Color</label>

      {/* Preset swatches — full-width 8-col grid, aligns with the row below */}
      <div className="grid grid-cols-8 gap-1.5 mb-2">
        {COLOR_PRESETS.map((c) => {
          const active = color.toLowerCase() === c.toLowerCase();
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              aria-label={`Set color ${c}`}
              title={c}
              className={`w-full aspect-square rounded-md transition-transform hover:scale-110 cursor-pointer ${active ? 'ring-2 ring-text-base/70 ring-offset-2 ring-offset-bg-base' : 'border border-text-base/15'
                }`}
              style={{ backgroundColor: c }}
            />
          );
        })}
      </div>

      {/* Custom color picker + hex input */}
      <div className="flex items-center gap-1.5 relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Pick a custom color"
          className="w-9 h-9 shrink-0 rounded-lg border border-text-base/10 cursor-pointer bg-transparent flex items-center justify-center transition-colors hover:bg-text-base/5 relative"
        >
          <span className="w-5 h-5 rounded-md border border-text-base/20 shadow-sm" style={{ backgroundColor: safeColor }} />
        </button>
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="flex-1 min-w-0 bg-text-base/5 border border-text-base/10 rounded-lg px-3 py-2 text-[13px] text-text-base/70 font-mono outline-none focus:border-text-base/20 uppercase"
        />

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute left-0 bottom-full mb-2 z-50 bg-[var(--dropdown-bg)] border border-text-base/8 rounded-xl p-3.5 shadow-[0_12px_40px_var(--shadow-color)] flex flex-col gap-2.5 min-w-[200px]" style={{ boxShadow: '0 12px 40px var(--shadow-color), 0 0 1px var(--border-base)' }}>
              <HexColorPicker color={safeColor} onChange={onChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function IconPlayground({ theme }: { theme: string }) {
  const icons = useMemo(() => getShuffledIcons(), []);
  const [selected, setSelected] = useState(() => icons[0]);
  const isLight = theme === 'light';
  const [color, setColor] = useState(isLight ? '#111111' : '#ffffff');
  const [size, setSize] = useState(32);
  const [weight, setWeight] = useState<'outline' | 'filled'>('outline');

  useEffect(() => {
    if (color === '#ffffff' && theme === 'light') {
      setColor('#111111');
    } else if (color === '#111111' && theme === 'dark') {
      setColor('#ffffff');
    }
  }, [theme, color]);

  const displayColor = HEX_RE.test(color) ? color : (isLight ? '#111111' : '#ffffff');
  const pascalName = (iconNamesData as Record<string, string>)[selected] || selected;

  const reset = () => {
    setColor(isLight ? '#111111' : '#ffffff');
    setSize(32);
    setWeight('outline');
  };

  return (
    <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
      <div className="text-center mb-10">
        <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Playground</div>
        <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] text-text-base leading-[1.15] tracking-[-0.02em] mb-3">Pick one. Make it yours.</h2>
        <p className="text-[15px] text-text-base/45 leading-[1.65] max-w-[490px] mx-auto">
          Same grid, same rhythm across every icon. Choose one, then tweak color, size, and weight — and watch the whole set update live.
        </p>
      </div>

      <div className="bg-text-base/3 rounded-[14px] overflow-hidden">
        <div className="grid lg:grid-cols-[300px_1fr]">
          {/* Left — preview + controls */}
          <div className="p-5 lg:p-6 lg:border-r border-b lg:border-b-0 border-text-base/6 flex flex-col">
            {/* Large preview — real icon design keyline canvas */}
            <div className="relative w-full aspect-square max-w-[220px] mx-auto bg-text-base/2 border border-text-base/6 rounded-xl flex items-center justify-center overflow-hidden">
              {/* Graph-paper grid (24-unit) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, var(--border-muted) 1px, transparent 1px), linear-gradient(to bottom, var(--border-muted) 1px, transparent 1px)',
                  backgroundSize: 'calc(100%/12) calc(100%/12)',
                  maskImage: 'radial-gradient(circle at center, #000 62%, transparent 92%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, #000 62%, transparent 92%)',
                }}
              />

              {/* Accent glow behind the glyph */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, rgba(108,92,231,0.12), transparent 58%)' }}
              />

              {/* Keyline shapes — the recognizable icon design grid */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" fill="none">
                {/* dashed safe area */}
                <rect x="9" y="9" width="82" height="82" rx="7" stroke="var(--border-base)" strokeWidth="0.5" strokeDasharray="2.5 2.5" />
                {/* portrait + landscape keylines */}
                <rect x="32" y="14" width="36" height="72" rx="7" stroke="#6C5CE7" strokeOpacity="0.16" strokeWidth="0.5" />
                <rect x="14" y="32" width="72" height="36" rx="7" stroke="#6C5CE7" strokeOpacity="0.16" strokeWidth="0.5" />
                {/* center crosshair */}
                <line x1="50" y1="5" x2="50" y2="95" stroke="#6C5CE7" strokeOpacity="0.28" strokeWidth="0.4" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="#6C5CE7" strokeOpacity="0.28" strokeWidth="0.4" />
              </svg>

              {/* Corner crop marks */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#6C5CE7]/35" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#6C5CE7]/35" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#6C5CE7]/35" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#6C5CE7]/35" />

              {/* Spec labels */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[7.5px] font-mono text-[#6C5CE7]/45 select-none tracking-wider">24<span className="text-text-base/20"> × </span>24</span>
              <span className="absolute bottom-2 right-3 text-[8px] font-mono text-text-base/30 tabular-nums select-none">{size}px</span>
              <span className="absolute bottom-2 left-3 text-[8px] font-mono text-text-base/25 select-none lowercase">{weight}</span>

              <re-icon icon={selected} size={96} weight={weight} color={displayColor} />
            </div>

            {/* Name + code */}
            <div className="w-full mt-5 flex items-center justify-between">
              <span className="text-[14px] text-text-base font-semibold">{pascalName}</span>
              <span className="text-[11px] text-text-base/30 bg-text-base/4 border border-text-base/6 rounded px-2 py-0.5 font-mono">{selected}</span>
            </div>

            {/* Controls */}
            <div className="w-full mt-6 pt-5 border-t border-text-base/6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.08em] text-text-base/30 font-semibold">Controls</span>
                <button
                  onClick={reset}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-text-base/30 hover:text-text-base/60 hover:bg-text-base/5 transition-colors cursor-pointer"
                  title="Reset"
                  aria-label="Reset controls"
                >
                  <Restart size={16} />
                </button>
              </div>

              <ColorPicker color={color} onChange={setColor} theme={theme} />

              {/* Size */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-[13px] text-text-base/50">Size</label>
                  <span className="text-[13px] text-text-base/30 font-mono">{size}px</span>
                </div>
                <input
                  type="range"
                  min={16}
                  max={48}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none bg-text-base/10 accent-[#6C5CE7] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6C5CE7] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(108,92,231,0.5)]"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="text-[13px] text-text-base/50 mb-2 block">Weight</label>
                <div className="flex gap-2">
                  {(['outline', 'filled'] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeight(w)}
                      className={`flex-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${weight === w
                        ? 'bg-[#6C5CE7]/15 text-[#6C5CE7] border border-[#6C5CE7]/30'
                        : 'bg-text-base/5 text-text-base/40 border border-text-base/10 hover:text-text-base/60'
                        }`}
                    >
                      {w.charAt(0).toUpperCase() + w.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — live glyph grid (click to select) */}
          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 border-l border-t border-text-base/4">
              {icons.map((name) => {
                const isSelected = name === selected;
                return (
                  <button
                    key={name}
                    onClick={() => setSelected(name)}
                    className={`aspect-square flex items-center justify-center border-r border-b transition-colors cursor-pointer ${isSelected
                      ? 'bg-[#6C5CE7]/10 border-[#6C5CE7]/25'
                      : 'border-text-base/4 hover:bg-text-base/3'
                      }`}
                    title={(iconNamesData as Record<string, string>)[name] || name}
                  >
                    <re-icon
                      icon={name}
                      size={size}
                      weight={weight}
                      color={displayColor}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// Launch Banner
// ─────────────────────────────────────────────────────────────────────────────
function LaunchBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem('reicon-launch-banner-v1') === 'dismissed'; }
    catch { return false; }
  });

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try { localStorage.setItem('reicon-launch-banner-v1', 'dismissed'); } catch { }
  };

  return (
    <div
      className="relative z-[300] flex items-center justify-center px-10 py-1.5 bg-bg-base transition-colors duration-300"
    >
      {/* Desktop */}
      <span className="hidden sm:inline-flex items-center gap-1.5 text-[13px] text-text-base/45">
        <img src="/rocket.webp" alt="" aria-hidden width={28} height={28} style={{ display: 'inline', verticalAlign: 'middle', flexShrink: 0 }} />
        We launched our core package —
        <code className="font-mono text-text-base/75 font-semibold text-[12px] bg-text-base/6 px-1.5 py-0.5 rounded-md">npm i reicon</code>
        <span className="text-text-base/15">·</span>
        <a
          href="https://www.npmjs.com/package/reicon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-base/50 hover:text-text-base/80 transition-colors underline underline-offset-2 decoration-text-base/20 cursor-pointer"
        >
          npm
        </a>
        <span className="text-text-base/15">·</span>
        <Link
          to="/usage"
          className="text-text-base/50 hover:text-text-base/80 transition-colors underline underline-offset-2 decoration-text-base/20"
        >
          Docs
        </Link>
      </span>

      {/* Mobile — rocket + tappable code pill → docs */}
      <Link
        to="/usage"
        className="inline-flex sm:hidden items-center gap-1.5 text-[12px] text-text-base/45"
      >
        <img src="/rocket.webp" alt="" aria-hidden width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle', flexShrink: 0 }} />
        We have launched —
        <code className="font-mono text-text-base/70 font-semibold bg-text-base/6 px-1.5 py-0.5 rounded-md">npm i reicon</code>
      </Link>

      {/* Dismiss */}
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-base/80 hover:text-text-base/55 transition-colors cursor-pointer"
        style={{ background: 'none', border: 'none', display: 'flex', padding: '4px' }}
      >
        <re-icon icon="x" size="12" color="currentColor" />
      </button>
    </div>
  );
}
