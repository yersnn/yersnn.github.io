import { Link } from 'react-router-dom'
import ParticleText from '@/components/reactbits/ParticleText'
import DitherVeil from '@/components/reactbits/DitherVeil'
import PixelSwap from '@/components/reactbits/PixelSwap'
import LaserFlow from '@/components/reactbits/LaserFlow'
import FadeContent from '@/components/reactbits/FadeContent'
import FallingText from '@/components/reactbits/FallingText'
import './home.css'

const projects = [
  {
    href: '/ielts',
    title: 'IELTS Prep',
    description: 'A focused language-learning world built around rhythm, feedback, and momentum.',
    from: '/themes/light-1.jpg',
    to: '/themes/dark-1.jpg',
    frame: 'wide',
  },
  {
    href: '/alims',
    title: 'Test Prep App',
    description: 'A mobile companion that gives learners a clear next step every time they open it.',
    from: '/alims/screen-1.png',
    to: '/alims/screen-2.png',
    frame: 'phone',
  },
  {
    href: '/b2b-mobile',
    title: 'School App',
    description: 'A calmer way for schools, parents, and students to see progress together.',
    from: '/b2b-mobile/screen-1.png',
    to: '/b2b-mobile/screen-2.png',
    frame: 'phone',
  },
]

function scrollToIntro() {
  document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero" aria-label="Introduction">
        <div className="home-hero__name" role="heading" aria-level={1}>
          <ParticleText
            text="Yersultan"
            color="#ffffff"
            highlightColor="#4f8dff"
            fontFamily="Manrope, sans-serif"
            fontWeight={800}
            fontSize="clamp(3.6rem, 15vw, 10.5rem)"
            intro="rain"
            gatherDuration={1900}
            stagger={760}
            scatter={120}
            burstStrength={1.3}
            pointerRepel={34}
            repelRadius={110}
            idleDrift={0}
            particleSize={1.9}
            density={3}
            shape="line"
            glow={false}
          />
        </div>

        <p className="home-hero__role">Product &amp; UI/UX designer</p>

        <button type="button" className="home-hero__cue" onClick={scrollToIntro} aria-label="Scroll to content" />
      </section>

      <section id="intro" className="home-intro">
        <FadeContent effect="focus" blur duration={1.2}>
          <p className="home-intro__text">
            I design digital products that feel clear, alive, and easy to come back to.
          </p>
        </FadeContent>
      </section>

      <section id="work" className="home-work">
        <FadeContent className="home-work__title" blur>
          <h2>Selected work</h2>
        </FadeContent>

        <div className="home-work__list">
          {projects.map((project, index) => (
            <FadeContent
              key={project.href}
              className="home-project"
              blur
              delay={index * 0.12}
              threshold={0.2}
            >
              <Link to={project.href} className="home-project__link">
                <div className={`home-project__visual is-${project.frame}`}>
                  <PixelSwap
                    firstContent={<img src={project.from} alt="" />}
                    secondContent={<img src={project.to} alt="" />}
                    trigger="hover"
                    aspectRatio={project.frame === 'wide' ? '16 / 10' : '4 / 5'}
                  />
                </div>
                <div className="home-project__meta">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="home-project__cta">
                    View project <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </FadeContent>
          ))}
        </div>
      </section>

      <section className="home-laser" aria-hidden="true">
        <div className="home-laser__veil">
          <DitherVeil
            src="/themes/dark-1.jpg"
            pattern="bayer"
            pixelSize={3}
            palette="duotone"
            inkColor="#1f3670"
            paperColor="#0b0c0e"
            revealRadius={200}
            softness={0.5}
            linger={1.4}
            clickBurst={false}
          />
        </div>
        <LaserFlow
          color="#4f8dff"
          beamPosition={0.5}
          intensity={1}
          mouseInteraction
          intro
        />
      </section>

      <section className="home-statement">
        <FadeContent blur>
          <h2>Good design gives attention somewhere to go.</h2>
        </FadeContent>
        <FadeContent blur delay={0.15}>
          <p>
            I shape the small moments that make software feel calm and worth coming back to: the
            first screen, the next step, and the feeling that nothing is in the way.
          </p>
        </FadeContent>
      </section>

      <footer className="home-footer">
        <div className="home-footer__falling">
          <FallingText
            text="Let's make something clear"
            highlightWords={['clear']}
            trigger="scroll"
            theme="dark"
            accentColor="#4f8dff"
            fontSize="clamp(2.6rem, 9vw, 7.5rem)"
          />
        </div>
        <div className="home-footer__bar">
          <a href="mailto:hello@yersnn.com">hello@yersnn.com</a>
          <span>© 2026 Yersultan Zhumalin</span>
        </div>
      </footer>
    </main>
  )
}
