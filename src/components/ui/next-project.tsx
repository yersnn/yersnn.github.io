import { Link } from 'react-router-dom'

interface NextProjectProps {
  label: string
  href: string
}

export function NextProject({ label, href }: NextProjectProps) {
  return (
    <div className="mt-32 md:mt-40">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <Link to={href} className="group inline-flex flex-col text-white">
          <span className="text-sm font-semibold text-[#4f8dff] md:text-base">Next project</span>
          <span className="mt-3 inline-flex items-baseline gap-4 text-4xl font-bold tracking-tight transition-colors duration-200 group-hover:text-[#4f8dff] md:text-6xl">
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
