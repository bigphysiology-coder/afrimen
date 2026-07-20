import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/AppContext'
import { login, register, getMe } from '../services/api'

export default function AccountPage() {
  const { addToast, user, setUser, setToken } = useApp()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { document.title = 'Account \u2014 Afrimen' }, [])

  useEffect(() => {
    const token = localStorage.getItem('af_token')
    if (token) {
      getMe(token).then(res => {
        setUser(res.user)
        setToken(token)
      }).catch(() => {
        localStorage.removeItem('af_token')
      })
    }
  }, [])

  if (user) {
    return (
      <div className="wrap pad" style={{ maxWidth: '640px' }}>
        <div className="crumbs">
          <Link to="/">Home</Link><span className="sep">/</span><span>Account</span>
        </div>
        <h1 style={{ margin: '18px 0 6px', fontSize: '28px' }}>Hello, {user.name}</h1>
        <p style={{ color: 'var(--muted-on-bone)', marginBottom: '30px' }}>{user.email}{user.role === 'admin' ? ' \u00b7 Admin' : ''}</p>

        {user.role === 'admin' && (
          <Link to="/admin" className="btn btn-primary" style={{ marginBottom: '24px', display: 'inline-block' }}>
            Admin Dashboard
          </Link>
        )}

        <div style={{ border: '1px solid var(--line-on-bone)', borderRadius: 'var(--radius-m)', padding: '24px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Saved Address</h3>
          <p style={{ fontSize: '13.5px', color: 'var(--muted-on-bone)' }}>No address saved yet. Add one during checkout.</p>
        </div>

        <div style={{ border: '1px solid var(--line-on-bone)', borderRadius: 'var(--radius-m)', padding: '24px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Order History</h3>
          <p style={{ fontSize: '13.5px', color: 'var(--muted-on-bone)' }}>No orders yet. Your first order will appear here.</p>
        </div>

        <button className="btn btn-outline btn-sm" onClick={() => { setUser(null); setToken(null); localStorage.removeItem('af_token'); addToast('Signed out') }}>
          Sign Out
        </button>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const action = mode === 'login' ? login(email, password) : register(name, email, password)
    action.then(res => {
      setUser(res.user)
      setToken(res.token)
      localStorage.setItem('af_token', res.token)
      addToast(mode === 'login' ? 'Signed in \u2014 welcome back.' : 'Account created \u2014 welcome.')
    }).catch(err => {
      addToast(err.message)
    }).finally(() => setLoading(false))
  }

  return (
    <div className="wrap pad" style={{ maxWidth: '480px' }}>
      <div className="crumbs">
        <Link to="/">Home</Link><span className="sep">/</span><span>Account</span>
      </div>
      <h1 style={{ margin: '18px 0 8px', fontSize: '28px' }}>{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
      <p style={{ color: 'var(--muted-on-bone)', marginBottom: '30px' }}>
        {mode === 'login' ? 'Sign in to track orders, alterations, and saved measurements.' : 'Join Afrimen for faster checkout and order tracking.'}
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {mode === 'register' && (
          <div>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)}
              style={{ width: '100%', padding: '13px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', marginTop: '6px', background: 'var(--paper)' }} />
          </div>
        )}
        <div>
          <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '13px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', marginTop: '6px', background: 'var(--paper)' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '13px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', marginTop: '6px', background: 'var(--paper)' }} />
        </div>
        <button className="btn btn-primary" type="submit" style={{ marginTop: '6px' }} disabled={loading}>
          {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
        </button>
      </form>
      <p style={{ fontSize: '12.5px', color: 'var(--muted-on-bone)', marginTop: '18px', textAlign: 'center' }}>
        {mode === 'login' ? (
          <>No account? <button onClick={() => setMode('register')} style={{ background: 'none', border: 'none', textDecoration: 'underline', color: 'var(--ink-text)', fontSize: '12.5px', padding: 0 }}>Create one</button></>
        ) : (
          <>Already have an account? <button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', textDecoration: 'underline', color: 'var(--ink-text)', fontSize: '12.5px', padding: 0 }}>Sign in</button></>
        )}
      </p>
      <p style={{ fontSize: '11px', color: 'var(--muted-on-bone)', marginTop: '12px', textAlign: 'center' }}>
        Demo: use any email/password, or login as admin@afrimen.ng / admin123
      </p>
    </div>
  )
}
