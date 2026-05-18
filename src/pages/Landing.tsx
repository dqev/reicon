import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, Code, Palette, Layers, Copy, Box, Star, ArrowDown2, HandHeart, Search3, Book3, Restart, Pointer } from 'reicon-react';
import Background from '../components/Background';
import ClayButton from '../components/ClayButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SiJavascript, SiReact } from 'react-icons/si';
import iconNamesData from '../../scripts/icon-names.json';

export default function Landing() {
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
    <div className="bg-[#09090b] min-h-screen">
      <Helmet>
        <title>Reicon — Free Open-Source Icon Library for Designers & Developers</title>
        <meta name="description" content="Reicon is a free, open-source icon library with 1700+ handcrafted, pixel-perfect SVG icons. Available for React, Vue, Figma, and the web. MIT licensed." />
        <link rel="canonical" href="https://reicon.dev/" />
        <meta name="keywords" content="free icon library, open source icons, SVG icons, React icons, Vue icons, Figma icons, web icons, pixel perfect icons, reicon" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Reicon — Free Open-Source Icon Library" />
        <meta property="og:description" content="Free, open-source SVG icon library with 1700+ handcrafted icons for React, Vue, Figma, and the web." />
        <meta property="og:image" content="https://reicon.dev/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Reicon — Free Open-Source Icon Library" />
        <meta name="twitter:description" content="Free, open-source SVG icon library with 1700+ handcrafted icons for React, Vue, Figma, and the web." />
        <meta name="twitter:image" content="https://reicon.dev/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" }
          ]
        })}</script>
      </Helmet>
      {/* ═══ FIXED NAV — fades in after scrolling past hero ═══ */}
      <Header
        ref={fixedNavRef}
        className="opacity-0 pointer-events-none transition-opacity duration-300 z-[200]"
      />

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
            {/* Top bar — hero-internal nav */}
            <div className="relative flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 text-white font-semibold text-[15px]">
                <img src="/reicon.png" alt="Reicon" className="w-5 h-5" />
                Reicon
              </Link>
              <nav className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
                <Link to="/usage" className="text-[13px] text-white/60 hover:text-white transition-colors">Usage</Link>
                <a href="#integrations" className="text-[13px] text-white/60 hover:text-white transition-colors">Integrations</a>
                <Link to="/icons" className="text-[13px] text-white/60 hover:text-white transition-colors">Icons</Link>
              </nav>
              <div className="hidden md:flex gap-2">
                <a
                  href="https://github.com/devchauhann/reicon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-white/80 border border-white/25 bg-white/8 backdrop-blur-lg rounded-full px-4 py-[7px] hover:bg-white/15 transition-colors"
                >
                  GitHub
                </a>
                <ClayButton to="/icons" variant="primary" size="sm">
                  Browse Icons
                </ClayButton>
              </div>
            </div>

            {/* Center content */}
            <div className="text-center px-3">
              <div className="inline-flex items-center gap-[6px] bg-white/12 backdrop-blur-lg border border-white/20 rounded-full px-[14px] py-[5px] text-[12px] text-white/90 mb-5">
                <span className="w-[6px] h-[6px] bg-[#7fff7f] rounded-full shrink-0" />
                Handcrafted & Open Source
              </div>
              <h1 className="font-serif text-[clamp(30px,6.2vw,76px)] font-semibold text-white leading-[1.08] tracking-[-0.02em] mb-4">
                The icon library<br />designers actually want.
              </h1>
              <p className="text-[clamp(13px,1.45vw,18px)] text-white/60 leading-[1.65] max-w-[480px] mx-auto mb-7">
                Precision-crafted, open-source SVG icons for React, Vue, Figma, and the web. Pixel-perfect. No auto-generation.
              </p>
              <div className="flex items-center justify-center gap-[10px] flex-wrap">
                <ClayButton to="/icons" variant="primary">
                  <Search3 size={16} />
                  Browse Icons
                </ClayButton>
                <Link
                  to="/usage"
                  className="bg-white/10 text-white text-[14px] px-6 py-3 rounded-full border border-white/[0.24] backdrop-blur-lg flex items-center gap-[6px] hover:bg-white/18 transition-colors"
                >
                  <Book3 size={16} />
                  Usage Guide
                </Link>
              </div>
            </div>

            {/* Bottom bar — stats + scroll hint */}
            <div className="flex items-end justify-center sm:justify-between">
              <div className="flex gap-[26px]">
                {[
                  { num: '1700+', label: 'Icons' },
                  { num: '2', label: 'Weights' },
                  { num: 'MIT', label: 'License' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-[19px] font-semibold text-white leading-[1.2]">{s.num}</div>
                    <div className="text-[11px] text-white/45">{s.label}</div>
                  </div>
                ))}
              </div>
              <a
                href="https://fluidshader.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-[15px] text-white/50 hover:text-white/70 transition-colors"
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
          <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] font-semibold text-white leading-[1.15] tracking-[-0.02em] mb-3">Built different. By design.</h2>
          <p className="text-[15px] text-white/45 leading-[1.65] max-w-[490px] mx-auto">
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

      {/* ═══ CONSISTENCY GRID ═══ */}
      <ConsistencyGrid />

      {/* ═══ PLAYGROUND ═══ */}
      <PlaygroundSection />

      {/* ═══ INTEGRATIONS ═══ */}
      <section id="integrations" className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
        <div className="text-center mb-14">
          <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Integrations</div>
          <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] font-semibold text-white leading-[1.15] tracking-[-0.02em] mb-3">Works everywhere you do.</h2>
          <p className="text-[15px] text-white/45 leading-[1.65] max-w-[490px] mx-auto">
            Easy Integration with React, Vue, and JavaScript
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-[14px]">
          <IntegrationCard icon={<SiReact size={18} color='#61dafb' />} title="React" copyText={`import { Home } from 'reicon-react';

<Home size={24} weight="outline" />`} lines={
              <>
                <div>
                  <div><span className="text-[#ffbd2e]">$</span><span className="text-[#e06c75]"> npm</span> <span className="text-white/70"> i reicon-react</span></div>
                  <div className="h-2" />
                  <span className="text-[#c678dd]">import</span>
                  <span className="text-white/70"> {'{ '}</span>
                  <span className="text-[#e5c07b]">Home</span>
                  <span className="text-white/70">{' }'} </span>
                  <span className="text-[#c678dd]">from</span>
                  <span className="text-[#98c379]"> 'reicon-react'</span>
                  <span className="text-white/30">;</span>
                </div>
                <div className="h-3" />
                <div>
                  <span className="text-white/20">&lt;</span>
                  <span className="text-[#e06c75]">Home</span>
                  <span className="text-[#d19a66]"> size</span>
                  <span className="text-white/30">=</span>
                  <span className="text-white/70">{'{'}24{'}'}</span>
                  <span className="text-[#d19a66]"> weight</span>
                  <span className="text-white/30">=</span>
                  <span className="text-[#98c379]">"outline"</span>
                  <span className="text-white/20"> /&gt;</span>
                </div>
              </>
            } />
          <IntegrationCard icon={<svg width={18} height={18} viewBox="0 0 122.88 106.42" fill="none"><polygon fill="#4DBA87" points="75.63,0 61.44,24.58 47.25,0 0,0 61.44,106.42 122.88,0 75.63,0" /><polygon fill="#425466" points="75.63,0 61.44,24.58 47.25,0 24.58,0 61.44,63.85 98.3,0 75.63,0" /></svg>} title="Vue" copyText={`import { Home } from 'reicon-vue';

<Home :size="24" weight="Outline" />`} lines={
              <>
                <div>
                  <div><span className="text-[#ffbd2e]">$</span><span className="text-[#e06c75]"> npm</span> <span className="text-white/70"> i reicon-vue</span></div>
                  <div className="h-2" />
                  <span className="text-[#c678dd]">import</span>
                  <span className="text-white/70"> {'{ '}</span>
                  <span className="text-[#e5c07b]">Home</span>
                  <span className="text-white/70">{' }'} </span>
                  <span className="text-[#c678dd]">from</span>
                  <span className="text-[#98c379]"> 'reicon-vue'</span>
                  <span className="text-white/30">;</span>
                </div>
                <div className="h-3" />
                <div>
                  <span className="text-white/20">&lt;</span>
                  <span className="text-[#e06c75]">Home</span>
                  <span className="text-[#d19a66]"> :size</span>
                  <span className="text-white/30">=</span>
                  <span className="text-[#98c379]">"24"</span>
                  <span className="text-[#d19a66]"> weight</span>
                  <span className="text-white/30">=</span>
                  <span className="text-[#98c379]">"Outline"</span>
                  <span className="text-white/20"> /&gt;</span>
                </div>
              </>
            } />
          <IntegrationCard icon={<SiJavascript size={18} color='#f7df1e' />} title="JavaScript (CDN)" copyText={`<script src="https://cdn.reicon.dev/cdn/reicon.min.js"></script>

<re-icon icon="home"></re-icon>`} lines={
              <>
                <div>
                  <span className="text-white/20">&lt;</span>
                  <span className="text-[#e06c75]">script</span>
                  <span className="text-[#d19a66]"> src</span>
                  <span className="text-white/30">=</span>
                  <span className="text-[#98c379]">"https://cdn.reicon.dev/cdn/reicon.min.js"</span>
                  <span className="text-white/20">&gt;&lt;/</span>
                  <span className="text-[#e06c75]">script</span>
                  <span className="text-white/20">&gt;</span>
                </div>
                <div className="h-3" />
                <div>
                  <span className="text-white/20">&lt;</span>
                  <span className="text-[#e06c75]">re-icon</span>
                  <span className="text-[#d19a66]"> icon</span>
                  <span className="text-white/30">=</span>
                  <span className="text-[#98c379]">"home"</span>
                  <span className="text-white/20">&gt;&lt;/</span>
                  <span className="text-[#e06c75]">re-icon</span>
                  <span className="text-white/20">&gt;</span>
                </div>
              </>
            } />
        </div>
      </section>

      {/* ═══ ICON SHOWCASE ═══ */}
      <IconShowcase />

      {/* ═══ CTA ═══ */}
      <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
        <div className="relative bg-[#0e0e10] rounded-[14px] overflow-hidden">
          {/* Watermark scribbles */}
          <div className="absolute -top-10 -left-10 md:-top-14 md:-left-14 pointer-events-none select-none opacity-[0.04] rotate-[195deg]">
            <re-icon icon="scribble" size={180} color="#fff" weight="outline" className="block md:hidden" />
            <re-icon icon="scribble" size={300} color="#fff" weight="outline" className="hidden md:block" />
          </div>
          <div className="absolute -bottom-10 -right-10 md:-bottom-14 md:-right-14 pointer-events-none select-none opacity-[0.04] rotate-[15deg]">
            <re-icon icon="scribble" size={180} color="#fff" weight="outline" className="block md:hidden" />
            <re-icon icon="scribble" size={300} color="#fff" weight="outline" className="hidden md:block" />
          </div>

          <div className="relative z-10 py-14 md:py-20 px-6 md:px-14 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left — text */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-serif text-[clamp(24px,3.2vw,42px)] font-semibold text-white leading-[1.12] tracking-[-0.02em] mb-3">
                Your next project<br className="hidden md:block" /> deserves better icons.
              </h2>
              <p className="text-[15px] text-white/40 leading-[1.65] max-w-[420px] mx-auto md:mx-0 mb-6">
                1700+ handcrafted, pixel-perfect SVG icons. MIT licensed. Zero dependencies. Two weights. Ready to ship.
              </p>

              {/* Install command */}
              <div className="inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5">
                <span className="text-[#6C5CE7] text-[13px] font-mono font-medium">$</span>
                <code className="text-[13px] font-mono text-white/50">npm i reicon-react</code>
                <CopyButton text="npm i reicon-react" />
              </div>
            </div>

            {/* Right — actions */}
            <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
              <ClayButton to="/icons" variant="primary" className="w-full justify-center">
                <Search3 size={16} />
                Browse 1700+ Icons
              </ClayButton>
              <a
                href="https://github.com/devchauhann/reicon"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-center bg-white/[0.05] text-white border border-white/[0.1] px-7 py-3 rounded-full font-medium text-[14px] hover:bg-white/[0.1] active:scale-[0.97] transition-all inline-flex items-center gap-2"
              >
                <Star size={15} />
                Star on GitHub
              </a>
              <Link
                to="/usage"
                className="w-full justify-center inline-flex items-center gap-1.5 text-[13px] text-white/30 hover:text-white/60 transition-colors mt-1"
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
    <button onClick={handleCopy} className="text-white/30 hover:text-white/60 transition-colors">
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

function IconShowcase() {
  return (
    <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13 overflow-hidden">
      <div className="text-center mb-10 px-5">
        <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Icon Library</div>
        <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] font-semibold text-white leading-[1.15] tracking-[-0.02em] mb-3">1700+ icons. Every one handcrafted.</h2>
        <p className="text-[15px] text-white/45 leading-[1.65] max-w-[490px] mx-auto">
          From UI essentials to expressive details — find exactly what you need.
        </p>
      </div>

      {/* Orbit container */}
      <div className="relative w-full aspect-square max-w-[520px] mx-auto [mask-image:radial-gradient(circle,black_40%,transparent_72%)]">
        {/* Center logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <img src="/reicon.png" alt="Reicon" className="w-8 h-8 md:w-10 md:h-10" />
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
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center animate-orbit-counter-slow">
                    <re-icon icon={name} size={18} color="rgba(255,255,255,0.5)" weight="outline" />
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
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center animate-orbit-counter-mid">
                    <re-icon icon={name} size={18} color="rgba(255,255,255,0.4)" weight="outline" />
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
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center animate-orbit-counter-fast">
                    <re-icon icon={name} size={18} color="rgba(255,255,255,0.3)" weight="outline" />
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
    <div className="bg-[#0e0e10] rounded-[14px] p-[34px_30px]">
      <div className="w-10 h-10 rounded-[9px] bg-white/[0.06] flex items-center justify-center text-white/70 text-[18px] mb-4">
        {icon}
      </div>
      <h3 className="text-[14px] font-semibold text-white mb-[7px]">{title}</h3>
      <p className="text-[13px] text-white/45 leading-[1.65]">{description}</p>
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
    <div className="bg-[#0e0e10] rounded-[14px] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-[14px] font-semibold text-white">{title}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[12px] text-white/30 hover:text-white/60 transition-colors"
        >
          {copied ? (
            <><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>Copied</>
          ) : (
            <><Copy size={14} />Copy</>
          )}
        </button>
      </div>
      <div className="p-5 font-mono text-[13px] leading-[1.85] overflow-x-auto">
        {lines}
      </div>
    </div>
  );
}

const ALL_ICON_NAMES = Object.keys(iconNamesData);
const CONSISTENCY_COUNT = 70;

function getShuffledIcons() {
  const shuffled = [...ALL_ICON_NAMES];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, CONSISTENCY_COUNT);
}

function ConsistencyGrid() {
  const icons = useMemo(() => getShuffledIcons(), []);
  const [selected, setSelected] = useState(() => icons[0]);
  const [weight, setWeight] = useState<'outline' | 'filled'>('outline');

  const pascalName = (iconNamesData as Record<string, string>)[selected] || selected;

  return (
    <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
      <div className="text-center mb-10">
        <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Consistency</div>
        <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] font-semibold text-white leading-[1.15] tracking-[-0.02em] mb-3">Every icon, one rhythm.</h2>
        <p className="text-[15px] text-white/45 leading-[1.65] max-w-[490px] mx-auto">
          Same stroke width, same optical weight, same grid. Click any icon to inspect it.
        </p>
      </div>

      <div className="bg-[#0e0e10] rounded-[14px] overflow-hidden">
        <div className="grid lg:grid-cols-[280px_1fr]">
          {/* Left — detail panel */}
          <div className="p-5 lg:p-6 lg:border-r border-b lg:border-b-0 border-white/[0.06] flex flex-col items-center">
            {/* Weight toggle */}
            <div className="w-full flex items-center justify-between mb-5">
              <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.06] rounded-lg p-0.5">
                {(['outline', 'filled'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`text-[11px] font-medium px-3 py-1.5 rounded-md transition-colors ${weight === w ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/55'
                      }`}
                  >
                    {w.charAt(0).toUpperCase() + w.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Large preview with alignment guides */}
            <div className="relative w-full aspect-square max-w-[200px] bg-white/[0.015] border border-white/[0.06] rounded-xl flex items-center justify-center overflow-hidden">
              {/* Grid guides */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#6C5CE7]/15" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#6C5CE7]/15" />
                <div className="absolute top-[16.67%] left-0 right-0 h-px border-t border-dashed border-white/[0.05]" />
                <div className="absolute bottom-[16.67%] left-0 right-0 h-px border-t border-dashed border-white/[0.05]" />
                <div className="absolute left-[16.67%] top-0 bottom-0 w-px border-l border-dashed border-white/[0.05]" />
                <div className="absolute right-[16.67%] top-0 bottom-0 w-px border-l border-dashed border-white/[0.05]" />
              </div>
              {/* Guide labels */}
              <span className="absolute left-1.5 top-[16.67%] -translate-y-1/2 text-[7px] text-[#6C5CE7]/40 font-mono select-none">cap</span>
              <span className="absolute left-1.5 bottom-[16.67%] translate-y-1/2 text-[7px] text-[#6C5CE7]/40 font-mono select-none">base</span>
              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[7px] text-[#6C5CE7]/40 font-mono select-none">mid</span>

              <re-icon icon={selected} size={88} weight={weight} color="rgba(255,255,255,0.85)" />
            </div>

            {/* Info */}
            <div className="w-full mt-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-white font-semibold">{pascalName}</span>
                <span className="text-[10px] text-white/20 font-mono uppercase">{weight}</span>
              </div>
              <span className="inline-block text-[11px] text-white/30 bg-white/[0.04] border border-white/[0.06] rounded px-2 py-0.5 font-mono">
                {selected}
              </span>
            </div>

            {/* Size comparison */}
            <div className="w-full mt-6 pt-5 border-t border-white/[0.06]">
              <span className="text-[9px] uppercase tracking-[0.08em] text-white/20 font-semibold">Size comparison</span>
              <div className="flex items-end gap-3 mt-3">
                {[14, 18, 24, 32, 48].map((s) => (
                  <div key={s} className="flex flex-col items-center gap-1">
                    <div
                      className="flex items-center justify-center bg-white/[0.025] border border-white/[0.06] rounded-lg"
                      style={{ width: Math.max(s + 10, 24), height: Math.max(s + 10, 24) }}
                    >
                      <re-icon icon={selected} size={s} weight={weight} color="rgba(255,255,255,0.55)" />
                    </div>
                    <span className="text-[8px] text-white/15 font-mono">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — dense glyph grid */}
          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 border-l border-t border-white/[0.04]">
              {icons.map((name) => (
                <button
                  key={name}
                  onClick={() => setSelected(name)}
                  className={`aspect-square flex items-center justify-center border-r border-b transition-colors cursor-pointer ${name === selected
                    ? 'bg-[#6C5CE7]/10 border-[#6C5CE7]/25'
                    : 'border-white/[0.04] hover:bg-white/[0.03]'
                    }`}
                  title={(iconNamesData as Record<string, string>)[name] || name}
                >
                  <re-icon
                    icon={name}
                    size={20}
                    weight={weight}
                    color={name === selected ? 'rgba(108,92,231,0.9)' : 'rgba(255,255,255,0.5)'}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PLAYGROUND_ICONS = [
  'home', 'star', 'heart', 'search', 'settings', 'bell',
  'user', 'lock', 'camera', 'map-point', 'music-note', 'download',
  'cloud', 'lightning', 'palette', 'code', 'eye', 'bookmark',
  'gift', 'shield', 'compass', 'mic', 'wifi', 'battery-charge',
  'pen', 'folder', 'chat-round', 'lamp',
];

function PlaygroundSection() {
  const [color, setColor] = useState('#ffffff');
  const [size, setSize] = useState(32);
  const [weight, setWeight] = useState<'outline' | 'filled'>('outline');

  return (
    <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
      <div className="text-center mb-8">
        <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Playground</div>
        <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] font-semibold text-white leading-[1.15] tracking-[-0.02em] mb-3">Customize to your taste.</h2>
        <p className="text-[15px] text-white/45 leading-[1.65] max-w-[490px] mx-auto">
          Tweak color, size, and weight — see every icon update live.
        </p>
      </div>

      <div className="bg-[#0e0e10] rounded-[14px] overflow-hidden">
        <div className="grid lg:grid-cols-[260px_1fr]">
          {/* Controls */}
          <div className="p-4 lg:p-5 lg:border-r border-b lg:border-b-0 border-white/[0.06] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-white/50 font-medium">Controls</span>
              <button
                onClick={() => { setColor('#ffffff'); setSize(32); setWeight('outline'); }}
                className="w-7 h-7 flex items-center justify-center rounded-md text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
                title="Reset"
              >
                <Restart size={18} />
              </button>
            </div>
            {/* Color */}
            <div>
              <label className="text-[13px] text-white/50 mb-2 block">Color</label>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent appearance-none [&::-webkit-color-swatch-wrapper]:p-1 [&::-webkit-color-swatch]:rounded-[5px] [&::-webkit-color-swatch]:border-0"
                  />
                </div>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-white/70 font-mono outline-none focus:border-white/20"
                />
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[13px] text-white/50">Size</label>
                <span className="text-[13px] text-white/30 font-mono">{size}px</span>
              </div>
              <input
                type="range"
                min={16}
                max={48}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-white/10 accent-[#6C5CE7] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6C5CE7] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(108,92,231,0.5)]"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="text-[13px] text-white/50 mb-2 block">Weight</label>
              <div className="flex gap-2">
                {(['outline', 'filled'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`flex-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${weight === w
                      ? 'bg-[#6C5CE7]/15 text-[#6C5CE7] border border-[#6C5CE7]/30'
                      : 'bg-white/5 text-white/40 border border-white/10 hover:text-white/60'
                      }`}
                  >
                    {w.charAt(0).toUpperCase() + w.slice(1)}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Icon grid */}
          <div className="p-4 lg:p-5 flex items-center justify-center">
            <div className="w-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-0">
              {PLAYGROUND_ICONS.map((name) => (
                <div
                  key={name}
                  className="h-14 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors cursor-default"
                >
                  <re-icon
                    icon={name}
                    size={size}
                    color={color}
                    weight={weight}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

