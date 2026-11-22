import type { GalleryItem as GalleryItemData } from '../../data/types'
import { resolveThumb } from '../../data/layout'

type GalleryItemProps = {
  item: GalleryItemData
  onScreen: boolean
  featured?: boolean
}

export function GalleryItem({
  item,
  onScreen,
  featured = false,
}: GalleryItemProps) {
  const className = [
    'item',
    'show-item',
    onScreen ? 'onscreen' : '',
    featured ? 'is-featured' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const thumb = resolveThumb(item.thumbSrc, item.thumbSrcset, featured)

  return (
    <figure className={className}>
      <a
        href={item.href}
        data-size={item.size}
        {...(item.mobileSrc ? { 'data-mobile-src': item.mobileSrc } : {})}
        {...(item.mobileSize ? { 'data-mobile-size': item.mobileSize } : {})}
      >
        <picture>
          {!featured && item.thumbSource ? (
            <source media="(max-width: 700px)" srcSet={item.thumbSource} />
          ) : null}
          <img
            src={thumb.src}
            {...(thumb.srcSet ? { srcSet: thumb.srcSet } : {})}
            width={featured ? 308 : 140}
            height={featured ? 308 : 140}
            alt={item.alt}
          />
        </picture>
      </a>
      <figcaption>{item.caption}</figcaption>
    </figure>
  )
}
