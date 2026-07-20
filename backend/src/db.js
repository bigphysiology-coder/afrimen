import pkg from 'pg'
const { Pool } = pkg
import 'dotenv/config'

const pool = new Pool({
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || '5432'),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err)
  process.exit(-1)
})

export function query(text, params) {
  return pool.query(text, params)
}

export default pool
