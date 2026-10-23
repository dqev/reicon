import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PAGE_META } from '@/data/page-meta';
import ClayButton from '@/components/ui/Button';
import {
  Check,
  CheckCircle,
  CloseCircle,
  Copy,
  Download,
} from 'reicon-react';

const META = PAGE_META['/brand'];

/* Live-inline a public SVG file so currentColor inherits page color
   (plain <img> would render currentColor parts black on dark). */
const svgCache = new Map<string, Promise<string>>();
function loadSvg(href: string): Promise<string> {
  let p = svgCache.get(href);
  if (!p) {
    p = fetch(href).then((r) => {
      if (!r.ok) throw new Error(`Failed to load ${href}`);
      return r.text();
    });
    svgCache.set(href, p);
  }
  return p;
}

function UiFileIcon({ href, label }: { href: string; label: string }) {
  const [svg, setSvg] = useState<string | null>(null);
  useEffect(() => {
    let live = true;
    loadSvg(href)
      .then((t) => { if (live) setSvg(t); })
      .catch(() => { /* keep fallback tile */ });
    return () => { live = false; };
  }, [href]);
  if (!svg) return <span className="w-[22px] h-[22px] rounded-md bg-white/10 animate-pulse" />;
  return (
    <span
      role="img"
      aria-label={label}
      className="ui-file-icon inline-flex text-[#ededed]"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

const UI_FILES = [
  { file: 'compass.svg', name: 'Compass', usage: 'Getting started' },
  { file: 'code.svg', name: 'Code', usage: 'Framework picker' },
  { file: 'settings.svg', name: 'Settings', usage: 'Basics' },
  { file: 'palette.svg', name: 'Palette', usage: 'Guides · theming' },
  { file: 'help-circle.svg', name: 'Help circle', usage: 'Advanced' },
  { file: 'list.svg', name: 'List', usage: 'Table of contents' },
  { file: 'copy.svg', name: 'Copy', usage: 'Copy buttons' },
  { file: 'chevronExpandY.svg', name: 'Chevron expand', usage: 'Dropdowns' },
  { file: 'layer.svg', name: 'Layer', usage: 'Pixel-perfect feature' },
  { file: 'hand-heart.svg', name: 'Hand heart', usage: 'Handcrafted feature' },
  { file: 'shield-check.svg', name: 'Shield check', usage: 'Open-source feature' },
];

/* ── Small building blocks ─────────────────────────────────────────────── */

function Section({
  title,
  lede,
  children,
}: {
  title?: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="reveal max-w-[1160px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-16">
      {title && (
        <h2 className="font-sans font-normal text-[22px] sm:text-[26px] text-[#fefefe] tracking-[-0.02em] text-center">
          {title}
        </h2>
      )}
      {lede && (
        <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#8f8f8f] text-center max-w-[680px] mx-auto">
          {lede}
        </p>
      )}
      <div className={title || lede ? 'mt-10 sm:mt-12' : undefined}>{children}</div>
    </section>
  );
}

function RuleCard({
  ok,
  title,
  body,
  children,
}: {
  ok: boolean;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] bg-[#1a1a1a] card-inset overflow-hidden flex flex-col">
      <div className="relative flex items-center justify-center min-h-[168px] px-6 py-8 bg-white/[0.02]">
        <span
          className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 h-6 rounded-full"
          style={
            ok
              ? { backgroundColor: 'rgba(53, 186, 0, 0.12)', color: '#7bd88a' }
              : { backgroundColor: 'rgba(255, 95, 95, 0.12)', color: '#ff8f8f' }
          }
        >
          {ok ? <Check size={12} /> : <CloseCircle size={12} />}
          {ok ? 'Do' : "Don't"}
        </span>
        {children}
      </div>
      <div className="px-5 py-4">
        <p className="font-sans font-medium text-[15px] text-[#ffffff]">{title}</p>
        <p className="mt-1.5 text-[14px] leading-[1.6] text-[#8f8f8f]">{body}</p>
      </div>
    </div>
  );
}

function Swatch({ hex, name, usage }: { hex: string; name: string; usage: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button
      onClick={copy}
      className="group text-left rounded-[24px] bg-[#1a1a1a] card-inset overflow-hidden cursor-pointer border-0 p-0 w-full transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="h-[84px] w-full" style={{ backgroundColor: hex }} />
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="font-sans font-medium text-[14px] text-[#ffffff] truncate">{name}</p>
          <p className="text-[12px] text-white/45 truncate font-mono">{hex}</p>
          <p className="text-[12px] text-[#8f8f8f] truncate">{usage}</p>
        </div>
        <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] group-hover:bg-white/10 text-white/70 transition-colors">
          {copied ? <Check size={14} className="text-[#9B8AFB]" /> : <Copy size={14} />}
        </span>
      </div>
    </button>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function BrandPage() {
  // Scroll-reveal for sections (same as home)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="flex-1">
      <Helmet>
        <title>{META.title}</title>
        <meta name="description" content={META.description} />
        <link rel="canonical" href={META.url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={META.url} />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content={META.title} />
        <meta property="og:description" content={META.description} />
        <meta property="og:image" content={META.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content={META.title} />
        <meta name="twitter:description" content={META.description} />
        <meta name="twitter:image" content={META.ogImage} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "Brand Guidelines", "item": "https://reicon.dev/brand" }
          ]
        })}</script>
      </Helmet>

      {/* ── Hero (same language as home) ── */}
      <section className="relative w-full flex flex-col items-center justify-center pt-8 pb-4 md:pt-12 md:pb-8 px-4 sm:px-6">
        <h1 className="hero-title">
          Brand guidelines.
        </h1>
        <p className="hero-subtitle">
          One accent, one dark canvas, one display typeface — and icons only from
          Reicon. Follow these rules anywhere the brand appears.
        </p>
      </section>

      {/* ── Logo ── */}
      <Section>
        <div className="rounded-[24px] bg-[#1a1a1a] card-inset p-8 sm:p-12 flex flex-col items-center gap-7">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <div className="border border-dashed border-white/25 rounded-lg p-4">
              <img src="/favicon/favicon.svg" alt="Reicon mark" width="64" height="64" />
            </div>
            <span aria-hidden="true" className="hidden sm:block w-px self-stretch bg-white/15" />
            <div className="border border-dashed border-white/25 rounded-lg p-4">
              <img src="/favicon/wordmark.svg" alt="Reicon wordmark" width="289" height="64" className="h-16 w-auto" />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mt-4 md:mt-5">
          <div className="rounded-[24px] bg-[#1a1a1a] card-inset p-6">
            <p className="font-sans font-medium text-[15px] text-[#ffffff] mb-4">Clearspace</p>
            <div className="flex items-center justify-center py-2">
              <div className="border border-dashed border-[#9B8AFB]/50 rounded-lg p-5 relative">
                <span className="absolute -top-2 left-3 bg-[#1a1a1a] px-1 text-[10px] text-[#9B8AFB] font-mono">x</span>
                <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 bg-[#1a1a1a] px-0.5 text-[10px] text-[#9B8AFB] font-mono">x</span>
                <img src="/favicon/favicon.svg" alt="Reicon mark with clearspace" width="44" height="44" />
              </div>
            </div>
            <p className="text-[14px] text-[#8f8f8f] leading-[1.6] mt-3">
              Keep empty space equal to the mark height on all sides.
            </p>
          </div>
          <div className="rounded-[24px] bg-[#1a1a1a] card-inset p-6">
            <p className="font-sans font-medium text-[15px] text-[#ffffff] mb-4">Minimum size</p>
            <div className="flex items-end justify-center gap-6 py-2 min-h-[84px]">
              <span className="flex flex-col items-center gap-1.5">
                <img src="/favicon/favicon.svg" alt="32px" width="32" height="32" />
                <span className="text-[10px] text-white/40 font-mono">32</span>
              </span>
              <span className="flex flex-col items-center gap-1.5">
                <img src="/favicon/favicon.svg" alt="24px" width="24" height="24" />
                <span className="text-[10px] text-white/40 font-mono">24</span>
              </span>
              <span className="flex flex-col items-center gap-1.5">
                <img src="/favicon/favicon.svg" alt="18px minimum" width="18" height="18" />
                <span className="text-[10px] text-[#9B8AFB] font-mono">18 min</span>
              </span>
            </div>
            <p className="text-[14px] text-[#8f8f8f] leading-[1.6] mt-3">
              Never reproduce the mark below 18px on screen.
            </p>
          </div>
          <div className="rounded-[24px] bg-[#1a1a1a] card-inset p-6">
            <p className="font-sans font-medium text-[15px] text-[#ffffff] mb-4">Download assets</p>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Reicon mark', format: 'SVG', href: '/favicon/favicon.svg' },
                { label: 'Wordmark', format: 'SVG', href: '/favicon/wordmark.svg' },
                { label: 'Wordmark large', format: 'SVG', href: '/favicon/wordmark-big.svg' },
              ].map((f) => (
                <a
                  key={f.href}
                  href={f.href}
                  download
                  className="group flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] rounded-2xl pl-2 pr-3 py-1.5 transition-colors"
                >
                  <img
                    src="/framework-logos/svg.svg"
                    alt=""
                    aria-hidden="true"
                    width="36"
                    height="36"
                    className="shrink-0 w-9 h-9 rounded-xl object-contain bg-white/[0.04]"
                  />
                  <span className="flex-1 min-w-0">
                    <span className="block text-[14px] font-medium text-white/80 group-hover:text-white transition-colors truncate">
                      {f.label}
                    </span>
                    <span className="block text-[11px] font-mono text-white/40">
                      {f.format}
                    </span>
                  </span>
                  <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] group-hover:bg-[#9B8AFB] group-hover:text-white text-white/70 transition-colors">
                    <Download size={14} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Logo misuse ── */}
      <Section
        title="Use it like this, not like these"
        lede="Every example below is rendered live from the real logo file — the “don't” tiles apply exactly one forbidden transformation."
      >
        <p className="text-[14px] font-medium text-emerald-200/80 mb-4 flex items-center justify-center gap-1.5">
          <CheckCircle size={15} /> Correct usage
        </p>
        <div className="grid sm:grid-cols-3 gap-4 md:gap-5">
          <RuleCard ok title="Official files only" body="Use favicon.svg / wordmark.svg exactly as shipped. No redraws, no substitutions.">
            <img src="/favicon/favicon.svg" alt="Correct: official mark" width="60" height="60" />
          </RuleCard>
          <RuleCard ok title="Dark surfaces" body="Place the logo on #121212 or darker surfaces with enough contrast around it.">
            <div className="rounded-xl px-6 py-4 flex items-center gap-2" style={{ backgroundColor: '#121212', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
              <img src="/favicon/favicon.svg" alt="Correct: logo on dark" width="28" height="28" />
              <span className="text-[14px]"><span className="font-medium text-white">Reicon</span><span className="text-white/60">.dev</span></span>
            </div>
          </RuleCard>
          <RuleCard ok title="Keep proportions" body="Scale uniformly. Keep the mark square and the wordmark at its native ratio.">
            <img src="/favicon/wordmark.svg" alt="Correct: wordmark at native ratio" width="168" height="37" className="h-auto w-[168px]" />
          </RuleCard>
        </div>

        <p className="text-[14px] font-medium text-red-200/80 mb-4 mt-10 flex items-center justify-center gap-1.5">
          <CloseCircle size={15} /> Incorrect usage
        </p>
        <div className="grid sm:grid-cols-3 gap-4 md:gap-5">
          <RuleCard ok={false} title="Don't stretch" body="Never scale axes independently. Shown here at scaleX(1.35).">
            <img src="/favicon/favicon.svg" alt="Incorrect: stretched logo" width="60" height="60" style={{ transform: 'scaleX(1.35)' }} />
          </RuleCard>
          <RuleCard ok={false} title="Don't recolor" body="Never shift the hue or paint the mark another color. Shown with hue-rotate(120deg).">
            <img src="/favicon/favicon.svg" alt="Incorrect: recolored logo" width="60" height="60" style={{ filter: 'hue-rotate(120deg)' }} />
          </RuleCard>
          <RuleCard ok={false} title="Don't rotate" body="Keep the logo level. Shown rotated −12°.">
            <img src="/favicon/favicon.svg" alt="Incorrect: rotated logo" width="60" height="60" style={{ transform: 'rotate(-12deg)' }} />
          </RuleCard>
          <RuleCard ok={false} title="Don't add effects" body="No shadows, glows, bevels or outlines. Shown with a heavy drop shadow.">
            <img src="/favicon/favicon.svg" alt="Incorrect: drop shadow on logo" width="60" height="60" style={{ filter: 'drop-shadow(0 8px 12px rgba(155,138,251,0.9))' }} />
          </RuleCard>
          <RuleCard ok={false} title="Don't use busy backgrounds" body="Never place the logo on gradients, photos or clashing colors.">
            <div className="rounded-xl px-10 py-6" style={{ background: 'linear-gradient(135deg, #ff9a56, #ff5f95 50%, #9B8AFB)' }}>
              <img src="/favicon/favicon.svg" alt="Incorrect: logo on busy background" width="52" height="52" />
            </div>
          </RuleCard>
          <RuleCard ok={false} title="Don't retype the wordmark" body="Never reset “Reicon.dev” in another typeface, case or color.">
            <span style={{ fontFamily: 'Georgia, serif', color: '#ff5f56', fontSize: 24, fontStyle: 'italic' }}>
              Reicon.dev
            </span>
          </RuleCard>
        </div>
      </Section>

      {/* ── Color ── */}
      <Section
        title="Accent + dark canvas"
        lede="Reicon purple #9B8AFB is the only accent. Everything else is neutral dark surfaces and white text. Tap any swatch to copy its hex."
      >
        <p className="font-sans font-medium text-[16px] text-[#ffffff] mb-4 text-center">Accent scale</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <Swatch hex="#9B8AFB" name="Accent" usage="CTAs · links · active" />
          <Swatch hex="#A899FB" name="Accent hover" usage="Button hover" />
          <Swatch hex="#8875F9" name="Accent active" usage="Button pressed" />
          <Swatch hex="#35BA00" name="Success" usage="Live dots · ok states" />
        </div>
        <p className="font-sans font-medium text-[16px] text-[#ffffff] mb-4 mt-10 text-center">Surfaces</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <Swatch hex="#121212" name="Base" usage="Page background" />
          <Swatch hex="#131313" name="Stage" usage="Hero canvas" />
          <Swatch hex="#181818" name="Card" usage="Cards · badges" />
          <Swatch hex="#202020" name="Menu" usage="Dropdowns · hover" />
        </div>
        <p className="font-sans font-medium text-[16px] text-[#ffffff] mb-4 mt-10 text-center">Text &amp; line</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <Swatch hex="#FFFFFF" name="Text" usage="Headings · strong" />
          <Swatch hex="#EDEDED" name="Icon" usage="Icon color" />
          <Swatch hex="#767676" name="Subtle" usage="Secondary text" />
          <Swatch hex="#8F8F8F" name="Faint" usage="Captions · bylines" />
        </div>
        <div className="max-w-[760px] mx-auto mt-8 rounded-[24px] bg-[#1a1a1a] card-inset p-6 text-[14px] leading-[1.6] text-[#8f8f8f] text-center">
          <span className="text-white font-medium">Rules. </span>
          Accent is for action and emphasis only — never body text or large fills.
          Text lives on the white scale; never introduce new hues for UI chrome.
        </div>
      </Section>

      {/* ── Typography ── */}
      <Section
        title="Saans for display, Inter for text"
        lede="Headlines are set in Saans Medium. Everything else — body, buttons, nav — is Inter. Code is Roboto Mono."
      >
        <div>
          <p className="text-[12px] font-mono text-[#9B8AFB] mb-2 text-center">Saans · Display · Medium 500</p>
          <p className="text-white leading-none text-center" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(56px, 10vw, 110px)', letterSpacing: '-0.02em' }}>
            Aa
          </p>
          <p className="mt-5 text-white/80 break-words text-center" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-[13px]">
            <div className="rounded-2xl bg-white/[0.03] p-5 text-center">
              <p className="text-white/40 text-[12px] mb-1.5 font-mono">Display / Saans 500</p>
              <p className="text-white text-[18px]" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>Headlines &amp; titles</p>
              <p className="text-white/45 mt-1 font-mono text-[12px]">Hero 42/45 · −0.21px</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5 text-center">
              <p className="text-white/40 text-[12px] mb-1.5 font-mono">Text / Inter 400–500</p>
              <p className="text-white/85 text-[15px]">Body copy, buttons and navigation.</p>
              <p className="text-white/45 mt-1 font-mono text-[12px]">Body 15/22 · UI 13/16</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5 text-center">
              <p className="text-white/40 text-[12px] mb-1.5 font-mono">Code / Roboto Mono</p>
              <p className="text-white/85 text-[14px] font-mono">npm i reicon-react</p>
              <p className="text-white/45 mt-1 font-mono text-[12px]">Snippets · tokens · kbd</p>
            </div>
          </div>
        </div>
        <div className="max-w-[760px] mx-auto mt-5 rounded-[24px] bg-[#1a1a1a] card-inset p-6 text-[14px] leading-[1.6] text-[#8f8f8f] text-center">
          <span className="text-white font-medium">Font credit. </span>
          Saans is designed by the Displaay Type Foundry and is used on this site
          under its free version. If you represent the foundry and want it removed,
            email <a href="mailto:hello@reicon.dev" className="text-[#9B8AFB] hover:underline">hello@reicon.dev</a> and
          we will take it down. Body text is Inter and code is Roboto Mono
          (both SIL Open Font License).
        </div>
      </Section>

      {/* ── Interface ── */}
      <Section
        title="Pills, chips and quiet cards"
        lede="Live components from this site. Buttons are fully rounded pills, cards are quiet dark panels with inset hairlines — never heavy borders."
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ClayButton to="/icons" variant="primary" className="skill-btn skill-btn--primary">
              <span>Browse</span>
            </ClayButton>
            <ClayButton to="/docs" variant="secondary" className="skill-btn skill-btn--secondary">
              <span>Get Started</span>
            </ClayButton>
            <span className="nav-pill">Nav pill</span>
            <span className="chip" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' }}>v1.2.6</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 w-full text-[12px] font-mono text-white/50">
            <div className="rounded-2xl bg-white/[0.03] p-4 text-center">Buttons · radius 50px · h-36 · 13px/500</div>
            <div className="rounded-2xl bg-white/[0.03] p-4 text-center">Cards · radius 24px · #1a1a1a + inset hairline</div>
            <div className="rounded-2xl bg-white/[0.03] p-4 text-center">Menus · radius 12px · #202020</div>
          </div>
        </div>
      </Section>

      {/* ── Icons ── */}
      <Section
        title="The interface icon set"
        lede="Every sidebar, TOC and control glyph — served as SVG from /ui and rendered live below. Sidebar icons use currentColor at 13–14px; feature artwork renders at 28px."
      >
        <div>
          <div className="rounded-2xl bg-white/[0.03] px-6 py-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
            {UI_FILES.map(({ file, name }) => (
              <UiFileIcon key={file} href={`/ui/${file}`} label={`${name} icon`} />
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-white/[0.03] p-4 text-center text-[13px] text-[#8f8f8f]">
            currentColor only · 1.5px stroke · 24px grid — icons inherit surrounding text color
          </div>
        </div>
      </Section>

      {/* ── Contact ── */}
      <section className="reveal max-w-[1160px] mx-auto px-4 sm:px-6 md:px-10 pb-16 md:pb-24 pt-4">
        <div className="rounded-[24px] bg-[#1a1a1a] card-inset p-8 sm:p-10 flex flex-col items-center gap-4 text-center">
          <h2 className="font-sans font-normal text-[22px] sm:text-[26px] text-[#fefefe] tracking-[-0.02em]">
            Questions about the brand?
          </h2>
          <p className="text-[14px] text-[#8f8f8f] leading-[1.6] max-w-[520px]">
            Press, partnerships and takedown requests — we reply within a few days.
          </p>
          <a href="mailto:hello@reicon.dev" className="clay-btn clay-accent">
            hello@reicon.dev
          </a>
        </div>
        <div className="h-5 md:h-12" />
      </section>
    </main>
  );
}
