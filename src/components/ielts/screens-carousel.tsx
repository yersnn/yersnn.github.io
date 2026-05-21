import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MacbookFrame } from '@/components/ui/macbook-frame'
import { cn } from '@/lib/utils'

interface ScreensCarouselProps {
  items: ReactNode[]
  cardWidthPx?: number
  frame?: 'macbook' | 'none'
}

export function ScreensCarousel({
  items,
  cardWidthPx = 760,
  frame = 'macbook',
}: ScreensCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const update = () => {
      setAtStart(el.scrollLeft <= 4)
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items.length])

  function scrollByOne(direction: 1 | -1) {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: cardWidthPx * direction, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="snap-x snap-mandatory overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex w-max items-center">
          <div className="shrink-0" style={{ width: 'max(8vw, 24px)' }} />
          {items.map((item, i) => (
            <div
              key={i}
              className="shrink-0 snap-center px-3"
              style={{ width: `${cardWidthPx}px` }}
            >
              {frame === 'macbook' ? <MacbookFrame>{item}</MacbookFrame> : item}
            </div>
          ))}
          <div className="shrink-0" style={{ width: 'max(8vw, 24px)' }} />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent sm:w-32"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent sm:w-32"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => scrollByOne(-1)}
        disabled={atStart}
        aria-label="Previous"
        className={cn(
          'cursor-target absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background/60 p-3 text-foreground backdrop-blur transition-all hover:border-foreground/60 hover:bg-background/90 disabled:pointer-events-none disabled:opacity-0',
        )}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scrollByOne(1)}
        disabled={atEnd}
        aria-label="Next"
        className={cn(
          'cursor-target absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background/60 p-3 text-foreground backdrop-blur transition-all hover:border-foreground/60 hover:bg-background/90 disabled:pointer-events-none disabled:opacity-0',
        )}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  )
}
