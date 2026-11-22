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
      <h1 className="page-title">Portfolio</h1>
      <WorksNav />
      <WorksGallery items={page.items} />
    </>
  )
}
