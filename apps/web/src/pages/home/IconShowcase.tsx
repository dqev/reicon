export interface OrbitIcon {
  name: string;
}

const ORBIT_INNER: OrbitIcon[] = [
  { name: 'home' },
  { name: 'star' },
  { name: 'search' },
  { name: 'heart' },
  { name: 'bell' },
  { name: 'user' },
];

const ORBIT_MIDDLE: OrbitIcon[] = [
  { name: 'camera' },
  { name: 'lightning' },
  { name: 'palette' },
  { name: 'code' },
  { name: 'folder' },
  { name: 'shield' },
  { name: 'cart' },
  { name: 'calendar' },
];

const ORBIT_OUTER: OrbitIcon[] = [
  { name: 'compass' },
  { name: 'wifi' },
  { name: 'pen' },
  { name: 'lamp' },
  { name: 'flag' },
  { name: 'rocket' },
  { name: 'lock' },
  { name: 'globe' },
  { name: 'music' },
  { name: 'eye' },
];

function OrbitRing({ items, className, counterClassName, size }: {
    items: OrbitIcon[];
    className: string;
    counterClassName: string;
    size: string;
}) {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className={`relative ${size} aspect-square ${className}`}>
                {items.map((item, i) => {
                    const rad = ((360 / items.length) * i * Math.PI) / 180;
                    const x = 50 + 50 * Math.cos(rad);
                    const y = 50 + 50 * Math.sin(rad);
                    return (
                        <div key={item.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: `${y}%`, left: `${x}%` }}>
                            <div className={`w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-text-base/4 border border-text-base/6 flex items-center justify-center shadow-2xs hover:scale-110 hover:border-[#9B8AFB]/40 transition-all duration-200 ${counterClassName}`} title={item.name}>
                                <re-icon icon={item.name} size={18} color="currentColor" className="text-text-base/70 sm:hidden" weight="outline" />
                                <re-icon icon={item.name} size={22} color="currentColor" className="text-text-base/70 hidden sm:block" weight="outline" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function IconShowcase({ theme: _theme }: { theme: string }) {
    return (
        <section className="reveal max-w-[1160px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-16 overflow-hidden sm:overflow-visible">
            <div className="text-center mb-8 sm:mb-12 px-4">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9B8AFB] mb-2">Icon Library</div>
                <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] text-text-base leading-[1.15] tracking-[-0.02em] mb-3">2,700+ handcrafted icons.</h2>
                <p className="text-[14px] sm:text-[15px] text-text-base/45 leading-[1.65] max-w-[490px] mx-auto">
                    From UI essentials to developer tools — pixel-perfect vector icons for every interface.
                </p>
            </div>

            <div className="relative w-full aspect-square max-w-[480px] sm:max-w-[580px] md:max-w-[620px] mx-auto sm:[mask-image:radial-gradient(circle,black_70%,transparent_100%)] overflow-hidden sm:overflow-visible">
                {/* Clean borderless center logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <img
                        src="/favicon/favicon.svg"
                        alt="Reicon"
                        loading="lazy"
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain drop-shadow-md select-none pointer-events-none"
                    />
                </div>

                {/* Ambient Soft Glow Behind Center Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-44 sm:h-44 bg-[#9B8AFB]/15 rounded-full blur-2xl pointer-events-none" />

                {/* Ring guides fading from inner (0.18) to outer (0.04) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[38%] aspect-square rounded-full border border-[#9B8AFB]/[0.18]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[66%] aspect-square rounded-full border border-[#9B8AFB]/[0.10]" />
                </div>
                <div className="hidden sm:flex absolute inset-0 items-center justify-center pointer-events-none">
                    <div className="w-[90%] aspect-square rounded-full border border-[#9B8AFB]/[0.04]" />
                </div>

                {/* Inner orbit */}
                <OrbitRing items={ORBIT_INNER} size="w-[38%]" className="animate-orbit-slow" counterClassName="animate-orbit-counter-slow" />
                
                {/* Middle orbit */}
                <OrbitRing items={ORBIT_MIDDLE} size="w-[66%]" className="animate-orbit-mid" counterClassName="animate-orbit-counter-mid" />

                {/* Outer orbit (desktop only for clean mobile spacing) */}
                <div className="hidden sm:block absolute inset-0">
                    <OrbitRing items={ORBIT_OUTER} size="w-[90%]" className="animate-orbit-fast" counterClassName="animate-orbit-counter-fast" />
                </div>
            </div>
        </section>
    );
}
