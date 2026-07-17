# 🔍 AI Search Assistant

A full-stack web application that combines **Groq AI** with **Tavily Web Search** to provide intelligent, real-time answers to user queries.

## ✨ Features

- 💬 **Real-time Chat Interface** - Clean, modern UI built with React and Tailwind CSS
- 🔎 **Web Search Integration** - Tavily API fetches latest information from the internet
- 🤖 **AI-Powered Responses** - Groq's Llama 3.3 70B model processes queries intelligently
- 📚 **Source Attribution** - Displays relevant sources alongside AI responses
- ⚡ **Fast & Responsive** - Express backend with optimized API calls
- 🎨 **Professional UI** - Dark theme with smooth animations and loading states

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **JavaScript (ES6+)**

### Backend
- **Node.js** - Runtime
- **Express.js** - Web server
- **Groq SDK** - AI model access
- **Tavily API** - Web search
- **CORS** - Cross-origin requests

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- Groq API Key ([Get one here](https://console.groq.com))
- Tavily API Key ([Get one here](https://tavily.com))

## 🚀 Getting Started

### 1. Clone and Setup

```bash
cd implement_browser_search
npm install
```

### 2. Configure Environment Variables

Backend (`.env` or `backend/.env`):
```
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
PORT=5000
```

### 3. Development Mode

Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:5000 (Express server)

Or run separately:

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

### 4. Production Build

```bash
npm run build
```

This will build the frontend and prepare the backend for production.

### 5. Start Production Server

```bash
npm start
```

The server will serve the frontend from `frontend/dist` at http://localhost:5000

## 📁 Project Structure

```
implement_browser_search/
├── backend/
│   ├── server.js          # Express server & API endpoints
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── main.jsx      # React entry point
│   │   └── index.css     # Tailwind imports
│   ├── index.html        # HTML template
│   ├── vite.config.js    # Vite configuration
│   ├── tailwind.config.js # Tailwind configuration
│   └── package.json      # Frontend dependencies
├── app.js                # Original CLI version (legacy)
├── package.json          # Root scripts
└── .gitignore
```

## 🔌 API Endpoints

### POST `/api/chat`

Send a message and get an AI response with optional web search results.

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "What are the latest AI developments in 2024?"
    }
  ]
}
```

**Response:**
```json
{
  "response": "Based on recent developments...",
  "searchResults": [
    {
      "title": "...",
      "url": "...",
      "content": "..."
    }
  ]
}
```

## 🎯 How It Works

1. User sends a message via the chat interface
2. Frontend sends request to `/api/chat` endpoint
3. Backend passes message to Groq AI
4. If AI determines web search is needed, it calls Tavily Search API
5. Search results are passed back to Groq for a comprehensive response
6. Frontend displays response with source links

## 🌐 Deployment

### Vercel
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Railway / Heroku
1. Set up backend as the main app
2. Configure build command: `npm run build`
3. Configure start command: `npm start`
4. Add environment variables
5. Deploy!

## 🤝 Contributing

Feel free to fork, improve, and submit PRs!

## 📝 License

ISC

## 🙋 Support

For issues or questions, feel free to open an issue on GitHub.

---

**Made with ❤️ using Groq and Tavily**
