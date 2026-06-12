<div align="center">

# ✈️ Luxy Travel Persona
### *Your Private AI Concierge for Refined Global Journeys*

[![Python](https://img.shields.io/badge/Python-3.11%2B-3776ab?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19.2.6-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-7.3.2-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

> A full-stack, production-ready AI luxury travel planning web application with a refined dark-gold UI, multi-provider AI support, and intelligent demo fallback — no API keys required to run.

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture Diagram](#-architecture-diagram)
- [Getting Started](#-getting-started)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [AI Providers](#-ai-providers)
- [Documentation](#-documentation)
- [Author](#-author)

---

## 🌐 Overview

**Luxy Travel Persona** is a production-grade Generative AI application that acts as a private luxury travel consultant. It accepts natural language inputs from the user — travel preferences, destinations, budgets, trip styles — and returns expertly curated, personalized itineraries through a premium chat and form-based interface.

This project was built as **Task 1** of the Generative AI Internship at [Decodelabs], demonstrating prompt engineering, full-stack integration, and responsible AI behaviour — including boundary enforcement, difficult-customer handling, and ethical refusal logic.

**What makes this production-ready?**
- API keys are never exposed to the frontend
- CORS is properly configured
- Demo mode works entirely offline — no keys needed
- Responsive across desktop, tablet, and mobile
- Framer Motion animations and luxury UI polish throughout

---

## ✨ Features

### 🤝 AI Luxury Travel Concierge
- Conversational chat interface with full message history
- Refined, discreet persona tuned for high-net-worth travelers
- Handles demanding, confused, or rude users gracefully
- Politely declines illegal, unethical, or unsafe requests
- 20+ demo-mode scenario templates for offline use

### 🗺️ Smart Travel Planner
- 3-step form: trip details → preferences → luxury level
- Activities selector (Beach, Safari, Cultural, Wellness, Nightlife, Golf, Yachting, and more)
- Budget range, hotel style, pace of travel, and special occasion fields
- AI-generated itineraries sent back as rich, formatted plans

### 💎 Premium Design System
- Dark (`#0A0A0A`) + gold (`#C9A84C`) + cream (`#FAF7F2`) palette
- `Cormorant Garamond` display font + `Inter` body font
- Framer Motion transitions on all interactive elements
- Glass-morphism navigation bar with mobile hamburger menu
- Typing indicator with animated dots while AI responds

### 🔌 Flexible Backend
- Switch AI providers via a single environment variable
- FastAPI auto-documentation at `/docs` and `/redoc`
- CORS configured for local and production origins
- Health check endpoint for uptime monitoring

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.6 | UI component framework |
| TypeScript | 5.9.3 | Type-safe development |
| Vite | 7.3.2 | Build tool & dev server |
| Tailwind CSS | 4.1.17 | Utility-first styling |
| React Router | 7.17.0 | Client-side routing |
| Framer Motion | 12.40.0 | Animations & transitions |
| Lucide React | 1.17.0 | Icon library |
| vite-plugin-singlefile | 2.3.0 | Bundle into a single HTML file |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | 0.115.0 | Async Python web framework |
| Uvicorn | 0.32.0 | ASGI server |
| Pydantic | 2.9.2 | Data validation & serialization |
| httpx | 0.27.2 | Async HTTP client |
| python-dotenv | 1.0.1 | Environment variable management |
| Python | 3.11+ | Runtime |

### AI Providers (Optional)

| Provider | Model | Notes |
|----------|-------|-------|
| Anthropic Claude | claude-3-5-sonnet | Enterprise-grade reasoning |
| Google Gemini | gemini-1.5-flash | Multimodal, fast inference |
| Demo Mode | Built-in | 20+ templates, no key required |

---

## 📁 Project Structure

```
Task1-Luxury-ai-travel-planner/
│
├── 📄 index.html                        # Vite HTML entry point
├── 📄 package.json                      # Node dependencies & scripts
├── 📄 tsconfig.json                     # TypeScript configuration
├── 📄 vite.config.ts                    # Vite + Tailwind + singlefile plugin
├── 📄 .gitignore                        # Git ignore rules
│
├── 📂 backend/                          # Python FastAPI Backend
│   ├── main.py                          # App init, CORS config, health check
│   ├── requirements.txt                 # Python dependencies
│   ├── .env.example                     # Environment variable template
│   └── 📂 app/
│       ├── __init__.py
│       ├── routes.py                    # POST /api/chat endpoint
│       ├── ai_service.py                # Claude / Gemini / Demo integration
│       └── prompt.py                    # System prompt & luxury persona
│
├── 📂 public/                           # Static assets
│   ├── favicon.svg
│   ├── hero-bg.jpg
│   └── concierge-bg.jpg
│
├── 📂 src/                              # React Frontend (TypeScript)
│   ├── main.tsx                         # React DOM entry point
│   ├── App.tsx                          # Root component with routing
│   ├── index.css                        # Global styles & Tailwind directives
│   │
│   ├── 📂 pages/
│   │   ├── Home.tsx                     # Landing page & feature highlights
│   │   ├── Concierge.tsx                # Chat interface with history
│   │   ├── TravelPlanner.tsx            # 3-step itinerary form
│   │   ├── Destinations.tsx             # Filterable destination explorer
│   │   └── Settings.tsx                 # Provider & preference settings
│   │
│   ├── 📂 components/
│   │   ├── Navigation.tsx               # Fixed header with mobile menu
│   │   ├── DestinationCard.tsx          # Reusable destination card
│   │   └── Footer.tsx                   # Site-wide footer
│   │
│   ├── 📂 services/
│   │   └── chatApi.ts                   # Backend API calls & health check
│   │
│   ├── 📂 types/                        # TypeScript interfaces & enums
│   ├── 📂 data/                         # Static destination data
│   └── 📂 utils/                        # Shared utility functions
│
└── 📂 .docs/                            # Project documentation
    ├── system_prompt.py                 # Full system prompt with persona logic
    ├── few_shot_examples.md             # Example AI interactions
    ├── test_cases.md                    # API & UI test cases
    └── before_after_comparison.md       # Prompt engineering evolution
                    
```
---
### Architecture Diagram
```
┌─────────────────────────────────────────────────────────┐
│                    React 19 Frontend                    │
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
┌───────────────────────────────────────────────────────────┐
│              FastAPI Backend (Python)                     │
│           (Async + Type-Safe + Production-Ready)          │
├───────────────────────────────────────────────────────────┤
│ Routes            │ AI Service         │ Configuration    │
│ ──────────────    │ ──────────────     │ ──────────────   │
│ • GET /           │ • Claude Support   │ • CORS Config    │
│ • GET /health     │ • Gemini Support   │ • .env Config    │
│ • POST /api/chat  │ • Demo Mode        │ • Error Handler  │
│                   │ • Prompt System    │ • Type Validation│
└───────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Minimum Version |
|-------------|----------------|
| Node.js | 18+ |
| Python | 3.11+ |
| pip | Latest |
| (Optional) Anthropic / Google API key | — |

### Clone the Repository

```bash
git clone https://github.com/kvsajith34/Generative_AI-Internship.git
cd Generative_AI-Internship/Task1-Luxury-ai-travel-planner
```

---

## 🐍 Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. (Recommended) Create a virtual environment
python -m venv venv
source venv/bin/activate        # macOS / Linux
venv\Scripts\activate           # Windows

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Configure environment variables
cp .env.example .env
# Edit .env and add your API key (or leave as demo mode)

# 5. Start the FastAPI server
uvicorn main:app --reload
```

The backend will be available at **http://localhost:8000**

> 💡 Visit **http://localhost:8000/docs** for the interactive Swagger API documentation.

---

## ⚛️ Frontend Setup

```bash
# From the project root (Task1-Luxury-ai-travel-planner/)

# 1. Install Node dependencies
npm install

# 2. Start the Vite dev server
npm run dev
```

The frontend will be available at **http://localhost:5173**

```bash
# Build for production (outputs a single bundled HTML file)
npm run build

# Preview the production build
npm run preview
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory using `.env.example` as a template:

```env
# ─── AI Provider ──────────────────────────────────────────────
# Options: "claude" | "gemini" | "demo"
AI_PROVIDER=demo

# ─── Anthropic Claude ─────────────────────────────────────────
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# ─── Google Gemini ────────────────────────────────────────────
GEMINI_API_KEY=your_gemini_api_key_here

# ─── Server ───────────────────────────────────────────────────
PORT=8000
ALLOWED_ORIGINS=http://localhost:5173
```

> ⚠️ **Security**: Never commit your `.env` file. It is already in `.gitignore`.

> ✅ **No API key?** Set `AI_PROVIDER=demo` to use the built-in intelligent fallback with 20+ scenario templates — no configuration needed.

---

## 📡 API Reference

### Base URL: `http://localhost:8000`

#### `GET /`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "provider": "demo",
  "message": "Luxy Travel Persona backend is running."
}
```

---

#### `POST /api/chat`
Send a message to the AI travel concierge.

**Request Body:**
```json
{
  "message": "Plan a 7-day luxury honeymoon in Bali",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Good day. I am your Luxy Travel Persona..." }
  ]
}
```

**Response:**
```json
{
  "reply": "What a magnificent choice for a honeymoon. Bali offers..."
}
```

**Error Response:**
```json
{
  "detail": "AI provider unavailable. Please check your API key."
}
```

---

## 🤖 AI Providers

The backend supports three modes, switchable via the `AI_PROVIDER` environment variable:

| Mode | Variable | Description |
|------|----------|-------------|
| **Claude** | `claude` | Uses `claude-3-5-sonnet` via Anthropic's API |
| **Gemini** | `gemini` | Uses `gemini-1.5-flash` via Google's API |
| **Demo** | `demo` | No API key required; 20+ built-in response templates |

The system prompt (in `backend/app/prompt.py`) defines Luxy's full persona — including tone, boundaries, refusal logic, and destination expertise. See [`.docs/system_prompt.py`](.docs/system_prompt.py) for the full annotated version.

---

## 📚 Documentation

The `.docs/` folder contains supporting documentation for this project:

| File | Description |
|------|-------------|
| [`system_prompt.py`](.docs/system_prompt.py) | Full annotated system prompt with persona, rules, and fallback logic |
| [`few_shot_examples.md`](.docs/few_shot_examples.md) | Real example conversations demonstrating expected AI behaviour |
| [`test_cases.md`](.docs/test_cases.md) | Backend API and UI test cases with expected outputs |
| [`before_after_comparison.md`](.docs/before_after_comparison.md) | Prompt engineering evolution — how the prompts improved over iterations |


---

**Key concepts demonstrated:**
- System prompt engineering with persona, tone, and boundary constraints
- Few-shot prompting with curated examples
- Multi-provider AI abstraction (Claude / Gemini / Demo)
- Production patterns: CORS, environment variable security, error handling
- Responsive luxury UI with real-time chat and animated components

---

## 👤 Author

<div align="center">

**Venkata Sai Ajith Kancheti**
B.Tech CSE (AI/ML) · Apollo University

[![GitHub](https://img.shields.io/badge/GitHub-kvsajith34-181717?style=flat-square&logo=github)](https://github.com/kvsajith34)

</div>

---

<div align="center">

*Built during the Generative AI Internship *

</div>
