import type { ReactNode } from 'react'
import { ProjectMeta } from '@/components/ui/project-meta'
import { NextProject } from '@/components/ui/next-project'
import { HUDLabel } from '@/components/ui/hud-label'
import { HazardDivider } from '@/components/ui/hazard-divider'
import { SkyShowcase } from '@/components/ielts/sky-showcase'
import { ThemeShowcase } from '@/components/ielts/theme-showcase'
import { LessonsShowcase } from '@/components/ielts/lessons-showcase'
import { MocksShowcase } from '@/components/ielts/mocks-showcase'
import { ScreensCarousel } from '@/components/ielts/screens-carousel'

const meta = [
  { label: 'Role', value: 'Product designer' },
  { label: 'Year', value: '2026' },
  { label: 'Platform', value: 'Web' },
  { label: 'Status', value: 'In active development' },
]

function SectionHeader({
  eyebrow,
  id,
  title,
  description,
}: {
  eyebrow: string
  id?: string
  title: string
  description: string
}) {
  return (
    <div className="mx-auto mb-12 max-w-[1600px] px-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <HUDLabel id={id}>{eyebrow}</HUDLabel>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h2>
        </div>
        <p className="md:col-span-7 text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

function Section({
  eyebrow,
  id,
  title,
  description,
  hazard,
  children,
}: {
  eyebrow: string
  id?: string
  title: string
  description: string
  hazard?: string
  children: ReactNode
}) {
  return (
    <div>
      {hazard && (
        <div className="mx-auto mb-12 max-w-[1600px] px-12">
          <HazardDivider label={hazard} />
        </div>
      )}
      <SectionHeader
        eyebrow={eyebrow}
        id={id}
        title={title}
        description={description}
      />
      {children}
    </div>
  )
}

const onboardingSteps = [
  {
    src: '/ielts-onboarding/step-1.png',
    alt: 'Step 1 — choose a featured mode (Gamified / Sky)',
  },
  {
    src: '/ielts-onboarding/step-2.png',
    alt: 'Step 2 — choose a color theme',
  },
  {
    src: '/ielts-onboarding/step-3.png',
    alt: 'Step 3 — pick your pixel cat companion',
  },
]

function StyleOnboarding() {
  return (
    <ScreensCarousel
      items={onboardingSteps.map((s) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ))}
    />
  )
}

export function IeltsPage() {
  return (
    <section className="relative w-full bg-background pt-32 pb-32">
      <div className="mx-auto max-w-[1600px] px-12">
        <div className="mb-12">
          <HUDLabel id="001">Project</HUDLabel>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">
            IELTS Prep
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-2xl">
            A web app that turns exam prep into a game.
          </p>
        </div>

        <ProjectMeta items={meta} />

        <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <HUDLabel id="A">The pitch</HUDLabel>
          </div>
          <p className="md:col-span-8 text-lg leading-relaxed text-foreground/80 md:text-2xl md:leading-relaxed">
            To keep students engaged, the app gamifies IELTS preparation.
            Learners climb an{' '}
            <span className="font-semibold text-[#CBEE4C] cyber-glow">
              ELO rating system
            </span>{' '}
            across Reading, Writing, Speaking, and Listening, and personalize
            their experience with rich{' '}
            <span className="font-semibold text-[#CBEE4C] cyber-glow">
              theme customization
            </span>{' '}
            — including a time-aware sky with live drifting clouds.
          </p>
        </div>
      </div>

      <div className="mt-32 space-y-32">
        <Section
          eyebrow="Background"
          id="01"
          title="Time-based Sky"
          description="The dashboard's background shifts from morning to day to night, with live drifting clouds. The sky responds to the learner's local time."
          hazard="BACKGROUND // ATMOSPHERIC"
        >
          <SkyShowcase />
        </Section>

        <Section
          eyebrow="Onboarding"
          id="02"
          title="Pick your style"
          description="A three-step onboarding lets learners pick a featured mode, a color theme in light or dark, and a pixel cat companion — before they ever take a lesson."
          hazard="ONBOARDING // STYLE"
        >
          <StyleOnboarding />
        </Section>

        <Section
          eyebrow="Customization"
          id="03"
          title="Theme presets"
          description="Ten variations across dark and light modes — hover any preset to pop it forward."
          hazard="THEMING // PRESETS"
        >
          <ThemeShowcase />
        </Section>

        <Section
          eyebrow="Learning"
          id="04"
          title="Lessons"
          description="Interactive lessons with myth/fact callouts, skim challenges, and listening exercises tailored to each band."
          hazard="LEARNING // LESSONS"
        >
          <LessonsShowcase />
        </Section>

        <Section
          eyebrow="Practice"
          id="05"
          title="Mock tests"
          description="Full-length mock tests across Reading, Writing, Listening, and Speaking — scored against the ELO system."
          hazard="PRACTICE // MOCKS"
        >
          <MocksShowcase />
        </Section>
      </div>

      <NextProject label="Test Prep App" href="/alims" />
    </section>
  )
}
