import { useState } from 'react'
import { useInView } from '@/lib/use-in-view'

const themes = [
  { src: '/themes/dark-1.jpg', label: 'Dark · 01' },
  { src: '/themes/light-1.jpg', label: 'Light · 01' },
  { src: '/themes/dark-2.jpg', label: 'Dark · 02' },
  { src: '/themes/light-2.jpg', label: 'Light · 02' },
  { src: '/themes/dark-3.jpg', label: 'Dark · 03' },
  { src: '/themes/light-3.jpg', label: 'Light · 03' },
  { src: '/themes/dark-4.jpg', label: 'Dark · 04' },
  { src: '/themes/light-4.jpg', label: 'Light · 04' },
  { src: '/themes/dark-5.jpg', label: 'Dark · 05' },
  { src: '/themes/light-5.jpg', label: 'Light · 05' },
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
            <div className="text-3xl font-bold tracking-tight md:text-4xl">
              10 variations
            </div>
            <div className="mt-3 text-sm font-medium text-white">
              Hover to pop.
            </div>
          </div>
        </div>

        {themes.map((theme, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              // Same ratio as the 1600×870 screenshots, so nothing is cropped.
              width: '184px',
              height: '100px',
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
              className="group relative h-full w-full"
              onMouseEnter={() => setHoveredId(i)}
              onMouseLeave={() =>
                setHoveredId((cur) => (cur === i ? null : cur))
              }
            >
              <div
                className="relative h-full w-full overflow-hidden rounded-xl border border-white/15 shadow-xl ring-1 ring-black/40 transition-transform duration-300 group-hover:scale-[3] group-hover:z-50 group-hover:border-white/60"
                style={{ willChange: 'transform' }}
              >
                <img
                  src={theme.src}
                  alt={theme.label}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#0b0c0e] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:delay-100">
                {theme.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
