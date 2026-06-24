import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditOnGitHub from '../components/usage/EditOnGitHub';

const NAV_ITEMS = {
  general: [
    { id: 'what-is-reicon', label: 'What is Reicon?' },
    { id: 'is-it-free', label: 'Is it completely free?' },
    { id: 'commercial-use', label: 'Can I use it commercially?' },
  ],
  technical: [
    { id: 'grid-size', label: 'What grid size is used?' },
    { id: 'icon-weights', label: 'How are weights handled?' },
    { id: 'tree-shaking', label: 'Does it support tree-shaking?' },
  ],
  design: [
    { id: 'figma-library', label: 'Is there a Figma library?' },
    { id: 'request-icon', label: 'How do I request an icon?' },
    { id: 'contributing', label: 'How do I contribute?' },
  ],
};

const onThisPage = [
  { id: 'what-is-reicon', label: 'What is Reicon?' },
  { id: 'is-it-free', label: 'Is it completely free?' },
  { id: 'commercial-use', label: 'Can I use it commercially?' },
  { id: 'grid-size', label: 'What grid size is used?' },
  { id: 'icon-weights', label: 'How are weights handled?' },
  { id: 'tree-shaking', label: 'Does it support tree-shaking?' },
  { id: 'figma-library', label: 'Is there a Figma library?' },
  { id: 'request-icon', label: 'How do I request an icon?' },
  { id: 'contributing', label: 'How do I contribute?' },
];

export default function FaqPage() {
  const [activeSection, setActiveSection] = useState('what-is-reicon');
  const [otpIndicatorStyle, setOtpIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const contentRef = useRef<HTMLDivElement>(null);
  const otpListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    const sections = contentRef.current?.querySelectorAll('[data-section]');
    sections?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!otpListRef.current) return;
    const activeEl = otpListRef.current.querySelector('.otp-item.active') as HTMLElement;
    if (activeEl) {
      setOtpIndicatorStyle({
        top: activeEl.offsetTop + (activeEl.offsetHeight - 16) / 2,
        height: 16,
        opacity: 1
      });
    } else {
      setOtpIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderNavItem = (item: { id: string; label: string }) => {
    const isActive = activeSection === item.id;
    return (
      <div
        key={item.id}
        onClick={() => scrollTo(item.id)}
        className={`sidebar-item ${isActive ? 'active' : ''}`}
      >
        <div className="sidebar-item-line" />
        {isActive ? (
          <div className="sidebar-item-active-bar" />
        ) : (
          <div className="sidebar-item-hover-bar" />
        )}
        <span className="sidebar-item-text">
          {item.label}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Helmet>
        <title>Frequently Asked Questions — Reicon | Free Open-Source Icons</title>
        <meta name="description" content="Frequently asked questions about Reicon icon library. License, Figma integration, React/Vue support, custom request, and contribution guidelines." />
        <link rel="canonical" href="https://reicon.dev/faq" />
      </Helmet>
      <Header />

      <div className="flex flex-1 pt-14">
        {/* Sidebar scoped CSS */}
        <style>{`
          #usage-sidebar {
            width: 13rem;
            height: calc(100vh - 3.5rem);
            position: sticky;
            top: 3.5rem;
            overflow-y: auto;
            padding: 1.25rem 0.75rem;
            z-index: 30;
            background-color: #09090b;
            scrollbar-width: none;
            flex-shrink: 0;
          }
          #usage-sidebar::-webkit-scrollbar { display: none; }

          .reicon-sidebar-list {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            width: 100%;
          }

          .sidebar-separator {
            padding: 0.5rem 0.75rem;
            margin-top: 1.25rem;
            margin-bottom: 0.25rem;
            font-size: 11px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.4);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }
          .reicon-sidebar-list > div:first-child .sidebar-separator { margin-top: 0; }
          .sidebar-separator re-icon { color: rgba(255, 255, 255, 0.35); }

          .sidebar-item {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0.375rem 0.5rem 0.375rem 1.5rem;
            margin-left: 0.25rem;
            border-radius: 8px;
            cursor: pointer;
            background: transparent;
            min-height: 2rem;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.5);
            transition: color 0.15s ease, background-color 0.15s ease;
            user-select: none;
            border: 0;
            width: calc(100% - 0.25rem);
            text-align: left;
          }
          .sidebar-item:hover {
            color: rgba(255, 255, 255, 0.85);
            background: rgba(255, 255, 255, 0.03);
          }
          .sidebar-item.active {
            color: #ffffff;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.05);
          }

          .sidebar-item-line {
            position: absolute;
            left: 0.625rem;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: rgba(255, 255, 255, 0.08);
          }
          .sidebar-item-active-bar {
            position: absolute;
            left: 0.625rem;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
            height: 56%;
            width: 3px;
            border-radius: 9999px;
            background-color: #6C5CE7;
            box-shadow: 0 0 8px rgba(108, 92, 231, 0.5);
          }
          .sidebar-item-hover-bar {
            position: absolute;
            left: 0.625rem;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
            height: 56%;
            width: 3px;
            border-radius: 9999px;
            background-color: rgba(255, 255, 255, 0.4);
            opacity: 0;
            transition: opacity 0.15s ease;
          }
          .sidebar-item:hover .sidebar-item-hover-bar { opacity: 0.6; }

          .sidebar-item-text {
            display: flex;
            align-items: center;
            width: 100%;
            padding-left: 0.375rem;
          }

          /* ── RIGHT SIDEBAR: ON THIS PAGE ── */
          #otp-sidebar {
            width: 13rem;
            height: calc(100vh - 3.5rem);
            position: sticky;
            top: 3.5rem;
            overflow-y: auto;
            padding: 1.25rem 0.5rem;
            z-index: 30;
            background-color: #09090b;
            scrollbar-width: none;
            flex-shrink: 0;
          }
          #otp-sidebar::-webkit-scrollbar { display: none; }

          .otp-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 13px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.75);
            margin-bottom: 1rem;
            padding-left: 0.5rem;
          }

          .otp-list {
            position: relative;
            padding-left: 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .otp-list::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0.5rem;
            bottom: 0.5rem;
            width: 1px;
            background-color: rgba(255, 255, 255, 0.08);
            transform: translateX(-50%);
          }

          .otp-item {
            position: relative;
            list-style: none;
          }

          .otp-indicator {
            position: absolute;
            left: 0;
            transform: translateX(-50%);
            width: 3px;
            border-radius: 9999px;
            background-color: #6C5CE7;
            transition: top 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s ease;
            box-shadow: 0 0 8px rgba(108, 92, 231, 0.5);
            pointer-events: none;
          }

          .otp-button {
            width: 100%;
            text-align: left;
            background: none;
            border: none;
            padding: 0.25rem 0.5rem;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.55);
            cursor: pointer;
            transition: color 0.15s ease, font-weight 0.15s ease;
            user-select: none;
          }

          .otp-button:hover {
            color: rgba(255, 255, 255, 0.85);
          }

          .otp-item.active .otp-button {
            color: #ffffff;
            font-weight: 600;
          }
        `}</style>

        {/* ── Left sidebar navigation ── */}
        <aside id="usage-sidebar" className="hidden lg:block" data-lenis-prevent>
          {/* General */}
          <div>
            <div className="sidebar-separator">
              <re-icon icon="compass" size="12" />
              <span>General</span>
            </div>
            <div>
              {NAV_ITEMS.general.map(renderNavItem)}
            </div>
          </div>

          {/* Technical */}
          <div className="mt-4">
            <div className="sidebar-separator">
              <re-icon icon="code" size="12" />
              <span>Technical</span>
            </div>
            <div>
              {NAV_ITEMS.technical.map(renderNavItem)}
            </div>
          </div>

          {/* Design & Contributing */}
          <div className="mt-4">
            <div className="sidebar-separator">
              <re-icon icon="palette" size="12" />
              <span>Design</span>
            </div>
            <div>
              {NAV_ITEMS.design.map(renderNavItem)}
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main ref={contentRef} className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 xl:px-16 py-8 pt-28 lg:pt-8 overflow-x-hidden">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-6">Frequently Asked Questions</h1>
            <p className="text-white/50 text-[15px] leading-[1.8] mb-12">
              Everything you need to know about Reicon. If you have a question that isn't answered here, please open a discussion on <a href="https://github.com/dqev/reicon" target="_blank" rel="noopener noreferrer" className="text-[#6C5CE7] hover:underline">GitHub</a> or contact us directly.
            </p>

            <hr className="border-white/[0.06] mb-12" />

            {/* GENERAL SECTION */}
            <section id="what-is-reicon" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-white mb-4">What is Reicon?</h2>
              <p className="text-white/60 text-[15px] leading-[1.8]">
                Reicon is an open-source vector icon library designed specifically for digital interfaces. It includes more than 2,700 handcrafted, pixel-perfect icons structured consistently with Outline and Filled variants. Official packages exist for React and Vue, alongside a high-performance CDN script for standard HTML pages.
              </p>
            </section>

            <hr className="border-white/[0.06] mb-12" />

            <section id="is-it-free" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-white mb-4">Is Reicon completely free?</h2>
              <p className="text-white/60 text-[15px] leading-[1.8]">
                Yes, Reicon is 100% free and open-source under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-[#6C5CE7] hover:underline">MIT License</a>. You can use it in personal, commercial, education, or open-source projects without any attribution required (though it is always appreciated!).
              </p>
            </section>

            <hr className="border-white/[0.06] mb-12" />

            <section id="commercial-use" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-white mb-4">Can I use it in commercial projects?</h2>
              <p className="text-white/60 text-[15px] leading-[1.8]">
                Absolutely! Commercial use is fully allowed. You are free to bundle Reicon into templates, websites, SaaS platforms, or mobile apps that you charge money for.
              </p>
            </section>

            <hr className="border-white/[0.06] mb-12" />

            {/* TECHNICAL SECTION */}
            <section id="grid-size" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-white mb-4">What grid size is used?</h2>
              <p className="text-white/60 text-[15px] leading-[1.8]">
                Every single icon is custom-drawn on a strict <strong>24×24 pixel grid</strong> with predefined baseline strokes. This alignment guarantees that the icons stay pixel-perfect, sharp, and highly readable on screens of any pixel density, from small 12px buttons to massive header displays.
              </p>
            </section>

            <hr className="border-white/[0.06] mb-12" />

            <section id="icon-weights" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-white mb-4">How are weights handled?</h2>
              <p className="text-white/60 text-[15px] leading-[1.8]">
                Reicon does not auto-generate weights. Each weight is handcrafted:
              </p>
              <ul className="text-white/60 text-[15px] leading-[1.8] mt-4 space-y-2 list-disc list-inside">
                <li><strong>Outline:</strong> Features clean stroked paths (default 1.5px thickness). Fully customizable via the <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">strokeWidth</code> prop.</li>
                <li><strong>Filled:</strong> Custom solid silhouette shapes designed to visually match their outline counterparts for smooth state transitions (e.g. active navigation states).</li>
              </ul>
            </section>

            <hr className="border-white/[0.06] mb-12" />

            <section id="tree-shaking" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-white mb-4">Does it support tree-shaking?</h2>
              <p className="text-white/60 text-[15px] leading-[1.8]">
                Yes! Both <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">reicon-react</code> and <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">reicon-vue</code> are bundled with ES modules and declare <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">"sideEffects": false</code> in their package.json. Modern bundlers (Vite, Webpack, Rollup) automatically tree-shake and include only the exact icons imported in your code.
              </p>
            </section>

            <hr className="border-white/[0.06] mb-12" />

            {/* DESIGN SECTION */}
            <section id="figma-library" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-white mb-4">Is there a Figma library?</h2>
              <p className="text-white/60 text-[15px] leading-[1.8]">
                Yes, we support Figma creators! A community-curated Figma file with all vector master components is maintained. You can download and duplicate the official file directly from the Figma Community (search for "Reicon") to design mockups with the exact same visual assets.
              </p>
            </section>

            <hr className="border-white/[0.06] mb-12" />

            <section id="request-icon" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-white mb-4">How do I request a new icon?</h2>
              <p className="text-white/60 text-[15px] leading-[1.8]">
                If there is an icon or industry category missing, please open an Issue on our <a href="https://github.com/dqev/reicon/issues" target="_blank" rel="noopener noreferrer" className="text-[#6C5CE7] hover:underline">GitHub Issues tracker</a> using the "Icon Request" template. We review requests weekly and design new sets based on user popularity and request volume.
              </p>
            </section>

            <hr className="border-white/[0.06] mb-12" />

            <section id="contributing" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-white mb-4">How do I contribute?</h2>
              <p className="text-white/60 text-[15px] leading-[1.8]">
                We love community contributions! You can contribute code updates, type definitions, package updates, or even new SVG icons. Please read our contributing guide in our repository on GitHub, fork the codebase, and open a Pull Request.
              </p>
            </section>

            <EditOnGitHub filePath="src/pages/Faq.tsx" />
          </div>
        </main>

        {/* ── Right sidebar: On this page ── */}
        <aside id="otp-sidebar" className="hidden xl:block" data-lenis-prevent>
          <div className="otp-header">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
              <line x1="21" y1="10" x2="3" y2="10" />
              <line x1="21" y1="6" x2="3" y2="6" />
              <line x1="21" y1="14" x2="3" y2="14" />
              <line x1="21" y1="18" x2="3" y2="18" />
            </svg>
            <span>On this page</span>
          </div>
          <ul className="otp-list" ref={otpListRef}>
            <div
              className="otp-indicator"
              style={{
                top: `${otpIndicatorStyle.top}px`,
                height: `${otpIndicatorStyle.height}px`,
                opacity: otpIndicatorStyle.opacity,
              }}
            />
            {onThisPage.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <li key={s.id} className={`otp-item ${isActive ? 'active' : ''}`}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className="otp-button"
                  >
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
