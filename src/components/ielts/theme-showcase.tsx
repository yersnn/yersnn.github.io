import { useState } from 'react'
import { useInView } from '@/lib/use-in-view'

const themes = [
  { src: '/themes/theme-1.png', label: 'Default · Dark' },
  { src: '/themes/theme-2.png', label: 'Default · Light' },
  { src: '/themes/theme-3.png', label: 'Purple · Dark' },
  { src: '/themes/theme-4.png', label: 'Purple · Light' },
  { src: '/themes/theme-5.png', label: 'Pink · Dark' },
  { src: '/themes/theme-6.png', label: 'Pink · Light' },
  { src: '/themes/theme-7.png', label: 'Blue · Dark' },
  { src: '/themes/theme-8.png', label: 'Blue · Light' },
]

const ORBIT_DURATION = 55

export function ThemeShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '200px' })
  const paused = hoveredId !== null || !inView

  return (
    <div ref={ref} className="relative w-full px-4">
      <style>{`
        @keyframes theme-ellipse {
          from { offset-distance: 0%; }
          to   { offset-distance: 100%; }
        }
      `}</style>

      <div className="relative mx-auto h-[480px] w-full max-w-6xl">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Theme presets
            </div>
            <div className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              8 variations
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Hover to pop.
            </div>
          </div>
        </div>

        {themes.map((theme, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: '170px',
              height: '105px',
              offsetPath: 'ellipse(min(46vw, 540px) 170px at 50% 50%)',
              offsetRotate: '0deg',
              willChange: 'offset-distance',
              animation: `theme-ellipse ${ORBIT_DURATION}s linear infinite`,
              animationDelay: `${-(i / themes.length) * ORBIT_DURATION}s`,
              animationPlayState: paused ? 'paused' : 'running',
              zIndex: hoveredId === i ? 50 : 1,
            }}
          >
            <div
              className="cursor-target group relative h-full w-full"
              onMouseEnter={() => setHoveredId(i)}
              onMouseLeave={() =>
                setHoveredId((cur) => (cur === i ? null : cur))
              }
            >
              <div
                className="relative h-full w-full overflow-hidden rounded-xl border border-white/15 shadow-xl ring-1 ring-black/40 transition-transform duration-300 group-hover:scale-[4] group-hover:z-50 group-hover:border-white/60"
                style={{ willChange: 'transform' }}
              >
                <img
                  src={theme.src}
                  alt={theme.label}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:delay-100">
                {theme.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
