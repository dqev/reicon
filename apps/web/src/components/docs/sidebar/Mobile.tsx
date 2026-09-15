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
    const selectedFw = FRAMEWORKS.find((f) => f.id === framework)!;

    return (
        <div
            ref={mobileNavRef}
            className="lg:hidden fixed bottom-6 left-6 right-6 z-40 bg-[var(--dropdown-bg)] backdrop-blur-xl rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.16)] overflow-hidden transition-all duration-300"
        >
            {mobileNavOpen && (
                <div className="px-4 pt-4 pb-3 max-h-[50vh] overflow-y-auto border-b border-text-base/5 bg-[var(--dropdown-bg)]">
                    {/* Framework switch */}
                    <div className="mb-4">
                        <h3 className="text-[10px] font-semibold text-text-base/40 uppercase tracking-wider mb-1.5 px-1">Framework</h3>
                        <div className="flex gap-2 overflow-x-auto pb-3 whitespace-nowrap scrollbar-none">
                            {FRAMEWORKS.map((fw) => (
                                <button
                                    key={fw.id}
                                    onClick={() => onFrameworkSwitch(fw.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shrink-0 cursor-pointer ${framework === fw.id ? 'bg-text-base/10 text-text-base' : 'text-text-base/40 hover:text-text-base/60'
                                        }`}
                                >
                                    <FrameworkIcon id={fw.id} size={16} />
                                    {fw.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Nav items */}
                    <div className="flex flex-col gap-1">
                        {onThisPage.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavClick(item.id)}
                                className={`w-full text-left px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors flex items-center gap-2.5 cursor-pointer ${activeSection === item.id
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
                className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-text-base/60 cursor-pointer"
            >
                <div className="flex items-center gap-2">
                    {fwParam ? (
                        <>
                            <FrameworkIcon id={framework} size={16} />
                            <span className="text-text-base/80 font-medium">{selectedFw.label}</span>
                        </>
                    ) : (
                        <>
                            <re-icon icon="code" size={16} className="text-text-base/40" />
                            <span className="text-text-base/40 font-medium">Select</span>
                        </>
                    )}
                </div>
                <ChevronExpandY className="w-4 h-4 text-text-base/40" />
            </button>
        </div>
    );
}
