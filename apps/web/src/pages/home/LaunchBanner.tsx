import { useState } from 'react';
import { SiFlutter } from 'react-icons/si';

const BANNER_KEY = 'reicon-launch-banner-v4';

export default function LaunchBanner() {
    const [dismissed, setDismissed] = useState(() => {
        try { return localStorage.getItem(BANNER_KEY) === 'dismissed'; }
        catch { return false; }
    });

    if (dismissed) return null;

    const dismiss = () => {
        setDismissed(true);
        try { localStorage.setItem(BANNER_KEY, 'dismissed'); } catch { }
    };

    return (
        <div className="relative z-[300] flex items-center justify-center px-10 py-1.5 bg-bg-base transition-colors duration-300">
            {/* Desktop */}
            <span className="hidden sm:inline-flex items-center gap-2 text-[13px] text-text-base/45">
                <SiFlutter size={12} />
                <a href="/docs/flutter" className="hover:text-text-base/70 transition-colors cursor-pointer">
                    Flutter package is live
                </a>
                <span className="text-text-base/15">·</span>
                <span className="font-mono text-[11px] bg-text-base/8 px-2 py-0.5 rounded text-text-base/40">dart pub add reicon_flutter</span>
                <a href="/docs/flutter" className="text-text-base/50 hover:text-text-base/80 transition-colors underline underline-offset-2 decoration-text-base/20 cursor-pointer">
                    Get started
                </a>
            </span>

            {/* Mobile */}
            <a href="/docs/flutter" className="inline-flex sm:hidden items-center gap-1.5 text-[12px] text-text-base/45 hover:text-text-base/65 transition-colors cursor-pointer">
                <SiFlutter size={12} />
                <span>Flutter package is live</span>
            </a>

            <button
                onClick={dismiss}
                aria-label="Dismiss"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-base/80 hover:text-text-base/55 transition-colors cursor-pointer"
                style={{ background: 'none', border: 'none', display: 'flex', padding: '4px' }}
            >
                <re-icon icon="x" size="12" color="currentColor" />
            </button>
        </div>
    );
}
