import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    let sql = 'SELECT * FROM products'
    const params = []
    const clauses = []

    if (req.query.category) {
      params.push(req.query.category)
      clauses.push(`category = $${params.length}`)
    }
    if (req.query.sub) {
      params.push(req.query.sub)
      clauses.push(`sub = $${params.length}`)
    }
    if (req.query.collection) {
      params.push(req.query.collection)
      clauses.push(`collection = $${params.length}`)
    }
    if (req.query.search) {
      params.push(`%${req.query.search}%`)
      clauses.push(`(name ILIKE $${params.length} OR descr ILIKE $${params.length})`)
    }

    if (clauses.length) sql += ' WHERE ' + clauses.join(' AND ')

    const sort = req.query.sort || 'created_at'
    const dir = req.query.dir === 'asc' ? 'ASC' : 'DESC'
    const allowed = ['price', 'rating', 'name', 'created_at']
    if (!allowed.includes(sort)) sortBy = 'created_at'
    sql += ` ORDER BY ${sort} ${dir}`

    const result = await query(sql, params)
    res.json(result.rows)
  } catch (err) {
    console.error('GET /api/products error:', err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const prod = await query('SELECT * FROM products WHERE id = $1', [id])
    if (!prod.rows.length) return res.status(404).json({ error: 'Product not found' })

    const revs = await query('SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC', [id])
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    revs.rows.forEach(r => { breakdown[r.rating]++ })

    res.json({ ...prod.rows[0], reviews: revs.rows, breakdown })
  } catch (err) {
    console.error('GET /api/products/:id error:', err)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

export default router
