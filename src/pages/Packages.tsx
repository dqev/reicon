import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';

const PACKAGES = [
  {
    id: 'vanilla',
    name: 'reicon',
    npmPkg: 'reicon-react',
    description: 'A Reicon icon library package for web and JavaScript applications.',
    icon: <IoLogoJavascript className="text-yellow-400" size={48} />,
    npmUrl: 'https://www.npmjs.com/package/reicon-react',
    sourceUrl: 'https://github.com/reicon-dev/reicon',
    guideUrl: '/usage?framework=vanilla',
  },
  {
    id: 'react',
    name: 'reicon-react',
    npmPkg: 'reicon-react',
    description: 'A Reicon icon library package for React applications.',
    icon: <FaReact className="text-[#61DAFB]" size={48} />,
    npmUrl: 'https://www.npmjs.com/package/reicon-react',
    sourceUrl: 'https://github.com/reicon-dev/reicon',
    guideUrl: '/usage?framework=react',
  },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Header />

      <main className="flex-1 pt-14">
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
