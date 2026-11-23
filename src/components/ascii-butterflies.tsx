import { useEffect, useRef } from 'react'

// Two wing poses; alternating them reads as flapping.
const OPEN = ['  .:.   .:.  ', ' (:::)-(:::) ', "  ':'   ':'  "].join('\n')
const CLOSED = ['    .:.     ', '   (:::)    ', "    ':'     "].join('\n')

type Flyer = {
  cx: number
  cy: number
  ax: number
  ay: number
  wx: number
  wy: number
  phase: number
  delay: number
  life: number
}

// Positions are fractions of the container; life is seconds after the delay.
const FLYERS: Flyer[] = [
  { cx: 0.3, cy: 0.42, ax: 0.2, ay: 0.12, wx: 0.32, wy: 0.52, phase: 0, delay: 0, life: 9 },
  { cx: 0.68, cy: 0.56, ax: 0.16, ay: 0.14, wx: 0.41, wy: 0.27, phase: 1.9, delay: 0.7, life: 11 },
]

const FADE_IN = 1.2
const FADE_OUT = 2.2
const FLAP_PERIOD = 0.26

/**
 * ASCII butterflies that flutter over the expanded photo and then fade away.
 * Motion starts once the parent overlay is fully visible, so it plays only
 * when the photo is expanded. Renders nothing for reduced-motion users.
 */
export default function AsciiButterflies() {
  const root = useRef<HTMLDivElement>(null)
  const nodes = useRef<(HTMLPreElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const end = Math.max(...FLYERS.map((f) => f.delay + f.life))
    let raf = 0
    let startedAt: number | null = null
    let lastPose = ''

    const tick = (now: number) => {
      const host = root.current
      if (!host) return

      // Only start once the expand overlay has faded in (it is inline-styled by ScrollExpand).
      const overlayOpacity = parseFloat(host.parentElement?.style.opacity || '0')
      if (startedAt === null) {
        if (overlayOpacity < 0.95) {
          raf = requestAnimationFrame(tick)
          return
        }
        startedAt = now
      }

      const t = (now - startedAt) / 1000
      const pose = Math.floor(t / FLAP_PERIOD) % 2 === 0 ? OPEN : CLOSED
      const poseChanged = pose !== lastPose
      lastPose = pose

      FLYERS.forEach((f, i) => {
        const node = nodes.current[i]
        if (!node) return
        const lt = t - f.delay
        if (lt < 0 || lt > f.life) {
          node.style.opacity = '0'
          return
        }
        const fade = Math.min(1, lt / FADE_IN) * Math.min(1, (f.life - lt) / FADE_OUT)
        const x = f.cx + f.ax * Math.sin(f.wx * lt + f.phase)
        const y = f.cy + f.ay * Math.sin(f.wy * lt + f.phase * 0.5)
        node.style.left = `${x * 100}%`
        node.style.top = `${y * 100}%`
        node.style.opacity = String(fade)
        if (poseChanged) node.textContent = pose
      })

      if (t < end) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={root} className="ascii-butterflies" aria-hidden="true">
      {FLYERS.map((_, i) => (
        <pre
          key={i}
          ref={(el) => {
            nodes.current[i] = el
          }}
          className="ascii-butterfly"
          style={{ opacity: 0 }}
        >
          {OPEN}
        </pre>
      ))}
    </div>
  )
}
