import { LiveScene, type SceneMode } from '@/components/ielts/live-scene'
import { ScreensCarousel } from '@/components/ielts/screens-carousel'

const modes: SceneMode[] = ['morning', 'day', 'night']

export function SkyShowcase() {
  return (
    <ScreensCarousel
      items={modes.map((mode) => (
        <LiveScene key={mode} fixedMode={mode} />
      ))}
    />
  )
}
