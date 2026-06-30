import SectionHeader from '../../components/usage/SectionHeader';

interface Props {
  markdownContent: string;
}

const FigmaIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size * (54/80)} height={size} viewBox="0 0 54 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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
);

export default function FigmaUsage({ markdownContent }: Props) {
  return (
    <section id="figma" className="mb-16 scroll-mt-24">
      <SectionHeader
        id="figma"
        title="Usage of Reicon Figma Plugin"
        level="h2"
        markdownContent={markdownContent}
        icon={<FigmaIcon size={30} />}
      />

      <p className="text-white/60 text-[15px] leading-[1.8] mb-6">
        Integrate Reicon directly into your design system workspace using the official Figma plugin. Search, customize stroke weights, and drag-and-drop vector icons directly onto your active canvases.
      </p>

      <div className="mt-8 border-b border-white/[0.06] pb-4">
        <h3 className="text-xl font-serif text-white mb-2">1. Installation</h3>
        <p className="text-white/60 text-[15px] leading-[1.8]">
          Find and install the official plugin from the Figma Community page.
        </p>
      </div>

      <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.04] mb-8">
        <h4 className="text-white font-medium text-[15px] mb-3">Install via Figma Community:</h4>
        <p className="text-white/50 text-[14px] leading-relaxed mb-4">
          Visit the plugin page to duplicate and install it directly to your Figma account:
        </p>
        <a
          href="https://www.figma.com/community/plugin/1652983191908763066"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-[#6C5CE7] hover:bg-[#5A4BD1] text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          Open Figma Community Plugin
        </a>
      </div>

      <div className="mt-10 mb-6 border-b border-white/[0.06] pb-4">
        <h3 className="text-xl font-serif text-white mb-2">2. Workflow & Guide</h3>
        <p className="text-white/60 text-[15px] leading-[1.8]">
          How to open and insert vector components inside a design file.
        </p>
      </div>

      <div className="space-y-6 text-[14px] text-white/50 leading-relaxed">
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-white/10 text-white font-bold flex items-center justify-center shrink-0 text-xs">
            1
          </div>
          <div>
            <h4 className="text-white font-medium mb-1">Open the plugin panel</h4>
            <p>Right-click inside any Figma project canvas, select <strong>Plugins</strong> &rarr; <strong>Reicon</strong>, or search for "Reicon" in the resource panel (Cmd/Ctrl + I).</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-white/10 text-white font-bold flex items-center justify-center shrink-0 text-xs">
            2
          </div>
          <div>
            <h4 className="text-white font-medium mb-1">Search or Filter</h4>
            <p>Browse through categories (Arrows, Communication, System, etc.) or type keywords in the search bar to locate specific shapes instantly.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-white/10 text-white font-bold flex items-center justify-center shrink-0 text-xs">
            3
          </div>
          <div>
            <h4 className="text-white font-medium mb-1">Select Weight and Color</h4>
            <p>Choose between <strong>Outline</strong> and <strong>Filled</strong> styles using the toggle swatches, and set a custom hex color.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-white/10 text-white font-bold flex items-center justify-center shrink-0 text-xs">
            4
          </div>
          <div>
            <h4 className="text-white font-medium mb-1">Insert Vector Shape</h4>
            <p>Click on any icon grid card to instantly spawn the vector group at the center of your viewport or active frames.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
