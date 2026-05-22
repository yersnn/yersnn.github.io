import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'

/**
 * ContainerScroll — adapted from aceternity-ui.
 * As the section enters the viewport, the "device" card tilts from a 20° rotateX
 * down to flat, and scales subtly. We restyled the chrome with a cyber-dark
 * border + lime/cyan accent corners to fit the portfolio aesthetic.
 */
export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode
  children: ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scaleDims = (): [number, number] => (isMobile ? [0.75, 0.92] : [1.05, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDims())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      ref={containerRef}
      className="relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20"
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{ perspective: '1000px' }}
      >
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

function Header({
  translate,
  children,
}: {
  translate: MotionValue<number>
  children: ReactNode
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto max-w-5xl text-center"
    >
      {children}
    </motion.div>
  )
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  children: ReactNode
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="relative mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[28px] border-2 border-[#cbee4c]/40 bg-[#0e0f12] p-2 shadow-2xl md:h-[40rem] md:p-4"
    >
      {/* Bracket corners (cyber chrome) */}
      <span className="pointer-events-none absolute -left-[2px] -top-[2px] h-5 w-5 border-l-2 border-t-2 border-[#cbee4c]" />
      <span className="pointer-events-none absolute -right-[2px] -top-[2px] h-5 w-5 border-r-2 border-t-2 border-[#5eead4]" />
      <span className="pointer-events-none absolute -bottom-[2px] -left-[2px] h-5 w-5 border-b-2 border-l-2 border-[#5eead4]" />
      <span className="pointer-events-none absolute -bottom-[2px] -right-[2px] h-5 w-5 border-b-2 border-r-2 border-[#cbee4c]" />
      <div className="h-full w-full overflow-hidden rounded-[20px] bg-[#0a0a0c]">
        {children}
      </div>
    </motion.div>
  )
}
