"""Export generated content to Markdown and JSON files."""

import json
import os
from datetime import datetime
from typing import List, Dict, Any


def ensure_outputs_dir(base_dir: str = "outputs") -> str:
    """Create outputs directory if it does not exist."""
    os.makedirs(base_dir, exist_ok=True)
    os.makedirs(os.path.join(base_dir, "subtitles"), exist_ok=True)
    return base_dir


def save_json(data: Any, filename: str, base_dir: str = "outputs") -> str:
    """Save data as JSON."""
    path = os.path.join(base_dir, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    return path


def save_markdown(content: str, filename: str, base_dir: str = "outputs") -> str:
    """Save content as Markdown."""
    path = os.path.join(base_dir, filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return path


def format_full_transcript(segments: List[Dict[str, Any]]) -> str:
    """Format transcript segments as Markdown."""
    lines = ["# Full Transcript\n", f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"]
    for seg in segments:
        start = seg.get("start", 0.0)
        end = seg.get("end", 0.0)
        title = seg.get("title", "Segment")
        text = seg.get("text", "")
        lines.append(f"## [{start:.1f}s - {end:.1f}s] {title}\n")
        lines.append(f"{text}\n")
    return "\n".join(lines)


def format_viral_segments(segments: List[Dict[str, Any]]) -> str:
    """Format viral segments as Markdown."""
    lines = ["# Top Viral Segments\n"]
    for idx, seg in enumerate(segments, start=1):
        scores = seg.get("scores", {})
        lines.append(f"## Reel {idx}")
        lines.append(f"- **Start:** {seg.get('start', 0.0):.1f}s")
        lines.append(f"- **End:** {seg.get('end', 0.0):.1f}s")
        lines.append(f"- **Viral Score:** {scores.get('viral_score', 0.0)}")
        lines.append(f"- **Hook Strength:** {scores.get('hook_strength', 0.0)}")
        lines.append(f"- **Emotional Intensity:** {scores.get('emotional_intensity', 0.0)}")
        lines.append(f"- **Educational Value:** {scores.get('educational_value', 0.0)}")
        lines.append(f"- **Clarity:** {scores.get('clarity', 0.0)}")
        lines.append(f"- **Shareability:** {scores.get('shareability', 0.0)}")
        lines.append(f"- **Quote-Worthiness:** {scores.get('quote_worthiness', 0.0)}")
        lines.append(f"- **Short-Form Suitability:** {scores.get('short_form_suitability', 0.0)}")
        lines.append(f"\n**Excerpt:** {seg.get('text', '')}\n")
    return "\n".join(lines)


def format_reel_packages(packages: List[Dict[str, Any]]) -> str:
    """Format full reel packages as Markdown."""
    lines = ["# Reel Packages\n"]
    for reel in packages:
        lines.append(f"## Reel {reel.get('reel_number', 1)}")
        lines.append(f"- **Time:** {reel.get('start_time')} → {reel.get('end_time')}")
        lines.append(f"- **Viral Score:** {reel.get('viral_score')}")
        lines.append(f"- **Hook:** {reel.get('hook_line')}")
        lines.append(f"- **Headline:** {reel.get('viral_headline')}")
        lines.append(f"- **Summary:** {reel.get('short_summary')}")
        lines.append(f"\n### Caption\n{reel.get('social_media_caption')}")
        lines.append(f"\n### Hashtags\n{' '.join(reel.get('hashtags', []))}")
        lines.append(f"\n### B-roll Description\n{reel.get('suggested_broll_description')}")
        lines.append(f"\n### Runway Prompt\n{reel.get('runway_ready_broll_prompt')}")
        lines.append(f"\n### On-Screen Text\n{reel.get('suggested_on_screen_text')}")
        lines.append(f"\n### Transcript Excerpt\n{reel.get('transcript_excerpt')}\n")
    return "\n".join(lines)


def format_captions_and_hashtags(packages: List[Dict[str, Any]]) -> str:
    """Format captions and hashtags as Markdown."""
    lines = ["# Captions and Hashtags\n"]
    for reel in packages:
        lines.append(f"## Reel {reel.get('reel_number', 1)}")
        lines.append(f"**Headline:** {reel.get('viral_headline')}\n")
        lines.append(f"{reel.get('social_media_caption')}\n")
        lines.append(f"**Hashtags:** {' '.join(reel.get('hashtags', []))}\n")
    return "\n".join(lines)


def format_broll_descriptions(packages: List[Dict[str, Any]]) -> str:
    """Format B-roll descriptions as Markdown."""
    lines = ["# Suggested B-roll Descriptions\n"]
    for reel in packages:
        lines.append(f"## Reel {reel.get('reel_number', 1)}")
        lines.append(f"**Time:** {reel.get('start_time')} → {reel.get('end_time')}\n")
        lines.append(f"{reel.get('suggested_broll_description')}\n")
    return "\n".join(lines)


def format_runway_prompts(packages: List[Dict[str, Any]]) -> str:
    """Format Runway-ready prompts as Markdown."""
    lines = ["# Runway-Ready B-roll Prompts\n"]
    lines.append("Copy each prompt into Runway's Text to Video tool to generate a 5-second B-roll clip.\n")
    for reel in packages:
        lines.append(f"## Reel {reel.get('reel_number', 1)}")
        lines.append(f"**On-screen topic:** {reel.get('suggested_on_screen_text')}\n")
        lines.append(f"```\n{reel.get('runway_ready_broll_prompt')}\n```\n")
    return "\n".join(lines)


def export_all_outputs(
    segments: List[Dict[str, Any]],
    top_segments: List[Dict[str, Any]],
    reel_packages: List[Dict[str, Any]],
    base_dir: str = "outputs",
) -> Dict[str, str]:
    """Export all generated assets to Markdown and JSON files."""
    ensure_outputs_dir(base_dir)
    saved = {}

    # Full transcript.
    saved["full_transcript_md"] = save_markdown(
        format_full_transcript(segments), "full_transcript.md", base_dir
    )
    saved["full_transcript_json"] = save_json(
        segments, "full_transcript.json", base_dir
    )

    # Viral segments.
    saved["viral_segments_md"] = save_markdown(
        format_viral_segments(top_segments), "viral_segments.md", base_dir
    )
    saved["viral_segments_json"] = save_json(
        top_segments, "viral_segments.json", base_dir
    )

    # Reel packages.
    saved["reel_packages_md"] = save_markdown(
        format_reel_packages(reel_packages), "reel_packages.md", base_dir
    )
    saved["reel_packages_json"] = save_json(
        reel_packages, "reel_packages.json", base_dir
    )

    # Captions and hashtags.
    saved["captions_and_hashtags_md"] = save_markdown(
        format_captions_and_hashtags(reel_packages), "captions_and_hashtags.md", base_dir
    )

    # B-roll descriptions.
    saved["broll_descriptions_md"] = save_markdown(
        format_broll_descriptions(reel_packages), "broll_descriptions.md", base_dir
    )

    # Runway prompts.
    saved["runway_broll_prompts_md"] = save_markdown(
        format_runway_prompts(reel_packages), "runway_broll_prompts.md", base_dir
    )

    return saved
