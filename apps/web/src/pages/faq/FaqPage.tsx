import { useState, useEffect, useRef, useMemo } from 'react';
import { Search3 } from 'reicon-react';
import DocsActionsBar from '@/components/docs/ActionsBar';
import { docsSidebarStyles } from '@/components/docs/sidebar/styles';
import DocsRightSidebar from '@/components/docs/sidebar/Right';
import FaqHelmet from './FaqHelmet';
import FaqCategory from './FaqCategory';

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

const ON_THIS_PAGE = [
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

function Code({ children }: { children: string }) {
  return (
    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">
      {children}
    </code>
  );
}

const FAQ_CATEGORIES = [
  {
    id: 'general',
    title: 'General',
    icon: 'compass',
    items: [
      {
        id: "what-is-reicon",
        question: "What is Reicon?",
        markdownAnswer: "Reicon is a free, open-source SVG icon library providing 2,700+ UI icons in Outline and Filled weights. Official packages are available for React (reicon-react), Angular 20+ (reicon-angular), React Native (reicon-react-native), Vue 3 (reicon-vue), Svelte (reicon-svelte), Flutter (reicon_flutter), vanilla JavaScript, CDN runtime, Figma plugin, VS Code extension, and AI MCP Server.",
        answer: (
          <p>
            Reicon is a free, open-source SVG icon library providing <strong>2,700+ UI icons</strong> in Outline and Filled weights. Official packages are available for React (<Code>reicon-react</Code>), Angular 20+ (<Code>reicon-angular</Code>), React Native (<Code>reicon-react-native</Code>), Vue 3 (<Code>reicon-vue</Code>), Svelte (<Code>reicon-svelte</Code>), Flutter (<Code>reicon_flutter</Code>), vanilla JavaScript, CDN runtime, Figma plugin, VS Code extension, and MCP Server.
          </p>
        ),
      },
      {
        id: 'is-it-free',
        question: 'Is Reicon completely free?',
        markdownAnswer: 'Yes, Reicon is 100% free and open-source under the MIT License. Use it in personal, commercial, education, or open-source projects — no attribution required (though always appreciated!).',
        answer: (
          <p>
            Yes, Reicon is 100% free and open-source under the{' '}
            <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-[#9B8AFB] hover:underline">MIT License</a>. Use it in personal, commercial, education, or open-source projects — no attribution required (though always appreciated!).
          </p>
        ),
      },
      {
        id: 'commercial-use',
        question: 'Can I use it in commercial projects?',
        markdownAnswer: 'Absolutely. Commercial use is fully allowed. Bundle Reicon into templates, websites, SaaS products, or mobile apps — even ones you charge for.',
        answer: (
          <p>
            Absolutely. Commercial use is fully allowed. Bundle Reicon into templates, websites, SaaS products, or mobile apps — even ones you charge for.
          </p>
        ),
      },
    ],
  },
  {
    id: 'technical',
    title: 'Technical',
    icon: 'code',
    items: [
      {
        id: 'grid-size',
        question: 'What grid size is used?',
        markdownAnswer: 'Every icon is drawn on a strict 24×24 pixel grid with predefined baseline strokes. This guarantees the icons stay pixel-perfect and sharp at any size, from 12px to large header formats.',
        answer: (
          <p>
            Every icon is drawn on a strict <strong>24×24 pixel grid</strong> with predefined baseline strokes. This guarantees the icons stay pixel-perfect and sharp at any size, from 12px to large header formats.
          </p>
        ),
      },
      {
        id: 'icon-weights',
        question: 'How are weights handled?',
        markdownAnswer: 'Reicon does not auto-generate weights. Each is handcrafted:\n- Outline: Clean stroked paths (default 1.5px). Customizable via the strokeWidth prop.\n- Filled: Custom solid silhouettes designed to match their outline counterparts for smooth state transitions (e.g. active nav tabs).',
        answer: (
          <>
            <p>Reicon does not auto-generate weights. Each is handcrafted:</p>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li><strong>Outline:</strong> Clean stroked paths (default 1.5px). Customizable via the <Code>strokeWidth</Code> prop.</li>
              <li><strong>Filled:</strong> Custom solid silhouettes designed to match their outline counterparts for smooth state transitions (e.g. active nav tabs).</li>
            </ul>
          </>
        ),
      },
      {
        id: 'tree-shaking',
        question: 'Does it support tree-shaking?',
        markdownAnswer: 'Yes! All packages — reicon-react, reicon-angular, reicon-react-native, reicon-vue, and reicon-svelte — are bundled as ES modules and declare "sideEffects": false. Modern bundlers (Vite, Webpack, Rollup, Metro) automatically include only the icons you actually import.',
        answer: (
          <p>
            Yes! All packages — <Code>reicon-react</Code>, <Code>reicon-angular</Code>, <Code>reicon-react-native</Code>, <Code>reicon-vue</Code>, and <Code>reicon-svelte</Code> — are bundled as ES modules and declare <Code>"sideEffects": false</Code>. Modern bundlers (Vite, Webpack, Rollup, Metro) automatically include only the icons you actually import.
          </p>
        ),
      },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    icon: 'palette',
    items: [
      {
        id: 'figma-library',
        question: 'Is there a Figma library?',
        markdownAnswer: 'Yes! A community Figma file with all vector master components is maintained. Search for "Reicon" in the Figma Community to duplicate the official file and design with the same visual assets.',
        answer: (
          <p>
            Yes! A community Figma file with all vector master components is maintained. Search for "Reicon" in the Figma Community to duplicate the official file and design with the same visual assets.
          </p>
        ),
      },
      {
        id: 'request-icon',
        question: 'How do I request a new icon?',
        markdownAnswer: 'Open an Issue on our GitHub Issues tracker using the "Icon Request" template. We review requests weekly and design new sets based on popularity.',
        answer: (
          <p>
            Open an Issue on our{' '}
            <a href="https://github.com/dqev/reicon/issues" target="_blank" rel="noopener noreferrer" className="text-[#9B8AFB] hover:underline">GitHub Issues tracker</a>{' '}
            using the "Icon Request" template. We review requests weekly and design new sets based on popularity.
          </p>
        ),
      },
      {
        id: 'contributing',
        question: 'How do I contribute?',
        markdownAnswer: 'We love contributions! You can help with code, type definitions, package updates, or new SVG icons. Read our contributing guide in the GitHub repository, fork the codebase, and open a Pull Request.',
        answer: (
          <p>
            We love contributions! You can help with code, type definitions, package updates, or new SVG icons. Read our contributing guide in the GitHub repository, fork the codebase, and open a Pull Request.
          </p>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  const [activeSection, setActiveSection] = useState('what-is-reicon');
  const [otpIndicatorStyle, setOtpIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedPage, setCopiedPage] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const otpListRef = useRef<HTMLUListElement>(null);
  const openDropdownRef = useRef<HTMLDivElement>(null);

  const githubUrl = 'https://github.com/dqev/reicon/blob/main/src/pages/faq/FaqPage.tsx';
  const githubEditUrl = 'https://github.com/dqev/reicon/edit/main/src/pages/faq/FaqPage.tsx';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdownRef.current && !openDropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
      if (!sections.length) return;
      const scrollPos = window.scrollY + 140;
      let currentId = sections[0].id;
      for (const section of sections) {
        if (section.offsetTop <= scrollPos) {
          currentId = section.id;
        } else {
          break;
        }
      }
      setActiveSection(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!otpListRef.current) return;
    const activeEl = otpListRef.current.querySelector('.otp-item.active') as HTMLElement;
    if (activeEl) {
      setOtpIndicatorStyle({ top: activeEl.offsetTop + (activeEl.offsetHeight - 16) / 2, height: 16, opacity: 1 });
    } else {
      setOtpIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_CATEGORIES;
    const q = searchQuery.toLowerCase();
    return FAQ_CATEGORIES
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) => item.question.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  const handleCopyPageMarkdown = async () => {
    try {
      let md = "# Frequently Asked Questions\n\n";
      FAQ_CATEGORIES.forEach((cat) => {
        md += `## ${cat.title}\n\n`;
        cat.items.forEach((item) => {
          md += `### ${item.question}\n\n`;
          md += `${item.markdownAnswer}\n\n`;
        });
      });
      await navigator.clipboard.writeText(md);
      setCopiedPage(true);
      showToast('FAQ markdown copied!');
      setTimeout(() => setCopiedPage(false), 2000);
    } catch {
      showToast('Failed to copy');
    }
  };

  const openInLLM = async (platform: 'chatgpt' | 'claude' | 't3') => {
    let md = '# Frequently Asked Questions\n\n';
    FAQ_CATEGORIES.forEach((cat) => {
      md += `## ${cat.title}\n\n`;
      cat.items.forEach((item) => {
        md += `### ${item.question}\n\n`;
        md += `${item.markdownAnswer}\n\n`;
      });
    });
    try { await navigator.clipboard.writeText(md); } catch { /* silent */ }
    const promptText = `Here is the Reicon FAQ documentation. Please read it and help answer my questions:\n\n${md}`;
    const urls = {
      chatgpt: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(promptText)}`,
      claude: `https://claude.ai/new?q=${encodeURIComponent(promptText)}`,
      t3: `https://t3.chat/new?q=${encodeURIComponent(promptText)}`,
    };
    setOpenDropdown(false);
    showToast('Markdown copied! Opening AI Chat...');
    window.open(urls[platform], '_blank');
  };

  const renderNavItem = (item: { id: string; label: string }) => {
    const isActive = activeSection === item.id;
    return (
      <div
        key={item.id}
        onClick={() => scrollTo(item.id)}
        className={`sidebar-item ${isActive ? 'active' : ''}`}
      >
        <span className="sidebar-item-text">
          {item.label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex-1">
      <FaqHelmet />

      <div className="flex flex-1 pt-14 px-4 md:px-10">
        <style>{docsSidebarStyles}</style>

        {/* Left sidebar */}
        <aside id="docs-sidebar" className="hidden lg:block" data-lenis-prevent>
          <div className="reicon-sidebar-group">
            <div className="sidebar-section-header">
              <div className="sidebar-icon-box">
                <re-icon icon="compass" size="13" />
              </div>
              <span>General</span>
            </div>
            <div className="sidebar-items-container">
              <div className="sidebar-section-line" />
              {NAV_ITEMS.general.map(renderNavItem)}
            </div>
          </div>

          <div className="reicon-sidebar-group">
            <div className="sidebar-section-header">
              <div className="sidebar-icon-box">
                <re-icon icon="code" size="13" />
              </div>
              <span>Technical</span>
            </div>
            <div className="sidebar-items-container">
              <div className="sidebar-section-line" />
              {NAV_ITEMS.technical.map(renderNavItem)}
            </div>
          </div>

          <div className="reicon-sidebar-group">
            <div className="sidebar-section-header">
              <div className="sidebar-icon-box">
                <re-icon icon="palette" size="13" />
              </div>
              <span>Design</span>
            </div>
            <div className="sidebar-items-container">
              <div className="sidebar-section-line" />
              {NAV_ITEMS.design.map(renderNavItem)}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main ref={contentRef} className="flex-1 min-w-0 px-0 md:px-6 lg:px-8 xl:px-10 py-5 pb-36 lg:pb-12 overflow-x-hidden">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif text-text-base mb-6">Frequently Asked Questions</h1>
            <p className="text-text-base/50 text-[15px] leading-[1.8] mb-8">
              Everything you need to know about Reicon. If your question isn't answered here, open a discussion on{' '}
              <a href="https://github.com/dqev/reicon" target="_blank" rel="noopener noreferrer" className="text-[#9B8AFB] hover:underline">GitHub</a> or contact us directly.
            </p>

            <div className="relative mb-10">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-base/70">
                <Search3 size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2.5 bg-text-base/[0.04] rounded-full text-[14px] text-text-base placeholder:text-text-base/70 outline-none focus:bg-text-base/10 transition-colors"
              />
            </div>

            {filteredCategories.map((category) => (
              <FaqCategory
                key={category.id}
                title={category.title}
                icon={category.icon}
                items={category.items}
                openItems={openItems}
                onToggle={toggleItem}
              />
            ))}

            <hr className="border-text-base/6 my-12" />

            <DocsActionsBar
              copiedPage={copiedPage}
              openDropdown={openDropdown}
              openDropdownRef={openDropdownRef}
              githubEditUrl={githubEditUrl}
              githubUrl={githubUrl}
              onCopyMarkdown={handleCopyPageMarkdown}
              onOpenDropdown={setOpenDropdown}
              onOpenInLLM={openInLLM}
            />

            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-[999] bg-[var(--dropdown-bg)] border border-text-base/8 text-text-base text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{toastMessage}</span>
              </div>
            )}
          </div>
        </main>

        {/* Right sidebar */}
        <DocsRightSidebar
          onThisPage={ON_THIS_PAGE}
          activeSection={activeSection}
          otpIndicatorStyle={otpIndicatorStyle}
          otpListRef={otpListRef}
          onNavClick={scrollTo}
        />
      </div>

    </div>
  );
}
