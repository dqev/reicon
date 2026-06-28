import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Helmet>
        <title>Privacy Policy — Reicon</title>
        <meta name="description" content="Privacy Policy for Reicon, the free open-source icon library. Learn how we handle your data." />
        <link rel="canonical" href="https://reicon.dev/privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/privacy" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Privacy Policy — Reicon" />
        <meta property="og:description" content="Privacy Policy for Reicon, the free open-source icon library." />
        <meta property="og:image" content="https://reicon.dev/og-image.png?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Privacy Policy — Reicon" />
        <meta name="twitter:description" content="Privacy Policy for Reicon, the free open-source icon library." />
        <meta name="twitter:image" content="https://reicon.dev/og-image.png?v=2" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "Privacy", "item": "https://reicon.dev/privacy" }
          ]
        })}</script>
      </Helmet>
      <Header />

      <main className="flex-1 pt-24 px-4 md:px-8 pb-12 max-w-3xl mx-auto w-full overflow-x-hidden">
        <h1 className="text-3xl font-serif text-white mb-8">Privacy Policy</h1>
        <p className="text-sm text-white/40 mb-8">Last updated: May 6, 2025</p>

        <div className="space-y-8 text-[15px] text-white/60 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Overview</h2>
            <p>Reicon (<a href="https://reicon.dev" className="text-[#6C5CE7] hover:underline">reicon.dev</a>) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding that information.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Information We Collect</h2>
            <p><strong className="text-white/80">Analytics Data:</strong> We may use privacy-respecting analytics to understand how visitors use the website. This may include page views, referral sources, browser type, and approximate geographic location. No personally identifiable information is collected through analytics.</p>
            <p className="mt-3"><strong className="text-white/80">CDN Logs:</strong> Our CDN provider may collect standard server logs (IP addresses, request timestamps, and requested resources) for security and performance purposes. These logs are retained temporarily and are not used for tracking or profiling.</p>
            <p className="mt-3"><strong className="text-white/80">Contact Information:</strong> If you contact us via email, we collect your email address and any information you voluntarily provide in your message.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Information We Do NOT Collect</h2>
            <ul className="list-disc list-inside space-y-1 text-white/50">
              <li>We do not require account creation or login</li>
              <li>We do not collect payment information</li>
              <li>We do not use advertising trackers</li>
              <li>We do not sell or share personal data with third parties</li>
              <li>We do not use cookies for tracking purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Third-Party Services</h2>
            <p>The website may use the following third-party services:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/50">
              <li><strong className="text-white/70">Vercel</strong> — Hosting and deployment</li>
              <li><strong className="text-white/70">Google Fonts</strong> — Font delivery</li>
              <li><strong className="text-white/70">cdn.reicon.dev</strong> — Icon and asset delivery</li>
            </ul>
            <p className="mt-3">Each of these services has its own privacy policy governing how they handle data.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Data Retention</h2>
            <p>We retain analytics data in aggregated, anonymized form. CDN server logs are retained for a limited period for security purposes. Contact emails are retained only as long as necessary to address your inquiry.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/50">
              <li>Request information about what data we hold about you</li>
              <li>Request deletion of any personal data we may have</li>
              <li>Opt out of analytics by using a browser ad blocker or Do Not Track setting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Children's Privacy</h2>
            <p>Reicon does not knowingly collect information from children under 13. If you believe we have inadvertently collected such information, please contact us and we will promptly delete it.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Contact</h2>
            <p>For privacy-related questions or requests, contact us at <a href="mailto:hello@reicon.dev" className="text-[#6C5CE7] hover:underline">hello@reicon.dev</a>.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
