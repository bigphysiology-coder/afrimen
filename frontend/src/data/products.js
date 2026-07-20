import { COLORS, COLOR_LIST, seededPick } from './colors'

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

export const products = RAW.map((r, i) => {
  const id = i + 1
  const seed = id * 7
  const colorNames = r[6]
  let sizes = []
  if (r[1] === 'Clothing') sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  else if (r[1] === 'Shoes') sizes = ['7', '8', '9', '10', '11', '12', '13']
  else if (r[2] === 'Belt') sizes = ['32', '34', '36', '38', '40']
  else if (r[2] === 'Gloves') sizes = ['S', 'M', 'L']
  else sizes = ['One Size']

  const outOfIdx = id % 5 === 0 ? id % sizes.length : -1
  const rating = (3.8 + ((id * 13) % 13) / 10).toFixed(1)
  const reviewCount = 12 + (id * 37) % 320
  const stock = id % 7 === 0 ? 0 : id % 4 === 0 ? 3 : 20 + (id * 3) % 40

  return {
    id,
    name: r[0],
    category: r[1],
    sub: r[2],
    price: r[3],
    collection: r[4],
    desc: r[5],
    colors: colorNames,
    sizes,
    outOfIdx,
    rating: parseFloat(rating),
    reviewCount,
    stock,
    accent: COLORS[seededPick(seed, COLOR_LIST)],
    accent2: COLORS[seededPick(seed + 3, COLOR_LIST)],
    sku: 'AF-' + String(id).padStart(4, '0'),
    material: r[1] === 'Clothing'
      ? seededPick(seed, ['100% Wool Twill', 'Cotton Oxford', 'Merino Wool', 'Waxed Cotton', 'Cotton Piqué'])
      : r[1] === 'Shoes'
        ? 'Full-Grain Leather, Leather Sole'
        : seededPick(seed, ['Full-Grain Leather', 'Silk', 'Cashmere', 'Linen', 'Stainless Steel']),
  }
})

export function findProduct(id) {
  return products.find(p => p.id === parseInt(id, 10))
}
