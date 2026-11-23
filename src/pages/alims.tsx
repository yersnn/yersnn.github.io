import { ProjectMeta } from '@/components/ui/project-meta'
import './project.css'
import { NextProject } from '@/components/ui/next-project'
import { HUDLabel } from '@/components/ui/hud-label'

const screens = [
  '/alims/screen-1.png',
  '/alims/screen-2.png',
  '/alims/screen-3.png',
  '/alims/screen-4.png',
  '/alims/screen-5.png',
]

const meta = [
  { label: 'Role', value: 'Product designer' },
  { label: 'Year', value: '2025' },
  { label: 'Platform', value: 'iOS · Android' },
  { label: 'Status', value: 'In development' },
]

const supporting = [
  { src: screens[1], label: 'Course detail' },
  { src: screens[2], label: 'ELO stats' },
  { src: screens[3], label: 'Tutors' },
  { src: screens[4], label: 'Profile' },
]

export function AlimsPage() {
  return (
    <section className="relative w-full project-page pt-24 md:pt-32 pb-32">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <div className="mb-12">
          <HUDLabel id="002">Project</HUDLabel>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">
            Test Prep App
          </h1>
          <p className="mt-5 text-lg text-white md:text-2xl">
            Mobile companion for IELTS and SAT learners.
          </p>
        </div>

        <ProjectMeta items={meta} />

        <div className="mt-16 grid grid-cols-1 items-start gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <HUDLabel id="A">The pitch</HUDLabel>
            <p className="mt-4 text-lg leading-relaxed text-white md:text-2xl md:leading-relaxed">
              A mobile companion for students preparing for{' '}
              <span className="font-semibold text-[#4f8dff]">IELTS</span>,{' '}
              <span className="font-semibold text-[#4f8dff]">SAT</span>, and
              more — built around a clean dark interface, courses in progress
              at a glance, and the same{' '}
              <span className="font-semibold text-[#4f8dff]">ELO</span> system
              that powers the desktop platform.
            </p>
          </div>

          <div className="relative md:col-span-5">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4f8dff]/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="mx-auto max-w-[280px]">
              <img
                src={screens[0]}
                alt="Courses — featured screen"
                loading="eager"
                className="block w-full"
              />
            </div>
            <div className="mx-auto mt-6 max-w-[280px] text-center">
              <div className="text-xs text-white">
                Featured
              </div>
              <div className="mt-1.5 text-sm font-medium md:text-base">
                Courses dashboard
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <HUDLabel id="B">Other screens</HUDLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              The rest of the app
            </h2>
          </div>
          <p className="md:col-span-7 text-base leading-relaxed text-white md:text-lg md:leading-relaxed">
            Each course has its own detail view, an ELO progress dashboard,
            tutor browser, and a profile with achievement widgets.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {supporting.map((s) => (
            <figure
              key={s.src}
              className="group flex flex-col items-center"
            >
              <img
                src={s.src}
                alt={s.label}
                loading="lazy"
                className="block w-full transition-transform duration-300 group-hover:-translate-y-2"
              />
              <figcaption className="mt-4 text-center text-xs text-white md:text-sm">
                {s.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <NextProject label="School App" href="/b2b-mobile" />
    </section>
  )
}
