import type { ReactNode } from 'react'
import { MacbookFrame } from '@/components/ui/macbook-frame'

interface ScreensCarouselProps {
  items: ReactNode[]
  durationSeconds?: number
  cardWidthPx?: number
  frame?: 'macbook' | 'none'
}

export function ScreensCarousel({
  items,
  durationSeconds = 80,
  cardWidthPx = 760,
  frame = 'macbook',
}: ScreensCarouselProps) {
  return (
    <div className="group relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent"
        aria-hidden="true"
      />
      <div
        className="flex w-max items-center group-hover:[animation-play-state:paused]"
        style={{
          animation: `scenes-scroll ${durationSeconds}s linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="shrink-0 px-6"
            style={{ width: `${cardWidthPx}px` }}
          >
            {frame === 'macbook' ? <MacbookFrame>{item}</MacbookFrame> : item}
          </div>
        ))}
      </div>
    </div>
  )
}
