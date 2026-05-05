import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ShieldCheck, Code, Palette, Layers, Copy, Box, Star, AltArrowRight, AltArrowDown, Download, Figma, HandHeart, MapArrowRight, Magnifier, RoundedMagnifier, Book, Book2, BookMinimalistic, Restart } from 'reicon-react';
import Background from '../components/Background';
import ClayButton from '../components/ClayButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SiJavascript, SiReact } from 'react-icons/si';

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
                <a href="/usage" className="text-[13px] text-white/60 hover:text-white transition-colors">Usage</a>
                <a href="#integrations" className="text-[13px] text-white/60 hover:text-white transition-colors">Integrations</a>
                <a href="/icons" className="text-[13px] text-white/60 hover:text-white transition-colors">Icons</a>
              </nav>
              <div className="hidden md:flex gap-2">
                <a
                  href="https://github.com/reicon-dev/reicon"
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
                Precision-crafted, open-source SVG icons for React, Figma, and the web. Pixel-perfect. No auto-generation.
              </p>
              <div className="flex items-center justify-center gap-[10px] flex-wrap">
                <ClayButton to="/icons" variant="primary">
                  <RoundedMagnifier size={16} />
                  Browse Icons
                </ClayButton>
                <Link
                  to="/usage"
                  className="bg-white/10 text-white text-[14px] px-6 py-3 rounded-full border border-white/[0.24] backdrop-blur-lg flex items-center gap-[6px] hover:bg-white/18 transition-colors"
                >
                  <BookMinimalistic size={16} />
                  Usage Guide
                </Link>
              </div>
            </div>

            {/* Bottom bar — stats + scroll hint */}
            <div className="flex items-end justify-center sm:justify-between">
              <div className="flex gap-[26px]">
                {[
                  { num: '1246+', label: 'Icons' },
                  { num: '2', label: 'Weights' },
                  { num: 'MIT', label: 'License' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-[19px] font-semibold text-white leading-[1.2]">{s.num}</div>
                    <div className="text-[11px] text-white/45">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="hidden sm:flex items-center gap-[5px] text-[11px] text-white/40">
                Scroll to explore
                <span className="animate-bounce"><AltArrowDown size={14} /></span>
              </div>
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

      {/* ═══ PLAYGROUND ═══ */}
      <PlaygroundSection />

      {/* ═══ INTEGRATIONS ═══ */}
      <section id="integrations" className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
        <div className="text-center mb-14">
          <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Integrations</div>
          <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] font-semibold text-white leading-[1.15] tracking-[-0.02em] mb-3">Works everywhere you do.</h2>
          <p className="text-[15px] text-white/45 leading-[1.65] max-w-[490px] mx-auto">
            Easy Integration with React and JavaScript
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-[14px]">
          <IntegrationCard icon={<SiReact size={18} color='#61dafb' />} title="React" copyText={`import { Home } from 'reicon-react';

<Home size={24} weight="outline" />`} lines={
              <>
                <div>
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

      {/* ═══ HOW TO USE ═══ */}
      <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
        <div className="text-center mb-14">
          <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Quick Start</div>
          <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] font-semibold text-white leading-[1.15] tracking-[-0.02em] mb-3">Up and running in 30 seconds.</h2>
          <p className="text-[15px] text-white/45 leading-[1.65] max-w-[490px] mx-auto">
            Install the package, import an icon, and you're done. It's that simple.
          </p>
        </div>

        <div className="grid md:grid-cols-[280px_1fr] gap-6 items-stretch">
          {/* Left — Steps timeline */}
          <div className="flex flex-col justify-between py-4">
            {[
              { num: '1', title: 'Install the package', desc: 'Add reicon-react to your project via npm, yarn, or pnpm.' },
              { num: '2', title: 'Import an icon', desc: 'Tree-shakeable — only the icons you use end up in your bundle.' },
              { num: '3', title: 'Use it anywhere', desc: 'Drop it into JSX with full prop control: size, weight, color.' },
            ].map((step, i) => (
              <div key={step.num} className="flex gap-4">
                {/* Connector line + dot */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#6C5CE7]/15 border border-[#6C5CE7]/30 flex items-center justify-center text-[#6C5CE7] text-[13px] font-semibold shrink-0">
                    {step.num}
                  </div>
                  {i < 2 && <div className="w-px flex-1 bg-white/[0.06] my-1" />}
                </div>
                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-white font-medium text-[14px] mb-1">{step.title}</h3>
                  <p className="text-white/40 text-[13px] leading-[1.6]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Terminal-style code block */}
          <div className="bg-[#0e0e10] border border-white/[0.06] rounded-[14px] overflow-hidden">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[12px] text-white/25 font-mono">App.tsx</span>
            </div>
            {/* Code content */}
            <div className="p-5 font-mono text-[13px] leading-[1.85] overflow-x-auto">
              <div className="text-white/25">{'// Step 1: Install'}</div>
              <div><span className="text-[#ffbd2e]">$</span> <span className="text-white/70">npm i reicon-react</span></div>
              <div className="h-4" />
              <div className="text-white/25">{'// Step 2: Import'}</div>
              <div>
                <span className="text-[#c678dd]">import</span>
                <span className="text-white/70"> {'{ '}</span>
                <span className="text-[#e5c07b]">Home</span>
                <span className="text-white/70">{' }'} </span>
                <span className="text-[#c678dd]">from</span>
                <span className="text-[#98c379]"> 'reicon-react'</span>
                <span className="text-white/30">;</span>
              </div>
              <div className="h-4" />
              <div className="text-white/25">{'// Step 3: Use'}</div>
              <div>
                <span className="text-[#c678dd]">export default</span>
                <span className="text-[#61afef]"> function</span>
                <span className="text-[#e5c07b]"> App</span>
                <span className="text-white/70">() {'{'}</span>
              </div>
              <div>
                <span className="text-white/70">{'  '}return {'<'}</span>
                <span className="text-[#e06c75]">Home</span>
                <span className="text-[#d19a66]"> size</span>
                <span className="text-white/50">=</span>
                <span className="text-white/70">{'{'}24{'}'}</span>
                <span className="text-[#d19a66]"> weight</span>
                <span className="text-white/50">=</span>
                <span className="text-[#98c379]">"Filled"</span>
                <span className="text-white/70"> /{'>'}</span>
              </div>
              <div><span className="text-white/70">{'}'}</span></div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ CTA ═══ */}
      <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
        <div className="bg-[#0e0e10] rounded-[14px] p-10 md:p-[60px_52px] text-center md:text-left md:grid md:grid-cols-[1fr_auto] md:gap-11 md:items-center">
          <div>
            <h2 className="font-serif text-[clamp(22px,2.8vw,40px)] font-semibold text-white leading-[1.15] tracking-[-0.02em] mb-3">Ready to get started?</h2>
            <p className="text-[15px] text-white/45 leading-[1.6]">Join thousands of designers and developers using Reicon in production.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3 mt-6 md:mt-0 shrink-0">
            <ClayButton to="/icons" variant="primary" className="w-full justify-center">
              <RoundedMagnifier size={16} />
              Browse Icons
            </ClayButton>
            <a
              href="https://github.com/reicon-dev/reicon"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center bg-white/10 text-white border border-white/20 px-7 py-3 rounded-full font-medium text-[14px] hover:bg-white/20 active:scale-[0.97] transition-all inline-flex items-center gap-2"
            >
              <Star size={15} />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
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

const PLAYGROUND_ICONS = [
  'home', 'star', 'heart', 'magnifier', 'settings', 'bell',
  'user', 'lock', 'camera', 'map-point', 'music-note', 'download',
  'cloud', 'lightning', 'palette', 'code', 'eye', 'bookmark',
  'gift', 'shield', 'compass', 'microphone', 'wi-fi-router', 'battery-charge',
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

      <div className="bg-[#0e0e10] rounded-[14px] border border-white/[0.06] overflow-hidden">
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

