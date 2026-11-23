import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const projects = [
  { href: '/ielts', number: '01', title: 'IELTS Prep', type: 'Web experience', description: 'A focused language-learning world built around rhythm, feedback, and momentum.', accent: 'lime' },
  { href: '/alims', number: '02', title: 'Test Prep App', type: 'iOS · Android', description: 'A mobile companion that gives learners a clear next step every time they open it.', accent: 'blue' },
  { href: '/b2b-mobile', number: '03', title: 'School App', type: 'Product system', description: 'A calmer way for schools, parents, and students to see progress together.', accent: 'pink' },
]

function ParticleTitle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const width = Math.min(window.innerWidth - 36, 1180)
    const height = window.innerWidth < 640 ? 260 : 390
    const ratio = window.devicePixelRatio || 1
    canvas.width = width * ratio; canvas.height = height * ratio
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; context.scale(ratio, ratio)
    context.font = `800 ${window.innerWidth < 640 ? 64 : 116}px Orbitron, sans-serif`; context.textBaseline = 'middle'; context.textAlign = 'center'
    const text = 'YERSULTAN'; const textX = width / 2; const textY = height / 2
    const target = context.measureText(text)
    const particles: Array<{ x: number; y: number; tx: number; ty: number }> = []
    const offscreen = document.createElement('canvas'); offscreen.width = width; offscreen.height = height
    const off = offscreen.getContext('2d')!; off.font = context.font; off.textAlign = 'center'; off.textBaseline = 'middle'; off.fillText(text, textX, textY)
    const pixels = off.getImageData(0, 0, width, height).data
    for (let y = 0; y < height; y += 5) for (let x = 0; x < width; x += 5) if (pixels[(y * width + x) * 4 + 3] > 90) particles.push({ x: Math.random() * width, y: -Math.random() * height, tx: x, ty: y })
    let frame = 0; const start = performance.now()
    const render = (now: number) => {
      const elapsed = now - start; context.clearRect(0, 0, width, height); context.fillStyle = 'rgba(203, 238, 76, 0.95)'
      for (const particle of particles) {
        const progress = Math.min(1, Math.max(0, (elapsed - (particle.tx / Math.max(1, target.width)) * 760) / 1900))
        particle.x += (particle.tx - particle.x) * (0.025 + progress * 0.06); particle.y += (particle.ty - particle.y) * (0.025 + progress * 0.06)
        context.fillRect(particle.x, particle.y, 2, 2)
      }
      frame = requestAnimationFrame(render)
    }
    setReady(true); frame = requestAnimationFrame(render); return () => cancelAnimationFrame(frame)
  }, [])
  return <canvas ref={canvasRef} aria-label="Yersultan" className={`particle-title ${ready ? 'is-ready' : ''}`} />
}

import { DitherVeil, FadeContent, FallingText, LaserFlow, PixelSwap } from '@/components/react-bits-effects'

export function HomePage() {
  return <main className="portfolio-home">
    <section className="hero-stage"><DitherVeil /><div className="hero-kicker"><span className="status-dot" /> UI/UX designer · Astana, Kazakhstan</div><ParticleTitle /><p className="hero-intro">I design digital products that feel clear, alive, and easy to return to.</p><a className="scroll-cue" href="#work"><span>Scroll to explore</span><i /></a></section>
    <section id="work" className="work-section"><FadeContent className="section-heading"><p className="eyebrow">Selected work / 2024—26</p><h2>Three products.<br /><em>One point of view.</em></h2><p className="heading-note">Interfaces for learning, planning, and growing with confidence.</p></FadeContent><div className="project-stack">{projects.map((project) => <FadeContent key={project.href} className="project-reveal"><Link to={project.href} className={`project-card accent-${project.accent}`}><div className="project-visual"><PixelSwap before="/themes/light-1.jpg" after="/themes/dark-1.jpg" /><LaserFlow /></div><div className="project-copy"><div className="project-topline"><span>{project.number}</span><span>{project.type}</span></div><h3>{project.title}</h3><p>{project.description}</p><span className="project-link">View project <b>↗</b></span></div></Link></FadeContent>)}</div></section>
    <section className="signal-section"><FadeContent><p className="eyebrow">A little more signal</p><h2>Good design gives<br /><span>attention somewhere to go.</span></h2><div className="signal-orbit"><div /><div /><div /></div></FadeContent></section>
    <footer className="portfolio-footer"><div className="footer-line" /><p className="eyebrow">Available for thoughtful collaborations</p><FallingText>LET'S MAKE SOMETHING CLEAR</FallingText><div className="footer-bottom"><span>Yersultan Zhumalin</span><a href="mailto:hello@yersnn.com">hello@yersnn.com ↗</a><span>© 2026</span></div></footer>
  </main>
}
