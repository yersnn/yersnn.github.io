import { Link } from 'react-router-dom'
import { HUDLabel } from '@/components/ui/hud-label'
import { HazardDivider } from '@/components/ui/hazard-divider'
import { StatRadar } from '@/components/ui/stat-radar'

const projects = [
  {
    href: '/ielts',
    label: 'IELTS Prep',
    tag: 'Web app',
    blurb: 'Gamified IELTS prep with time-aware skies and theme presets.',
    code: '001',
  },
  {
    href: '/alims',
    label: 'Test Prep App',
    tag: 'Mobile · iOS · Android',
    blurb: 'Mobile companion for IELTS and SAT learners.',
    code: '002',
  },
  {
    href: '/b2b-mobile',
    label: 'School App',
    tag: 'Mobile · iOS · Android',
    blurb:
      'Mobile companion for students and parents tracking school performance.',
    code: '003',
  },
]

const stats = [
  { label: 'CREATIVITY', value: 9 },
  { label: 'SPEED', value: 8 },
  { label: 'POLISH', value: 9 },
  { label: 'RANGE', value: 8 },
  { label: 'ITERATION', value: 9 },
  { label: 'SHIPPING', value: 8 },
]

const contacts = [
  {
    label: 'Email',
    value: 'ersuxa228@gmail.com',
    href: 'mailto:ersuxa228@gmail.com',
    code: 'EML',
  },
  {
    label: 'Telegram',
    value: '@bzbzzzk',
    href: 'https://t.me/bzbzzzk',
    code: 'TG',
  },
  {
    label: 'GitHub',
    value: 'github.com/yersnn',
    href: 'https://github.com/yersnn',
    code: 'GIT',
  },
]

export function HomePage() {
  return (
    <div className="relative">
      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <header className="relative bg-background pt-40 pb-32">
        <div className="relative mx-auto max-w-[1600px] px-12">
          <HUDLabel id="000" className="mb-6">
            Portfolio
          </HUDLabel>
          <h1 className="text-5xl font-semibold tracking-tight md:text-8xl">
            Yersultan Zhumalin
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground md:text-3xl md:leading-snug">
            UI/UX designer based in Astana, Kazakhstan. I design thoughtful
            interfaces — from{' '}
            <span className="font-semibold text-[#CBEE4C] cyber-glow">
              gamified IELTS prep
            </span>{' '}
            to{' '}
            <span className="font-semibold text-[#CBEE4C] cyber-glow">
              school platforms
            </span>{' '}
            and mobile companion apps.
          </p>
        </div>
      </header>

      {/* ─── Selected work ─────────────────────────────────────────── */}
      <div className="relative bg-background">
        <div className="mx-auto max-w-[1600px] px-12 pt-32">
          <HazardDivider label="DOSSIER" className="mb-12" />

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <HUDLabel id="001">Selected work</HUDLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Three projects, one ecosystem
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground md:col-span-7 md:text-lg md:leading-relaxed">
              A connected suite spanning consumer test-prep, school
              management, and the desktop platform that ties them together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {projects.map((p) => (
              <Link
                key={p.href}
                to={p.href}
                className="cursor-target group relative block bg-card transition-colors hover:bg-card/80"
              >
                {/* Cyberpunk angular border */}
                <div
                  aria-hidden="true"
                  className="hud-stripes-faint absolute inset-0 opacity-30 transition-opacity group-hover:opacity-60"
                />
                <div className="relative clip-cyber border border-border bg-card p-8 transition-colors group-hover:border-[#CBEE4C]/60 md:p-10">
                  <div className="flex h-full flex-col justify-between gap-12">
                    <div>
                      <div className="font-hud text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        [{p.code}] · {p.tag}
                      </div>
                      <h3 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                        {p.label}
                      </h3>
                      <p className="mt-3 max-w-md text-base text-muted-foreground md:text-lg">
                        {p.blurb}
                      </p>
                    </div>
                    <div className="font-hud flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-[#CBEE4C]">
                      Enter
                      <span
                        aria-hidden="true"
                        className="text-lg transition-transform group-hover:translate-x-1"
                      >
                        ▸▸
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ─── Why me / Attributes ───────────────────────────────── */}
        <div className="mx-auto mt-32 max-w-[1600px] px-12">
          <HazardDivider label="ATTRIBUTES" className="mb-12" />

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <HUDLabel id="002">Why me</HUDLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                What happens when you hire me
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground md:col-span-7 md:text-lg md:leading-relaxed">
              I move fast, ship polished, and bring real range — gamified UI,
              editorial layouts, cyberpunk frames, mobile companions. Six
              attributes I get judged on, scored out of 10.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            {/* Stat list */}
            <div className="md:col-span-5">
              <div className="relative clip-cyber border border-[#CBEE4C]/40 bg-card/60 p-6 md:p-8">
                <div className="font-hud mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[#CBEE4C]">
                  <span>▸ PROFILE</span>
                  <span className="text-muted-foreground">PROTOCOL // 002</span>
                </div>
                <ul className="space-y-3">
                  {stats.map((s) => (
                    <li
                      key={s.label}
                      className="font-hud flex items-baseline justify-between gap-4 border-b border-border/60 pb-3 text-sm last:border-0 last:pb-0"
                    >
                      <span className="text-muted-foreground tracking-[0.15em]">
                        {s.label}
                      </span>
                      <span className="flex items-baseline gap-3">
                        <span className="text-2xl font-semibold text-[#CBEE4C] cyber-glow md:text-3xl">
                          {s.value}
                        </span>
                        <span className="text-xs text-muted-foreground/70">
                          /10
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="font-hud mt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  ▸ NO BIOLOGICAL DATA WAS FOUND
                </div>
              </div>
            </div>

            {/* Radar */}
            <div className="md:col-span-7">
              <div className="relative clip-cyber border border-border bg-card/40 p-6 md:p-10">
                <div className="font-hud mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[#CBEE4C]">
                  <span>▸ CAPABILITY RADAR</span>
                  <span className="text-muted-foreground">v0.6.2</span>
                </div>
                <div className="mx-auto aspect-square w-full max-w-[440px]">
                  <StatRadar stats={stats} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── About ─────────────────────────────────────────────── */}
        <div className="mx-auto mt-32 max-w-[1600px] px-12">
          <HazardDivider label="DOSSIER // BIO" className="mb-12" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <HUDLabel id="003">About</HUDLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
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

        {/* ─── Contact ──────────────────────────────────────────── */}
        <div className="mx-auto mt-32 max-w-[1600px] px-12 pb-32">
          <HazardDivider label="UPLINK" className="mb-12" />
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <HUDLabel id="004">Contact</HUDLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
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
                className="cursor-target group block clip-cyber-sm border border-border bg-card p-6 transition-colors hover:border-[#CBEE4C]/60"
              >
                <div className="font-hud text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  [{c.code}] {c.label}
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
