/**
 * Pick featured (2×2) slots with an irregular cadence so the grid
 * feels natural rather than a strict repeating stripe.
 */
export function isFeaturedIndex(index: number): boolean {
  const cycle = index % 13
  return cycle === 0 || cycle === 5 || cycle === 9
}

export function resolveThumb(
  thumbSrc: string,
  thumbSrcset: string | null,
  featured: boolean,
): { src: string; srcSet: string | null } {
  if (!featured) {
    return { src: thumbSrc, srcSet: thumbSrcset }
  }

  if (thumbSrcset) {
    const candidates = thumbSrcset.split(',').map((part) => part.trim())
    const retina = candidates.find((part) => /\s2x$/.test(part))
    if (retina) {
      return { src: retina.split(/\s+/)[0]!, srcSet: null }
    }
  }

  return { src: thumbSrc, srcSet: thumbSrcset }
}
