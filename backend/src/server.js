import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import productsRouter from './routes/products.js'
import cartRouter from './routes/cart.js'
import wishlistRouter from './routes/wishlist.js'
import contactRouter from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/contact', contactRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Afrimen API running on http://localhost:${PORT}`)
})
