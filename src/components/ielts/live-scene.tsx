import { useEffect, useState } from 'react'
import FrameDay from '@/imports/Frame1171276701-1/Frame1171276701'
import FrameNight from '@/imports/Frame1171276702-2/Frame1171276702'
import FrameMorning from '@/imports/Frame1171276717-1/Frame1171276717-2-5828'
import { AnimatedClouds } from './animated-clouds'
import { useInView } from '@/lib/use-in-view'

export type SceneMode = 'day' | 'morning' | 'night'

const gradients: Record<SceneMode, string> = {
  day: 'linear-gradient(175.859deg, rgb(27, 100, 189) 25.937%, rgb(194, 221, 255) 94.628%)',
  morning:
    'linear-gradient(175.859deg, rgb(104, 94, 153) 25.937%, rgb(251, 211, 156) 94.628%)',
  night:
    'linear-gradient(180deg, rgb(0, 4, 27) 0%, rgb(7, 26, 75) 50.104%, rgb(33, 67, 144) 80.616%, rgb(12, 41, 107) 100%)',
}

const DESIGN_WIDTH = 1440
const DESIGN_HEIGHT = 900
const CYCLE_MS = 9000

const order: SceneMode[] = ['day', 'morning', 'night']

interface LiveSceneProps {
  /** Skip auto-cycling and stay on this mode. */
  fixedMode?: SceneMode
}

export function LiveScene({ fixedMode }: LiveSceneProps) {
  const { ref: containerRef, inView } = useInView<HTMLDivElement>({
    rootMargin: '300px',
  })
  const [mode, setMode] = useState<SceneMode>(fixedMode ?? 'day')
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (fixedMode) {
      setMode(fixedMode)
      return
    }
    if (!inView) return
    const id = setInterval(() => {
      setMode((m) => order[(order.indexOf(m) + 1) % order.length])
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [fixedMode, inView])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / DESIGN_WIDTH)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [containerRef])

  const Frame =
    mode === 'day' ? FrameDay : mode === 'morning' ? FrameMorning : FrameNight

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        backgroundImage: gradients[mode],
        transition: 'background-image 1.5s ease',
      }}
    >
      <style>{sceneCss}</style>
      <div
        className={`scene scene-${mode}${inView ? '' : ' scene-paused'}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}
      >
        <Frame />
        {mode === 'day' && (
          <AnimatedClouds
            containerWidth={`${DESIGN_WIDTH}px`}
            paused={!inView}
          />
        )}
      </div>
    </div>
  )
}

const sceneCss = `
.scene > div { background-image: none !important; }

.scene-day [class~="top-[693px]"][class~="left-[-42px]"],
.scene-night [class~="top-[501px]"][class~="left-0"][class~="w-[1493px]"],
.scene-morning [class~="bottom-[-50.63px]"][class~="w-[1523px]"] {
  filter: blur(2px);
}

.scene [class*="bg-[rgba(0,0,0,0.2)]"][class*="rounded-"],
.scene [class*="bg-[rgba(255,255,255,0.04)]"][class*="rounded-"],
.scene [class*="bg-[rgba(255,255,255,0.05)]"][class*="rounded-"] {
  backdrop-filter: blur(30px) saturate(130%) brightness(0.8);
  -webkit-backdrop-filter: blur(30px) saturate(130%) brightness(0.8);
  background-color: rgba(30, 40, 55, 0.2) !important;
}

@keyframes cloud-drift {
  0%   { transform: translateX(var(--start)); }
  100% { transform: translateX(var(--end)); }
}

.scene-paused [class~="top-[406px]"][class~="left-[1171px]"],
.scene-paused [class~="top-[77px]"][class~="left-[18px]"],
.scene-paused [class~="top-[497px]"][class~="left-[899px]"],
.scene-paused [class~="top-[347px]"][class~="left-[291px]"],
.scene-paused [class~="top-[105px]"][class~="left-[1176px]"],
.scene-paused [class~="top-[304px]"][class~="left-[1160px]"],
.scene-paused [class~="top-[281px]"][class~="left-[16px]"],
.scene-paused [class~="top-[49px]"][class~="left-[1106px]"],
.scene-paused [class~="top-[330px]"][class~="left-[1169px]"],
.scene-paused [class~="top-[202px]"][class~="left-[1207px]"],
.scene-paused [class~="top-[442px]"][class~="left-[836px]"],
.scene-paused [class~="top-[177px]"][class~="left-[76px]"],
.scene-paused [class~="top-[515.61px]"][class~="left-[1189px]"],
.scene-paused [class~="top-[532.61px]"][class~="left-[-11px]"],
.scene-paused [class~="top-[-44px]"][class~="left-[1148px]"],
.scene-paused [class~="top-[657px]"][class~="left-[281px]"],
.scene-paused [class~="top-[326.18px]"][class~="left-[-18.84px]"],
.scene-paused [class~="top-[-32.07px]"][class~="left-[-39.4px]"] {
  animation-play-state: paused !important;
}

.scene-day [class~="top-[441px]"][class~="left-[47px]"],
.scene-day [class~="top-[251px]"][class~="left-[1148px]"],
.scene-day [class~="top-[168px]"][class~="left-[1024px]"],
.scene-day [class~="top-[32px]"][class~="left-[1181px]"],
.scene-day [class~="top-[447px]"][class~="left-[1104px]"],
.scene-day [class~="top-0"][class~="left-[-6px]"],
.scene-day [class~="top-[187px]"][class~="left-[-8px]"],
.scene-day [class~="top-[558px]"][class~="right-[-15.4px]"] {
  display: none;
}

.scene-night [class~="top-[406px]"][class~="left-[1171px]"],
.scene-night [class~="top-[77px]"][class~="left-[18px]"],
.scene-night [class~="top-[497px]"][class~="left-[899px]"],
.scene-night [class~="top-[347px]"][class~="left-[291px]"],
.scene-night [class~="top-[105px]"][class~="left-[1176px]"],
.scene-night [class~="top-[304px]"][class~="left-[1160px]"],
.scene-night [class~="top-[281px]"][class~="left-[16px]"],
.scene-night [class~="top-[49px]"][class~="left-[1106px]"],
.scene-morning [class~="top-[330px]"][class~="left-[1169px]"],
.scene-morning [class~="top-[202px]"][class~="left-[1207px]"],
.scene-morning [class~="top-[442px]"][class~="left-[836px]"],
.scene-morning [class~="top-[177px]"][class~="left-[76px]"],
.scene-morning [class~="top-[515.61px]"][class~="left-[1189px]"],
.scene-morning [class~="top-[532.61px]"][class~="left-[-11px]"],
.scene-morning [class~="top-[-44px]"][class~="left-[1148px]"],
.scene-morning [class~="top-[657px]"][class~="left-[281px]"],
.scene-morning [class~="top-[326.18px]"][class~="left-[-18.84px]"],
.scene-morning [class~="top-[-32.07px]"][class~="left-[-39.4px]"] {
  filter: blur(2px);
  will-change: transform;
  animation-name: cloud-drift;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.scene-night [class~="top-[406px]"][class~="left-[1171px]"] { --start: -1453.445px; --end: calc(1440px - 1171px); animation-duration: 220s; animation-delay: 0s; }
.scene-night [class~="top-[77px]"][class~="left-[18px]"]    { --start: -264.112px;  --end: calc(1440px - 18px);   animation-duration: 260s; animation-delay: -60s; }
.scene-night [class~="top-[497px]"][class~="left-[899px]"]  { --start: -1096.034px; --end: calc(1440px - 899px);  animation-duration: 200s; animation-delay: -120s; }
.scene-night [class~="top-[347px]"][class~="left-[291px]"]  { --start: -541.687px;  --end: calc(1440px - 291px);  animation-duration: 240s; animation-delay: -30s; }
.scene-night [class~="top-[105px]"][class~="left-[1176px]"] { --start: -1399.126px; --end: calc(1440px - 1176px); animation-duration: 280s; animation-delay: -180s; }
.scene-night [class~="top-[304px]"][class~="left-[1160px]"] { --start: -1529.576px; --end: calc(1440px - 1160px); animation-duration: 250s; animation-delay: -90s; }
.scene-night [class~="top-[281px]"][class~="left-[16px]"]   { --start: -399.014px;  --end: calc(1440px - 16px);   animation-duration: 230s; animation-delay: -150s; }
.scene-night [class~="top-[49px]"][class~="left-[1106px]"]  { --start: -1168.101px; --end: calc(1440px - 1106px); animation-duration: 300s; animation-delay: -200s; }

.scene-morning [class~="top-[330px]"][class~="left-[1169px]"]      { --start: -1438.463px; --end: calc(1440px - 1169px); animation-duration: 230s; animation-delay: 0s; }
.scene-morning [class~="top-[202px]"][class~="left-[1207px]"]      { --start: -1422.332px; --end: calc(1440px - 1207px); animation-duration: 260s; animation-delay: -80s; }
.scene-morning [class~="top-[442px]"][class~="left-[836px]"]       { --start: -1189px;     --end: calc(1440px - 836px);  animation-duration: 210s; animation-delay: -40s; }
.scene-morning [class~="top-[177px]"][class~="left-[76px]"]        { --start: -404.805px;  --end: calc(1440px - 76px);   animation-duration: 240s; animation-delay: -160s; }
.scene-morning [class~="top-[515.61px]"][class~="left-[1189px]"]   { --start: -1404.332px; --end: calc(1440px - 1189px); animation-duration: 250s; animation-delay: -120s; }
.scene-morning [class~="top-[532.61px]"][class~="left-[-11px]"]    { --start: -288.786px;  --end: calc(1440px + 11px);   animation-duration: 270s; animation-delay: -50s; }
.scene-morning [class~="top-[-44px]"][class~="left-[1148px]"]      { --start: -1449px;     --end: calc(1440px - 1148px); animation-duration: 220s; animation-delay: -200s; }
.scene-morning [class~="top-[657px]"][class~="left-[281px]"]       { --start: -496.332px;  --end: calc(1440px - 281px);  animation-duration: 280s; animation-delay: -100s; }
.scene-morning [class~="top-[326.18px]"][class~="left-[-18.84px]"] { --start: -186.86px;   --end: calc(1440px + 18.84px); animation-duration: 235s; animation-delay: -180s; }
.scene-morning [class~="top-[-32.07px]"][class~="left-[-39.4px]"]  { --start: -246.862px;  --end: calc(1440px + 39.4px);  animation-duration: 290s; animation-delay: -30s; }
`
