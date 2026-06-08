// ============================================================
// Luxy Travel Persona — Chat API Service
// Connects frontend to the Python FastAPI backend
// ============================================================

import { ChatRequest, ChatResponse } from "../types";

const BACKEND_URL = "http://localhost:8000";

export const sendChatMessage = async (
  message: string,
  history: Array<{ role: string; content: string }>
): Promise<string> => {
  const request: ChatRequest = { message, history };

  const response = await fetch(`${BACKEND_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || `Server responded with status ${response.status}`
    );
  }

  const data: ChatResponse = await response.json();
  return data.reply;
};

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${BACKEND_URL}/`, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const OFFLINE_MESSAGE =
  "The AI concierge backend is currently unavailable. Please start the FastAPI server and try again.\n\n**To start the backend:**\n```\ncd backend\npip install -r requirements.txt\nuvicorn main:app --reload\n```\n\nThe backend should be running at http://localhost:8000";
