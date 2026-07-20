import { CheckIcon } from '../data/icons'

export default function Toast({ toasts }) {
  if (!toasts.length) return null
  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map(t => (
        <div className="toast show" key={t.id}>
          <CheckIcon />
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
