import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, Check } from 'reicon-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(LICENSE_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Helmet>
        <title>License — Reicon | MIT License</title>
        <meta name="description" content="Reicon is released under the MIT License. Free to use in personal and commercial projects." />
        <link rel="canonical" href="https://reicon.dev/license" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/license" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="License — Reicon | MIT License" />
        <meta property="og:description" content="Reicon is released under the MIT License. Free to use in personal and commercial projects." />
        <meta property="og:image" content="https://reicon.dev/og-image.png?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="License — Reicon | MIT License" />
        <meta name="twitter:description" content="Reicon is released under the MIT License. Free to use in personal and commercial projects." />
        <meta name="twitter:image" content="https://reicon.dev/og-image.png?v=2" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "License", "item": "https://reicon.dev/license" }
          ]
        })}</script>
      </Helmet>
      <Header />

      <main className="flex-1 pt-24 px-4 md:px-8 pb-12 max-w-3xl mx-auto w-full overflow-x-hidden">
        <h1 className="text-3xl font-serif text-white mb-8">License</h1>

        <div className="space-y-8 text-[15px] text-white/60 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">MIT License</h2>
            <p>Reicon icons and the <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">reicon-react</code> package are released under the MIT License — one of the most permissive open-source licenses available.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">What You Can Do</h2>
            <ul className="list-disc list-inside space-y-1.5 text-white/50">
              <li>Use the icons in personal and commercial projects</li>
              <li>Modify the icons to suit your needs</li>
              <li>Distribute the icons in your own projects or libraries</li>
              <li>Include the icons in paid products and templates</li>
              <li>Use the icons in client work</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">What We Ask</h2>
            <ul className="list-disc list-inside space-y-1.5 text-white/50">
              <li>Include the copyright notice and license text in copies of the software</li>
              <li>Attribution is appreciated but not required</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">Full License Text</h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08]"
              >
                {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
              </button>
            </div>
            <pre className="bg-white/[0.03] rounded-xl p-5 text-[13px] text-white/50 leading-relaxed overflow-x-auto whitespace-pre-wrap">{LICENSE_TEXT}</pre>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Questions?</h2>
            <p>If you have questions about licensing, contact us at <a href="mailto:hello@reicon.dev" className="text-[#6C5CE7] hover:underline">hello@reicon.dev</a>.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
