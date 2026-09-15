import SectionHeader from '@/components/docs/SectionHeader';
import SyntaxBlock from '@/components/docs/SyntaxBlock';
import { McpIcon } from '@/components/docs/framework/icons';
import InstallSection from './InstallSection';
import SetupSection from './SetupSection';
import ToolsSection from './ToolsSection';
import { FILE_MARKER_CMD } from './config';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function McpDocs({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="mcp" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="mcp"
        title="MCP Server"
        level="h2"
        markdownContent={markdownContent}
        icon={<McpIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-mcp</code> package exposes Reicon icons to AI agents through the{' '}
        <a href="https://modelcontextprotocol.io" className="text-[#9B8AFB] hover:underline" target="_blank" rel="noopener noreferrer">
          Model Context Protocol
        </a>
        . Agents can search, preview SVG markup, and generate copy-pasteable code snippets without human input.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Search 2,700+ icons by keyword with ranked results</li>
        <li>Preview raw SVG markup before applying an icon</li>
        <li>Generate framework-specific import and usage snippets</li>
        <li>Browse icons by category</li>
        <li>Run the same logic from a CLI for scripts and CI</li>
      </ul>

      <InstallSection copiedField={copiedField} onCopy={onCopy} />
      <SetupSection copiedField={copiedField} onCopy={onCopy} />
      <ToolsSection copiedField={copiedField} onCopy={onCopy} />

      {/* CLI */}
      <h3 id="mcp-cli" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        CLI
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The same binary supports CLI mode when arguments are provided.
      </p>

      <div className="flex flex-col gap-4 mb-8">
        <SyntaxBlock
          title="Search"
          onCopy={() => onCopy('npx reicon-mcp search "shopping cart"', 'mcp-search')}
          copied={copiedField === 'mcp-search'}
        >
          <span className="text-[#98c379]">npx reicon-mcp search</span>
          <span className="text-[#e5c07b]"> "shopping cart"</span>
        </SyntaxBlock>

        <SyntaxBlock
          title="View"
          onCopy={() => onCopy('npx reicon-mcp view heart --weight Filled', 'mcp-view')}
          copied={copiedField === 'mcp-view'}
        >
          <span className="text-[#98c379]">npx reicon-mcp view</span>
          <span className="text-[#e5c07b]"> heart</span>
          <span className="text-[#56b6c2]"> --weight</span>
          <span className="text-[#98c379]"> Filled</span>
        </SyntaxBlock>

        <SyntaxBlock
          title="Apply"
          onCopy={() => onCopy('npx reicon-mcp apply heart --framework react --size 32 --color "#ef4444"', 'mcp-apply')}
          copied={copiedField === 'mcp-apply'}
        >
          <span className="text-[#98c379]">npx reicon-mcp apply</span>
          <span className="text-[#e5c07b]"> heart</span>
          <span className="text-[#56b6c2]"> --framework</span>
          <span className="text-text-base/70"> react</span>
          <span className="text-[#56b6c2]"> --size</span>
          <span className="text-[#d19a66]"> 32</span>
          <span className="text-[#56b6c2]"> --color</span>
          <span className="text-[#98c379]"> "#ef4444"</span>
        </SyntaxBlock>

        <SyntaxBlock
          title="Categories"
          onCopy={() => onCopy('npx reicon-mcp categories', 'mcp-categories')}
          copied={copiedField === 'mcp-categories'}
        >
          <span className="text-[#98c379]">npx reicon-mcp categories</span>
        </SyntaxBlock>
      </div>

      {/* Scripted File Insertion */}
      <h3 id="mcp-file-insertion" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Scripted File Insertion
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        For CI or scripts without an agent supervising edits, use <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">--file</code> and <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">--marker</code> to insert code directly.
      </p>

      <SyntaxBlock
        title="file marker"
        onCopy={() => onCopy(FILE_MARKER_CMD, 'mcp-file-marker')}
        copied={copiedField === 'mcp-file-marker'}
      >
        <span className="text-[#98c379]">npx reicon-mcp apply</span>
        <span className="text-[#e5c07b]"> heart</span>
        <span className="text-[#56b6c2]"> --framework</span>
        <span className="text-text-base/70"> react</span>
        <span className="text-[#56b6c2]"> --file</span>
        <span className="text-text-base/70"> src/App.tsx</span>
        <span className="text-[#56b6c2]"> --marker</span>
        <span className="text-[#98c379]"> "{'{/* ICON */}'}"</span>
      </SyntaxBlock>

      <div className="mt-4 bg-[#9B8AFB]/5 border border-[#9B8AFB]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed mb-6">
        <span className="text-[#9B8AFB] font-medium">Note:</span> Replaces the exact marker with the usage snippet and inserts the import at the top if missing. Exits non-zero if the marker is not found.
      </div>

      {/* Offline Operation */}
      <h3 id="mcp-offline-operation" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Offline Operation
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        The search index is bundled at build time from <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">data/icon-data.json</code>. No network calls are made at runtime — once installed, the server works fully offline.
      </p>

      <div className="mt-4 bg-text-base/3 border border-text-base/6 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed mb-12">
        <span className="text-text-base/70 font-medium">Rebuilding:</span> Rebuild with <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">npm run build:mcp</code> after the icon dataset changes to refresh the bundled index.
      </div>
    </section>
  );
}
