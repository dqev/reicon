import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Are the libraries free?",
    answer: "Yes, Reicon and all official framework packages (React, Angular, Vue, Svelte, Flutter, etc.) are 100% free and open source under the MIT License for personal and commercial projects."
  },
  {
    question: "What do I need to use them?",
    answer: "You can install Reicon via npm (e.g. npm i reicon-react), use our CDN script for standard HTML/JS, or copy raw SVGs directly into your codebase."
  },
  {
    question: "What grid size is used?",
    answer: "Every icon is drawn on a strict 24×24 pixel grid with predefined baseline strokes, guaranteeing icons stay pixel-perfect and sharp at any size."
  },
  {
    question: "Do they work with coding agents?",
    answer: "Yes! Reicon includes an official MCP (Model Context Protocol) server (reicon-mcp) so AI coding agents can search and insert icons directly into your code."
  },
  {
    question: "Do they work outside React?",
    answer: "Absolutely. We provide native packages for Angular, Vue 3, Svelte, React Native, Flutter, Compose, Astro, vanilla JavaScript, as well as Figma plugins and VS Code extensions."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-12 md:py-16">
      <div className="max-w-[680px] mx-auto">
        <h2 className="font-sans font-normal text-[22px] sm:text-[26px] text-[#fefefe] tracking-[-0.02em] text-center mb-12 sm:mb-16">
          FAQ
        </h2>

        <div className="border-t border-[#262626]">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-[#262626]">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex items-center justify-between w-full text-left py-4 sm:py-4.5 group cursor-pointer"
                >
                  <span className="font-sans font-normal text-[14px] sm:text-[15px] text-[#ededed] group-hover:text-white transition-colors">
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
    </section>
  );
}
