import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct, getProducts } from '../services/api'
import { useApp } from '../hooks/AppContext'
import { productArt, StarHeart, ReturnIcon, ToolIcon, LeafIcon } from '../data/icons'
import { stars } from '../data/reviews'
import { COLOR_HEX } from '../data/colors'
import ReviewSection from '../components/ReviewSection'
import SizeChartModal from '../components/SizeChartModal'
import ProductCard from '../components/ProductCard'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart, toggleWish, wishlist, addToast } = useApp()

  const [p, setP] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [size, setSize] = useState(null)
  const [color, setColor] = useState('')
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('details')
  const [thumb, setThumb] = useState(0)
  const [showSizeChart, setShowSizeChart] = useState(false)

  useEffect(() => {
    setLoading(true)
    getProduct(id).then(data => {
      setP(data)
      document.title = data.name + ' \u2014 Afrimen'
      const validSizes = data.sizes.filter((_, i) => i !== (data.id % 5 === 0 ? data.id % data.sizes.length : -1))
      setSize(validSizes[0] || data.sizes[0])
      setColor(data.colors[0] || '')
      setQty(1)
      setTab('details')
      setThumb(0)
      getProducts({ category: data.category }).then(all => {
        setRelated(all.filter(r => r.id !== data.id).slice(0, 4))
      }).catch(() => {})
    }).catch(() => setP(null)).finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="wrap pad">
        <p>Loading...</p>
      </div>
    )
  }

  if (!p) {
    return (
      <div className="wrap pad">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-outline" style={{ marginTop: '20px' }}>Back to Shop</Link>
      </div>
    )
  }

  const reviews = p.reviews || []
  const breakdown = p.breakdown || {}
  const thumbColors = [p.accent, p.accent2, '#232B33', '#8C874F']

  const handleAddToCart = () => {
    addToCart(p, size, color, qty)
  }

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link to="/">Home</Link><span className="sep">/</span>
        <Link to={'/shop?cat=' + p.category}>{p.category}</Link><span className="sep">/</span>
        <span>{p.name}</span>
      </div>

      <div className="pd-layout">
        <div>
          <div className="pd-gallery-main" id="pdMainArt">
            {productArt({ sub: p.sub, accent: thumbColors[thumb] })}
          </div>
          <div className="pd-thumbs" id="pdThumbs">
            {thumbColors.map((c, i) => (
              <button key={i} className={'pd-thumb' + (i === thumb ? ' active' : '')}
                onClick={() => setThumb(i)}>
                {productArt({ sub: p.sub, accent: c })}
              </button>
            ))}
          </div>
        </div>

        <div className="pd-info">
          <span className="cat mono">{p.category} / {p.sub} / {p.sku}</span>
          <h1>{p.name}</h1>
          <div className="pd-rating-row">
            <span className="stars">{stars(parseFloat(p.rating))}</span>
            <span style={{ fontSize: '13px', color: 'var(--muted-on-bone)' }}>{p.rating}{' \u00b7 '}{p.review_count} reviews</span>
          </div>
          <div className="pd-price mono">${p.price}</div>
          <p className="pd-desc">{p.descr}</p>

          <div className="pd-block">
            <div className="pd-label">{'Color \u2014 '}<span id="colorLabel">{color}</span></div>
            <div className="swatch-row">
              {p.colors.map((c, i) => (
                <span key={c} className={'swatch' + (i === 0 && color === c ? ' active' : '')}
                  style={{ background: COLOR_HEX[c] || '#888' }} title={c}
                  onClick={() => setColor(c)}></span>
              ))}
            </div>
          </div>

          <div className="pd-block">
            <div className="pd-label">
              Size
              <button onClick={() => setShowSizeChart(true)}>Size Chart</button>
            </div>
            <div className="size-grid">
              {p.sizes.map((sz, i) => (
                <button key={sz} className={'size-btn' + (size === sz ? ' active' : '')}
                  data-size={sz} disabled={i === (p.id % 5 === 0 ? p.id % p.sizes.length : -1)}
                  onClick={() => setSize(sz)}>{sz}</button>
              ))}
            </div>
          </div>

          <div className="pd-block">
            <div className="pd-label">Quantity</div>
            <div className="qty-row">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <div className="stock-line">
            <span className={'stock-dot' + (p.stock <= 4 && p.stock > 0 ? ' low' : '')}></span>
            {p.stock === 0
              ? 'Currently out of stock \u2014 join the waitlist'
              : (p.stock <= 4 ? 'Only ' + p.stock + ' left in stock' : 'In stock, ships in 1\u20132 business days')}
          </div>

          <div className="pd-actions">
            <button className="btn btn-primary" id="pdAddCart"
              disabled={p.stock === 0} onClick={handleAddToCart}>
              {p.stock === 0 ? 'Notify Me' : 'Add to Cart \u2014 $' + p.price}
            </button>
            <button className={'btn btn-outline' + (wishlist.includes(p.id) ? ' active' : '')}
              onClick={() => toggleWish(p.id)}>
              <StarHeart /> Save
            </button>
          </div>

          <div className="trust-row">
            {trustItem(<ReturnIcon />, '60-day returns, free of charge')}
            {trustItem(<ToolIcon />, 'Complimentary alteration guide included')}
            {trustItem(<LeafIcon />, 'Responsibly sourced ' + (p.material || '').toLowerCase())}
          </div>
        </div>
      </div>

      <div className="tabs-nav">
        <button className={tab === 'details' ? 'active' : ''} onClick={() => setTab('details')}>Details</button>
        <button className={tab === 'specs' ? 'active' : ''} onClick={() => setTab('specs')}>Specifications</button>
        <button className={tab === 'shipping' ? 'active' : ''} onClick={() => setTab('shipping')}>Shipping &amp; Returns</button>
        <button className={tab === 'reviews' ? 'active' : ''} onClick={() => setTab('reviews')}>Reviews ({p.review_count})</button>
      </div>

      <div className={'tab-panel' + (tab === 'details' ? ' active' : '')} data-panel="details">
        <p>{p.descr} Cut from our {p.collection} line, this piece is finished by hand in our Lagos workroom and checked against the same pattern block used since 2020.</p>
      </div>

      <div className={'tab-panel' + (tab === 'specs' ? ' active' : '')} data-panel="specs">
        <table className="spec-table">
          <tbody>
            <tr><td>Material</td><td>{p.material}</td></tr>
            <tr><td>Collection</td><td>{p.collection}</td></tr>
            <tr><td>SKU</td><td>{p.sku}</td></tr>
            <tr><td>Available Sizes</td><td>{p.sizes.join(', ')}</td></tr>
            <tr><td>Care</td><td>{p.category === 'Shoes' ? 'Wipe clean, cedar shoe trees recommended' : 'Dry clean or hand wash cold'}</td></tr>
            <tr><td>Made In</td><td>Nigeria</td></tr>
          </tbody>
        </table>
      </div>

      <div className={'tab-panel' + (tab === 'shipping' ? ' active' : '')} data-panel="shipping">
        <p>{'Standard shipping (3\u20135 business days) is complimentary on all orders over $150. Express shipping (1\u20132 business days) is available at checkout. Returns are accepted within 60 days in original condition; alterations by your own tailor do not void a return within that window.'}</p>
      </div>

      <div className={'tab-panel' + (tab === 'reviews' ? ' active' : '')} data-panel="reviews">
        <ReviewSection reviews={reviews} breakdown={breakdown} product={p} />
      </div>

      {related.length > 0 && (
        <div className="related-strip">
          <div className="section-head">
            <h2 style={{ fontSize: '26px' }}>You Might Also Like</h2>
          </div>
          <div className="grid-products">
            {related.map(r => <ProductCard key={r.id} p={r} />)}
          </div>
        </div>
      )}

      {showSizeChart && <SizeChartModal category={p.category} onClose={() => setShowSizeChart(false)} />}
    </div>
  )
}

function trustItem(icon, text) {
  return (
    <div className="t-item">
      {icon}
      <span>{text}</span>
    </div>
  )
}
