import { ScreensCarousel } from '@/components/ielts/screens-carousel'

// Rendered into a real MacBook Pro 14 mockup (front view); the frame is in the image.
const lessons = [
  { src: '/mockups/lessons/lesson-1.webp', alt: 'Skim reading challenge' },
  { src: '/mockups/lessons/lesson-2.webp', alt: 'Lesson flow' },
  { src: '/mockups/lessons/lesson-3.webp', alt: 'Lesson page' },
]

export function LessonsShowcase() {
  return (
    <ScreensCarousel
      frame="none"
      items={lessons.map((l) => (
        <img key={l.src} src={l.src} alt={l.alt} loading="lazy" className="block h-auto w-full" />
      ))}
    />
  )
}
