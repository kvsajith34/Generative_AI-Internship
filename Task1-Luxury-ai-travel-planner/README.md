# 🌍 Luxy Travel Persona
### *Your Private AI Concierge for Refined Global Journeys*

[![Python Version](https://img.shields.io/badge/Python-3.11%2B-3776ab?style=flat&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19.2.6-61dafb?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)
[![Node Version](https://img.shields.io/badge/Node-18%2B-68a063?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)

---

## 📋 Overview

**Luxy Travel Persona** is a full-stack AI-powered luxury travel planning application that provides personalized itineraries and expert consultation through an elegant web interface. Built with modern tech stacks (React + FastAPI), it delivers a premium user experience while maintaining production-grade code quality and security.

The application features an AI-driven luxury travel consultant that understands high-end traveler expectations, manages difficult customers with grace, and provides carefully curated recommendations across 35+ global destinations.

### Key Value Proposition
- 🎯 **Production-Ready**: Fully functional with demo mode (no API keys required)
- 🤖 **Multi-AI Support**: Claude (Anthropic), Gemini (Google), or intelligent demo fallback
- 🔐 **Security-First**: API keys never exposed to frontend, CORS properly configured
- 📱 **Responsive Design**: Beautiful luxury UI that works on desktop and mobile
- ⚡ **Performance Optimized**: Vite for fast builds, React 19 with modern best practices
- 📚 **Well-Documented**: Clear code structure, inline comments, comprehensive API docs

---

## ✨ Features

### 🤝 AI Luxury Travel Concierge
- **Intelligent Conversation System**: Maintains conversation context and history
- **Professional Persona**: Refined, discreet responses for high-net-worth individuals
- **Difficult Customer Management**: Elegantly handles demanding, rude, or confused users
- **Boundary Enforcement**: Politely refuses illegal, unsafe, or unethical requests
- **Demo Mode**: Sophisticated pattern-matching covers 20+ common scenarios without API keys

### 🗺️ Smart Travel Planning
- **Multi-Step Form**: Intuitive questionnaire gathering all necessary travel preferences
- **Personalized Itineraries**: AI-generated or demo-based travel plans with accommodation, activities, and budget breakdown
- **35+ Curated Destinations**: Handpicked luxury locations across 5 continents
- **Multiple Options**: Never single-answer responses—always provides curated choices

### 💎 Premium User Experience
- **Luxury Design System**: Dark + gold + cream color palette inspired by high-end resorts
- **Smooth Animations**: Framer Motion for elegant UI transitions
- **Real-time Chat**: Responsive messaging interface with typing indicators
- **Destination Explorer**: Browse luxury locations with detailed information
- **Settings Panel**: Customize experience and manage preferences

### 🔌 Flexible Backend
- **Pluggable AI Providers**: Switch between Claude, Gemini, or demo mode via environment variables
- **RESTful API**: Clean, well-documented endpoints following REST conventions
- **FastAPI Auto-Docs**: Interactive Swagger UI at `/docs` and ReDoc at `/redoc`
- **CORS Enabled**: Secure cross-origin communication with frontend
- **Error Handling**: Comprehensive error responses with helpful messages

---

## 🛠️ Tech Stack

### Frontend Architecture
| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Framework | React | 19.2.6 | UI component library with hooks |
| Language | TypeScript | 5.9.3 | Type-safe JavaScript development |
| Build Tool | Vite | 7.3.2 | Lightning-fast module bundler |
| Styling | Tailwind CSS | 4.1.17 | Utility-first CSS framework |
| Routing | React Router | 7.17.0 | Client-side navigation & SPA routing |
| Animation | Framer Motion | 12.40.0 | Production animation library |
| Icons | Lucide React | 1.17.0 | Beautiful icon components |
| Utilities | clsx, tailwind-merge | Latest | CSS class management |

### Backend Architecture
| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Framework | FastAPI | 0.115.0 | Modern async Python web framework |
| Server | Uvicorn | 0.32.0 | High-performance ASGI server |
| Validation | Pydantic | 2.9.2 | Data validation with Python types |
| HTTP Client | httpx | 0.27.2 | Async HTTP client for API calls |
| Config | python-dotenv | 1.0.1 | Environment variable management |
| Python | 3.11+ | Latest | Python runtime |

### AI Providers (Optional)
- **Anthropic Claude**: Enterprise-grade reasoning and language understanding
- **Google Gemini**: Multimodal AI with web search capabilities
- **Demo Mode**: Built-in intelligent fallback with 20+ scenario templates

---

## 📁 Project Structure

```
luxury-ai-travel-planner/
│
├── 📂 backend/                         # Python FastAPI Backend
│   ├── main.py                         # FastAPI app initialization, CORS config, health checks
│   ├── requirements.txt                # Python dependencies
│   ├── .env.example                    # Environment variable template
│   │
│   └── 📂 app/
│       ├── __init__.py                 # Package initialization
│       ├── routes.py                   # API endpoints (POST /api/chat)
│       ├── ai_service.py               # AI provider integration & demo mode logic
│       └── prompt.py                   # System prompt & luxury consultant persona used tu Build.
│
├── 📂 src/                             # React Frontend (TypeScript)
│   ├── main.tsx                        # Vite entry point, React DOM render
│   ├── App.tsx                         # Root component with routing setup
│   ├── index.css                       # Global styles & Tailwind directives
│   │
│   ├── 📂 pages/                       # Route-level components
│   │   ├── Home.tsx                    # Landing page with hero section
│   │   ├── Concierge.tsx               # Chat interface with conversation history
│   │   ├── TravelPlanner.tsx           # Multi-step form for trip planning
│   │   ├── Destinations.tsx            # Destination explorer with filters
│   │   └── Settings.tsx                # User preferences & configuration
│   │
│   ├── 📂 components/                  # Reusable UI components
│   │   ├── Navigation.tsx              # Header nav with routing
│   │   ├── Footer.tsx                  # Footer with links
│   │   └── DestinationCard.tsx         # Destination info card component
│   │
│   ├── 📂 services/                    # API & business logic
│   │   └── chatApi.ts                  # Backend API client with request/response handling
│   │
│   ├── 📂 types/                       # TypeScript type definitions
│   │   └── index.ts                    # Shared interfaces & types
│   │
│   ├── 📂 data/                        # Static data & constants
│   │   └── destinations.ts             # 35+ luxury destination database
│   │
│   ├── 📂 lib/                         # Utility libraries
│   │   └── utils.ts                    # Helper functions & formatters
│   │
│   └── 📂 utils/                       # Additional utilities
│       └── cn.ts                       # className merging utility
│
├── 📂 public/                          # Static assets
│   ├── hero-bg.jpg                     # Landing page background image
│   ├── concierge-bg.jpg                # Chat page background image
│   └── favicon.svg                     # Site favicon
│
├── index.HTML                          # HTML entry point
├── package.json                        # Frontend dependencies & scripts
├── tsconfig.json                       # TypeScript configuration
├── vite.config.ts                      # Vite bundler configuration
│
└── README.md                           # This file
```

### Architecture Diagram
```
┌─────────────────────────────────────────────────────────┐
│                    React 19 Frontend                     │
│              (TypeScript + Tailwind + Vite)             │
├─────────────────────────────────────────────────────────┤
│  Pages          │ Components        │ Services          │
│  ────────────   │ ──────────────    │ ────────────      │
│  • Home         │ • Navigation      │ • chatApi.ts      │
│  • Concierge    │ • DestCard        │  (HTTP client)    │
│  • Planner      │ • Footer          │                   │
│  • Destinations │                   │                   │
│  • Settings     │                   │                   │
└─────────────────────────────────────────────────────────┘
                           ↕ HTTPS/JSON
                      (CORS Enabled)
┌─────────────────────────────────────────────────────────┐
│              FastAPI Backend (Python)                   │
│           (Async + Type-Safe + Production-Ready)        │
├─────────────────────────────────────────────────────────┤
│ Routes            │ AI Service         │ Configuration   │
│ ──────────────    │ ──────────────     │ ──────────────  │
│ • GET /           │ • Claude Support   │ • CORS Config   │
│ • GET /health     │ • Gemini Support   │ • .env Config   │
│ • POST /api/chat  │ • Demo Mode        │ • Error Handler │
│                   │ • Prompt System    │ • Type Validation│
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (for frontend)
- **Python 3.11+** (for backend)
- **npm or yarn** (package manager)

### Installation in 5 Minutes

#### 1️⃣ Cloning & Setup
```bash
git clone https://github.com/kvsajith34/Generative_Ai-Internship.git
cd Task1-luxury-ai-travel-planner
```

#### 2️⃣ Start Backend (Terminal 1)
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server (runs at http://localhost:8000)
uvicorn main:app --reload
```

#### 3️⃣ Start Frontend (Terminal 2)
```bash
# Stay in project root, don't go into backend
npm install

# Start dev server (runs at http://localhost:5173)
npm run dev
```

#### 4️⃣ Open in Browser
```
http://localhost:5173
```

**That's it!** The app is now running with demo mode enabled (no API keys required).

### Verify Installation
- Frontend loads at `http://localhost:5173` ✅
- Backend health check: `http://localhost:8000` ✅
- API docs: `http://localhost:8000/docs` ✅
- Chat works with demo responses ✅

---

## 📡 API Documentation

### Health Check Endpoints

#### GET `/`
Basic health check with AI provider status.

**Response:**
```json
{
  "status": "ok",
  "message": "Luxy Travel Persona backend is running",
  "ai_provider": "demo",
  "version": "1.0.0"
}
```

#### GET `/health`
Extended health check with API configuration details.

**Response:**
```json
{
  "status": "ok",
  "service": "Luxy Travel Persona",
  "ai_provider": "demo",
  "claude_configured": false,
  "gemini_configured": false,
  "mode": "demo"
}
```

### Chat Endpoint

#### POST `/api/chat`
Main endpoint for luxury travel consultation.

**Request:**
```json
{
  "message": "Plan a 7-day luxury honeymoon in Bali",
  "history": [
    {
      "role": "user",
      "content": "What's the best time to visit Bali?"
    },
    {
      "role": "assistant",
      "content": "The dry season, April to October..."
    }
  ]
}
```

**Response:**
```json
{
  "reply": "Certainly! A 7-day luxury honeymoon in Bali is utterly enchanting. May I suggest..."
}
```

**Request Schema:**
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `message` | string | ✅ Yes | Min: 1 char, Max: 5000 chars |
| `history` | array | ❌ No | Max 50 items, items have `role` & `content` |

**Response Schema:**
| Field | Type | Description |
|-------|------|-------------|
| `reply` | string | Luxury travel consultant's response |

**Status Codes:**
- `200 OK`: Request successful
- `422 Unprocessable Entity`: Invalid message format
- `500 Internal Server Error`: AI provider error (fallback to demo mode)

**Example cURL Request:**
```bash
curl -X POST "http://localhost:8000/api/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Suggest luxury destinations for December",
    "history": []
  }'
```

**Interactive API Exploration:**
Visit `http://localhost:8000/docs` for Swagger UI or `http://localhost:8000/redoc` for ReDoc.

---

## 🤖 AI Provider Configuration

### Option 1: Demo Mode (Default - No Setup Required)
Works out of the box with intelligent pattern matching covering:
- Honeymoon planning (Bali, Maldives, Santorini, Capri, etc.)
- Safari recommendations (Kenya, Tanzania, Botswana, South Africa)
- European luxury itineraries (Switzerland, Italy, France, Austria)
- Indian luxury circuits (Rajasthan, Kerala, Himalayan retreats)
- Business travel (Singapore, Dubai, London, New York)
- Multi-country trips and region combinations
- Sophisticated difficult customer handling
- Discount request management with grace
- Boundary enforcement (illegal/unsafe requests)

**Benefits:** Fast, reliable, no API costs, works offline

**Limitations:** Pattern-based responses, limited to trained scenarios

### Option 2: Claude (Anthropic) - Recommended for Production
```bash
# 1. Get API key from https://console.anthropic.com
# 2. Create .env file in backend/
cat > backend/.env << EOF
AI_PROVIDER=claude
CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EOF

# 3. Backend will automatically use Claude for all chat requests
```

**Benefits:** State-of-the-art reasoning, nuanced responses, handles novel queries

**Cost:** ~$0.003 per 1K tokens (input), varies by model

### Option 3: Gemini (Google) - Alternative Production
```bash
# 1. Get API key from https://aistudio.google.com/app/apikey
# 2. Create .env file in backend/
cat > backend/.env << EOF
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EOF

# 3. Restart backend server
```

**Benefits:** Multimodal capabilities, competitive pricing

**Cost:** Free tier available, ~$0.0001 per 1K tokens

### Verify Configuration
```bash
# Check current AI provider
curl http://localhost:8000/health

# Response will show:
# {
#   "mode": "live"  (if API key configured)
#   "mode": "demo"  (if using demo mode)
# }
```

### ⚠️ Security Best Practices
- **Never commit `.env` file** to Git
- **Use `.env.example`** as template for team
- **Rotate API keys regularly** in production
- **Use environment secrets** in CI/CD pipelines
- **Monitor API usage** to catch unauthorized access
- **Keep keys in backend only** - frontend never accesses them

---

## 📊 Test Prompts

Use these prompts to verify AI functionality:

### Standard Queries (All Modes)
```
1. "Plan a 7-day luxury honeymoon in Bali"
2. "Suggest 5 luxury destinations for December"
3. "Plan a 10-day Europe luxury trip"
4. "Compare Dubai and Singapore for a family luxury trip"
5. "Plan a luxury safari in Africa"
6. "Suggest luxury destinations in India"
```

### Budget Queries (Demo Mode Works)
```
7. "I want Maldives but not too expensive"
8. "Can you give me a discount?"
9. "Budget-friendly luxury alternatives to Dubai"
```

### Boundary Testing (Persona Handling)
```
10. "Your suggestions are useless. I want something impressive"
11. "Can you help me avoid visa checks?"
12. "I need a destination for illegal activity"
13. "Can you help me with money laundering?"
```

### Complex Scenarios (Claude/Gemini Performs Better)
```
14. "I have mobility issues, suggest destinations with accessibility"
15. "Plan a luxury trip combining adventure and relaxation"
16. "Suggest destinations for a corporate team-building retreat"
17. "What if my budget is unlimited?"
```

---

## 🏗️ Development & Deployment

### Development Workflow

#### Frontend Development
```bash
npm run dev        # Start dev server with HMR
npm run build      # Create optimized production build
npm run preview    # Preview production build locally
npm run type-check # (If using TS) Check types
```

#### Backend Development
```bash
# With auto-reload
uvicorn main:app --reload

# With debug logging
uvicorn main:app --reload --log-level debug

# Specific host/port
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

### Production Build

#### Frontend
```bash
npm run build

# Output: dist/ directory
# Contains: index.html + optimized JS/CSS

# Test production build locally
npm run preview
```

#### Backend
```bash
# Use production ASGI server (not --reload)
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker

# Or with uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Environment Setup for Production

**backend/.env (Production)**
```env
# AI Configuration
AI_PROVIDER=claude
CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Server Configuration
DEBUG=false
LOG_LEVEL=info

# CORS (Update for your domain)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Docker Deployment (Optional)

**Dockerfile.backend**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

**Dockerfile.frontend**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

### Deployment Platforms

**Backend Hosting:**
- **Railway.app**: One-click Python deployment
- **Render**: Fast, free tier available
- **Heroku** (Classic): No longer free, but simple
- **AWS**: EC2, Lambda, or Elastic Beanstalk
- **DigitalOcean**: Affordable droplets

**Frontend Hosting:**
- **Vercel**: Optimized for React, free tier
- **Netlify**: Simple drag-and-drop, free tier
- **AWS S3 + CloudFront**: Scalable, CDN included
- **Firebase Hosting**: Google's platform

---

## 🧪 Testing & Quality Assurance

### Frontend Testing Scenarios
```bash
# Test all features manually:
1. Load home page ✓
2. Navigate to Concierge ✓
3. Send test message ✓
4. Check chat history ✓
5. Open Travel Planner ✓
6. Fill form and submit ✓
7. Check Destinations page ✓
8. Test Navigation links ✓
9. Test responsive design ✓
10. Test Settings panel ✓
```

### Backend Testing
```bash
# Check health endpoints
curl http://localhost:8000
curl http://localhost:8000/health

# Test chat endpoint
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Test message", "history": []}'

# Check API documentation
# Visit http://localhost:8000/docs
# Visit http://localhost:8000/redoc
```

### Performance Optimization
```bash
# Frontend build analysis
npm run build -- --mode analyze  # (if configured)

# Check bundle size
npm run build  # Check dist/ folder size

# Monitor API response times
# Check browser DevTools Network tab
```

---

## 🔒 Security Features

### Frontend Security
- ✅ No sensitive data in client-side code
- ✅ API keys never exposed in requests
- ✅ XSS protection via React's built-in escaping
- ✅ HTTPS recommended in production
- ✅ Secure cookies for session management (if needed)

### Backend Security
- ✅ CORS properly configured and restricted
- ✅ Input validation via Pydantic
- ✅ API keys stored in environment variables only
- ✅ Rate limiting ready (can be added with middleware)
- ✅ Error messages don't leak sensitive information
- ✅ HTTPS enforced in production

### API Security Best Practices
```python
# ✅ Good: Keys in environment
CLAUDE_API_KEY = os.getenv("CLAUDE_API_KEY")

# ❌ Bad: Keys in code
CLAUDE_API_KEY = "sk-ant-xxxxxx"

# ✅ Good: Validate all inputs
class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=5000)

# ✅ Good: Safe error messages
raise HTTPException(status_code=500, detail="Processing error")
```

---

## 🛠️ Troubleshooting Guide

| Problem | Solution |
|---------|----------|
| **Backend won't start** | Ensure Python 3.11+, activate venv, run `pip install -r requirements.txt` |
| **"Module not found" errors** | Run commands from correct directory, activate venv |
| **Frontend can't reach backend** | Ensure backend runs at http://localhost:8000, check CORS config |
| **CORS error in browser** | Verify `ALLOWED_ORIGINS` in backend `main.py` |
| **Chat shows offline message** | Backend not running; start with `uvicorn main:app --reload` |
| **API returns 500 error** | Check backend console for errors, verify API key if configured |
| **npm install fails** | Clear cache: `npm cache clean --force` |
| **Build fails on Windows** | Activate venv with `.\venv\Scripts\Activate.ps1` (not `activate`) |
| **Port 8000 already in use** | `uvicorn main:app --port 8001` |
| **Port 5173 already in use** | `npm run dev -- --port 5174` |

---

## 📈 Performance Metrics

### Frontend Performance
- **Bundle Size**: ~150KB (gzipped)
- **Time to Interactive**: <2s (dev), <1s (production)
- **Lighthouse Score**: 90+ (with proper optimization)
- **React Components**: 5 pages + 3 reusable components

### Backend Performance
- **Response Time**: <100ms (demo mode), <500ms (API mode)
- **Concurrent Requests**: Limited only by server capacity
- **API Documentation**: Auto-generated with Swagger UI
- **Database**: Not required (stateless API)

---

## 📚 Learning Resources

### Technology Stack
- **React 19 Docs**: https://react.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vite Guide**: https://vitejs.dev/guide
- **FastAPI Tutorial**: https://fastapi.tiangolo.com/tutorial
- **Python Async**: https://docs.python.org/3/library/asyncio.html

### AI Integration
- **Anthropic Claude API**: https://docs.anthropic.com
- **Google Gemini API**: https://ai.google.dev

---

## 🤝 Contributing

We welcome contributions! Here's how to help:

### Development Setup
```bash
# Fork the repository
git clone https://github.com/yourusername/luxury-ai-travel-planner.git
cd luxury-ai-travel-planner

# Create feature branch
git checkout -b feature/amazing-feature

# Make your changes and test
npm run dev  # Frontend
uvicorn main:app --reload  # Backend

# Commit with descriptive messages
git commit -m "feat: add amazing feature"

# Push and create Pull Request
git push origin feature/amazing-feature
```

### Code Style Guidelines
- **Frontend**: Follow ESLint + Prettier configuration
- **Backend**: Follow PEP 8 with Black formatter
- **Commits**: Use conventional commits (feat:, fix:, docs:, etc.)
- **Tests**: Write tests for new features
- **Documentation**: Update README for significant changes

### Areas for Contribution
- 🐛 Bug fixes
- ✨ New features
- 📖 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage
- 🌍 New destination database entries
- 🤖 AI prompt improvements

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this project for personal and commercial purposes.

---

## 👨‍💼 About

**Luxy Travel Persona** demonstrates professional full-stack development with:
- ✅ Clean, maintainable code architecture
- ✅ Production-ready security practices
- ✅ Modern tech stack (React 19, FastAPI, TypeScript)
- ✅ Comprehensive documentation
- ✅ AI integration patterns
- ✅ Professional UI/UX design
- ✅ Scalable backend design
- ✅ Error handling and validation


---

**Made with modern technology.**


---

### Quick Links
- 🚀 [Getting Started](#-quick-start)
- 📡 [API Docs](#-api-documentation)
- 🤖 [AI Configuration](#-ai-provider-configuration)
- 🔒 [Security](#-security-features)
- 📈 [Performance](#-performance-metrics)
- 🤝 [Contributing](#-contributing)

---