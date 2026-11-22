import { useEffect, useState } from 'react'

const BOTTOM_THRESHOLD_PX = 120

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const scrollBottom =
        window.scrollY + window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const nearBottom = scrollBottom >= docHeight - BOTTOM_THRESHOLD_PX
      const canScroll = docHeight > window.innerHeight + 80
      setVisible(canScroll && nearBottom)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="ページ上部へ戻る"
      tabIndex={visible ? 0 : -1}
    >
      <svg
        className="back-to-top__icon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M12 5.5v13M6.5 11 12 5.5 17.5 11"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
