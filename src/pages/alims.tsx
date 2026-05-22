import { ProjectMeta } from '@/components/ui/project-meta'
import { NextProject } from '@/components/ui/next-project'
import { HUDLabel } from '@/components/ui/hud-label'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'

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
    <section className="relative w-full bg-background pt-32 pb-32">
      <div className="mx-auto max-w-[1600px] px-12">
        <div className="mb-12">
          <HUDLabel id="002">Project</HUDLabel>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">
            Test Prep App
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-2xl">
            Mobile companion for IELTS and SAT learners.
          </p>
        </div>

        <ProjectMeta items={meta} />

        <div className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <HUDLabel id="A">The pitch</HUDLabel>
              <p className="mt-4 text-lg leading-relaxed text-foreground/80 md:text-2xl md:leading-relaxed">
                A mobile companion for students preparing for{' '}
                <span className="font-semibold text-[#CBEE4C]">IELTS</span>,{' '}
                <span className="font-semibold text-[#CBEE4C]">SAT</span>, and
                more — built around a clean dark interface, courses in progress
                at a glance, and the same{' '}
                <span className="font-semibold text-[#CBEE4C]">ELO</span>{' '}
                system that powers the desktop platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ContainerScroll hero — Featured Courses dashboard tilts into view */}
      <ContainerScroll
        titleComponent={
          <div className="mb-4">
            <div className="font-hud text-xs uppercase tracking-[0.3em] text-[#CBEE4C]">
              ▸ FEATURED
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Courses dashboard
            </h2>
          </div>
        }
      >
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#0a0a0c] to-[#13131a] p-6">
          <img
            src={screens[0]}
            alt="Courses — featured screen"
            loading="eager"
            className="block max-h-full w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          />
        </div>
      </ContainerScroll>

      <div className="mx-auto max-w-[1600px] px-12">

        <div className="mt-24 mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <HUDLabel id="B">Other screens</HUDLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              The rest of the app
            </h2>
          </div>
          <p className="md:col-span-7 text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
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
              <figcaption className="mt-4 text-center text-xs uppercase tracking-widest text-muted-foreground md:text-sm">
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
