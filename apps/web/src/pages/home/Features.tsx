import { ShieldCheck, Code, Palette, Layers, HandHeart, Box } from 'reicon-react';

function FeatureBlock({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="bg-text-base/3 rounded-[14px] p-[34px_30px]">
            <div className="w-10 h-10 rounded-[10px] bg-text-base/6 flex items-center justify-center text-[#9B8AFB] text-[18px] mb-4">
                {icon}
            </div>
            <h3 className="text-[14px] font-semibold text-text-base mb-[7px]">{title}</h3>
            <p className="text-[13px] text-text-base/45 leading-[1.65]">{description}</p>
        </div>
    );
}

export default function Features() {
    return (
        <section id="features" className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
            <div className="text-center mb-14">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9B8AFB] mb-2">Why Reicon</div>
                <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] text-text-base leading-[1.15] tracking-[-0.02em] mb-3">Built different. By design.</h2>
                <p className="text-[15px] text-text-base/45 leading-[1.65] max-w-[490px] mx-auto">
                    Every icon is hand-drawn on a precise grid. No auto-tracing, no AI shortcuts — just obsessive attention to detail.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
                <FeatureBlock icon={<Layers size={20} />} title="Pixel Perfect" description="Every icon snaps to a 24×24 grid. Crisp at any size, from 12px to 64px and beyond." />
                <FeatureBlock icon={<HandHeart size={20} />} title="Handcrafted" description="No auto-generation. Each icon is manually designed, reviewed, and refined for visual consistency." />
                <FeatureBlock icon={<ShieldCheck size={20} />} title="Open Source" description="MIT licensed. Use in personal and commercial projects. Free forever, no strings attached." />
                <FeatureBlock icon={<Code size={20} />} title="Tree Shakeable" description="Import only what you need. Your bundle only includes the icons you actually use." />
                <FeatureBlock icon={<Palette size={20} />} title="Two Weights" description="Outline and Filled variants for every icon. Switch with a single prop change." />
                <FeatureBlock icon={<Box size={20} />} title="Zero Dependencies" description="Lightweight and self-contained. No external runtime dependencies to worry about." />
            </div>
        </section>
    );
}
