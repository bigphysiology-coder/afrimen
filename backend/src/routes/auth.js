import { Router } from 'express'
import crypto from 'crypto'
import { query } from '../db.js'

const router = Router()

const sessions = new Map()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' })

    const existing = await query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.rows.length) return res.status(409).json({ error: 'Email already registered' })

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const user = await query(
      'INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id, name, email, role',
      [name, email, hash]
    )
    const token = crypto.randomUUID()
    sessions.set(token, user.rows[0].id)
    res.status(201).json({ user: user.rows[0], token })
  } catch (err) {
    console.error('POST /api/auth/register error:', err)
    res.status(500).json({ error: 'Registration failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const result = await query('SELECT id, name, email, role FROM users WHERE email = $1 AND password = $2', [email, hash])
    if (!result.rows.length) return res.status(401).json({ error: 'Invalid email or password' })

    const token = crypto.randomUUID()
    sessions.set(token, result.rows[0].id)
    res.json({ user: result.rows[0], token })
  } catch (err) {
    console.error('POST /api/auth/login error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
})

router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token || !sessions.has(token)) return res.status(401).json({ error: 'Not authenticated' })
  const result = await query('SELECT id, name, email, role FROM users WHERE id = $1', [sessions.get(token)])
  if (!result.rows.length) return res.status(401).json({ error: 'User not found' })
  res.json({ user: result.rows[0], token })
})

router.post('/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token) sessions.delete(token)
  res.json({ success: true })
})

export { sessions }
export default router
