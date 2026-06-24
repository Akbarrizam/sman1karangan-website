import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTE_PATHS } from './routePaths'
import MainLayout from '@/layouts/MainLayout'

// Lazy-load semua halaman agar bundle awal tetap kecil
const Home         = lazy(() => import('@/pages/Home/Home'))
const Profile      = lazy(() => import('@/pages/Profile/Profile'))
const Academic     = lazy(() => import('@/pages/Academic/Academic'))
const Student      = lazy(() => import('@/pages/Student/Student'))
const Facilities   = lazy(() => import('@/pages/Facilities/Facilities'))
const Achievements = lazy(() => import('@/pages/Achievements/Achievements'))
const News         = lazy(() => import('@/pages/News/News'))
const NewsDetail   = lazy(() => import('@/pages/News/NewsDetail'))
const Admission    = lazy(() => import('@/pages/Admission/Admission'))
const Gallery      = lazy(() => import('@/pages/Gallery/Gallery'))
const Contact      = lazy(() => import('@/pages/Contact/Contact'))
const NotFound     = lazy(() => import('@/pages/NotFound/NotFound'))

// Fallback ringan saat halaman sedang di-load
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 rounded-full border-4 border-forest/20 border-t-forest animate-spin" />
        <p className="font-mono text-xs tracking-widest text-ink/40 uppercase">Memuat…</p>
      </div>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTE_PATHS.HOME}         element={<Home />} />
          
          {/* Profile Routes */}
          <Route path={ROUTE_PATHS.PROFILE}      element={<Profile />} />
          <Route path={ROUTE_PATHS.PROFILE_HISTORY} element={<Profile />} />
          <Route path={ROUTE_PATHS.PROFILE_VISION} element={<Profile />} />
          <Route path={ROUTE_PATHS.PROFILE_STRUCTURE} element={<Profile />} />
          
          {/* Academic Routes */}
          <Route path={ROUTE_PATHS.ACADEMIC}     element={<Academic />} />
          <Route path={ROUTE_PATHS.ACADEMIC_CURRICULUM} element={<Academic />} />
          <Route path={ROUTE_PATHS.ACADEMIC_CALENDAR} element={<Academic />} />
          <Route path={ROUTE_PATHS.ACADEMIC_TEACHERS} element={<Academic />} />
          
          {/* Student Routes */}
          <Route path={ROUTE_PATHS.STUDENT}      element={<Student />} />
          <Route path={ROUTE_PATHS.STUDENT_EXTRACURRICULAR} element={<Student />} />
          <Route path={ROUTE_PATHS.STUDENT_OSIS}  element={<Student />} />
          <Route path={ROUTE_PATHS.STUDENT_RULES} element={<Student />} />
          
          <Route path={ROUTE_PATHS.FACILITIES}   element={<Facilities />} />
          <Route path={ROUTE_PATHS.ACHIEVEMENTS} element={<Achievements />} />
          <Route path={ROUTE_PATHS.NEWS}         element={<News />} />
          <Route path={ROUTE_PATHS.NEWS_DETAIL}  element={<NewsDetail />} />
          <Route path={ROUTE_PATHS.ADMISSION}    element={<Admission />} />
          <Route path={ROUTE_PATHS.GALLERY}      element={<Gallery />} />
          <Route path={ROUTE_PATHS.CONTACT}      element={<Contact />} />
          <Route path={ROUTE_PATHS.NOT_FOUND}    element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
