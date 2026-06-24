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

const PACKAGES = [
  {
    id: 'vanilla',
    name: 'reicon',
    npmPkg: 'reicon',
    description: 'A Reicon icon library package for web and JavaScript applications.',
    icon: <IoLogoJavascript className="text-yellow-400" size={48} />,
    npmUrl: 'https://www.npmjs.com/package/reicon',
    sourceUrl: 'https://github.com/reicon-dev/reicon',
    guideUrl: '/usage/vanilla',
  },
  {
    id: 'react',
    name: 'reicon-react',
    npmPkg: 'reicon-react',
    description: 'A Reicon icon library package for React applications.',
    icon: <FaReact className="text-[#61DAFB]" size={48} />,
    npmUrl: 'https://www.npmjs.com/package/reicon-react',
    sourceUrl: 'https://github.com/reicon-dev/reicon',
    guideUrl: '/usage/react',
  },
  {
    id: 'vue',
    name: 'reicon-vue',
    npmPkg: 'reicon-vue',
    description: 'Vue 3 icon components for Reicon. Tree-shakeable, TypeScript-ready, zero config. Works with Nuxt 3.',
    icon: <VueIcon size={48} />,
    npmUrl: 'https://www.npmjs.com/package/reicon-vue',
    sourceUrl: 'https://github.com/reicon-dev/reicon',
    guideUrl: '/usage/vue',
  },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Helmet>
        <title>Packages — Reicon | React, Vue & JavaScript Icon Packages</title>
        <meta name="description" content="Install Reicon icon packages for React, Vue, and JavaScript. Tree-shakeable, zero dependencies, MIT licensed." />
        <link rel="canonical" href="https://reicon.dev/packages" />
        <meta name="keywords" content="reicon packages, reicon-react, reicon-vue, npm icon package, React icon library, Vue icon library, JavaScript icons" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/packages" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Packages — Reicon" />
        <meta property="og:description" content="Install Reicon icon packages for React, Vue, and JavaScript. Tree-shakeable, zero dependencies, MIT licensed." />
        <meta property="og:image" content="https://reicon.dev/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Packages — Reicon" />
        <meta name="twitter:description" content="Install Reicon icon packages for React and JavaScript." />
        <meta name="twitter:image" content="https://reicon.dev/og-image.png" />
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
