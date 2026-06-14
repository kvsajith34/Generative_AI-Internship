# Workflow Explanation

This document explains the full ViralClip AI pipeline from raw media to finished reel assets.

---

## 1. Video/Audio Upload

The user uploads a media file through the Streamlit dashboard. Supported formats include:

- Video: `.mp4`, `.mov`
- Audio: `.mp3`, `.wav`, `.m4a`, `.flac`, `.aac`

If no media is available, the user can click **Load Demo Transcript** to use a built-in sample transcript.

---

## 2. Audio Extraction

If the uploaded file is a video, the app extracts its audio track.

- First attempt: **MoviePy** (`src/audio_extractor.py`)
- Fallback: **FFmpeg** command-line tool
- If extraction fails, the app shows a clear error and suggests demo mode.

---

## 3. Transcription

The audio file is transcribed into timestamped text.

- First choice: **OpenAI Whisper** (`src/transcriber.py`)
- Alternative: **faster-whisper** for faster CPU inference
- Fallback: built-in **demo transcript** loaded from `sample_media/demo_transcript.md`

The output is a list of segments, each containing `start`, `end`, `title`, and `text`.

---

## 4. Timestamped Transcript

The transcript is displayed in the app and saved as:

- `outputs/full_transcript.md`
- `outputs/full_transcript.json`

This becomes the foundation for all downstream analysis.

---

## 5. Viral Segment Scoring

`src/segment_selector.py` scores every segment across seven dimensions:

1. Hook strength
2. Emotional intensity
3. Educational value
4. Clarity
5. Shareability
6. Quote-worthiness
7. Short-form suitability

The scoring algorithm looks for viral keywords, emotional markers, quote-like phrasing, and ideal segment length.

---

## 6. Top 5 Segment Selection

The highest-scoring segments are selected and sorted back into chronological order. These become the 5 reel packages.

---

## 7. Content Generation

`src/content_generator.py` produces for each segment:

- Reel number
- Start/end timestamps
- Viral score
- Short summary
- Hook line
- Viral headline
- Social media caption
- Hashtags
- Suggested B-roll description
- Runway-ready B-roll prompt
- Suggested on-screen text

If no LLM API is configured, rule-based generation is used so the app works offline.

---

## 8. B-roll Prompt Generation

B-roll descriptions are converted into cinematic, Runway-ready prompts. These prompts are saved in:

- `outputs/broll_descriptions.md`
- `outputs/runway_broll_prompts.md`

The prompts are designed to be copied directly into Runway's Text to Video tool.

---

## 9. SRT Export

`src/srt_generator.py` creates subtitle files for each reel. The transcript excerpt is split into short cues distributed across the segment duration.

Output files:

- `outputs/subtitles/reel_1.srt`
- `outputs/subtitles/reel_2.srt`
- `outputs/subtitles/reel_3.srt`
- `outputs/subtitles/reel_4.srt`
- `outputs/subtitles/reel_5.srt`

---

## 10. Markdown and JSON Export

`src/export_utils.py` exports all generated assets in both Markdown and JSON formats for easy reading and programmatic use.

---

## Pipeline Diagram

```
Upload ──► Extract Audio ──► Transcribe ──► Timestamped Transcript
                                            │
                                            ▼
                              Viral Segment Scoring
                                            │
                                            ▼
                                   Top 5 Segments
                                            │
                                            ▼
                         Content Generation (hooks, captions, hashtags)
                                            │
                                            ▼
                              B-roll Prompt Generation
                                            │
                                            ▼
                              SRT Export + MD/JSON Outputs
```

---

## Summary

ViralClip AI turns a single long-form video into a complete short-form content package. Every step is modular, documented, and runnable in demo mode without paid APIs.
