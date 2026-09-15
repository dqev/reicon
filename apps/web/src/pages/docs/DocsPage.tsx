import DocsLeftSidebar from '@/components/docs/sidebar/Left';
import DocsRightSidebar from '@/components/docs/sidebar/Right';
import DocsMobileNav from '@/components/docs/sidebar/Mobile';
import { docsSidebarStyles } from '@/components/docs/sidebar/styles';
import { useDocs } from './useDocs';
import DocsHelmet from './DocsHelmet';
import DocsContent from './DocsContent';

export default function DocsPage() {
  const {
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
    figmaDocs,
    vscodeDocs,
    mcpDocs,
    svgDocs,
    flutterDocs,
    propsDocs,
    weightsDocs,
    typescriptDocs,
    stylingDocs,
    accessibilityDocs,
    performanceDocs,
    troubleshootingDocs,
  } = useDocs();

  return (
    <div className="flex-1">
      <DocsHelmet framework={fwParam} />

      <div className="flex flex-1 pt-14 px-4 md:px-10">
        <style>{docsSidebarStyles}</style>

        <DocsLeftSidebar
          framework={framework}
          fwParam={fwParam}
          frameworkSectionId={frameworkSectionId}
          frameworkLabel={frameworkLabel}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          dropdownRef={dropdownRef}
          introItems={introItems}
          activeSection={activeSection}
          onNavClick={scrollTo}
          onFrameworkSwitch={switchFramework}
        />

        <DocsMobileNav
          mobileNavRef={mobileNavRef}
          mobileNavOpen={mobileNavOpen}
          setMobileNavOpen={setMobileNavOpen}
          framework={framework}
          fwParam={fwParam}
          activeSection={activeSection}
          onThisPage={onThisPage}
          onNavClick={scrollTo}
          onFrameworkSwitch={switchFramework}
        />

        <DocsContent
          contentRef={contentRef}
          fwParam={fwParam}
          framework={framework}
          switchFramework={switchFramework}
          copiedField={copiedField}
          copyToClipboard={copyToClipboard}
          toastMessage={toastMessage}
          isStandaloneFramework={isStandaloneFramework}
          copiedPage={copiedPage}
          openDropdown={openDropdown}
          openDropdownRef={openDropdownRef}
          githubEditUrl={githubEditUrl}
          githubUrl={githubUrl}
          handleCopyPageMarkdown={handleCopyPageMarkdown}
          setOpenDropdown={setOpenDropdown}
          openInLLM={openInLLM}
          prevFw={prevFw}
          nextFw={nextFw}
          navigatePrevFw={navigatePrevFw}
          navigateNextFw={navigateNextFw}
          vanillaDocs={vanillaDocs}
          reactDocs={reactDocs}
          angularDocs={angularDocs}
          reactNativeDocs={reactNativeDocs}
          vueDocs={vueDocs}
          svelteDocs={svelteDocs}
          astroDocs={astroDocs}
          figmaDocs={figmaDocs}
          vscodeDocs={vscodeDocs}
          mcpDocs={mcpDocs}
          svgDocs={svgDocs}
          flutterDocs={flutterDocs}
          propsDocs={propsDocs}
          weightsDocs={weightsDocs}
          typescriptDocs={typescriptDocs}
          stylingDocs={stylingDocs}
          accessibilityDocs={accessibilityDocs}
          performanceDocs={performanceDocs}
          troubleshootingDocs={troubleshootingDocs}
        />

        <DocsRightSidebar
          onThisPage={onThisPage}
          activeSection={activeSection}
          otpIndicatorStyle={otpIndicatorStyle}
          otpListRef={otpListRef}
          onNavClick={scrollTo}
        />
      </div>

    </div>
  );
}
