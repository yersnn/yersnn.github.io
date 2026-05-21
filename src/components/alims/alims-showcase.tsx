import { ScreensCarousel } from '@/components/ielts/screens-carousel'

const screens = [
  { src: '/alims/screen-1.png', alt: 'Courses screen' },
  { src: '/alims/screen-2.png', alt: 'Screen 2' },
  { src: '/alims/screen-3.png', alt: 'Screen 3' },
  { src: '/alims/screen-4.png', alt: 'Screen 4' },
  { src: '/alims/screen-5.png', alt: 'Screen 5' },
]

export function AlimsShowcase() {
  return (
    <ScreensCarousel
      frame="none"
      cardWidthPx={340}
      items={screens.map((s) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          loading="lazy"
          className="block h-auto w-full drop-shadow-2xl"
        />
      ))}
    />
  )
}
