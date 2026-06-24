import TypeTable from '../../components/usage/TypeTable';
import SectionHeader from '../../components/usage/SectionHeader';

const ROWS = [
  {
    prop: 'size',
    type: 'number | string',
    default: '24',
    description: 'Icon size in pixels',
  },
  {
    prop: 'color',
    type: 'string',
    default: 'currentColor',
    description: 'Any valid CSS color',
  },
  {
    prop: 'weight',
    type: '"Outline" | "Filled"',
    default: 'Outline',
    description: 'Icon weight variant',
  },
  {
    prop: 'strokeWidth?',
    type: 'number | string',
    default: null,
    description: 'Override stroke width on outline icons',
  },
  {
    prop: 'secondaryColor?',
    type: 'string',
    default: 'same as color',
    description: 'Secondary color for dual-tone icons',
  },
  {
    prop: 'className?',
    type: 'string',
    default: null,
    description: 'Additional CSS classes',
  },
  {
    prop: 'ref?',
    type: 'Ref<SVGSVGElement>',
    default: null,
    description: 'Ref forwarded to the SVG element',
  },
];

interface Props {
  markdownContent: string;
}

export default function PropsTable({ markdownContent }: Props) {
  return (
    <section id="props" data-section className="mb-16 scroll-mt-24">
      <SectionHeader id="props" title="Props" level="h2" markdownContent={markdownContent} />
      <p className="text-white/50 text-[14px] mb-6 leading-relaxed">
        All available props for both the React component and the CDN custom element.
      </p>

      <TypeTable rows={ROWS} />
    </section>
  );
}
