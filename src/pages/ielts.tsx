import type { ReactNode } from 'react'
import './project.css'
import { ProjectMeta } from '@/components/ui/project-meta'
import { NextProject } from '@/components/ui/next-project'
import FadeContent from '@/components/reactbits/FadeContent'
import { SkyShowcase } from '@/components/ielts/sky-showcase'
import { ThemeShowcase } from '@/components/ielts/theme-showcase'
import { LessonsShowcase } from '@/components/ielts/lessons-showcase'
import { MocksShowcase } from '@/components/ielts/mocks-showcase'
import { ScreensCarousel } from '@/components/ielts/screens-carousel'

// Rendered into a real MacBook Pro 14 mockup (side angle); the frame is in the image.
const onboardingSteps = [
  { src: '/mockups/onboarding/step-1.webp', alt: 'Step 1 — choose a featured mode (Gamified / Sky)' },
  { src: '/mockups/onboarding/step-2.webp', alt: 'Step 2 — choose a color theme' },
  { src: '/mockups/onboarding/step-3.webp', alt: 'Step 3 — pick your pixel cat companion' },
]

function Section({ title, line, children }: { title: string; line: string; children: ReactNode }) {
  return (
    <section>
      <FadeContent blur className="mx-auto mb-10 max-w-[1600px] px-4 md:mb-14 md:px-12">
        <h2 className="text-4xl leading-none md:text-6xl">{title}</h2>
        <p className="mt-4 text-lg text-white md:text-xl">{line}</p>
      </FadeContent>
      <FadeContent blur delay={0.15} threshold={0.15}>
        {children}
      </FadeContent>
    </section>
  )
}

function StyleOnboarding() {
  return (
    <ScreensCarousel
      frame="none"
      items={onboardingSteps.map((s) => (
        <img key={s.src} src={s.src} alt={s.alt} loading="lazy" className="block h-auto w-full" />
      ))}
    />
  )
}

export function IeltsPage() {
  return (
    <section className="project-page relative w-full pt-28 pb-32 md:pt-40">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <FadeContent effect="focus" blur trigger="mount" duration={1.1}>
          <h1 className="text-6xl leading-[0.95] md:text-[8rem]">IELTS Prep</h1>
        </FadeContent>
        <FadeContent blur trigger="mount" delay={0.2}>
          <p className="mt-6 text-xl text-white md:text-3xl">A web app that turns exam prep into a game.</p>
        </FadeContent>
        <FadeContent blur trigger="mount" delay={0.35} className="mt-8">
          <ProjectMeta items={['Product designer', '2026', 'Web']} />
        </FadeContent>
      </div>

      <div className="mt-28 space-y-32 md:mt-40 md:space-y-48">
        <Section title="Time-based sky" line="Morning, day, and night, with live clouds.">
          <SkyShowcase />
        </Section>

        <Section title="Pick your style" line="Mode, colour, and a pixel cat. Three steps.">
          <StyleOnboarding />
        </Section>

        <Section title="Theme presets" line="Ten looks, light and dark. Hover one.">
          <ThemeShowcase />
        </Section>

        <Section title="Lessons" line="Myth or fact, skim challenges, listening.">
          <LessonsShowcase />
        </Section>

        <Section title="Mock tests" line="Full exams, scored with ELO.">
          <MocksShowcase />
        </Section>
      </div>

      <NextProject label="Test Prep App" href="/alims" />
    </section>
  )
}
