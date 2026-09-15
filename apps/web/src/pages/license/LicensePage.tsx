import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { PAGE_META } from '@/data/page-meta';
import { Copy, Check } from 'reicon-react';
import DocsActionsBar from '@/components/docs/ActionsBar';

const LICENSE_TEXT = `MIT License

Copyright (c) 2025 Dev Chauhan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export default function LicensePage() {
  const [copied, setCopied] = useState(false);
  const [copiedPage, setCopiedPage] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const openDropdownRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(LICENSE_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPageMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(LICENSE_TEXT);
      setCopiedPage(true);
      showToast('License markdown copied!');
      setTimeout(() => setCopiedPage(false), 2000);
    } catch {
      showToast('Failed to copy');
    }
  };

  const openInLLM = async (platform: 'chatgpt' | 'claude' | 't3') => {
    try { await navigator.clipboard.writeText(LICENSE_TEXT); } catch { /* silent */ }
    const promptText = `Here is the Reicon MIT License documentation. Please read it and help answer my questions:\n\n${LICENSE_TEXT}`;
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
        <title>{PAGE_META['/license'].title}</title>
        <meta name="description" content={PAGE_META['/license'].description} />
        <link rel="canonical" href={PAGE_META['/license'].url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_META['/license'].url} />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content={PAGE_META['/license'].title} />
        <meta property="og:description" content={PAGE_META['/license'].description} />
        <meta property="og:image" content={PAGE_META['/license'].ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content={PAGE_META['/license'].title} />
        <meta name="twitter:description" content={PAGE_META['/license'].description} />
        <meta name="twitter:image" content={PAGE_META['/license'].ogImage} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "License", "item": "https://reicon.dev/license" }
          ]
        })}</script>
      </Helmet>

      <main className="flex-1 pt-28 px-4 md:px-8 pb-12 max-w-5xl mx-auto w-full overflow-x-hidden">
        <h1 className="text-3xl font-serif text-text-base mb-8">License</h1>

        <div className="space-y-8 text-[15px] text-text-base/60 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">MIT License</h2>
            <p>Reicon icons and the <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[13px]">reicon</code> package are released under the MIT License — one of the most permissive open-source licenses available.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">What You Can Do</h2>
            <ul className="list-disc list-inside space-y-1.5 text-text-base/50">
              <li>Use the icons in personal and commercial projects</li>
              <li>Modify the icons to suit your needs</li>
              <li>Distribute the icons in your own projects or libraries</li>
              <li>Include the icons in paid products and templates</li>
              <li>Use the icons in client work</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">What We Ask</h2>
            <ul className="list-disc list-inside space-y-1.5 text-text-base/50">
              <li>Include the copyright notice and license text in copies of the software</li>
              <li>Attribution is appreciated but not required</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-text-base">Full License Text</h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-[12px] text-text-base/40 hover:text-text-base/70 transition-colors px-2.5 py-1.5 rounded-lg bg-text-base/4 hover:bg-text-base/8 cursor-pointer"
              >
                {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
              </button>
            </div>
            <pre className="bg-text-base/3 rounded-xl p-5 text-[13px] text-text-base/50 leading-relaxed overflow-x-auto whitespace-pre-wrap">{LICENSE_TEXT}</pre>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">Credits & Attribution</h2>
            <p className="mb-3">
              Reicon is built using the base icon sets from the following libraries:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-base/60">
              <li>
                <a href="https://solar-icons.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#9B8AFB] hover:underline font-medium">
                  Solar Icons
                </a>{' '}
                designed by{' '}
                <span className="text-text-base/80">480 Design</span> and package maintained by{' '}
                <a href="https://github.com/saoudi-h/solar-icons" target="_blank" rel="noopener noreferrer" className="text-[#9B8AFB] hover:underline">
                  Saoudi H.
                </a>{' '}
                (released under CC BY 4.0 and MIT Licenses).
              </li>
              <li>
                <a href="https://zappicon.com" target="_blank" rel="noopener noreferrer" className="text-[#9B8AFB] hover:underline font-medium">
                  Zappicon
                </a>{' '}
                (subject to the{' '}
                <a href="https://zappicon.com/license" target="_blank" rel="noopener noreferrer" className="text-[#9B8AFB] hover:underline">
                  Zappicon License
                </a>).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-base mb-3">Questions?</h2>
            <p>If you have questions about licensing, contact us at <a href="mailto:hello@reicon.dev" className="text-[#9B8AFB] hover:underline">hello@reicon.dev</a>.</p>
          </section>
        </div>

        <hr className="border-text-base/6 my-12" />

        <DocsActionsBar
          copiedPage={copiedPage}
          openDropdown={openDropdown}
          openDropdownRef={openDropdownRef}
          githubEditUrl="https://github.com/dqev/reicon/edit/main/src/pages/license/LicensePage.tsx"
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
