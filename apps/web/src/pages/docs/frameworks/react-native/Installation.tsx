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
                Install both <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-react-native</code> and <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">react-native-svg</code> as the package requires SVG support.
            </p>

            <InstallTabs
                packageName="reicon-react-native react-native-svg"
                copiedField={copiedField}
                onCopy={onCopy}
            />

            <div className="mt-4 bg-[#61DAFB]/5 border border-[#61DAFB]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
                <span className="text-[#61DAFB] font-medium">For Expo:</span> Run <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">npx expo install react-native-svg</code> instead.
            </div>

            <div className="mt-4 bg-[#61DAFB]/5 border border-[#61DAFB]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
                <span className="text-[#61DAFB] font-medium">For iOS:</span> After installing, run <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">cd ios && pod install</code> to link native dependencies.
            </div>
        </>
    );
}
