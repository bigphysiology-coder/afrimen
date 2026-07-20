import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../hooks/AppContext'
import { submitContact } from '../services/api'

export default function ContactPage() {
  const { addToast } = useApp()
  const formRef = useRef(null)
  useEffect(() => { document.title = 'Contact \u2014 Afrimen' }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    submitContact({
      name: fd.get('name'),
      email: fd.get('email'),
      subject: 'General Inquiry',
      message: fd.get('message'),
    }).then(() => {
      addToast('Message sent \u2014 we will reply within one business day.')
      e.target.reset()
    }).catch(() => {
      addToast('Failed to send message. Please try again.')
    })
  }

  return (
    <div className="wrap pad" style={{ maxWidth: '560px' }}>
      <div className="crumbs">
        <Link to="/">Home</Link><span className="sep">/</span><span>Contact</span>
      </div>
      <h1 style={{ margin: '18px 0 8px', fontSize: '28px' }}>Talk to the workroom</h1>
      <p style={{ color: 'var(--muted-on-bone)', marginBottom: '30px' }}>
        {'Questions on fit, an order, or a repair \u2014 our team replies within one business day.'}
      </p>
      <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <input required name="name" placeholder="Name"
          style={{ padding: '13px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', background: 'var(--paper)' }} />
        <input required name="email" type="email" placeholder="Email"
          style={{ padding: '13px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', background: 'var(--paper)' }} />
        <textarea required name="message" placeholder="Message" rows="5"
          style={{ padding: '13px', border: '1px solid var(--line-on-bone)', borderRadius: '2px', background: 'var(--paper)', resize: 'vertical' }}></textarea>
        <button className="btn btn-primary" type="submit">Send Message</button>
      </form>
    </div>
  )
}
