import { useState, useEffect, useCallback } from 'react'
import { stars, TESTIMONIALS } from '../data/reviews'

export default function Testimonials() {
  const [idx, setIdx] = useState(0)

  const next = useCallback(() => setIdx(i => (i + 1) % TESTIMONIALS.length), [])
  const prev = useCallback(() => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const t = TESTIMONIALS[idx]

  return (
    <>
      <div className="testi-track">
        <div className="testi-slide active">
          <span className="testi-stars">{stars(t[3])}</span>
          <p className="testi-quote">&ldquo;{t[0]}&rdquo;</p>
          <div className="testi-meta">
            <div className="testi-ava">{t[1][0]}</div>
            <div>
              <div className="testi-name">{t[1]}</div>
              <div className="testi-role">{t[2]}</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="testi-nav">
          <button onClick={prev} aria-label="Previous testimonial">&lsaquo;</button>
          <button onClick={next} aria-label="Next testimonial">&rsaquo;</button>
        </div>
        <div className="testi-dots">
          {TESTIMONIALS.map((_, i) => (
            <span key={i} className={i === idx ? 'active' : ''} onClick={() => setIdx(i)}></span>
          ))}
        </div>
      </div>
    </>
  )
}
