const SESSION_KEY = 'af_session'

function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY, id)
  }
  return id
}

async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }
  return res.json()
}

export function getProducts(filters = {}) {
  const params = new URLSearchParams()
  if (filters.category) params.set('category', filters.category)
  if (filters.sub) params.set('sub', filters.sub)
  if (filters.collection) params.set('collection', filters.collection)
  if (filters.search) params.set('search', filters.search)
  if (filters.sort) params.set('sort', filters.sort)
  if (filters.dir) params.set('dir', filters.dir)
  const qs = params.toString()
  return request(`/api/products${qs ? '?' + qs : ''}`)
}

export function getProduct(id) {
  return request(`/api/products/${id}`)
}

export function getCart() {
  return request(`/api/cart?session_id=${getSessionId()}`)
}

export function addToCart(productId, size, color, quantity = 1) {
  return request('/api/cart', {
    method: 'POST',
    body: JSON.stringify({ session_id: getSessionId(), product_id: productId, size, color, quantity }),
  })
}

export function updateCartItem(id, quantity) {
  return request(`/api/cart/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  })
}

export function removeCartItem(id) {
  return request(`/api/cart/${id}`, { method: 'DELETE' })
}

export function getWishlist() {
  return request(`/api/wishlist?session_id=${getSessionId()}`)
}

export function addToWishlist(productId) {
  return request('/api/wishlist', {
    method: 'POST',
    body: JSON.stringify({ session_id: getSessionId(), product_id: productId }),
  })
}

export function removeWishlistItem(id) {
  return request(`/api/wishlist/${id}`, { method: 'DELETE' })
}

export function submitContact(data) {
  return request('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
