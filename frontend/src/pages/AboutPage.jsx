import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  useEffect(() => { document.title = 'About \u2014 Afrimen' }, [])

  return (
    <>
      <section className="shop-header">
        <div className="wrap">
          <div className="crumbs" style={{ color: 'var(--muted-on-ink)' }}>
            <Link to="/">Home</Link><span className="sep">/</span><span>About</span>
          </div>
          <h1 style={{ marginTop: '14px' }}>Started on a pattern block, 2020.</h1>
        </div>
      </section>
      <div className="wrap pad" style={{ maxWidth: '760px' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
          {'Afrimen began in a small tailoring shop in Ikeja, Lagos, taking in uniforms and traditional agbadas for alteration. The same block-drafting method used on that first workbench \u2014 measure, adjust, cut, fit again \u2014 still governs how every collection is built today.'}
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
          We keep a small number of mills and tanneries on long-term contract rather than sourcing on price alone, and every garment ships with a printed alteration guide so your local tailor can finish the fit properly, for free.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
          We are not the fastest fashion house, and do not want to be. We would rather you owned twelve pieces for a decade than forty for a season.
        </p>
      </div>
    </>
  )
}
