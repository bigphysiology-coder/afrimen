import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const result = await query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1,$2,$3,$4) RETURNING *',
      [name, email, subject, message]
    )
    res.status(201).json({ success: true, id: result.rows[0].id })
  } catch (err) {
    console.error('POST /api/contact error:', err)
    res.status(500).json({ error: 'Failed to submit message' })
  }
})

export default router
