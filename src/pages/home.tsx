import { Link } from 'react-router-dom'
import { HUDLabel } from '@/components/ui/hud-label'
import { HazardDivider } from '@/components/ui/hazard-divider'
import { StatRadar } from '@/components/ui/stat-radar'
import {
  BracketCorners,
  StatusBadge,
  ChevronCta,
  CyberPanel,
} from '@/components/ui/cyber'
import {
  GlitchText,
  StatusTicker,
  CountUp,
  DecodeText,
} from '@/components/ui/cyber-fx'

const projects = [
  {
    href: '/ielts',
    label: 'IELTS Prep',
    tag: 'Web app',
    blurb: 'Gamified IELTS prep with time-aware skies and theme presets.',
    code: 'DOSSIER · 001',
    status: 'ACTIVE',
  },
  {
    href: '/alims',
    label: 'Test Prep App',
    tag: 'Mobile · iOS · Android',
    blurb: 'Mobile companion for IELTS and SAT learners.',
    code: 'DOSSIER · 002',
    status: 'BUILDING',
  },
  {
    href: '/b2b-mobile',
    label: 'School App',
    tag: 'Mobile · iOS · Android',
    blurb:
      'Mobile companion for students and parents tracking school performance.',
    code: 'DOSSIER · 003',
    status: 'BUILDING',
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
    <div className="relative cyber-grid-fine">
      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-background pt-40 pb-20">
        <div className="scanlines-drift pointer-events-none absolute inset-0 mix-blend-overlay opacity-40" />

        <div className="relative mx-auto max-w-[1600px] px-12">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <HUDLabel id="000">Portfolio</HUDLabel>
            <StatusBadge tone="lime" variant="solid">
              ONLINE
            </StatusBadge>
            <StatusBadge tone="cyan" variant="outline">
              v2.6.1
            </StatusBadge>
          </div>
          <h1 className="text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl xl:text-8xl">
            <GlitchText>Yersultan Zhumalin</GlitchText>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground md:text-2xl md:leading-snug">
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

      {/* Status ticker bar (cyberpunk dashboard staple) */}
      <StatusTicker
        items={[
          'SYSTEM ONLINE',
          'DOSSIER LOADED · 003 ACTIVE',
          'SIGNAL: STRONG',
          'PROTOCOL // 002',
          'NIGHT CITY · 2026',
          'CAPABILITY RADAR · v0.6.2',
          'UPLINK READY',
          'NO BIOLOGICAL DATA WAS FOUND',
        ]}
        speed="slow"
      />

      {/* ─── Selected work ─────────────────────────────────────────── */}
      <div className="relative bg-background">
        <div className="mx-auto max-w-[1600px] px-12 pt-24">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <HUDLabel id="001">Selected work</HUDLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                <DecodeText text="Three projects, one ecosystem" />
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground md:col-span-7 md:text-lg md:leading-relaxed">
              A connected suite spanning consumer test-prep, school
              management, and the desktop platform that ties them together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {projects.map((p) => (
              <Link
                key={p.href}
                to={p.href}
                className="cursor-target group relative block"
              >
                <BracketCorners />
                <div className="relative border border-border bg-card transition-colors group-hover:border-[#CBEE4C]/60">
                  <div className="font-hud flex items-center justify-between border-b border-border bg-card/80 px-5 py-2.5 text-[10px] uppercase tracking-[0.3em]">
                    <span className="text-[#CBEE4C]">▸ {p.code}</span>
                    <span className="text-muted-foreground">
                      {p.status}
                    </span>
                  </div>
                  <div className="flex h-full flex-col justify-between gap-12 p-8 md:p-10">
                    <div>
                      <div className="font-hud text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        {p.tag}
                      </div>
                      <h3 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                        {p.label}
                      </h3>
                      <p className="mt-3 max-w-md text-base text-muted-foreground md:text-lg">
                        {p.blurb}
                      </p>
                    </div>
                    <div className="transition-colors group-hover:text-[#CBEE4C]">
                      <ChevronCta>Enter dossier</ChevronCta>
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
                <DecodeText text="What happens when you hire me" />
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
              <CyberPanel
                label="PROFILE"
                code="PROTOCOL // 002"
                bracketColor="#CBEE4C"
                hazardStrip
              >
                <ul className="space-y-3 p-6 md:p-8">
                  {stats.map((s) => (
                    <li
                      key={s.label}
                      className="font-hud flex items-baseline justify-between gap-4 border-b border-border/60 pb-3 text-sm last:border-0 last:pb-0"
                    >
                      <span className="tracking-[0.15em] text-muted-foreground">
                        {s.label}
                      </span>
                      <span className="flex items-baseline gap-3">
                        <span className="text-2xl font-semibold text-[#CBEE4C] cyber-glow md:text-3xl">
                          <CountUp value={s.value} />
                        </span>
                        <span className="text-xs text-muted-foreground/70">
                          /10
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="font-hud border-t border-border bg-card/40 px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  ▸ NO BIOLOGICAL DATA WAS FOUND
                </div>
              </CyberPanel>
            </div>

            {/* Radar */}
            <div className="md:col-span-7">
              <CyberPanel
                label="CAPABILITY RADAR"
                code="v0.6.2"
                bracketColor="#5EEAD4"
              >
                <div className="p-6 md:p-10">
                  <div className="mx-auto aspect-square w-full max-w-[440px]">
                    <StatRadar stats={stats} />
                  </div>
                </div>
              </CyberPanel>
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

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className="cursor-target group relative block"
              >
                <BracketCorners />
                <div className="relative border border-border bg-card transition-colors group-hover:border-[#CBEE4C]/60">
                  <div className="font-hud flex items-center justify-between border-b border-border bg-card/80 px-4 py-2 text-[10px] uppercase tracking-[0.3em]">
                    <span className="text-[#CBEE4C]">▸ [{c.code}]</span>
                    <span className="text-muted-foreground">{c.label}</span>
                  </div>
                  <div className="p-6">
                    <div className="text-base font-medium transition-colors group-hover:text-[#CBEE4C] md:text-lg">
                      {c.value}
                    </div>
                    <div className="mt-4">
                      <ChevronCta>Open uplink</ChevronCta>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
