import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function AdvancedUsage({ copiedField, onCopy }: Props) {
  return (
    <>
      {/* SSR & SVG Strings */}
      <h4 className="text-md font-medium text-text-base mb-4 mt-8">Server-Side Rendering (SSR) & SVG Strings</h4>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        To render icons on the server (SSR, Node.js, or framework environments), use the <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">toSvg()</code> method on the icon functions. This returns raw SVG strings without using DOM APIs.
      </p>

      <SyntaxBlock
        title="JavaScript (SSR)"
        onCopy={() => onCopy("import { Home } from 'reicon';\n\n// Get raw SVG string - works on server side!\nconst svgString = Home.toSvg({ size: 24, color: 'currentColor' });\n\n// Inject into HTML output\nres.send(`<div class=\"icon-wrap\">${svgString}</div>`);", 'vanilla-ssr')}
        copied={copiedField === 'vanilla-ssr'}
      >
        <span className="text-[#c678dd]">import</span>
        <span className="text-text-base/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-text-base/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon'</span>
        <span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-text-base/30">{'// Get raw SVG string - works on server side!'}</span>
        {'\n'}
        <span className="text-[#c678dd]">const</span>
        <span className="text-text-base/70"> svgString = Home.</span>
        <span className="text-[#61afef]">toSvg</span>
        <span className="text-text-base/70">({'{'} size: </span>
        <span className="text-[#d19a66]">24</span>
        <span className="text-text-base/70">, color: </span>
        <span className="text-[#98c379]">'currentColor'</span>
        <span className="text-text-base/70"> {'}'});</span>
      </SyntaxBlock>

      {/* Importing Custom Element */}
      <h4 className="text-md font-medium text-text-base mb-4 mt-8">Registering Custom Element (<code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code>)</h4>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        You can register and import the web component runtime right from your npm installation. Simply import <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon/element</code> once in your application entry point.
      </p>

      <SyntaxBlock
        title="JavaScript (Entry)"
        onCopy={() => onCopy("import 'reicon/element';\n\n// Now you can render <re-icon> anywhere in your markup:\n// document.body.innerHTML = '<re-icon icon=\"home\" size=\"24\" weight=\"filled\"></re-icon>';", 'vanilla-element')}
        copied={copiedField === 'vanilla-element'}
      >
        <span className="text-[#c678dd]">import</span>
        <span className="text-[#98c379]"> 'reicon/element'</span>
        <span className="text-text-base/30">;</span>
        {'\n\n'}
        <span className="text-text-base/30">{"// Now use <re-icon icon=\"home\"></re-icon> in your HTML templates!"}</span>
      </SyntaxBlock>

      {/* Direct Import */}
      <h4 className="text-md font-medium text-text-base mb-4 mt-8">Direct Import for Smallest Bundles</h4>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        For optimal build performance, import individual icons directly from their path:
      </p>

      <SyntaxBlock
        title="JavaScript"
        onCopy={() => onCopy("import Home from 'reicon/icons/Home';\nconst homeSvg = Home({ size: 24 });", 'vanilla-direct')}
        copied={copiedField === 'vanilla-direct'}
      >
        <span className="text-[#c678dd]">import</span>
        <span className="text-[#e5c07b]"> Home</span>
        <span className="text-[#c678dd]"> from</span>
        <span className="text-[#98c379]"> 'reicon/icons/Home'</span>
        <span className="text-text-base/30">;</span>
        {'\n'}
        <span className="text-[#c678dd]">const</span>
        <span className="text-text-base/70"> homeSvg = </span>
        <span className="text-[#61afef]">Home</span>
        <span className="text-text-base/70">({'{'} size: </span>
        <span className="text-[#d19a66]">24</span>
        <span className="text-text-base/70"> {'}'});</span>
      </SyntaxBlock>

      {/* UMD Functions script tag */}
      <h4 className="text-md font-medium text-text-base mb-4 mt-10">Load Functions globally via Script tag</h4>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        If you want to use the global <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon</code> object functions directly in a browser script tag:
      </p>

      <SyntaxBlock
        title="HTML & JS"
        onCopy={() => onCopy('<script src="https://unpkg.com/reicon@latest/umd/reicon.js"></script>\n<script>\n  // Create icon elements via global object\n  document.body.appendChild(reicon.Home({ size: 32 }));\n</script>', 'cdn-umd')}
        copied={copiedField === 'cdn-umd'}
      >
        <span className="text-text-base/70">{'<'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-[#d19a66]"> src</span>
        <span className="text-text-base/50">=</span>
        <span className="text-[#98c379]">"https://unpkg.com/reicon@latest/umd/reicon.js"</span>
        <span className="text-text-base/70">{'></'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-text-base/70">{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-text-base/70">{'>'}</span>
        {'\n  '}
        <span className="text-[#c678dd]">const</span>
        <span className="text-text-base/70"> home = reicon.</span>
        <span className="text-[#61afef]">Home</span>
        <span className="text-text-base/70">({'{'} size: </span>
        <span className="text-[#d19a66]">32</span>
        <span className="text-text-base/70"> {'}'});</span>
        {'\n  '}
        <span className="text-text-base/70">document.body.</span>
        <span className="text-[#61afef]">appendChild</span>
        <span className="text-text-base/70">(home);</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-text-base/70">{'>'}</span>
      </SyntaxBlock>

      {/* Styling with CSS */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Styling with CSS</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        The <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code> element acts like an inline block. It automatically inherits its parent's text color, allowing CSS utility-classes to adjust color naturally.
      </p>

      <SyntaxBlock
        title="CSS Styling"
        onCopy={() => onCopy('<style>\n  .icon-primary {\n    color: #9B8AFB;\n  }\n</style>\n\n<re-icon icon="home" class="icon-primary"></re-icon>\n\n<!-- Inherits color from parent -->\n<div style="color: #ef4444;">\n  <re-icon icon="heart"></re-icon>\n</div>', 'cdn-css')}
        copied={copiedField === 'cdn-css'}
      >
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">style</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}
        <span className="text-[#d19a66]">.icon-primary</span><span className="text-text-base/70"> {'{'}</span>
        {'\n    '}
        <span className="text-[#e06c75]">color</span><span className="text-text-base/50">: </span><span className="text-[#98c379]">#9B8AFB</span><span className="text-text-base/30">;</span>
        {'\n  '}
        <span className="text-text-base/70">{'}'}</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">style</span><span className="text-text-base/70">{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"home"</span><span className="text-[#d19a66]"> class</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"icon-primary"</span><span className="text-text-base/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-text-base/70">{'>'}</span>
        {'\n\n'}
        <span className="text-text-base/30">{'<!-- Inherits color from parent -->'}</span>
        {'\n'}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">div</span><span className="text-[#d19a66]"> style</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"color: #ef4444;"</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}
        <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"heart"</span><span className="text-text-base/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-text-base/70">{'>'}</span>
        {'\n'}
        <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">div</span><span className="text-text-base/70">{'>'}</span>
      </SyntaxBlock>

      {/* Full HTML Example */}
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Full Example HTML Page</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        A complete HTML document importing Reicon via CDN and showcasing customizations:
      </p>

      <SyntaxBlock
        title="Complete HTML Page"
        onCopy={() => onCopy('<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Reicon Page</title>\n  <script src="https://unpkg.com/reicon@latest/cdn/reicon.js"></script>\n</head>\n<body>\n  <nav>\n    <re-icon icon="home" size="20"></re-icon>\n    <re-icon icon="user" size="20"></re-icon>\n  </nav>\n  <main>\n    <h1>\n      <re-icon icon="shield-check" size="28" weight="filled" color="#9B8AFB"></re-icon>\n      App Verified\n    </h1>\n  </main>\n</body>\n</html>', 'cdn-full')}
        copied={copiedField === 'cdn-full'}
      >
        <span className="text-text-base/30">{'<!DOCTYPE html>'}</span>
        {'\n'}<span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">html</span><span className="text-[#d19a66]"> lang</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"en"</span><span className="text-text-base/70">{'>'}</span>
        {'\n'}<span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">head</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}<span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">meta</span><span className="text-[#d19a66]"> charset</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"UTF-8"</span><span className="text-text-base/70"> /{'>'}</span>
        {'\n  '}<span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">title</span><span className="text-text-base/70">{'>'}</span><span className="text-text-base/60">Reicon Page</span><span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">title</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}<span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">script</span><span className="text-[#d19a66]"> src</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"https://unpkg.com/reicon@latest/cdn/reicon.js"</span><span className="text-text-base/70">{'></'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/70">{'>'}</span>
        {'\n'}<span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">head</span><span className="text-text-base/70">{'>'}</span>
        {'\n'}<span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">body</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}<span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">nav</span><span className="text-text-base/70">{'>'}</span>
        {'\n    '}<span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"home"</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"20"</span><span className="text-text-base/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-text-base/70">{'>'}</span>
        {'\n    '}<span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"user"</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"20"</span><span className="text-text-base/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}<span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">nav</span><span className="text-text-base/70">{'>'}</span>
        {'\n\n  '}<span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">main</span><span className="text-text-base/70">{'>'}</span>
        {'\n    '}<span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">h1</span><span className="text-text-base/70">{'>'}</span>
        {'\n      '}<span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"shield-check"</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"28"</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"filled"</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#9B8AFB"</span><span className="text-text-base/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-text-base/70">{'>'}</span>
        {'\n      '}<span className="text-text-base/60">App Verified</span>
        {'\n    '}<span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">h1</span><span className="text-text-base/70">{'>'}</span>
        {'\n  '}<span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">main</span><span className="text-text-base/70">{'>'}</span>
        {'\n'}<span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">body</span><span className="text-text-base/70">{'>'}</span>
        {'\n'}<span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">html</span><span className="text-text-base/70">{'>'}</span>
      </SyntaxBlock>

      <div className="mt-6 bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
        <span className="text-yellow-400 font-medium">Note:</span> If you are compiling your project with modern bundlers (e.g. Vite, Webpack, rollup), prefer installing via <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded font-mono">npm install reicon</code> to enjoy full tree-shaking, static typing, and faster loading speeds.
      </div>
    </>
  );
}
