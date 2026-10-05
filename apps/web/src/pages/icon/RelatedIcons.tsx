import IconCard from '@/components/ui/IconCard';
import { Highlight } from '@/components/ui/Highlight';
import { IconTooltipProvider } from '@/components/ui/IconTooltip';

interface RelatedIconsProps {
  relatedIcons: string[];
  weight?: string;
}

export default function RelatedIcons({ relatedIcons, weight = 'outline' }: RelatedIconsProps) {
  if (!relatedIcons || relatedIcons.length === 0) return null;

  return (
    <section className="max-w-[1240px] mx-auto w-full px-5 md:px-10 pb-20 mt-16 border-t border-white/[0.06] pt-14 relative z-20">
      <h2 className="text-xl font-display font-medium text-white mb-6 tracking-tight">Related icons</h2>
      <IconTooltipProvider openDelay={100} closeDelay={120}>
        <Highlight className="absolute inset-0 rounded-2xl sm:rounded-[18px] border border-white/[0.08] bg-white/[0.04] pointer-events-none">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-2 sm:gap-2.5">
            {relatedIcons.map((iconName) => (
              <IconCard key={iconName} name={iconName} weight={weight} size={32} />
            ))}
          </div>
        </Highlight>
      </IconTooltipProvider>
    </section>
  );
}
