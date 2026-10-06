import { useState } from 'react';
import FaqHelmet from './FaqHelmet';

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'what-is-reicon',
    question: 'What is Reicon?',
    answer: (
      <p>
        Reicon is a free, open-source SVG icon library providing <strong>2,700+ UI icons</strong> in Outline and Filled weights. Official packages are available for React (<code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">reicon-react</code>), Angular 20+ (<code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">reicon-angular</code>), React Native (<code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">reicon-react-native</code>), Vue 3 (<code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">reicon-vue</code>), Svelte (<code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">reicon-svelte</code>), Flutter (<code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">reicon_flutter</code>), Compose (<code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">reicon-compose</code>), vanilla JavaScript, CDN runtime, Figma plugin, VS Code extension, and MCP Server.
      </p>
    ),
  },
  {
    id: 'is-it-free',
    question: 'Is Reicon completely free?',
    answer: (
      <p>
        Yes, Reicon is 100% free and open-source under the{' '}
        <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-[#9B8AFB] hover:underline">MIT License</a>. Use it in personal, commercial, education, or open-source projects - no attribution required.
      </p>
    ),
  },
  {
    id: 'commercial-use',
    question: 'Can I use it in commercial projects?',
    answer: (
      <p>
        Absolutely. Commercial use is fully allowed. Bundle Reicon into templates, websites, SaaS products, or mobile apps - even ones you charge for.
      </p>
    ),
  },
  {
    id: 'grid-size',
    question: 'What grid size is used?',
    answer: (
      <p>
        Every icon is drawn on a strict <strong>24×24 pixel grid</strong> with predefined baseline strokes. This guarantees the icons stay pixel-perfect and sharp at any size, from 12px to large header formats.
      </p>
    ),
  },
  {
    id: 'icon-weights',
    question: 'How are weights handled?',
    answer: (
      <p>
        Reicon does not auto-generate weights. Each is handcrafted: <strong>Outline</strong> (clean stroked paths with default 1.5px stroke) and <strong>Filled</strong> (custom solid silhouettes designed to match their outline counterparts).
      </p>
    ),
  },
  {
    id: 'tree-shaking',
    question: 'Does it support tree-shaking?',
    answer: (
      <p>
        Yes! All packages (<code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">reicon-react</code>, <code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">reicon-angular</code>, <code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">reicon-react-native</code>, <code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">reicon-vue</code>, <code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">reicon-svelte</code>) are bundled as ES modules and declare <code className="text-[#ededed] bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono">"sideEffects": false</code>. Modern bundlers include only the icons you actually import.
      </p>
    ),
  },
  {
    id: 'figma-library',
    question: 'Is there a Figma library?',
    answer: (
      <p>
        Yes! A community Figma file with all vector master components is maintained. Search for "Reicon" in the Figma Community to duplicate the official file and design with the same visual assets.
      </p>
    ),
  },
  {
    id: 'request-icon',
    question: 'How do I request a new icon?',
    answer: (
      <p>
        Open an Issue on our{' '}
        <a href="https://github.com/dqev/reicon/issues" target="_blank" rel="noopener noreferrer" className="text-[#9B8AFB] hover:underline">GitHub Issues tracker</a>{' '}
        using the "Icon Request" template. We review requests weekly and design new sets based on popularity.
      </p>
    ),
  },
  {
    id: 'contributing',
    question: 'How do I contribute?',
    answer: (
      <p>
        We love contributions! You can help with code, type definitions, package updates, or new SVG icons. Read our contributing guide in the GitHub repository, fork the codebase, and open a Pull Request.
      </p>
    ),
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex-1">
      <FaqHelmet />

      <main className="max-w-[1160px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="max-w-[680px] mx-auto">
          <h1 className="font-sans font-normal text-[22px] sm:text-[26px] text-[#fefefe] tracking-[-0.02em] text-center mb-12 sm:mb-16">
            FAQ
          </h1>

          <div className="border-t border-[#262626]">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.id} className="border-b border-[#262626]">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="flex items-center justify-between w-full text-left py-4 sm:py-4.5 group cursor-pointer"
                  >
                    <span className="font-sans font-normal text-[14px] sm:text-[15px] text-[#ededed] group-hover:text-white transition-colors pr-4">
                      {item.question}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-4 h-4 text-[#767676] group-hover:text-white transition-transform duration-300 ease-in-out shrink-0 ml-4 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-5 pt-1 text-[13px] sm:text-[14px] font-normal text-[#9e9e9e] leading-[1.65]">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
