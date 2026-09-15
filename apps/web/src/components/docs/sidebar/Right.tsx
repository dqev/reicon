interface PageSection { id: string; label: string }

interface Props {
    onThisPage: PageSection[];
    activeSection: string;
    otpIndicatorStyle: { top: number; height: number; opacity: number };
    otpListRef: React.RefObject<HTMLUListElement | null>;
    onNavClick: (id: string) => void;
}

export default function DocsRightSidebar({
    onThisPage, activeSection, otpIndicatorStyle, otpListRef, onNavClick,
}: Props) {

    return (
        <aside id="otp-sidebar" className="hidden xl:block" data-lenis-prevent>
            <div className="reicon-sidebar-group">
                <div className="sidebar-section-header">
                    <div className="sidebar-icon-box">
                        <re-icon icon="list" size="13" />
                    </div>
                    <span>On this page</span>
                </div>
                <div className="sidebar-items-container">
                    <div className="sidebar-section-line" />
                    {onThisPage.map((s) => {
                        const isActive = activeSection === s.id;
                        return (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => onNavClick(s.id)}
                                className={`sidebar-item ${isActive ? 'active' : ''}`}
                            >
                                <span className="truncate">{s.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}
