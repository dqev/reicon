import { Link } from 'react-router-dom';

interface Step {
  num: number;
  title: string;
  description: React.ReactNode;
}

const STEPS: Step[] = [
  {
    num: 1,
    title: 'Copy the prompt',
    description: (
      <>
        One button packs the framework install line, icon import, and every prop into a single paste for your agent.
      </>
    ),
  },
  {
    num: 2,
    title: 'Paste it in your agent',
    description: (
      <>
        Claude Code, Cursor or Windsurf installs the package and wires the icon cleanly into your component.
      </>
    ),
  },
  {
    num: 3,
    title: 'Make it yours',
    description: (
      <>
        Tune Outline &amp; Filled weights in the{' '}
        <a
          href="#playground"
          className="underline underline-offset-2 hover:text-[#c9c9c9] transition-colors"
        >
          Playground
        </a>
        , or explore all 2,700+ icons in the{' '}
        <Link
          to="/icons"
          className="underline underline-offset-2 hover:text-[#c9c9c9] transition-colors"
        >
          Icon Library
        </Link>
        .
      </>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="reveal max-w-[1160px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14"
    >
      {/* Two-tone left-aligned heading */}
      <div className="mb-10 sm:mb-12">
        <h2 className="font-display tracking-[-0.02em] leading-[1.2] mb-3">
          <span className="block font-medium text-[24px] sm:text-[30px] md:text-[34px] text-[#fefefe]">
            Copy the prompt.
          </span>
          <span className="block font-medium text-[24px] sm:text-[30px] md:text-[34px] text-[#767676]">
            Paste it to coding agent
          </span>
        </h2>
        <p className="text-[13px] sm:text-[14px] text-[#8f8f8f] leading-[1.65] max-w-[420px]">
          Every icon ships prompt-ready. One copy, and your coding agent installs
          and renders it in Claude Code, Cursor, Windsurf, or Codex.
        </p>
      </div>

      {/* Step Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[18px]">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="flex flex-col gap-3 p-6 sm:p-7 rounded-[20px] bg-[#161616] card-inset"
          >
            {/* Number badge */}
            <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#9B8AFB] text-white text-[11px] font-semibold leading-none shrink-0 self-start mb-1">
              {step.num}
            </span>

            {/* Title */}
            <h3 className="font-sans font-semibold text-[14px] sm:text-[15px] text-[#fefefe] leading-[1.35] m-0">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-[13px] sm:text-[14px] leading-[1.65] text-[#8f8f8f] m-0">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
