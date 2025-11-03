const ResultDisplay = ({ result }) => {
  // Parse the result to extract sentiment and format better
  const formatResult = (text) => {
    // Split by lines and format
    const lines = text.split("\n");
    return lines.map((line, index) => {
      // Bold headers (lines with **)
      if (line.includes("**")) {
        const cleanLine = line.replace(/\*\*/g, "");
        return (
          <h4
            key={index}
            className="font-bold text-gray-800 mt-4 mb-2 text-base"
          >
            {cleanLine}
          </h4>
        );
      }

      // Bullet points (lines starting with *)
      if (line.trim().startsWith("*")) {
        const cleanLine = line.replace(/^\s*\*+\s*/, "");
        if (cleanLine) {
          return (
            <li key={index} className="ml-6 text-gray-700 mb-1">
              {cleanLine}
            </li>
          );
        }
      }

      // Regular paragraphs
      if (line.trim()) {
        return (
          <p key={index} className="text-gray-700 mb-2 leading-relaxed">
            {line}
          </p>
        );
      }

      return null;
    });
  };

  return (
    <div className="mt-8 fade-in">
      <div className="border-t-2 border-gray-200 pt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg
            className="w-6 h-6 mr-2 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Analysis Result
        </h3>

        <div className="bg-linear-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200 shadow-sm">
          <div className="prose prose-sm max-w-none">
            {formatResult(result)}
          </div>
        </div>

        {/* Copy to Clipboard Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              navigator.clipboard.writeText(result);
              alert("Analysis copied to clipboard!");
            }}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center space-x-1 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Copy Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
