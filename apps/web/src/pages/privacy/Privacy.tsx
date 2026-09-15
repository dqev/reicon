import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { PAGE_META } from '@/data/page-meta';
import DocsActionsBar from '@/components/docs/ActionsBar';

export default function Privacy() {
  const [copiedPage, setCopiedPage] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const openDropdownRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getPageMarkdown = () => {
    return `# Privacy Policy\n\nLast updated: May 6, 2025\n\n1. Overview\nReicon (reicon.dev) is committed to protecting your privacy.\n\n2. Information We Collect\nAnalytics Data, CDN Logs, Contact Information.\n\n3. Information We Do NOT Collect\nNo account creation, no payment info, no ad trackers, no data selling, no tracking cookies.\n\n4. Third-Party Services\nVercel, Google Fonts, cdn.reicon.dev.\n\n5. Data Retention\nAggregated analytics, temporary server logs.\n\n6. Your Rights\nRequest info, request deletion, opt out of analytics.\n\n7. Children's Privacy\nNot knowingly collected.\n\n8. Changes to This Policy\nPosted with updated revision date.\n\n9. Contact\nhello@reicon.dev`;
  };

  const handleCopyPageMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(getPageMarkdown());
      setCopiedPage(true);
      showToast('Privacy policy markdown copied!');
      setTimeout(() => setCopiedPage(false), 2000);
    } catch {
      showToast('Failed to copy');
    }
  };

  const openInLLM = async (platform: 'chatgpt' | 'claude' | 't3') => {
    const md = getPageMarkdown();
    try { await navigator.clipboard.writeText(md); } catch { /* silent */ }
    const promptText = `Here is the Reicon Privacy Policy documentation. Please read it and help answer my questions:\n\n${md}`;
    const urls = {
      chatgpt: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(promptText)}`,
      claude: `https://claude.ai/new?q=${encodeURIComponent(promptText)}`,
      t3: `https://t3.chat/new?q=${encodeURIComponent(promptText)}`,
    };
    setOpenDropdown(false);
    showToast('Markdown copied! Opening AI Chat...');
    window.open(urls[platform], '_blank');
  };

  return (
    <div>
      <Helmet>
        <title>{PAGE_META['/privacy'].title}</title>
        <meta name="description" content={PAGE_META['/privacy'].description} />
        <link rel="canonical" href={PAGE_META['/privacy'].url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_META['/privacy'].url} />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content={PAGE_META['/privacy'].title} />
        <meta property="og:description" content={PAGE_META['/privacy'].description} />
        <meta property="og:image" content={PAGE_META['/privacy'].ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content={PAGE_META['/privacy'].title} />
        <meta name="twitter:description" content={PAGE_META['/privacy'].description} />
        <meta name="twitter:image" content={PAGE_META['/privacy'].ogImage} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "Privacy", "item": "https://reicon.dev/privacy" }
          ]
        })}</script>
      </Helmet>

      <main className="flex-1 pt-28 px-4 md:px-8 pb-12 max-w-5xl mx-auto w-full overflow-x-hidden">
        <div className="flex items-center justify-between gap-4 mb-2">
          <h1 className="text-2xl sm:text-3xl font-serif text-text-base truncate">Privacy Policy</h1>
          <div className="shrink-0">
            <DocsActionsBar
              copiedPage={copiedPage}
              openDropdown={openDropdown}
              openDropdownRef={openDropdownRef}
              githubEditUrl="https://github.com/dqev/reicon/edit/main/src/pages/privacy/Privacy.tsx"
              githubUrl="https://github.com/dqev/reicon"
              onCopyMarkdown={handleCopyPageMarkdown}
              onOpenDropdown={setOpenDropdown}
              onOpenInLLM={openInLLM}
            />
          </div>
        </div>
        <p className="text-sm text-text-base/40 mb-8">Last updated: May 6, 2025</p>

        <div className="space-y-8 text-[15px] text-text-base/60 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">1. Overview</h2>
            <p>Reicon (<a href="https://reicon.dev" className="text-[#9B8AFB] hover:underline">reicon.dev</a>) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding that information.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">2. Information We Collect</h2>
            <p><strong className="text-text-base/80">Analytics Data:</strong> We may use privacy-respecting analytics to understand how visitors use the website. This may include page views, referral sources, browser type, and approximate geographic location. No personally identifiable information is collected through analytics.</p>
            <p className="mt-3"><strong className="text-text-base/80">CDN Logs:</strong> Our CDN provider may collect standard server logs (IP addresses, request timestamps, and requested resources) for security and performance purposes. These logs are retained temporarily and are not used for tracking or profiling.</p>
            <p className="mt-3"><strong className="text-text-base/80">Contact Information:</strong> If you contact us via email, we collect your email address and any information you voluntarily provide in your message.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">3. Information We Do NOT Collect</h2>
            <ul className="list-disc list-inside space-y-1 text-text-base/50">
              <li>We do not require account creation or login</li>
              <li>We do not collect payment information</li>
              <li>We do not use advertising trackers</li>
              <li>We do not sell or share personal data with third parties</li>
              <li>We do not use cookies for tracking purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">4. Third-Party Services</h2>
            <p>The website may use the following third-party services:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-text-base/50">
              <li><strong className="text-text-base/70">Vercel</strong> — Hosting and deployment</li>
              <li><strong className="text-text-base/70">Google Fonts</strong> — Font delivery</li>
              <li><strong className="text-text-base/70">cdn.reicon.dev</strong> — Icon and asset delivery</li>
            </ul>
            <p className="mt-3">Each of these services has its own privacy policy governing how they handle data.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">5. Data Retention</h2>
            <p>We retain analytics data in aggregated, anonymized form. CDN server logs are retained for a limited period for security purposes. Contact emails are retained only as long as necessary to address your inquiry.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-text-base/50">
              <li>Request information about what data we hold about you</li>
              <li>Request deletion of any personal data we may have</li>
              <li>Opt out of analytics by using a browser ad blocker or Do Not Track setting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">7. Children's Privacy</h2>
            <p>Reicon does not knowingly collect information from children under 13. If you believe we have inadvertently collected such information, please contact us and we will promptly delete it.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">8. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">9. Contact</h2>
            <p>For privacy-related questions or requests, contact us at <a href="mailto:hello@reicon.dev" className="text-[#9B8AFB] hover:underline">hello@reicon.dev</a>.</p>
          </section>
        </div>

        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-[999] bg-[var(--dropdown-bg)] border border-text-base/8 text-text-base text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}
      </main>
    </div>
  );
}
