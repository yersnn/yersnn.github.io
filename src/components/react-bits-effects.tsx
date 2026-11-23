import { useEffect, useRef, useState, type ReactNode } from 'react'

export function FadeContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => { const node = ref.current; if (!node) return; const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } }, { threshold: .16 }); io.observe(node); return () => io.disconnect() }, [])
  return <div ref={ref} className={`rb-fade ${visible ? 'rb-fade-visible' : ''} ${className}`}>{children}</div>
}

export function DitherVeil() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const node = ref.current; if (!node) return; const move = (event: PointerEvent) => { node.style.setProperty('--x', `${event.clientX}px`); node.style.setProperty('--y', `${event.clientY}px`) }; window.addEventListener('pointermove', move); return () => window.removeEventListener('pointermove', move) }, [])
  return <div ref={ref} className="rb-dither-veil" aria-hidden="true" />
}

export function PixelSwap({ before, after }: { before: string; after: string }) {
  const [active, setActive] = useState(false)
  return <div className={`rb-pixel-swap ${active ? 'rb-pixel-active' : ''}`} onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)}><img src={before} alt="" /><img src={after} alt="" /></div>
}

export function LaserFlow() { return <div className="rb-laser-flow" aria-hidden="true"><i /><i /><i /></div> }

export function FallingText({ children }: { children: string }) {
  return <div className="rb-falling-text" aria-label={children}>{children.split('').map((letter, index) => <span key={`${letter}-${index}`} style={{ '--i': index } as React.CSSProperties}>{letter === ' ' ? '\u00a0' : letter}</span>)}</div>
}
