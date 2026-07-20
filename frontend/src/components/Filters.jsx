import { COLOR_HEX } from '../data/colors'
import { stars } from '../data/reviews'

export default function Filters({ state, dispatch }) {
  const cats = ['Clothing', 'Shoes', 'Accessories']
  const collections = ['Heritage', 'Modern Line', 'Formal Room']
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const allProducts = state.products || []

  const toggleCat = (val) => dispatch({ type: 'TOGGLE_CAT', val })
  const toggleCollection = (val) => dispatch({ type: 'TOGGLE_COLLECTION', val })
  const toggleSize = (val) => dispatch({ type: 'TOGGLE_SIZE', val })
  const toggleColor = (val) => dispatch({ type: 'TOGGLE_COLOR', val })
  const setRating = (val) => dispatch({ type: 'SET_RATING', val })
  const setMax = (val) => dispatch({ type: 'SET_MAX', val })
  const clearAll = () => dispatch({ type: 'CLEAR_ALL' })

  return (
    <>
      <details className="filter-group" open>
        <summary>Category</summary>
        <div className="filter-body">
          {cats.map(c => {
            const count = allProducts.filter(p => p.category === c).length
            return (
              <label className="check-row" key={c}>
                <span>
                  <input type="checkbox" checked={state.cat.includes(c)} onChange={() => toggleCat(c)} />
                  {' '}{c}
                </span>
                <span className="count">{count}</span>
              </label>
            )
          })}
        </div>
      </details>
      <details className="filter-group" open>
        <summary>Price</summary>
        <div className="filter-body">
          <div className="range-row">
            <input type="range" id="priceRange" min="0" max="1000" step="10" value={state.max} onChange={e => setMax(parseInt(e.target.value, 10))} />
            <div className="range-vals">
              <span>$0</span>
              <span>${state.max}</span>
            </div>
          </div>
        </div>
      </details>
      <details className="filter-group">
        <summary>Size</summary>
        <div className="filter-body">
          <div className="chip-row">
            {allSizes.map(sz => (
              <button key={sz} className={'chip' + (state.size.includes(sz) ? ' active' : '')} onClick={() => toggleSize(sz)}>{sz}</button>
            ))}
          </div>
        </div>
      </details>
      <details className="filter-group">
        <summary>Color</summary>
        <div className="filter-body">
          <div className="swatch-row">
            {Object.keys(COLOR_HEX).map(c => (
              <span key={c} className={'swatch' + (state.color.includes(c) ? ' active' : '')}
                style={{ background: COLOR_HEX[c] }} title={c} onClick={() => toggleColor(c)}></span>
            ))}
          </div>
        </div>
      </details>
      <details className="filter-group">
        <summary>Collection</summary>
        <div className="filter-body">
          {collections.map(c => (
            <label className="check-row" key={c}>
              <span>
                <input type="checkbox" checked={state.collection.includes(c)} onChange={() => toggleCollection(c)} />
                {' '}{c}
              </span>
            </label>
          ))}
        </div>
      </details>
      <details className="filter-group">
        <summary>Rating</summary>
        <div className="filter-body">
          {[4.5, 4, 3.5].map(r => (
            <label className="check-row" key={r}>
              <span>
                <input type="radio" name="ratingf" checked={state.rating === r} onChange={() => setRating(r)} />
                {' '}{stars(r)} &amp; up
              </span>
            </label>
          ))}
        </div>
      </details>
      <button className="clear-filters" onClick={clearAll}>Clear all filters</button>
    </>
  )
}
