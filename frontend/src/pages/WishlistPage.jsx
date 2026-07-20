import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../hooks/AppContext'
import ProductCard from '../components/ProductCard'
import { StarHeart } from '../data/icons'

export default function WishlistPage() {
  const { wishlistData } = useApp()
  useEffect(() => { document.title = 'Wishlist \u2014 Afrimen' }, [])

  return (
    <div className="wrap pad">
      <div className="crumbs">
        <Link to="/">Home</Link><span className="sep">/</span><span>Wishlist</span>
      </div>
      <h1 style={{ margin: '18px 0 30px', fontSize: '30px' }}>Your Wishlist</h1>
      {wishlistData.length ? (
        <div className="grid-products">
          {wishlistData.map(w => <ProductCard key={w.product_id} p={w} />)}
        </div>
      ) : (
        <div className="empty-state">
          <StarHeart />
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '17px', margin: '14px 0 8px' }}>Nothing saved yet</h3>
          <p>Tap the heart on any piece to keep it here.</p>
          <Link to="/shop" className="btn btn-outline btn-sm" style={{ marginTop: '18px' }}>Browse the Shop</Link>
        </div>
      )}
    </div>
  )
}
