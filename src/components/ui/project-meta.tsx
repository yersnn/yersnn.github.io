interface ProjectMetaItem {
  label: string
  value: string
}

export function ProjectMeta({ items }: { items: ProjectMetaItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-4 md:grid-cols-4 md:gap-x-10">
      {items.map((item) => (
        <div key={item.label}>
          <div className="text-sm font-medium text-[#4f8dff]">{item.label}</div>
          <div className="mt-1.5 text-lg font-semibold text-white md:text-xl">{item.value}</div>
        </div>
      ))}
    </div>
  )
}
