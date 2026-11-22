import type { WorksId, WorksPage } from './types'
import { works01 } from './works01'
import { works02 } from './works02'
import { works03 } from './works03'

export const WORKS_PAGES: WorksPage[] = [
  {
    id: 'works-01',
    label: 'works 01',
    path: '/works-01/',
    title: 'works 01 | Works | TOBUKURO INC. | フォトレタッチカンパニー',
    items: works01,
  },
  {
    id: 'works-02',
    label: 'works 02',
    path: '/works-02/',
    title: 'works 02 | Works | TOBUKURO INC. | フォトレタッチカンパニー',
    items: works02,
  },
  {
    id: 'works-03',
    label: 'works 03',
    path: '/works-03/',
    title: 'works 03 | Works | TOBUKURO INC. | フォトレタッチカンパニー',
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
