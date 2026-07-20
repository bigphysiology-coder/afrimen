import { useReducer, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'
import { SearchLargeIcon } from '../data/icons'

const PER_PAGE = 6

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.val, loading: false }
    case 'TOGGLE_CAT':
      return { ...state, cat: toggleArr(state.cat, action.val), page: 1 }
    case 'TOGGLE_COLLECTION':
      return { ...state, collection: toggleArr(state.collection, action.val), page: 1 }
    case 'TOGGLE_SIZE':
      return { ...state, size: toggleArr(state.size, action.val), page: 1 }
    case 'TOGGLE_COLOR':
      return { ...state, color: toggleArr(state.color, action.val), page: 1 }
    case 'SET_RATING':
      return { ...state, rating: action.val, page: 1 }
    case 'SET_MAX':
      return { ...state, max: action.val, page: 1 }
    case 'SET_SORT':
      return { ...state, sort: action.val, page: 1 }
    case 'SET_PAGE':
      return { ...state, page: action.val }
    case 'SET_Q':
      return { ...state, q: action.val, page: 1 }
    case 'CLEAR_ALL':
      return { ...initialShopState, products: state.products, loading: false }
    case 'SYNC_FROM_URL':
      return { ...state, cat: action.cat || [], q: action.q || '' }
    default:
      return state
  }
}

function toggleArr(arr, val) {
  const idx = arr.indexOf(val)
  if (idx > -1) return arr.filter(x => x !== val)
  return [...arr, val]
}

const initialShopState = { products: [], cat: [], collection: [], size: [], color: [], min: 0, max: 1000, rating: 0, sort: 'featured', page: 1, q: '', loading: true }

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const [state, dispatch] = useReducer(reducer, initialShopState)

  useEffect(() => {
    document.title = 'Shop All \u2014 Afrimen'
    const catParam = searchParams.get('cat')
    const qParam = searchParams.get('q')
    dispatch({ type: 'SYNC_FROM_URL', cat: catParam ? [catParam] : [], q: qParam || '' })
  }, [searchParams])

  useEffect(() => {
    getProducts({ sort: 'rating', dir: 'desc' }).then(all => {
      dispatch({ type: 'SET_PRODUCTS', val: all })
    }).catch(() => dispatch({ type: 'SET_PRODUCTS', val: [] }))
  }, [])

  const filtered = useMemo(() => {
    return state.products.filter(p => {
      if (state.cat.length && !state.cat.includes(p.category)) return false
      if (state.collection.length && !state.collection.includes(p.collection)) return false
      if (state.size.length && !p.sizes.some(sz => state.size.includes(sz))) return false
      if (state.color.length && !p.colors.some(c => state.color.includes(c))) return false
      if (p.price < state.min || p.price > state.max) return false
      if (state.rating && parseFloat(p.rating) < state.rating) return false
      if (state.q && !p.name.toLowerCase().includes(state.q.toLowerCase()) && !p.sub.toLowerCase().includes(state.q.toLowerCase())) return false
      return true
    }).sort((a, b) => {
      switch (state.sort) {
        case 'price-asc': return a.price - b.price
        case 'price-desc': return b.price - a.price
        case 'rating': return parseFloat(b.rating) - parseFloat(a.rating)
        case 'newest': return b.id - a.id
        default: return parseFloat(b.rating) * b.review_count - parseFloat(a.rating) * a.review_count
      }
    })
  }, [state])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const pageItems = filtered.slice((state.page - 1) * PER_PAGE, state.page * PER_PAGE)
  const crumbTrail = state.cat.length ? state.cat[0] : 'All Products'

  return (
    <>
      <section className="shop-header">
        <div className="wrap">
          <div className="crumbs" style={{ color: 'var(--muted-on-ink)' }}>
            <Link to="/">Home</Link><span className="sep">/</span><span>{crumbTrail}</span>
          </div>
          <h1 style={{ marginTop: '14px' }}>{state.q ? 'Results for \u201c' + state.q + '\u201d' : crumbTrail}</h1>
          <p>{state.loading ? 'Loading...' : filtered.length + ' pieces, cut from our current collection.'}</p>
        </div>
      </section>

      <div className="wrap">
        <div className="shop-layout">
          <aside className="filters" id="filtersPanel">
            <Filters state={state} dispatch={dispatch} />
          </aside>
          <div>
            <div className="shop-toolbar">
              <button className="btn btn-outline btn-sm mobile-filter-btn"
                onClick={() => document.getElementById('filtersPanel')?.classList.toggle('open')}>
                Filters
              </button>
              <span className="result-count">{filtered.length} results</span>
              <select className="sort-select" value={state.sort}
                onChange={e => dispatch({ type: 'SET_SORT', val: e.target.value })}>
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            {state.loading ? (
              <div className="empty-state">
                <p>Loading products...</p>
              </div>
            ) : pageItems.length ? (
              <>
                <div className="grid-products">
                  {pageItems.map(p => <ProductCard key={p.id} p={p} />)}
                </div>
                <Pagination totalPages={totalPages} currentPage={state.page}
                  onPageChange={p => { dispatch({ type: 'SET_PAGE', val: p }); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
              </>
            ) : (
              <div className="empty-state">
                <SearchLargeIcon />
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '17px', marginBottom: '8px' }}>No pieces match those filters</h3>
                <p>Try widening your price range or clearing a filter.</p>
                <button className="btn btn-outline btn-sm" style={{ marginTop: '18px' }}
                  onClick={() => dispatch({ type: 'CLEAR_ALL' })}>Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
