import { Link } from 'react-router-dom'

interface NextProjectProps {
  label: string
  href: string
}

export function NextProject({ label, href }: NextProjectProps) {
  return (
    <div className="mt-32 border-t border-border pt-16">
      <div className="mx-auto max-w-[1600px] px-12">
        <Link
          to={href}
          className="cursor-target group inline-flex flex-col"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Next project
          </span>
          <span className="mt-3 inline-flex items-baseline gap-4 text-4xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-[#CBEE4C] md:text-6xl">
            {label}
            <span
              aria-hidden="true"
              className="text-3xl transition-transform duration-200 group-hover:translate-x-2 md:text-5xl"
            >
              →
            </span>
          </span>
        </Link>
      </div>
    </div>
  )
}
