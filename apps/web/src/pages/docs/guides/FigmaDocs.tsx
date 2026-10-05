import SectionHeader from '@/components/docs/SectionHeader';

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

export default function FigmaDocs({ markdownContent }: Props) {
  return (
    <section id="figma" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="figma"
        title="Figma"
        level="h2"
        markdownContent={markdownContent}
        icon={<FigmaIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        Integrate Reicon directly into your design system workspace using the official Figma plugin. Search 2,700+ icons, customize stroke weights, toggle outline and filled variants, and drag-and-drop vector shapes onto your active canvases.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Access all 2,700+ icons inside your Figma design files</li>
        <li>Switch between Outline and Filled icon weights instantly</li>
        <li>Set custom hex colors or pick local Figma paint styles</li>
        <li>Insert clean, vector-grouped SVG paths into any frame</li>
        <li>Search icons by keyword, category, or alias</li>
        <li>Maintain 100% stroke weight consistency with codebase implementations</li>
      </ul>

      {/* Installation */}
      <h3 id="figma-installation" data-section className="text-lg font-sans font-medium text-text-base mb-4 mt-10 scroll-mt-24">
        Installation
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Visit the official plugin page on the Figma Community to install the extension to your workspace:
      </p>

      <div className="mb-8">
        <a
          href="https://www.figma.com/community/plugin/1652983191908763066"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-text-base/5 hover:bg-text-base/10 text-text-base text-[13px] font-medium px-4 py-2 rounded-full transition-colors cursor-pointer select-none border-0"
        >
          <FigmaIcon size={16} />
          <span>Open Figma Community Plugin</span>
          <re-icon icon="arrow-up-right" size={12} className="text-text-base/40" />
        </a>
      </div>

      {/* Workflow & Guide */}
      <h3 id="figma-workflow" data-section className="text-lg font-sans font-medium text-text-base mb-4 mt-10 scroll-mt-24">
        Workflow &amp; Guide
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        How to open and insert vector components inside a design file:
      </p>

      <div className="space-y-6 text-[14px] text-text-base/50 leading-relaxed mb-12">
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs mt-1">
            1
          </div>
          <div className="flex-1">
            <h4 className="text-text-base font-medium mb-1">Open the plugin panel</h4>
            <p>Right-click inside any Figma project canvas, select <strong>Plugins</strong> &rarr; <strong>Reicon</strong>, or search for "Reicon" in the resource panel (<kbd className="px-1.5 py-0.5 text-xs bg-text-base/8 rounded font-mono">Shift+I</kbd> / <kbd className="px-1.5 py-0.5 text-xs bg-text-base/8 rounded font-mono">Cmd+P</kbd>).</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs mt-1">
            2
          </div>
          <div className="flex-1">
            <h4 className="text-text-base font-medium mb-1">Search or Filter</h4>
            <p>Browse through categories (Arrows, Communication, System, Media, etc.) or type keywords in the search bar to locate specific shapes instantly.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs mt-1">
            3
          </div>
          <div className="flex-1">
            <h4 className="text-text-base font-medium mb-1">Select Weight and Color</h4>
            <p>Choose between <strong>Outline</strong> and <strong>Filled</strong> styles using the toggle swatches, and set a custom hex color.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs mt-1">
            4
          </div>
          <div className="flex-1">
            <h4 className="text-text-base font-medium mb-1">Insert Vector Shape</h4>
            <p>Click on any icon grid card to instantly spawn the vector group at the center of your viewport or active frames.</p>
          </div>
        </div>
      </div>

      {/* Component Variants & Weights */}
      <h3 id="figma-variants" data-section className="text-lg font-sans font-medium text-text-base mb-4 mt-10 scroll-mt-24">
        Component Variants &amp; Weights
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        All inserted vectors conform strictly to 24x24 pixel square viewports:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-text-base/3 border-0">
          <h4 className="text-[14px] font-semibold text-text-base mb-1">Outline Style</h4>
          <p className="text-[13px] text-text-base/50">1.5px default stroke paths. Scale with vector constraint scaling enabled.</p>
        </div>
        <div className="p-4 rounded-xl bg-text-base/3 border-0">
          <h4 className="text-[14px] font-semibold text-text-base mb-1">Filled Style</h4>
          <p className="text-[13px] text-text-base/50">Solid filled vector paths. Ideal for active nav states and filled button icons.</p>
        </div>
      </div>

      {/* Design Tokens & Styles */}
      <h3 id="figma-tokens" data-section className="text-lg font-sans font-medium text-text-base mb-4 mt-10 scroll-mt-24">
        Design Tokens &amp; Styles
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Easily bind inserted icons to your Figma design system token library:
      </p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-2 list-disc list-inside">
        <li>Apply local Color Variables (e.g. <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">sys/color/primary</code>) directly to icon fills or strokes</li>
        <li>Use with Figma Auto Layout components for responsive buttons and inputs</li>
        <li>Batch export vector assets for developer handoff</li>
      </ul>

      {/* Shortcuts & Tips */}
      <h3 id="figma-shortcuts" data-section className="text-lg font-sans font-medium text-text-base mb-4 mt-10 scroll-mt-24">
        Shortcuts &amp; Tips
      </h3>
      <div className="bg-text-base/3 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed mb-12 border-0">
        <span className="text-text-base/80 font-medium">Tip:</span> Use <kbd className="px-1.5 py-0.5 text-xs bg-text-base/8 rounded font-mono">Cmd+Option+P</kbd> (Mac) or <kbd className="px-1.5 py-0.5 text-xs bg-text-base/8 rounded font-mono">Ctrl+Alt+P</kbd> (Windows) to instantly re-launch the Reicon plugin window in any file.
      </div>
    </section>
  );
}
