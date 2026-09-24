import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const msg = error?.message || String(error);
    // Ignore benign ResizeObserver notification warnings in browser
    if (
      msg.includes('ResizeObserver loop') ||
      msg.includes('ResizeObserver loop completed') ||
      msg.includes('ResizeObserver loop limit exceeded')
    ) {
      return { hasError: false, error: null };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const msg = error?.message || String(error);
    if (
      msg.includes('ResizeObserver loop') ||
      msg.includes('ResizeObserver loop completed') ||
      msg.includes('ResizeObserver loop limit exceeded')
    ) {
      return;
    }
    console.error('App ErrorBoundary caught an unhandled exception:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      const errorMsg = this.state.error.message || 'An unexpected rendering error occurred.';

      return (
        <div
          role="alert"
          style={{
            minHeight: '320px',
            padding: '2.5rem 1.5rem',
            margin: '1.5rem auto',
            maxWidth: '680px',
            background: '#ffffff',
            borderRadius: '18px',
            border: '2px solid #fed7aa',
            boxShadow: '0 10px 25px -5px rgba(234, 88, 12, 0.1)',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🪷</div>
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#9a3412',
              margin: '0 0 0.5rem 0',
            }}
          >
            {this.props.fallbackTitle || 'पुनः प्रयत्नं क्रियताम् · Please Try Again'}
          </h2>
          <p
            style={{
              color: '#475569',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto 1.25rem',
            }}
          >
            {this.props.fallbackSubtitle ||
              'A temporary display error occurred in this interactive section. Your progress and study records are completely safe.'}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '1rem',
            }}
          >
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '0.65rem 1.4rem',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)',
              }}
            >
              🔄 Refresh Section (पुनरुज्जीवनम्)
            </button>
            <button
              type="button"
              onClick={this.handleReload}
              style={{
                background: '#f8fafc',
                color: '#334155',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                padding: '0.65rem 1.4rem',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
              }}
            >
              🏠 Reload Page
            </button>
          </div>

          <details
            style={{
              marginTop: '1.25rem',
              textAlign: 'left',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '0.6rem 0.9rem',
              fontSize: '0.8rem',
              color: '#991b1b',
            }}
          >
            <summary style={{ cursor: 'pointer', fontWeight: 700 }}>
              Technical Details (त्रुटि-विवरणम्)
            </summary>
            <pre
              style={{
                marginTop: '0.5rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'monospace',
                fontSize: '0.76rem',
                color: '#7f1d1d',
              }}
            >
              {errorMsg}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
