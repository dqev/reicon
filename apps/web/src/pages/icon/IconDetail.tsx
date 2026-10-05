import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import TypeTable from '@/components/docs/TypeTable';
import useIconDetail from './useIconDetail';
import IconPreview from './IconPreview';
import IconActions from './IconActions';
import CodeTabs from './CodeTabs';
import SeoHelmet from './SeoHelmet';
import RelatedIcons from './RelatedIcons';
import { EASE } from './utils';

export default function IconDetail() {
  const navigate = useNavigate();
  const {
    name, copiedField, activeWeight, previewSize, toast, exportSize,
    codeTab, setCodeTab, iconCategory, contributorGithub, useCustomColor, customColor,
    isColorPickerOpen, pascalName, fw, relatedIcons,
    setCopiedField, setActiveWeight, setPreviewSize,
    setExportSize, setUseCustomColor, setCustomColor, setIsColorPickerOpen,
    flashToast, handleCopy, handleCopySvg,
    handleDownloadSvg, handleDownloadPng, handleDownloadWebp,
    reset, CODE_TABS, activeTab,
    pageTitle, pageDesc, pageUrl,
  } = useIconDetail();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/icons');
    }
  };

  return (
    <div className="flex-1">
      <SeoHelmet
        pageTitle={pageTitle}
        pageDesc={pageDesc}
        pageUrl={pageUrl}
        pascalName={pascalName}
        iconCategory={iconCategory}
        name={name}
      />

      <main className="flex-1 w-full overflow-x-hidden">
        <div className="max-w-[1240px] mx-auto w-full flex flex-col flex-1 pt-2 md:pt-4 px-5 md:px-10 pb-12 md:pb-20">
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
              <span className="text-white/90 font-medium truncate" aria-current="page">{name}</span>
            </nav>
          </div>

          <h1 className="sr-only">{pascalName} icon — Reicon</h1>

          <div className="grid lg:grid-cols-[380px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
            <IconPreview
              pascalName={pascalName}
              iconCategory={iconCategory}
              contributorGithub={contributorGithub}
              name={name}
              activeWeight={activeWeight}
              previewSize={previewSize}
              useCustomColor={useCustomColor}
              customColor={customColor}
              onSetActiveWeight={setActiveWeight}
              onSetPreviewSize={setPreviewSize}
              onReset={reset}
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
              className="flex flex-col gap-4 min-w-0"
            >
              <IconActions
                pascalName={pascalName}
                name={name}
                activeWeight={activeWeight}
                exportSize={exportSize}
                useCustomColor={useCustomColor}
                customColor={customColor}
                isColorPickerOpen={isColorPickerOpen}
                copiedField={copiedField}
                onCopy={handleCopy}
                onCopySvg={handleCopySvg}
                onDownloadSvg={handleDownloadSvg}
                onDownloadPng={handleDownloadPng}
                onDownloadWebp={handleDownloadWebp}
                onSetExportSize={setExportSize}
                onSetUseCustomColor={setUseCustomColor}
                onSetCustomColor={setCustomColor}
                onSetIsColorPickerOpen={setIsColorPickerOpen}
              />

              <CodeTabs
                codeTab={codeTab}
                setCodeTab={setCodeTab}
                copiedField={copiedField}
                handleCopy={handleCopy}
                CODE_TABS={CODE_TABS}
                activeTab={activeTab}
                pascalName={pascalName}
                name={name || ''}
                fw={fw}
              />

              <div>
                <h3 className="text-[11px] font-mono font-semibold tracking-[0.1em] text-white/40 uppercase mb-2">Props</h3>
                <TypeTable rows={[
                  { prop: 'size', type: 'number | string', default: '24', description: 'Icon size in pixels' },
                  { prop: 'color', type: 'string', default: 'currentColor', description: 'Any valid CSS color' },
                  { prop: 'weight', type: '"Outline" | "Filled"', default: 'Outline', description: 'Icon weight' },
                  { prop: 'className?', type: 'string', default: null, description: 'Extra CSS classes' },
                ]} />
              </div>
            </motion.div>
          </div>
        </div>

        {relatedIcons.length > 0 && (
          <RelatedIcons relatedIcons={relatedIcons} weight={activeWeight} />
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
            <div className="bg-[#202020] border border-white/10 text-white/90 text-xs font-medium px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 whitespace-nowrap backdrop-blur-md">
              <svg className="w-3.5 h-3.5 text-[#9B8AFB] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
