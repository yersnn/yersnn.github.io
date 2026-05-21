import { Link } from 'react-router-dom'
import { GradientWave } from '@/components/ui/gradient-wave'

const projects = [
  {
    href: '/ielts',
    label: 'IELTS Prep',
    tag: 'Web app',
    blurb: 'Gamified IELTS prep with time-aware skies and a pixel cat.',
  },
  {
    href: '/alims',
    label: 'Alims B2C',
    tag: 'Mobile · iOS · Android',
    blurb: 'Companion app for a test-prep platform.',
  },
  {
    href: '/b2b-mobile',
    label: 'Alims B2B Mobile',
    tag: 'Mobile · iOS · Android',
    blurb: 'School app for students and parents.',
  },
  {
    href: '/b2b-web',
    label: 'Alims B2B Web',
    tag: 'Web',
    blurb: 'School platform for teachers and students.',
  },
]

const contacts = [
  {
    label: 'Email',
    value: 'ersuxa228@gmail.com',
    href: 'mailto:ersuxa228@gmail.com',
  },
  { label: 'Telegram', value: '@bzbzzzk', href: 'https://t.me/bzbzzzk' },
  {
    label: 'GitHub',
    value: 'github.com/yersnn',
    href: 'https://github.com/yersnn',
  },
]

export function HomePage() {
  return (
    <div className="relative">
      <header className="relative overflow-hidden pt-40 pb-32">
        <GradientWave
          className="absolute inset-0"
          colors={[
            '#000000',
            '#404040',
            '#ffffff',
            '#a0a0a0',
            '#000000',
            '#ffffff',
          ]}
        />
        <div className="relative mx-auto max-w-[1600px] px-12">
          <div className="mb-4 text-sm uppercase tracking-[0.25em] text-[#CBEE4C]">
            Portfolio
          </div>
          <h1 className="text-5xl font-semibold tracking-tight md:text-8xl">
            Yersultan Zhumalin
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground md:text-3xl md:leading-snug">
            UI/UX designer based in Astana, Kazakhstan. I design thoughtful
            interfaces — from{' '}
            <span className="font-semibold text-[#CBEE4C]">
              gamified IELTS prep
            </span>{' '}
            to{' '}
            <span className="font-semibold text-[#CBEE4C]">
              school platforms
            </span>{' '}
            and mobile companion apps.
          </p>
        </div>
      </header>

      <div className="relative bg-background">
        <div className="mx-auto max-w-[1600px] px-12 pt-32">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div className="text-sm uppercase tracking-[0.25em] text-[#CBEE4C]">
                Selected work
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
                Four projects, one ecosystem
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground md:col-span-7 md:text-lg md:leading-relaxed">
              A connected suite spanning consumer test-prep, school
              management, and the desktop platform that ties them together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {projects.map((p) => (
              <Link
                key={p.href}
                to={p.href}
                className="cursor-target group block rounded-2xl border border-border bg-card p-8 transition-colors hover:border-[#CBEE4C]/40 md:p-10"
              >
                <div className="flex h-full flex-col justify-between gap-12">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {p.tag}
                    </div>
                    <h3 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                      {p.label}
                    </h3>
                    <p className="mt-3 max-w-md text-base text-muted-foreground md:text-lg">
                      {p.blurb}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-[#CBEE4C]">
                    View project
                    <span
                      aria-hidden="true"
                      className="text-lg transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-32 max-w-[1600px] px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div className="text-sm uppercase tracking-[0.25em] text-[#CBEE4C]">
                About
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
                What I care about
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-foreground/80 md:col-span-7 md:text-2xl md:leading-relaxed">
              Gamified learning. Distinctive visual languages. The small
              details — drifting clouds, a pixel companion, a thoughtful
              transition — that make products feel alive. Currently building
              the{' '}
              <span className="font-semibold text-[#CBEE4C]">Alims</span>{' '}
              test-prep ecosystem.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-32 max-w-[1600px] px-12 pb-32">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div className="text-sm uppercase tracking-[0.25em] text-[#CBEE4C]">
                Contact
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
                Let's talk
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground md:col-span-7 md:text-lg md:leading-relaxed">
              Open to collaborations, freelance, and full-time. The fastest
              way to reach me is below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className="cursor-target group block rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#CBEE4C]/60"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {c.label}
                </div>
                <div className="mt-2 text-base font-medium transition-colors group-hover:text-[#CBEE4C] md:text-lg">
                  {c.value}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
