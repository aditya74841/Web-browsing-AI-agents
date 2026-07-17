# 🚀 Quick Start Guide

## Installation & Running

### Option 1: Run Both (Recommended for Development)

```bash
# Install root dependencies (for concurrently)
npm install

# Run frontend and backend together
npm run dev
```

This opens:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Option 2: Manual Setup

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

### Option 3: Production Mode

```bash
# Build frontend
cd frontend
npm install
npm run build

# Run backend (serves frontend from dist/)
cd ../backend
npm install
npm start
```

Access at http://localhost:5000

## 📝 Environment Setup

Create `backend/.env`:
```
GROQ_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
PORT=5000
```

## 🎯 First Test

1. Open chat interface
2. Ask: "What is the current date?"
3. AI will search web if needed
4. See response with sources

## 🐛 Troubleshooting

### Port already in use
```bash
# Change PORT in backend/.env
PORT=3000
```

### CORS errors
Backend already configured with CORS middleware - ensure frontend and backend are running.

### API key errors
Double-check `.env` file has correct keys with no extra spaces.

## 📦 Project Ready for Portfolio!

✅ Full-stack architecture
✅ React + Tailwind modern UI
✅ Express backend with real APIs
✅ Search integration
✅ Professional README
✅ Easy deployment

Next: Deploy to Vercel or Railway!
