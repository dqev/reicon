import { useEffect, useRef } from 'react';
import { ChevronExpandY } from 'reicon-react';
import { FrameworkIcon } from '../framework/icons';
import { FRAMEWORKS, Framework } from '../framework/constants';

interface PageSection { id: string; label: string }

interface Props {
    mobileNavRef: React.RefObject<HTMLDivElement | null>;
    mobileNavOpen: boolean;
    setMobileNavOpen: (v: boolean) => void;
    framework: Framework;
    fwParam?: string;
    activeSection: string;
    onThisPage: PageSection[];
    onNavClick: (id: string) => void;
    onFrameworkSwitch: (fw: Framework) => void;
}

export default function DocsMobileNav({
    mobileNavRef, mobileNavOpen, setMobileNavOpen,
    framework, fwParam, activeSection, onThisPage, onNavClick, onFrameworkSwitch,
}: Props) {
    const frameworkListRef = useRef<HTMLDivElement | null>(null);

    // Scroll active framework into view when mobile menu opens
    useEffect(() => {
        if (mobileNavOpen && frameworkListRef.current) {
            const activeEl = frameworkListRef.current.querySelector<HTMLElement>('[data-active="true"]');
            if (activeEl) {
                activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
    }, [mobileNavOpen, framework]);

    // Only render floating bottom bar on framework routes (/docs/:framework), NOT on base /docs page
    if (!fwParam) return null;

    const selectedFw = FRAMEWORKS.find((f) => f.id === framework) || FRAMEWORKS[0];

    return (
        <div
            ref={mobileNavRef}
            className="lg:hidden fixed bottom-6 left-6 right-6 z-40 bg-[var(--dropdown-bg)] backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.16)] overflow-hidden"
        >
            {mobileNavOpen && (
                <div className="px-4 pt-4 pb-3 max-h-[50vh] overflow-y-auto bg-[var(--dropdown-bg)]">
                    {/* Framework switch */}
                    <div className="mb-4">
                        <h3 className="text-[10px] font-semibold text-text-base/40 uppercase tracking-wider mb-1.5 px-1">Framework</h3>
                        <div ref={frameworkListRef} className="flex gap-2 overflow-x-auto pb-3 whitespace-nowrap scrollbar-none">
                            {FRAMEWORKS.map((fw) => {
                                const isActive = framework === fw.id;
                                return (
                                    <button
                                        key={fw.id}
                                        data-active={isActive}
                                        onClick={() => onFrameworkSwitch(fw.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors shrink-0 cursor-pointer ${
                                            isActive ? 'bg-text-base/10 text-text-base' : 'text-text-base/40 hover:text-text-base/60'
                                        }`}
                                    >
                                        <FrameworkIcon id={fw.id} size={16} />
                                        {fw.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Nav items */}
                    <div className="flex flex-col gap-1">
                        {onThisPage.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavClick(item.id)}
                                className={`w-full text-left px-3.5 py-2.5 rounded-full text-[14px] font-medium transition-colors flex items-center gap-2.5 cursor-pointer ${
                                    activeSection === item.id
                                        ? 'text-[#9B8AFB] bg-text-base/4'
                                        : 'text-text-base/50 hover:text-text-base/70 hover:bg-text-base/2'
                                }`}
                            >
                                {activeSection === item.id && <span className="w-1.5 h-1.5 rounded-full bg-[#9B8AFB] shrink-0" />}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-text-base/60 cursor-pointer select-none"
            >
                <div className="flex items-center gap-2.5">
                    <FrameworkIcon id={framework} size={18} />
                    <span className="text-text-base/80 font-medium text-[14px]">{selectedFw.label}</span>
                </div>
                <ChevronExpandY className="w-4.5 h-4.5 text-text-base/40" />
            </button>
        </div>
    );
}
