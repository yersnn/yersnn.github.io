import { Link, useNavigate } from 'react-router-dom'
import ParticleText from '@/components/reactbits/ParticleText'
import PixelSwap from '@/components/reactbits/PixelSwap'
import LaserFlow from '@/components/reactbits/LaserFlow'
import FadeContent from '@/components/reactbits/FadeContent'
import ScrollExpand from '@/components/reactbits/ScrollExpand'
import SpecularButton from '@/components/reactbits/SpecularButton'
import GradualBlur from '@/components/reactbits/GradualBlur'
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

export function HomePage() {
  const navigate = useNavigate()

  return (
    <main className="home-page">
      <section className="home-hero" aria-label="Introduction">
        <div className="home-hero__name" role="heading" aria-level={1}>
          <ParticleText
            text="Yersultan Zhumalin"
            color="#ffffff"
            highlightColor="#4f8dff"
            fontFamily="Manrope, sans-serif"
            fontWeight={800}
            fontSize="clamp(1.9rem, 6.4vw, 7rem)"
            intro="rain"
            gatherDuration={1100}
            stagger={120}
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
      </section>

      <section id="intro" className="home-intro">
        <FadeContent effect="focus" blur duration={1.2}>
          <p className="home-intro__text">
            I design digital products that feel clear, alive, and easy to come back to.
          </p>
        </FadeContent>
      </section>

      <section className="home-expand">
        <ScrollExpand
          src="/home/backgroundimg.jpg"
          alt=""
          title="Selected work"
          useWindowScroll
          startWidth={62}
          startHeight={58}
          startRadius={28}
          endRadius={0}
          mediaZoom={1.15}
          scrollDistance={0.9}
          holdDistance={0.25}
          overlayScrim={0.3}
        />
      </section>

      <section id="work" className="home-work">
        <div className="home-work__list">
          {projects.map((project, index) => (
            <FadeContent
              key={project.href}
              className="home-project"
              blur
              delay={index * 0.12}
              threshold={0.2}
            >
              <div className="home-project__link">
                <Link to={project.href} className="home-project__visual-link" aria-label={`Open ${project.title}`}>
                  <div className={`home-project__visual is-${project.frame}`}>
                    <PixelSwap
                      firstContent={<img src={project.from} alt="" />}
                      secondContent={<img src={project.to} alt="" />}
                      trigger="hover"
                      aspectRatio={project.frame === 'wide' ? '16 / 10' : '4 / 5'}
                    />
                  </div>
                </Link>
                <div className="home-project__meta">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <SpecularButton size="md" onClick={() => navigate(project.href)}>
                    View project <span aria-hidden="true">→</span>
                  </SpecularButton>
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </section>

      <section className="home-laser" aria-hidden="true">
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
        <h2 className="home-footer__title">
          Let's make something <span>clear</span>
        </h2>
        <div className="home-footer__bar">
          <SpecularButton size="md" onClick={() => (window.location.href = 'mailto:hello@yersnn.com')}>
            hello@yersnn.com
          </SpecularButton>
          <span>© 2026 Yersultan Zhumalin</span>
        </div>
      </footer>

      <GradualBlur position="bottom" target="page" height="16vh" strength={2} autoHide />
    </main>
  )
}
