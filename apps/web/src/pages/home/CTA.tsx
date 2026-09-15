import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Search3, Copy, Pointer } from 'reicon-react';
import ClayButton from '@/components/ui/Button';

const PACKAGES = [
    'reicon',
    'reicon-react',
    'reicon-react-native',
    'reicon-vue',
    'reicon-svelte',
    'reicon-mcp',
];

const TRANSITION = 'filter 0.28s ease, opacity 0.28s ease, transform 0.28s ease';

function AnimatedPackageName({ onIndexChange }: { onIndexChange: (i: number) => void }) {
    const [index, setIndex] = useState(0);
    // Three visual states: shown | exitingUp | enterFromBelow
    const [shown, setShown] = useState(true);
    const [enterFromBelow, setEnterFromBelow] = useState(false);

    useEffect(() => {
        // Hold visible for 2.2s then begin exit
        const holdTimer = setTimeout(() => {
            setShown(false); // blur out, slide up

            // After transition completes, swap text and reposition below (no transition)
            const swapTimer = setTimeout(() => {
                const next = (index + 1) % PACKAGES.length;
                setIndex(next);
                onIndexChange(next);
                setEnterFromBelow(true); // snap to below — no animation yet

                // Next paint: animate in from below
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setEnterFromBelow(false);
                        setShown(true);
                    });
                });
            }, 310); // just after 0.28s transition

            return () => clearTimeout(swapTimer);
        }, 2200);

        return () => clearTimeout(holdTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    // enterFromBelow = instantly snap below with NO transition (so it starts from there)
    const noTransition = enterFromBelow;
    const blurred = !shown || enterFromBelow;
    let translateY = '0px';
    if (!shown && !enterFromBelow) translateY = '-7px'; // exit goes up
    if (enterFromBelow) translateY = '7px';             // enter starts from below

    return (
        <span
            style={{
                display: 'inline-block',
                transition: noTransition ? 'none' : TRANSITION,
                filter: blurred ? 'blur(8px)' : 'blur(0px)',
                opacity: blurred ? 0 : 1,
                transform: `translateY(${translateY})`,
                willChange: 'filter, opacity, transform',
            }}
        >
            {PACKAGES[index]}
        </span>
    );
}

function CopyButton({ getText }: { getText: () => string }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() =>
                navigator.clipboard.writeText(getText()).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                })
            }
            className="text-text-base/30 hover:text-text-base/60 transition-colors cursor-pointer shrink-0"
        >
            {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                </svg>
            ) : (
                <Copy size={14} />
            )}
        </button>
    );
}

export default function CTA() {
    const [pkgIndex, setPkgIndex] = useState(0);

    return (
        <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
            <div className="relative bg-text-base/3 rounded-[14px] overflow-hidden">
                <div className="absolute -top-10 -left-10 md:-top-14 md:-left-14 pointer-events-none select-none opacity-[0.04] rotate-[195deg]">
                    <re-icon icon="scribble" size={180} color="currentColor" weight="outline" className="block md:hidden" />
                    <re-icon icon="scribble" size={300} color="currentColor" weight="outline" className="hidden md:block" />
                </div>
                <div className="absolute -bottom-10 -right-10 md:-bottom-14 md:-right-14 pointer-events-none select-none opacity-[0.04] rotate-[15deg]">
                    <re-icon icon="scribble" size={180} color="currentColor" weight="outline" className="block md:hidden" />
                    <re-icon icon="scribble" size={300} color="currentColor" weight="outline" className="hidden md:block" />
                </div>

                <div className="relative z-10 py-14 md:py-20 px-6 md:px-14 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="font-serif text-[clamp(24px,3.2vw,42px)] text-text-base leading-[1.12] tracking-[-0.02em] mb-3">
                            Your next project<br className="hidden md:block" /> deserves better icons.
                        </h2>
                        <p className="text-[15px] text-text-base/40 leading-[1.65] max-w-[420px] mx-auto md:mx-0 mb-6">
                            2700+ handcrafted, pixel-perfect SVG icons. MIT licensed. Zero dependencies. Two weights. Ready to ship.
                        </p>

                        {/* Animated install pill */}
                        <div className="inline-flex items-center gap-3 bg-text-base/4 border border-text-base/6 rounded-xl px-4 py-2.5">
                            <span className="text-[#9B8AFB] text-[13px] font-mono font-medium shrink-0">$</span>
                            <code className="text-[13px] font-mono text-text-base/50 whitespace-nowrap">
                                <span className="text-text-base/35">npm i </span>
                                <AnimatedPackageName onIndexChange={setPkgIndex} />
                            </code>
                            <CopyButton getText={() => `npm i ${PACKAGES[pkgIndex]}`} />
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                        <ClayButton to="/icons" variant="primary" className="w-full justify-center">
                            <Search3 size={16} />
                            Browse 2700+ Icons
                        </ClayButton>
                        <a
                            href="https://github.com/dqev/reicon"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full justify-center bg-text-base/5 text-text-base border border-text-base/10 px-7 py-3 rounded-full font-medium text-[14px] hover:bg-text-base/10 active:scale-[0.97] transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                            <Star size={15} />
                            Star on GitHub
                        </a>
                        <Link to="/docs" className="w-full justify-center inline-flex items-center gap-1.5 text-[13px] text-text-base/30 hover:text-text-base/60 transition-colors mt-1">
                            Read the docs
                            <Pointer size={13} className="-rotate-10" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
