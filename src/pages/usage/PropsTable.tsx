export default function PropsTable() {
  return (
    <section id="props" data-section className="mb-16 scroll-mt-24">
      <h2 className="text-xl font-serif text-white mb-4">Props</h2>
      <p className="text-white/50 text-[14px] mb-6 leading-relaxed">
        All available props for both the React component and the CDN custom element.
      </p>

      <div className="bg-[#0e0e10] border border-white/[0.06] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left px-5 py-3 text-white/40 font-medium text-[11px] uppercase tracking-wider">Prop</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-[11px] uppercase tracking-wider">Type</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-[11px] uppercase tracking-wider">Default</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-[11px] uppercase tracking-wider hidden sm:table-cell">Description</th>
            </tr>
          </thead>
          <tbody className="text-white/60">
            <tr className="border-b border-white/[0.04]">
              <td className="px-5 py-3 font-mono text-[12px] text-[#e06c75]">size</td>
              <td className="px-5 py-3 font-mono text-[12px] text-[#e5c07b]">number</td>
              <td className="px-5 py-3 font-mono text-[12px] text-[#d19a66]">24</td>
              <td className="px-5 py-3 text-[12px] text-white/40 hidden sm:table-cell">Icon size in pixels</td>
            </tr>
            <tr className="border-b border-white/[0.04]">
              <td className="px-5 py-3 font-mono text-[12px] text-[#e06c75]">color</td>
              <td className="px-5 py-3 font-mono text-[12px] text-[#e5c07b]">string</td>
              <td className="px-5 py-3 font-mono text-[12px] text-[#98c379]">currentColor</td>
              <td className="px-5 py-3 text-[12px] text-white/40 hidden sm:table-cell">Any valid CSS color</td>
            </tr>
            <tr className="border-b border-white/[0.04]">
              <td className="px-5 py-3 font-mono text-[12px] text-[#e06c75]">weight</td>
              <td className="px-5 py-3 font-mono text-[12px] text-[#e5c07b]">string</td>
              <td className="px-5 py-3 font-mono text-[12px] text-[#98c379]">Outline</td>
              <td className="px-5 py-3 text-[12px] text-white/40 hidden sm:table-cell">Outline or Filled</td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-mono text-[12px] text-[#e06c75]">className</td>
              <td className="px-5 py-3 font-mono text-[12px] text-[#e5c07b]">string</td>
              <td className="px-5 py-3 font-mono text-[12px] text-white/30">—</td>
              <td className="px-5 py-3 text-[12px] text-white/40 hidden sm:table-cell">Additional CSS classes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
