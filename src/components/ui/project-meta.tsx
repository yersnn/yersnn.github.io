interface ProjectMetaItem {
  label: string
  value: string
}

export function ProjectMeta({ items }: { items: ProjectMetaItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-y-6 border-y border-border py-8 md:grid-cols-4 md:gap-x-10">
      {items.map((item) => (
        <div key={item.label}>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {item.label}
          </div>
          <div className="mt-1.5 text-base font-medium md:text-lg">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}
