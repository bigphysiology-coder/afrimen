import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="wrap pad" style={{ textAlign: 'center', paddingTop: '80px' }}>
          <h2>Something went wrong</h2>
          <p style={{ color: 'var(--muted-on-bone)', margin: '12px 0 24px' }}>
            {this.state.error.message}
          </p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
