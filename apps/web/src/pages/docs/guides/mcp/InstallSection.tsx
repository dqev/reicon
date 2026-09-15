import SyntaxBlock from '@/components/docs/SyntaxBlock';
import InstallTabs from '@/components/docs/InstallTabs';

interface InstallSectionProps {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function InstallSection({ copiedField, onCopy }: InstallSectionProps) {
  return (
    <>
      <h3 id="mcp-installation" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Installation
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Install the package using your preferred package manager.
      </p>

      <InstallTabs
        packageName="reicon-mcp"
        copiedField={copiedField}
        onCopy={onCopy}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4 mt-6">
        Or build and run the MCP server directly from source in the monorepo:
      </p>

      <SyntaxBlock
        title="monorepo"
        onCopy={() => onCopy('git clone https://github.com/dqev/reicon.git\ncd reicon\nnpm run build:mcp', 'mcp-source')}
        copied={copiedField === 'mcp-source'}
      >
        <span className="text-[#98c379]">git clone</span>
        <span className="text-text-base/70"> https://github.com/dqev/reicon.git</span>
        {'\n'}
        <span className="text-[#98c379]">cd</span>
        <span className="text-text-base/70"> reicon</span>
        {'\n'}
        <span className="text-[#98c379]">npm run</span>
        <span className="text-text-base/70"> build:mcp</span>
      </SyntaxBlock>
    </>
  );
}
