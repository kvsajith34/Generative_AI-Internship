// ============================================================
// Luxy Travel Persona — Type Definitions
// ============================================================

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  history: Array<{ role: string; content: string }>;
}

export interface ChatResponse {
  reply: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  continent: string;
  country: string;
  description: string;
  bestFor: string[];
  suggestedDuration: string;
  luxuryStyle: string;
  seasonHint: string;
  sampleExperiences: string[];
  imageGradient: string;
  tag: string;
}

export interface TravelPlannerForm {
  destinationPreference: string;
  departureCity: string;
  travelDatesFrom: string;
  travelDatesTo: string;
  numberOfTravelers: string;
  tripType: string;
  budgetRange: string;
  hotelStyle: string;
  foodPreferences: string;
  activityPreferences: string[];
  specialOccasion: string;
  mobilityNeeds: string;
  paceOfTravel: "relaxed" | "balanced" | "packed";
  luxuryLevel: "premium" | "ultra-luxury" | "private-vip";
}

export interface AppSettings {
  apiProvider: "demo" | "claude" | "gemini";
  apiKey: string;
  temperature: number;
  backendUrl: string;
}

export type TripType =
  | "honeymoon"
  | "family"
  | "solo"
  | "private-island"
  | "safari"
  | "wellness"
  | "business"
  | "adventure"
  | "cultural"
  | "cruise"
  | "culinary"
  | "other";

export type DestinationCategory =
  | "Honeymoon"
  | "Family Luxury"
  | "Private Island"
  | "Cultural Escape"
  | "Safari"
  | "Wellness"
  | "Business Class Trip"
  | "Adventure Luxury"
  | "Europe"
  | "Asia"
  | "Middle East"
  | "Africa"
  | "Americas"
  | "Oceania";
