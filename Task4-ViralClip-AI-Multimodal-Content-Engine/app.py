"""ViralClip AI — Streamlit dashboard entry point."""

import os
import sys

import streamlit as st
from dotenv import load_dotenv

# Load optional .env file.
load_dotenv()

# Ensure src modules are importable when running from the project root.
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from src.audio_extractor import extract_audio
from src.transcriber import (
    load_demo_transcript,
    normalize_whisper_segments,
    transcribe_audio,
    get_transcriber_status,
)
from src.segment_selector import select_top_segments
from src.content_generator import generate_all_reel_packages
from src.srt_generator import save_subtitles_for_reels
from src.export_utils import export_all_outputs


# ---------------------------------------------------------------------------
# Pipeline helper
# ---------------------------------------------------------------------------

def process_transcript(segments: list) -> dict:
    """Run the full reel-generation pipeline on transcript segments."""
    if not segments:
        raise ValueError(
            "No transcript segments were generated. "
            "Try a clearer/shorter file or use Demo Mode."
        )
    top_segments = select_top_segments(segments, top_n=5)
    reel_packages = generate_all_reel_packages(top_segments)
    exported = export_all_outputs(segments, top_segments, reel_packages)
    subtitle_paths = save_subtitles_for_reels(reel_packages)
    return {
        "top_segments": top_segments,
        "reel_packages": reel_packages,
        "exported": exported,
        "subtitle_paths": subtitle_paths,
    }


# ---------------------------------------------------------------------------
# Main app
# ---------------------------------------------------------------------------

def main():
    st.set_page_config(
        page_title="ViralClip AI",
        page_icon="🎬",
        layout="wide",
        initial_sidebar_state="expanded",
    )

    st.title("🎬 ViralClip AI")
    st.subheader("Multimodal Reel Generation Workflow")
    st.markdown(
        "Turn a long-form video or audio file into **5 short-form reel packages** "
        "with captions, headlines, hashtags, B-roll prompts, and SRT subtitles."
    )

    # Detect the transcription backend once per page load.
    transcriber_ok, transcriber_name = get_transcriber_status()

    # Sidebar -------------------------------------------------------------------
    with st.sidebar:
        st.header("Workflow Steps")
        st.markdown(
            """
            1. Upload or load demo
            2. Extract audio if video
            3. Transcribe with faster-whisper / Whisper
            4. Detect viral segments
            5. Generate reel packages
            6. Export SRT + MD + JSON
            """
        )
        st.divider()
        st.write(f"**Transcription backend:** `{transcriber_name}`")
        model_size = st.selectbox("Whisper model", ["tiny", "base", "small"], index=0)
        st.info(
            "For first tests, use a short MP4/MP3 under 2 minutes and the `tiny` model. "
            "Longer videos can take several minutes on CPU."
        )
        st.divider()
        st.info(
            "💡 **Runway Note:** This app generates polished Runway-ready prompts. "
            "Paste them into [Runway ML](https://runwayml.com) Text-to-Video to create clips."
        )

    # State initialisation ------------------------------------------------------
    if "segments" not in st.session_state:
        st.session_state.segments = None
    if "result" not in st.session_state:
        st.session_state.result = None
    if "error_message" not in st.session_state:
        st.session_state.error_message = None

    # Upload / demo section -----------------------------------------------------
    st.header("1. Upload Media or Load Demo")
    col1, col2 = st.columns(2)

    with col1:
        uploaded_file = st.file_uploader(
            "Upload a video or audio file",
            type=["mp4", "mov", "avi", "mkv", "webm", "mp3", "wav", "m4a", "flac", "aac", "ogg"],
        )

    with col2:
        st.markdown("**Demo Mode** — no dependencies or API key required.")
        if st.button("🚀 Load Demo Transcript", use_container_width=True):
            try:
                with st.spinner("Loading demo transcript..."):
                    st.session_state.segments = load_demo_transcript()
                    st.session_state.result = process_transcript(st.session_state.segments)
                    st.session_state.error_message = None
                st.success(f"Loaded {len(st.session_state.segments)} demo segments.")
            except Exception as exc:
                st.session_state.error_message = f"Demo processing failed: {exc}"

    # Process uploaded file -----------------------------------------------------
    if uploaded_file is not None:
        if st.button("▶️ Process Uploaded File", use_container_width=True):
            try:
                with st.spinner("Saving uploaded file..."):
                    temp_dir = os.path.join(os.getcwd(), "temp_uploads")
                    os.makedirs(temp_dir, exist_ok=True)
                    file_path = os.path.join(temp_dir, uploaded_file.name)
                    with open(file_path, "wb") as f:
                        f.write(uploaded_file.getbuffer())

                with st.spinner("Extracting audio..."):
                    audio_path = extract_audio(file_path)
                    if audio_path is None:
                        raise RuntimeError(
                            "Audio extraction failed. "
                            "Install / update MoviePy and imageio-ffmpeg, "
                            "or test with an MP3/WAV file first."
                        )

                if not transcriber_ok:
                    raise RuntimeError(
                        "No transcription backend installed. "
                        "Run: pip install faster-whisper imageio-ffmpeg"
                    )

                with st.spinner(
                    f"Transcribing with {transcriber_name} ({model_size})… "
                    "this may take a few minutes on CPU."
                ):
                    raw_result = transcribe_audio(audio_path, model_size=model_size)
                    st.session_state.segments = normalize_whisper_segments(raw_result)

                with st.spinner("Generating reel packages..."):
                    st.session_state.result = process_transcript(st.session_state.segments)
                    st.session_state.error_message = None

                st.success(
                    f"Transcribed {len(st.session_state.segments)} segments "
                    "and generated reel packages."
                )

            except Exception as exc:
                st.session_state.error_message = str(exc)
                st.session_state.segments = None
                st.session_state.result = None

    # Error display -------------------------------------------------------------
    if st.session_state.error_message:
        st.error(st.session_state.error_message)
        st.markdown(
            "**Quick fix:** try an `.mp3` or `.wav` file first, "
            "install the real upload dependencies, then restart Streamlit."
        )

    # Transcript preview --------------------------------------------------------
    if st.session_state.segments:
        st.header("2. Transcript Preview")
        transcript_text = "\n\n".join(
            f"[{seg.get('start', 0.0):.1f}s - {seg.get('end', 0.0):.1f}s] {seg.get('text', '')}"
            for seg in st.session_state.segments
        )
        with st.expander("View full transcript", expanded=False):
            st.text_area("Transcript", transcript_text, height=250)

    # Results -------------------------------------------------------------------
    if st.session_state.result:
        top_segments = st.session_state.result["top_segments"]
        reel_packages = st.session_state.result["reel_packages"]

        # Viral segments table
        st.header("3. Top Viral Segments")
        table_data = []
        for idx, seg in enumerate(top_segments, start=1):
            table_data.append({
                "Reel": idx,
                "Start (s)": round(seg.get("start", 0.0), 1),
                "End (s)": round(seg.get("end", 0.0), 1),
                "Viral Score": seg.get("scores", {}).get("viral_score", 0.0),
                "Hook": seg.get("scores", {}).get("hook_strength", 0.0),
                "Emotion": seg.get("scores", {}).get("emotional_intensity", 0.0),
                "Educational": seg.get("scores", {}).get("educational_value", 0.0),
            })
        st.dataframe(table_data, use_container_width=True)

        # Reel package cards
        st.header("4. Reel Packages")
        for reel in reel_packages:
            with st.container(border=True):
                col_a, col_b = st.columns([3, 1])
                with col_a:
                    st.markdown(f"### Reel {reel.get('reel_number')} — {reel.get('viral_headline')}")
                    st.caption(
                        f"⏱️ {reel.get('start_time')} → {reel.get('end_time')} "
                        f"| Viral Score: {reel.get('viral_score')}"
                    )
                with col_b:
                    st.metric("Viral Score", reel.get("viral_score"))

                st.markdown(f"**Hook:** {reel.get('hook_line')}")
                st.markdown(f"**Summary:** {reel.get('short_summary')}")
                st.markdown(f"**Caption:** {reel.get('social_media_caption')}")
                st.markdown(f"**Hashtags:** {' '.join(reel.get('hashtags', []))}")
                st.markdown(f"**On-Screen Text:** *{reel.get('suggested_on_screen_text')}*")

                with st.expander("B-roll & Runway prompt"):
                    st.markdown(f"**B-roll description:** {reel.get('suggested_broll_description')}")
                    st.code(reel.get("runway_ready_broll_prompt"), language="text")

                with st.expander("Transcript excerpt"):
                    st.write(reel.get("transcript_excerpt"))

        # B-roll prompt section
        st.header("5. Runway-Ready B-roll Prompts")
        st.markdown(
            "Copy these prompts directly into "
            "[Runway ML](https://runwayml.com) Text to Video."
        )
        for reel in reel_packages:
            st.markdown(f"**Reel {reel.get('reel_number')}:** {reel.get('suggested_on_screen_text')}")
            st.code(reel.get("runway_ready_broll_prompt"), language="text")

        # Export instructions
        st.header("6. Export Instructions")
        exported = st.session_state.result["exported"]
        subtitle_paths = st.session_state.result["subtitle_paths"]

        st.markdown("All files have been exported to the `outputs/` folder:")
        for path in exported.values():
            st.markdown(f"- `{path}`")
        for path in subtitle_paths:
            st.markdown(f"- `{path}`")

        st.success("✅ Reel packages generated and exported successfully!")

    # Footer --------------------------------------------------------------------
    st.divider()
    st.caption(
        "ViralClip AI — Task 4 Generative AI Internship Project | "
        "Built with Streamlit, faster-whisper/MoviePy, and rule-based content generation."
    )


if __name__ == "__main__":
    main()
