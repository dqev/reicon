import CodeBlock from '../../components/usage/CodeBlock';
import { SiNpm } from 'react-icons/si';
import { IoLogoJavascript } from 'react-icons/io5';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Installation({ copiedField, onCopy }: Props) {
  return (
    <section id="installation" data-section className="mb-16 scroll-mt-24">
      <h2 className="text-xl font-serif text-text-base mb-4 flex items-center gap-2">Installation</h2>
      <p className="text-text-base/50 text-[14px] mb-6 leading-relaxed">
        Choose your preferred method to add Reicon to your project.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* npm */}
        <div className="bg-text-base/3 border border-text-base/6 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
              <SiNpm size={20} />
            </div>
            <span className="text-text-base/70 text-sm font-medium">npm</span>
          </div>
          <CodeBlock
            code="npm install reicon-react"
            onCopy={() => onCopy('npm install reicon-react', 'npm')}
            copied={copiedField === 'npm'}
          />
          <div className="mt-2">
            <CodeBlock
              code="yarn add reicon-react"
              onCopy={() => onCopy('yarn add reicon-react', 'yarn')}
              copied={copiedField === 'yarn'}
            />
          </div>
        </div>

        {/* CDN */}
        <div className="bg-text-base/3 border border-text-base/6 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <IoLogoJavascript className="text-yellow-400" size={18} />
            </div>
            <span className="text-text-base/70 text-sm font-medium">CDN Script</span>
          </div>
          <CodeBlock
            code='<script src="https://unpkg.com/reicon/cdn/reicon.min.js"></script>'
            onCopy={() => onCopy('<script src="https://unpkg.com/reicon/cdn/reicon.min.js"></script>', 'cdn-install')}
            copied={copiedField === 'cdn-install'}
          />
        </div>
      </div>
    </section>
  );
}
