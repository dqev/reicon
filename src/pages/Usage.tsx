import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronExpandY } from 'reicon-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReactUsage from './usage/ReactUsage';
import VueUsage from './usage/VueUsage';
import CdnUsage from './usage/CdnUsage';
import PropsTable from './usage/PropsTable';
import Weights from './usage/Weights';
import TypeScriptSection from './usage/TypeScriptSection';
import Accessibility from './usage/Accessibility';
import Styling from './usage/Styling';
import Performance from './usage/Performance';
import Troubleshooting from './usage/Troubleshooting';

import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import SectionHeader from '../components/usage/SectionHeader';

// Import raw markdown files
import vanillaDocs from '../../docs/javascript/usage.md?raw';
import reactDocs from '../../docs/react/usage.md?raw';
import vueDocs from '../../docs/vue/usage.md?raw';
import propsDocs from '../../docs/shared/props.md?raw';
import weightsDocs from '../../docs/shared/weights.md?raw';
import typescriptDocs from '../../docs/shared/typescript.md?raw';
import stylingDocs from '../../docs/shared/styling.md?raw';
import accessibilityDocs from '../../docs/shared/accessibility.md?raw';
import performanceDocs from '../../docs/shared/performance.md?raw';
import troubleshootingDocs from '../../docs/shared/troubleshooting.md?raw';

import { SiClaude, SiGithub, SiOpenai } from 'react-icons/si';

const FRAMEWORKS = [
  { id: 'vanilla', label: 'Vanilla', icon: 'js', color: '#f7df1e' },
  { id: 'react', label: 'React', icon: 'react', color: '#61DAFB' },
  { id: 'vue', label: 'Vue', icon: 'vue', color: '#4DBA87' },
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
  guides: [
    { id: 'styling', label: 'Styling & Color' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'performance', label: 'Performance' },
  ],
  advanced: [
    { id: 'typescript', label: 'TypeScript' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ],
};

export default function UsagePage() {
  const { framework: fwParam } = useParams<{ framework?: string }>();
  const navigate = useNavigate();
  const initialFw = (fwParam as Framework) || 'vanilla';
  const [activeSection, setActiveSection] = useState('what-is-reicon');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [framework, setFramework] = useState<Framework>(
    FRAMEWORKS.some((f) => f.id === initialFw) ? initialFw : 'vanilla'
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [otpIndicatorStyle, setOtpIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const otpListRef = useRef<HTMLUListElement>(null);

  // Markdown / Actions Bar States
  const [copiedPage, setCopiedPage] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const openDropdownRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fw = fwParam as Framework;
    if (fw && FRAMEWORKS.some((f) => f.id === fw)) {
      setFramework(fw);
    }
  }, [fwParam]);

  const frameworkSectionId = framework === 'react' ? 'react-usage' : framework === 'vue' ? 'vue-usage' : 'cdn';
  const frameworkLabel = framework === 'react' ? 'React' : framework === 'vue' ? 'Vue' : 'Vanilla JS / CDN';

  const onThisPage = [
    { id: 'what-is-reicon', label: 'What is Reicon?' },
    { id: frameworkSectionId, label: frameworkLabel },
    { id: 'props', label: 'Props' },
    { id: 'weights', label: 'Icon Weights' },
    { id: 'styling', label: 'Styling & Color' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'performance', label: 'Performance' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
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
      if (openDropdownRef.current && !openDropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) {
        setMobileNavOpen(false);
      }
    };
    const handleScroll = () => {
      setMobileNavOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyPageMarkdown = async () => {
    const activeFwDocs = framework === 'vanilla' ? vanillaDocs : framework === 'react' ? reactDocs : vueDocs;
    const fullMarkdown = `${activeFwDocs}\n\n${propsDocs}\n\n${weightsDocs}\n\n${stylingDocs}\n\n${accessibilityDocs}\n\n${performanceDocs}\n\n${typescriptDocs}\n\n${troubleshootingDocs}`;
    try {
      await navigator.clipboard.writeText(fullMarkdown);
      setCopiedPage(true);
      showToast('Full page markdown copied!');
      setTimeout(() => setCopiedPage(false), 2000);
    } catch (e) {
      showToast('Failed to copy');
    }
  };

  const openInLLM = async (platform: 'chatgpt' | 'claude' | 't3') => {
    const activeFwDocs = framework === 'vanilla' ? vanillaDocs : framework === 'react' ? reactDocs : vueDocs;
    const fullMarkdown = `${activeFwDocs}\n\n${propsDocs}\n\n${weightsDocs}\n\n${stylingDocs}\n\n${accessibilityDocs}\n\n${performanceDocs}\n\n${typescriptDocs}\n\n${troubleshootingDocs}`;
    
    try {
      await navigator.clipboard.writeText(fullMarkdown);
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
    }

    const promptText = `Here is the Reicon documentation for ${framework === 'vanilla' ? 'Vanilla JS / CDN' : framework === 'react' ? 'React' : 'Vue'}. Please read it and help me use the library:\n\n${fullMarkdown}`;
    
    let url = '';
    if (platform === 'chatgpt') {
      url = `https://chatgpt.com/?hints=search&q=${encodeURIComponent(promptText)}`;
    } else if (platform === 'claude') {
      url = `https://claude.ai/new?q=${encodeURIComponent(promptText)}`;
    } else if (platform === 't3') {
      url = `https://t3.chat/new?q=${encodeURIComponent(promptText)}`;
    }

    setOpenDropdown(false);
    showToast('Markdown copied! Opening AI Chat...');
    window.open(url, '_blank');
  };

  const githubUrl = 'https://github.com/dqev/reicon';
  const activePath = framework === 'vanilla' ? 'javascript/usage.md' : framework === 'react' ? 'react/usage.md' : 'vue/usage.md';
  const githubEditUrl = `https://github.com/dqev/reicon/edit/main/docs/${activePath}`;

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
  }, [activeSection, framework]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileNavOpen(false);
  };

  const switchFramework = (fw: Framework) => {
    setFramework(fw);
    setDropdownOpen(false);
    navigate(`/usage/${fw}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const VueIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 122.88 106.42" fill="none">
      <polygon fill="#4DBA87" points="75.63,0 61.44,24.58 47.25,0 0,0 61.44,106.42 122.88,0 75.63,0" />
      <polygon fill="#425466" points="75.63,0 61.44,24.58 47.25,0 24.58,0 61.44,63.85 98.3,0 75.63,0" />
    </svg>
  );

  const FrameworkIcon = ({ id, size = 16 }: { id: string; size?: number }) => {
    if (id === 'react') return <FaReact className="text-[#61DAFB]" size={size} />;
    if (id === 'vue') return <VueIcon size={size} />;
    return <IoLogoJavascript className="text-yellow-400" size={size} />;
  };

  const selectedFw = FRAMEWORKS.find((f) => f.id === framework)!;

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
        <title>Usage Guide — Reicon | React, Vue & CDN Icon Library</title>
        <meta name="description" content="Learn how to install and use Reicon icons in React, Vue, and vanilla JavaScript. Props reference, TypeScript support, icon weights, and code examples." />
        <link rel="canonical" href={`https://reicon.dev/usage/${framework}`} />
        <meta name="keywords" content="reicon usage, install reicon, React icons setup, Vue icons setup, CDN icons, icon library guide, SVG icons tutorial" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://reicon.dev/usage/${framework}`} />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Usage Guide — Reicon" />
        <meta property="og:description" content="Learn how to install and use Reicon icons in React and vanilla JavaScript." />
        <meta property="og:image" content="https://reicon.dev/og-image.png?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Usage Guide — Reicon" />
        <meta name="twitter:description" content="Learn how to install and use Reicon icons in React and vanilla JavaScript." />
        <meta name="twitter:image" content="https://reicon.dev/og-image.png?v=2" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "Usage", "item": "https://reicon.dev/usage" }
          ]
        })}</script>
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
            left: 10.5px;
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
            left: 0; /* positions exactly on the 1px track line */
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
          {/* Getting Started */}
          <div>
            <div className="sidebar-separator">
              <re-icon icon="compass" size="12" />
              <span>Getting Started</span>
            </div>
            <div>
              {NAV_ITEMS.intro.map(renderNavItem)}
            </div>
          </div>

          {/* Framework Dropdown */}
          <div className="mt-4">
            <div className="sidebar-separator">
              <re-icon icon="code" size="12" />
              <span>Framework</span>
            </div>
            <div ref={dropdownRef} className="relative mb-2 px-3">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FrameworkIcon id={selectedFw.id} size={14} />
                  <span className="text-[12px] text-white/80 font-medium">{selectedFw.label}</span>
                </div>
                <ChevronExpandY className="w-3.5 h-3.5 text-white/30" />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-3 right-3 mt-1 bg-[#141416] border border-white/[0.1] rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                  {FRAMEWORKS.map((fw) => (
                    <button
                      key={fw.id}
                      onClick={() => switchFramework(fw.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-[12px] transition-colors ${framework === fw.id
                        ? 'bg-white/[0.06] text-white'
                        : 'text-white/60 hover:bg-white/[0.04] hover:text-white/80'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <FrameworkIcon id={fw.id} size={14} />
                        <span className={framework === fw.id ? 'font-medium' : ''}>{fw.label}</span>
                      </div>
                      {framework === fw.id && (
                        <svg className="w-3.5 h-3.5 text-[#6C5CE7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              {renderNavItem({ id: frameworkSectionId, label: frameworkLabel })}
            </div>
          </div>

          {/* Basics */}
          <div className="mt-4">
            <div className="sidebar-separator">
              <re-icon icon="settings" size="12" />
              <span>Basics</span>
            </div>
            <div>
              {NAV_ITEMS.basics.map(renderNavItem)}
            </div>
          </div>

          {/* Guides */}
          <div className="mt-4">
            <div className="sidebar-separator">
              <re-icon icon="palette" size="12" />
              <span>Guides</span>
            </div>
            <div>
              {NAV_ITEMS.guides.map(renderNavItem)}
            </div>
          </div>

          {/* Advanced */}
          <div className="mt-4">
            <div className="sidebar-separator">
              <re-icon icon="help-circle" size="12" />
              <span>Advanced</span>
            </div>
            <div>
              {NAV_ITEMS.advanced.map(renderNavItem)}
            </div>
          </div>
        </aside>

        {/* ── Mobile nav toggle ── */}
        <div ref={mobileNavRef} className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-[#09090b]/95 backdrop-blur-lg border-b border-white/[0.06]">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="w-full flex items-center justify-between pl-4 pr-[26px] py-3 text-sm text-white/60"
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
              <div className="mb-4">
                <h3 className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 px-1">
                  Framework
                </h3>
                <div className="flex gap-2">
                  {FRAMEWORKS.map((fw) => (
                    <button
                      key={fw.id}
                      onClick={() => switchFramework(fw.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${framework === fw.id
                        ? 'bg-white/[0.1] text-white'
                        : 'text-white/40 hover:text-white/60'
                        }`}
                    >
                      <FrameworkIcon id={fw.id} size={16} />
                      {fw.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nav items */}
              <div className="flex flex-col gap-1">
                {onThisPage.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors flex items-center gap-2.5 ${activeSection === item.id
                      ? 'text-[#6C5CE7] bg-white/[0.04]'
                      : 'text-white/50 hover:text-white/70 hover:bg-white/[0.02]'
                      }`}
                  >
                    {activeSection === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] shrink-0" />
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <main ref={contentRef} className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 xl:px-16 py-8 pt-28 lg:pt-8 overflow-x-hidden">
          <div className="max-w-3xl">
            {/* Actions Bar */}
            <div className="relative grid grid-cols-2 gap-2.5 w-full sm:flex sm:w-auto sm:items-center mb-8 pb-6 border-b border-white/[0.06]">
              <div className="flex justify-end sm:justify-start w-full sm:w-auto">
                <a
                  href={githubEditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-[13px] font-medium text-white/70 hover:text-white bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors whitespace-nowrap"
                >
                  <re-icon icon="pen" size={14}></re-icon>
                  Edit on GitHub
                </a>
              </div>
              <div className="flex justify-start w-full sm:w-auto">
                <button
                  onClick={handleCopyPageMarkdown}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-[13px] font-medium text-white/70 hover:text-white bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {copiedPage ? (
                    <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  ) : (
                    <re-icon icon="copy" size={14}></re-icon>
                  )}
                  Copy Markdown
                </button>
              </div>
              
              {/* Open dropdown wrapper */}
              <div ref={openDropdownRef} className="col-span-2 flex justify-center sm:block relative">
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-[13px] font-medium text-white/70 hover:text-white bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Open
                  <ChevronExpandY size={14} className="text-white/40" />
                </button>
                {openDropdown && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0 mt-2 top-full w-52 bg-[#0e0e10] border border-white/[0.08] rounded-xl shadow-xl z-50 overflow-hidden py-1"
                  >
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <SiGithub size={14}></SiGithub>
                        Open in GitHub
                      </span>
                      <re-icon icon="arrow-up-right2" size={12} className="text-white/30"></re-icon>
                    </a>
                    <button
                      onClick={() => openInLLM('chatgpt')}
                      className="w-full flex items-center justify-between px-4 py-2 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors text-left cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <SiOpenai size={14}></SiOpenai>
                        Open in ChatGPT
                      </span>
                      <re-icon icon="arrow-up-right2" size={12} className="text-white/30"></re-icon>
                    </button>
                    <button
                      onClick={() => openInLLM('claude')}
                      className="w-full flex items-center justify-between px-4 py-2 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors text-left cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <SiClaude size={14}></SiClaude>
                        Open in Claude
                      </span>
                      <re-icon icon="arrow-up-right2" size={12} className="text-white/30"></re-icon>
                    </button>
                    <button
                      onClick={() => openInLLM('t3')}
                      className="w-full flex items-center justify-between px-4 py-2 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors text-left cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <re-icon icon="chat" size={14}></re-icon>
                          Open in T3 Chat
                        </span>
                        <re-icon icon="arrow-up-right2" size={12} className="text-white/30"></re-icon>
                      </button>
                    </div>
                  )}
                </div>
              </div>

          {/* What is Reicon */}
          <section id="what-is-reicon" data-section className="mb-12 scroll-mt-24">
            <SectionHeader id="what-is-reicon" title="What is Reicon?" level="h2" markdownContent={framework === 'vanilla' ? vanillaDocs : framework === 'react' ? reactDocs : vueDocs} />
            <p className="text-white/60 text-[15px] leading-[1.8] mb-6">
              Reicon is an open-source icon library that provides beautifully crafted vector (SVG) icons for displaying
              icons and symbols in digital projects. The library aims to make it easier for designers and developers to
              incorporate icons into their projects by providing the core <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">reicon</code> package for JavaScript and CDN usage, along with framework-specific packages for React (<code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">reicon-react</code>) and Vue (<code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">reicon-vue</code>).
            </p>
            <p className="text-white/60 text-[15px] leading-[1.8]">
              Every icon comes in two weights — Outline and Filled — and is fully customizable with size, color, and
              custom attributes/props. Icons are tree-shakeable when used with bundlers or framework packages, ensuring minimal bundle size.
            </p>
          </section>

          <hr className="border-white/[0.06] mb-12" />

          {framework === 'react' ? (
            <ReactUsage markdownContent={reactDocs} copiedField={copiedField} onCopy={copyToClipboard} />
          ) : framework === 'vue' ? (
            <VueUsage markdownContent={vueDocs} copiedField={copiedField} onCopy={copyToClipboard} />
          ) : (
            <CdnUsage markdownContent={vanillaDocs} copiedField={copiedField} onCopy={copyToClipboard} />
          )}

          <hr className="border-white/[0.06] mb-12" />

          <PropsTable markdownContent={propsDocs} />

          <hr className="border-white/[0.06] mb-12" />

          <Weights markdownContent={weightsDocs} copiedField={copiedField} onCopy={copyToClipboard} />

          <hr className="border-white/[0.06] mb-12" />

          <TypeScriptSection markdownContent={typescriptDocs} copiedField={copiedField} onCopy={copyToClipboard} />

          <hr className="border-white/[0.06] mb-12" />

          <Styling markdownContent={stylingDocs} copiedField={copiedField} onCopy={copyToClipboard} />

          <hr className="border-white/[0.06] mb-12" />

          <Accessibility markdownContent={accessibilityDocs} copiedField={copiedField} onCopy={copyToClipboard} />

          <hr className="border-white/[0.06] mb-12" />

          <Performance markdownContent={performanceDocs} copiedField={copiedField} onCopy={copyToClipboard} />

          <hr className="border-white/[0.06] mb-12" />

          <Troubleshooting markdownContent={troubleshootingDocs} copiedField={copiedField} onCopy={copyToClipboard} />
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-[999] bg-[#0e0e10] border border-white/[0.08] text-white text-sm px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{toastMessage}</span>
            </div>
          )}
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
