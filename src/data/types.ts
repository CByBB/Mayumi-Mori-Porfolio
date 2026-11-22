export type GalleryItem = {
  href: string
  size: string
  mobileSrc: string | null
  mobileSize: string | null
  thumbSource: string | null
  thumbSrc: string
  thumbSrcset: string | null
  alt: string
  caption: string
}

export type WorksId = 'works-01' | 'works-02' | 'works-03'

export type WorksPage = {
  id: WorksId
  label: string
  path: string
  title: string
  items: GalleryItem[]
}
