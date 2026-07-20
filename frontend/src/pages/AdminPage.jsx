import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/AppContext'
import { getAdminProducts, updateAdminProduct, deleteAdminProduct, getAdminMessages, deleteAdminMessage } from '../services/api'

function EditModal({ product, onSave, onClose }) {
  const [form, setForm] = useState({ ...product })
  const [saving, setSaving] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)
    onSave(product.id, {
      name: form.name,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      category: form.category,
      sub: form.sub,
      collection: form.collection,
      descr: form.descr,
      material: form.material,
    }).then(() => {
      onClose()
    }).finally(() => setSaving(false))
  }

  return (
    <>
      <div className="overlay open" onClick={onClose}></div>
      <div className="modal open" role="dialog" aria-modal="true" style={{ maxWidth: '560px', padding: '32px' }}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
        <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Edit Product</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', background: 'var(--paper)' }} />
            </div>
            <div>
              <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Price ($)</label>
              <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', background: 'var(--paper)' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Category</label>
              <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', background: 'var(--paper)' }} />
            </div>
            <div>
              <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Sub</label>
              <input value={form.sub} onChange={e => setForm({ ...form, sub: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', background: 'var(--paper)' }} />
            </div>
            <div>
              <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Stock</label>
              <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', background: 'var(--paper)' }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Collection</label>
            <input value={form.collection} onChange={e => setForm({ ...form, collection: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', background: 'var(--paper)' }} />
          </div>
          <div>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Material</label>
            <input value={form.material || ''} onChange={e => setForm({ ...form, material: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', background: 'var(--paper)' }} />
          </div>
          <div>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Description</label>
            <textarea rows="3" value={form.descr} onChange={e => setForm({ ...form, descr: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', background: 'var(--paper)', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
            <button className="btn btn-outline" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default function AdminPage() {
  const { user, addToast } = useApp()
  const navigate = useNavigate()
  const [tab, setTab] = useState('products')
  const [products, setProducts] = useState([])
  const [messages, setMessages] = useState([])
  const [editProduct, setEditProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Admin \u2014 Afrimen'
    if (!user || user.role !== 'admin') return
    Promise.all([
      getAdminProducts().then(setProducts).catch(() => {}),
      getAdminMessages().then(setMessages).catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [user])

  if (!user) {
    return (
      <div className="wrap pad" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <h2>Sign in required</h2>
        <p style={{ color: 'var(--muted-on-bone)', margin: '12px 0 24px' }}>You need an admin account to access this page.</p>
        <Link to="/account" className="btn btn-primary">Sign In</Link>
      </div>
    )
  }

  if (user.role !== 'admin') {
    return (
      <div className="wrap pad" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <h2>Access denied</h2>
        <p style={{ color: 'var(--muted-on-bone)', margin: '12px 0 24px' }}>Admin privileges required.</p>
        <Link to="/" className="btn btn-outline">Back Home</Link>
      </div>
    )
  }

  const handleSave = async (id, data) => {
    try {
      const updated = await updateAdminProduct(id, data)
      setProducts(prev => prev.map(p => p.id === id ? updated : p))
      addToast('Product updated')
    } catch (err) {
      addToast('Failed to update product')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product? This cannot be undone.')) return
    try {
      await deleteAdminProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      addToast('Product deleted')
    } catch (err) {
      addToast('Failed to delete product')
    }
  }

  const handleDeleteMessage = async (id) => {
    try {
      await deleteAdminMessage(id)
      setMessages(prev => prev.filter(m => m.id !== id))
      addToast('Message deleted')
    } catch (err) {
      addToast('Failed to delete message')
    }
  }

  return (
    <div className="wrap pad">
      <div className="crumbs">
        <Link to="/">Home</Link><span className="sep">/</span>
        <Link to="/account">Account</Link><span className="sep">/</span><span>Admin</span>
      </div>
      <h1 style={{ margin: '18px 0 8px', fontSize: '28px' }}>Admin Dashboard</h1>
      <p style={{ color: 'var(--muted-on-bone)', marginBottom: '24px' }}>Manage products and customer messages.</p>

      <div className="tabs-nav" style={{ marginTop: 0 }}>
        <button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>Products ({products.length})</button>
        <button className={tab === 'messages' ? 'active' : ''} onClick={() => setTab('messages')}>Messages ({messages.length})</button>
      </div>

      {tab === 'products' && (
        <div style={{ overflowX: 'auto', marginTop: '24px' }}>
          {loading ? (
            <p style={{ color: 'var(--muted-on-bone)' }}>Loading products...</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--ink)' }}>
                  <th style={{ textAlign: 'left', padding: '10px 8px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase' }}>ID</th>
                  <th style={{ textAlign: 'left', padding: '10px 8px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '10px 8px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase' }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '10px 8px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase' }}>Price</th>
                  <th style={{ textAlign: 'left', padding: '10px 8px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase' }}>Stock</th>
                  <th style={{ textAlign: 'left', padding: '10px 8px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--line-on-bone)' }}>
                    <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{p.id}</td>
                    <td style={{ padding: '10px 8px' }}>{p.name}</td>
                    <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted-on-bone)' }}>{p.sub}</td>
                    <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>${parseFloat(p.price).toFixed(2)}</td>
                    <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                      <span style={{ color: p.stock <= 4 ? 'var(--ember)' : 'inherit' }}>{p.stock}</span>
                    </td>
                    <td style={{ padding: '10px 8px' }}>
                      <button className="btn btn-outline btn-sm" style={{ marginRight: '6px' }} onClick={() => setEditProduct(p)}>Edit</button>
                      <button className="btn btn-outline btn-sm" style={{ borderColor: 'var(--ember)', color: 'var(--ember)' }} onClick={() => handleDelete(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === 'messages' && (
        <div style={{ marginTop: '24px' }}>
          {loading ? (
            <p style={{ color: 'var(--muted-on-bone)' }}>Loading messages...</p>
          ) : messages.length === 0 ? (
            <p style={{ color: 'var(--muted-on-bone)' }}>No messages yet.</p>
          ) : (
            messages.map(m => (
              <div key={m.id} style={{ border: '1px solid var(--line-on-bone)', borderRadius: 'var(--radius-m)', padding: '18px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <div>
                    <strong>{m.name}</strong><span style={{ color: 'var(--muted-on-bone)', fontSize: '12px', marginLeft: '10px' }}>{m.email}</span>
                  </div>
                  <button className="btn btn-outline btn-sm" style={{ borderColor: 'var(--ember)', color: 'var(--ember)', fontSize: '11px' }} onClick={() => handleDeleteMessage(m.id)}>Delete</button>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted-on-bone)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>{m.subject}</div>
                <p style={{ fontSize: '13.5px' }}>{m.message}</p>
                <div style={{ fontSize: '11px', color: 'var(--muted-on-bone)', marginTop: '8px' }}>{new Date(m.created_at).toLocaleDateString()}</div>
              </div>
            ))
          )}
        </div>
      )}

      {editProduct && (
        <EditModal product={editProduct} onSave={handleSave} onClose={() => setEditProduct(null)} />
      )}
    </div>
  )
}
