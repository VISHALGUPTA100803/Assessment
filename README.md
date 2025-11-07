# 🤖 AI Text Analyzer

> An intelligent text analysis application powered by Google's Gemini AI and automated with n8n workflows


## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [n8n Workflow](#n8n-workflow)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

AI Text Analyzer is a modern web application that leverages the power of artificial intelligence to perform sentiment analysis and generate detailed summaries of any text input. Built with React and styled with Tailwind CSS, it integrates seamlessly with n8n automation workflows and Google's Gemini AI API to provide fast, accurate, and insightful text analysis.

### Key Highlights

- ⚡ **Real-time Analysis**: Get instant AI-powered sentiment analysis in seconds
- 🎯 **Accurate Results**: Powered by Google's advanced Gemini 2.0 Flash model
- 🔄 **Automated Workflow**: Built with n8n for seamless request processing
- 💅 **Modern UI**: Beautiful, responsive interface with smooth animations
- 📊 **Detailed Insights**: Comprehensive sentiment analysis with explanations

## ✨ Features

### Core Functionality

1. **Sentiment Analysis**
   - Detects emotional tone (Positive, Negative, or Neutral)
   - Provides confidence levels for sentiment classification
   - Identifies nuanced emotions in complex texts

2. **Text Summarization**
   - Generates concise summaries of analyzed text
   - Highlights key points and main themes
   - Extracts actionable insights from content

3. **Smart Input Handling**
   - Real-time character counter
   - Minimum length validation (10 characters)
   - Quick clear functionality
   - Keyboard shortcuts (Ctrl/Cmd + Enter to analyze)

4. **Results Management**
   - Formatted display with proper headings and bullet points
   - Copy to clipboard functionality
   - Error handling with detailed troubleshooting messages
   - Loading states with animated spinner

### User Experience

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Fade-in effects and hover states for better interaction
- **Clear Feedback**: Loading states, success messages, and error notifications
- **Accessibility**: Semantic HTML and proper ARIA labels

## 🛠️ Tech Stack

### Frontend

- **React 19.2.0**: Modern React with latest features and hooks
- **Vite 7.1.7**: Lightning-fast build tool and dev server
- **Tailwind CSS 4.1.16**: Utility-first CSS framework for rapid UI development
- **ESLint**: Code quality and consistency enforcement

### Backend / Automation

- **n8n**: Workflow automation platform
  - Webhook node for receiving requests
  - HTTP Request node for API communication
  - Data transformation nodes
  - Response formatting

### AI / API

- **Google Gemini AI (gemini-2.0-flash-exp)**
  - Advanced natural language processing
  - Sentiment analysis capabilities
  - Text understanding and summarization

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│             │         │              │         │             │
│   React     │  HTTP   │     n8n      │  HTTP   │  Gemini AI  │
│  Frontend   ├────────►│   Workflow   ├────────►│     API     │
│             │ Request │              │ Request │             │
│             │◄────────┤              │◄────────┤             │
└─────────────┘Response └──────────────┘Response └─────────────┘
```

### Data Flow

1. User enters text in the React frontend
2. Frontend sends POST request to n8n webhook
3. n8n workflow receives and processes the request
4. Workflow forwards data to Gemini AI API
5. Gemini AI analyzes text and returns results
6. n8n formats the response
7. Frontend receives and displays formatted results

## 🔄 n8n Workflow

The automation workflow consists of four main nodes:

### Workflow Structure

```
Webhook → HTTP Request → Edit Fields → Respond to Webhook
```

### Node Configuration

#### 1. Webhook Node
- **Type**: `n8n-nodes-base.webhook`
- **Method**: POST
- **Path**: `/4a6510e0-4537-4bbf-9bdd-5a5c344ad872`
- **Purpose**: Receives text analysis requests from the frontend

#### 2. HTTP Request Node
- **Type**: `n8n-nodes-base.httpRequest`
- **Method**: POST
- **URL**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent`
- **Headers**:
  - `Content-Type: application/json`
- **Query Parameters**:
  - `key`: Gemini API key
- **Body**:
  ```json
  {
    "contents": [
      {
        "parts": [
          {
            "text": "Perform a detailed sentiment analysis (Positive, Negative, or Neutral) and provide a brief summary of the following text:\n\n{{ $json.body.text_to_analyze }}"
          }
        ]
      }
    ]
  }
  ```

#### 3. Edit Fields Node
- **Type**: `n8n-nodes-base.set`
- **Purpose**: Extracts the AI response
- **Mapping**:
  - `final_result` → `{{ $json.candidates[0].content.parts[0].text }}`

#### 4. Respond to Webhook Node
- **Type**: `n8n-nodes-base.respondToWebhook`
- **Response Type**: JSON
- **Purpose**: Sends formatted results back to frontend



### Workflow Features

- **Error Handling**: Built-in error responses for failed API calls
- **Data Validation**: Ensures proper request structure
- **Response Formatting**: Structures data for easy frontend consumption
- **Scalability**: Can handle multiple concurrent requests

## 📦 Installation

### Prerequisites

- Node.js 20.19.0 or higher
- npm or yarn package manager
- n8n instance (self-hosted or cloud)
- Google Gemini API key

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-text-analyzer.git
   cd ai-text-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-path
   ```

4. **Import n8n workflow**
   - Log into your n8n instance
   - Configure your Gemini API key
   - Make the workflow

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WEBHOOK_URL` | n8n webhook endpoint URL | Yes |



## 🚀 Usage

### Basic Usage

1. Open the application in your browser
2. Enter or paste text into the textarea (minimum 10 characters)
3. Click "Analyze Text" or press `Ctrl/Cmd + Enter`
4. View the sentiment analysis and summary results
5. Copy results using the "Copy Analysis" button

### Example Inputs

**Positive Sentiment:**
```
I absolutely love this product! It exceeded all my expectations and the customer service was outstanding.
```

**Negative Sentiment:**
```
This was a terrible experience. The product broke after one day and support was unhelpful.
```

**Neutral Sentiment:**
```
The weather today is partly cloudy with temperatures around 72 degrees Fahrenheit.
```

## 📁 Project Structure

```
ai-text-analyzer/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── ErrorMessage.jsx      # Error display component
│   │   ├── ResultDisplay.jsx     # Results formatting component
│   │   └── TextAnalyzer.jsx      # Main analyzer component
│   ├── App.jsx                   # Root component
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Application entry point
├── n8n-workflow.json             # n8n automation workflow
├── .env                          # Environment variables
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite configuration
└── README.md                     # Project documentation
```

## 🔌 API Integration

### Request Format

```javascript
POST /webhook/your-webhook-path
Content-Type: application/json

{
  "text_to_analyze": "Your text here"
}
```

### Response Format

```javascript
{
  "final_result": "**Sentiment:** Positive\n\n**Summary:**\nThe text expresses enthusiasm and satisfaction...\n\n**Key Points:**\n* Positive experience\n* High satisfaction\n* Recommendation"
}
```

### Error Handling

The application handles various error scenarios:

- Network connectivity issues
- Invalid webhook URL
- API rate limiting
- Malformed responses
- Empty or invalid inputs

## 📸 Screenshots

### Main Interface
![Main Interface](screenshots/main-interface.png)
*Clean, modern interface with clear call-to-action*

### Analysis Results
![Analysis Results](screenshots/results-display.png)
*Formatted results with sentiment classification and detailed summary*

### Error Handling
![Error Handling](screenshots/error-message.png)
*User-friendly error messages with troubleshooting guidance*

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation as needed
- Test your changes thoroughly
- Ensure ESLint passes



## 🙏 Acknowledgments

- Google Gemini AI for powerful language processing
- n8n community for workflow automation tools
- React team for the amazing framework
- Tailwind CSS for the utility-first CSS approach
- Vite for blazing-fast development experience



---

<div align="center">
  <p>Built with ❤️ using n8n, Gemini AI, React, and Tailwind CSS</p>
  <p>FDE Assessment Submission - 2025</p>
</div>
