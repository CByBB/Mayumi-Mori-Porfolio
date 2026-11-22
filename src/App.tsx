import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { DEFAULT_WORKS_ID, getWorksPage } from './data/works'
import { PortfolioPage } from './pages/PortfolioPage'

const works01 = getWorksPage('works-01')
const works02 = getWorksPage('works-02')
const works03 = getWorksPage('works-03')

const ROOT_TITLE = '森 真由美 | Portfolio'

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route
          path="/"
          element={
            <PortfolioPage page={works01} documentTitle={ROOT_TITLE} />
          }
        />
        <Route path="/works-01" element={<Navigate to="/works-01/" replace />} />
        <Route
          path="/works-01/"
          element={<PortfolioPage page={works01} />}
        />
        <Route path="/works-02" element={<Navigate to="/works-02/" replace />} />
        <Route
          path="/works-02/"
          element={<PortfolioPage page={works02} />}
        />
        <Route path="/works-03" element={<Navigate to="/works-03/" replace />} />
        <Route
          path="/works-03/"
          element={<PortfolioPage page={works03} />}
        />
        <Route
          path="*"
          element={<Navigate to={`/${DEFAULT_WORKS_ID}/`} replace />}
        />
      </Routes>
    </SiteLayout>
  )
}
