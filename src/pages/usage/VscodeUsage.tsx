import SectionHeader from '../../components/usage/SectionHeader';
import SyntaxBlock from '../../components/usage/SyntaxBlock';
import { VscVscodeInsiders } from 'react-icons/vsc';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function VscodeUsage({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="vscode" className="mb-16 scroll-mt-24">
      <SectionHeader
        id="vscode"
        title="VS Code"
        level="h2"
        markdownContent={markdownContent}
        icon={<VscVscodeInsiders className="text-[#007ACC]" size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        Browse, configure, and insert Reicon code snippets directly into your HTML, React, Vue, Svelte, or vanilla JS code from your editor's sidebar panel.
      </p>

      <div className="mt-8 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">1. Installation</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          Find and install the official extension from the Visual Studio Code Marketplace.
        </p>
      </div>

      <div className="bg-text-base/3 rounded-2xl p-6 border border-text-base/4 mb-8">
        <h4 className="text-text-base font-medium text-[15px] mb-3">Install via Editor Panel:</h4>
        <p className="text-text-base/50 text-[14px] leading-relaxed mb-4">
          Open the Extensions panel in VS Code (Cmd+Shift+X or Ctrl+Shift+X), search for <strong>Reicon</strong>, and click install. Or install it via command-line interface:
        </p>
        <SyntaxBlock
          title="CLI Installation"
          onCopy={() => onCopy("code --install-extension DevChauhan.reicon", "vsce-install")}
          copied={copiedField === 'vsce-install'}
        >
          <span className="text-[#98c379]">code</span>
          <span className="text-text-base/70"> --install-extension DevChauhan.reicon</span>
        </SyntaxBlock>
      </div>

      <div className="mt-10 mb-6 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">2. Workflow & Sidebar Panel</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          Configure default formats and insert code directly to active files.
        </p>
      </div>

      <div className="space-y-6 text-[14px] text-text-base/50 leading-relaxed">
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs">
            1
          </div>
          <div>
            <h4 className="text-text-base font-medium mb-1">Open the Sidebar Explorer</h4>
            <p>Click on the <strong>Reicon</strong> logo in the VS Code Activity Bar (located on the left-side toolbar).</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs">
            2
          </div>
          <div>
            <h4 className="text-text-base font-medium mb-1">Select Code Snippet Format</h4>
            <p>Choose your preferred output structure from the dropdown (React, Vue, Svelte, or raw SVG). The picker automatically copies or inserts code matching this selection.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs">
            3
          </div>
          <div>
            <h4 className="text-text-base font-medium mb-1">Set Size and Color</h4>
            <p>Set custom insertion dimensions (in pixels) and select colors. The selector uses <code>currentColor</code> by default, letting your icons auto-adapt to dark and light editor themes.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs">
            4
          </div>
          <div>
            <h4 className="text-text-base font-medium mb-1">Click to Insert</h4>
            <p>Make sure you have an active code editor window open. Click on any icon card in the sidebar panel. The extension will instantly insert the formatted code snippet at your current text cursor position.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
