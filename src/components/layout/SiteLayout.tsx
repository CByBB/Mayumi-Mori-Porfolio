import type { ReactNode } from 'react'
import { PhotoSwipeRoot } from '../portfolio/PhotoSwipeRoot'
import { BackToTop } from './BackToTop'
import { SiteHeader } from './SiteHeader'
import { SiteIntro } from './SiteIntro'

type SiteLayoutProps = {
  children: ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div id="wrap">
      <SiteHeader />
      <main id="main">
        <SiteIntro />
        {children}
      </main>
      <PhotoSwipeRoot />
      <BackToTop />
    </div>
  )
}
