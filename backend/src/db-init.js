import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { query } from './db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sql = readFileSync(join(__dirname, 'schema.sql'), 'utf8')

try {
  await query(sql)
  console.log('Schema created successfully')
  process.exit(0)
} catch (err) {
  console.error('Schema init failed:', err)
  process.exit(1)
}
