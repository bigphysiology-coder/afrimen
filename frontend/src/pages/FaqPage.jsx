import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function FaqPage() {
  useEffect(() => { document.title = 'FAQ \u2014 Afrimen' }, [])

  const qas = [
    ['How do I find my size?', 'Use the size chart linked on every product page \u2014 it is drawn from body measurements, not garment measurements, so check chest and waist, not just your usual label size.'],
    ['What is your return policy?', 'Any unworn, unaltered piece can be returned within 60 days for a full refund. Alterations made by your own tailor within that window do not void the return.'],
    ['Do you ship internationally?', 'Yes \u2014 standard shipping is complimentary on orders over $150 within the countries listed at checkout, with express options available everywhere else.'],
    ['How should I care for leather shoes?', 'Wipe down after wear, use cedar shoe trees to hold shape, and condition every 8\u201310 wears. Full care notes ship with every pair.'],
    ['Can I get a garment altered after purchase?', 'Every order includes a printed alteration guide for your local tailor at no charge, covering the most common adjustments for that piece.'],
  ]

  return (
    <div className="wrap pad" style={{ maxWidth: '760px' }}>
      <div className="crumbs">
        <Link to="/">Home</Link><span className="sep">/</span><span>FAQ</span>
      </div>
      <h1 style={{ margin: '18px 0 34px', fontSize: '30px' }}>Frequently Asked Questions</h1>
      {qas.map((qa, i) => (
        <details className="filter-group" key={i} style={{ padding: '20px 0' }}>
          <summary style={{ fontFamily: 'var(--font-display)', fontSize: '17px', textTransform: 'none', letterSpacing: '0' }}>
            {qa[0]}
          </summary>
          <div className="filter-body">
            <p style={{ fontSize: '14.5px', color: 'var(--muted-on-bone)' }}>{qa[1]}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
