import { ScreensCarousel } from '@/components/ielts/screens-carousel'

// Rendered into a real MacBook Pro 14 mockup (tilted view); the frame is in the image.
const mocks = [
  { src: '/mockups/mocks/reading.webp', alt: 'Reading mock test' },
  { src: '/mockups/mocks/writing.webp', alt: 'Writing mock test' },
  { src: '/mockups/mocks/listening.webp', alt: 'Listening mock test' },
  { src: '/mockups/mocks/speaking.webp', alt: 'Speaking mock test' },
]

export function MocksShowcase() {
  return (
    <ScreensCarousel
      frame="none"
      items={mocks.map((m) => (
        <img key={m.src} src={m.src} alt={m.alt} loading="lazy" className="block h-auto w-full" />
      ))}
    />
  )
}
