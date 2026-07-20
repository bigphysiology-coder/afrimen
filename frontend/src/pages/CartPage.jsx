import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../hooks/AppContext'
import { productArt, BagIcon } from '../data/icons'

export default function CartPage() {
  const { cart, removeFromCart, updateCartQty, addToast } = useApp()
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(null)
  const [couponMsg, setCouponMsg] = useState('')

  useEffect(() => { document.title = 'Your Cart \u2014 Afrimen' }, [])

  if (cart.length === 0) {
    return (
      <div className="wrap">
        <div className="cart-empty">
          <BagIcon />
          <h2>Your cart is empty</h2>
          <p>Pieces you add will collect here, patiently, like a good tailor waiting on a fitting.</p>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)

  const discount = couponApplied ? subtotal * couponApplied.pct : 0
  const shippingCost = subtotal > 150 ? 0 : 12
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shippingCost + tax

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase()
    if (code === 'AFRIMEN10') {
      setCouponApplied({ pct: 0.10 })
      setCouponMsg('10% discount applied.')
      addToast('Coupon applied')
    } else if (code === '') {
      setCouponMsg('')
    } else {
      setCouponApplied(null)
      setCouponMsg('That code is not valid.')
    }
  }

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link to="/">Home</Link><span className="sep">/</span><span>Cart</span>
      </div>
      <h1 style={{ margin: '18px 0 6px', fontSize: '30px' }}>Your Cart</h1>
      <p style={{ color: 'var(--muted-on-bone)', marginBottom: '10px' }}>{cart.length} item(s)</p>

      <div className="cart-layout">
        <div>
          {cart.map(item => cartItemRow(item, removeFromCart, updateCartQty))}
          <Link to="/shop" style={{ display: 'inline-block', marginTop: '20px', fontSize: '13px', textDecoration: 'underline' }}>
            {'\u2190 Continue Shopping'}
          </Link>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="coupon-row">
            <input type="text" value={couponCode} onChange={e => setCouponCode(e.target.value)} placeholder="Coupon code" />
            <button className="btn btn-outline btn-sm" onClick={applyCoupon}>Apply</button>
          </div>
          {couponMsg && (
            <div className={'coupon-msg ' + (couponApplied ? 'ok' : 'err')}>{couponMsg}</div>
          )}
          <div className="sum-row">
            <span>Subtotal</span>
            <span className="val mono">${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="sum-row">
              <span>Discount</span>
              <span className="val mono">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="sum-row">
            <span>Estimated Shipping</span>
            <span className="val mono">{shippingCost === 0 ? 'Free' : '$' + shippingCost.toFixed(2)}</span>
          </div>
          <div className="sum-row">
            <span>Estimated Tax</span>
            <span className="val mono">${tax.toFixed(2)}</span>
          </div>
          <div className="sum-row total">
            <span>Total</span>
            <span className="val mono">${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '14px' }}
            onClick={() => addToast('This is a prototype \u2014 checkout is not connected.')}>
            Proceed to Checkout
          </button>
          <p style={{ fontSize: '11px', color: 'var(--muted-on-bone)', marginTop: '14px', textAlign: 'center' }}>
            Free shipping on orders over $150
          </p>
        </div>
      </div>
    </div>
  )
}

function cartItemRow(item, removeFromCart, updateCartQty) {
  return (
    <div className="cart-item" key={item.id}>
      <div className="thumb">{productArt({ sub: item.sub, accent: item.accent, name: item.name })}</div>
      <div>
        <h4>{item.name}</h4>
        <div className="meta">{'Size: ' + item.size + ' \u00b7 Color: ' + item.color + ' \u00b7 ' + item.sku}</div>
        <div className="row-bottom">
          <div className="qty-row sm">
            <button onClick={() => updateCartQty(item.id, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateCartQty(item.id, 1)}>+</button>
          </div>
        </div>
      </div>
      <div className="price-col">
        <div className="price mono">${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
        <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  )
}
