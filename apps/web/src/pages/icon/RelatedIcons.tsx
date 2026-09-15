import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { EASE } from './utils';

interface RelatedIconsProps {
  relatedIcons: string[];
}

export default function RelatedIcons({ relatedIcons }: RelatedIconsProps) {
  if (!relatedIcons || relatedIcons.length === 0) return null;

  return (
    <section className="max-w-[1160px] mx-auto w-full px-5 md:px-10 pb-16 mt-12 border-t border-text-base/8 pt-12 relative z-20 bg-bg-base">
      <h2 className="text-lg font-serif text-text-base mb-6">Related icons</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
        {relatedIcons.map((iconName, i) => (
          <motion.div
            key={iconName}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.025, 0.3), ease: EASE }}
          >
            <Link
              to={`/icon/${iconName}`}
              className="flex flex-col items-center justify-between p-3 aspect-square rounded-xl bg-text-base/3 border border-text-base/6 hover:bg-text-base/6 hover:border-text-base/15 transition-all group"
              title={`${iconName} icon`}
            >
              <div className="flex-1 flex items-center justify-center w-full my-auto">
                <re-icon
                  icon={iconName}
                  size="28"
                  color="currentColor"
                  className="text-text-base/70 group-hover:text-text-base group-hover:scale-110 transition-all duration-150"
                  aria-label={`${iconName} icon`}
                />
              </div>
              <span className="text-[11px] text-text-base/50 group-hover:text-text-base truncate w-full text-center font-medium transition-colors mt-1">
                {iconName}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
