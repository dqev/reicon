import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { SiSvelte } from 'react-icons/si';
import { AngularIcon } from '@/components/docs/framework/icons';
import { VueLogo, FlutterLogo, AstroLogo, CdnLogo } from './Snippets';
import { loadIconData } from '@/lib/icon-data';
import { waitForReicon } from '@/lib/reicon-loader';
import {
  copyToClipboard as copyUtils,
  copySvg as copySvgUtils,
  downloadSvg as downloadSvgUtils,
  downloadAsPng as downloadPngUtils,
  downloadAsWebp as downloadWebpUtils,
} from './utils';

export default function useIconDetail() {
  const { name } = useParams<{ name: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeWeight, setActiveWeightState] = useState<'outline' | 'filled' | 'duotone'>(() => {
    const w = searchParams.get('weight')?.toLowerCase();
    if (w === 'filled') return 'filled';
    if (w === 'duotone') return 'duotone';
    return 'outline';
  });

  const setActiveWeight = useCallback((w: 'outline' | 'filled' | 'duotone') => {
    setActiveWeightState(w);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('weight', w);
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const [previewSize, setPreviewSize] = useState(128);
  const [toast, setToast] = useState<string | null>(null);
  const [exportSize, setExportSize] = useState(64);
  const [codeTab, setCodeTab] = useState<'vanilla' | 'cdn' | 'react' | 'angular' | 'react-native' | 'vue' | 'svelte' | 'astro' | 'flutter' | 'direct'>('vanilla');
  const [iconCategory, setIconCategory] = useState('');
  const [contributorGithub, setContributorGithub] = useState<string | null>(null);
  const [useCustomColor, setUseCustomColor] = useState(false);
  const [customColor, setCustomColor] = useState('#9B8AFB');
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [iconNames, setIconNames] = useState<Record<string, string> | null>(null);

  const pascalName = useMemo(() => name
    ? name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')
    : '', [name]);

  const flutterName = useMemo(() => pascalName
    ? pascalName.charAt(0).toLowerCase() + pascalName.slice(1)
    : '', [pascalName]);

  const flashToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleCopy = useCallback((text: string, field: string) => {
    return copyUtils(text, field, setCopiedField, flashToast);
  }, [flashToast]);

  const handleCopySvg = useCallback(() => {
    return copySvgUtils(name || '', activeWeight, useCustomColor, customColor, setCopiedField, flashToast);
  }, [name, activeWeight, useCustomColor, customColor, flashToast]);

  const handleDownloadSvg = useCallback(() => {
    return downloadSvgUtils(name || '', activeWeight, exportSize, useCustomColor, customColor, flashToast);
  }, [name, activeWeight, exportSize, useCustomColor, customColor, flashToast]);

  const handleDownloadPng = useCallback(() => {
    return downloadPngUtils(name || '', activeWeight, exportSize, useCustomColor, customColor, flashToast);
  }, [name, activeWeight, exportSize, useCustomColor, customColor, flashToast]);

  const handleDownloadWebp = useCallback(() => {
    return downloadWebpUtils(name || '', activeWeight, exportSize, useCustomColor, customColor, flashToast);
  }, [name, activeWeight, exportSize, useCustomColor, customColor, flashToast]);

  const reset = useCallback(() => {
    setActiveWeight('outline');
    setPreviewSize(128);
    setUseCustomColor(false);
    setCustomColor('#9B8AFB');
    setIsColorPickerOpen(false);
  }, [setActiveWeight]);

  const fw = activeWeight === 'filled';

  const vanillaRaw = `import { ${pascalName} } from 'reicon';\n\nconst icon = ${pascalName}({ size: 24${fw ? ", weight: 'Filled'" : ''} });\ndocument.body.appendChild(icon);`;
  const cdnRaw = `<script src="https://unpkg.com/reicon@latest/cdn/reicon.js"><\/script>\n<re-icon icon="${name}"${fw ? ' weight="filled"' : ''}></re-icon>`;
  const reactRaw = `import { ${pascalName} } from 'reicon-react';\n\n<${pascalName} size={24}${fw ? ' weight="Filled"' : ''} />`;
  const angularRaw = `import { Component } from '@angular/core';\nimport { ${pascalName}Component } from 'reicon-angular';\n\n// Add ${pascalName}Component to @Component({ imports: [...] })\n<ri-${name} [size]="24"${fw ? ' weight="Filled"' : ''}></ri-${name}>`;
  const reactNativeRaw = `import { ${pascalName} } from 'reicon-react-native';\n\n<${pascalName} size={24}${fw ? ' weight="Filled"' : ''} />`;
  const vueRaw = `import { ${pascalName} } from 'reicon-vue';\n\n<${pascalName} :size="24"${fw ? ' weight="Filled"' : ''} />`;
  const svelteRaw = `<script>\n  import { ${pascalName} } from 'reicon-svelte';\n</script>\n\n<${pascalName} size={24}${fw ? ' weight="Filled"' : ''} />`;
  const astroRaw = `---\nimport { ${pascalName} } from 'reicon-astro';\n---\n\n<${pascalName} size={24}${fw ? ' weight="Filled"' : ''} />`;
  const flutterRaw = `import 'package:flutter_svg/flutter_svg.dart';\nimport 'package:reicon_flutter/reicon_flutter.dart';\n\nSvgPicture.string(\n  reiconSvg(Reicon.${fw ? 'filled' : 'outline'}.${flutterName}),\n  width: 24,\n  height: 24,\n)`;
  const directRaw = `import ${pascalName} from 'reicon-react/icons/${pascalName}';`;

  const CODE_TABS = useMemo(() => [
    { id: 'vanilla' as const, label: 'JS', icon: <IoLogoJavascript className="text-yellow-400" size={14} />, raw: vanillaRaw },
    { id: 'cdn' as const, label: 'CDN', icon: <CdnLogo />, raw: cdnRaw },
    { id: 'react' as const, label: 'React', icon: <FaReact className="text-[#61DAFB]" size={14} />, raw: reactRaw },
    { id: 'angular' as const, label: 'Angular', icon: <AngularIcon size={14} />, raw: angularRaw },
    { id: 'react-native' as const, label: 'React Native', icon: <FaReact className="text-[#61DAFB]" size={14} />, raw: reactNativeRaw },
    { id: 'vue' as const, label: 'Vue', icon: <VueLogo />, raw: vueRaw },
    { id: 'svelte' as const, label: 'Svelte', icon: <SiSvelte className="text-[#FF3E00]" size={14} />, raw: svelteRaw },
    { id: 'astro' as const, label: 'Astro', icon: <AstroLogo />, raw: astroRaw },
    { id: 'flutter' as const, label: 'Flutter', icon: <FlutterLogo />, raw: flutterRaw },
    { id: 'direct' as const, label: 'Direct', icon: <FaReact className="text-[#61DAFB]" size={14} />, raw: directRaw },
  ], [vanillaRaw, cdnRaw, reactRaw, angularRaw, reactNativeRaw, vueRaw, svelteRaw, astroRaw, flutterRaw, directRaw]);

  const activeTab = CODE_TABS.find((t) => t.id === codeTab) || CODE_TABS[0];

  useEffect(() => {
    const w = searchParams.get('weight')?.toLowerCase();
    if (w === 'filled') setActiveWeightState('filled');
    else if (w === 'duotone') setActiveWeightState('duotone');
    else setActiveWeightState('outline');
  }, [name, searchParams]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await loadIconData();
        if (!cancelled) setIconNames(data.iconNames);
      } catch {}
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!name) return;
    let cancelled = false;
    (async () => {
      try {
        await waitForReicon();
        if (cancelled) return;
        const cat = window.Reicon?.categoryOf?.(name);
        if (cat) setIconCategory(cat.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
      } catch {}
    })();
    return () => { cancelled = true; };
  }, [name]);

  useEffect(() => {
    if (!name) return;
    let cancelled = false;
    (async () => {
      try {
        await waitForReicon();
        if (cancelled) return;
        const gh = window.Reicon?.contributorOf?.(name);
        setContributorGithub(gh ?? null);
      } catch {}
    })();
    return () => { cancelled = true; };
  }, [name]);

  const pageTitle = `${pascalName} Icon \u2014 Reicon`;
  const pageDesc = `Free ${pascalName} SVG icon from Reicon. Outline & filled weights. MIT licensed.`;
  const pageUrl = `https://reicon.dev/icon/${name}`;

  const relatedIcons = useMemo(() => {
    if (!name || !iconNames) return [];
    const allNames = Object.keys(iconNames) as string[];
    const prefix = name.replace(/-?\d+$/, '').replace(/-[^-]+$/, '');
    const related = allNames.filter(
      (n) => n !== name && (n.startsWith(prefix + '-') || n.startsWith(prefix) || name.startsWith(n.replace(/-?\d+$/, '')))
    );
    return related.sort(() => 0.5 - Math.random()).slice(0, 14);
  }, [name, iconNames]);

  return {
    name,
    copiedField, activeWeight, previewSize, toast, exportSize,
    codeTab, iconCategory, contributorGithub, useCustomColor, customColor,
    isColorPickerOpen, pascalName, fw, relatedIcons,
    setCopiedField, setActiveWeight, setPreviewSize, setExportSize,
    setCodeTab, setUseCustomColor, setCustomColor, setIsColorPickerOpen,
    setToast,
    flashToast, handleCopy, handleCopySvg,
    handleDownloadSvg, handleDownloadPng, handleDownloadWebp,
    reset, CODE_TABS, activeTab,
    pageTitle, pageDesc, pageUrl,
    iconNames,
  };
}
