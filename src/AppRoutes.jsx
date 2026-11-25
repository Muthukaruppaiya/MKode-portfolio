import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { PAGE_META } from './data/pageMeta'

/**
 * Route table shared by the browser (lazy pages) and the build-time
 * prerender (eager pages). `pages` maps a path to its page component.
 */
export default function AppRoutes({ pages }) {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          {PAGE_META.map(({ path }) => {
            const Page = pages[path]
            return <Route key={path} path={path} element={<Page />} />
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}
