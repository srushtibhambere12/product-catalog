import { Component } from 'react';
import './Status.css';

// Catches errors in any child component so the whole page doesn't go blank
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="status-box error" style={{ margin: '50px auto', maxWidth: 500 }}>
          <h3>Something went wrong</h3>
          <p>Please refresh the page and try again.</p>
          <button className="status-btn" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
