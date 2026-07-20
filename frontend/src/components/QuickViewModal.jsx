import { Link } from 'react-router-dom'
import { useApp } from '../hooks/AppContext'
import { productArt } from '../data/icons'
import { stars } from '../data/reviews'
import { COLOR_HEX } from '../data/colors'

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useApp()
  if (!product) return null

  const pid = product.id || product.product_id
  const rating = parseFloat(product.rating || 4)
  const reviewCount = product.review_count || product.reviewCount || 0
  const desc = product.descr || product.desc || ''
  const sizes = product.sizes || ['M']
  const colors = product.colors || ['Bone']

  return (
    <>
      <div className="overlay open" onClick={onClose}></div>
      <div className="modal open" role="dialog" aria-modal="true" aria-label="Quick view">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
        <div className="qv-layout">
          <div className="qv-art">
            {productArt(product)}
          </div>
          <div className="qv-body">
            <div className="cat">{product.category} / {product.sub}</div>
            <h3>{product.name}</h3>
            <div className="price mono">${product.price}</div>
            <div className="pd-rating-row">
              <span className="stars">{stars(rating)}</span>
              <span style={{ fontSize: '12.5px', color: 'var(--muted-on-bone)' }}>{rating} ({reviewCount} reviews)</span>
            </div>
            <p className="desc">{desc}</p>
            <div className="pd-block">
              <div className="pd-label">Color</div>
              <div className="swatch-row">
                {colors.map((c, i) => (
                  <span key={i} className="swatch" style={{ background: COLOR_HEX[c] || '#888' }} title={c}></span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { addToCart(product, sizes[0], colors[0], 1); onClose() }}>
                Add to Cart
              </button>
              <Link to={'/product/' + pid} className="btn btn-outline" onClick={onClose}>
                Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
