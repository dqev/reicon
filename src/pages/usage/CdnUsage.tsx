import SyntaxBlock from '../../components/usage/SyntaxBlock';
import { IoLogoJavascript } from 'react-icons/io5';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function CdnUsage({ copiedField, onCopy }: Props) {
  return (
    <section id="cdn" data-section className="mb-16 scroll-mt-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 flex items-center justify-center">
          <IoLogoJavascript className="text-yellow-400" size={34} />
        </div>
        <div>
          <h2 className="text-2xl font-serif text-white">Usage of Reicon CDN</h2>
        </div>
      </div>

      <p className="text-white/60 text-[15px] leading-[1.8] mb-6">
        The CDN package for vanilla JavaScript and HTML applications. This package allows you to easily add scalable vector icons to any web project without framework dependencies. Perfect for static websites, legacy applications, or when you need lightweight icon integration with maximum browser compatibility.
      </p>

      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-white/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Add icons to HTML using simple custom elements</li>
        <li>Dynamically create and insert SVG icons with JavaScript</li>
        <li>Customize icon appearance with HTML attributes</li>
        <li>Icons are fetched on demand and cached in browser</li>
        <li>Use icons in Vanilla JS, jQuery, or any HTML page</li>
        <li>Zero build tools required — just add the script tag</li>
      </ul>

      {/* Getting Started */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Getting Started</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Include the Reicon CDN script in your HTML file. The script registers a <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code> custom element that you can use anywhere in your markup.
      </p>

      <SyntaxBlock
        title="HTML"
        onCopy={() => onCopy('<script src="https://cdn.reicon.dev/cdn/reicon.min.js"></script>', 'cdn-script')}
        copied={copiedField === 'cdn-script'}
      >
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-[#d19a66]"> src</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"https://cdn.reicon.dev/cdn/reicon.min.js"</span>
        <span className="text-white/70">{'></'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* Basic Usage */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Basic Usage</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Once the script is loaded, use the <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code> element with the <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">icon</code> attribute set to the icon name.
      </p>

      <SyntaxBlock
        title="HTML"
        onCopy={() => onCopy('<re-icon icon="home"></re-icon>\n<re-icon icon="shield-check"></re-icon>\n<re-icon icon="bell"></re-icon>', 'cdn-basic')}
        copied={copiedField === 'cdn-basic'}
      >
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-[#d19a66]"> icon</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"home"</span>
        <span className="text-white/70">{'></'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-white/70">{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-[#d19a66]"> icon</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"shield-check"</span>
        <span className="text-white/70">{'></'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-white/70">{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-[#d19a66]"> icon</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"bell"</span>
        <span className="text-white/70">{'></'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* Customizing Icons */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Customizing Icons</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        You can customize icons using HTML attributes. Set the <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">size</code>, <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">color</code>, and <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">weight</code> attributes directly on the element.
      </p>

      <SyntaxBlock
        title="Attributes"
        onCopy={() => onCopy('<!-- Size -->\n<re-icon icon="home" size="16"></re-icon>\n<re-icon icon="home" size="24"></re-icon>\n<re-icon icon="home" size="32"></re-icon>\n\n<!-- Color -->\n<re-icon icon="heart" color="#ef4444"></re-icon>\n<re-icon icon="heart" color="rgb(99, 102, 241)"></re-icon>\n\n<!-- Weight -->\n<re-icon icon="star" weight="outline"></re-icon>\n<re-icon icon="star" weight="filled"></re-icon>', 'cdn-attrs')}
        copied={copiedField === 'cdn-attrs'}
      >
        <span className="text-white/30">{'<!-- Size -->'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"home"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"16"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"home"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"24"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"home"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"32"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n\n'}
        <span className="text-white/30">{'<!-- Color -->'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"heart"</span><span className="text-[#d19a66]"> color</span><span className="text-white/50">=</span><span className="text-[#98c379]">"#ef4444"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"heart"</span><span className="text-[#d19a66]"> color</span><span className="text-white/50">=</span><span className="text-[#98c379]">"rgb(99, 102, 241)"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n\n'}
        <span className="text-white/30">{'<!-- Weight -->'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"star"</span><span className="text-[#d19a66]"> weight</span><span className="text-white/50">=</span><span className="text-[#98c379]">"outline"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"star"</span><span className="text-[#d19a66]"> weight</span><span className="text-white/50">=</span><span className="text-[#98c379]">"filled"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* Styling with CSS */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Styling with CSS</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        The <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code> element behaves like an inline element. You can style it using regular CSS classes or inline styles. The icon inherits the <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">color</code> property from its parent by default.
      </p>

      <SyntaxBlock
        title="CSS Styling"
        onCopy={() => onCopy('<style>\n  .icon-primary {\n    color: #6C5CE7;\n  }\n  .icon-lg {\n    font-size: 32px;\n  }\n</style>\n\n<re-icon icon="home" class="icon-primary"></re-icon>\n\n<!-- Inherits color from parent -->\n<div style="color: #ef4444;">\n  <re-icon icon="heart"></re-icon>\n</div>', 'cdn-css')}
        copied={copiedField === 'cdn-css'}
      >
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">style</span><span className="text-white/70">{'>'}</span>
        {'\n  '}
        <span className="text-[#d19a66]">.icon-primary</span><span className="text-white/70"> {'{'}</span>
        {'\n    '}
        <span className="text-[#e06c75]">color</span><span className="text-white/50">: </span><span className="text-[#98c379]">#6C5CE7</span><span className="text-white/30">;</span>
        {'\n  '}
        <span className="text-white/70">{'}'}</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">style</span><span className="text-white/70">{'>'}</span>
        {'\n\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"home"</span><span className="text-[#d19a66]"> class</span><span className="text-white/50">=</span><span className="text-[#98c379]">"icon-primary"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n\n'}
        <span className="text-white/30">{'<!-- Inherits color from parent -->'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">div</span><span className="text-[#d19a66]"> style</span><span className="text-white/50">=</span><span className="text-[#98c379]">"color: #ef4444;"</span><span className="text-white/70">{'>'}</span>
        {'\n  '}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"heart"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">div</span><span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* Dynamic Creation with JavaScript */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Dynamic Creation with JavaScript</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        You can dynamically create icons using JavaScript's <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">document.createElement</code>. This is useful for rendering icons based on user interaction or data.
      </p>

      <SyntaxBlock
        title="JavaScript"
        onCopy={() => onCopy('const icon = document.createElement(\'re-icon\');\nicon.setAttribute(\'icon\', \'home\');\nicon.setAttribute(\'size\', \'24\');\nicon.setAttribute(\'color\', \'#6C5CE7\');\ndocument.body.appendChild(icon);', 'cdn-js')}
        copied={copiedField === 'cdn-js'}
      >
        <span className="text-[#c678dd]">const</span><span className="text-[#e5c07b]"> icon</span><span className="text-white/50"> = </span><span className="text-white/70">document.</span><span className="text-[#61afef]">createElement</span><span className="text-white/70">(</span><span className="text-[#98c379]">'re-icon'</span><span className="text-white/70">)</span><span className="text-white/30">;</span>
        {'\n'}
        <span className="text-white/70">icon.</span><span className="text-[#61afef]">setAttribute</span><span className="text-white/70">(</span><span className="text-[#98c379]">'icon'</span><span className="text-white/70">, </span><span className="text-[#98c379]">'home'</span><span className="text-white/70">)</span><span className="text-white/30">;</span>
        {'\n'}
        <span className="text-white/70">icon.</span><span className="text-[#61afef]">setAttribute</span><span className="text-white/70">(</span><span className="text-[#98c379]">'size'</span><span className="text-white/70">, </span><span className="text-[#98c379]">'24'</span><span className="text-white/70">)</span><span className="text-white/30">;</span>
        {'\n'}
        <span className="text-white/70">icon.</span><span className="text-[#61afef]">setAttribute</span><span className="text-white/70">(</span><span className="text-[#98c379]">'color'</span><span className="text-white/70">, </span><span className="text-[#98c379]">'#6C5CE7'</span><span className="text-white/70">)</span><span className="text-white/30">;</span>
        {'\n'}
        <span className="text-white/70">document.body.</span><span className="text-[#61afef]">appendChild</span><span className="text-white/70">(icon)</span><span className="text-white/30">;</span>
      </SyntaxBlock>

      {/* Full Example */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Full Example</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Here's a complete HTML page using Reicon via CDN with multiple icons and customizations.
      </p>

      <SyntaxBlock
        title="Complete HTML Page"
        onCopy={() => onCopy('<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My App</title>\n  <script src="https://cdn.reicon.dev/cdn/reicon.min.js"></script>\n</head>\n<body>\n  <nav>\n    <re-icon icon="home" size="20"></re-icon>\n    <re-icon icon="bell" size="20"></re-icon>\n    <re-icon icon="user" size="20"></re-icon>\n  </nav>\n\n  <main>\n    <h1>\n      <re-icon icon="shield-check" size="28" weight="filled" color="#6C5CE7"></re-icon>\n      Welcome\n    </h1>\n  </main>\n</body>\n</html>', 'cdn-full')}
        copied={copiedField === 'cdn-full'}
      >
        <span className="text-white/30">{'<!DOCTYPE html>'}</span>
        {'\n'}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">html</span><span className="text-[#d19a66]"> lang</span><span className="text-white/50">=</span><span className="text-[#98c379]">"en"</span><span className="text-white/70">{'>'}</span>
        {'\n'}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">head</span><span className="text-white/70">{'>'}</span>
        {'\n  '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">meta</span><span className="text-[#d19a66]"> charset</span><span className="text-white/50">=</span><span className="text-[#98c379]">"UTF-8"</span><span className="text-white/70"> /{'>'}</span>
        {'\n  '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">title</span><span className="text-white/70">{'>'}</span><span className="text-white/60">My App</span><span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">title</span><span className="text-white/70">{'>'}</span>
        {'\n  '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">script</span><span className="text-[#d19a66]"> src</span><span className="text-white/50">=</span><span className="text-[#98c379]">"https://cdn.reicon.dev/cdn/reicon.min.js"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">script</span><span className="text-white/70">{'>'}</span>
        {'\n'}<span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">head</span><span className="text-white/70">{'>'}</span>
        {'\n'}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">body</span><span className="text-white/70">{'>'}</span>
        {'\n  '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">nav</span><span className="text-white/70">{'>'}</span>
        {'\n    '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"home"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"20"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n    '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"bell"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"20"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n    '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"user"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"20"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n  '}<span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">nav</span><span className="text-white/70">{'>'}</span>
        {'\n\n  '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">main</span><span className="text-white/70">{'>'}</span>
        {'\n    '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">h1</span><span className="text-white/70">{'>'}</span>
        {'\n      '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"shield-check"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"28"</span><span className="text-[#d19a66]"> weight</span><span className="text-white/50">=</span><span className="text-[#98c379]">"filled"</span><span className="text-[#d19a66]"> color</span><span className="text-white/50">=</span><span className="text-[#98c379]">"#6C5CE7"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n      '}<span className="text-white/60">Welcome</span>
        {'\n    '}<span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">h1</span><span className="text-white/70">{'>'}</span>
        {'\n  '}<span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">main</span><span className="text-white/70">{'>'}</span>
        {'\n'}<span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">body</span><span className="text-white/70">{'>'}</span>
        {'\n'}<span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">html</span><span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      <div className="mt-6 bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-4 text-[13px] text-white/50 leading-relaxed">
        <span className="text-yellow-400 font-medium">Note:</span> The CDN script automatically registers the custom element. Icons are fetched on demand from the CDN and cached in the browser for fast subsequent loads. No build step is required.
      </div>
    </section>
  );
}
