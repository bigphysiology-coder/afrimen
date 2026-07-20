import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, addToCart as apiAddToCart, updateCartItem, removeCartItem, getWishlist, addToWishlist, removeWishlistItem, getProduct } from '../services/api'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [wishlistIds, setWishlistIds] = useState([])
  const [toasts, setToasts] = useState([])
  const [qvProduct, setQvProduct] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      getCart().then(setCart).catch(() => {}),
      getWishlist().then(items => { setWishlist(items); setWishlistIds(items.map(i => i.product_id)) }).catch(() => {}),
    ]).finally(() => setLoaded(true))
  }, [])

  const cartCount = cart.reduce((a, i) => a + i.quantity, 0)

  const addToCart = useCallback((prod, size, color, qty) => {
    apiAddToCart(prod.id, size, color, qty).then(item => {
      setCart(prev => {
        const idx = prev.findIndex(c => c.product_id === item.product_id && c.size === item.size && c.color === item.color)
        if (idx > -1) {
          const next = [...prev]
          next[idx] = { ...next[idx], quantity: item.quantity }
          return next
        }
        return [...prev, { ...item, id: item.id, product_id: item.product_id, quantity: item.quantity }]
      })
    }).catch(() => {
      addToast('Could not add to cart')
    })
    addToast('Added to cart \u2014 ' + prod.name)
  }, [])

  const removeFromCart = useCallback((cartItemId) => {
    removeCartItem(cartItemId).then(() => {
      setCart(prev => prev.filter(c => c.id !== cartItemId))
    }).catch(() => addToast('Could not remove item'))
    addToast('Item removed')
  }, [])

  const updateCartQty = useCallback((cartItemId, delta) => {
    setCart(prev => {
      const item = prev.find(c => c.id === cartItemId)
      if (!item) return prev
      const newQty = Math.max(1, item.quantity + delta)
      updateCartItem(cartItemId, newQty).catch(() => addToast('Could not update quantity'))
      return prev.map(c => c.id === cartItemId ? { ...c, quantity: newQty } : c)
    })
  }, [])

  const toggleWish = useCallback((productId) => {
    if (wishlistIds.includes(productId)) {
      const item = wishlist.find(w => w.product_id === productId)
      if (item) {
        removeWishlistItem(item.id).then(() => {
          setWishlist(prev => prev.filter(w => w.id !== item.id))
          setWishlistIds(prev => prev.filter(id => id !== productId))
        }).catch(() => addToast('Could not update wishlist'))
      }
      addToast('Removed from wishlist')
    } else {
      addToWishlist(productId).then(item => {
        setWishlist(prev => [...prev, item])
        setWishlistIds(prev => [...prev, productId])
      }).catch(() => addToast('Could not update wishlist'))
      addToast('Saved to wishlist')
    }
  }, [wishlist, wishlistIds])

  const addToast = useCallback((msg) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, msg }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3200)
  }, [])

  const openQuickView = useCallback((id) => {
    getProduct(id).then(p => setQvProduct(p)).catch(() => {})
  }, [])

  const closeQuickView = useCallback(() => {
    setQvProduct(null)
  }, [])

  const clearFilters = useCallback(() => {
    navigate('/shop')
  }, [navigate])

  const value = {
    cart, cartCount, toasts, qvProduct, loaded,
    addToCart, removeFromCart, updateCartQty,
    wishlist: wishlistIds, wishlistData: wishlist, toggleWish, addToast,
    openQuickView, closeQuickView, clearFilters,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export function useToast() {
  return useApp().addToast
}
