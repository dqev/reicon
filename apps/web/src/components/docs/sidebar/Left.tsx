import { useState, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronExpandY } from 'reicon-react';
import { FrameworkIcon } from '../framework/icons';
import { FRAMEWORKS, NAV_ITEMS, Framework } from '../framework/constants';

interface NavItem { id: string; label: string }

interface Props {
    framework: Framework;
    fwParam?: string;
    frameworkSectionId: string;
    frameworkLabel: string;
    dropdownOpen: boolean;
    setDropdownOpen: (v: boolean) => void;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    introItems: NavItem[];
    activeSection: string;
    onNavClick: (id: string) => void;
    onFrameworkSwitch: (fw: Framework) => void;
}

export default function DocsLeftSidebar({
    framework, fwParam, frameworkSectionId, frameworkLabel,
    dropdownOpen, setDropdownOpen, dropdownRef,
    introItems, activeSection, onNavClick, onFrameworkSwitch,
}: Props) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const selectedFw = FRAMEWORKS.find((f) => f.id === framework)!;

    const allVisibleItems: NavItem[] = useMemo(() => [
        ...introItems,
        { id: frameworkSectionId, label: frameworkLabel },
        ...NAV_ITEMS.basics,
        ...NAV_ITEMS.guides,
        ...NAV_ITEMS.advanced,
    ], [introItems, frameworkSectionId, frameworkLabel]);

    const renderNavItem = (item: NavItem) => {
        const isActive = activeSection === item.id;
        return (
            <div
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
                <span className="sidebar-item-text">
                    {item.label}
                </span>
            </div>
        );
    };

    return (
        <aside id="docs-sidebar" className="hidden lg:block" data-lenis-prevent>
            {/* Getting Started */}
            <div className="reicon-sidebar-group">
                <div className="sidebar-section-header">
                    <div className="sidebar-icon-box">
                        <re-icon icon="compass" size="13" />
                    </div>
                    <span>Getting Started</span>
                </div>
                <div className="sidebar-items-container">
                    <div className="sidebar-section-line" />
                    {introItems.map(renderNavItem)}
                </div>
            </div>

            {/* Framework Dropdown */}
            <div className="reicon-sidebar-group">
                <div className="sidebar-section-header">
                    <div className="sidebar-icon-box">
                        <re-icon icon="code" size="13" />
                    </div>
                    <span>Framework</span>
                </div>
                <div className="sidebar-items-container">
                    <div className="sidebar-section-line" />
                    <div ref={dropdownRef} className="relative mb-2 pl-6 pr-1">
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
                            <div className="absolute top-full left-6 right-1 mt-1 bg-[var(--dropdown-bg)] border border-text-base/10 rounded-xl shadow-none overflow-hidden z-50">
                                {FRAMEWORKS.map((fw) => (
                                    <button
                                        key={fw.id}
                                        onClick={() => onFrameworkSwitch(fw.id)}
                                        className={`w-full flex items-center justify-between px-3 py-2 text-[12px] transition-colors cursor-pointer ${framework === fw.id ? 'bg-text-base/6 text-text-base' : 'text-text-base/60 hover:bg-text-base/4 hover:text-text-base/80'
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

                    {renderNavItem({ id: frameworkSectionId, label: frameworkLabel })}
                </div>
            </div>

            {/* Basics */}
            <div className="reicon-sidebar-group">
                <div className="sidebar-section-header">
                    <div className="sidebar-icon-box">
                        <re-icon icon="settings" size="13" />
                    </div>
                    <span>Basics</span>
                </div>
                <div className="sidebar-items-container">
                    <div className="sidebar-section-line" />
                    {NAV_ITEMS.basics.map(renderNavItem)}
                </div>
            </div>

            {/* Guides */}
            <div className="reicon-sidebar-group">
                <div className="sidebar-section-header">
                    <div className="sidebar-icon-box">
                        <re-icon icon="palette" size="13" />
                    </div>
                    <span>Guides</span>
                </div>
                <div className="sidebar-items-container">
                    <div className="sidebar-section-line" />
                    {NAV_ITEMS.guides.map(renderNavItem)}
                </div>
            </div>

            {/* Advanced */}
            <div className="reicon-sidebar-group">
                <div className="sidebar-section-header">
                    <div className="sidebar-icon-box">
                        <re-icon icon="help-circle" size="13" />
                    </div>
                    <span>Advanced</span>
                </div>
                <div className="sidebar-items-container">
                    <div className="sidebar-section-line" />
                    {NAV_ITEMS.advanced.map(renderNavItem)}
                </div>
            </div>
        </aside>
    );
}
