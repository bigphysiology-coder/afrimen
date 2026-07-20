import { Router } from 'express'
import { query } from '../db.js'
import { sessions } from './auth.js'

const router = Router()

async function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token || !sessions.has(token)) return res.status(401).json({ error: 'Not authenticated' })
  const result = await query('SELECT role FROM users WHERE id = $1', [sessions.get(token)])
  if (!result.rows.length || result.rows[0].role !== 'admin') return res.status(403).json({ error: 'Admin access required' })
  next()
}

router.get('/products', requireAdmin, async (req, res) => {
  try {
    const result = await query('SELECT * FROM products ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    console.error('GET /api/admin/products error:', err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

router.put('/products/:id', requireAdmin, async (req, res) => {
  try {
    const { name, price, stock, category, sub, collection, descr, material } = req.body
    const result = await query(
      `UPDATE products SET name=$1, price=$2, stock=$3, category=$4, sub=$5, collection=$6, descr=$7, material=$8 WHERE id=$9 RETURNING *`,
      [name, price, stock, category, sub, collection, descr, material, req.params.id]
    )
    if (!result.rows.length) return res.status(404).json({ error: 'Product not found' })
    res.json(result.rows[0])
  } catch (err) {
    console.error('PUT /api/admin/products/:id error:', err)
    res.status(500).json({ error: 'Failed to update product' })
  }
})

router.delete('/products/:id', requireAdmin, async (req, res) => {
  try {
    await query('DELETE FROM reviews WHERE product_id = $1', [req.params.id])
    await query('DELETE FROM cart_items WHERE product_id = $1', [req.params.id])
    await query('DELETE FROM wishlist_items WHERE product_id = $1', [req.params.id])
    const result = await query('DELETE FROM products WHERE id = $1 RETURNING id', [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Product not found' })
    res.json({ deleted: true })
  } catch (err) {
    console.error('DELETE /api/admin/products/:id error:', err)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

router.get('/messages', requireAdmin, async (req, res) => {
  try {
    const result = await query('SELECT * FROM contact_messages ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    console.error('GET /api/admin/messages error:', err)
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

router.delete('/messages/:id', requireAdmin, async (req, res) => {
  try {
    const result = await query('DELETE FROM contact_messages WHERE id = $1 RETURNING id', [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Message not found' })
    res.json({ deleted: true })
  } catch (err) {
    console.error('DELETE /api/admin/messages/:id error:', err)
    res.status(500).json({ error: 'Failed to delete message' })
  }
})

export default router
