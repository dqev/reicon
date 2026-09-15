import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {

      return (
        this.props.fallback || (
          <div className="min-h-[50vh] flex items-center justify-center p-6 text-center">
            <div className="max-w-md w-full">
              <h2 className="text-lg font-serif font-semibold text-text-base mb-2">Unable to load section</h2>
              <p className="text-sm text-text-base/50 mb-4">{this.state.error?.message || 'A temporary error occurred.'}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg bg-[#9B8AFB] text-white text-xs font-medium hover:bg-[#8B7AFB] transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
