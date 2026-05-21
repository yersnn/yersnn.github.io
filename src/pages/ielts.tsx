import type { ReactNode } from 'react'
import { ProjectMeta } from '@/components/ui/project-meta'
import { NextProject } from '@/components/ui/next-project'
import { SkyShowcase } from '@/components/ielts/sky-showcase'
import { ThemeShowcase } from '@/components/ielts/theme-showcase'
import { CatShowcase } from '@/components/ielts/cat-showcase'
import { LessonsShowcase } from '@/components/ielts/lessons-showcase'
import { MocksShowcase } from '@/components/ielts/mocks-showcase'

const meta = [
  { label: 'Role', value: 'Product designer' },
  { label: 'Year', value: '2026' },
  { label: 'Platform', value: 'Web' },
  { label: 'Status', value: 'In active development' },
]

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mx-auto mb-12 max-w-[1600px] px-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <div className="text-sm uppercase tracking-[0.25em] text-[#CBEE4C]">
            {eyebrow}
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
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
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      {children}
    </div>
  )
}

export function IeltsPage() {
  return (
    <section className="relative w-full bg-background pt-32 pb-32">
      <div className="mx-auto max-w-[1600px] px-12">
        <div className="mb-12">
          <div className="mb-4 text-sm uppercase tracking-[0.25em] text-[#CBEE4C]">
            Project
          </div>
          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
            IELTS Prep
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-2xl">
            A web app that turns exam prep into a game.
          </p>
        </div>

        <ProjectMeta items={meta} />

        <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="text-sm uppercase tracking-[0.25em] text-[#CBEE4C]">
              The pitch
            </div>
          </div>
          <p className="md:col-span-8 text-lg leading-relaxed text-foreground/80 md:text-2xl md:leading-relaxed">
            To keep students engaged, the app gamifies IELTS preparation.
            Learners climb an{' '}
            <span className="font-semibold text-[#CBEE4C]">
              ELO rating system
            </span>{' '}
            across Reading, Writing, Speaking, and Listening, raise a{' '}
            <span className="font-semibold text-[#CBEE4C]">
              pixel cat companion
            </span>{' '}
            as they progress, and personalize their experience with rich{' '}
            <span className="font-semibold text-[#CBEE4C]">
              theme customization
            </span>{' '}
            — including a time-aware sky with live drifting clouds.
          </p>
        </div>
      </div>

      <div className="mt-40 space-y-40">
        <Section
          eyebrow="Background"
          title="Time-based Sky"
          description="The dashboard's background shifts from morning to day to night, with live drifting clouds. The sky responds to the learner's local time."
        >
          <SkyShowcase />
        </Section>

        <Section
          eyebrow="Customization"
          title="Theme presets"
          description="Eight color and mode combinations — Default, Purple, Pink, Blue in light and dark. Hover any preset to pop it forward."
        >
          <ThemeShowcase />
        </Section>

        <Section
          eyebrow="Pixel companion"
          title="Cat customization"
          description="Three cat styles. Sixteen accessories — bows, glasses, wings, antlers, santa hats. Click any cat to enlarge."
        >
          <CatShowcase />
        </Section>

        <Section
          eyebrow="Learning"
          title="Lessons"
          description="Interactive lessons with myth/fact callouts, skim challenges, and listening exercises tailored to each band."
        >
          <LessonsShowcase />
        </Section>

        <Section
          eyebrow="Practice"
          title="Mock tests"
          description="Full-length mock tests across Reading, Writing, Listening, and Speaking — scored against the ELO system."
        >
          <MocksShowcase />
        </Section>
      </div>

      <NextProject label="Alims B2C" href="/alims" />
    </section>
  )
}
