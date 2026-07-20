export function SvgWrap({ children, color }) {
  return (
    <svg viewBox="0 0 120 140" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

export function torsoIcon(sub, color) {
  let collar = 'M46 20 L60 32 L74 20'
  const body = 'M30 34 L20 52 L30 62 L30 122 L90 122 L90 62 L100 52 L90 34'
  let neckline = 'M46 20 Q60 12 74 20'
  let extra = ''

  if (sub === 'Polo') extra = 'M50 20 L50 34 M70 20 L70 34 M53 26 L67 26'
  if (sub === 'T-Shirt') { collar = 'M48 22 Q60 30 72 22' }
  if (sub === 'Sweater') { neckline = 'M44 22 Q60 34 76 22'; extra = 'M30 62 L90 62' }
  if (sub === 'Jacket' || sub === 'Blazer') extra = 'M60 34 L60 118 M40 70 L46 70 M40 84 L46 84'
  if (sub === 'Suit') extra = 'M60 34 L60 118 M40 70 L46 70 M40 84 L46 84 M74 34 L84 30'

  return (
    <SvgWrap color={color}>
      <path d={body} />
      <path d={collar} />
      <path d={neckline} />
      {extra && <path d={extra} />}
    </SvgWrap>
  )
}

export function shoeIcon(sub, color) {
  let base = 'M14 96 Q14 80 34 74 L70 66 Q84 62 94 70 L104 82 Q108 90 100 96 L100 104 L14 104 Z'
  let lace = ''
  if (sub === 'Oxford' || sub === 'Derby') lace = 'M40 78 L52 84 M50 74 L62 80 M60 70 L72 76'
  if (sub === 'Boot') {
    base = 'M22 60 L22 96 Q22 80 42 74 L76 66 Q90 62 100 70 L108 82 Q112 90 104 96 L104 104 L22 104 Z'
    lace = 'M30 66 L40 70 M30 76 L42 80 M30 86 L44 90'
  }
  if (sub === 'Sneaker') lace = 'M42 76 L52 80 M50 72 L60 76 M58 68 L68 72'
  if (sub === 'Loafer') lace = 'M52 78 Q60 74 68 78 M56 82 L64 82'

  return (
    <SvgWrap color={color}>
      <path d={base} />
      {lace && <path d={lace} />}
    </SvgWrap>
  )
}

export function accessoryIcon(sub, color) {
  let d = ''
  switch (sub) {
    case 'Belt':
      d = 'M14 60 L106 60 L106 80 L14 80 Z M40 60 L40 80 M50 60 L50 80 M60 62 Q66 70 60 78 M60 62 L74 62 L74 78 L60 78'
      break
    case 'Wallet':
      d = 'M20 46 L100 46 L100 96 L20 96 Z M20 60 L100 60 M60 60 L60 96 M78 74 Q86 74 86 82 Q86 90 78 90'
      break
    case 'Tie':
      d = 'M50 20 L70 20 L64 40 L74 60 L60 116 L46 60 L56 40 Z'
      break
    case 'Pocket Square':
      d = 'M20 24 L100 24 L88 100 L60 116 L32 100 Z M20 24 L60 60 L100 24 M32 100 L60 60 L88 100'
      break
    case 'Watch':
      d = 'M60 44 a20 20 0 1 0 0.1 0 M60 30 L60 40 M60 90 L60 100 M42 8 L78 8 L74 30 L46 30 Z M42 132 L78 132 L74 110 L46 110 Z M60 56 L60 64 L68 68'
      break
    case 'Hat':
      d = 'M28 84 Q60 62 92 84 L100 90 Q60 100 20 90 Z M40 84 Q60 50 80 84'
      break
    case 'Scarf':
      d = 'M18 40 Q60 20 102 40 Q80 46 60 40 Q40 46 18 40 M60 40 L52 118 Q60 126 68 118 Z'
      break
    case 'Gloves':
      d = 'M40 60 L38 24 Q38 16 46 16 Q54 16 54 26 L54 54 M54 54 L54 22 Q54 14 62 14 Q70 14 70 24 L70 54 M70 54 L70 26 Q70 18 78 18 Q86 18 86 28 L86 60 M40 60 L34 44 Q30 36 38 32 Q46 30 48 40 L52 60 M40 60 Q34 100 40 122 L86 122 Q92 100 86 60'
      break
    default:
      d = 'M30 30 L90 30 L90 110 L30 110 Z'
  }
  return (
    <SvgWrap color={color}>
      <path d={d} />
    </SvgWrap>
  )
}

export function productArt(p) {
  const url = `https://images.unsplash.com/photo-${getPhotoId(p.sub)}?w=400&h=500&fit=crop&auto=format`
  return <img src={url} alt={p.name || p.sub} className="product-img" loading="lazy" />
}

function getPhotoId(sub) {
  const map = {
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
  return map[sub] || '1610189585935-f3d92154b752'
}

export function StarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s-7.5-4.6-10-9.2C0.3 8.1 2 4.5 5.6 4c2-.3 3.7.6 4.7 2.1C11.3 4.6 13 3.7 15 4c3.6.5 5.3 4.1 3.6 7.8C16.1 16.4 12 21 12 21z" />
    </svg>
  )
}

export function StarHeart() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s-7.5-4.6-10-9.2C0.3 8.1 2 4.5 5.6 4c2-.3 3.7.6 4.7 2.1C11.3 4.6 13 3.7 15 4c3.6.5 5.3 4.1 3.6 7.8C16.1 16.4 12 21 12 21z" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.6" y2="16.6" />
    </svg>
  )
}

export function HeartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s-7.5-4.6-10-9.2C0.3 8.1 2 4.5 5.6 4c2-.3 3.7.6 4.7 2.1C11.3 4.6 13 3.7 15 4c3.6.5 5.3 4.1 3.6 7.8C16.1 16.4 12 21 12 21z" />
    </svg>
  )
}

export function CartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 6h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" />
      <circle cx="10" cy="22" r="1" />
      <circle cx="17" cy="22" r="1" />
    </svg>
  )
}

export function UserIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  )
}

export function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 6h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" />
      <circle cx="10" cy="22" r="1" />
      <circle cx="17" cy="22" r="1" />
    </svg>
  )
}

export function NeedleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 20 L16 8" />
      <circle cx="18" cy="6" r="2.4" />
      <path d="M18 6l2 2" />
      <path d="M6 18 L4 20" />
    </svg>
  )
}

export function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 19c8-1 13-6 14-14C11 6 6 11 5 19z" />
      <path d="M5 19c3-4 6-7 10-9" />
    </svg>
  )
}

export function ToolIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 7a4 4 0 01-5.3 5.3L4 18l2 2 5.7-4.7A4 4 0 0117 10" />
    </svg>
  )
}

export function ReturnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12a8 8 0 1 1 3 6.2" />
      <path d="M4 20v-5h5" />
    </svg>
  )
}

export function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  )
}

export function PinterestIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 17c1-3 1.6-6.4 1.6-8.2a2.4 2.4 0 0 1 4.7.6c0 1.6-1 4-2.6 4-1 0-1.5-.6-1.5-1.5" />
    </svg>
  )
}

export function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <line x1="4" y1="4" x2="20" y2="20" />
      <line x1="20" y1="4" x2="4" y2="20" />
    </svg>
  )
}

export function SearchLargeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.6" y2="16.6" />
    </svg>
  )
}
