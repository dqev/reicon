import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import type { CustomSvgIcon } from '@/components/ui/CustomSvgCard';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { loadGlassIcons, getGlassStandaloneSvg } from '@/lib/glass-icons';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  type: 'brand' | 'flag' | 'glass';
}

function formatIconName(name: string): string {
  if (!name) return '';
  if (name.includes('-') || name.includes('_')) {
    return name
      .split(/[-_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function formatSvg(svg: string): string {
  const trimmed = svg.trim();
  const tokens = trimmed.replace(/>\s*</g, '>\n<').split('\n');
  let indent = 0;
  return tokens
    .map((line) => {
      line = line.trim();
      if (!line) return '';
      if (line.startsWith('</')) {
        indent = Math.max(0, indent - 1);
      }
      const padding = '  '.repeat(indent);
      if (!line.startsWith('</') && !line.endsWith('/>') && !line.includes('</')) {
        indent++;
      }
      return padding + line;
    })
    .filter(Boolean)
    .join('\n');
}

function toReactJsx(svg: string, componentName: string): { code: string; jsxSvg: string } {
  const jsxSvg = svg
    .replace(/\bclass=/g, 'className=')
    .replace(/\bstroke-width=/g, 'strokeWidth=')
    .replace(/\bstroke-linecap=/g, 'strokeLinecap=')
    .replace(/\bstroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/\bfill-rule=/g, 'fillRule=')
    .replace(/\bclip-rule=/g, 'clipRule=')
    .replace(/\bclip-path=/g, 'clipPath=')
    .replace(/\bstop-color=/g, 'stopColor=')
    .replace(/\bstop-opacity=/g, 'stopOpacity=')
    .replace(/\bflood-opacity=/g, 'floodOpacity=')
    .replace(/\bcolor-interpolation-filters=/g, 'colorInterpolationFilters=');

  const formatted = formatSvg(jsxSvg);
  const code = `import React from 'react';\n\nexport default function ${componentName}Icon(props: React.SVGProps<SVGSVGElement>) {\n  return (\n${formatted
    .split('\n')
    .map((l) => '    ' + l)
    .join('\n')}\n  );\n}`;

  return { code, jsxSvg: formatted };
}

function downloadSvg(svgContent: string, fileName: string) {
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function highlightSvg(svgString: string) {
  const parts: React.ReactNode[] = [];
  const regex = /(<\/?[a-zA-Z0-9:-]+)|(\s+[a-zA-Z0-9:-]+(?==))|(=(?:".*?"|'.*?'|[^\s>]+))|(\/?>)|([^<]+)/g;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(svgString)) !== null) {
    const [, tag, attr, val, close, text] = match;
    if (tag) {
      parts.push(
        <span key={key++} className="text-[#e06c75]">
          {tag}
        </span>
      );
    } else if (attr) {
      parts.push(
        <span key={key++} className="text-[#d19a66]">
          {attr}
        </span>
      );
    } else if (val) {
      parts.push(
        <span key={key++} className="text-[#98c379]">
          {val}
        </span>
      );
    } else if (close) {
      parts.push(
        <span key={key++} className="text-text-base/70">
          {close}
        </span>
      );
    } else if (text) {
      parts.push(
        <span key={key++} className="text-white/80">
          {text}
        </span>
      );
    }
  }
  return parts;
}

export default function CustomIconDetail({ type }: Props) {
  const { name: paramName } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const [iconsList, setIconsList] = useState<CustomSvgIcon[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Default size 64px for clean, elegant proportion
  const [previewSize, setPreviewSize] = useState<number>(64);
  const [activeTab, setActiveTab] = useState<'svg' | 'react'>('svg');

  const isBrand = type === 'brand';
  const isFlag = type === 'flag';
  const isGlass = type === 'glass';
  const parentLabel = isGlass ? 'Glass' : isBrand ? 'Brands' : 'Flags';
  const parentUrl = isGlass ? '/glass' : isBrand ? '/brands' : '/flags';

  const flashToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleReset = () => {
    setPreviewSize(64);
  };

  // Lazy-load data
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const loadPromise = isGlass
      ? loadGlassIcons()
      : isBrand
      ? import('@/data/brands.json').then((mod) => (mod.default?.icons || (mod as any).icons || []) as CustomSvgIcon[])
      : import('@/data/flag.json').then((mod) => (mod.default?.icons || (mod as any).icons || []) as CustomSvgIcon[]);

    loadPromise
      .then((list) => {
        if (cancelled) return;
        setIconsList(list);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load icons data:', err);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isBrand, isGlass]);

  // Find target icon
  const icon = useMemo(() => {
    if (!iconsList || !paramName) return null;
    const decoded = decodeURIComponent(paramName).trim().toLowerCase();
    const normalized = decoded.replace(/[^a-z0-9]/g, '');

    return (
      iconsList.find((item) => {
        const itemName = item.name.trim().toLowerCase();
        if (itemName === decoded) return true;
        if (itemName.replace(/\s+/g, '-') === decoded) return true;
        if (itemName.replace(/[^a-z0-9]/g, '') === normalized) return true;
        return false;
      }) || null
    );
  }, [iconsList, paramName]);

  const displayName = useMemo(() => {
    if (!icon) return paramName ? formatIconName(paramName) : '';
    return formatIconName(icon.name);
  }, [icon, paramName]);

  const pascalName = useMemo(() => {
    return displayName.replace(/[^a-zA-Z0-9]/g, '') || 'Custom';
  }, [displayName]);

  // Formatted code snippets
  const iconSvg = useMemo(() => {
    if (!icon) return '';
    if (icon.svg) return icon.svg;
    if (icon.rawCode && isGlass) {
      return getGlassStandaloneSvg(icon.rawCode, icon.name);
    }
    return '';
  }, [icon, isGlass]);

  const formattedSvg = useMemo(() => {
    return iconSvg ? formatSvg(iconSvg) : '';
  }, [iconSvg]);

  const reactDetails = useMemo(() => {
    return iconSvg ? toReactJsx(iconSvg, pascalName) : { code: '', jsxSvg: '' };
  }, [iconSvg, pascalName]);

  const handleCopy = useCallback(
    async (text: string, field: string) => {
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
        flashToast(field === 'svg' || field === 'action-svg' ? 'SVG copied to clipboard' : 'Copied to clipboard');
        setTimeout(() => setCopiedField(null), 2000);
      } catch {
        flashToast('Copy failed');
      }
    },
    [flashToast]
  );

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(parentUrl);
    }
  };

  const CODE_TABS = useMemo(
    () => [
      {
        id: 'svg' as const,
        label: 'SVG',
        icon: <img src="/framework-logos/svg.svg" alt="SVG" className="w-3.5 h-3.5 object-contain shrink-0" />,
        raw: formattedSvg,
      },
      {
        id: 'react' as const,
        label: 'React',
        icon: <img src="/framework-logos/react.svg" alt="React" className="w-3.5 h-3.5 object-contain shrink-0" />,
        raw: reactDetails.code,
      },
    ],
    [formattedSvg, reactDetails.code]
  );

  const activeTabRaw = activeTab === 'react' ? reactDetails.code : formattedSvg;

  if (loading) {
    return <LoadingScreen />;
  }

  if (!icon) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-medium text-white mb-2">{isGlass ? 'Glass' : isBrand ? 'Brand' : 'Flag'} Icon Not Found</h1>
        <p className="text-sm text-text-muted mb-6">Could not find icon &quot;{paramName}&quot;.</p>
        <button
          onClick={() => navigate(parentUrl)}
          className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-sm font-medium transition-colors cursor-pointer"
        >
          Back to {parentLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <Helmet>
        <title>{`${displayName} ${isGlass ? 'Glass' : isBrand ? 'Brand Logo' : 'Flag'} Icon SVG — Reicon`}</title>
        <meta
          name="description"
          content={`Download or copy free ${displayName} vector ${isGlass ? 'glass' : isBrand ? 'brand logo' : 'flag'} SVG icon. Optimized, lossless, high-fidelity SVG code.`}
        />
        <meta property="og:title" content={`${displayName} ${isGlass ? 'Glass' : isBrand ? 'Brand Logo' : 'Flag'} Icon SVG — Reicon`} />
        <meta
          property="og:description"
          content={`Download or copy free ${displayName} vector ${isGlass ? 'glass' : isBrand ? 'brand logo' : 'flag'} SVG icon.`}
        />
      </Helmet>

      <main className="flex-1 w-full overflow-x-hidden">
        <div className="max-w-[1240px] mx-auto w-full flex flex-col flex-1 pt-2 md:pt-4 px-5 md:px-10 pb-12 md:pb-20">
          {/* Breadcrumb & Back bar */}
          <div className="flex items-center justify-between mb-6 gap-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-medium text-white/80 hover:text-white bg-white/[0.07] hover:bg-white/10 border-0 transition-all cursor-pointer group shrink-0"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 shrink-0"
              >
                <path
                  d="M9.70711 4.70711C10.0976 4.31658 10.0976 3.68342 9.70711 3.29289C9.31658 2.90237 8.68342 2.90237 8.29289 3.29289L3.29289 8.29289C2.90237 8.68342 2.90237 9.31658 3.29289 9.70711L8.29289 14.7071C8.68342 15.0976 9.31658 15.0976 9.70711 14.7071C10.0976 13.6834 10.0976 13.6834 9.70711 13.2929L6.41421 10H10.4C12.0967 10 13.309 10.0008 14.2594 10.0784C15.198 10.1551 15.7927 10.3018 16.27 10.545C17.2108 11.0243 17.9757 11.7892 18.455 12.73C18.6982 13.2073 18.8449 13.802 18.9216 14.7406C18.9992 15.691 19 16.9033 19 18.6V20C19 20.5523 19.4477 21 20 21C20.5523 21 21 20.5523 21 20V18.5556C21 16.913 21 15.6191 20.9149 14.5778C20.8281 13.5154 20.6478 12.6283 20.237 11.8221C19.5659 10.5049 18.4951 9.43407 17.1779 8.76295C16.3717 8.35217 15.4846 8.17186 14.4222 8.08507C13.3809 7.99999 12.087 7.99999 10.4444 8L6.41421 8L9.70711 4.70711Z"
                  fill="currentColor"
                />
              </svg>
              <span>Back</span>
            </button>

            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-mono text-white/40 min-w-0">
              <Link to="/icons" className="hover:text-white/70 transition-colors shrink-0">icon</Link>
              <span className="text-white/20 shrink-0" aria-hidden="true">/</span>
              <Link to={parentUrl} className="hover:text-white/70 transition-colors shrink-0">
                {parentLabel.toLowerCase()}
              </Link>
              <span className="text-white/20 shrink-0" aria-hidden="true">/</span>
              <span className="text-white/90 font-medium truncate" aria-current="page">{displayName}</span>
            </nav>
          </div>

          <h1 className="sr-only">{displayName} {isBrand ? 'brand' : 'flag'} icon — Reicon</h1>

          {/* Main 2-column layout matching IconDetail */}
          <div className="grid lg:grid-cols-[380px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
            {/* ─── Left Column: Icon Preview & Controls (Matching IconPreview.tsx) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="lg:sticky lg:top-24 lg:self-start flex flex-col gap-5 bg-[#181818] border border-white/[0.06] rounded-3xl p-5 md:p-6 shadow-none card-inset"
            >
              {/* Checkered Preview Stage */}
              <div
                className="relative w-full aspect-square border border-white/[0.08] rounded-2xl flex items-center justify-center overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] p-6"
                style={{
                  backgroundImage:
                    'conic-gradient(rgba(255, 255, 255, 0.05) 90deg, transparent 90deg 180deg, rgba(255, 255, 255, 0.05) 180deg 270deg, transparent 270deg)',
                  backgroundSize: '16px 16px',
                }}
              >
                <div
                  className="reicon-custom-svg flex items-center justify-center shrink-0 transition-all duration-150"
                  style={{
                    width: `${previewSize}px`,
                    height: `${previewSize}px`,
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                  dangerouslySetInnerHTML={{ __html: iconSvg }}
                />
              </div>

              {/* Title Row */}
              <div className="px-0.5">
                <h2 className="text-xl font-display font-medium text-white truncate tracking-tight">
                  {displayName}
                </h2>
                <p className="text-xs text-white/40 mt-0.5 font-sans">
                  {isBrand ? 'Brand Logo' : isGlass ? 'Glass Icon' : 'Flag Icon'}
                </p>
              </div>

              {/* Inset Customize Box (Matching IconPreview.tsx lines 118-149) */}
              <div className="bg-[#121212] border border-white/[0.06] rounded-2xl p-4 flex flex-col gap-4 card-inset">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.1em] text-white/40 font-mono font-semibold">
                    Customize
                  </span>
                  <button
                    onClick={handleReset}
                    title="Reset"
                    aria-label="Reset"
                    className="w-7 h-7 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.5 2.8L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                  </button>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs text-white/50 font-medium">Size</label>
                    <span className="text-xs text-white/40 font-mono">{previewSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={24}
                    max={200}
                    value={previewSize}
                    onChange={(e) => setPreviewSize(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none bg-white/10 accent-[#9B8AFB] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#9B8AFB] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(155,138,251,0.6)]"
                  />
                </div>
              </div>
            </motion.div>

            {/* ─── Right Column: CodeTabs ON TOP, then Button Card BELOW ─── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
              className="flex flex-col gap-4 min-w-0"
            >
              {/* 1. CodeTabs Block ON TOP (100% Matching CodeTabs.tsx structure & CSS) */}
              <figure className="relative rounded-xl bg-white/[0.03] text-sm shadow-none overflow-hidden min-w-0 w-full my-0">
                {/* Header bar with framework tabs and right-aligned copy button */}
                <div className="relative flex items-center justify-between w-full h-10 pl-5 pr-1.5 min-w-0">
                  <div className="flex items-center h-full gap-x-4 overflow-x-auto no-scrollbar scroll-smooth shrink min-w-0">
                    {CODE_TABS.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`relative flex items-center gap-1.5 h-full text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                            isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                          }`}
                        >
                          <span className={isActive ? 'opacity-100' : 'opacity-50'}>{tab.icon}</span>
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Copy Button in Header Bar */}
                  <button
                    onClick={() => handleCopy(activeTabRaw, `code-${activeTab}`)}
                    aria-label="Copy code"
                    className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
                  >
                    {copiedField === `code-${activeTab}` ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Code body area — compact fixed height inset card with internal scroll */}
                <div className="px-1.5 pb-1.5 min-w-0 w-full">
                  <div className="bg-[#121212] rounded-md h-[200px] w-full min-w-0 relative overflow-hidden flex flex-col">
                    <AnimatePresence mode="wait">
                      <motion.pre
                        key={activeTab}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: EASE }}
                        className="h-full w-full px-5 py-4 text-[13px] font-mono leading-[1.7] overflow-y-auto overflow-x-auto whitespace-pre focus-visible:outline-none text-white/90"
                      >
                        {activeTab === 'svg' && highlightSvg(formattedSvg)}
                        {activeTab === 'react' && (
                          <>
                            <span className="text-[#c678dd]">import</span>
                            <span className="text-text-base/70"> React </span>
                            <span className="text-[#c678dd]">from</span>
                            <span className="text-[#98c379]"> 'react'</span>
                            <span className="text-text-base/30">;</span>
                            {'\n\n'}
                            <span className="text-[#c678dd]">export default function </span>
                            <span className="text-[#e5c07b]">{pascalName}Icon</span>
                            <span className="text-text-base/70">(props: </span>
                            <span className="text-[#61afef]">React.SVGProps</span>
                            <span className="text-text-base/70">&lt;</span>
                            <span className="text-[#61afef]">SVGSVGElement</span>
                            <span className="text-text-base/70">&gt;) {'{\n'}</span>
                            <span className="text-[#c678dd]">  return </span>
                            <span className="text-text-base/70">{'(\n'}</span>
                            {reactDetails.jsxSvg
                              .split('\n')
                              .map((line, i) => (
                                <React.Fragment key={i}>
                                  {'    '}
                                  {highlightSvg(line)}
                                  {'\n'}
                                </React.Fragment>
                              ))}
                            <span className="text-text-base/70">{'  );\n}'}</span>
                          </>
                        )}
                      </motion.pre>
                    </AnimatePresence>
                  </div>
                </div>
              </figure>

              {/* 2. Button Card BELOW (Matching IconActions.tsx) */}
              <div className="bg-[#181818] border border-white/[0.06] rounded-3xl p-4 md:p-5 flex flex-col gap-3 shadow-none">
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    onClick={() => handleCopy(iconSvg, 'action-svg')}
                    whileTap={{ scale: 0.96 }}
                    className={`flex-1 min-w-[110px] text-xs font-medium py-2 px-3.5 rounded-full border transition-all cursor-pointer ${
                      copiedField === 'action-svg'
                        ? 'bg-[#9B8AFB] border-[#9B8AFB] text-white'
                        : 'bg-[#2a2a2a] border-white/10 text-white hover:bg-[#323232]'
                    }`}
                  >
                    {copiedField === 'action-svg' ? 'Copied!' : 'Copy SVG'}
                  </motion.button>

                  <motion.button
                    onClick={() => handleCopy(reactDetails.code, 'action-jsx')}
                    whileTap={{ scale: 0.96 }}
                    className={`flex-1 min-w-[110px] text-xs font-medium py-2 px-3.5 rounded-full border transition-all cursor-pointer ${
                      copiedField === 'action-jsx'
                        ? 'bg-[#9B8AFB] border-[#9B8AFB] text-white'
                        : 'bg-[#2a2a2a] border-white/10 text-white hover:bg-[#323232]'
                    }`}
                  >
                    {copiedField === 'action-jsx' ? 'Copied!' : 'Copy JSX'}
                  </motion.button>

                  <motion.button
                    onClick={() => handleCopy(icon.name, 'action-name')}
                    whileTap={{ scale: 0.96 }}
                    className={`flex-1 min-w-[110px] text-xs font-medium py-2 px-3.5 rounded-full border transition-all cursor-pointer ${
                      copiedField === 'action-name'
                        ? 'bg-[#9B8AFB] border-[#9B8AFB] text-white'
                        : 'bg-[#2a2a2a] border-white/10 text-white hover:bg-[#323232]'
                    }`}
                  >
                    {copiedField === 'action-name' ? 'Copied!' : 'Copy Name'}
                  </motion.button>
                </div>

                <div className="flex gap-2 pt-1 border-t border-white/[0.06]">
                  <motion.button
                    onClick={() => {
                      downloadSvg(iconSvg, icon.name);
                      flashToast('Downloaded SVG file');
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="flex-1 text-xs font-medium py-2 px-3.5 rounded-full border bg-[#2a2a2a] border-white/10 text-white hover:bg-[#323232] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Download SVG</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Floating Copy Feedback Toast matching IconDetail.tsx */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none"
          >
            <div className="bg-[#202020] border border-white/10 text-white/90 text-xs font-medium px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 whitespace-nowrap backdrop-blur-md">
              <svg className="w-3.5 h-3.5 text-[#9B8AFB] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{toast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
