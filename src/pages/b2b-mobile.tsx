import { ProjectMeta } from '@/components/ui/project-meta'
import { NextProject } from '@/components/ui/next-project'
import { HUDLabel } from '@/components/ui/hud-label'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { cn } from '@/lib/utils'

const screens = [
  '/b2b-mobile/screen-1.png',
  '/b2b-mobile/screen-2.png',
  '/b2b-mobile/screen-3.png',
  '/b2b-mobile/screen-4.png',
  '/b2b-mobile/screen-5.png',
]

const meta = [
  { label: 'Role', value: 'Product designer' },
  { label: 'Year', value: '2025' },
  { label: 'Platform', value: 'iOS · Android' },
  { label: 'Audience', value: 'Students · parents' },
]

const offsets = ['mt-16', 'mt-0', 'mt-24', 'mt-4', 'mt-20']

export function B2BMobilePage() {
  return (
    <section
      data-theme="light"
      className="relative w-full bg-background pt-32 pb-32 text-foreground"
    >
      <div className="mx-auto max-w-[1600px] px-12">
        <div className="mb-12">
          <HUDLabel id="003">Project</HUDLabel>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">
            School App
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-2xl">
            Mobile companion for students and parents tracking school
            performance.
          </p>
        </div>

        <ProjectMeta items={meta} />

        <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <HUDLabel id="A">The pitch</HUDLabel>
          </div>
          <p className="md:col-span-8 text-lg leading-relaxed text-foreground/80 md:text-2xl md:leading-relaxed">
            A student-facing companion for the{' '}
            <span className="font-semibold text-[#CBEE4C]">Alims</span> school
            platform. View grades by quarter, track upcoming assignments,
            check progress across subjects, and stay connected with teachers
            and classmates.
          </p>
        </div>
      </div>

      {/* ContainerScroll hero — first screen tilts into view */}
      <ContainerScroll
        titleComponent={
          <div className="mb-4">
            <div className="font-hud text-xs uppercase tracking-[0.3em] text-[#CBEE4C]">
              ▸ HOME
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              The student's home screen
            </h2>
          </div>
        }
      >
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-white to-[#f1f5f9] p-6">
          <img
            src={screens[0]}
            alt="B2B Mobile — home screen"
            loading="eager"
            className="block max-h-full w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
          />
        </div>
      </ContainerScroll>

      <div className="relative overflow-hidden pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80%] bg-gradient-to-b from-[#CBEE4C]/5 to-transparent"
          aria-hidden="true"
        />
        <div className="mx-auto mb-16 max-w-[1600px] px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <HUDLabel id="B">Screens</HUDLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Daily flows, all five
              </h2>
            </div>
            <p className="md:col-span-7 text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
              Grades, schedule, classmates, badges — what students touch every
              day, laid out as a single staggered glance.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-x-6 gap-y-12 px-12 md:grid-cols-5 md:gap-x-10">
          {screens.map((src, i) => (
            <figure
              key={src}
              className={cn('group', offsets[i % offsets.length])}
            >
              <img
                src={src}
                alt={`B2B Mobile screen ${i + 1}`}
                loading={i < 2 ? 'eager' : 'lazy'}
                className="block w-full transition-transform duration-500 group-hover:-translate-y-3 group-hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </div>

      <NextProject label="IELTS Prep" href="/ielts" />
    </section>
  )
}
