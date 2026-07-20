export const REVIEW_POOL = [
  ['J. Marlowe', 'Fits exactly as the size chart promised, and the material feels like it will genuinely outlast me.'],
  ['T. Okafor', 'Ordered this for a wedding and it drew more compliments than the ring did. Worth the price.'],
  ['R. Fennimore', 'Took a few wears to soften up but now it is the first thing I reach for on Monday mornings.'],
  ['D. Achebe', 'Shipping was quick and the packaging alone felt like unwrapping something from a proper tailor.'],
  ['S. Whitlock', 'Slightly more structured than I expected, in the best way. Holds its shape all day at the desk.'],
  ['M. Adeyemi', 'This replaced three other pieces in my rotation. Simple, well-made, does not try too hard.'],
]

export function stars(rating) {
  const full = Math.round(rating)
  let s = ''
  for (let i = 0; i < 5; i++) s += i < full ? '\u2605' : '\u2606'
  return s
}

export function renderReviewsForProduct(p) {
  const breakdown = [[5, 62], [4, 24], [3, 9], [2, 3], [1, 2]]
  const revs = [0, 1, 2].map(i => {
    const r = REVIEW_POOL[(p.id + i) % REVIEW_POOL.length]
    const rating = Math.min(5, 4 + ((p.id + i) % 2))
    return { name: r[0], text: r[1], rating, days: 3 + ((p.id + i) * 11) % 80 }
  })
  return { breakdown, revs }
}

export const TESTIMONIALS = [
  ["The half-canvas suit held its shape through a 14-hour flight and a same-day meeting. Worth every naira.", "J. Marlowe", "Barrister, Lagos", 5],
  ["I've re-soled the same pair of oxfords twice now instead of buying new. That's the whole pitch, honestly.", "D. Achebe", "Architect, Lagos", 5],
  ["Sizing guide was dead accurate — first online menswear order I didn't have to return.", "T. Okafor", "Product Manager, Amsterdam", 4],
]
