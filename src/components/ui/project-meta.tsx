/** One quiet line of project facts, e.g. "Product designer · 2026 · Web". */
export function ProjectMeta({ items }: { items: string[] }) {
  return <p className="text-base font-medium text-white md:text-lg">{items.join('  ·  ')}</p>
}
