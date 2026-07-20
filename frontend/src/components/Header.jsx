import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/AppContext'
import { SearchIcon, HeartIcon, CartIcon, UserIcon, MenuIcon, CloseIcon } from '../data/icons'

export default function Header() {
  const { cartCount, wishlist } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')

  const isActive = (path) => location.pathname === path || location.search?.includes(path.split('?')[1] || '____')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQ.trim()) navigate('/shop?q=' + encodeURIComponent(searchQ.trim()))
  }

  const handleMobileSearch = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      navigate('/shop?q=' + encodeURIComponent(e.target.value.trim()))
      setMenuOpen(false)
    }
  }

  return (
    <>
      <header className="site">
        <div className="wrap header-row">
          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </button>
          <Link to="/" className="logo" aria-label="Afrimen, home">
            <svg className="mark" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.3">
              <circle cx="15" cy="15" r="13.5" />
              <path d="M15 5 L15 25 M9 9 L21 21 M21 9 L9 21" strokeWidth="0.8" opacity="0.6" />
              <circle cx="15" cy="15" r="2.4" fill="currentColor" stroke="none" />
            </svg>
            AFRIMEN
          </Link>
          <nav className="primary" aria-label="Primary">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>Shop All</Link>
            <Link to="/shop?cat=Clothing" className={location.pathname === '/shop' && new URLSearchParams(location.search).get('cat') === 'Clothing' ? 'active' : ''}>Clothing</Link>
            <Link to="/shop?cat=Shoes" className={location.pathname === '/shop' && new URLSearchParams(location.search).get('cat') === 'Shoes' ? 'active' : ''}>Shoes</Link>
            <Link to="/shop?cat=Accessories" className={location.pathname === '/shop' && new URLSearchParams(location.search).get('cat') === 'Accessories' ? 'active' : ''}>Accessories</Link>
          </nav>
          <div className="header-actions">
            <form className="search-box" onSubmit={handleSearch} role="search">
              <SearchIcon />
              <input type="search" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search products..." aria-label="Search products" />
            </form>
            <Link to="/account" className="icon-btn" aria-label="Account"><UserIcon /></Link>
            <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
              <HeartIcon />
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              <CartIcon />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>

      <div className={'mobile-menu' + (menuOpen ? ' open' : '')}>
        <div className="top">
          <Link to="/" className="logo" style={{ color: 'var(--paper)' }} onClick={() => setMenuOpen(false)}>
            AFRIMEN
          </Link>
          <button className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop All</Link>
        <Link to="/shop?cat=Clothing" onClick={() => setMenuOpen(false)}>Clothing</Link>
        <Link to="/shop?cat=Shoes" onClick={() => setMenuOpen(false)}>Shoes</Link>
        <Link to="/shop?cat=Accessories" onClick={() => setMenuOpen(false)}>Accessories</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
        <div className="msearch">
          <SearchIcon />
          <input type="search" placeholder="Search products..." onKeyDown={handleMobileSearch} aria-label="Search products" />
        </div>
      </div>
    </>
  )
}
