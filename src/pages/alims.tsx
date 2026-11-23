import './project.css'
import { ProjectMeta } from '@/components/ui/project-meta'
import { NextProject } from '@/components/ui/next-project'
import FadeContent from '@/components/reactbits/FadeContent'

const screens = [
  { src: '/alims/screen-1.png', label: 'Courses' },
  { src: '/alims/screen-2.png', label: 'Course detail' },
  { src: '/alims/screen-3.png', label: 'ELO stats' },
  { src: '/alims/screen-4.png', label: 'Tutors' },
  { src: '/alims/screen-5.png', label: 'Profile' },
]

export function AlimsPage() {
  return (
    <section className="project-page relative w-full pt-28 pb-32 md:pt-40">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <FadeContent effect="focus" blur trigger="mount" duration={1.1}>
          <h1 className="text-6xl leading-[0.95] md:text-[8rem]">Test Prep App</h1>
        </FadeContent>
        <FadeContent blur trigger="mount" delay={0.2}>
          <p className="mt-6 text-xl text-white md:text-3xl">IELTS and SAT prep in your pocket.</p>
        </FadeContent>
        <FadeContent blur trigger="mount" delay={0.35} className="mt-8">
          <ProjectMeta items={['Product designer', '2025', 'iOS & Android']} />
        </FadeContent>

        <FadeContent blur className="mt-28 mb-12 md:mt-40 md:mb-16">
          <h2 className="text-4xl leading-none md:text-6xl">The app</h2>
          <p className="mt-4 text-lg text-white md:text-xl">Courses, ELO stats, tutors, profile.</p>
        </FadeContent>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-5 md:gap-x-10">
          {screens.map((s, i) => (
            <FadeContent key={s.src} blur delay={i * 0.1} threshold={0.15}>
              <figure className="group flex flex-col items-center">
                <img
                  src={s.src}
                  alt={s.label}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  className="block w-full transition-transform duration-500 group-hover:-translate-y-3"
                />
                <figcaption className="mt-4 text-center text-sm font-medium text-white md:text-base">
                  {s.label}
                </figcaption>
              </figure>
            </FadeContent>
          ))}
        </div>
      </div>

      <NextProject label="School App" href="/b2b-mobile" />
    </section>
  )
}
