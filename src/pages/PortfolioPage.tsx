import { WorksGallery } from '../components/portfolio/WorksGallery'
import { WorksNav } from '../components/portfolio/WorksNav'
import type { WorksPage } from '../data/types'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

type PortfolioPageProps = {
  page: WorksPage
  /** Root `/` keeps the original portfolio document title. */
  documentTitle?: string
}

export function PortfolioPage({ page, documentTitle }: PortfolioPageProps) {
  useDocumentTitle(
    documentTitle ?? page.title,
  )

  return (
    <>
      <h2 className="page-title">実績</h2>
      <WorksNav />
      <WorksGallery items={page.items} />
    </>
  )
}
