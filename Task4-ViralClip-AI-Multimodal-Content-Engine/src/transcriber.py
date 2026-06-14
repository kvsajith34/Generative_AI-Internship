"""Transcription helpers: faster-whisper / OpenAI Whisper / demo fallback."""

import os
import re
from typing import Any, Dict, List, Tuple


# ---------------------------------------------------------------------------
# Demo transcript loader
# ---------------------------------------------------------------------------

def load_demo_transcript(file_path: str = "sample_media/demo_transcript.md") -> List[Dict[str, Any]]:
    """Load the built-in demo transcript and parse it into timestamped segments.

    Returns a list of dicts with keys: start (float), end (float), title (str), text (str).
    Returns an empty list if the file is missing.
    """
    if not os.path.exists(file_path):
        return []

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    segments: List[Dict[str, Any]] = []
    # Matches lines like: ## 00:00 - 00:45 — Introduction
    pattern = re.compile(r"##\s+(\d{1,2}:\d{2})\s+-\s+(\d{1,2}:\d{2})\s+—\s+(.+)")

    current_title: str = "Segment"
    current_start: float | None = None
    current_end: float = 0.0
    current_text_lines: List[str] = []

    def flush_segment() -> None:
        # Reads outer-scope variables — no nonlocal needed (we never assign to them here).
        if current_start is not None and current_text_lines:
            text = "\n".join(current_text_lines).strip()
            if text:
                segments.append({
                    "start": float(current_start),
                    "end": float(current_end),
                    "title": current_title,
                    "text": text,
                })

    for line in content.splitlines():
        match = pattern.match(line)
        if match:
            flush_segment()
            current_start = _time_to_seconds(match.group(1))
            current_end = _time_to_seconds(match.group(2))
            current_title = match.group(3).strip()
            current_text_lines = []
        elif current_start is not None and line.strip() and not line.startswith("#"):
            current_text_lines.append(line.strip())

    flush_segment()
    return segments


def _time_to_seconds(timestamp: str) -> float:
    """Convert a MM:SS or HH:MM:SS timestamp string to total seconds."""
    parts = timestamp.split(":")
    if len(parts) == 2:
        return int(parts[0]) * 60 + int(parts[1])
    if len(parts) == 3:
        return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
    return 0.0


# ---------------------------------------------------------------------------
# Backend detection
# ---------------------------------------------------------------------------

def get_transcriber_status() -> Tuple[bool, str]:
    """Return (is_available, backend_name) for the installed transcription library.

    Checks faster-whisper first (preferred), then openai-whisper.
    Uses ImportError — not the broader Exception — so real crashes are not swallowed.
    """
    try:
        import faster_whisper  # noqa: F401
        return True, "faster-whisper"
    except ImportError:
        pass

    try:
        import whisper  # noqa: F401
        return True, "openai-whisper"
    except ImportError:
        pass

    return False, "none"


# ---------------------------------------------------------------------------
# Transcription backends
# ---------------------------------------------------------------------------

def transcribe_with_faster_whisper(audio_path: str, model_size: str = "tiny") -> Dict[str, Any]:
    """Transcribe audio with faster-whisper on CPU.

    Returns a dict with keys: text (str), segments (list), language (str).
    """
    from faster_whisper import WhisperModel

    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    segments_iter, info = model.transcribe(audio_path, beam_size=5)

    output_segments: List[Dict[str, Any]] = []
    full_text: List[str] = []
    for segment in segments_iter:
        text = segment.text.strip()
        if text:
            output_segments.append({
                "start": float(segment.start),
                "end": float(segment.end),
                "title": "Transcribed segment",
                "text": text,
            })
            full_text.append(text)

    return {
        "text": " ".join(full_text),
        "segments": output_segments,
        "language": info.language,
    }


def transcribe_with_whisper(audio_path: str, model_size: str = "tiny") -> Dict[str, Any]:
    """Transcribe audio with OpenAI Whisper.

    Returns a dict with keys: text (str), segments (list).
    """
    import whisper

    model = whisper.load_model(model_size)
    result = model.transcribe(audio_path, verbose=False)
    return {
        "text": result.get("text", ""),
        "segments": result.get("segments", []),
    }


def transcribe_audio(audio_path: str, model_size: str = "tiny") -> Dict[str, Any]:
    """Transcribe using faster-whisper first, then OpenAI Whisper as a fallback.

    Raises RuntimeError if neither backend succeeds, with both error messages included.

    BUG FIX: Python 3 deletes exception variables when their except-block exits, so
    `faster_error` cannot be referenced in a later except-block.  The fix is to capture
    the error message in a plain string before leaving the first except-block.
    """
    faster_error_msg: str = ""

    try:
        return transcribe_with_faster_whisper(audio_path, model_size=model_size)
    except Exception as exc:
        faster_error_msg = str(exc)
        print(f"faster-whisper failed: {exc}")

    try:
        return transcribe_with_whisper(audio_path, model_size=model_size)
    except Exception as exc:
        raise RuntimeError(
            "No working transcription backend available. "
            f"faster-whisper error: {faster_error_msg}; "
            f"openai-whisper error: {exc}"
        ) from exc


# ---------------------------------------------------------------------------
# Normaliser
# ---------------------------------------------------------------------------

def normalize_whisper_segments(whisper_result: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Convert a Whisper result dict into the segment format used by the rest of the app.

    Both faster-whisper and openai-whisper results are handled; empty segments are skipped.
    """
    segments: List[Dict[str, Any]] = []
    for seg in whisper_result.get("segments", []):
        text = seg.get("text", "").strip()
        if text:
            segments.append({
                "start": float(seg.get("start", 0.0)),
                "end": float(seg.get("end", 0.0)),
                "title": seg.get("title", "Transcribed segment"),
                "text": text,
            })
    return segments
