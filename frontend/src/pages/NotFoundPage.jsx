import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="wrap pad">
      <h1>Page not found</h1>
      <Link to="/" className="btn btn-outline" style={{ marginTop: '16px' }}>Back Home</Link>
    </div>
  )
}
