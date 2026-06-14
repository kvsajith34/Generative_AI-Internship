"""Generate SRT subtitle files for reel segments."""

import os
from typing import List, Dict, Any

from src.utils import seconds_to_timestamp


def generate_srt_for_segment(segment_text: str, start_time: float, end_time: float) -> str:
    """Generate SRT content for a single reel segment.

    The text is split into short subtitle cues of ~5 words each,
    distributed across the segment duration.
    """
    words = segment_text.split()
    if not words:
        return ""

    total_duration = max(1.0, end_time - start_time)
    words_per_cue = 5
    cues = []
    cue_index = 1

    for i in range(0, len(words), words_per_cue):
        cue_words = words[i:i + words_per_cue]
        cue_text = " ".join(cue_words)

        # Estimate time positions.
        cue_start = start_time + (i / len(words)) * total_duration
        cue_end = start_time + (min(i + words_per_cue, len(words)) / len(words)) * total_duration

        # Ensure minimum duration.
        if cue_end - cue_start < 0.5:
            cue_end = cue_start + 0.5

        cues.append(
            f"{cue_index}\n"
            f"{seconds_to_timestamp(cue_start)} --> {seconds_to_timestamp(cue_end)}\n"
            f"{cue_text}\n"
        )
        cue_index += 1

    return "\n".join(cues)


def save_subtitles_for_reels(reel_packages: List[Dict[str, Any]], output_dir: str = "outputs/subtitles") -> List[str]:
    """Save an SRT file for each reel package."""
    os.makedirs(output_dir, exist_ok=True)
    saved_paths = []

    for reel in reel_packages:
        reel_num = reel.get("reel_number", 1)
        srt_content = generate_srt_for_segment(
            reel.get("transcript_excerpt", ""),
            reel.get("start_seconds", 0.0),
            reel.get("end_seconds", 0.0),
        )
        file_path = os.path.join(output_dir, f"reel_{reel_num}.srt")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(srt_content)
        saved_paths.append(file_path)

    return saved_paths
