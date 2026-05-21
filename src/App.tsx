import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import PillNav from '@/components/ui/pill-nav'
import TargetCursor from '@/components/ui/target-cursor'
import { HomePage } from '@/pages/home'
import { IeltsPage } from '@/pages/ielts'
import { AlimsPage } from '@/pages/alims'
import { B2BMobilePage } from '@/pages/b2b-mobile'
import { B2BWebPage } from '@/pages/b2b-web'

const navItems = [
  { label: 'Main', href: '/' },
  { label: 'IELTS', href: '/ielts' },
  { label: 'B2C App', href: '/alims' },
  { label: 'B2B App', href: '/b2b-mobile' },
  { label: 'B2B Web', href: '/b2b-web' },
]

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ielts" element={<IeltsPage />} />
        <Route path="/alims" element={<AlimsPage />} />
        <Route path="/b2b-mobile" element={<B2BMobilePage />} />
        <Route path="/b2b-web" element={<B2BWebPage />} />
      </Routes>
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
