export default function SizeChartModal({ category, onClose }) {
  let rows, title
  if (category === 'Shoes') {
    title = 'Shoe Size Guide'
    rows = [
      ['UK', '7', '8', '9', '10', '11', '12', '13'],
      ['US', '8', '9', '10', '11', '12', '13', '14'],
      ['EU', '41', '42', '43', '44', '45', '46', '47'],
    ]
  } else {
    title = 'Clothing Size Guide (in)'
    rows = [
      ['Size', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
      ['Chest', '34-36', '36-38', '38-40', '40-42', '42-44', '44-46'],
      ['Waist', '28-30', '30-32', '32-34', '34-36', '36-38', '38-40'],
    ]
  }

  return (
    <>
      <div className="overlay open" onClick={onClose}></div>
      <div className="modal size-modal open" role="dialog" aria-modal="true" aria-label="Size chart">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
        <div style={{ padding: '8px' }}>
          <h3 style={{ fontSize: '20px' }}>{title}</h3>
          <table className="size-chart-table">
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => ri === 0 ? <th key={ci}>{c}</th> : <td key={ci}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: '12px', color: 'var(--muted-on-bone)', marginTop: '16px' }}>
            Between sizes? We recommend sizing up for a relaxed fit.
          </p>
        </div>
      </div>
    </>
  )
}
