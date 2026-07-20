const IMAGE_MAP = {
  Shirt: '1596755094514-f87e34085b2c',
  Sweater: '1620799140408-edc6dcb6d633',
  Jacket: '1551028719-00167b16eac5',
  Blazer: '1593030761757-71fae45fa0e7',
  Suit: '1594938298603-c8148c4dae35',
  Polo: '1576566588028-4147f3842f27',
  'T-Shirt': '1521572163474-6864f9cf17ab',
  Oxford: '1614252235316-8c85727138e8',
  Boot: '1608256246200-53e635b5b65f',
  Sneaker: '1595950653106-6c9ebd614d3a',
  Loafer: '1614253429340-98120f6c98b8',
  Derby: '1614252235316-8c85727138e8',
  Belt: '1553062407-98eeb64c6a62',
  Wallet: '1627123424574-724758594e93',
  Tie: '1599894010343-398af12b0c2c',
  'Pocket Square': '1602327366400-75adf9c2d7cd',
  Watch: '1524592094714-0f0654e20314',
  Hat: '1514326005837-fb4791d25e03',
  Scarf: '1520903920243-00d872a2d1c6',
  Gloves: '1512428196467-7a0cd2e1e4f3',
}

export function getProductImageUrl(sub) {
  const id = IMAGE_MAP[sub]
  if (!id) return 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=500&fit=crop&auto=format'
  return `https://images.unsplash.com/photo-${id}?w=400&h=500&fit=crop&auto=format`
}

export function getProductImageUrlLarge(sub) {
  const id = IMAGE_MAP[sub]
  if (!id) return 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=1000&fit=crop&auto=format'
  return `https://images.unsplash.com/photo-${id}?w=800&h=1000&fit=crop&auto=format`
}
