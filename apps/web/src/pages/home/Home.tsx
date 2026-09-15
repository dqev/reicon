import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@/components/layout/ThemeContext';

import Hero from './Hero';
import Features from './Features';
import Integrations from './Integrations';
import IconShowcase from './IconShowcase';
import Playground from './Playground';
import CTA from './CTA';

export default function HomePage() {
  const { theme } = useTheme();
  const heroCardRef = useRef<HTMLDivElement>(null);

  // Hero card parallax scroll effect (desktop only)
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const card = heroCardRef.current;
    if (!card) return;
    const tick = () => {
      const p = Math.min(window.scrollY / (window.innerHeight * 0.55), 1);
      card.style.transform = `scale(${1 - p * 0.11})`;
      card.style.opacity = String(1 - p * 0.13);
    };
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  // Scroll-reveal for sections
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="flex-1">
      <Helmet>
        <title>Reicon — Open-Source Icon Library for Designers &amp; Developers</title>
        <meta name="description" content="Open-Source Icon Library for Designers &amp; Developers" />
        <link rel="canonical" href="https://reicon.dev/" />
        <meta name="keywords" content="free icon library, open source icons, SVG icons, React icons, Angular icons, Vue icons, Figma icons, reicon" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Reicon — Open-Source Icon Library for Designers &amp; Developers" />
        <meta property="og:description" content="Open-Source Icon Library for Designers &amp; Developers" />
        <meta property="og:image" content="https://reicon.dev/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Reicon — Open-Source Icon Library for Designers &amp; Developers" />
        <meta name="twitter:description" content="Open-Source Icon Library for Designers &amp; Developers" />
        <meta name="twitter:image" content="https://reicon.dev/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="ai-content-declaration" content="human-curated" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dataset",
          "name": "Reicon Icon Library",
          "description": "A free, open-source SVG icon library with 2,700+ handcrafted, pixel-perfect icons in two weights (Outline and Filled).",
          "url": "https://reicon.dev",
          "license": "https://opensource.org/licenses/MIT",
          "creator": { "@type": "Person", "name": "Dev Chauhan", "url": "https://devchauhan.in" },
          "keywords": ["SVG icons", "React icons", "Angular icons", "React Native icons", "Vue icons", "Svelte icons", "Figma icons", "open source", "MIT"],
          "isAccessibleForFree": true,
          "distribution": [
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon", "name": "reicon (npm)" },
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon-react", "name": "reicon-react (npm)" },
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon-angular", "name": "reicon-angular (npm)" },
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon-react-native", "name": "reicon-react-native (npm)" },
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon-vue", "name": "reicon-vue (npm)" },
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon-svelte", "name": "reicon-svelte (npm)" },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to install and use Reicon icons",
          "description": "Install Reicon icons in a React, Angular, React Native, Vue, Svelte, or vanilla HTML project.",
          "totalTime": "PT2M",
          "step": [
            { "@type": "HowToStep", "name": "Install the package", "text": "Run 'npm install reicon-react' for React, 'npm install reicon-angular' for Angular 20+, 'npm install reicon-react-native' for React Native, 'npm install reicon-vue' for Vue 3, or 'npm install reicon-svelte' for Svelte.", "url": "https://reicon.dev/docs" },
            { "@type": "HowToStep", "name": "Import the icon", "text": "Import by name: import { Home } from 'reicon-react';", "url": "https://reicon.dev/docs" },
            { "@type": "HowToStep", "name": "Render with props", "text": "Render: <Home size={24} weight=\"Outline\" color=\"currentColor\" />", "url": "https://reicon.dev/docs" },
          ],
        })}</script>
      </Helmet>

      <Hero heroCardRef={heroCardRef} />

      <Features />

      <Playground theme={theme} />

      <Integrations />

      <IconShowcase theme={theme} />

      <CTA />

      <div className="h-5 md:h-12" />
    </div>
  );
}
