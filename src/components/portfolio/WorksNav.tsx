import { Link, useLocation } from 'react-router-dom'
import { WORKS_PAGES } from '../../data/works'

function isActivePath(pathname: string, path: string) {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  if (path === '/works-01/') {
    return normalized === '/' || normalized === '/works-01/'
  }
  return normalized === path
}

export function WorksNav() {
  const { pathname } = useLocation()

  return (
    <nav className="works-nav">
      <ul>
        {WORKS_PAGES.map((page) => (
          <li key={page.id}>
            <Link
              to={page.path}
              className={isActivePath(pathname, page.path) ? 'current' : undefined}
            >
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
