import SyntaxBlock from '@/components/docs/SyntaxBlock';
import { TroubleshootingItemData } from './data';

interface TroubleshootingItemProps {
  item: TroubleshootingItemData;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function TroubleshootingItem({ item, copiedField, onCopy }: TroubleshootingItemProps) {
  return (
    <>
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">{item.question}</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">{item.answer}</p>
      <SyntaxBlock
        title="Fix"
        onCopy={() => onCopy(item.copyText, item.copyField)}
        copied={copiedField === item.copyField}
      >
        {item.syntaxNode ? item.syntaxNode : <span className="text-text-base/70">{item.copyText}</span>}
      </SyntaxBlock>
    </>
  );
}
