import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { session_id } = req.query
    if (!session_id) return res.json([])
    const result = await query(
      `SELECT ci.*, p.name, p.price, p.sub, p.accent, p.sku, p.stock, p.rating, p.review_count, p.colors, p.category, p.collection, p.descr, p.material, p.sizes
       FROM cart_items ci JOIN products p ON p.id = ci.product_id
       WHERE ci.session_id = $1 ORDER BY ci.created_at`,
      [session_id]
    )
    res.json(result.rows)
  } catch (err) {
    console.error('GET /api/cart error:', err)
    res.status(500).json({ error: 'Failed to fetch cart' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { session_id, product_id, size, color, quantity } = req.body
    if (!session_id || !product_id) return res.status(400).json({ error: 'session_id and product_id required' })

    const existing = await query(
      `SELECT * FROM cart_items WHERE session_id = $1 AND product_id = $2 AND size = $3 AND color = $4`,
      [session_id, product_id, size || '', color || '']
    )

    if (existing.rows.length) {
      const newQty = existing.rows[0].quantity + (quantity || 1)
      await query('UPDATE cart_items SET quantity = $1 WHERE id = $2', [newQty, existing.rows[0].id])
      return res.json({ ...existing.rows[0], quantity: newQty })
    }

    const result = await query(
      `INSERT INTO cart_items (session_id, product_id, size, color, quantity)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [session_id, product_id, size || '', color || '', quantity || 1]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('POST /api/cart error:', err)
    res.status(500).json({ error: 'Failed to add to cart' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body
    if (!quantity || quantity < 1) return res.status(400).json({ error: 'quantity must be >= 1' })
    const result = await query('UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *', [quantity, req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Cart item not found' })
    res.json(result.rows[0])
  } catch (err) {
    console.error('PUT /api/cart/:id error:', err)
    res.status(500).json({ error: 'Failed to update cart item' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM cart_items WHERE id = $1 RETURNING *', [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Cart item not found' })
    res.json({ deleted: true })
  } catch (err) {
    console.error('DELETE /api/cart/:id error:', err)
    res.status(500).json({ error: 'Failed to remove cart item' })
  }
})

export default router
