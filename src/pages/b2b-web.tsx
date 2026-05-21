import { ProjectMeta } from '@/components/ui/project-meta'
import { BrowserFrame } from '@/components/ui/browser-frame'
import { NextProject } from '@/components/ui/next-project'

const meta = [
  { label: 'Role', value: 'Product designer' },
  { label: 'Year', value: '2025' },
  { label: 'Platform', value: 'Web' },
  { label: 'Audience', value: 'Schools · teachers · students' },
]

type Section = {
  eyebrow: string
  title: string
  description: string
  url: string
  screens: string[]
}

const sections: Section[] = [
  {
    eyebrow: 'Teacher view',
    title: 'Assignment builder',
    description:
      'Sectioned editor with MCQ, video, word shuffle, and missed-word activities — plus an AI-assist that fills in options.',
    url: 'alims.app/teacher',
    screens: [
      '/b2b-web/teacher-3.jpg',
      '/b2b-web/teacher-1.jpg',
      '/b2b-web/teacher-2.jpg',
      '/b2b-web/teacher-4.jpg',
      '/b2b-web/teacher-5.jpg',
    ],
  },
  {
    eyebrow: 'Student view',
    title: 'Leaderboard & feed',
    description:
      'Compete on a school / city / country leaderboard and follow classmates’ progress.',
    url: 'alims.app/student',
    screens: [
      '/b2b-web/student-1.jpg',
      '/b2b-web/student-2.jpg',
      '/b2b-web/student-3.jpg',
    ],
  },
  {
    eyebrow: 'Onboarding',
    title: 'Score projection',
    description:
      'A short flow that sets goals and shows learners the score they can reach in two weeks and one month.',
    url: 'alims.app/onboarding',
    screens: [
      '/b2b-web/onboarding-1.jpg',
      '/b2b-web/onboarding-2.jpg',
      '/b2b-web/onboarding-3.jpg',
    ],
  },
]

export function B2BWebPage() {
  return (
    <section className="relative w-full bg-background pt-32 pb-32">
      <div className="mx-auto max-w-[1600px] px-12">
        <div className="mb-12">
          <div className="mb-4 text-sm uppercase tracking-[0.25em] text-[#CBEE4C]">
            Project
          </div>
          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
            Alims B2B Web
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-2xl">
            School platform for teachers and students.
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
            The web side of{' '}
            <span className="font-semibold text-[#CBEE4C]">Alims</span> for
            schools. Teachers build assignments with mixed question types and
            a section-based outliner. Students see a{' '}
            <span className="font-semibold text-[#CBEE4C]">leaderboard</span>,
            a feed, and personalized{' '}
            <span className="font-semibold text-[#CBEE4C]">onboarding</span>{' '}
            that projects their score trajectory.
          </p>
        </div>

        <div className="mt-32 space-y-40">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-5">
                  <div className="text-sm uppercase tracking-[0.25em] text-[#CBEE4C]">
                    {section.eyebrow}
                  </div>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
                    {section.title}
                  </h2>
                </div>
                <p className="md:col-span-7 text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
                  {section.description}
                </p>
              </div>

              <div className="space-y-16">
                {section.screens.map((src, idx) => (
                  <BrowserFrame
                    key={src}
                    url={section.url}
                    className={
                      idx === 0
                        ? 'mx-auto max-w-[1600px]'
                        : 'mx-auto max-w-5xl'
                    }
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="block h-auto w-full"
                    />
                  </BrowserFrame>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <NextProject label="IELTS Prep" href="/ielts" />
    </section>
  )
}
