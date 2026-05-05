import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronExpandY } from 'reicon-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReactUsage from './usage/ReactUsage';
import CdnUsage from './usage/CdnUsage';
import PropsTable from './usage/PropsTable';
import Weights from './usage/Weights';
import TypeScriptSection from './usage/TypeScriptSection';
import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';

const FRAMEWORKS = [
  { id: 'react', label: 'React', icon: 'react', color: '#61DAFB' },
  { id: 'vanilla', label: 'Vanilla', icon: 'js', color: '#f7df1e' },
] as const;

type Framework = typeof FRAMEWORKS[number]['id'];

const NAV_ITEMS = {
  intro: [
    { id: 'what-is-reicon', label: 'What is Reicon?' },
  ],
  basics: [
    { id: 'props', label: 'Props' },
    { id: 'weights', label: 'Icon Weights' },
  ],
  advanced: [
    { id: 'typescript', label: 'TypeScript' },
  ],
};

export default function UsagePage() {
  const [searchParams] = useSearchParams();
  const initialFw = (searchParams.get('framework') as Framework) || 'react';
  const [activeSection, setActiveSection] = useState('what-is-reicon');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [framework, setFramework] = useState<Framework>(
    FRAMEWORKS.some((f) => f.id === initialFw) ? initialFw : 'react'
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const frameworkSectionId = framework === 'react' ? 'react-usage' : 'cdn';
  const frameworkLabel = framework === 'react' ? 'React' : 'CDN / HTML';

  const onThisPage = [
    { id: 'what-is-reicon', label: 'What is Reicon?' },
    { id: frameworkSectionId, label: frameworkLabel },
    { id: 'props', label: 'Props' },
    { id: 'weights', label: 'Icon Weights' },
    { id: 'typescript', label: 'TypeScript' },
  ];

  const copyToClipboard = async (text: string, field: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  };

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
  }, [framework]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileNavOpen(false);
  };

  const switchFramework = (fw: Framework) => {
    setFramework(fw);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const FrameworkIcon = ({ id, size = 16 }: { id: string; size?: number }) => {
    if (id === 'react') return <FaReact className="text-[#61DAFB]" size={size} />;
    return <IoLogoJavascript className="text-yellow-400" size={size} />;
  };

  const selectedFw = FRAMEWORKS.find((f) => f.id === framework)!;

  const renderNavItem = (item: { id: string; label: string }) => (
    <li key={item.id}>
      <button
        onClick={() => scrollTo(item.id)}
        className={`w-full text-left px-2.5 py-1.5 rounded-md text-[13px] transition-colors flex items-center gap-2 ${activeSection === item.id
          ? 'text-[#6C5CE7]'
          : 'text-white/50 hover:text-white/80'
          }`}
      >
        {activeSection === item.id && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] shrink-0" />
        )}
        {item.label}
      </button>
    </li>
  );

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Helmet>
        <title>Usage Guide — Reicon | React & CDN Icon Library</title>
        <meta name="description" content="Learn how to install and use Reicon icons in React and vanilla JavaScript. Props reference, TypeScript support, icon weights, and code examples." />
        <link rel="canonical" href="https://reicon.dev/usage" />
      </Helmet>
      <Header />

      <div className="flex flex-1 pt-14">
        {/* ── Left sidebar navigation ── */}
        <aside className="w-56 shrink-0 hidden lg:block overflow-y-auto h-[calc(100vh-3.5rem)] sticky top-14 border-r border-white/[0.06] py-6 px-4">
          {/* Getting Started */}
          <div>
            <h3 className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2 px-2">
              Getting Started
            </h3>
            <ul className="space-y-0.5">
              {NAV_ITEMS.intro.map(renderNavItem)}
            </ul>
          </div>

          {/* Framework Dropdown */}
          <div className="mt-6 pt-4 border-t border-white/[0.06]">
            <h3 className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2 px-2">
              Framework
            </h3>
            <div ref={dropdownRef} className="relative mb-3">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FrameworkIcon id={selectedFw.id} size={18} />
                  <span className="text-[13px] text-white/80 font-medium">{selectedFw.label}</span>
                </div>
                <ChevronExpandY className="w-3.5 h-3.5 text-white/30" />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#141416] border border-white/[0.1] rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                  {FRAMEWORKS.map((fw) => (
                    <button
                      key={fw.id}
                      onClick={() => switchFramework(fw.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-[13px] transition-colors ${framework === fw.id
                        ? 'bg-white/[0.06] text-white'
                        : 'text-white/60 hover:bg-white/[0.04] hover:text-white/80'
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FrameworkIcon id={fw.id} size={18} />
                        <span className={framework === fw.id ? 'font-medium' : ''}>{fw.label}</span>
                      </div>
                      {framework === fw.id && (
                        <svg className="w-4 h-4 text-[#6C5CE7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ul className="space-y-0.5">
              {renderNavItem({ id: frameworkSectionId, label: frameworkLabel })}
            </ul>
          </div>

          {/* Basics */}
          <div className="mt-6 pt-4 border-t border-white/[0.06]">
            <h3 className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2 px-2">
              Basics
            </h3>
            <ul className="space-y-0.5">
              {NAV_ITEMS.basics.map(renderNavItem)}
            </ul>
          </div>

          {/* Advanced */}
          <div className="mt-6 pt-4 border-t border-white/[0.06]">
            <h3 className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2 px-2">
              Advanced
            </h3>
            <ul className="space-y-0.5">
              {NAV_ITEMS.advanced.map(renderNavItem)}
            </ul>
          </div>
        </aside>

        {/* ── Mobile nav toggle ── */}
        <div className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-[#09090b]/95 backdrop-blur-lg border-b border-white/[0.06]">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-white/60"
          >
            <div className="flex items-center gap-2">
              <FrameworkIcon id={framework} size={16} />
              <span className="text-white/80 font-medium">{selectedFw.label}</span>
            </div>
            <ChevronExpandY className="w-4 h-4" />
          </button>
          {mobileNavOpen && (
            <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
              {/* Framework switch */}
              <div className="mb-3">
                <h3 className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 px-1">
                  Framework
                </h3>
                <div className="flex gap-1.5">
                  {FRAMEWORKS.map((fw) => (
                    <button
                      key={fw.id}
                      onClick={() => switchFramework(fw.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${framework === fw.id
                        ? 'bg-white/[0.1] text-white'
                        : 'text-white/40 hover:text-white/60'
                        }`}
                    >
                      <FrameworkIcon id={fw.id} size={14} />
                      {fw.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nav items */}
              {onThisPage.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-2 py-1.5 rounded text-[13px] transition-colors flex items-center gap-2 ${activeSection === item.id
                    ? 'text-[#6C5CE7]'
                    : 'text-white/50'
                    }`}
                >
                  {activeSection === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] shrink-0" />
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Main content ── */}
        <main ref={contentRef} className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 xl:px-16 py-8 pt-28 lg:pt-8">
          {/* What is Reicon */}
          <section id="what-is-reicon" data-section className="mb-12 scroll-mt-24">
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-6">What is Reicon?</h1>
            <p className="text-white/60 text-[15px] leading-[1.8] mb-6">
              Reicon is an open-source icon library that provides beautifully crafted vector (SVG) icons for displaying
              icons and symbols in digital projects. The library aims to make it easier for designers and developers to
              incorporate icons into their projects by providing official packages for React and a CDN for vanilla HTML.
            </p>
            <p className="text-white/60 text-[15px] leading-[1.8]">
              Every icon comes in two weights — Outline and Filled — and is fully customizable with size, color, and
              className props. Icons are tree-shakeable when used with the React package, ensuring minimal bundle size.
            </p>
          </section>

          <hr className="border-white/[0.06] mb-12" />

          {framework === 'react' ? (
            <ReactUsage copiedField={copiedField} onCopy={copyToClipboard} />
          ) : (
            <CdnUsage copiedField={copiedField} onCopy={copyToClipboard} />
          )}

          <hr className="border-white/[0.06] mb-12" />

          <PropsTable />

          <hr className="border-white/[0.06] mb-12" />

          <Weights copiedField={copiedField} onCopy={copyToClipboard} />

          <hr className="border-white/[0.06] mb-12" />

          <TypeScriptSection copiedField={copiedField} onCopy={copyToClipboard} />
        </main>

        {/* ── Right sidebar: On this page ── */}
        <aside className="w-52 shrink-0 hidden xl:block h-[calc(100vh-3.5rem)] sticky top-14 border-l border-white/[0.06] py-6 px-5">
          <h3 className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-3">On this page</h3>
          <ul className="space-y-1">
            {onThisPage.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left text-[12px] py-1 transition-colors ${activeSection === s.id
                    ? 'text-[#6C5CE7]'
                    : 'text-white/40 hover:text-white/60'
                    }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
