import { Link } from 'react-router-dom'
import { useApp } from '../hooks/AppContext'
import { productArt, StarHeart } from '../data/icons'
import { stars } from '../data/reviews'

export default function ProductCard({ p }) {
  const { wishlist, toggleWish, openQuickView } = useApp()
  const pid = p.id || p.product_id
  const stock = p.stock ?? 20
  const rating = parseFloat(p.rating || 4)
  const reviewCount = p.review_count || p.reviewCount || 0
  const stockTag = stock === 0
    ? <span className="stock-out">Sold Out</span>
    : (stock <= 4 ? <span className="stock-low">Only {stock} left</span> : '')
  const wishActive = wishlist.indexOf(pid) > -1 ? ' active' : ''

  return (
    <article className="card">
      <Link to={'/product/' + pid} aria-label={p.name}>
        <div className="art">
          <span className="eyelet"></span>
          <span className="tag-string"></span>
          {productArt(p)}
        </div>
      </Link>
      <button className={'wish' + wishActive} data-wish-id={pid} aria-label="Save to wishlist" onClick={() => toggleWish(pid)}>
        <StarHeart />
      </button>
      <button className="quickview" onClick={() => openQuickView(pid)}>Quick View</button>
      <div className="info">
        <span className="cat mono">{p.sub}</span>
        <Link to={'/product/' + pid}><h3>{p.name}</h3></Link>
        <div className="rating">
          <span className="stars">{stars(rating)}</span> {rating} ({reviewCount})
        </div>
        <div className="price-row">
          <span className="price">${p.price}</span>
          {stockTag}
        </div>
      </div>
    </article>
  )
}
