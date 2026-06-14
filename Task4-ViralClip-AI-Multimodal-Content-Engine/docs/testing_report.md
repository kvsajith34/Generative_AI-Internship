# Testing Report

This report documents the manual tests performed on ViralClip AI.

---

## Test Environment

- **OS:** Windows 11 / macOS Sonoma / Ubuntu 22.04
- **Python:** 3.10+
- **Streamlit:** 1.30+
- **Test date:** 2026-01-10

---

## Test Checklist

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1 | App launches with `streamlit run app.py` | Streamlit dashboard opens in browser | ✅ Pass |
| 2 | Demo mode works by clicking **Load Demo Transcript** | 10 segments load and process without errors | ✅ Pass |
| 3 | Demo mode works without API key | No API key required; all outputs generated | ✅ Pass |
| 4 | Full transcript loads and displays | Transcript preview section shows timestamped text | ✅ Pass |
| 5 | Viral segments are generated | Top 5 segments table appears with scores | ✅ Pass |
| 6 | 5 reel packages are generated | Reel package cards 1–5 displayed | ✅ Pass |
| 7 | Captions and hashtags generated | Each reel shows caption and hashtags | ✅ Pass |
| 8 | B-roll descriptions generated | B-roll section shows scene descriptions | ✅ Pass |
| 9 | Runway-ready prompts generated | 5 polished prompts displayed and exported | ✅ Pass |
| 10 | 5 SRT files generated | `outputs/subtitles/reel_1.srt` through `reel_5.srt` exist | ✅ Pass |
| 11 | Markdown outputs exported | `outputs/*.md` files created | ✅ Pass |
| 12 | JSON outputs exported | `outputs/*.json` files created | ✅ Pass |
| 13 | File upload UI accepts video/audio | File uploader accepts supported formats | ✅ Pass |
| 14 | Missing Whisper handled gracefully | Clear message appears suggesting demo mode | ✅ Pass |
| 15 | Missing FFmpeg/MoviePy handled gracefully | Clear error appears; app does not crash | ✅ Pass |

---

## Notes

- Demo mode is the fastest way to verify the entire pipeline.
- Whisper transcription speed depends on hardware and model size.
- FFmpeg must be on the system PATH for audio extraction fallback.

---

## Conclusion

All critical tests pass. The app is ready for portfolio submission and GitHub publication.
