"""Utility helpers and constants used across the ViralClip AI app."""

import os
import re
from typing import List, Dict, Any

# Keywords that often signal strong short-form potential.
VIRAL_KEYWORDS = [
    "ai", "automation", "automate", "workflow", "productivity", "save time",
    "secret", "mistake", "lesson", "learn", "result", "growth", "warning",
    "surprising", "counterintuitive", "before", "after", "transformation",
    "problem", "solution", "hack", "tip", "trick", "breakthrough", "insight",
    "honest", "exhausting", "burn out", "viral", "hook", "algorithm",
    "professional", "system", "repeatable", "scale", "massive", "advantage",
    "money", "hours", "minutes", "percent", "double", "triple", "never",
    "always", "most people", "everyone", "nobody", "the real reason"
]

# Emotional / educational intensity markers.
EMOTIONAL_WORDS = [
    "honest", "exhausting", "burn out", "struggle", "frustrated", "excited",
    "shocked", "surprised", "amazed", "obsessed", "love", "hate", "finally",
    "breakthrough", "game changer", "mind blown", "relief", "stress"
]


def seconds_to_timestamp(seconds: float) -> str:
    """Convert seconds to SRT-style timestamp HH:MM:SS,mmm."""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds - int(seconds)) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"


def timestamp_to_seconds(timestamp: str) -> float:
    """Parse HH:MM:SS or MM:SS timestamp into seconds."""
    parts = timestamp.strip().split(":")
    if len(parts) == 2:
        minutes, seconds = parts
        return float(minutes) * 60 + float(seconds)
    if len(parts) == 3:
        hours, minutes, seconds = parts
        return float(hours) * 3600 + float(minutes) * 60 + float(seconds)
    return 0.0


def split_text_into_chunks(text: str, chunk_size: int = 60, overlap: int = 10) -> List[Dict[str, Any]]:
    """Split transcript text into overlapping chunks for scoring.

    Each chunk contains `chunk_size` words with `overlap` words shared
    between consecutive chunks.
    """
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        end = min(start + chunk_size, len(words))
        chunk_text = " ".join(words[start:end])
        chunks.append({
            "start_word": start,
            "end_word": end,
            "text": chunk_text,
        })
        start += chunk_size - overlap
    return chunks


def count_keyword_matches(text: str) -> int:
    """Count how many viral keywords appear in the text."""
    lower = text.lower()
    return sum(1 for kw in VIRAL_KEYWORDS if kw in lower)


def count_emotional_words(text: str) -> int:
    """Count emotional intensity words in the text."""
    lower = text.lower()
    return sum(1 for word in EMOTIONAL_WORDS if word in lower)


def looks_like_quote(text: str) -> bool:
    """Heuristic to detect quote-worthy standalone statements."""
    lower = text.lower()
    # Sentences that start with "I" and contain a strong conclusion often quote well.
    if lower.startswith("i ") and any(kw in lower for kw in ["realized", "learned", "think", "believe", "mistake"]):
        return True
    # Sentences with contrast words feel quotable.
    if any(kw in lower for kw in ["not ", "but ", "instead", "while", "versus", "vs"]):
        return True
    return False


def estimate_segment_time(segment_index: int, total_segments: int, total_duration: float = 600.0) -> tuple:
    """Estimate start/end times for a segment when timestamps are unavailable."""
    segment_duration = total_duration / total_segments
    start = segment_index * segment_duration
    end = start + segment_duration
    return start, end


def sanitize_filename(text: str) -> str:
    """Create a safe filename from arbitrary text."""
    return re.sub(r"[^\w\-]+", "_", text).strip("_")[:50]
