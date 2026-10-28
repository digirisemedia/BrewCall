import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-red-400 mb-4">Oops! Something went wrong</h1>
              <p className="text-gray-300 mb-6">
                The app encountered an error. Please check the console for details.
              </p>
              
              {this.state.error && (
                <div className="bg-black/50 rounded-xl p-4 mb-4">
                  <h2 className="text-lg font-semibold text-red-300 mb-2">Error Message:</h2>
                  <pre className="text-sm text-gray-300 overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </div>
              )}
              
              {this.state.errorInfo && (
                <div className="bg-black/50 rounded-xl p-4 mb-4">
                  <h2 className="text-lg font-semibold text-red-300 mb-2">Component Stack:</h2>
                  <pre className="text-xs text-gray-400 overflow-auto max-h-64">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
              
              <div className="flex gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-xl font-semibold transition-colors"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-colors"
                >
                  Clear Data & Reload
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
