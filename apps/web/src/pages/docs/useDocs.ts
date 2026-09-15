import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FRAMEWORKS, Framework } from '@/components/docs/framework/constants';
import { getFrameworkSectionId, getFrameworkLabel, getOnThisPageSections, isStandaloneFramework } from '@/components/docs/framework/helpers';

import vanillaDocs from '@docs/javascript/index.md?raw';
import reactDocs from '@docs/react/index.md?raw';
import angularDocs from '@docs/angular/index.md?raw';
import reactNativeDocs from '@docs/react-native/index.md?raw';
import vueDocs from '@docs/vue/index.md?raw';
import svelteDocs from '@docs/svelte/index.md?raw';
import astroDocs from '@docs/astro/index.md?raw';
import flutterDocs from '@docs/flutter/index.md?raw';
import figmaDocs from '@docs/figma/index.md?raw';
import vscodeDocs from '@docs/vscode/index.md?raw';
import mcpDocs from '@docs/mcp/index.md?raw';
import svgDocs from '@docs/svg/index.md?raw';
import propsDocs from '@docs/shared/props.md?raw';
import weightsDocs from '@docs/shared/weights.md?raw';
import typescriptDocs from '@docs/shared/typescript.md?raw';
import stylingDocs from '@docs/shared/styling.md?raw';
import accessibilityDocs from '@docs/shared/accessibility.md?raw';
import performanceDocs from '@docs/shared/performance.md?raw';
import troubleshootingDocs from '@docs/shared/troubleshooting.md?raw';

export function useDocs() {
  const { framework: fwParam } = useParams<{ framework?: string }>();
  const navigate = useNavigate();
  const initialFw = (fwParam as Framework) || 'vanilla';

  const [framework, setFramework] = useState<Framework>(
    FRAMEWORKS.some((f) => f.id === initialFw) ? initialFw : 'vanilla'
  );
  const [activeSection, setActiveSection] = useState('what-is-reicon');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copiedPage, setCopiedPage] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [otpIndicatorStyle, setOtpIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });

  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const openDropdownRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const otpListRef = useRef<HTMLUListElement>(null);

  const frameworkSectionId = getFrameworkSectionId(framework);
  const frameworkLabel = getFrameworkLabel(framework);

  const introItems = !fwParam
    ? [{ id: 'what-is-reicon', label: 'What is Reicon?' }]
    : [{ id: 'what-is-reicon', label: 'Introduction' }];

  const onThisPage = !fwParam
    ? [{ id: 'what-is-reicon', label: 'What is Reicon?' }]
    : getOnThisPageSections(framework);

  const githubUrl = 'https://github.com/dqev/reicon';

  const getDocsPath = () => {
    switch (framework) {
      case 'react': return 'react/index.md';
      case 'angular': return 'angular/index.md';
      case 'react-native': return 'react-native/index.md';
      case 'vue': return 'vue/index.md';
      case 'svelte': return 'svelte/index.md';
      case 'astro': return 'astro/index.md';
      case 'flutter': return 'flutter/index.md';
      case 'figma': return 'figma/index.md';
      case 'vscode': return 'vscode/index.md';
      case 'mcp': return 'mcp/index.md';
      case 'svg': return 'svg/index.md';
      default: return 'javascript/index.md';
    }
  };

  const githubEditUrl = `https://github.com/dqev/reicon/edit/main/docs/${getDocsPath()}`;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  };

  const getActiveFwDocs = () => {
    switch (framework) {
      case 'react': return reactDocs;
      case 'angular': return angularDocs;
      case 'react-native': return reactNativeDocs;
      case 'vue': return vueDocs;
      case 'svelte': return svelteDocs;
      case 'astro': return astroDocs;
      case 'flutter': return flutterDocs;
      case 'figma': return figmaDocs;
      case 'vscode': return vscodeDocs;
      case 'mcp': return mcpDocs;
      case 'svg': return svgDocs;
      default: return vanillaDocs;
    }
  };

  const getFullMarkdown = () => {
    const fwDocs = getActiveFwDocs();
    if (isStandaloneFramework(framework)) return fwDocs;
    return `${fwDocs}\n\n${propsDocs}\n\n${weightsDocs}\n\n${stylingDocs}\n\n${accessibilityDocs}\n\n${performanceDocs}\n\n${typescriptDocs}\n\n${troubleshootingDocs}`;
  };

  const handleCopyPageMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(getFullMarkdown());
      setCopiedPage(true);
      showToast('Full page markdown copied!');
      setTimeout(() => setCopiedPage(false), 2000);
    } catch {
      showToast('Failed to copy');
    }
  };

  const currentFwIndex = FRAMEWORKS.findIndex((f) => f.id === framework);
  const prevFw = currentFwIndex > 0 ? FRAMEWORKS[currentFwIndex - 1] : null;
  const nextFw = currentFwIndex >= 0 && currentFwIndex < FRAMEWORKS.length - 1 ? FRAMEWORKS[currentFwIndex + 1] : null;

  const navigatePrevFw = () => {
    if (prevFw) {
      switchFramework(prevFw.id);
    }
  };

  const navigateNextFw = () => {
    if (nextFw) {
      switchFramework(nextFw.id);
    }
  };

  const openInLLM = async (platform: 'markdown' | 'v0' | 'chatgpt' | 'claude' | 'scira') => {
    const markdown = getFullMarkdown();
    try { await navigator.clipboard.writeText(markdown); } catch { /* silent */ }

    if (platform === 'markdown') {
      setCopiedPage(true);
      showToast('Full page markdown copied!');
      setTimeout(() => setCopiedPage(false), 2000);
      setOpenDropdown(false);
      return;
    }

    const promptText = `Here is the Reicon documentation for ${frameworkLabel}. Please read it and help me use the library:\n\n${markdown}`;
    const urls: Record<string, string> = {
      v0: `https://v0.dev/chat?q=${encodeURIComponent(promptText)}`,
      chatgpt: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(promptText)}`,
      claude: `https://claude.ai/new?q=${encodeURIComponent(promptText)}`,
      scira: `https://scira.app/?q=${encodeURIComponent(promptText)}`,
    };
    setOpenDropdown(false);
    showToast('Markdown copied! Opening AI...');
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  const scrollTo = (id: string) => {
    if (id === 'intro') {
      navigate('/docs');
      window.scrollTo(0, 0);
      return;
    }
    if (!fwParam) {
      navigate(`/docs/vanilla#${id}`);
      return;
    }
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileNavOpen(false);
  };

  const switchFramework = (fw: Framework) => {
    setFramework(fw);
    setDropdownOpen(false);
    navigate(`/docs/${fw}`, { replace: !!fwParam });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fw = fwParam as Framework;
    if (fw && FRAMEWORKS.some((f) => f.id === fw)) {
      setFramework(fw);
      setActiveSection(getFrameworkSectionId(fw));
    } else if (!fwParam) {
      setFramework('vanilla');
      setActiveSection('what-is-reicon');
    }
    window.scrollTo(0, 0);
  }, [fwParam]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
      if (!sections.length) return;
      const scrollPos = window.scrollY + 140;
      let currentId = sections[0].id;
      for (const section of sections) {
        if (section.offsetTop <= scrollPos) {
          currentId = section.id;
        } else {
          break;
        }
      }
      setActiveSection(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fwParam, framework]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
      if (openDropdownRef.current && !openDropdownRef.current.contains(e.target as Node)) setOpenDropdown(false);
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) setMobileNavOpen(false);
    };
    const handleScroll = () => setMobileNavOpen(false);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!otpListRef.current) return;
    const activeEl = otpListRef.current.querySelector('.otp-item.active') as HTMLElement;
    if (activeEl) {
      setOtpIndicatorStyle({ top: activeEl.offsetTop + (activeEl.offsetHeight - 16) / 2, height: 16, opacity: 1 });
    } else {
      setOtpIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection, framework]);

  return {
    framework,
    fwParam,
    activeSection,
    copiedField,
    mobileNavOpen,
    setMobileNavOpen,
    dropdownOpen,
    setDropdownOpen,
    copiedPage,
    openDropdown,
    setOpenDropdown,
    toastMessage,
    otpIndicatorStyle,
    contentRef,
    dropdownRef,
    openDropdownRef,
    mobileNavRef,
    otpListRef,
    frameworkSectionId,
    frameworkLabel,
    introItems,
    onThisPage,
    githubUrl,
    githubEditUrl,
    showToast,
    copyToClipboard,
    handleCopyPageMarkdown,
    openInLLM,
    prevFw,
    nextFw,
    navigatePrevFw,
    navigateNextFw,
    scrollTo,
    switchFramework,
    isStandaloneFramework,
    vanillaDocs,
    reactDocs,
    angularDocs,
    reactNativeDocs,
    vueDocs,
    svelteDocs,
    astroDocs,
    flutterDocs,
    figmaDocs,
    vscodeDocs,
    mcpDocs,
    svgDocs,
    propsDocs,
    weightsDocs,
    typescriptDocs,
    stylingDocs,
    accessibilityDocs,
    performanceDocs,
    troubleshootingDocs,
  };
}
