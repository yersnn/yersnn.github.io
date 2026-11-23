import './project.css'
import { NextProject } from '@/components/ui/next-project'
import FadeContent from '@/components/reactbits/FadeContent'
import { cn } from '@/lib/utils'

const screens = [
  '/b2b-mobile/screen-1.png',
  '/b2b-mobile/screen-2.png',
  '/b2b-mobile/screen-3.png',
  '/b2b-mobile/screen-4.png',
  '/b2b-mobile/screen-5.png',
]

// Staggered vertical offsets so the five phones read as one loose row.
const offsets = ['md:mt-16', 'md:mt-0', 'md:mt-24', 'md:mt-4', 'md:mt-20']

export function B2BMobilePage() {
  return (
    <section className="project-page relative w-full pt-28 pb-32 md:pt-40">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <FadeContent effect="focus" blur trigger="mount" duration={1.1}>
          <h1 className="text-6xl leading-[0.95] md:text-[8rem]">School App</h1>
        </FadeContent>
        <FadeContent blur trigger="mount" delay={0.2}>
          <p className="mt-6 text-xl text-white md:text-3xl">Grades and progress for students and parents.</p>
        </FadeContent>

        <FadeContent blur className="mt-28 mb-12 md:mt-40 md:mb-16">
          <h2 className="text-4xl leading-none md:text-6xl">Daily flows</h2>
          <p className="mt-4 text-lg text-white md:text-xl">Five screens students open every day.</p>
        </FadeContent>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-5 md:gap-x-10">
          {screens.map((src, i) => (
            <FadeContent key={src} blur delay={i * 0.1} threshold={0.15} className={cn(offsets[i])}>
              <figure className="group">
                <img
                  src={src}
                  alt={`School app screen ${i + 1}`}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  className="block w-full transition-transform duration-500 group-hover:-translate-y-3 group-hover:scale-[1.03]"
                />
              </figure>
            </FadeContent>
          ))}
        </div>
      </div>

      <NextProject label="IELTS Prep" href="/ielts" />
    </section>
  )
}
