import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props); //Reference to the parents constructor() function
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center mt-16">
          <h1 className="text-red-500">Something went wrong.</h1>
          <p className="text-stone-600">{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
