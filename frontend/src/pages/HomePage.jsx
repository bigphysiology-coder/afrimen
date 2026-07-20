import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import TapeDivider from '../components/TapeDivider'
import Testimonials from '../components/Testimonials'
import { NeedleIcon, LeafIcon, ToolIcon, ReturnIcon } from '../data/icons'
import { getProducts } from '../services/api'
import { useApp } from '../hooks/AppContext'

export default function HomePage() {
  const { addToast } = useApp()
  useEffect(() => { document.title = 'Afrimen \u2014 Cut for African Men' }, [])

  const [featured, setFeatured] = useState([])
  const [arrivals, setArrivals] = useState([])

  useEffect(() => {
    getProducts({ sort: 'rating', dir: 'desc' }).then(all => {
      setFeatured(all.filter(p => parseFloat(p.rating) >= 4.3).slice(0, 8))
      setArrivals(all.slice(-8).reverse().slice(0, 4))
    }).catch(() => {})
  }, [])

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">{'Autumn/Winter Collection \u00b7 No. 14'}</span>
            <h1>Cut for how <em>you</em> actually move.</h1>
            <p className="lede">{'Every Afrimen piece begins on a tailor\'s pattern block, not a mood board \u2014 measured, adjusted, and worn-in before it ever reaches a shelf.'}</p>
            <div className="hero-ctas">
              <Link to="/shop" className="btn btn-brass">Shop the Collection</Link>
              <Link to="/about" className="btn btn-outline on-ink">Our Approach</Link>
            </div>
            <div className="hero-stats">
              <div><b>2020</b><span>Founded in Lagos</span></div>
              <div><b>60-day</b><span>Returns, no questions</span></div>
              <div><b>12,400+</b><span>Garments re-tailored yearly</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=750&fit=crop&auto=format" alt="Afrimen blazer" className="product-img" />
            <div className="tagline"><span>SKU AF-0001</span><span>WOOL / 420g</span></div>
          </div>
        </div>
      </section>

      <TapeDivider onInk />

      <section className="pad">
        <div className="wrap">
          <div className="section-head">
            <div><span className="eyebrow">Bestsellers</span><h2>Featured Pieces</h2></div>
            <Link to="/shop" className="link-more">{'View All \u2192'}</Link>
          </div>
          <div className="grid-products">
            {featured.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <TapeDivider />

      <section className="pad" style={{ background: 'var(--bone)' }}>
        <div className="wrap">
          <div className="section-head">
            <div><span className="eyebrow">This Week</span><h2>New Arrivals</h2></div>
            <Link to="/shop" className="link-more">{'View All \u2192'}</Link>
          </div>
          <div className="grid-products">
            {arrivals.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="section-head">
            <div><span className="eyebrow">Shop by Department</span><h2>Categories</h2></div>
          </div>
          <div className="cat-grid">
            {catCard('Clothing', '01', 'Suits to shirting, cut with room to live in.')}
            {catCard('Shoes', '02', 'Goodyear-welted, resoleable, built to be repaired not replaced.')}
            {catCard('Accessories', '03', 'The details that finish the outfit properly.')}
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div><span className="eyebrow">Why Afrimen</span><h2>Built to Be Kept</h2></div>
          </div>
        </div>
        <div className="why-grid">
          {whyItem(<NeedleIcon />, 'Cut, Not Assembled', 'Every pattern is drafted in-house against real body scans, not a stock block.')}
          {whyItem(<LeafIcon />, 'Considered Materials', 'Full-grain leather, ring-spun cotton, mulesing-free wool \u2014 sourced, not sold to us.')}
          {whyItem(<ToolIcon />, 'Free Alteration Guide', 'Every order ships with a printed guide for your local tailor, at no charge.')}
          {whyItem(<ReturnIcon />, '60-Day Returns', 'Wear it to a meeting, in the rain, on a plane. If it is wrong, send it back.')}
        </div>
      </section>

      <section className="testi-wrap pad">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: '10px' }}>
            <div><span className="eyebrow">In Their Words</span><h2>From the Fitting Room</h2></div>
          </div>
          <Testimonials />
        </div>
      </section>

      <section className="newsletter">
        <div className="wrap nl-row">
          <h2>Get first look at new arrivals and restocks.</h2>
          <form className="nl-form" onSubmit={e => { e.preventDefault(); addToast('Subscribed \u2014 welcome to the list.'); e.target.reset() }}>
            <input type="email" required placeholder="you@email.com" aria-label="Email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  )
}

function catCard(cat, n, desc) {
  const img = cat === 'Clothing'
    ? 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=720&fit=crop&auto=format'
    : cat === 'Shoes'
      ? 'https://images.unsplash.com/photo-1614252235316-8c85727138e8?w=600&h=720&fit=crop&auto=format'
      : 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=720&fit=crop&auto=format'
  return (
    <Link to={'/shop?cat=' + cat} className="cat-card">
      <span className="catbg" style={{ position: 'absolute', inset: 0 }}>
        <img src={img} alt={cat} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </span>
      <div className="content">
        <span className="n mono">{n}</span>
        <h3>{cat}</h3>
        <p style={{ fontSize: '13px', color: 'var(--muted-on-ink)', marginBottom: '14px' }}>{desc}</p>
        <span className="cta">{'Shop ' + cat}</span>
      </div>
    </Link>
  )
}

function whyItem(icon, title, desc) {
  return (
    <div className="why-item">
      {icon}
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  )
}
