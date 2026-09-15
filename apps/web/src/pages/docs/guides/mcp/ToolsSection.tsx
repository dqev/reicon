import SyntaxBlock from '@/components/docs/SyntaxBlock';
import { SEARCH_TOOL, APPLY_TOOL } from './config';

interface ToolsSectionProps {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function ToolsSection({ copiedField, onCopy }: ToolsSectionProps) {
  return (
    <>
      <h3 id="mcp-agent-workflow" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Agent Workflow
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        A typical two-step flow for an AI agent to locate and insert a Reicon icon:
      </p>

      <div className="space-y-6 text-[14px] text-text-base/50 leading-relaxed mb-8">
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs mt-1">1</div>
          <div className="flex-1">
            <h4 className="text-text-base font-medium mb-1">Search with concise keywords</h4>
            <p className="mb-3">Use short, specific query terms like <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">cart</code> or <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">settings</code> — not full sentences.</p>
            <SyntaxBlock
              title="search_icons"
              onCopy={() => onCopy(SEARCH_TOOL, 'mcp-search-tool')}
              copied={copiedField === 'mcp-search-tool'}
            >
              <span className="text-[#61afef] font-semibold">search_icons</span>
              <span className="text-text-base/40">(</span>
              <span className="text-text-base/40">{'{ '}</span>
              <span className="text-[#e06c75]">query</span>
              <span className="text-text-base/40">: </span>
              <span className="text-[#98c379]">"heart"</span>
              <span className="text-text-base/40">, </span>
              <span className="text-[#e06c75]">weight</span>
              <span className="text-text-base/40">: </span>
              <span className="text-[#98c379]">"Filled"</span>
              <span className="text-text-base/40"> {'}'}</span>
              <span className="text-text-base/40">)</span>
            </SyntaxBlock>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs mt-1">2</div>
          <div className="flex-1">
            <h4 className="text-text-base font-medium mb-1">Apply the chosen icon</h4>
            <p className="mb-3">Generates the matching <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">importStatement</code> and <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">usageSnippet</code> for the agent to insert directly.</p>
            <SyntaxBlock
              title="apply_icon"
              onCopy={() => onCopy(APPLY_TOOL, 'mcp-apply-tool')}
              copied={copiedField === 'mcp-apply-tool'}
            >
              <span className="text-[#61afef] font-semibold">apply_icon</span>
              <span className="text-text-base/40">(</span>
              <span className="text-text-base/40">{'{'}</span>
              {'\n  '}
              <span className="text-[#e06c75]">name</span>
              <span className="text-text-base/40">: </span>
              <span className="text-[#98c379]">"heart"</span>
              <span className="text-text-base/40">,</span>
              {'\n  '}
              <span className="text-[#e06c75]">weight</span>
              <span className="text-text-base/40">: </span>
              <span className="text-[#98c379]">"Filled"</span>
              <span className="text-text-base/40">,</span>
              {'\n  '}
              <span className="text-[#e06c75]">framework</span>
              <span className="text-text-base/40">: </span>
              <span className="text-[#98c379]">"react"</span>
              <span className="text-text-base/40">,</span>
              {'\n  '}
              <span className="text-[#e06c75]">size</span>
              <span className="text-text-base/40">: </span>
              <span className="text-[#d19a66]">24</span>
              <span className="text-text-base/40">,</span>
              {'\n  '}
              <span className="text-[#e06c75]">color</span>
              <span className="text-text-base/40">: </span>
              <span className="text-[#98c379]">"#ef4444"</span>
              {'\n'}
              <span className="text-text-base/40">{'}'}</span>
              <span className="text-text-base/40">)</span>
            </SyntaxBlock>
          </div>
        </div>
      </div>

      <h3 id="mcp-tools-reference" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Tools Reference
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        The server exposes four primary MCP tools for agentic workflows:
      </p>

      <div className="overflow-x-auto mb-8 rounded-xl border border-text-base/6">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-text-base/6 bg-text-base/3">
              <th className="px-5 py-3 font-medium text-text-base">Tool</th>
              <th className="px-5 py-3 font-medium text-text-base">Input</th>
              <th className="px-5 py-3 font-medium text-text-base">Returns</th>
            </tr>
          </thead>
          <tbody className="text-text-base/55">
            <tr className="border-b border-text-base/6">
              <td className="px-5 py-3 font-mono text-text-base/70">search_icons</td>
              <td className="px-5 py-3"><code className="text-[12px]">query</code>, optional <code className="text-[12px]">weight</code>, <code className="text-[12px]">limit</code></td>
              <td className="px-5 py-3">Ranked matches with name, weight, category, tags, score</td>
            </tr>
            <tr className="border-b border-text-base/6">
              <td className="px-5 py-3 font-mono text-text-base/70">view_icon</td>
              <td className="px-5 py-3"><code className="text-[12px]">name</code>, <code className="text-[12px]">weight</code></td>
              <td className="px-5 py-3">Raw SVG string, viewBox, tags, category</td>
            </tr>
            <tr className="border-b border-text-base/6">
              <td className="px-5 py-3 font-mono text-text-base/70">apply_icon</td>
              <td className="px-5 py-3"><code className="text-[12px]">name</code>, <code className="text-[12px]">weight</code>, <code className="text-[12px]">framework</code>, optional <code className="text-[12px]">size</code>, <code className="text-[12px]">color</code></td>
              <td className="px-5 py-3">Framework-specific import and usage snippets</td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-mono text-text-base/70">list_categories</td>
              <td className="px-5 py-3">None</td>
              <td className="px-5 py-3">All distinct category values</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
