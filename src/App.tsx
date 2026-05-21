import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import PillNav from '@/components/ui/pill-nav'
import TargetCursor from '@/components/ui/target-cursor'
import { HomePage } from '@/pages/home'

const IeltsPage = lazy(() =>
  import('@/pages/ielts').then((m) => ({ default: m.IeltsPage })),
)
const AlimsPage = lazy(() =>
  import('@/pages/alims').then((m) => ({ default: m.AlimsPage })),
)
const B2BMobilePage = lazy(() =>
  import('@/pages/b2b-mobile').then((m) => ({ default: m.B2BMobilePage })),
)
const B2BWebPage = lazy(() =>
  import('@/pages/b2b-web').then((m) => ({ default: m.B2BWebPage })),
)

const navItems = [
  { label: 'Main', href: '/' },
  { label: 'IELTS', href: '/ielts' },
  { label: 'B2C App', href: '/alims' },
  { label: 'B2B App', href: '/b2b-mobile' },
  { label: 'B2B Web', href: '/b2b-web' },
]

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
      Loading…
    </div>
  )
}

function Layout() {
  const location = useLocation()
  return (
    <>
      <TargetCursor targetSelector=".cursor-target" />
      <PillNav
        logo="/icon.png"
        logoAlt="yersnn"
        items={navItems}
        activeHref={location.pathname}
        baseColor="#ffffff"
        pillColor="#0e0e10"
        pillTextColor="#ffffff"
        hoveredPillTextColor="#0e0e10"
        initialLoadAnimation={true}
      />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ielts" element={<IeltsPage />} />
          <Route path="/alims" element={<AlimsPage />} />
          <Route path="/b2b-mobile" element={<B2BMobilePage />} />
          <Route path="/b2b-web" element={<B2BWebPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  )
}
