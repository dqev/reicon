import { useState, useEffect, useMemo } from 'react';
import { loadIconData } from '@/lib/icon-data';
import { waitForReicon } from '@/lib/reicon-loader';
import PlaygroundPreview from './playground/PlaygroundPreview';
import PlaygroundControls from './playground/PlaygroundControls';
import PlaygroundCode from './playground/PlaygroundCode';

const CONSISTENCY_COUNT = 80;
const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export default function Playground({ theme }: { theme?: string }) {
  const [iconNames, setIconNames] = useState<Record<string, string>>({});
  const [icons, setIcons] = useState<string[]>(['home']);
  const [selected, setSelected] = useState('home');
  const [color, setColor] = useState('#ffffff');
  const [size, setSize] = useState(80);
  const [weight, setWeight] = useState<'outline' | 'filled'>('outline');

  const allIconNames = useMemo(() => Object.keys(iconNames), [iconNames]);

  const initialShuffled = useMemo(() => {
    if (allIconNames.length === 0) return ['home'];
    const shuffled = [...allIconNames];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, CONSISTENCY_COUNT);
  }, [allIconNames]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await loadIconData();
        if (!active) return;
        setIconNames(data.iconNames);
      } catch {}
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (allIconNames.length === 0) return;
    setIcons(initialShuffled);
    setSelected(prev => initialShuffled.includes(prev) ? prev : initialShuffled[0]);
  }, [initialShuffled]);

  useEffect(() => {
    if (allIconNames.length === 0) return;
    let active = true;
    (async () => {
      try {
        await waitForReicon();
        if (!active) return;
        const available = (window as any).Reicon?.icons as string[] | undefined;
        if (!available) return;
        const availableSet = new Set(available);
        const filtered = initialShuffled.filter((n) => availableSet.has(n));
        if (filtered.length < CONSISTENCY_COUNT && available.length > 0) {
          const remaining = available.filter((n) => !filtered.includes(n));
          const shuffled = [...remaining];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          filtered.push(...shuffled.slice(0, CONSISTENCY_COUNT - filtered.length));
        }
        const finalIcons = filtered.slice(0, CONSISTENCY_COUNT);
        setIcons(finalIcons);
        if (!availableSet.has(selected) && finalIcons.length > 0) setSelected(finalIcons[0]);
      } catch {}
    })();
    return () => { active = false; };
  }, [initialShuffled, selected]);

  const displayColor = HEX_RE.test(color) ? color : '#ffffff';
  const pascalName = iconNames[selected] || selected;
  const reset = () => { setColor('#ffffff'); setSize(80); setWeight('outline'); };

  return (
    <section className="reveal max-w-[1160px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-16">
      <h2 className="font-sans font-normal text-[22px] sm:text-[26px] text-[#fefefe] tracking-[-0.02em] text-center mb-12 sm:mb-16">
        Playground
      </h2>

      <div className="bg-[#181818] rounded-[24px] card-inset overflow-hidden p-5 sm:p-6 md:p-7">
        <div className="grid lg:grid-cols-[290px_1fr] gap-6 lg:gap-8">
          <div className="flex flex-col gap-4 lg:border-r border-white/[0.06] lg:pr-6">
            <PlaygroundPreview
              selected={selected}
              size={size}
              weight={weight}
              displayColor={displayColor}
              pascalName={pascalName}
            />
            <PlaygroundControls
              color={color}
              onChangeColor={setColor}
              size={size}
              onChangeSize={setSize}
              weight={weight}
              onChangeWeight={setWeight}
              onReset={reset}
            />
          </div>
          <div className="flex flex-col justify-between">
            <PlaygroundCode
              selected={selected}
              icons={icons}
              pascalName={pascalName}
              size={size}
              weight={weight}
              displayColor={displayColor}
              onSelect={setSelected}
              iconNamesData={iconNames}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

