import React from 'react';

/**
 * Last line of defense: if anything throws during a page's render,
 * show a branded black/red/gold panel instead of an empty black screen.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, token: 0 };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[Cleats] page render error:', error, info);
  }

  handleReset = () => {
    // bump the token so the child tree fully re-mounts
    this.setState({ error: null, token: this.state.token + 1 });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="error-panel" role="alert">
          <img src="/assets/logo.svg" alt="" className="error-mark" />
          <p className="mono error-kicker">System fault / {window.location.pathname}</p>
          <h1>This view hit an unexpected error.</h1>
          <p>The rest of the site is unaffected. Try reloading this page.</p>
          <button type="button" className="btn btn-primary" onClick={this.handleReset}>
            Retry <b>↻</b>
          </button>
        </div>
      );
    }

    return (
      <ErrorBoundaryChildren key={this.state.token}>{this.props.children}</ErrorBoundaryChildren>
    );
  }
}

/** Pass-through wrapper so the token key re-mounts the subtree on retry. */
function ErrorBoundaryChildren({ children }) {
  return children;
}
