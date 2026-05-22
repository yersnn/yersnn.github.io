import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useInView } from '@/lib/use-in-view'
import { cn } from '@/lib/utils'

/* ─── GlitchText ───────────────────────────────────────────────────────
 * Periodic chromatic-aberration jolt on text (RGB shift). Pure CSS.
 * Pass `as` to render a different element (default span).
 */
interface GlitchTextProps {
  children: ReactNode
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'div'
}
export function GlitchText({
  children,
  className,
  as: Tag = 'span',
}: GlitchTextProps) {
  return <Tag className={cn('glitch-text inline-block', className)}>{children}</Tag>
}

/* ─── CyberOrnament ────────────────────────────────────────────────────
 * Arcane-inspired neon corner ornament — SVG, no image. Four jagged
 * splashes of color (cyan/magenta/lime/yellow) anchored at corners.
 * Continuously hue-shifts via CSS for a subtle living-neon feel.
 *
 * Use as: <CyberOrnament className="absolute inset-0 pointer-events-none opacity-50" />
 */
interface CyberOrnamentProps {
  className?: string
  glitch?: boolean
}
export function CyberOrnament({ className, glitch = true }: CyberOrnamentProps) {
  return (
    <svg
      viewBox="0 0 1000 600"
      className={cn(className, glitch && 'cyber-pulse')}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="ornament-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#ornament-glow)" fill="none" strokeWidth="2.5">
        {/* Top-left — jagged lightning crest */}
        <path
          d="M 10 110 L 60 60 L 40 40 L 90 50 L 70 20 L 130 30 L 110 5 L 180 25"
          stroke="#CBEE4C"
        />
        <path
          d="M 22 130 L 80 80 L 65 60 L 110 70"
          stroke="#5EEAD4"
          opacity="0.85"
        />
        <path
          d="M 40 150 L 90 105 L 75 90 L 130 95"
          stroke="#FF48AA"
          opacity="0.7"
        />

        {/* Top-right — chevron splash */}
        <path
          d="M 990 110 L 940 60 L 960 40 L 910 50 L 930 20 L 870 30 L 890 5 L 820 25"
          stroke="#CBEE4C"
        />
        <path
          d="M 978 130 L 920 80 L 935 60 L 890 70"
          stroke="#5EEAD4"
          opacity="0.85"
        />
        <path
          d="M 960 150 L 910 105 L 925 90 L 870 95"
          stroke="#FF48AA"
          opacity="0.7"
        />

        {/* Bottom-left — diagonal sparks */}
        <path
          d="M 10 490 L 60 540 L 40 560 L 90 550 L 70 580 L 130 570"
          stroke="#CBEE4C"
        />
        <path
          d="M 22 470 L 80 520 L 65 540 L 110 530"
          stroke="#5EEAD4"
          opacity="0.85"
        />

        {/* Bottom-right — angular sparks */}
        <path
          d="M 990 490 L 940 540 L 960 560 L 910 550 L 930 580 L 870 570"
          stroke="#CBEE4C"
        />
        <path
          d="M 978 470 L 920 520 L 935 540 L 890 530"
          stroke="#5EEAD4"
          opacity="0.85"
        />

        {/* Center dots — halftone effect */}
        <circle cx="50" cy="80" r="3" fill="#5EEAD4" stroke="none" />
        <circle cx="80" cy="100" r="2" fill="#5EEAD4" stroke="none" />
        <circle cx="950" cy="80" r="3" fill="#5EEAD4" stroke="none" />
        <circle cx="920" cy="100" r="2" fill="#5EEAD4" stroke="none" />
        <circle cx="50" cy="520" r="2" fill="#FF48AA" stroke="none" />
        <circle cx="950" cy="520" r="2" fill="#FF48AA" stroke="none" />
      </g>
    </svg>
  )
}

/* ─── StatusTicker ─────────────────────────────────────────────────────
 * Horizontal marquee — repeating status text. Pure CSS animation.
 * Common cyberpunk dashboard pattern (running readout bar).
 */
interface StatusTickerProps {
  items: string[]
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
}
export function StatusTicker({
  items,
  className,
  speed = 'normal',
}: StatusTickerProps) {
  const duration = { slow: 90, normal: 50, fast: 25 }[speed]
  // Duplicate the list so the keyframe (0% → -50%) loops seamlessly.
  const doubled = [...items, ...items]
  return (
    <div
      className={cn(
        'font-hud overflow-hidden border-y border-border bg-card/40 py-2 text-[10px] uppercase tracking-[0.3em] text-[#CBEE4C]',
        className,
      )}
    >
      <div
        className="flex w-max items-center gap-8"
        style={{ animation: `ticker-scroll ${duration}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span>▸ {item}</span>
            <span aria-hidden="true" className="text-muted-foreground">
              //
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── CountUp ──────────────────────────────────────────────────────────
 * Number that animates from 0 to `value` over `duration` ms, triggered
 * when the element enters the viewport. Used on the radar stats.
 */
interface CountUpProps {
  value: number
  duration?: number
  className?: string
}
export function CountUp({
  value,
  duration = 900,
  className,
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true })
  const [n, setN] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (t: number) => {
      const progress = Math.min(1, (t - start) / duration)
      // Ease-out cubic for a snappy finish
      const eased = 1 - Math.pow(1 - progress, 3)
      setN(Math.round(eased * value))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {n}
    </span>
  )
}

/* ─── DecodeText ───────────────────────────────────────────────────────
 * Letters scramble through random chars before settling on the target.
 * Triggered on inView. Cyberpunk staple.
 */
interface DecodeTextProps {
  text: string
  className?: string
  duration?: number
}
export function DecodeText({
  text,
  className,
  duration = 900,
}: DecodeTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true })
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (!inView) return
    const chars = '!<>-_\\/[]{}—=+*^?#________░▒▓'
    const start = performance.now()
    const id = setInterval(() => {
      const progress = Math.min(1, (performance.now() - start) / duration)
      const next = text
        .split('')
        .map((ch, i) => {
          // Reveal progressively from left
          if (i / text.length < progress - 0.1) return ch
          if (ch === ' ') return ' '
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')
      setOut(next)
      if (progress >= 1) {
        setOut(text)
        clearInterval(id)
      }
    }, 40)
    return () => clearInterval(id)
  }, [inView, text, duration])

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  )
}
