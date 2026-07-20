import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../hooks/AppContext'

export default function AccountPage() {
  const { addToast } = useApp()
  useEffect(() => { document.title = 'Account \u2014 Afrimen' }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    addToast('Signed in \u2014 welcome back.')
  }

  return (
    <div className="wrap pad" style={{ maxWidth: '480px' }}>
      <div className="crumbs">
        <Link to="/">Home</Link><span className="sep">/</span><span>Account</span>
      </div>
      <h1 style={{ margin: '18px 0 8px', fontSize: '28px' }}>Welcome back</h1>
      <p style={{ color: 'var(--muted-on-bone)', marginBottom: '30px' }}>
        Sign in to track orders, alterations, and saved measurements.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
          <input type="email" required
            style={{ width: '100%', padding: '13px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', marginTop: '6px', background: 'var(--paper)' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
          <input type="password" required
            style={{ width: '100%', padding: '13px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', marginTop: '6px', background: 'var(--paper)' }} />
        </div>
        <button className="btn btn-primary" type="submit" style={{ marginTop: '6px' }}>Sign In</button>
      </form>
      <p style={{ fontSize: '12.5px', color: 'var(--muted-on-bone)', marginTop: '18px' }}>
        {'This is a design prototype \u2014 no account data is sent anywhere.'}
      </p>
    </div>
  )
}
