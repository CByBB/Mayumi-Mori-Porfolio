import { useEffect, type RefObject } from 'react'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.js'
import type { GalleryItem } from '../data/types'

type PhotoSwipeSlide = {
  src: string
  w: number
  h: number
  title?: string
  msrc?: string
  full: { src: string; w: number; h: number }
  mobile?: { src: string; w: number; h: number }
  el?: HTMLElement
}

function parseSize(size: string): { w: number; h: number } {
  const [w, h] = size.split('x').map(Number)
  return { w, h }
}

function toSlides(
  items: GalleryItem[],
  figureElements: HTMLElement[],
): PhotoSwipeSlide[] {
  return items.map((item, index) => {
    const full = parseSize(item.size)
    const slide: PhotoSwipeSlide = {
      src: item.href,
      w: full.w,
      h: full.h,
      full: { src: item.href, w: full.w, h: full.h },
      el: figureElements[index],
    }

    if (item.mobileSrc && item.mobileSize) {
      const mobile = parseSize(item.mobileSize)
      slide.mobile = {
        src: item.mobileSrc,
        w: mobile.w,
        h: mobile.h,
      }
    }

    if (item.caption) {
      slide.title = item.caption
    }

    const thumbnail = figureElements[index]?.querySelector('img')
    if (thumbnail) {
      slide.msrc = thumbnail.currentSrc || thumbnail.getAttribute('src') || undefined
    }

    return slide
  })
}

/** Port of the original App.photoswipe initializer (mobile image swap included). */
export function usePhotoSwipe(
  galleryRef: RefObject<HTMLElement | null>,
  items: GalleryItem[],
) {
  useEffect(() => {
    const galleryElement = galleryRef.current
    const pswpElement = document.querySelector('.pswp')
    if (!galleryElement || !(pswpElement instanceof HTMLElement)) {
      return
    }

    galleryElement.setAttribute('data-pswp-uid', '1')

    const openPhotoSwipe = (index: number) => {
      const figureElements = [
        ...galleryElement.querySelectorAll<HTMLElement>('figure.item'),
      ]
      const slides = toSlides(items, figureElements)

      const options: PhotoSwipe.Options = {
        index,
        spacing: 0.3,
        closeOnScroll: true,
        maxSpreadZoom: 0.8,
        galleryUID: 1,
        showHideOpacity: true,
        getThumbBoundsFn: undefined,
        history: false,
      }

      const gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI_Default,
        slides,
        options,
      )

      const mobileMedia = window.matchMedia('(max-width: 700px)')
      let useMobileImage = mobileMedia.matches

      gallery.listen('beforeResize', () => {
        if (useMobileImage !== mobileMedia.matches) {
          useMobileImage = mobileMedia.matches
          gallery.invalidateCurrItems()
        }
      })

      gallery.listen('gettingData', (_index, item) => {
        const slide = item as PhotoSwipeSlide
        const image =
          useMobileImage && slide.mobile ? slide.mobile : slide.full
        item.src = image.src
        item.w = image.w
        item.h = image.h
      })

      gallery.init()
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const figure = target.closest('figure.item')
      if (!(figure instanceof HTMLElement) || !galleryElement.contains(figure)) {
        return
      }

      event.preventDefault()
      const figures = [...galleryElement.querySelectorAll('figure.item')]
      const index = figures.indexOf(figure)
      if (index >= 0) {
        openPhotoSwipe(index)
      }
    }

    galleryElement.addEventListener('click', onClick)
    return () => {
      galleryElement.removeEventListener('click', onClick)
    }
  }, [galleryRef, items])
}
