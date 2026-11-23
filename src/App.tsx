import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
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
const FunPage = lazy(() =>
  import('@/pages/fun').then((m) => ({ default: m.FunPage })),
)


function PageFallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center text-sm text-muted-foreground"
      style={{ background: '#0a0a0c' }}
    >
      Loading…
    </div>
  )
}

function Layout() {
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ielts" element={<IeltsPage />} />
          <Route path="/alims" element={<AlimsPage />} />
          <Route path="/b2b-mobile" element={<B2BMobilePage />} />
          <Route path="/fun" element={<FunPage />} />
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
