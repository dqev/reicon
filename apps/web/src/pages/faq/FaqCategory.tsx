import type { ReactNode } from 'react';
import FaqItem from './FaqItem';

interface FaqItemData {
  id: string;
  question: string;
  answer: ReactNode;
}

interface FaqCategoryProps {
  title: string;
  icon: string;
  items: FaqItemData[];
  openItems: Set<string>;
  onToggle: (id: string) => void;
}

export default function FaqCategory({ title, icon, items, openItems, onToggle }: FaqCategoryProps) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-6 text-text-base/40 text-xs font-medium uppercase tracking-widest">
        <re-icon icon={icon} size="12" />
        <span>{title}</span>
      </div>
      <div className="divide-y divide-text-base/6">
        {items.map((item) => (
          <div key={item.id} className="py-6 first:pt-0 last:pb-0">
            <FaqItem
              id={item.id}
              question={item.question}
              open={openItems.has(item.id)}
              onToggle={() => onToggle(item.id)}
            >
              {item.answer}
            </FaqItem>
          </div>
        ))}
      </div>
    </div>
  );
}
