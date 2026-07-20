export default function TapeDivider({ onInk }) {
  const positions = [2, 12, 22, 32, 42, 52, 62, 72, 82, 92]
  return (
    <div className={'tape' + (onInk ? ' on-ink' : '')}>
      <div className="nums">
        {positions.map(p => (
          <span key={p} style={{ left: p + '%' }}>{p}</span>
        ))}
      </div>
    </div>
  )
}
