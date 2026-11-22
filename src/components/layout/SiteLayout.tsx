import type { ReactNode } from 'react'
import { PhotoSwipeRoot } from '../portfolio/PhotoSwipeRoot'
import { SiteNote } from './SiteNote'

type SiteLayoutProps = {
  children: ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <div id="wrap">
        <main id="main">{children}</main>
        <PhotoSwipeRoot />
      </div>
      <SiteNote />
    </>
  )
}
