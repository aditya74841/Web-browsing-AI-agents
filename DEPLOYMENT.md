# 🚀 Deployment Guide for Render

## ✅ What's Fixed

1. **Health Check Route** → `GET /health`
2. **Home Route** → `GET /` (returns API info if frontend not built)
3. **Better Error Handling** → Falls back to API response if dist folder missing
4. **Rate Limiting** → 2 requests per second per IP

## 📋 Pre-Deployment Checklist

```bash
# 1. Build frontend locally to test
cd frontend
npm run build

# 2. Verify dist folder exists
ls -la frontend/dist/index.html

# 3. Test locally
npm run dev
# Visit http://localhost:5173 (frontend) and http://localhost:5000 (backend)

# 4. Push to GitHub
git add .
git commit -m "Add health check and home routes"
git push
```

## 🎯 Deploy on Render (Recommended)

### Option A: Using Render Dashboard (Manual)

1. **Go to** [render.com](https://render.com)
2. **Click** "New +" → "Web Service"
3. **Connect** your GitHub repo
4. **Fill in:**
   - **Name**: `ai-search-assistant`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

5. **Add Environment Variables:**
   ```
   GROQ_API_KEY = your_key
   TAVILY_API_KEY = your_key
   NODE_ENV = production
   ```

6. **Click** "Create Web Service"
7. **Wait** 2-3 minutes for deployment

### Option B: Using render.yaml (Automatic)

```bash
# Already configured in render.yaml
# Just push and deploy will auto-configure
git push
```

## ✅ Verify Deployment

Test these endpoints after deployment:

```bash
# Health check
curl https://your-app.onrender.com/health

# Home (should show API info or frontend)
curl https://your-app.onrender.com/

# Chat API
curl -X POST https://your-app.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

## 🔧 Troubleshooting

### Issue: "No such file or directory, stat '.../dist/index.html'"

**Solution**: Make sure build command includes frontend build:
```
Build Command: npm run build
```

This runs both:
- `cd frontend && npm install && npm run build`
- `cd backend && npm install`

### Issue: Rate limiting errors in tests

**Current limit**: 2 requests/second per IP

Modify in `backend/server.js`:
```javascript
const limiter = rateLimit({
  windowMs: 1000,
  max: 2,  // Change this number
});
```

### Issue: Environment variables not loading

Check Render dashboard:
1. Go to your service
2. **Environment** tab
3. Add `GROQ_API_KEY` and `TAVILY_API_KEY`
4. Click **Save Changes**
5. Service auto-redeploys

## 📊 Monitoring

Visit your Render dashboard to see:
- ✅ Deployment status
- 📊 CPU/Memory usage
- 📝 Logs (click "Logs" tab)
- ⏱️ Uptime

## 🌍 Your Live URLs

- **Frontend**: `https://your-app.onrender.com/`
- **API**: `https://your-app.onrender.com/api/chat`
- **Health**: `https://your-app.onrender.com/health`

## 🚀 Next Steps

1. ✅ Deploy on Render
2. ✅ Test all endpoints
3. ✅ Share with portfolio reviewers
4. ✅ Monitor logs for errors

---

**Need help?** Check the logs in Render dashboard for detailed errors!
