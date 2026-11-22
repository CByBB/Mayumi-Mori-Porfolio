import { Link } from 'react-router-dom'

export function SiteHeader() {
  return (
    <header id="header">
      <h1 className="logo">
        <Link to="/">森 真由美</Link>
      </h1>
    </header>
  )
}
