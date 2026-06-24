import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import iconNamesData from '../../scripts/icon-names.json';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TypeTable from '../components/usage/TypeTable';
import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';

const EXPORT_SIZES = [16, 24, 32, 48, 64, 128, 256, 512];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function IconDetail() {
  const { name } = useParams<{ name: string }>();
  const [searchParams] = useSearchParams();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeWeight, setActiveWeight] = useState<'outline' | 'filled'>(
    searchParams.get('weight') === 'filled' ? 'filled' : 'outline'
  );
  const [previewSize, setPreviewSize] = useState(96);
  const [toast, setToast] = useState<string | null>(null);
  const [exportSize, setExportSize] = useState(64);
  const [codeTab, setCodeTab] = useState<'vanilla' | 'cdn' | 'react' | 'vue' | 'direct'>('vanilla');
  const [iconCategory, setIconCategory] = useState('');

  const pascalName = name
    ? name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')
    : '';

  // ── clipboard / export helpers ──────────────────────────────────────────
  const flashToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

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
      flashToast('Copied to clipboard');
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      flashToast('Copy failed');
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

    let svg: SVGElement | null = null;
    for (let i = 0; i < 10; i++) {
      await new Promise((r) => setTimeout(r, 100));
      svg = el.querySelector('svg') || el.shadowRoot?.querySelector('svg') || null;
      if (svg) break;
    }
    if (!svg) {
      const existing = document.querySelector(`re-icon[icon="${iconName}"]`);
      if (existing) svg = existing.querySelector('svg') || existing.shadowRoot?.querySelector('svg') || null;
    }

    let svgStr = '';
    if (svg) {
      const clone = svg.cloneNode(true) as SVGElement;
      clone.setAttribute('width', String(size));
      clone.setAttribute('height', String(size));
      svgStr = clone.outerHTML
        .replace(/var\(--ri-primary[^)]*\)/g, 'currentColor')
        .replace(/var\(--ri-secondary[^)]*\)/g, 'currentColor');
    }

    document.body.removeChild(el);
    return svgStr;
  };

  const copySvg = async (iconName: string, weight: string) => {
    try {
      const svgStr = await getSvgString(iconName, weight);
      if (!svgStr) { flashToast('SVG not found'); return; }
      await navigator.clipboard.writeText(svgStr);
      setCopiedField('svg');
      flashToast('SVG copied to clipboard');
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      flashToast('Copy failed');
    }
  };

  const downloadSvg = async (iconName: string, weight: string) => {
    const svgStr = await getSvgString(iconName, weight);
    if (!svgStr) { flashToast('SVG not found'); return; }
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${iconName}-${weight}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsRaster = async (iconName: string, weight: string, size: number, format: 'png' | 'webp') => {
    const svgStr = await getSvgString(iconName, weight, size);
    if (!svgStr) { flashToast('SVG not found'); return; }
    const scale = 2;
    const canvas = document.createElement('canvas');
    canvas.width = size * scale;
    canvas.height = size * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // currentColor renders black on canvas — paint white so it's visible on any bg
    const colored = svgStr.replace(/currentColor/g, '#ffffff');
    const img = new Image();
    const svgBlob = new Blob([colored], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
    await new Promise<void>((resolve, reject) => {
      img.onload = () => { ctx.drawImage(img, 0, 0, size * scale, size * scale); resolve(); };
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

  const reset = () => { setActiveWeight('outline'); setPreviewSize(96); };

  // ── raw code strings ──────────────────────────────────────────────────────
  const fw = activeWeight === 'filled';
  const vanillaRaw = `import { ${pascalName} } from 'reicon';\n\nconst icon = ${pascalName}({ size: 24${fw ? ", weight: 'Filled'" : ''} });\ndocument.body.appendChild(icon);`;
  const cdnRaw = `<script src="https://unpkg.com/reicon@latest/cdn/reicon.min.js"><\/script>\n<re-icon icon="${name}"${fw ? ' weight="filled"' : ''}></re-icon>`;
  const reactRaw = `import { ${pascalName} } from 'reicon-react';\n\n<${pascalName} size={24}${fw ? ' weight="Filled"' : ''} />`;
  const vueRaw = `import { ${pascalName} } from 'reicon-vue';\n\n<${pascalName} :size="24"${fw ? ' weight="Filled"' : ''} />`;
  const directRaw = `import ${pascalName} from 'reicon-react/icons/${pascalName}';`;

  const CODE_TABS = [
    { id: 'vanilla' as const, label: 'Vanilla JS', icon: <IoLogoJavascript className="text-yellow-400" size={14} />, raw: vanillaRaw },
    { id: 'cdn' as const, label: 'CDN', icon: <IoLogoJavascript className="text-yellow-400" size={14} />, raw: cdnRaw },
    { id: 'react' as const, label: 'React', icon: <FaReact className="text-[#61DAFB]" size={14} />, raw: reactRaw },
    { id: 'vue' as const, label: 'Vue', icon: <VueLogo />, raw: vueRaw },
    { id: 'direct' as const, label: 'Direct', icon: <FaReact className="text-[#61DAFB]" size={14} />, raw: directRaw },
  ];
  const activeTab = CODE_TABS.find((t) => t.id === codeTab)!;

  // ── effects ──────────────────────────────────────────────────────────────
  useEffect(() => {
    setActiveWeight(searchParams.get('weight') === 'filled' ? 'filled' : 'outline');
  }, [name, searchParams]);

  useEffect(() => {
    if (!name) return;
    function loadCategory() {
      if (window.Reicon?.categoryOf) {
        const cat = window.Reicon.categoryOf(name!);
        if (cat) setIconCategory(cat.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
      } else {
        setTimeout(loadCategory, 100);
      }
    }
    loadCategory();
  }, [name]);

  const pageTitle = `${name} icon — Reicon`;
  const pageDesc = `Download the ${name} icon as SVG, PNG, or WebP. Available in Outline and Filled weights. Free, open-source, MIT-licensed. Copy React, Vue, or CDN code instantly.`;
  const pageUrl = `https://reicon.dev/icon/${name}`;
  const ogImage = `https://reicon.dev/og/icons/${name}.png`;

  const relatedIcons = useMemo(() => {
    if (!name) return [];
    const allNames = Object.keys(iconNamesData) as string[];
    const prefix = name.replace(/-?\d+$/, '').replace(/-[^-]+$/, '');
    const related = allNames.filter(
      (n) => n !== name && (n.startsWith(prefix + '-') || n.startsWith(prefix) || name.startsWith(n.replace(/-?\d+$/, '')))
    );
    return related.sort(() => 0.5 - Math.random()).slice(0, 14);
  }, [name]);

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        <meta name="keywords" content={`${name}, ${iconCategory || 'icon'}, svg icon, react icon, vue icon, free icon, reicon`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "ImageObject",
          "name": `${pascalName} Icon`, "description": pageDesc,
          "contentUrl": `https://cdn.reicon.dev/svg/${name}.svg`, "thumbnailUrl": ogImage,
          "encodingFormat": "image/svg+xml", "license": "https://opensource.org/licenses/MIT",
          "acquireLicensePage": "https://reicon.dev/usage",
          ...(iconCategory && { "category": iconCategory }),
          "isPartOf": { "@type": "CreativeWork", "name": "Reicon Icon Library", "url": "https://reicon.dev" }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "Icons", "item": "https://reicon.dev/icons" },
            { "@type": "ListItem", "position": 3, "name": `${name}`, "item": pageUrl }
          ]
        })}</script>
      </Helmet>

      <Header />

      <main className="flex-1 pt-14 w-full overflow-x-hidden">
        <div className="max-w-[1160px] mx-auto px-5 md:px-10 py-8 md:py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-white/40 mb-6">
            <Link to="/" className="hover:text-white/70 transition-colors">Reicon</Link>
            <span className="text-white/20">/</span>
            <Link to="/icons" className="hover:text-white/70 transition-colors">Icons</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/70">{pascalName}</span>
          </nav>

          <h1 className="sr-only">{pascalName} icon — Reicon</h1>

          {/* ═══ STUDIO ═══ */}
          <div className="grid lg:grid-cols-[380px_minmax(0,1fr)] gap-5 lg:gap-7">

            {/* Left — preview canvas + customizer (sticky) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="lg:sticky lg:top-20 lg:self-start flex flex-col gap-4"
            >
              {/* Keyline design canvas */}
              <div className="relative w-full aspect-square bg-[#0a0a0c] border border-white/[0.06] rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
                  backgroundSize: 'calc(100%/12) calc(100%/12)',
                  maskImage: 'radial-gradient(circle at center, #000 60%, transparent 92%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, #000 60%, transparent 92%)',
                }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(108,92,231,0.12), transparent 58%)' }} />
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" fill="none">
                  <rect x="9" y="9" width="82" height="82" rx="7" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" strokeDasharray="2.5 2.5" />
                  <rect x="20" y="20" width="60" height="60" rx="7" stroke="#6C5CE7" strokeOpacity="0.22" strokeWidth="0.4" />
                  <circle cx="50" cy="50" r="35" stroke="#6C5CE7" strokeOpacity="0.22" strokeWidth="0.4" />
                  <line x1="50" y1="6" x2="50" y2="94" stroke="#6C5CE7" strokeOpacity="0.25" strokeWidth="0.3" />
                  <line x1="6" y1="50" x2="94" y2="50" stroke="#6C5CE7" strokeOpacity="0.25" strokeWidth="0.3" />
                </svg>
                <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#6C5CE7]/35" />
                <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#6C5CE7]/35" />
                <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#6C5CE7]/35" />
                <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#6C5CE7]/35" />
                <span className="absolute top-2.5 left-1/2 -translate-x-1/2 text-[7.5px] font-mono text-[#6C5CE7]/45 select-none tracking-wider">24<span className="text-white/20"> × </span>24</span>
                <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-white/30 tabular-nums select-none">{previewSize}px</span>
                <span className="absolute bottom-2.5 left-3 text-[8px] font-mono text-white/25 select-none lowercase">{activeWeight}</span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeWeight}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="flex items-center justify-center"
                  >
                    <re-icon icon={name} weight={activeWeight} size={previewSize} color="#ffffff" aria-label={`${pascalName} icon preview`} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Name + meta */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-[18px] font-serif font-semibold text-white truncate">{pascalName}</h2>
                  {iconCategory && <p className="text-[12px] text-white/40 mt-0.5">{iconCategory}</p>}
                </div>
                <code className="shrink-0 text-[11px] text-white/40 bg-white/[0.04] border border-white/[0.06] rounded-md px-2 py-1 font-mono">{name}</code>
              </div>

              {/* Customizer */}
              <div className="bg-[#0e0e10] border border-white/[0.06] rounded-2xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.08em] text-white/35 font-semibold">Customize</span>
                  <button onClick={reset} title="Reset" aria-label="Reset" className="w-7 h-7 flex items-center justify-center rounded-md text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.5 2.8L3 8" /><path d="M3 3v5h5" /></svg>
                  </button>
                </div>

                <div>
                  <label className="text-[12px] text-white/50 mb-2 block">Weight</label>
                  <div className="flex gap-2">
                    {(['outline', 'filled'] as const).map((w) => (
                      <button key={w} onClick={() => setActiveWeight(w)}
                        className={`flex-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${activeWeight === w ? 'bg-[#6C5CE7]/15 text-[#6C5CE7] border border-[#6C5CE7]/30' : 'bg-white/5 text-white/40 border border-white/10 hover:text-white/60'}`}>
                        {w.charAt(0).toUpperCase() + w.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-[12px] text-white/50">Size</label>
                    <span className="text-[12px] text-white/40 font-mono">{previewSize}px</span>
                  </div>
                  <input type="range" min={16} max={128} value={previewSize} onChange={(e) => setPreviewSize(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none bg-white/10 accent-[#6C5CE7] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6C5CE7] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(108,92,231,0.5)]" />
                </div>
              </div>
            </motion.div>

            {/* Right — actions, code, props */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
              className="flex flex-col gap-5 min-w-0"
            >
              {/* Quick actions */}
              <div className="bg-[#0e0e10] border border-white/[0.06] rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {([['Copy JSX', () => copyToClipboard(`<${pascalName} />`, 'jsx'), 'jsx'],
                  ['Copy Name', () => copyToClipboard(name || '', 'name'), 'name'],
                  ['Copy SVG', () => copySvg(name || '', activeWeight), 'svg']] as const).map(([label, fn, field]) => (
                    <motion.button key={field} onClick={fn} whileTap={{ scale: 0.96 }}
                      className={`flex-1 min-w-[120px] text-[12.5px] font-medium py-2.5 rounded-lg border transition-colors ${copiedField === field ? 'bg-[#6C5CE7]/20 border-[#6C5CE7]/40 text-[#6C5CE7]' : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'}`}>
                      {copiedField === field ? 'Copied!' : label}
                    </motion.button>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-white/30 uppercase tracking-wider font-medium">Export size</span>
                    <span className="text-[12px] text-white/50 font-mono">{exportSize}px</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {EXPORT_SIZES.map((s) => (
                      <button key={s} onClick={() => setExportSize(s)}
                        className={`flex-1 min-w-[42px] text-[11px] font-medium py-1.5 rounded-lg border transition-colors ${exportSize === s ? 'bg-[#6C5CE7]/15 border-[#6C5CE7]/30 text-[#6C5CE7]' : 'bg-white/[0.03] border-white/[0.06] text-white/35 hover:text-white/60 hover:bg-white/[0.06]'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {([['SVG', downloadSvg], ['PNG', downloadAsPng], ['WebP', downloadAsWebp]] as const).map(([label, fn]) => (
                    <motion.button key={label} onClick={() => fn(name || '', activeWeight)} whileTap={{ scale: 0.96 }}
                      className="flex-1 text-[12.5px] font-medium py-2.5 rounded-lg border bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                      {label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Code tabs */}
              <figure className="relative overflow-hidden rounded-xl bg-[#0e0e10] border border-white/[0.06] text-sm">
                <div className="flex items-center justify-between w-full h-11 pl-3 pr-1.5 border-b border-white/[0.06]">
                  <div className="flex items-center h-full gap-1">
                    {CODE_TABS.map((tab) => {
                      const isActive = codeTab === tab.id;
                      return (
                        <button key={tab.id} onClick={() => setCodeTab(tab.id)}
                          className={`relative flex items-center gap-1.5 h-full px-2.5 text-[13px] font-medium transition-colors ${isActive ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
                          <span className={isActive ? '' : 'opacity-50'}>{tab.icon}</span>
                          {tab.label}
                          {isActive && <motion.span layoutId="code-tab-underline" className="absolute bottom-0 left-2 right-2 h-[2px] rounded-t-full bg-[#6C5CE7]" style={{ boxShadow: '0 0 8px rgba(108,92,231,0.45)' }} />}
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => copyToClipboard(activeTab.raw, `code-${codeTab}`)} aria-label="Copy code"
                    className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors">
                    {copiedField === `code-${codeTab}` ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    )}
                  </button>
                </div>
                <div className="px-1.5 py-1.5">
                  <div className="bg-[#09090b] rounded-md min-h-[92px]">
                    <AnimatePresence mode="wait">
                      <motion.pre
                        key={codeTab}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: EASE }}
                        className="p-4 text-[13px] font-mono leading-[1.7] overflow-x-auto whitespace-pre-wrap break-all focus-visible:outline-none"
                      >
                        {codeTab === 'vanilla' && <VanillaSnippet pascalName={pascalName} filled={fw} />}
                        {codeTab === 'cdn' && <CdnSnippet name={name || ''} filled={fw} />}
                        {codeTab === 'react' && <ReactSnippet pascalName={pascalName} filled={fw} />}
                        {codeTab === 'vue' && <VueSnippet pascalName={pascalName} filled={fw} />}
                        {codeTab === 'direct' && <DirectSnippet pascalName={pascalName} />}
                      </motion.pre>
                    </AnimatePresence>
                  </div>
                </div>
              </figure>

              {/* Props */}
              <div>
                <h3 className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-3">Props</h3>
                <TypeTable rows={[
                  { prop: 'size', type: 'number | string', default: '24', description: 'Icon size in pixels' },
                  { prop: 'color', type: 'string', default: 'currentColor', description: 'Any valid CSS color' },
                  { prop: 'weight', type: '"Outline" | "Filled"', default: 'Outline', description: 'Icon weight' },
                  { prop: 'className?', type: 'string', default: null, description: 'Extra CSS classes' },
                ]} />
              </div>
            </motion.div>
          </div>

          {/* ═══ MOCKUPS ═══ */}
          <section className="mt-16">
            <div className="border-t border-white/[0.06] pt-12 mb-8 text-center">
              <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">In context</div>
              <h2 className="font-serif text-[clamp(20px,2.6vw,30px)] text-white font-semibold">See the {pascalName} icon in real UI</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Mockup i={0}><AppNavMockup name={name} pascalName={pascalName} weight={activeWeight} /></Mockup>
              <Mockup i={1}><ButtonsMockup name={name} weight={activeWeight} /></Mockup>
              <Mockup i={2}><StatMockup name={name} weight={activeWeight} /></Mockup>
              <Mockup i={3}><ToastMockup name={name} weight={activeWeight} /></Mockup>
              <Mockup i={4}><InputMockup name={name} weight={activeWeight} /></Mockup>
              <Mockup i={5}><MobileBarMockup name={name} weight={activeWeight} /></Mockup>
            </div>
          </section>
        </div>

        {/* ═══ RELATED ICONS ═══ */}
        {relatedIcons.length > 0 && (
          <section className="max-w-[1160px] mx-auto w-full px-5 md:px-10 pb-16">
            <h2 className="text-lg font-serif text-white font-semibold mb-4">Related icons</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1.5">
              {relatedIcons.map((iconName, i) => (
                <motion.div key={iconName}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.025, 0.3), ease: EASE }}
                >
                  <Link to={`/icon/${iconName}`}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-colors group"
                    title={`${(iconNamesData as Record<string, string>)[iconName] || iconName} icon`}>
                    <re-icon icon={iconName} size={24} color="rgba(255,255,255,0.6)" aria-label={`${iconName} icon`} />
                    <span className="text-[10px] text-white/30 group-hover:text-white/50 truncate w-full text-center transition-colors">{iconName}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4"
          >
            <div className="bg-[#1a1a1a] border border-white/[0.08] text-white/80 text-[13px] px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 whitespace-nowrap">
              <svg className="w-3.5 h-3.5 text-[#6C5CE7] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

/* ── Mockup wrapper with scroll-in animation + hover lift ─────────────────── */
function Mockup({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
      whileHover={{ y: -4 }}
      className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 min-h-[180px] flex flex-col"
    >
      {children}
    </motion.div>
  );
}

/* ── Individual mockups (use the real icon) ───────────────────────────────── */
function AppNavMockup({ name, pascalName, weight }: { name?: string; pascalName: string; weight: string }) {
  return (
    <div className="flex flex-col flex-1">
      <span className="text-[10px] uppercase tracking-wider text-white/25 font-semibold mb-3">Sidebar nav</span>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 bg-[#6C5CE7]/15 text-[#6C5CE7] rounded-lg px-3 py-2">
          <re-icon icon={name} weight={weight} size={16} color="currentColor" />
          <span className="text-[13px] font-medium">{pascalName}</span>
        </div>
        {['Overview', 'Activity'].map((l) => (
          <div key={l} className="flex items-center gap-2.5 text-white/40 rounded-lg px-3 py-2">
            <span className="w-4 h-4 rounded bg-white/[0.07]" />
            <span className="text-[13px]">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ButtonsMockup({ name, weight }: { name?: string; weight: string }) {
  return (
    <div className="flex flex-col flex-1">
      <span className="text-[10px] uppercase tracking-wider text-white/25 font-semibold mb-3">Buttons</span>
      <div className="flex flex-col gap-2.5 mt-auto">
        <button className="flex items-center justify-center gap-2 bg-[#6C5CE7] text-white text-[13px] font-medium px-4 py-2.5 rounded-lg">
          <re-icon icon={name} weight={weight} size={16} color="white" /> Primary action
        </button>
        <button className="flex items-center justify-center gap-2 bg-white/[0.06] text-white/70 text-[13px] font-medium px-4 py-2.5 rounded-lg border border-white/10">
          <re-icon icon={name} weight={weight} size={16} color="currentColor" /> Secondary
        </button>
      </div>
    </div>
  );
}

function StatMockup({ name, weight }: { name?: string; weight: string }) {
  return (
    <div className="flex flex-col flex-1">
      <span className="text-[10px] uppercase tracking-wider text-white/25 font-semibold mb-3">Metric card</span>
      <div className="flex items-start gap-3 mt-auto">
        <div className="w-11 h-11 rounded-xl bg-[#6C5CE7]/15 flex items-center justify-center shrink-0">
          <re-icon icon={name} weight={weight} size={20} color="#6C5CE7" />
        </div>
        <div>
          <div className="text-[22px] font-serif font-semibold text-white leading-tight">12,480</div>
          <div className="text-[12px] text-white/40">Total this month</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-[11px] text-green-400">
        <re-icon icon="alt-arrow-up" size={12} color="currentColor" /> 12.5% vs last month
      </div>
    </div>
  );
}

function ToastMockup({ name, weight }: { name?: string; weight: string }) {
  return (
    <div className="flex flex-col flex-1">
      <span className="text-[10px] uppercase tracking-wider text-white/25 font-semibold mb-3">Notification</span>
      <div className="mt-auto flex items-start gap-3 bg-[#1a1a1a] border border-white/[0.08] rounded-xl px-3.5 py-3 shadow-lg">
        <div className="w-8 h-8 rounded-lg bg-[#6C5CE7]/15 flex items-center justify-center shrink-0">
          <re-icon icon={name} weight={weight} size={16} color="#6C5CE7" />
        </div>
        <div className="min-w-0">
          <div className="text-[13px] font-medium text-white/90">All changes saved</div>
          <div className="text-[12px] text-white/40 truncate">Your workspace is up to date.</div>
        </div>
      </div>
    </div>
  );
}

function InputMockup({ name, weight }: { name?: string; weight: string }) {
  return (
    <div className="flex flex-col flex-1">
      <span className="text-[10px] uppercase tracking-wider text-white/25 font-semibold mb-3">Input field</span>
      <div className="flex flex-col gap-2.5 mt-auto">
        <div className="flex items-center gap-2.5 bg-white/[0.04] border border-[#6C5CE7]/40 rounded-lg px-3 py-2.5">
          <re-icon icon={name} weight={weight} size={18} color="rgba(255,255,255,0.5)" />
          <span className="text-white/70 text-[13px]">Focused field</span>
          <span className="ml-auto w-px h-4 bg-[#6C5CE7] animate-pulse" />
        </div>
        <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5">
          <re-icon icon={name} weight={weight} size={18} color="rgba(255,255,255,0.3)" />
          <span className="text-white/25 text-[13px]">Placeholder…</span>
        </div>
      </div>
    </div>
  );
}

function MobileBarMockup({ name, weight }: { name?: string; weight: string }) {
  return (
    <div className="flex flex-col flex-1">
      <span className="text-[10px] uppercase tracking-wider text-white/25 font-semibold mb-3">Bottom tab bar</span>
      <div className="mt-auto flex items-center justify-around bg-[#0e0e10] border border-white/[0.08] rounded-2xl px-2 py-3">
        <div className="flex flex-col items-center gap-1 text-[#6C5CE7]">
          <re-icon icon={name} weight={weight} size={20} color="currentColor" />
          <span className="w-1 h-1 rounded-full bg-[#6C5CE7]" />
        </div>
        {['home-2', 'magnifer', 'user'].map((ic) => (
          <div key={ic} className="text-white/30">
            <re-icon icon={ic} size={20} color="currentColor" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── code snippet + logo helpers ──────────────────────────────────────────── */
function VueLogo() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 122.88 106.42" fill="none">
      <polygon fill="#4DBA87" points="75.63,0 61.44,24.58 47.25,0 0,0 61.44,106.42 122.88,0 75.63,0" />
      <polygon fill="#425466" points="75.63,0 61.44,24.58 47.25,0 24.58,0 61.44,63.85 98.3,0 75.63,0" />
    </svg>
  );
}

function VanillaSnippet({ pascalName, filled }: { pascalName: string; filled: boolean }) {
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-white/70">{' { '}</span>
      <span className="text-[#e5c07b]">{pascalName}</span><span className="text-white/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon'</span><span className="text-white/30">;</span>
      {'\n\n'}
      <span className="text-[#c678dd]">const</span><span className="text-white/70"> icon = </span><span className="text-[#61afef]">{pascalName}</span><span className="text-white/70">({'{'} size: </span><span className="text-[#d19a66]">24</span>
      {filled && (<><span className="text-white/70">, weight: </span><span className="text-[#98c379]">'Filled'</span></>)}
      <span className="text-white/70"> {'}'});</span>
      {'\n'}
      <span className="text-white/70">document.body.</span><span className="text-[#61afef]">appendChild</span><span className="text-white/70">(icon);</span>
    </>
  );
}

function ReactSnippet({ pascalName, filled }: { pascalName: string; filled: boolean }) {
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-white/70">{' { '}</span>
      <span className="text-[#e5c07b]">{pascalName}</span><span className="text-white/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-react'</span><span className="text-white/30">;</span>
      {'\n\n'}
      <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">{pascalName}</span>
      <span className="text-[#d19a66]"> size</span><span className="text-white/50">=</span><span className="text-white/70">{'{'}24{'}'}</span>
      {filled && (<><span className="text-[#d19a66]"> weight</span><span className="text-white/50">=</span><span className="text-[#98c379]">"Filled"</span></>)}
      <span className="text-white/70"> /{'>'}</span>
    </>
  );
}

function VueSnippet({ pascalName, filled }: { pascalName: string; filled: boolean }) {
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-white/70">{' { '}</span>
      <span className="text-[#e5c07b]">{pascalName}</span><span className="text-white/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-vue'</span><span className="text-white/30">;</span>
      {'\n\n'}
      <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">{pascalName}</span>
      <span className="text-[#d19a66]"> :size</span><span className="text-white/50">=</span><span className="text-[#98c379]">"24"</span>
      {filled && (<><span className="text-[#d19a66]"> weight</span><span className="text-white/50">=</span><span className="text-[#98c379]">"Filled"</span></>)}
      <span className="text-white/70"> /{'>'}</span>
    </>
  );
}

function DirectSnippet({ pascalName }: { pascalName: string }) {
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-[#e5c07b]"> {pascalName}</span>
      <span className="text-[#c678dd]"> from</span><span className="text-[#98c379]"> 'reicon-react/icons/{pascalName}'</span><span className="text-white/30">;</span>
    </>
  );
}

function CdnSnippet({ name, filled }: { name: string; filled: boolean }) {
  return (
    <>
      <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">script</span>
      <span className="text-[#d19a66]"> src</span><span className="text-white/50">=</span>
      <span className="text-[#98c379]">"https://unpkg.com/reicon@latest/cdn/reicon.min.js"</span>
      <span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">script</span><span className="text-white/70">{'>'}</span>
      {'\n'}
      <span className="text-white/70">{'<'}</span><span className="text-[#e06c75]">re-icon</span>
      <span className="text-[#d19a66]"> icon</span><span className="text-white/50">=</span><span className="text-[#98c379]">"{name}"</span>
      {filled && (<><span className="text-[#d19a66]"> weight</span><span className="text-white/50">=</span><span className="text-[#98c379]">"filled"</span></>)}
      <span className="text-white/70">{'></'}</span><span className="text-[#e06c75]">re-icon</span><span className="text-white/70">{'>'}</span>
    </>
  );
}
