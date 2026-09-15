import { motion, AnimatePresence } from 'motion/react';
import type { ReactNode } from 'react';

interface FaqItemProps {
  id: string;
  question: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function FaqItem({ id, question, open, onToggle, children }: FaqItemProps) {
  return (
    <div id={id} data-section className="scroll-mt-24">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        className="flex items-center justify-between w-full text-left group cursor-pointer"
      >
        <h2 className="text-xl font-serif text-text-base mb-0">{question}</h2>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 text-text-base/40 transition-transform duration-200 shrink-0 ml-4 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${id}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-6 text-text-base/60 text-[15px] leading-[1.8]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
