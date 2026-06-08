"""
================================================================
Luxy Travel Persona — API Routes
================================================================
Defines the REST API endpoints for the travel consultant.

Endpoints:
  POST /api/chat  — Main chat endpoint
================================================================
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any
from app.ai_service import generate_travel_response

router = APIRouter(prefix="/api", tags=["concierge"])


# ── Request / Response Models ─────────────────────────────────

class HistoryItem(BaseModel):
    role: str = Field(..., description="Role: 'user' or 'assistant'")
    content: str = Field(..., description="Message content")


class ChatRequest(BaseModel):
    message: str = Field(
        ...,
        min_length=1,
        max_length=5000,
        description="The user's message to the luxury travel consultant"
    )
    history: List[HistoryItem] = Field(
        default=[],
        max_items=50,
        description="Previous conversation history"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "message": "Plan a 7-day luxury honeymoon in Bali",
                "history": []
            }
        }


class ChatResponse(BaseModel):
    reply: str = Field(..., description="The luxury travel consultant's response")

    class Config:
        json_schema_extra = {
            "example": {
                "reply": "Certainly. For a 7-day luxury honeymoon in Bali..."
            }
        }


# ── Routes ────────────────────────────────────────────────────

@router.post(
    "/chat",
    response_model=ChatResponse,
    summary="Chat with the Luxury Travel Consultant",
    description="Send a message to the Luxy Travel Persona AI consultant and receive a curated luxury travel response."
)
async def chat(request: ChatRequest) -> ChatResponse:
    """
    Main chat endpoint for the Luxy Travel Persona AI concierge.

    Receives a user message and optional conversation history,
    then returns a professionally crafted luxury travel response.
    """
    try:
        # Convert history to dict format
        history_dicts = [
            {"role": item.role, "content": item.content}
            for item in request.history
        ]

        # Generate the response
        reply = await generate_travel_response(
            message=request.message,
            history=history_dicts
        )

        return ChatResponse(reply=reply)

    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        print(f"[Luxy] Error generating response: {e}")
        raise HTTPException(
            status_code=500,
            detail="The AI concierge encountered an issue. Please try again."
        )
