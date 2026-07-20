const IMAGE_MAP = {
  Shirt: '1507680434567-5739c80be1ac',
  Sweater: '1569519259833-619e1c168fdf',
  Jacket: '1575862469245-c43f1b89bee1',
  Blazer: '1610189585935-f3d92154b752',
  Suit: '1521485714898-f097eb6fc5b9',
  Polo: '1720514496503-c399e2af61d2',
  'T-Shirt': '1572021335469-31706a17aaef',
  Oxford: '1479769430132-97690a715213',
  Boot: '1608256246200-53e635b5b65f',
  Sneaker: '1595950653106-6c9ebd614d3a',
  Loafer: '1576792741377-eb0f4f6d1a47',
  Derby: '1563434194539-fcc823f9bf92',
  Belt: '1625789250576-9efae40f4689',
  Wallet: '1627123424574-724758594e93',
  Tie: '1637264896197-868428967e60',
  'Pocket Square': '1685306717197-728608ad91d5',
  Watch: '1524592094714-0f0654e20314',
  Hat: '1623799312713-986b8f42c3ce',
  Scarf: '1678649878724-7804e7d37ea8',
  Gloves: '1622411517560-6ed01ebc5ca0',
}

export function getProductImageUrl(sub) {
  const id = IMAGE_MAP[sub]
  if (!id) return 'https://images.unsplash.com/photo-1610189585935-f3d92154b752?w=400&h=500&fit=crop&auto=format'
  return `https://images.unsplash.com/photo-${id}?w=400&h=500&fit=crop&auto=format`
}

export function getProductImageUrlLarge(sub) {
  const id = IMAGE_MAP[sub]
  if (!id) return 'https://images.unsplash.com/photo-1610189585935-f3d92154b752?w=800&h=1000&fit=crop&auto=format'
  return `https://images.unsplash.com/photo-${id}?w=800&h=1000&fit=crop&auto=format`
}
