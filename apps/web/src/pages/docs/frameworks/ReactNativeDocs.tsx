import { FaReact } from 'react-icons/fa';
import SectionHeader from '@/components/docs/SectionHeader';
import Installation from './react-native/Installation';
import BasicUsage from './react-native/BasicUsage';
import ComponentApi from './react-native/ComponentApi';
import Theming from './react-native/Theming';

interface Props {
    markdownContent: string;
    copiedField: string | null;
    onCopy: (text: string, field: string) => void;
}

export default function ReactNativeDocs({ markdownContent, copiedField, onCopy }: Props) {
    return (
        <section id="react-native-docs" data-section className="mb-16 scroll-mt-24">
            <SectionHeader
                id="react-native-docs"
                title="React Native"
                level="h2"
                markdownContent={markdownContent}
                icon={<FaReact className="text-[#61DAFB]" size={30} />}
            />

            <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
                The official React Native package for Reicon. Import beautifully crafted icons as React Native components with full TypeScript support and react-native-svg integration. All icons are tree-shakeable, ensuring only the icons you use end up in your bundle.
            </p>

            <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
            <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
                <li>Import icons as individual React Native components</li>
                <li>Customize size, color, and weight via props</li>
                <li>Tree-shake unused icons to keep bundle sizes minimal</li>
                <li>Full TypeScript support with autocompletion</li>
                <li>Works with Expo and bare React Native projects</li>
                <li>Supports iOS and Android platforms</li>
            </ul>

            <Installation copiedField={copiedField} onCopy={onCopy} />
            <BasicUsage onCopy={onCopy} copiedField={copiedField} />
            <ComponentApi onCopy={onCopy} copiedField={copiedField} />
            <Theming onCopy={onCopy} copiedField={copiedField} />

            <div className="mt-6 bg-[#61DAFB]/5 border border-[#61DAFB]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
                <span className="text-[#61DAFB] font-medium">Note:</span> All icons work seamlessly with both Expo and bare React Native projects. Supports iOS and Android out of the box.
            </div>
        </section>
    );
}
