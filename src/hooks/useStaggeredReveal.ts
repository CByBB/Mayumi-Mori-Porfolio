import { useEffect, useState, type RefObject } from 'react'

/** Matches original introPortfolio timing: wait for images, then +300ms, then +60ms per item. */
export function useStaggeredReveal(
  containerRef: RefObject<HTMLElement | null>,
  itemCount: number,
) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    setVisibleCount(0)

    const container = containerRef.current
    if (!container || itemCount === 0) {
      return
    }

    let cancelled = false
    const timeouts: number[] = []

    const waitForImages = () =>
      new Promise<void>((resolve) => {
        const images = [...container.querySelectorAll('img')]
        if (images.length === 0) {
          resolve()
          return
        }

        let remaining = images.length
        const done = () => {
          remaining -= 1
          if (remaining <= 0) {
            resolve()
          }
        }

        for (const image of images) {
          if (image.complete) {
            done()
          } else {
            image.addEventListener('load', done, { once: true })
            image.addEventListener('error', done, { once: true })
          }
        }
      })

    void waitForImages().then(() => {
      if (cancelled) {
        return
      }

      timeouts.push(
        window.setTimeout(() => {
          for (let index = 0; index < itemCount; index += 1) {
            timeouts.push(
              window.setTimeout(() => {
                if (!cancelled) {
                  setVisibleCount((current) => Math.max(current, index + 1))
                }
              }, 60 * index),
            )
          }
        }, 300),
      )
    })

    return () => {
      cancelled = true
      for (const timeout of timeouts) {
        window.clearTimeout(timeout)
      }
    }
  }, [containerRef, itemCount])

  return visibleCount
}
