import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { HUDLabel } from '@/components/ui/hud-label'
import { HazardDivider } from '@/components/ui/hazard-divider'
import {
  BracketCorners,
  StatusBadge,
  ChevronCta,
} from '@/components/ui/cyber'
import {
  GlitchText,
  StatusTicker,
  DecodeText,
} from '@/components/ui/cyber-fx'
import { EntryTicket } from '@/components/ui/entry-ticket'
import HeroAsciiOne from '@/components/ui/hero-ascii-one'
import { cn } from '@/lib/utils'

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

type IntroState = 'curtain' | 'flying' | 'idle'

/**
 * Intro sequence:
 * 1. On first visit only (sessionStorage gate), ticket is the sole visible
 *    element, positioned dead-centered at the top of the viewport. The
 *    existing ticket-drop CSS animation makes it "print" in from above.
 * 2. After ~1.7s (drop done), we set state→'flying': ticket transitions back
 *    to its natural right-of-name spot, and all other content glitch-reveals
 *    in with staggered delays.
 * 3. After the transitions finish, state→'idle' cleans up CSS classes.
 */
function useIntroSequence(ticketRef: React.RefObject<HTMLDivElement | null>) {
  const [state, setState] = useState<IntroState>(() => {
    if (typeof window === 'undefined') return 'idle'
    // Respect reduced-motion + treat repeat visits as already-seen
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
      return 'idle'
    if (sessionStorage.getItem('intro-shown') === '1') return 'idle'
    return 'curtain'
  })

  // Measure natural position once we're in curtain and assign CSS vars so
  // the ticket renders at viewport-center instantly.
  useLayoutEffect(() => {
    if (state !== 'curtain' || !ticketRef.current) return
    const el = ticketRef.current
    const rect = el.getBoundingClientRect()
    // We want the ticket centered horizontally at top:24
    const tx = window.innerWidth / 2 - (rect.left + rect.width / 2)
    const ty = 24 - rect.top
    el.style.setProperty('--intro-tx', `${tx}px`)
    el.style.setProperty('--intro-ty', `${ty}px`)
  }, [state, ticketRef])

  // Toggle body classes so the global CyberNav + TargetCursor can hide/reveal
  // along with the page content.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('intro-curtain-active', state === 'curtain')
    root.classList.toggle('intro-flying-active', state === 'flying')
    return () => {
      root.classList.remove('intro-curtain-active', 'intro-flying-active')
    }
  }, [state])

  // Curtain → Flying (ticket prints done, time to reveal everything)
  useEffect(() => {
    if (state !== 'curtain') return
    const t = setTimeout(() => setState('flying'), 1700)
    return () => clearTimeout(t)
  }, [state])

  // Flying → Idle (transitions done, mark as seen)
  useEffect(() => {
    if (state !== 'flying') return
    const t = setTimeout(() => {
      setState('idle')
      try {
        sessionStorage.setItem('intro-shown', '1')
      } catch {
        // sessionStorage may be unavailable (e.g. private mode); ignore.
      }
    }, 1400)
    return () => clearTimeout(t)
  }, [state])

  return state
}

export function HomePage() {
  const ticketRef = useRef<HTMLDivElement>(null)
  const intro = useIntroSequence(ticketRef)

  // Content is hidden during curtain, reveals during flying, idle = normal
  const hidden = intro === 'curtain'
  const revealing = intro === 'flying'

  const ticketIntroClass =
    intro === 'curtain' ? 'intro-curtain' : intro === 'flying' ? 'intro-flying' : ''

  return (
    <div className="relative cyber-grid-fine">
      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-background pt-40 pb-20">
        <div className="scanlines-drift pointer-events-none absolute inset-0 mix-blend-overlay opacity-40" />

        <div className="relative mx-auto max-w-[1600px] px-12">
          <EntryTicket
            ref={ticketRef}
            className={cn(
              'right-12 top-32 xl:right-24',
              ticketIntroClass,
            )}
            topLeft="ACCESS"
            topRight="PASS"
            eventBoldLeft="yer"
            eventLight="snn"
            eventSub="DESIGNER 2026"
            number="#001"
          />

          <div
            className={cn(
              hidden && 'intro-hidden',
              revealing && 'intro-reveal',
            )}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <HUDLabel id="000">Portfolio</HUDLabel>
              <StatusBadge tone="lime" variant="solid">
                ONLINE
              </StatusBadge>
              <StatusBadge tone="cyan" variant="outline">
                v2.6.1
              </StatusBadge>
            </div>
            <h1 className="max-w-[10ch] text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl xl:text-8xl">
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
        </div>
      </header>

      {/* Status ticker bar (cyberpunk dashboard staple) */}
      <div
        className={cn(
          hidden && 'intro-hidden',
          revealing && 'intro-reveal intro-reveal-d1',
        )}
      >
        <StatusTicker
          items={[
            'SYSTEM ONLINE',
            'DOSSIER LOADED · 003 ACTIVE',
            'SIGNAL: STRONG',
            'PROTOCOL // 002',
            'NIGHT CITY · 2026',
            'UPLINK READY',
            'NO BIOLOGICAL DATA WAS FOUND',
          ]}
          speed="slow"
        />
      </div>

      {/* ─── Selected work ─────────────────────────────────────────── */}
      <div
        className={cn(
          'relative bg-background',
          hidden && 'intro-hidden',
          revealing && 'intro-reveal intro-reveal-d2',
        )}
      >
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
                    <span className="text-muted-foreground">{p.status}</span>
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

        {/* (Contact CTA is rendered as <HeroAsciiOne /> below — the
            UnicornStudio hero at the very bottom uses the contacts as text.) */}
        <div className="pb-12" />
      </div>

      {/* ─── Closing CTA: ENDLESS UPLINK ─────────────────────────── */}
      <div
        className={cn(
          hidden && 'intro-hidden',
          revealing && 'intro-reveal intro-reveal-d2',
        )}
      >
        <HeroAsciiOne />
      </div>
    </div>
  )
}
