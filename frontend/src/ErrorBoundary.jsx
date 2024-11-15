import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
          <h2 className="mb-4 text-2xl font-semibold text-red-600">
            Aduh! Ada yang salah.
          </h2>
          <p className="mb-4 max-w-4xl text-center text-gray-700">
            Maaf, ada masalah yang tidak terduga. Untuk bantuan lebih lanjut,
            silakan hubungi admin kami melalui Instagram di{" "}
            <a
              href="https://www.instagram.com/batamcampusexpo"
              target="_blank"
              className="font-semibold text-blue-500 hover:underline"
            >
              batamcampusexpo
            </a>
            .
          </p>
          <p className="mb-6 text-sm text-gray-500">
            &copy; 2025 Tim IT Batam Campus Expo. Semua hak cipta dilindungi.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Muat Ulang
          </button>

          {this.state.error && (
            <div className="mt-6 w-full max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4 text-left">
              <h4 className="text-xl font-medium text-red-700">
                Error Details:
              </h4>
              <p className="mt-2 text-red-800">
                <strong>{this.state.error.toString()}</strong>
              </p>
              <pre className="mt-2 overflow-x-scroll text-sm text-gray-700">
                {this.state.errorInfo.componentStack}
              </pre>
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
