import TextAnalyzer from "./components/TextAnalyzer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-linear-to-r from-purple-600 to-indigo-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            🤖 AI Text Analyzer
          </h1>
          <p className="text-center mt-2 text-gray-100">
            Powered by Gemini AI & n8n Automation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Info Card */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
          <div className="flex items-start">
            <div className="shrink-0">
              <svg
                className="h-5 w-5 text-blue-500 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                How it works
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                Enter any text below and our AI will analyze the sentiment
                (Positive, Negative, or Neutral) and provide a detailed summary.
              </p>
            </div>
          </div>
        </div>

        {/* Analyzer Component */}
        <TextAnalyzer />

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-800 mb-2">Fast Analysis</h3>
            <p className="text-gray-600 text-sm">
              Get instant AI-powered sentiment analysis in seconds
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-800 mb-2">Accurate Results</h3>
            <p className="text-gray-600 text-sm">
              Powered by Google's Gemini AI for precise insights
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">🔄</div>
            <h3 className="font-bold text-gray-800 mb-2">Automated Workflow</h3>
            <p className="text-gray-600 text-sm">
              Built with n8n automation for seamless processing
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Built with ❤️ using n8n, Gemini AI, React, and Tailwind CSS
          </p>
          <p className="text-xs mt-2 text-gray-400">
            FDE Assessment Submission - 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
