/**
 * ErrorBoundary Component
 * Catches JavaScript errors in command palette components
 */

import React, { Component, ErrorInfo, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  className?: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Command Palette Error Boundary caught an error:",
        error,
        errorInfo
      );
    }

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            "p-8 text-center",
            "bg-cp-surface/95",
            "border border-cp-border/50",
            "rounded-xl",
            "shadow-lg",
            this.props.className
          )}
        >
          <div className="text-4xl mb-4">⚠️</div>

          <h2 className="text-lg font-semibold text-cp-text-primary mb-2">
            Something went wrong
          </h2>

          <p className="text-sm text-cp-text-secondary mb-4 max-w-md">
            The command palette encountered an unexpected error. Please try
            refreshing the page or contact support if the problem persists.
          </p>

          <div className="flex gap-3">
            <button
              onClick={this.handleRetry}
              className={cn(
                "px-4 py-2",
                "bg-cp-accent hover:bg-cp-accent/80",
                "text-white",
                "rounded-lg",
                "text-sm font-medium",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-cp-focus/50"
              )}
            >
              Try Again
            </button>

            <button
              onClick={() => window.location.reload()}
              className={cn(
                "px-4 py-2",
                "bg-cp-hover hover:bg-cp-border",
                "text-cp-text-primary",
                "border border-cp-border",
                "rounded-lg",
                "text-sm font-medium",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-cp-focus/50"
              )}
            >
              Refresh Page
            </button>
          </div>

          {/* Error details in development */}
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-6 w-full max-w-2xl">
              <summary className="text-xs text-cp-text-secondary cursor-pointer hover:text-cp-text-primary">
                Error Details (Development Only)
              </summary>
              <div className="mt-2 p-3 bg-cp-background rounded text-xs text-left">
                <div className="text-red-400 font-mono mb-2">
                  {this.state.error.name}: {this.state.error.message}
                </div>
                <pre className="text-cp-text-secondary whitespace-pre-wrap text-xs overflow-auto">
                  {this.state.error.stack}
                </pre>
                {this.state.errorInfo && (
                  <pre className="text-cp-text-secondary whitespace-pre-wrap text-xs overflow-auto mt-2">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
