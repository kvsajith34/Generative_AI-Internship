"""
================================================================
Luxy Travel Persona — FastAPI Backend
================================================================
Main application entry point.

Run with:
    uvicorn main:app --reload

API docs available at:
    http://localhost:8000/docs
    http://localhost:8000/redoc
================================================================
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Import routes
from app.routes import router

# ── App Configuration ─────────────────────────────────────────

app = FastAPI(
    title="Luxy Travel Persona API",
    description="AI-powered luxury travel consultant backend for Luxy Travel Persona.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# ── CORS Configuration ────────────────────────────────────────
# Allows the React frontend to communicate with this backend

ALLOWED_ORIGINS = [
    "http://localhost:5173",   # Vite dev server (default)
    "http://localhost:3000",   # Alternative React dev port
    "http://localhost:4173",   # Vite preview
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# ── Register Routes ───────────────────────────────────────────

app.include_router(router)

# ── Health Check ──────────────────────────────────────────────

@app.get(
    "/",
    summary="Health Check",
    tags=["health"]
)
async def health_check():
    """
    Basic health check endpoint.
    Returns status and current AI provider mode.
    """
    provider = os.getenv("AI_PROVIDER", "demo")
    return {
        "status": "ok",
        "message": "Luxy Travel Persona backend is running",
        "ai_provider": provider,
        "version": "1.0.0"
    }


@app.get(
    "/health",
    summary="Extended Health Check",
    tags=["health"]
)
async def extended_health():
    """Extended health check with configuration details."""
    provider = os.getenv("AI_PROVIDER", "demo")
    has_claude_key = bool(os.getenv("CLAUDE_API_KEY"))
    has_gemini_key = bool(os.getenv("GEMINI_API_KEY"))

    return {
        "status": "ok",
        "service": "Luxy Travel Persona",
        "ai_provider": provider,
        "claude_configured": has_claude_key,
        "gemini_configured": has_gemini_key,
        "mode": "live" if (
            (provider == "claude" and has_claude_key) or
            (provider == "gemini" and has_gemini_key)
        ) else "demo"
    }


# ── Startup Event ─────────────────────────────────────────────

@app.on_event("startup")
async def startup_event():
    provider = os.getenv("AI_PROVIDER", "demo")
    print("\n" + "="*60)
    print("  Luxy Travel Persona — Backend Starting")
    print("="*60)
    print(f"  AI Provider: {provider.upper()}")
    print(f"  API Docs: http://localhost:8000/docs")
    print(f"  Health: http://localhost:8000/health")
    print("="*60 + "\n")
