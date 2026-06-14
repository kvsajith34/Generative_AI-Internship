# Limitations

This document lists the known limitations of ViralClip AI and how to work around them.

---

## 1. Whisper Accuracy Depends on Audio Quality

Whisper performs best on clean audio with minimal background noise. Poor audio quality, heavy accents, overlapping speakers, or music can reduce transcription accuracy.

**Workaround:** Use a high-quality microphone, reduce background noise, or manually clean the transcript before processing.

---

## 2. Timestamps May Need Manual Review

Auto-generated timestamps are approximate. The start and end of a viral segment may not align perfectly with natural pauses or sentence boundaries.

**Workaround:** Review the exported SRT files and reel package timestamps in your video editor before finalizing.

---

## 3. Viral Scoring Is Heuristic

The scoring algorithm uses keyword matching and simple heuristics. It cannot fully replace human creative judgment.

**Workaround:** Use the scores as a starting point and manually adjust which segments become reels.

---

## 4. Runway Clips Are Generated Externally

ViralClip AI prepares B-roll prompts but does not call the Runway API or generate video clips itself.

**Workaround:** Copy the prompts into Runway ML and generate clips manually. See `docs/runway_workflow.md` for instructions.

---

## 5. Copyrighted Videos Should Not Be Used Without Permission

Uploading copyrighted content without permission may violate platform terms and copyright law.

**Workaround:** Only process videos you own or have explicit rights to use.

---

## 6. Generated Captions Need Human Review Before Publishing

Automated captions and headlines may contain awkward phrasing, context errors, or platform-specific issues.

**Workaround:** Always review and edit captions, hashtags, and on-screen text before posting.

---

## 7. Optional Dependencies Are Required for Full Functionality

Whisper, MoviePy, and FFmpeg are optional but required for real video/audio processing.

**Workaround:** Install the dependencies listed in `requirements.txt` or use demo mode.

---

## 8. LLM Support Is Optional

The app works fully offline with rule-based generation. LLM integration is optional and requires an API key.

**Workaround:** For higher-quality creative output, configure an optional API key in `.env`.

---

## Summary

ViralClip AI is designed to accelerate short-form content creation, not to replace human judgment. Use it as a powerful first draft generator and refine the outputs before publishing.
