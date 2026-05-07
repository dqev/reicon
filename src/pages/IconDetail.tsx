import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import iconNamesData from '../../scripts/icon-names.json';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function IconDetail() {
  const { name } = useParams<{ name: string }>();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeWeight, setActiveWeight] = useState<'outline' | 'filled'>('outline');
  const [previewSize, setPreviewSize] = useState(64);
  const [toast, setToast] = useState<string | null>(null);
  const [exportSize, setExportSize] = useState(24);

  const pascalName = name
    ? name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')
    : '';

  const copyToClipboard = async (text: string, field: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedField(field);
      setToast('Copied to clipboard');
      setTimeout(() => setCopiedField(null), 2000);
      setTimeout(() => setToast(null), 2500);
    } catch {
      setToast('Copy failed');
      setTimeout(() => setToast(null), 2500);
    }
  };

  const getSvgString = async (iconName: string, weight: string, size: number = exportSize): Promise<string> => {
    const el = document.createElement('re-icon') as HTMLElement & { icon: string; weight: string; size: number };
    el.setAttribute('icon', iconName);
    el.setAttribute('weight', weight);
    el.setAttribute('size', String(size));
    el.style.position = 'absolute';
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    document.body.appendChild(el);

    // Wait for the web component to render (retry up to 1s)
    let svg: SVGElement | null = null;
    for (let i = 0; i < 10; i++) {
      await new Promise((r) => setTimeout(r, 100));
      svg = el.querySelector('svg') || el.shadowRoot?.querySelector('svg') || null;
      if (svg) break;
    }

    // Also try to find SVG from an existing rendered icon on the page as fallback
    if (!svg) {
      const existing = document.querySelector(`re-icon[icon="${iconName}"]`);
      if (existing) {
        svg = existing.querySelector('svg') || existing.shadowRoot?.querySelector('svg') || null;
      }
    }

    let svgStr = '';
    if (svg) {
      const clone = svg.cloneNode(true) as SVGElement;
      clone.setAttribute('width', String(size));
      clone.setAttribute('height', String(size));
      svgStr = clone.outerHTML;
    }

    document.body.removeChild(el);
    return svgStr;
  };

  const copySvg = async (iconName: string, weight: string) => {
    try {
      const svgStr = await getSvgString(iconName, weight);
      if (!svgStr) { setToast('SVG not found'); setTimeout(() => setToast(null), 2500); return; }
      await navigator.clipboard.writeText(svgStr);
      setCopiedField('svg');
      setToast('SVG copied to clipboard');
      setTimeout(() => setCopiedField(null), 2000);
      setTimeout(() => setToast(null), 2500);
    } catch {
      setToast('Copy failed');
      setTimeout(() => setToast(null), 2500);
    }
  };

  const downloadSvg = async (iconName: string, weight: string) => {
    const svgStr = await getSvgString(iconName, weight);
    if (!svgStr) { setToast('SVG not found'); setTimeout(() => setToast(null), 2500); return; }
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${iconName}-${weight}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsRaster = async (iconName: string, weight: string, size: number, format: 'png' | 'webp') => {
    const svgStr = await getSvgString(iconName, weight);
    if (!svgStr) { setToast('SVG not found'); setTimeout(() => setToast(null), 2500); return; }
    const scale = 2;
    const canvas = document.createElement('canvas');
    canvas.width = size * scale;
    canvas.height = size * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    const svgBlob = new Blob([svgStr], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, size * scale, size * scale);
        resolve();
      };
      img.onerror = reject;
      img.src = svgUrl;
    });
    URL.revokeObjectURL(svgUrl);
    const mime = format === 'png' ? 'image/png' : 'image/webp';
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${iconName}-${weight}-${size * scale}x${size * scale}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    }, mime, 1);
  };

  const downloadAsPng = (iconName: string, weight: string) => downloadAsRaster(iconName, weight, exportSize, 'png');
  const downloadAsWebp = (iconName: string, weight: string) => downloadAsRaster(iconName, weight, exportSize, 'webp');

  const reactImportRaw = `import { ${pascalName} } from 'reicon-react';\n\n<${pascalName} size={24} ${activeWeight === 'filled' ? 'weight="Filled" ' : ''}/>`;
  const directImportRaw = `import ${pascalName} from 'reicon-react/icons/${pascalName}';`;
  const htmlCdnRaw = `<script src="https://cdn.reicon.dev/cdn/reicon.min.js"><\/script>\n<re-icon icon="${name}"${activeWeight === 'filled' ? ' weight="filled"' : ''}></re-icon>`;

  const pageTitle = `${pascalName} Icon — Reicon | Free SVG Icon`;
  const pageDesc = `Download the ${pascalName} icon from Reicon. Available in Outline and Filled weights. Free, open-source SVG icon for React, Figma, and the web.`;
  const pageUrl = `https://reicon.dev/icon/${name}`;
  const ogImage = `https://cdn.reicon.dev/og/icons/${name}.png`;

  const relatedIcons = useMemo(() => {
    if (!name) return [];
    const allNames = Object.keys(iconNamesData) as string[];
    const prefix = name.replace(/-?\d+$/, '').replace(/-[^-]+$/, '');
    const related = allNames.filter(
      (n) => n !== name && (n.startsWith(prefix + '-') || n.startsWith(prefix) || name.startsWith(n.replace(/-?\d+$/, '')))
    );
    const shuffled = related.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 12);
  }, [name]);

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "name": `${pascalName} Icon`,
          "description": pageDesc,
          "contentUrl": `https://cdn.reicon.dev/svg/${name}.svg`,
          "thumbnailUrl": ogImage,
          "encodingFormat": "image/svg+xml",
          "license": "https://opensource.org/licenses/MIT",
          "acquireLicensePage": "https://reicon.dev/usage",
          "isPartOf": {
            "@type": "CreativeWork",
            "name": "Reicon Icon Library",
            "url": "https://reicon.dev"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Icons", "item": "https://reicon.dev/icons" },
            { "@type": "ListItem", "position": 2, "name": `${pascalName} Icon`, "item": pageUrl }
          ]
        })}</script>
      </Helmet>
      <Header />

      <main className="flex-1 pt-14 px-4 md:px-8 py-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-6">
          <Link to="/icons" className="hover:text-white/60 transition-colors">Icons</Link>
          <span className="text-white/20">/</span>
          <span className="text-white/70">{pascalName}</span>
        </nav>

        <h1 className="sr-only">{pascalName} Icon — Reicon</h1>

        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {/* Preview card */}
          <div className="flex flex-col items-center gap-5">
            <div className="w-full aspect-square bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center">
              <re-icon
                icon={name}
                weight={activeWeight}
                size={previewSize}
                color="white"
                aria-label={`${pascalName} icon preview`}
              />
            </div>

            {/* Weight toggle */}
            <div className="flex w-full bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setActiveWeight('outline')}
                className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${activeWeight === 'outline'
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/60'
                  }`}
              >
                Outline
              </button>
              <button
                onClick={() => setActiveWeight('filled')}
                className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${activeWeight === 'filled'
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/60'
                  }`}
              >
                Filled
              </button>
            </div>

            {/* Size slider */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-white/40">Size</span>
                <span className="text-[12px] text-white/60 font-mono">{previewSize}px</span>
              </div>
              <input
                type="range"
                min={16}
                max={128}
                value={previewSize}
                onChange={(e) => setPreviewSize(Number(e.target.value))}
                className="w-full accent-[#6C5CE7]"
              />
            </div>

            {/* Quick copy buttons */}
            <div className="flex gap-2 w-full">
              <button
                onClick={() => copyToClipboard(`<${pascalName} />`, 'jsx')}
                className={`flex-1 text-[12px] font-medium py-2 rounded-lg border transition-colors ${copiedField === 'jsx'
                  ? 'bg-[#6C5CE7]/20 border-[#6C5CE7]/40 text-[#6C5CE7]'
                  : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10'
                  }`}
              >
                {copiedField === 'jsx' ? 'Copied!' : 'Copy JSX'}
              </button>
              <button
                onClick={() => copyToClipboard(name || '', 'name')}
                className={`flex-1 text-[12px] font-medium py-2 rounded-lg border transition-colors ${copiedField === 'name'
                  ? 'bg-[#6C5CE7]/20 border-[#6C5CE7]/40 text-[#6C5CE7]'
                  : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10'
                  }`}
              >
                {copiedField === 'name' ? 'Copied!' : 'Copy Name'}
              </button>
            </div>

            {/* Export size selector */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-white/30 uppercase tracking-wider font-medium">Export Size</span>
                <span className="text-[12px] text-white/50 font-mono">{exportSize}px</span>
              </div>
              <div className="flex gap-1.5">
                {[16, 24, 32, 48, 64, 128, 256, 512].map((s) => (
                  <button
                    key={s}
                    onClick={() => setExportSize(s)}
                    className={`flex-1 text-[11px] font-medium py-1.5 rounded-lg border transition-colors ${exportSize === s
                      ? 'bg-[#6C5CE7]/15 border-[#6C5CE7]/30 text-[#6C5CE7]'
                      : 'bg-white/[0.03] border-white/[0.06] text-white/35 hover:text-white/60 hover:bg-white/[0.06]'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Copy SVG */}
            <button
              onClick={() => copySvg(name || '', activeWeight)}
              className={`w-full text-[12px] font-medium py-2.5 rounded-lg border transition-colors flex items-center justify-center gap-1.5 ${copiedField === 'svg'
                ? 'bg-[#6C5CE7]/20 border-[#6C5CE7]/40 text-[#6C5CE7]'
                : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10'
                }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              {copiedField === 'svg' ? 'SVG Copied!' : 'Copy SVG'}
            </button>

            {/* Download buttons */}
            <div className="w-full">
              <p className="text-[11px] text-white/30 uppercase tracking-wider font-medium mb-2">Download</p>
              <div className="flex gap-2">
                <button
                  onClick={() => downloadSvg(name || '', activeWeight)}
                  className="flex-1 text-[12px] font-medium py-2 rounded-lg border bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  SVG
                </button>
                <button
                  onClick={() => downloadAsPng(name || '', activeWeight)}
                  className="flex-1 text-[12px] font-medium py-2 rounded-lg border bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  PNG
                </button>
                <button
                  onClick={() => downloadAsWebp(name || '', activeWeight)}
                  className="flex-1 text-[12px] font-medium py-2 rounded-lg border bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  WebP
                </button>
              </div>
            </div>
          </div>

          {/* Code blocks & props */}
          <div className="flex flex-col gap-5 min-w-0">
            {/* React */}
            <SyntaxBlock
              title="React"
              onCopy={() => copyToClipboard(reactImportRaw, 'react')}
              copied={copiedField === 'react'}
            >
              <span className="text-[#c678dd]">import</span>
              <span className="text-white/70">{' { '}</span>
              <span className="text-[#e5c07b]">{pascalName}</span>
              <span className="text-white/70">{' } '}</span>
              <span className="text-[#c678dd]">from</span>
              <span className="text-[#98c379]"> 'reicon-react'</span>
              <span className="text-white/30">;</span>
              {'\n\n'}
              <span className="text-white/70">{'<'}</span>
              <span className="text-[#e06c75]">{pascalName}</span>
              <span className="text-[#d19a66]"> size</span>
              <span className="text-white/50">=</span>
              <span className="text-white/70">{'{'}24{'}'}</span>
              {activeWeight === 'filled' && (
                <>
                  <span className="text-[#d19a66]"> weight</span>
                  <span className="text-white/50">=</span>
                  <span className="text-[#98c379]">"Filled"</span>
                </>
              )}
              <span className="text-white/70"> /{'>'}</span>
            </SyntaxBlock>

            {/* Direct Import */}
            <SyntaxBlock
              title="Direct Import"
              onCopy={() => copyToClipboard(directImportRaw, 'direct')}
              copied={copiedField === 'direct'}
            >
              <span className="text-[#c678dd]">import</span>
              <span className="text-[#e5c07b]"> {pascalName}</span>
              <span className="text-[#c678dd]"> from</span>
              <span className="text-[#98c379]"> 'reicon-react/icons/{pascalName}'</span>
              <span className="text-white/30">;</span>
            </SyntaxBlock>

            {/* CDN */}
            <SyntaxBlock
              title="HTML / CDN"
              onCopy={() => copyToClipboard(htmlCdnRaw, 'cdn')}
              copied={copiedField === 'cdn'}
            >
              <span className="text-white/70">{'<'}</span>
              <span className="text-[#e06c75]">script</span>
              <span className="text-[#d19a66]"> src</span>
              <span className="text-white/50">=</span>
              <span className="text-[#98c379]">"https://cdn.reicon.dev/cdn/reicon.min.js"</span>
              <span className="text-white/70">{'></'}</span>
              <span className="text-[#e06c75]">script</span>
              <span className="text-white/70">{'>'}</span>
              {'\n'}
              <span className="text-white/70">{'<'}</span>
              <span className="text-[#e06c75]">re-icon</span>
              <span className="text-[#d19a66]"> icon</span>
              <span className="text-white/50">=</span>
              <span className="text-[#98c379]">"{name}"</span>
              {activeWeight === 'filled' && (
                <>
                  <span className="text-[#d19a66]"> weight</span>
                  <span className="text-white/50">=</span>
                  <span className="text-[#98c379]">"filled"</span>
                </>
              )}
              <span className="text-white/70">{'></'}</span>
              <span className="text-[#e06c75]">re-icon</span>
              <span className="text-white/70">{'>'}</span>
            </SyntaxBlock>

            {/* Props table */}
            <div>
              <h3 className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-3">Props</h3>
              <div className="bg-[#0e0e10] border border-white/[0.06] rounded-xl overflow-hidden text-sm">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left px-4 py-2.5 text-white/40 font-medium text-[11px] uppercase tracking-wider">Prop</th>
                      <th className="text-left px-4 py-2.5 text-white/40 font-medium text-[11px] uppercase tracking-wider">Type</th>
                      <th className="text-left px-4 py-2.5 text-white/40 font-medium text-[11px] uppercase tracking-wider">Default</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/[0.04]">
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#e06c75]">size</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#e5c07b]">number</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#d19a66]">24</td>
                    </tr>
                    <tr className="border-b border-white/[0.04]">
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#e06c75]">color</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#e5c07b]">string</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#98c379]">currentColor</td>
                    </tr>
                    <tr className="border-b border-white/[0.04]">
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#e06c75]">weight</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#e5c07b]">string</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#98c379]">Outline</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#e06c75]">className</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#e5c07b]">string</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-white/30">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SEE IN ACTION ═══ */}
        <section className="mt-16 mb-8">
          <div className="border-t border-white/[0.06] pt-12 mb-10">
            <h2 className="text-center font-serif text-[clamp(20px,2.4vw,28px)] text-white font-semibold">See this icon in action</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1 — Button */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4">
              <div className="h-2.5 w-3/4 bg-white/[0.06] rounded-full" />
              <div className="h-2 w-1/2 bg-white/[0.04] rounded-full" />
              <div className="flex items-center gap-2 mt-auto pt-4">
                <button className="flex items-center gap-2 bg-[#6C5CE7] text-white text-[13px] font-medium px-4 py-2 rounded-lg">
                  <re-icon icon={name} size={16} color="white" />
                  Action
                </button>
                <button className="text-white/40 text-[13px] px-3 py-2">Cancel</button>
              </div>
            </div>

            {/* Card 2 — Input field */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4">
              <div className="h-2.5 w-1/3 bg-[#6C5CE7]/30 rounded-full" />
              <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5">
                <re-icon icon={name} size={18} color="rgba(255,255,255,0.35)" />
                <span className="text-white/25 text-[13px]">Enter a value...</span>
              </div>
              <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5">
                <re-icon icon={name} size={18} color="rgba(255,255,255,0.35)" />
                <span className="text-white/50 text-[13px]">With content</span>
              </div>
            </div>

            {/* Card 3 — Tags / badges */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4">
              <div className="h-2.5 w-full bg-white/[0.06] rounded-full" />
              <div className="h-2 w-3/4 bg-white/[0.04] rounded-full" />
              <div className="flex flex-col items-end gap-2 mt-auto pt-2">
                <span className="inline-flex items-center gap-1.5 bg-red-500/15 text-red-400 text-[12px] font-medium px-2.5 py-1 rounded-md">
                  <re-icon icon={name} size={14} color="currentColor" />
                  Critical
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#6C5CE7]/15 text-[#6C5CE7] text-[12px] font-medium px-2.5 py-1 rounded-md">
                  <re-icon icon={name} size={14} color="currentColor" />
                  Feature
                </span>
              </div>
            </div>

            {/* Card 4 — List items */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-3">
              {['Documents', 'Projects', 'Settings'].map((item) => (
                <div key={item} className="flex items-center justify-between bg-white/[0.04] rounded-lg px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <re-icon icon={name} size={16} color="rgba(255,255,255,0.5)" />
                    <span className="text-white/70 text-[13px]">{item}</span>
                  </div>
                  <re-icon icon="alt-arrow-right" size={14} color="rgba(255,255,255,0.2)" />
                </div>
              ))}
            </div>

            {/* Card 5 — Social / metrics */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="h-2.5 w-full bg-white/[0.06] rounded-full" />
                <div className="h-2 w-5/6 bg-white/[0.04] rounded-full" />
                <div className="h-2 w-2/3 bg-white/[0.04] rounded-full" />
              </div>
              <div className="flex items-center gap-5 mt-6 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-white/40 text-[13px]">
                  <re-icon icon={name} size={16} color="currentColor" />
                  112
                </div>
                <div className="flex items-center gap-1.5 text-white/40 text-[13px]">
                  <re-icon icon="chat-round" size={16} color="currentColor" />
                  8
                </div>
                <div className="flex items-center gap-1.5 text-white/40 text-[13px]">
                  <re-icon icon="share" size={16} color="currentColor" />
                  3
                </div>
              </div>
            </div>

            {/* Card 6 — Toolbar */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="h-2.5 w-full bg-white/[0.06] rounded-full" />
                <div className="h-2 w-4/5 bg-white/[0.04] rounded-full" />
              </div>
              <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-white/[0.06]">
                {[name, 'copy', 'clipboard', 'trash-bin-2'].filter(Boolean).map((ic, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${i === 0
                      ? 'bg-[#6C5CE7]/20 text-[#6C5CE7]'
                      : 'bg-white/[0.06] text-white/40'
                      }`}
                  >
                    <re-icon icon={ic!} size={18} color="currentColor" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4">
          <div className="bg-[#1a1a1a] border border-white/[0.08] text-white/80 text-[13px] px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 whitespace-nowrap">
            <svg className="w-3.5 h-3.5 text-[#6C5CE7] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {toast}
          </div>
        </div>
      )}

      {/* ═══ RELATED ICONS ═══ */}
      {relatedIcons.length > 0 && (
        <section className="max-w-5xl mx-auto w-full px-4 md:px-8 pb-12">
          <h2 className="text-lg font-serif text-white font-semibold mb-4">Related Icons</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1.5">
            {relatedIcons.map((iconName) => (
              <Link
                key={iconName}
                to={`/icon/${iconName}`}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group"
                title={`${(iconNamesData as Record<string, string>)[iconName] || iconName} icon`}
              >
                <re-icon icon={iconName} size={24} color="rgba(255,255,255,0.6)" aria-label={`${iconName} icon`} />
                <span className="text-[10px] text-white/30 group-hover:text-white/50 truncate w-full text-center transition-colors">{iconName}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

function SyntaxBlock({
  title,
  onCopy,
  copied,
  children,
}: {
  title: string;
  onCopy: () => void;
  copied: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0e0e10] border border-white/[0.06] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">{title}</span>
        <button
          onClick={onCopy}
          className="text-[11px] text-white/30 hover:text-white/60 transition-colors flex items-center gap-1"
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-[13px] font-mono leading-[1.7] overflow-x-auto whitespace-pre-wrap break-all">
        {children}
      </pre>
    </div>
  );
}
