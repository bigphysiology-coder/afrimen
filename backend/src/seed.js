import { query } from './db.js'
import { createHash } from 'crypto'

const COLORS = { ink: '#232B33', walnut: '#6B4A3A', olive: '#5B5C42', slate: '#455A64', tobacco: '#7A5C3E', bone: '#8C7F63', rust: '#8C4A34', charcoal: '#3E4C59' }
const COLOR_LIST = Object.keys(COLORS)
const COLOR_MAP = { 'Ink Black': 'ink', Charcoal: 'charcoal', Walnut: 'walnut', Olive: 'olive', Bone: 'bone', Navy: 'ink', Cognac: 'walnut', Slate: 'slate' }

function seededPick(seed, arr) {
  return arr[seed % arr.length]
}

const RAW = [
  ['Oxford Weave Shirt', 'Clothing', 'Shirt', 128, 'Heritage', 'A dense oxford cloth shirt cut with a soft roll collar, built to soften with every wash.', ['Ink Black', 'Bone', 'Slate']],
  ['Merino Crewneck Sweater', 'Clothing', 'Sweater', 165, 'Modern Line', 'Fine-gauge merino knit in a clean crewneck, light enough to layer under a jacket.', ['Charcoal', 'Olive', 'Navy']],
  ['Waxed Field Jacket', 'Clothing', 'Jacket', 340, 'Heritage', 'Waxed cotton shell with a wool-blend lining, cut for weather that does not ask permission.', ['Walnut', 'Ink Black']],
  ['Two-Button Wool Blazer', 'Clothing', 'Blazer', 420, 'Formal Room', 'Half-canvas construction in a soft-shoulder wool twill, room to move through a long day.', ['Navy', 'Charcoal']],
  ['Half-Canvas Suit, Charcoal', 'Clothing', 'Suit', 895, 'Formal Room', 'A three-season wool suit built on a half-canvas chest for shape that lasts years, not seasons.', ['Charcoal']],
  ['Pima Cotton Polo', 'Clothing', 'Polo', 88, 'Modern Line', 'Long-staple pima cotton piqué with a clean placket, holds its shape wash after wash.', ['Bone', 'Olive', 'Slate']],
  ['Garment-Dyed Tee', 'Clothing', 'T-Shirt', 58, 'Modern Line', 'Heavyweight cotton jersey, garment-dyed for a worn-in tone from the first wear.', ['Walnut', 'Ink Black', 'Bone']],
  ['Flannel Overshirt', 'Clothing', 'Shirt', 142, 'Heritage', 'Brushed flannel in a boxy overshirt cut, equally at home over a tee or under a coat.', ['Slate', 'Walnut', 'Olive']],
  ['Shawl-Collar Cardigan', 'Clothing', 'Sweater', 198, 'Modern Line', 'Lambswool shawl cardigan with horn buttons, the layer you reach for at 6pm.', ['Charcoal', 'Cognac']],
  ['Travel Suit, Navy', 'Clothing', 'Suit', 920, 'Formal Room', 'Performance wool that resists creasing on a redeye, tailored like it never left the shop.', ['Navy']],
  ['Cap-Toe Oxford', 'Shoes', 'Oxford', 360, 'Formal Room', 'Hand-burnished calfskin on a Goodyear-welted sole, resoleable for decades of wear.', ['Ink Black', 'Walnut']],
  ['Suede Chukka Boot', 'Shoes', 'Boot', 285, 'Heritage', 'Two-eyelet suede chukka on a crepe sole, built for cobblestones and long walks alike.', ['Cognac', 'Slate']],
  ['Minimalist Court Sneaker', 'Shoes', 'Sneaker', 210, 'Modern Line', 'Full-grain leather sneaker with a low profile, the one shoe that clears every dress code.', ['Bone', 'Ink Black']],
  ['Penny Loafer, Cognac', 'Shoes', 'Loafer', 310, 'Heritage', 'A single-piece vamp penny loafer on a leather sole, breaks in like an old friend.', ['Cognac']],
  ['Chelsea Boot, Black', 'Shoes', 'Boot', 330, 'Formal Room', 'Elastic-gusset Chelsea boot in box calf, the one boot that works with a suit.', ['Ink Black']],
  ['Derby Brogue', 'Shoes', 'Derby', 340, 'Heritage', 'Full brogue detailing on an open-lace derby, dressed enough for the office, tough enough for the commute.', ['Walnut', 'Cognac']],
  ['Full-Grain Leather Belt', 'Accessories', 'Belt', 95, 'Heritage', 'Vegetable-tanned full-grain leather with a solid brass buckle, ages darker every year.', ['Ink Black', 'Walnut', 'Cognac']],
  ['Bifold Cardholder Wallet', 'Accessories', 'Wallet', 110, 'Modern Line', 'Slim bifold in pebbled calfskin, built to sit flat in a jacket pocket, not a back pocket.', ['Ink Black', 'Navy']],
  ['Grenadine Silk Tie', 'Accessories', 'Tie', 78, 'Formal Room', 'Hand-rolled grenadine silk with real texture, ties a knot that holds its shape all day.', ['Navy', 'Ink Black', 'Olive']],
  ['Linen Pocket Square', 'Accessories', 'Pocket Square', 38, 'Formal Room', 'Stonewashed linen with a hand-rolled edge, folds into a puff or a straight line equally well.', ['Bone', 'Slate', 'Walnut']],
  ['Automatic Field Watch', 'Accessories', 'Watch', 650, 'Heritage', 'Sapphire crystal over a Swiss automatic movement, on a full-grain leather strap.', ['Walnut', 'Ink Black']],
  ['Wool Felt Fedora', 'Accessories', 'Hat', 135, 'Modern Line', 'Short-brim wool felt fedora blocked by hand, packs flat for travel and springs back into shape.', ['Charcoal', 'Walnut']],
  ['Cashmere Scarf', 'Accessories', 'Scarf', 145, 'Heritage', 'Two-ply cashmere in a wide weave, warm without the bulk under a coat collar.', ['Charcoal', 'Bone', 'Navy']],
  ['Deerskin Gloves', 'Accessories', 'Gloves', 120, 'Formal Room', 'Cashmere-lined deerskin gloves, thin enough to keep full feel on a steering wheel or a phone.', ['Walnut', 'Ink Black']],
]

const REVIEW_POOL = [
  ['J. Marlowe', 'Fits exactly as the size chart promised, and the material feels like it will genuinely outlast me.'],
  ['T. Okafor', 'Ordered this for a wedding and it drew more compliments than the ring did. Worth the price.'],
  ['R. Fennimore', 'Took a few wears to soften up but now it is the first thing I reach for on Monday mornings.'],
  ['D. Achebe', 'Shipping was quick and the packaging alone felt like unwrapping something from a proper tailor.'],
  ['S. Whitlock', 'Slightly more structured than I expected, in the best way. Holds its shape all day at the desk.'],
  ['M. Adeyemi', 'This replaced three other pieces in my rotation. Simple, well-made, does not try too hard.'],
]

function getSizes(category, sub) {
  if (category === 'Clothing') return ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  if (category === 'Shoes') return ['7', '8', '9', '10', '11', '12', '13']
  if (sub === 'Belt') return ['32', '34', '36', '38', '40']
  if (sub === 'Gloves') return ['S', 'M', 'L']
  return ['One Size']
}

function getMaterial(seed, category) {
  if (category === 'Clothing') return seededPick(seed, ['100% Wool Twill', 'Cotton Oxford', 'Merino Wool', 'Waxed Cotton', 'Cotton Piqué'])
  if (category === 'Shoes') return 'Full-Grain Leather, Leather Sole'
  return seededPick(seed, ['Full-Grain Leather', 'Silk', 'Cashmere', 'Linen', 'Stainless Steel'])
}

async function seed() {
  console.log('Clearing existing data...')
  await query('DELETE FROM reviews')
  await query('DELETE FROM cart_items')
  await query('DELETE FROM wishlist_items')
  await query('DELETE FROM users')
  await query('DELETE FROM products')
  await query("ALTER SEQUENCE products_id_seq RESTART WITH 1")
  await query("ALTER SEQUENCE users_id_seq RESTART WITH 1")

  console.log('Inserting products...')
  for (let i = 0; i < RAW.length; i++) {
    const r = RAW[i]
    const id = i + 1
    const seed = id * 7
    const colors = r[6]
    const sizes = getSizes(r[1], r[2])
    const rating = (3.8 + ((id * 13) % 13) / 10).toFixed(1)
    const reviewCount = 12 + (id * 37) % 320
    const stock = id % 7 === 0 ? 0 : id % 4 === 0 ? 3 : 20 + (id * 3) % 40
    const accent = COLOR_MAP[colors[0]] || 'ink'
    const accent2 = COLOR_MAP[colors[colors.length > 1 ? 1 : 0]] || 'charcoal'
    const sku = 'AF-' + String(id).padStart(4, '0')

    await query(
      `INSERT INTO products (id, name, category, sub, price, collection, descr, colors, sizes, rating, review_count, stock, accent, accent2, sku, material)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
      [id, r[0], r[1], r[2], r[3], r[4], r[5], colors, sizes, rating, reviewCount, stock, accent, accent2, sku, getMaterial(seed, r[1])]
    )

    for (let j = 0; j < 3; j++) {
      const rev = REVIEW_POOL[(id + j) % REVIEW_POOL.length]
      const revRating = Math.min(5, 4 + ((id + j) % 2))
      const days = 3 + ((id + j) * 11) % 80
      await query(
        `INSERT INTO reviews (product_id, name, text, rating, days_ago) VALUES ($1,$2,$3,$4,$5)`,
        [id, rev[0], rev[1], revRating, days]
      )
    }
  }

  const adminHash = createHash('sha256').update('admin123').digest('hex')
  await query(
    `INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) ON CONFLICT (email) DO NOTHING`,
    ['Admin', 'admin@afrimen.ng', adminHash, 'admin']
  )
  console.log('Seeded admin user (admin@afrimen.ng / admin123)')

  console.log(`Seeded ${RAW.length} products with reviews`)
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
