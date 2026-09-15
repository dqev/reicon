import { useRef } from 'react';
import { ChevronExpandY } from 'reicon-react';
import { FrameworkIcon } from './icons';
import { FRAMEWORKS, Framework } from './constants';

interface Props {
    framework: Framework;
    dropdownOpen: boolean;
    setDropdownOpen: (open: boolean) => void;
    onFrameworkChange: (fw: Framework) => void;
    fwParam?: string;
}

export default function FrameworkSelector({
    framework,
    dropdownOpen,
    setDropdownOpen,
    onFrameworkChange,
    fwParam
}: Props) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedFw = FRAMEWORKS.find((f) => f.id === framework)!;

    return (
        <div className="mt-4">
            <div className="sidebar-separator">
                <re-icon icon="code" size="12" />
                <span>Framework</span>
            </div>
            <div ref={dropdownRef} className="relative mb-2 px-3">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-text-base/10 bg-text-base/3 hover:bg-text-base/6 transition-colors cursor-pointer"
                >
                    <div className="flex items-center gap-2">
                        {fwParam ? (
                            <>
                                <FrameworkIcon id={selectedFw.id} size={14} />
                                <span className="text-[12px] text-text-base/80 font-medium">{selectedFw.label}</span>
                            </>
                        ) : (
                            <>
                                <re-icon icon="code" size="14" className="text-text-base/40" />
                                <span className="text-[12px] text-text-base/40 font-medium">Select</span>
                            </>
                        )}
                    </div>
                    <ChevronExpandY className="w-3.5 h-3.5 text-text-base/30" />
                </button>

                {dropdownOpen && (
                    <div className="absolute top-full left-3 right-3 mt-1 bg-[var(--dropdown-bg)] border border-text-base/10 rounded-xl shadow-none overflow-hidden z-50">
                        {FRAMEWORKS.map((fw) => (
                            <button
                                key={fw.id}
                                onClick={() => onFrameworkChange(fw.id)}
                                className={`w-full flex items-center justify-between px-3 py-2 text-[12px] transition-colors cursor-pointer ${framework === fw.id
                                    ? 'bg-text-base/6 text-text-base'
                                    : 'text-text-base/60 hover:bg-text-base/4 hover:text-text-base/80'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <FrameworkIcon id={fw.id} size={14} />
                                    <span className={framework === fw.id ? 'font-medium' : ''}>{fw.label}</span>
                                </div>
                                {framework === fw.id && (
                                    <svg className="w-3.5 h-3.5 text-[#9B8AFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
