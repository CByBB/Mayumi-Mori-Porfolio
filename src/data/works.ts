import type { WorksId, WorksPage } from './types'
import { works01 } from './works01'
import { works02 } from './works02'
import { works03 } from './works03'

export const WORKS_PAGES: WorksPage[] = [
  {
    id: 'works-01',
    label: '01',
    path: '/works-01/',
    title: '01 | 森 真由美',
    items: works01,
  },
  {
    id: 'works-02',
    label: '02',
    path: '/works-02/',
    title: '02 | 森 真由美',
    items: works02,
  },
  {
    id: 'works-03',
    label: '03',
    path: '/works-03/',
    title: '03 | 森 真由美',
    items: works03,
  },
]

export function getWorksPage(id: WorksId): WorksPage {
  const page = WORKS_PAGES.find((entry) => entry.id === id)
  if (!page) {
    throw new Error(`Unknown works page: ${id}`)
  }
  return page
}

export const DEFAULT_WORKS_ID: WorksId = 'works-01'
