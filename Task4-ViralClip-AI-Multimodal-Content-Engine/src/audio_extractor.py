"""Audio extraction helpers for uploaded video/audio files.

This version is Windows-friendly and handles both MoviePy 1.x and 2.x:
- Accepts audio files directly (no extraction needed).
- Uses imageio-ffmpeg's bundled FFmpeg binary when available, so FFmpeg does not
  need to be on the system PATH.
- Converts video audio to 16 kHz mono PCM WAV, which is optimal for Whisper /
  faster-whisper.
- MoviePy is only a fallback; FFmpeg is always tried first.
"""

import os
import subprocess
import tempfile
import uuid
from pathlib import Path
from typing import Optional

# .webm is intentionally in AUDIO_EXTENSIONS because audio-only WebM files are
# common and can be fed to Whisper directly.  A video .webm uploaded through the
# file-uploader will also be caught here; Whisper/ffmpeg can usually decode it.
AUDIO_EXTENSIONS = {".mp3", ".wav", ".m4a", ".flac", ".aac", ".ogg", ".webm"}
VIDEO_EXTENSIONS = {".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v"}


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _unique_output_path(input_path: Path) -> str:
    """Return a collision-free temp path for the extracted WAV file."""
    safe_stem = "".join(
        ch if ch.isalnum() or ch in ("-", "_") else "_"
        for ch in input_path.stem
    )[:50]
    return os.path.join(tempfile.gettempdir(), f"viralclip_{safe_stem}_{uuid.uuid4().hex[:8]}.wav")


def _get_ffmpeg_binary() -> str:
    """Return an FFmpeg executable path.

    Prefers imageio-ffmpeg's bundled binary (no PATH requirement on Windows).
    Falls back to the system `ffmpeg` command.
    """
    try:
        import imageio_ffmpeg  # noqa: F401
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return "ffmpeg"


# ---------------------------------------------------------------------------
# Extraction backends
# ---------------------------------------------------------------------------

def extract_audio_with_ffmpeg(video_path: str, output_audio_path: str) -> bool:
    """Extract audio to a 16 kHz mono WAV using FFmpeg or imageio-ffmpeg.

    Returns True only if the output file exists and is non-empty.
    """
    try:
        ffmpeg_bin = _get_ffmpeg_binary()
        command = [
            ffmpeg_bin,
            "-y",
            "-i", video_path,
            "-vn",          # drop video stream
            "-ac", "1",     # mono
            "-ar", "16000", # 16 kHz — optimal for Whisper
            "-acodec", "pcm_s16le",
            output_audio_path,
        ]
        subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True,
        )
        return os.path.exists(output_audio_path) and os.path.getsize(output_audio_path) > 0
    except Exception as exc:
        print(f"FFmpeg audio extraction failed: {exc}")
        return False


def extract_audio_with_moviepy(video_path: str, output_audio_path: str) -> bool:
    """Extract audio from a video file using MoviePy (1.x or 2.x).

    Tries the full PCM WAV write first; falls back to a minimal parameter set
    for MoviePy 2.x which removed the `nbytes` argument.

    Returns True only if the output file exists and is non-empty.
    """
    clip = None
    audio = None
    try:
        try:
            from moviepy.editor import VideoFileClip  # MoviePy 1.x
        except ImportError:
            from moviepy import VideoFileClip         # MoviePy 2.x

        clip = VideoFileClip(video_path)
        audio = getattr(clip, "audio", None)
        if audio is None:
            return False

        # PCM WAV is reliable for transcription models.
        # `nbytes` was removed in MoviePy 2.x → catch TypeError and retry.
        try:
            audio.write_audiofile(
                output_audio_path,
                fps=16000,
                nbytes=2,
                codec="pcm_s16le",
                logger=None,
            )
        except TypeError:
            # MoviePy 2.x: drop the removed `nbytes` parameter.
            audio.write_audiofile(
                output_audio_path,
                fps=16000,
                codec="pcm_s16le",
                logger=None,
            )

        return os.path.exists(output_audio_path) and os.path.getsize(output_audio_path) > 0

    except Exception as exc:
        print(f"MoviePy audio extraction failed: {exc}")
        return False
    finally:
        # Always release resources, even if an exception occurred.
        try:
            if audio is not None:
                audio.close()
        except Exception:
            pass
        try:
            if clip is not None:
                clip.close()
        except Exception:
            pass


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def extract_audio(media_path: str) -> Optional[str]:
    """Return a path to an audio file suitable for Whisper transcription.

    - Audio files are returned as-is (no extraction required).
    - Video files have their audio track extracted to a temp WAV file.
    - FFmpeg is tried first (faster, more codec support); MoviePy is the fallback.
    - Returns None if extraction fails or the extension is unsupported.
    """
    path = Path(media_path)
    if not path.exists():
        print(f"Input file does not exist: {media_path}")
        return None

    ext = path.suffix.lower()

    # Audio files can be fed directly to faster-whisper / Whisper.
    if ext in AUDIO_EXTENSIONS:
        return str(path)

    if ext not in VIDEO_EXTENSIONS:
        print(f"Unsupported media extension: {ext}")
        return None

    output_audio_path = _unique_output_path(path)

    # FFmpeg first — faster and supports more codecs than MoviePy.
    if extract_audio_with_ffmpeg(str(path), output_audio_path):
        return output_audio_path

    # MoviePy fallback — useful when FFmpeg is not on PATH but imageio-ffmpeg is absent.
    if extract_audio_with_moviepy(str(path), output_audio_path):
        return output_audio_path

    return None
