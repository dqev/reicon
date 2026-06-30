import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';

import { VscVscodeInsiders } from "react-icons/vsc";
import { FiDownload } from 'react-icons/fi';

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
        <title>Packages & Integrations — Reicon | React, Vue, Svelte, Figma & VS Code</title>
        <meta name="description" content="Get official Reicon integrations. Install wrappers for React, Vue 3, Svelte, download raw SVG assets, or get the official Figma plugin and VS Code extension." />
        <link rel="canonical" href="https://reicon.dev/packages" />
        <meta name="keywords" content="reicon packages, reicon-react, reicon-vue, reicon-svelte, reicon-figma, reicon-vscode, Figma icon plugin, VS Code icon extension, SVG download, React icon library, Vue icons, Svelte icons" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/packages" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Packages & Integrations — Reicon" />
        <meta property="og:description" content="Get official Reicon integrations. Install wrappers for React, Vue 3, Svelte, download raw SVG assets, or get the official Figma plugin and VS Code extension." />
        <meta property="og:image" content="https://reicon.dev/og-image.png?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Packages & Integrations — Reicon" />
        <meta name="twitter:description" content="Get official Reicon integrations. Install wrappers for React, Vue 3, Svelte, download raw SVG assets, or get the official Figma plugin and VS Code extension." />
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

      <main className="flex-1 pt-28 px-6 pb-16 w-full overflow-x-hidden">
        <div className="max-w-[1160px] mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-12">Packages</h1>

          {/* Libraries Section */}
          <section className="mb-16">
            <h2 className="text-xl md:text-2xl font-serif text-white/95 mb-8 flex items-center gap-4">
              <span>Libraries & Frameworks</span>
              <span className="h-[1px] flex-1 bg-white/10"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white/[0.03] rounded-2xl p-6 flex flex-col border border-white/[0.02] hover:border-white/[0.05] transition-all hover:bg-white/[0.04]"
                >
                  <div className="w-16 h-16 flex items-center justify-center mb-4">
                    {pkg.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{pkg.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <img
                      src={`https://img.shields.io/npm/v/${pkg.npmPkg}?color=6C5CE7`}
                      alt={`${pkg.name} version`}
                      className="h-5"
                    />
                    <img
                      src={`https://img.shields.io/npm/dw/${pkg.npmPkg}?color=6C5CE7`}
                      alt={`${pkg.name} downloads`}
                      className="h-5"
                    />
                  </div>
                  <p className="text-white/50 text-[14px] leading-relaxed mb-6 flex-1">
                    {pkg.description}
                  </p>
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

              {/* Raw SVG Assets Card */}
              <div className="bg-white/[0.03] rounded-2xl p-6 flex flex-col border border-white/[0.02] hover:border-white/[0.05] transition-all hover:bg-white/[0.04]">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <svg className="w-12 h-12" viewBox="0 0 300 300">
                    <g stroke="#000" strokeWidth="38.009">
                      <g id="svgstar" transform="translate(150 150)">
                        <path id="svgbar" fill="#ffb13b" d="M-84.149-15.851a22.417 22.417 0 1 0 0 31.702H84.15a22.417 22.417 0 1 0 0-31.702Z"/>
                        <use href="#svgbar" transform="rotate(45)"/>
                        <use href="#svgbar" transform="rotate(90)"/>
                        <use href="#svgbar" transform="rotate(135)"/>
                      </g>
                    </g>
                    <use href="#svgstar"/>
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">reicon-svg</h3>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="bg-[#4285F4]/10 text-[#4285F4] border border-[#4285F4]/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">SVG (.zip)</span>
                  <span className="bg-white/10 text-white/60 border border-white/10 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">5,300+ SVGs</span>
                </div>
                <p className="text-white/50 text-[14px] leading-relaxed mb-6 flex-1">
                  Download the complete raw vector assets. Includes all Reicon icons in both outline and filled weights in black SVG format, fully compressed.
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    to="/usage/svg"
                    className="bg-[#6C5CE7] hover:bg-[#5A4BD1] text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Guide
                  </Link>
                  <a
                    href="/reicon-icons.zip"
                    download
                    className="bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <FiDownload size={14} />
                    Download ZIP
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Developer Tools Section */}
          <section>
            <h2 className="text-xl md:text-2xl font-serif text-white/95 mb-8 flex items-center gap-4">
              <span>Developer Tools & Extensions</span>
              <span className="h-[1px] flex-1 bg-white/10"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Figma Card */}
              <div className="bg-white/[0.03] rounded-2xl p-6 flex flex-col border border-white/[0.02] hover:border-white/[0.05] transition-all hover:bg-white/[0.04]">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <svg className="h-12 w-auto" viewBox="0 0 54 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_912_3)">
                      <path d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z" fill="#0ACF83"/>
                      <path d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z" fill="#A259FF"/>
                      <path d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z" fill="#F24E1E"/>
                      <path d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z" fill="#FF7262"/>
                      <path d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z" fill="#1ABCFE"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_912_3">
                        <rect width="53.3333" height="80" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">reicon-figma</h3>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="bg-[#F24E1E]/10 text-[#F24E1E] border border-[#F24E1E]/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">Figma Plugin</span>
                  <span className="bg-white/10 text-white/60 border border-white/10 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">v1.0.0</span>
                </div>
                <p className="text-white/50 text-[14px] leading-relaxed mb-6 flex-1">
                  Integrate Reicon directly into your Figma workspace. Search, customize size/stroke weights, and insert vector shapes into your designs.
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    to="/usage/figma"
                    className="bg-[#6C5CE7] hover:bg-[#5A4BD1] text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Guide
                  </Link>
                  <a
                    href="https://www.figma.com/community/plugin/1652983191908763066"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Open in Figma
                  </a>
                  <a
                    href="https://github.com/dqev/reicon/tree/main/packages/reicon-figma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Source
                  </a>
                </div>
              </div>

              {/* VS Code Card */}
              <div className="bg-white/[0.03] rounded-2xl p-6 flex flex-col border border-white/[0.02] hover:border-white/[0.05] transition-all hover:bg-white/[0.04]">
                <div className="w-16 h-16 flex items-center justify-center mb-4 text-[#007ACC]">
                  <VscVscodeInsiders size={48} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">reicon-vscode</h3>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="bg-[#007ACC]/10 text-[#007ACC] border border-[#007ACC]/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">VS Code Extension</span>
                  <span className="bg-white/10 text-white/60 border border-white/10 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">v1.0.3</span>
                </div>
                <p className="text-white/50 text-[14px] leading-relaxed mb-6 flex-1">
                  Browse and insert Reicon icons directly into your HTML, React, Vue, Svelte, or vanilla JS code from your editor's sidebar panel.
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    to="/usage/vscode"
                    className="bg-[#6C5CE7] hover:bg-[#5A4BD1] text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Guide
                  </Link>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=DevChauhan.reicon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Use
                  </a>
                  <a
                    href="https://github.com/dqev/reicon/tree/main/packages/reicon-vscode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Source
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
