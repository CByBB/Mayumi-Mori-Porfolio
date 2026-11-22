import { useRef } from 'react'
import { isFeaturedIndex } from '../../data/layout'
import type { GalleryItem as GalleryItemData } from '../../data/types'
import { usePhotoSwipe } from '../../hooks/usePhotoSwipe'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import { GalleryItem } from './GalleryItem'

type WorksGalleryProps = {
  items: GalleryItemData[]
}

export function WorksGallery({ items }: WorksGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const visibleCount = useStaggeredReveal(galleryRef, items.length)
  usePhotoSwipe(galleryRef, items)

  return (
    <div className="works-content cf">
      <div className="works-gallery" ref={galleryRef}>
        {items.map((item, index) => (
          <GalleryItem
            key={`${item.href}-${index}`}
            item={item}
            onScreen={index < visibleCount}
            featured={isFeaturedIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
