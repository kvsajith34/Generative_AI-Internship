"""Viral segment scoring and selection logic."""

from typing import List, Dict, Any

from src.utils import (
    count_keyword_matches,
    count_emotional_words,
    looks_like_quote,
)


def score_text(text: str) -> Dict[str, float]:
    """Score a piece of text across viral dimensions.

    Returns a dictionary of scores from 0 to 10 for each dimension.
    """
    text_lower = text.lower()
    word_count = len(text.split())

    # 1. Hook strength: presence of viral keywords + early numbers/time references.
    hook_strength = min(10, 2 + count_keyword_matches(text) * 1.5)
    if any(x in text_lower for x in ["here is", "here are", "this is how", "the secret", "biggest mistake"]):
        hook_strength += 2
    hook_strength = min(10, hook_strength)

    # 2. Emotional intensity: emotional words and punctuation.
    emotional_intensity = min(10, 2 + count_emotional_words(text) * 2)
    if "!" in text or "?" in text:
        emotional_intensity += 1
    emotional_intensity = min(10, emotional_intensity)

    # 3. Educational value: presence of instructional or process words.
    edu_markers = ["step", "workflow", "how to", "first", "next", "then", "finally", "tip", "guide"]
    edu_count = sum(1 for marker in edu_markers if marker in text_lower)
    educational_value = min(10, 2 + edu_count * 2)

    # 4. Clarity: ideal length and simple sentence structure.
    clarity = 5.0
    if 20 <= word_count <= 80:
        clarity += 3
    if word_count < 20 or word_count > 150:
        clarity -= 2
    if text.count(",") <= 4:
        clarity += 1
    clarity = max(0, min(10, clarity))

    # 5. Shareability: quote-like phrasing and standalone value.
    shareability = 3.0
    if looks_like_quote(text):
        shareability += 4
    shareability += min(4, count_keyword_matches(text) * 0.6)
    shareability = min(10, shareability)

    # 6. Quote-worthiness: crisp statement with a clear point.
    quote_worthiness = 3.0
    if looks_like_quote(text):
        quote_worthiness += 3
    if any(x in text_lower for x in ["biggest mistake", "best part", "real reason", "one thing", "the truth"]):
        quote_worthiness += 2
    quote_worthiness = min(10, quote_worthiness)

    # 7. Short-form suitability: compact, high-density information.
    short_form = 5.0
    if 25 <= word_count <= 90:
        short_form += 3
    short_form += min(3, count_keyword_matches(text) * 0.4)
    short_form = min(10, short_form)

    # Composite viral score (weighted average).
    viral_score = round(
        (
            hook_strength * 0.20 +
            emotional_intensity * 0.15 +
            educational_value * 0.15 +
            clarity * 0.10 +
            shareability * 0.15 +
            quote_worthiness * 0.10 +
            short_form * 0.15
        ),
        2,
    )

    return {
        "hook_strength": round(hook_strength, 1),
        "emotional_intensity": round(emotional_intensity, 1),
        "educational_value": round(educational_value, 1),
        "clarity": round(clarity, 1),
        "shareability": round(shareability, 1),
        "quote_worthiness": round(quote_worthiness, 1),
        "short_form_suitability": round(short_form, 1),
        "viral_score": viral_score,
    }


def score_segments(segments: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Score each segment and attach scores to the segment dict."""
    for segment in segments:
        text = segment.get("text", "")
        segment["scores"] = score_text(text)
    return segments


def select_top_segments(segments: List[Dict[str, Any]], top_n: int = 5) -> List[Dict[str, Any]]:
    """Return the top N highest-scoring segments, sorted by viral_score."""
    scored = score_segments(segments)
    scored.sort(key=lambda x: x["scores"]["viral_score"], reverse=True)
    selected = scored[:top_n]
    # Sort back by chronological order for final output.
    selected.sort(key=lambda x: x.get("start", 0.0))
    return selected
