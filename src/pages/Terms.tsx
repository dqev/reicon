import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Helmet>
        <title>Terms of Service — Reicon</title>
        <meta name="description" content="Terms of Service for Reicon, the free open-source icon library." />
        <link rel="canonical" href="https://reicon.dev/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/terms" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Terms of Service — Reicon" />
        <meta property="og:description" content="Terms of Service for Reicon, the free open-source icon library." />
        <meta property="og:image" content="https://reicon.dev/og-image.png?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Terms of Service — Reicon" />
        <meta name="twitter:description" content="Terms of Service for Reicon, the free open-source icon library." />
        <meta name="twitter:image" content="https://reicon.dev/og-image.png?v=2" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "Terms", "item": "https://reicon.dev/terms" }
          ]
        })}</script>
      </Helmet>
      <Header />

      <main className="flex-1 pt-24 px-4 md:px-8 pb-12 max-w-3xl mx-auto w-full overflow-x-hidden">
        <h1 className="text-3xl font-serif text-white mb-8">Terms of Service</h1>
        <p className="text-sm text-white/40 mb-8">Last updated: May 6, 2025</p>

        <div className="space-y-8 text-[15px] text-white/60 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the Reicon website (<a href="https://reicon.dev" className="text-[#6C5CE7] hover:underline">reicon.dev</a>) and any related services, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
            <p>Reicon provides a free, open-source icon library consisting of SVG icons available for download, use in personal and commercial projects, and integration via React packages and CDN. The icons are licensed under the MIT License.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. License & Usage</h2>
            <p>All icons and associated code in the Reicon library are released under the <a href="/license" className="text-[#6C5CE7] hover:underline">MIT License</a>. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the icons and software, subject to the conditions of the MIT License.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Intellectual Property</h2>
            <p>The Reicon name, logo, website design, and branding are the intellectual property of Dev Chauhan. The open-source icons themselves are licensed under MIT, but the Reicon brand and website content (excluding icons) may not be used to imply endorsement or affiliation without permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/50">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to disrupt or compromise the service infrastructure</li>
              <li>Scrape or harvest data from the website in a manner that degrades service for others</li>
              <li>Misrepresent affiliation with or endorsement by Reicon</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Availability & Modifications</h2>
            <p>Reicon is provided on an "as is" basis. We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice. We may update these terms from time to time, and continued use of the service constitutes acceptance of any changes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Disclaimer of Warranties</h2>
            <p>The service and all icons are provided "as is" without warranty of any kind, express or implied. We do not guarantee that the service will be uninterrupted, error-free, or free of harmful components.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p>In no event shall Reicon or its creator be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Contact</h2>
            <p>If you have questions about these terms, contact us at <a href="mailto:hello@reicon.dev" className="text-[#6C5CE7] hover:underline">hello@reicon.dev</a>.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
