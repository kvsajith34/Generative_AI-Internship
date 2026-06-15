# ViralClip AI

> Transform long-form videos into viral short-form content — automatically.

![Python 3.10+](https://img.shields.io/badge/Python-3.10+-3776ab?logo=python&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-1.30+-FF4B4B?logo=streamlit&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

ViralClip AI is a production-ready Python application that ingests long-form video, identifies the most shareable moments via heuristic scoring, and generates complete reel packages — hooks, headlines, captions, hashtags, B-roll prompts, and SRT subtitles — ready for TikTok, Instagram Reels, and YouTube Shorts. No external API keys required.

---

## Features

| | |
|---|---|
| ⚡ **One-Click Processing** | Upload a video and receive 5 complete reel packages in minutes |
| 🧠 **7-Dimensional Viral Scoring** | Heuristic engine scores each segment across hook strength, emotional intensity, clarity, shareability, and more |
| 📦 **Complete Content Packages** | Hook lines, headlines, captions, hashtags, B-roll descriptions, and on-screen text per reel |
| 🎬 **Runway ML Integration** | Cinematic B-roll prompts pre-formatted for Runway's Text-to-Video pipeline |
| 📝 **SRT Subtitle Generation** | Synchronized subtitle files generated for all 5 reel segments |
| 🖥️ **Offline Demo Mode** | Fully functional without Whisper or FFmpeg — load a sample transcript and explore the entire workflow |
| 📁 **Structured Exports** | Markdown, JSON, and SRT output formats out of the box |

---

## Quick Start

```bash
git clone https://github.com/kvsajith34/Generative_AI-Internship.git
cd Generative_AI-Internship/Task4-ViralClip-AI-Multimodal-Content-Engine

python -m venv venv && source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

streamlit run app.py
```

Open `http://localhost:8501`. Click **Load Demo Transcript** for an instant offline walkthrough, or upload your own video file to run the full pipeline.

> **FFmpeg note:** Bundled via `imageio-ffmpeg` — no manual installation needed.

---

## Pipeline

```
Input Video / Audio
       │
       ▼
Audio Extraction  ──  MoviePy / FFmpeg
       │
       ▼
Transcription  ──  faster-whisper (fallback: OpenAI Whisper)
       │
       ▼
Viral Scoring Engine  ──  7-Dimensional Heuristic Analysis
       │
       ▼
Top 5 Segments Selected
       │
       ▼
Content Generation
  ├── Hook Lines & Headlines
  ├── Social Captions & Hashtags
  ├── B-roll Descriptions
  └── Runway-Ready Prompts
       │
       ▼
Export  ──  Markdown · JSON · SRT
```

### Scoring Dimensions

Each segment is scored 0–10 across seven independent axes:

| Dimension | What It Detects |
|---|---|
| Hook Strength | Opening lines, curiosity triggers, pattern breaks |
| Emotional Intensity | Emotional language, punctuation emphasis |
| Educational Value | Step-by-step and instructional phrasing |
| Clarity | Optimal length, simple structure |
| Shareability | Standalone value, quote-worthy phrasing |
| Quote-Worthiness | Crisp, memorable conclusions |
| Short-Form Suitability | Information density, platform fit |

**Composite Viral Score** = weighted average across all seven dimensions.

---

## Sample Output

```json
{
  "reel_number": 1,
  "start_time": "00:01:51",
  "end_time": "00:03:00",
  "viral_score": 9.2,
  "hook_line": "I spent 6 hours on a reel that got 400 views. Then I changed everything.",
  "viral_headline": "How I Create 30 Reels in 2 Hours With AI",
  "social_media_caption": "What part of your workflow needs the most help? Drop a comment.",
  "hashtags": ["#AICreator", "#ContentCreation", "#ShortFormContent"],
  "runway_ready_broll_prompt": "Cinematic 5-second B-roll. Close-up of a frustrated creator staring at a complex editing timeline. Dim room, blue glow from screen. Shallow depth of field, 4K, editorial style.",
  "suggested_on_screen_text": "30 reels in 2 hours"
}
```

---

## Tech Stack

| Component | Technology |
|---|---|
| Dashboard | Streamlit 1.30+ |
| Language | Python 3.10+ |
| Audio Extraction | MoviePy · FFmpeg · imageio-ffmpeg |
| Transcription | faster-whisper · OpenAI Whisper |
| Exports | Markdown · JSON · SRT |

---

## Project Structure

```
├── app.py                       # Streamlit dashboard — UI, routing, session state
├── requirements.txt             # Python dependencies
├── .env.example                 # Environment variable template for optional LLM keys
│
├── src/                         # Core processing pipeline
│   ├── audio_extractor.py       # FFmpeg / MoviePy audio extraction to 16kHz WAV
│   ├── transcriber.py           # Whisper transcription with timestamped segments
│   ├── segment_selector.py      # 7-dimensional heuristic viral scoring engine
│   ├── content_generator.py     # Hook, headline, caption, hashtag, and B-roll generation
│   ├── srt_generator.py         # SRT subtitle file builder (one file per reel)
│   └── export_utils.py          # Markdown, JSON, and SRT file export helpers
│
├── prompts/                     # Prompt templates for scoring and content generation
│   ├── system_prompt.md         # Base system instructions for LLM-assisted mode
│   ├── viral_segment_prompt.md  # Segment scoring prompt
│   ├── headlines_prompt.md      # Hook and headline generation prompt
│   ├── captions_prompt.md       # Social caption and hashtag prompt
│   └── runway_prompting_guide.md# B-roll cinematic prompt style guide
│
├── outputs/                     # Auto-generated content (git-ignored)
│   ├── full_transcript.md/.json # Timestamped transcript from Whisper
│   ├── viral_segments.md/.json  # Top 5 scored segments with composite scores
│   ├── reel_packages.md/.json   # Complete reel content packages
│   ├── runway_broll_prompts.md  # Ready-to-paste Runway ML prompts
│   └── subtitles/               # reel_1.srt … reel_5.srt
│
├── docs/                        # Project documentation and reports
│   ├── workflow_explanation.md  # End-to-end pipeline walkthrough
│   ├── runway_workflow.md       # Step-by-step Runway ML integration guide
│   └── limitations.md          # Known constraints and workarounds
│
└── sample_media/                # Offline demo assets
    ├── demo_transcript.md       # Pre-built transcript for demo mode
    └── Sample_video.mp4         # Reference video for local testing
```

---

## Optional LLM Integration

The app runs fully offline using rule-based generation. To enable LLM-assisted output, add a `.env` file:

```env
OPENAI_API_KEY=sk-your-key-here
ANTHROPIC_API_KEY=sk-ant-your-key-here
```
---
## Multimodal Workflow Diagram

```
┌─────────────────┐
│  Upload Video   │
│  or Audio File  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Audio Extraction│
│ (MoviePy/FFmpeg)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Transcription   │
│ (Whisper)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Timestamped     │
│ Transcript      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Viral Segment   │
│ Scoring         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Top 5 Segments  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Content Gen     │
│ Captions/Heads  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ B-roll Prompts  │
│ Runway-ready    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ SRT Export +    │
│ MD/JSON Outputs │
└─────────────────┘
```

---

## Author

**Venkata Sai Ajith Kancheti** — [GitHub](https://github.com/kvsajith34)

<p align="center"><sub>Built for creators who work smarter, not harder.</sub></p>
