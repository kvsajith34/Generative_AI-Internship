"""Rule-based content generation for reel packages.

If an LLM API key is provided, this module could be extended to call the API.
By default, it generates high-quality rule-based content that works offline.
"""

from typing import List, Dict, Any

from src.utils import seconds_to_timestamp


def _extract_key_sentence(text: str) -> str:
    """Pick the most content-rich sentence from a segment."""
    sentences = [s.strip() for s in text.replace("\n", " ").split(".") if s.strip()]
    if not sentences:
        return text
    # Prefer the longest sentence that is not too long.
    sentences.sort(key=lambda s: abs(40 - len(s)), reverse=False)
    return sentences[0]


def _make_hook(segment: Dict[str, Any]) -> str:
    """Generate a short hook line from a segment."""
    text = segment.get("text", "")
    lower = text.lower()

    if "mistake" in lower:
        return "The biggest mistake I made as a creator — and how I fixed it."
    if "secret" in lower or "workflow" in lower:
        return "This AI workflow saves me hours every single week."
    if "six hours" in lower or "400 views" in lower:
        return "I spent 6 hours on a reel that got 400 views. Then I changed everything."
    if "transcription" in lower or "whisper" in lower:
        return "Step 1 of my AI content system: turn every video into searchable text."
    if "hook" in lower:
        return "A great clip is useless without a hook. Here is my formula."
    if "b-roll" in lower or "runway" in lower:
        return "This is how I generate cinematic B-roll with AI prompts."
    if "burn out" in lower or "perfect" in lower:
        return "Stop trying to make every reel perfect. A good system beats perfection."

    key_sentence = _extract_key_sentence(text)
    if len(key_sentence) < 80:
        return key_sentence.capitalize() + "."
    return "This one insight changed how I think about content creation."


def _make_headline(segment: Dict[str, Any]) -> str:
    """Generate a viral headline for a segment."""
    text = segment.get("text", "")
    lower = text.lower()

    if "mistake" in lower:
        return "The #1 Mistake That Kills Creator Growth"
    if "workflow" in lower and "two hours" in lower:
        return "How I Create 30 Reels in 2 Hours With AI"
    if "transcription" in lower:
        return "Why Every Creator Should Transcribe Their Videos First"
    if "viral moments" in lower or "score" in lower:
        return "How to Find Viral Moments in Any Long-Form Video"
    if "hook" in lower:
        return "The Hook Formula Behind Every Viral Reel"
    if "b-roll" in lower or "runway" in lower:
        return "How to Generate Pro B-Roll With Runway AI Prompts"
    if "burn out" in lower or "perfect" in lower:
        return "Perfection Is Killing Your Content. Build a System Instead."

    return "The AI Workflow Every Solo Creator Needs in 2025"


def _make_caption(segment: Dict[str, Any], headline: str, hook: str) -> str:
    """Generate a social media caption."""
    text = segment.get("text", "")
    lower = text.lower()

    if "mistake" in lower:
        body = "I learned this the hard way. If you are still editing every reel manually, this post is for you."
    elif "workflow" in lower:
        body = "The full breakdown of the AI workflow I use to scale short-form content without burning out."
    elif "transcription" in lower:
        body = "Transcription turns your videos into a content database. Here is why it is the first step I never skip."
    elif "hook" in lower:
        body = "Your hook is the gateway to every view. Use contrast, numbers, and curiosity."
    elif "b-roll" in lower:
        body = "Good B-roll keeps viewers watching. Great B-roll is planned before you ever hit record."
    elif "perfect" in lower or "burn out" in lower:
        body = "A published reel beats a perfect reel that never sees the light of day."
    else:
        body = "This segment is packed with actionable advice. Save it for later."

    return f"{headline}\n\n{hook}\n\n{body}\n\nWhat part of your workflow needs the most help? Drop a comment."


def _make_hashtags(segment: Dict[str, Any]) -> List[str]:
    """Generate relevant hashtags."""
    base = ["#AICreator", "#ContentCreation", "#ShortFormContent", "#ViralClipAI"]
    text = segment.get("text", "").lower()

    if "workflow" in text:
        base.append("#AIWorkflow")
    if "productivity" in text or "save time" in text:
        base.append("#Productivity")
    if "b-roll" in text or "runway" in text:
        base.append("#RunwayAI")
    if "mistake" in text:
        base.append("#CreatorTips")
    if "hook" in text:
        base.append("#ViralHooks")
    if "transcription" in text:
        base.append("#Whisper")

    # Keep only unique hashtags, max 8.
    seen = set()
    unique = []
    for tag in base:
        if tag not in seen:
            seen.add(tag)
            unique.append(tag)
    return unique[:8]


def _make_broll_description(segment: Dict[str, Any]) -> str:
    """Generate an AI-suggested B-roll scene description."""
    text = segment.get("text", "").lower()

    if "mistake" in text:
        return "Close-up of a frustrated creator staring at a complex editing timeline on a large monitor. Dim room, blue glow from the screen."
    if "workflow" in text:
        return "Clean modern desk setup with two monitors showing a content calendar and an AI transcription panel. Soft natural light."
    if "transcription" in text:
        return "Abstract visualization of audio waves turning into glowing text on a dark background. Futuristic blue accent lighting."
    if "hook" in text:
        return "Bold animated text appearing on screen word by word against a high-contrast black background. Fast cuts."
    if "b-roll" in text or "runway" in text:
        return "Cinematic drone shot of a sleek creative workspace, transitioning to a close-up of hands typing a prompt into Runway."
    if "perfect" in text or "burn out" in text:
        return "A calm morning scene: coffee, notebook, and phone on a wooden desk. Warm sunrise light through a window."

    return "Medium shot of a creator talking directly to camera with a soft blurred background. Clean, minimal, professional."


def _make_runway_prompt(broll_description: str) -> str:
    """Convert a B-roll description into a polished Runway-ready prompt."""
    return (
        f"Cinematic 5-second B-roll clip. {broll_description} "
        "Smooth camera motion, shallow depth of field, professional color grading, "
        "soft ambient lighting, 4K, highly detailed, editorial style."
    )


def _make_on_screen_text(segment: Dict[str, Any], hook: str) -> str:
    """Suggest short on-screen text for the reel."""
    text = segment.get("text", "").lower()

    if "mistake" in text:
        return "Biggest mistake creators make"
    if "workflow" in text:
        return "30 reels in 2 hours"
    if "transcription" in text:
        return "Start with transcription"
    if "hook" in text:
        return "Hook = contrast + number + curiosity"
    if "b-roll" in text:
        return "Plan B-roll before editing"
    if "perfect" in text or "burn out" in text:
        return "Done > perfect"

    # Default: shorten the hook.
    if len(hook) <= 50:
        return hook
    return "Save this tip"


def generate_reel_package(reel_number: int, segment: Dict[str, Any]) -> Dict[str, Any]:
    """Generate a complete reel package from a transcript segment."""
    hook = _make_hook(segment)
    headline = _make_headline(segment)
    caption = _make_caption(segment, headline, hook)
    hashtags = _make_hashtags(segment)
    broll = _make_broll_description(segment)
    runway_prompt = _make_runway_prompt(broll)
    on_screen = _make_on_screen_text(segment, hook)

    return {
        "reel_number": reel_number,
        "start_time": seconds_to_timestamp(segment.get("start", 0.0)),
        "start_seconds": segment.get("start", 0.0),
        "end_time": seconds_to_timestamp(segment.get("end", 0.0)),
        "end_seconds": segment.get("end", 0.0),
        "viral_score": segment.get("scores", {}).get("viral_score", 0.0),
        "transcript_excerpt": segment.get("text", ""),
        "short_summary": _extract_key_sentence(segment.get("text", "")).capitalize() + ".",
        "hook_line": hook,
        "viral_headline": headline,
        "social_media_caption": caption,
        "hashtags": hashtags,
        "suggested_broll_description": broll,
        "runway_ready_broll_prompt": runway_prompt,
        "suggested_on_screen_text": on_screen,
    }


def generate_all_reel_packages(segments: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Generate reel packages for the selected segments."""
    packages = []
    for idx, segment in enumerate(segments, start=1):
        packages.append(generate_reel_package(idx, segment))
    return packages
