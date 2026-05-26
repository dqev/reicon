import TypeTable from '../../components/usage/TypeTable';

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
    prop: 'className?',
    type: 'string',
    default: null,
    description: 'Additional CSS classes',
  },
];

export default function PropsTable() {
  return (
    <section id="props" data-section className="mb-16 scroll-mt-24">
      <h2 className="text-xl font-serif text-white mb-4">Props</h2>
      <p className="text-white/50 text-[14px] mb-6 leading-relaxed">
        All available props for both the React component and the CDN custom element.
      </p>

      <TypeTable rows={ROWS} />
    </section>
  );
}
