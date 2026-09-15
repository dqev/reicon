import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { PAGE_META } from '@/data/page-meta';
import DocsActionsBar from '@/components/docs/ActionsBar';

export default function Terms() {
  const [copiedPage, setCopiedPage] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const openDropdownRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getPageMarkdown = () => {
    return `# Terms of Service\n\nLast updated: May 6, 2025\n\n1. Acceptance of Terms\nBy accessing or using the Reicon website (reicon.dev) and any related services, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.\n\n2. Description of Service\nReicon provides a free, open-source icon library consisting of SVG icons available for download, use in personal and commercial projects, and integration via React packages and CDN. The icons are licensed under the MIT License.\n\n3. License & Usage\nAll icons and associated code in the Reicon library are released under the MIT License. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the icons and software, subject to the conditions of the MIT License.\n\n4. Intellectual Property\nThe Reicon name, logo, website design, and branding are the intellectual property of Dev Chauhan. The open-source icons themselves are licensed under MIT, but the Reicon brand and website content (excluding icons) may not be used to imply endorsement or affiliation without permission.\n\n5. User Conduct\nYou agree not to use the service for any unlawful purpose, attempt to disrupt or compromise the service infrastructure, scrape data in a degrading manner, or misrepresent affiliation.\n\n6. Availability & Modifications\nReicon is provided on an "as is" basis.\n\n7. Disclaimer of Warranties\nThe service and all icons are provided "as is" without warranty of any kind.\n\n8. Limitation of Liability\nIn no event shall Reicon or its creator be liable for any indirect or consequential damages.\n\n9. Contact\nIf you have questions about these terms, contact us at hello@reicon.dev.`;
  };

  const handleCopyPageMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(getPageMarkdown());
      setCopiedPage(true);
      showToast('Terms markdown copied!');
      setTimeout(() => setCopiedPage(false), 2000);
    } catch {
      showToast('Failed to copy');
    }
  };

  const openInLLM = async (platform: 'chatgpt' | 'claude' | 't3') => {
    const md = getPageMarkdown();
    try { await navigator.clipboard.writeText(md); } catch { /* silent */ }
    const promptText = `Here is the Reicon Terms of Service documentation. Please read it and help answer my questions:\n\n${md}`;
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
        <title>{PAGE_META['/terms'].title}</title>
        <meta name="description" content={PAGE_META['/terms'].description} />
        <link rel="canonical" href={PAGE_META['/terms'].url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_META['/terms'].url} />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content={PAGE_META['/terms'].title} />
        <meta property="og:description" content={PAGE_META['/terms'].description} />
        <meta property="og:image" content={PAGE_META['/terms'].ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content={PAGE_META['/terms'].title} />
        <meta name="twitter:description" content={PAGE_META['/terms'].description} />
        <meta name="twitter:image" content={PAGE_META['/terms'].ogImage} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "Terms", "item": "https://reicon.dev/terms" }
          ]
        })}</script>
      </Helmet>

      <main className="flex-1 pt-28 px-4 md:px-8 pb-12 max-w-5xl mx-auto w-full overflow-x-hidden">
        <h1 className="text-3xl font-serif text-text-base mb-8">Terms of Service</h1>
        <p className="text-sm text-text-base/40 mb-8">Last updated: May 6, 2025</p>

        <div className="space-y-8 text-[15px] text-text-base/60 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the Reicon website (<a href="https://reicon.dev" className="text-[#9B8AFB] hover:underline">reicon.dev</a>) and any related services, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">2. Description of Service</h2>
            <p>Reicon provides a free, open-source icon library consisting of SVG icons available for download, use in personal and commercial projects, and integration via React packages and CDN. The icons are licensed under the MIT License.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">3. License & Usage</h2>
            <p>All icons and associated code in the Reicon library are released under the <a href="/license" className="text-[#9B8AFB] hover:underline">MIT License</a>. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the icons and software, subject to the conditions of the MIT License.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">4. Intellectual Property</h2>
            <p>The Reicon name, logo, website design, and branding are the intellectual property of Dev Chauhan. The open-source icons themselves are licensed under MIT, but the Reicon brand and website content (excluding icons) may not be used to imply endorsement or affiliation without permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">5. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-text-base/50">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to disrupt or compromise the service infrastructure</li>
              <li>Scrape or harvest data from the website in a manner that degrades service for others</li>
              <li>Misrepresent affiliation with or endorsement by Reicon</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">6. Availability & Modifications</h2>
            <p>Reicon is provided on an "as is" basis. We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice. We may update these terms from time to time, and continued use of the service constitutes acceptance of any changes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">7. Disclaimer of Warranties</h2>
            <p>The service and all icons are provided "as is" without warranty of any kind, express or implied. We do not guarantee that the service will be uninterrupted, error-free, or free of harmful components.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">8. Limitation of Liability</h2>
            <p>In no event shall Reicon or its creator be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">9. Contact</h2>
            <p>If you have questions about these terms, contact us at <a href="mailto:hello@reicon.dev" className="text-[#9B8AFB] hover:underline">hello@reicon.dev</a>.</p>
          </section>
        </div>

        <hr className="border-text-base/6 my-12" />

        <DocsActionsBar
          copiedPage={copiedPage}
          openDropdown={openDropdown}
          openDropdownRef={openDropdownRef}
          githubEditUrl="https://github.com/dqev/reicon/edit/main/src/pages/terms/Terms.tsx"
          githubUrl="https://github.com/dqev/reicon"
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
      </main>
    </div>
  );
}
