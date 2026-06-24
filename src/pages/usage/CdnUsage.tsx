import SyntaxBlock from '../../components/usage/SyntaxBlock';
import InstallTabs from '../../components/usage/InstallTabs';
import { IoLogoJavascript } from 'react-icons/io5';
import SectionHeader from '../../components/usage/SectionHeader';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function CdnUsage({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="cdn" data-section className="mb-16 scroll-mt-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 flex items-center justify-center">
          <IoLogoJavascript className="text-yellow-400" size={34} />
        </div>
        <div className="flex-1">
          <SectionHeader id="cdn" title="Usage of Reicon Vanilla JS & CDN" level="h2" markdownContent={markdownContent} />
        </div>
      </div>

      <p className="text-white/60 text-[15px] leading-[1.8] mb-6">
        The official vanilla JavaScript package and CDN web components for Reicon. This package allows you to easily add precise, vector-based SVG icons to any JavaScript project or web application without framework dependencies.
      </p>

      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-white/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Import individual icons as DOM element factories in vanilla JS</li>
        <li>Fetch SVG markup as strings directly (fully SSR/Node.js compatible)</li>
        <li>Register and render custom elements (<code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code>) inside HTML templates or SPAs</li>
        <li>Load all icons via CDN script tags without build steps or bundlers</li>
        <li>Tree-shake unused icons automatically when using modern bundlers</li>
      </ul>

      {/* Vanilla JS Package Section */}
      <div className="mt-10 mb-8 border-b border-white/[0.06] pb-4">
        <h3 className="text-xl font-serif text-white mb-2">1. Vanilla JS / Bundler (NPM)</h3>
        <p className="text-white/60 text-[15px] leading-[1.8]">
          Install the package using your preferred package manager and import tree-shakeable icons directly in your application code.
        </p>
      </div>

      {/* Installation */}
      <h4 className="text-md font-medium text-white mb-4">Installation</h4>
      <InstallTabs
        packageName="reicon"
        copiedField={copiedField}
        onCopy={onCopy}
      />

      {/* Basic Usage ESM */}
      <h4 className="text-md font-medium text-white mb-4 mt-8">Creating DOM Elements</h4>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Import named icons directly from <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">reicon</code>. Each icon is a factory function that returns a native <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">SVGSVGElement</code>.
      </p>

      <SyntaxBlock
        title="JavaScript"
        onCopy={() => onCopy("import { Home, ShieldCheck } from 'reicon';\n\n// Create SVG elements\nconst home = Home({ size: 24 });\nconst shield = ShieldCheck({ size: 32, color: '#6C5CE7', weight: 'Filled' });\n\n// Append directly to document\ndocument.body.appendChild(home);\ndocument.body.appendChild(shield);", 'vanilla-esm')}
        copied={copiedField === 'vanilla-esm'}
      >
        <span className="text-[#c678dd]">import</span>
        <span className="text-white/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-white/70">, </span>
        <span className="text-[#e5c07b]">ShieldCheck</span>
        <span className="text-white/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon'</span>
        <span className="text-white/30">;</span>
        {'\n\n'}
        <span className="text-white/30">{'// Create SVG elements'}</span>
        {'\n'}
        <span className="text-[#c678dd]">const</span>
        <span className="text-white/70"> home = </span>
        <span className="text-[#61afef]">Home</span>
        <span className="text-white/70">({'{'} size: </span>
        <span className="text-[#d19a66]">24</span>
        <span className="text-white/70"> {'}'});</span>
        {'\n'}
        <span className="text-[#c678dd]">const</span>
        <span className="text-white/70"> shield = </span>
        <span className="text-[#61afef]">ShieldCheck</span>
        <span className="text-white/70">({'{'} size: </span>
        <span className="text-[#d19a66]">32</span>
        <span className="text-white/70">, color: </span>
        <span className="text-[#98c379]">'#6C5CE7'</span>
        <span className="text-white/70">, weight: </span>
        <span className="text-[#98c379]">'Filled'</span>
        <span className="text-white/70"> {'}'});</span>
        {'\n\n'}
        <span className="text-white/30">{'// Append directly to document'}</span>
        {'\n'}
        <span className="text-white/70">document.body.</span>
        <span className="text-[#61afef]">appendChild</span>
        <span className="text-white/70">(home);</span>
        {'\n'}
        <span className="text-white/70">document.body.</span>
        <span className="text-[#61afef]">appendChild</span>
        <span className="text-white/70">(shield);</span>
      </SyntaxBlock>

      {/* SSR & SVG Strings */}
      <h4 className="text-md font-medium text-white mb-4 mt-8">Server-Side Rendering (SSR) & SVG Strings</h4>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        To render icons on the server (SSR, Node.js, or framework environments), use the <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">toSvg()</code> method on the icon functions. This returns raw SVG strings without using DOM APIs.
      </p>

      <SyntaxBlock
        title="JavaScript (SSR)"
        onCopy={() => onCopy("import { Home } from 'reicon';\n\n// Get raw SVG string - works on server side!\nconst svgString = Home.toSvg({ size: 24, color: 'currentColor' });\n\n// Inject into HTML output\nres.send(`<div class=\"icon-wrap\">${svgString}</div>`);", 'vanilla-ssr')}
        copied={copiedField === 'vanilla-ssr'}
      >
        <span className="text-[#c678dd]">import</span>
        <span className="text-white/70">{' { '}</span>
        <span className="text-[#e5c07b]">Home</span>
        <span className="text-white/70">{' } '}</span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]"> 'reicon'</span>
        <span className="text-white/30">;</span>
        {'\n\n'}
        <span className="text-white/30">{'// Get raw SVG string - works on server side!'}</span>
        {'\n'}
        <span className="text-[#c678dd]">const</span>
        <span className="text-white/70"> svgString = Home.</span>
        <span className="text-[#61afef]">toSvg</span>
        <span className="text-white/70">({'{'} size: </span>
        <span className="text-[#d19a66]">24</span>
        <span className="text-white/70">, color: </span>
        <span className="text-[#98c379]">'currentColor'</span>
        <span className="text-white/70"> {'}'});</span>
      </SyntaxBlock>

      {/* Importing Custom Element */}
      <h4 className="text-md font-medium text-white mb-4 mt-8">Registering Custom Element (<code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code>)</h4>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        You can register and import the web component runtime right from your npm installation. Simply import <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">reicon/element</code> once in your application entry point.
      </p>

      <SyntaxBlock
        title="JavaScript (Entry)"
        onCopy={() => onCopy("import 'reicon/element';\n\n// Now you can render <re-icon> anywhere in your markup:\n// document.body.innerHTML = '<re-icon icon=\"home\" size=\"24\" weight=\"filled\"></re-icon>';", 'vanilla-element')}
        copied={copiedField === 'vanilla-element'}
      >
        <span className="text-[#c678dd]">import</span>
        <span className="text-[#98c379]"> 'reicon/element'</span>
        <span className="text-white/30">;</span>
        {'\n\n'}
        <span className="text-white/30">{"// Now use <re-icon icon=\"home\"></re-icon> in your HTML templates!"}</span>
      </SyntaxBlock>

      {/* Direct Import */}
      <h4 className="text-md font-medium text-white mb-4 mt-8">Direct Import for Smallest Bundles</h4>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
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
        <span className="text-white/30">;</span>
        {'\n'}
        <span className="text-[#c678dd]">const</span>
        <span className="text-white/70"> homeSvg = </span>
        <span className="text-[#61afef]">Home</span>
        <span className="text-white/70">({'{'} size: </span>
        <span className="text-[#d19a66]">24</span>
        <span className="text-white/70"> {'}'});</span>
      </SyntaxBlock>

      {/* CDN / HTML Section */}
      <div className="mt-16 mb-8 border-b border-white/[0.06] pb-4">
        <h3 className="text-xl font-serif text-white mb-2">2. CDN & HTML (No Build Tools)</h3>
        <p className="text-white/60 text-[15px] leading-[1.8]">
          Perfect for static HTML websites, legacy applications, and prototyping. Include a script tag and render icons instantly.
        </p>
      </div>

      {/* Getting Started CDN */}
      <h4 className="text-md font-medium text-white mb-4">Register Custom Element (<code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code>)</h4>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Include the script tag inside your HTML page. This registers a reactive <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code> component that supports dynamic styling, sizes, weights, and gradients.
      </p>

      <SyntaxBlock
        title="HTML (UNPKG CDN)"
        onCopy={() => onCopy('<script src="https://unpkg.com/reicon/cdn/reicon.min.js"></script>', 'cdn-script')}
        copied={copiedField === 'cdn-script'}
      >
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-[#d19a66]"> src</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"https://unpkg.com/reicon/cdn/reicon.min.js"</span>
        <span className="text-white/70">{'></'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      <div className="mt-4 mb-8">
        <p className="text-white/40 text-[13px]">
          Or load a specific version: <code className="text-white/60 bg-white/[0.04] px-1 py-0.5 rounded font-mono break-all">https://unpkg.com/reicon@latest/cdn/reicon.min.js</code>
        </p>
      </div>

      <h4 className="text-md font-medium text-white mb-4">Basic CDN Usage</h4>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        Simply add the <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code> tags directly in your HTML:
      </p>

      <SyntaxBlock
        title="HTML"
        onCopy={() => onCopy('<re-icon icon="home"></re-icon>\n<re-icon icon="shield-check" weight="filled" size="32" color="#6C5CE7"></re-icon>', 'cdn-basic')}
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
        <span className="text-[#d19a66]"> weight</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"filled"</span>
        <span className="text-[#d19a66]"> size</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"32"</span>
        <span className="text-[#d19a66]"> color</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"#6C5CE7"</span>
        <span className="text-white/70">{'></'}</span>
        <span className="text-[#e06c75]">re-icon</span>
        <span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* UMD Functions script tag */}
      <h4 className="text-md font-medium text-white mb-4 mt-10">Load Functions globally via Script tag</h4>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        If you want to use the global <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">reicon</code> object functions directly in a browser script tag:
      </p>

      <SyntaxBlock
        title="HTML & JS"
        onCopy={() => onCopy('<script src="https://unpkg.com/reicon@latest/umd/reicon.js"></script>\n<script>\n  // Create icon elements via global object\n  document.body.appendChild(reicon.Home({ size: 32 }));\n</script>', 'cdn-umd')}
        copied={copiedField === 'cdn-umd'}
      >
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-[#d19a66]"> src</span>
        <span className="text-white/50">=</span>
        <span className="text-[#98c379]">"https://unpkg.com/reicon@latest/umd/reicon.js"</span>
        <span className="text-white/70">{'></'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-white/70">{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-white/70">{'>'}</span>
        {'\n  '}
        <span className="text-[#c678dd]">const</span>
        <span className="text-white/70"> home = reicon.</span>
        <span className="text-[#61afef]">Home</span>
        <span className="text-white/70">({'{'} size: </span>
        <span className="text-[#d19a66]">32</span>
        <span className="text-white/70"> {'}'});</span>
        {'\n  '}
        <span className="text-white/70">document.body.</span>
        <span className="text-[#61afef]">appendChild</span>
        <span className="text-white/70">(home);</span>
        {'\n'}
        <span className="text-white/70">{'</'}</span>
        <span className="text-[#e06c75]">script</span>
        <span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      {/* Customizing Icons */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Customizing Elements (Attributes)</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        You can customize <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code> elements using reactive HTML attributes. Updates will be rendered instantly.
      </p>

      <SyntaxBlock
        title="Attributes"
        onCopy={() => onCopy('<!-- Size -->\n<re-icon icon="home" size="16"></re-icon>\n<re-icon icon="home" size="32"></re-icon>\n\n<!-- Color -->\n<re-icon icon="heart" color="#ef4444"></re-icon>\n<re-icon icon="heart" color="rgb(99, 102, 241)"></re-icon>\n\n<!-- Weight -->\n<re-icon icon="star" weight="outline"></re-icon>\n<re-icon icon="star" weight="filled"></re-icon>', 'cdn-attrs')}
        copied={copiedField === 'cdn-attrs'}
      >
        <span className="text-white/30">{'<!-- Size -->'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"home"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"16"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"home"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"32"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n\n'}
        <span className="text-white/30">{'<!-- Color -->'}</span>
        {'\n'}
        <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"heart"</span><span className="text-[#d19a66]"> color</span><span className="text-white/50">=</span><span className="text-[#98c379]">"#ef4444"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
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
        The <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px]">{'<re-icon>'}</code> element acts like an inline block. It automatically inherits its parent's text color, allowing CSS utility-classes to adjust color naturally.
      </p>

      <SyntaxBlock
        title="CSS Styling"
        onCopy={() => onCopy('<style>\n  .icon-primary {\n    color: #6C5CE7;\n  }\n</style>\n\n<re-icon icon="home" class="icon-primary"></re-icon>\n\n<!-- Inherits color from parent -->\n<div style="color: #ef4444;">\n  <re-icon icon="heart"></re-icon>\n</div>', 'cdn-css')}
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

      {/* Full HTML Example */}
      <h3 className="text-lg font-serif text-white mb-4 mt-10">Full Example HTML Page</h3>
      <p className="text-white/60 text-[15px] leading-[1.8] mb-4">
        A complete HTML document importing Reicon via CDN and showcasing customizations:
      </p>

      <SyntaxBlock
        title="Complete HTML Page"
        onCopy={() => onCopy('<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Reicon Page</title>\n  <script src="https://unpkg.com/reicon@latest/cdn/reicon.min.js"></script>\n</head>\n<body>\n  <nav>\n    <re-icon icon="home" size="20"></re-icon>\n    <re-icon icon="user" size="20"></re-icon>\n  </nav>\n  <main>\n    <h1>\n      <re-icon icon="shield-check" size="28" weight="filled" color="#6C5CE7"></re-icon>\n      App Verified\n    </h1>\n  </main>\n</body>\n</html>', 'cdn-full')}
        copied={copiedField === 'cdn-full'}
      >
        <span className="text-white/30">{'<!DOCTYPE html>'}</span>
        {'\n'}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">html</span><span className="text-[#d19a66]"> lang</span><span className="text-white/50">=</span><span className="text-[#98c379]">"en"</span><span className="text-white/70">{'>'}</span>
        {'\n'}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">head</span><span className="text-white/70">{'>'}</span>
        {'\n  '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">meta</span><span className="text-[#d19a66]"> charset</span><span className="text-white/50">=</span><span className="text-[#98c379]">"UTF-8"</span><span className="text-white/70"> /{'>'}</span>
        {'\n  '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">title</span><span className="text-white/70">{'>'}</span><span className="text-white/60">Reicon Page</span><span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">title</span><span className="text-white/70">{'>'}</span>
        {'\n  '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">script</span><span className="text-[#d19a66]"> src</span><span className="text-white/50">=</span><span className="text-[#98c379]">"https://unpkg.com/reicon@latest/cdn/reicon.min.js"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">script</span><span className="text-white/70">{'>'}</span>
        {'\n'}<span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">head</span><span className="text-white/70">{'>'}</span>
        {'\n'}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">body</span><span className="text-white/70">{'>'}</span>
        {'\n  '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">nav</span><span className="text-white/70">{'>'}</span>
        {'\n    '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"home"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"20"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n    '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"user"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"20"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n  '}<span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">nav</span><span className="text-white/70">{'>'}</span>
        {'\n\n  '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">main</span><span className="text-white/70">{'>'}</span>
        {'\n    '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">h1</span><span className="text-white/70">{'>'}</span>
        {'\n      '}<span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"shield-check"</span><span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"28"</span><span className="text-[#d19a66]"> weight</span><span className="text-white/50">=</span><span className="text-[#98c379]">"filled"</span><span className="text-[#d19a66]"> color</span><span className="text-white/50">=</span><span className="text-[#98c379]">"#6C5CE7"</span><span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
        {'\n      '}<span className="text-white/60">App Verified</span>
        {'\n    '}<span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">h1</span><span className="text-white/70">{'>'}</span>
        {'\n  '}<span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">main</span><span className="text-white/70">{'>'}</span>
        {'\n'}<span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">body</span><span className="text-white/70">{'>'}</span>
        {'\n'}<span className="text-white/70">{'</'}</span><span className="text-[#e06c75]">html</span><span className="text-white/70">{'>'}</span>
      </SyntaxBlock>

      <div className="mt-6 bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-4 text-[13px] text-white/50 leading-relaxed">
        <span className="text-yellow-400 font-medium">Note:</span> If you are compiling your project with modern bundlers (e.g. Vite, Webpack, rollup), prefer installing via <code className="text-white/70 bg-white/[0.06] px-1 py-0.5 rounded font-mono">npm install reicon</code> to enjoy full tree-shaking, static typing, and faster loading speeds.
      </div>
    </section>
  );
}
