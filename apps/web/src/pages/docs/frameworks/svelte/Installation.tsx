import InstallTabs from '@/components/docs/InstallTabs';

interface Props {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function Installation({ copiedField, onCopy }: Props) {
  return (
    <>
      <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Installation</h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Install the package using your preferred package manager.
      </p>

      <InstallTabs
        packageName="reicon-svelte"
        copiedField={copiedField}
        onCopy={onCopy}
      />
    </>
  );
}
