import { stars } from '../data/reviews'

export default function ReviewSection({ reviews = [], breakdown = {}, product }) {
  const barData = [5, 4, 3, 2, 1].map(rating => {
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0) || 1
    return { rating, pct: Math.round(((breakdown[rating] || 0) / total) * 100) }
  })

  return (
    <>
      <div className="reviews-summary">
        <div className="rev-score">
          <div className="num mono">{product.rating}</div>
          <span className="stars">{stars(parseFloat(product.rating))}</span>
          <div className="count">{product.review_count} reviews</div>
        </div>
        <div className="rev-bars">
          {barData.map(b => (
            <div className="rev-bar-row" key={b.rating}>
              <span>{b.rating}{'\u2605'}</span>
              <div className="rev-bar-track">
                <div className="rev-bar-fill" style={{ width: b.pct + '%' }}></div>
              </div>
              <span>{b.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      {reviews.map((r, i) => (
        <div className="review-item" key={r.id || i}>
          <span className="stars">{stars(r.rating)}</span>
          <h5>{r.name}</h5>
          <div className="meta">{'Verified purchase \u00b7 ' + r.days_ago + ' days ago'}</div>
          <p>{r.text}</p>
        </div>
      ))}
    </>
  )
}
