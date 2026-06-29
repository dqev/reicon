import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';

const VueIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 122.88 106.42" fill="none">
    <polygon fill="#4DBA87" points="75.63,0 61.44,24.58 47.25,0 0,0 61.44,106.42 122.88,0 75.63,0" />
    <polygon fill="#425466" points="75.63,0 61.44,24.58 47.25,0 24.58,0 61.44,63.85 98.3,0 75.63,0" />
  </svg>
);

const SvelteIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 98.1 118" fill="none">
    <path d="M91.8 15.6C80.9-.1 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 15.7 32.6 20.3 48.2 10.4l27.5-17.5c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-9-.4-18.2-5.7-25.5" fill="#FF3E00" />
    <path d="M40.9 103.9c-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3.2-.9.4-1.7.6-2.6l.5-1.6 1.4 1c3.3 2.4 6.9 4.2 10.8 5.4l1 .3-.1 1c-.1 1.4.3 2.9 1.1 4.1 1.6 2.3 4.4 3.4 7.1 2.7.6-.2 1.2-.4 1.7-.8L65.4 72c1.4-.9 2.3-2.2 2.6-3.8.3-1.6-.1-3.3-1.1-4.6-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.8l-10.5 6.7c-1.7 1.1-3.6 1.9-5.6 2.4-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3.8-5.3 3.9-10 8.5-12.8l27.5-17.5c1.7-1.1 3.6-1.9 5.6-2.4 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.2.9-.4 1.7-.6 2.6l-.5 1.6-1.4-1c-3.3-2.4-6.9-4.2-10.8-5.4l-1-.3.1-1c.1-1.4-.3-2.9-1.1-4.1-1.6-2.3-4.4-3.4-7.1-2.7-.6.2-1.2.4-1.7.8L32.4 46.1c-1.4.9-2.3 2.2-2.6 3.8s.1 3.3 1.1 4.6c1.6 2.3 4.4 3.3 7.1 2.6.6-.2 1.2-.4 1.7-.8l10.5-6.7c1.7-1.1 3.6-1.9 5.6-2.4 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.8 5.3-3.9 10-8.5 12.8L47.3 101.6c-1.7 1.1-3.6 1.9-5.6 2.4l-.8-.1z" fill="#fff" />
  </svg>
);

const PACKAGES = [
  {
    id: 'vanilla',
    name: 'reicon',
    npmPkg: 'reicon',
    description: 'A Reicon icon library package for web and JavaScript applications.',
    icon: <IoLogoJavascript className="text-yellow-400" size={48} />,
    npmUrl: 'https://www.npmjs.com/package/reicon',
    sourceUrl: 'https://github.com/dqev/reicon',
    guideUrl: '/usage/vanilla',
  },
  {
    id: 'react',
    name: 'reicon-react',
    npmPkg: 'reicon-react',
    description: 'A Reicon icon library package for React applications.',
    icon: <FaReact className="text-[#61DAFB]" size={48} />,
    npmUrl: 'https://www.npmjs.com/package/reicon-react',
    sourceUrl: 'https://github.com/dqev/reicon',
    guideUrl: '/usage/react',
  },
  {
    id: 'vue',
    name: 'reicon-vue',
    npmPkg: 'reicon-vue',
    description: 'Vue 3 icon components for Reicon. Tree-shakeable, TypeScript-ready, zero config. Works with Nuxt 3.',
    icon: <VueIcon size={48} />,
    npmUrl: 'https://www.npmjs.com/package/reicon-vue',
    sourceUrl: 'https://github.com/dqev/reicon',
    guideUrl: '/usage/vue',
  },
  {
    id: 'svelte',
    name: 'reicon-svelte',
    npmPkg: 'reicon-svelte',
    description: 'Svelte icon components for Reicon. Tree-shakeable, TypeScript-ready, zero config. Works with SvelteKit.',
    icon: <SvelteIcon size={48} />,
    npmUrl: 'https://www.npmjs.com/package/reicon-svelte',
    sourceUrl: 'https://github.com/dqev/reicon',
    guideUrl: '/usage/svelte',
  },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Helmet>
        <title>Packages — Reicon | React, Vue, Svelte & JavaScript Icon Packages</title>
        <meta name="description" content="Install Reicon icon packages for React, Vue, Svelte, and JavaScript. Tree-shakeable, zero dependencies, MIT licensed." />
        <link rel="canonical" href="https://reicon.dev/packages" />
        <meta name="keywords" content="reicon packages, reicon-react, reicon-vue, reicon-svelte, npm icon package, React icon library, Vue icon library, Svelte icons, JavaScript icons" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/packages" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Packages — Reicon" />
        <meta property="og:description" content="Install Reicon icon packages for React, Vue, Svelte, and JavaScript. Tree-shakeable, zero dependencies, MIT licensed." />
        <meta property="og:image" content="https://reicon.dev/og-image.png?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Packages — Reicon" />
        <meta name="twitter:description" content="Install Reicon icon packages for React and JavaScript." />
        <meta name="twitter:image" content="https://reicon.dev/og-image.png?v=2" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "Packages", "item": "https://reicon.dev/packages" }
          ]
        })}</script>
      </Helmet>
      <Header />

      <main className="flex-1 pt-14 overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <h1 className="text-3xl md:text-4xl font-serif text-white text-center mb-12">Packages</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white/[0.03] rounded-2xl p-6 flex flex-col"
              >
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  {pkg.icon}
                </div>

                {/* Name */}
                <h2 className="text-white font-semibold text-lg mb-2">{pkg.name}</h2>

                {/* Shields badges */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <img
                    src={`https://img.shields.io/npm/v/${pkg.npmPkg}`}
                    alt={`${pkg.name} version`}
                    className="h-5"
                  />
                  <img
                    src={`https://img.shields.io/npm/dw/${pkg.npmPkg}`}
                    alt={`${pkg.name} downloads`}
                    className="h-5"
                  />
                </div>

                {/* Description */}
                <p className="text-white/50 text-[14px] leading-relaxed mb-6 flex-1">
                  {pkg.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    to={pkg.guideUrl}
                    className="bg-[#6C5CE7] hover:bg-[#5A4BD1] text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Guide
                  </Link>
                  <a
                    href={pkg.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Source
                  </a>
                  {pkg.npmUrl && (
                    <a
                      href={pkg.npmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      npm
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
