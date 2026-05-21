import { ScreensCarousel } from '@/components/ielts/screens-carousel'

const mocks = [
  { src: '/mocks/reading.png', alt: 'Reading mock test' },
  { src: '/mocks/writing.png', alt: 'Writing mock test' },
  { src: '/mocks/listening.png', alt: 'Listening mock test' },
  { src: '/mocks/speaking.png', alt: 'Speaking mock test' },
]

export function MocksShowcase() {
  return (
    <ScreensCarousel
      items={mocks.map((m) => (
        <img
          key={m.src}
          src={m.src}
          alt={m.alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ))}
    />
  )
}
