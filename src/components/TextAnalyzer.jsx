import { useState } from "react";
import ResultDisplay from "./ResultDisplay";
import ErrorMessage from "./ErrorMessage";

const TextAnalyzer = () => {
  const [textInput, setTextInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

  const handleClear = () => {
    setTextInput("");
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    const text = textInput.trim();

    // Validation
    if (!text) {
      setError("Please enter some text to analyze.");
      return;
    }

    if (text.length < 10) {
      setError("Please enter at least 10 characters for meaningful analysis.");
      return;
    }

    // Reset states
    setResult(null);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text_to_analyze: text,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.final_result) {
        setResult(data.final_result);
      } else {
        throw new Error("Invalid response format from server.");
      }
    } catch (err) {
      console.error("Analysis Error:", err);
      setError(
        `Failed to analyze text. ${
          err.message || "Please try again later."
        }\n\n` +
          "Possible issues:\n" +
          "• Network connection problem\n" +
          "• n8n workflow is inactive\n" +
          "• API rate limit reached"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleAnalyze();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* Text Input Section */}
      <div className="mb-6">
        <label
          htmlFor="textInput"
          className="block text-gray-700 font-semibold mb-3 text-lg"
        >
          📝 Enter Text to Analyze
        </label>
        <textarea
          id="textInput"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows="8"
          placeholder="Type or paste your text here... For example: 'I absolutely love this product! It exceeded all my expectations.'"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none text-gray-700"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500">
            {textInput.length} character{textInput.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-200"
          >
            Clear text
          </button>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className={`w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center space-x-2 ${
          isLoading ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <>
            <div className="loading-spinner"></div>
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>Analyze Text</span>
          </>
        )}
      </button>

      {/* Result Display */}
      {result && <ResultDisplay result={result} />}

      {/* Error Message */}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default TextAnalyzer;
