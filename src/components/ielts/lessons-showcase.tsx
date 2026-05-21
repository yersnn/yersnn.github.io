import { ScreensCarousel } from '@/components/ielts/screens-carousel'

const lessons = [
  { src: '/lessons/lesson-1.png', alt: 'Skim reading challenge' },
  { src: '/lessons/lesson-2.png', alt: 'Lesson flow' },
  { src: '/lessons/lesson-3.png', alt: 'Lesson page' },
]

export function LessonsShowcase() {
  return (
    <ScreensCarousel
      items={lessons.map((l) => (
        <img
          key={l.src}
          src={l.src}
          alt={l.alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ))}
    />
  )
}
