import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { session_id } = req.query
    if (!session_id) return res.json([])
    const result = await query(
      `SELECT wi.*, p.name, p.price, p.sub, p.accent, p.sku, p.stock, p.rating, p.review_count, p.colors, p.category, p.collection, p.descr, p.material, p.sizes
       FROM wishlist_items wi JOIN products p ON p.id = wi.product_id
       WHERE wi.session_id = $1 ORDER BY wi.created_at`,
      [session_id]
    )
    res.json(result.rows)
  } catch (err) {
    console.error('GET /api/wishlist error:', err)
    res.status(500).json({ error: 'Failed to fetch wishlist' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { session_id, product_id } = req.body
    if (!session_id || !product_id) return res.status(400).json({ error: 'session_id and product_id required' })

    const existing = await query(
      'SELECT * FROM wishlist_items WHERE session_id = $1 AND product_id = $2',
      [session_id, product_id]
    )
    if (existing.rows.length) return res.json(existing.rows[0])

    const result = await query(
      'INSERT INTO wishlist_items (session_id, product_id) VALUES ($1,$2) RETURNING *',
      [session_id, product_id]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('POST /api/wishlist error:', err)
    res.status(500).json({ error: 'Failed to add to wishlist' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM wishlist_items WHERE id = $1 RETURNING *', [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Wishlist item not found' })
    res.json({ deleted: true })
  } catch (err) {
    console.error('DELETE /api/wishlist/:id error:', err)
    res.status(500).json({ error: 'Failed to remove wishlist item' })
  }
})

export default router
