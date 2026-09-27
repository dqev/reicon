import SectionHeader from '@/components/docs/SectionHeader';
import SyntaxBlock from '@/components/docs/SyntaxBlock';
import { VscodeIcon } from '@/components/docs/framework/icons';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function VscodeDocs({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="vscode" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="vscode"
        title="VS Code"
        level="h2"
        markdownContent={markdownContent}
        icon={<VscodeIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        Browse, search, configure, and insert Reicon code snippets directly into your HTML, React, Vue, Svelte, or vanilla JS files from your editor's sidebar panel in Visual Studio Code and Google Antigravity IDE.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Search 2,700+ icons right inside your editor sidebar</li>
        <li>Copy or auto-insert code for React, Vue, Svelte, HTML, and raw SVG</li>
        <li>Customize stroke weight, dimensions, and colors prior to insertion</li>
        <li>Integrate natively with Google Antigravity AI Agent &amp; MCP workflows</li>
        <li>Install from Open VSX registry for open-source IDE compatibility (<code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">dqev.reicon</code>)</li>
        <li>Auto-adapt icon colors with dark and light editor themes</li>
      </ul>

      {/* Installation */}
      <h3 id="vscode-installation" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Installation
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Open the Extensions panel in VS Code or Antigravity IDE (<kbd className="px-1.5 py-0.5 text-xs bg-text-base/8 rounded font-mono">Cmd+Shift+X</kbd> or <kbd className="px-1.5 py-0.5 text-xs bg-text-base/8 rounded font-mono">Ctrl+Shift+X</kbd>), search for <strong>Reicon</strong>, and click install.
      </p>

      <div className="mb-6 flex flex-wrap gap-3">
        <a
          href="https://open-vsx.org/extension/dqev/reicon"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-text-base/5 hover:bg-text-base/10 text-text-base text-[13px] font-medium px-4 py-2 rounded-full transition-colors cursor-pointer select-none border-0 group"
        >
          <img src="/framework-logos/open-vsx.svg" alt="Open VSX Registry" className="w-4 h-4 shrink-0 object-contain" />
          <span>View on Open VSX Registry</span>
          <re-icon icon="arrow-up-right" size={12} className="text-text-base/40 group-hover:text-text-base/70 transition-colors" />
        </a>
      </div>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4 mt-6">
        Alternatively, install the extension using the terminal command:
      </p>

      <SyntaxBlock
        title="CLI Installation"
        onCopy={() => onCopy("code --install-extension dqev.reicon", "vsce-install")}
        copied={copiedField === 'vsce-install'}
      >
        <span className="text-[#98c379]">code</span>
        <span className="text-text-base/70"> --install-extension dqev.reicon</span>
      </SyntaxBlock>

      {/* Workflow & Sidebar Panel */}
      <h3 id="vscode-workflow" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Workflow &amp; Sidebar Panel
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        Configure default formats and insert code directly into active files:
      </p>

      <div className="space-y-6 text-[14px] text-text-base/50 leading-relaxed mb-12">
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs mt-1">
            1
          </div>
          <div className="flex-1">
            <h4 className="text-text-base font-medium mb-1">Open the Sidebar Explorer</h4>
            <p>Click on the <strong>Reicon</strong> icon in the Activity Bar (located on the left-side toolbar of VS Code / Antigravity IDE).</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs mt-1">
            2
          </div>
          <div className="flex-1">
            <h4 className="text-text-base font-medium mb-1">Select Code Snippet Format</h4>
            <p>Choose your target output format from the dropdown (React, Vue, Svelte, HTML, or raw SVG). The picker automatically formats code matching this selection.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs mt-1">
            3
          </div>
          <div className="flex-1">
            <h4 className="text-text-base font-medium mb-1">Set Size and Color</h4>
            <p>Set custom dimensions in pixels and stroke weights. By default, snippets use <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">currentColor</code> to inherit editor text styling.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs mt-1">
            4
          </div>
          <div className="flex-1">
            <h4 className="text-text-base font-medium mb-1">Click to Insert</h4>
            <p>With an active editor tab open, click any icon card in the sidebar. The formatted snippet will be inserted at your current cursor position.</p>
          </div>
        </div>
      </div>

      {/* Snippet Formats */}
      <h3 id="vscode-snippets" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Snippet Formats &amp; Autocomplete
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        The extension automatically formats code based on your project configuration:
      </p>

      <SyntaxBlock
        title="React Component Snippet"
        onCopy={() => onCopy("import { Home } from 'reicon-react';\n\n<Home size={24} color=\"currentColor\" />", "vscode-snippet-react")}
        copied={copiedField === 'vscode-snippet-react'}
      >
        <span className="text-[#c678dd]">import</span><span className="text-text-base/70"> {'{ '}</span><span className="text-[#e5c07b]">Home</span><span className="text-text-base/70">{' }'} </span><span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-react'</span><span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"currentColor"</span><span className="text-text-base/70"> /{'>'}</span>
      </SyntaxBlock>

      {/* Antigravity IDE Integration */}
      <h3 id="vscode-antigravity" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Antigravity IDE &amp; AI Agent Integration
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Reicon is published on the <strong>Open VSX Registry</strong> (<code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">dqev.reicon</code>) for native support in Google Antigravity IDE:
      </p>

      <div className="bg-text-base/3 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-0">
        <div className="w-12 h-12 rounded-xl bg-text-base/5 flex items-center justify-center shrink-0">
          <img src="/framework-logos/antigravity.svg" alt="Google Antigravity" className="w-8 h-8 object-contain" />
        </div>
        <div className="space-y-1">
          <h4 className="text-[14px] font-semibold text-text-base">Built for Google Antigravity Agent Workflows</h4>
          <p className="text-[13px] text-text-base/60 leading-relaxed">
            Google Antigravity IDE supports Open VSX extensions natively. Pair <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[11px]">dqev.reicon</code> with <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[11px]">reicon-mcp</code> to allow Antigravity AI agents to search, preview, and write native icons directly into your workspace.
          </p>
        </div>
      </div>

      {/* Shortcuts & Settings */}
      <h3 id="vscode-shortcuts" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Shortcuts &amp; Extension Settings
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Customize your extension defaults in your workspace <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">settings.json</code>:
      </p>

      <SyntaxBlock
        title="settings.json"
        onCopy={() => onCopy("{\n  \"reicon.defaultFormat\": \"react\",\n  \"reicon.defaultSize\": 24,\n  \"reicon.defaultColor\": \"currentColor\"\n}", "vscode-settings")}
        copied={copiedField === 'vscode-settings'}
      >
        <span className="text-text-base/70">{'{'}</span>
        {'\n  '}
        <span className="text-[#e06c75]">"reicon.defaultFormat"</span><span className="text-text-base/50">: </span><span className="text-[#98c379]">"react"</span><span className="text-text-base/30">,</span>
        {'\n  '}
        <span className="text-[#e06c75]">"reicon.defaultSize"</span><span className="text-text-base/50">: </span><span className="text-[#d19a66]">24</span><span className="text-text-base/30">,</span>
        {'\n  '}
        <span className="text-[#e06c75]">"reicon.defaultColor"</span><span className="text-text-base/50">: </span><span className="text-[#98c379]">"currentColor"</span>
        {'\n'}
        <span className="text-text-base/70">{'}'}</span>
      </SyntaxBlock>

      <div className="mt-6 bg-text-base/3 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed mb-12 border-0">
        <span className="text-text-base/80 font-medium">Tip:</span> Press <kbd className="px-1.5 py-0.5 text-xs bg-text-base/8 rounded font-mono">Cmd+P</kbd> / <kbd className="px-1.5 py-0.5 text-xs bg-text-base/8 rounded font-mono">Ctrl+P</kbd> and type <code className="text-text-base/70">Reicon: Insert Icon</code> to invoke the quick-pick popup without opening the sidebar.
      </div>
    </section>
  );
}
