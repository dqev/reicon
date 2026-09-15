import { Copy } from 'reicon-react';
import { useState } from 'react';

export default function PlaygroundCode({
    selected,
    size,
    weight,
    displayColor,
    icons,
    onSelect,
    pascalName,
    iconNamesData,
}: {
    selected: string;
    size: number;
    weight: 'outline' | 'filled';
    displayColor: string;
    icons: string[];
    onSelect: (name: string) => void;
    pascalName: string;
    iconNamesData: Record<string, string>;
}) {
    const markup = `<re-icon icon="${selected}" size={${size}} weight="${weight}" color="${displayColor}" />`;
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(markup);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="flex flex-col gap-4">
            <div>
                <span className="text-[11px] uppercase tracking-[0.08em] text-text-base/30 font-semibold mb-3 block">Icons</span>
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 border-l border-t border-text-base/4 rounded-xl overflow-hidden">
                    {icons.map((name) => (
                        <button
                            key={name}
                            onClick={() => onSelect(name)}
                            title={(iconNamesData || {})[name] || name}
                            className={`aspect-square flex items-center justify-center border-r border-b border-text-base/4 transition-colors cursor-pointer ${name === selected
                                ? 'bg-[#9B8AFB]/10'
                                : 'hover:bg-text-base/3'
                                }`}
                        >
                            <re-icon icon={name} size={size} weight={weight} color={displayColor} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
