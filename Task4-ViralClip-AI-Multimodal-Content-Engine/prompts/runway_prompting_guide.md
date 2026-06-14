# Runway Prompting Guide

## Goal
Use the generated `runway_broll_prompts.md` file to create polished 5-second B-roll clips in Runway ML.

## Recommended Settings

- **Tool:** Runway Gen-3 Text to Video or Image to Video
- **Duration:** 5 seconds per clip
- **Aspect ratio:** 9:16 for reels, 1:1 or 4:5 for other platforms
- **Camera motion:** Include in the prompt (e.g., slow dolly in, handheld pan, static)

## How to Prompt

Each prompt follows this structure:

```
Cinematic 5-second B-roll clip. [scene description].
Smooth camera motion, shallow depth of field, professional color grading,
soft ambient lighting, 4K, highly detailed, editorial style.
```

## Credit-Saving Tips

1. **Test first.** Generate one clip before running all five.
2. **Reuse settings.** Save a consistent visual style (lighting, color grade) across clips.
3. **Keep clips short.** 5 seconds is enough for B-roll in a 30–60 second reel.
4. **Iterate the prompt.** If the first result is off, adjust 1–2 descriptors rather than rewriting the whole prompt.
5. **Use image references.** If you have a reference image, use Image to Video for more control.

## Syncing in Your Editor

1. Place the talking-head clip on your main timeline.
2. Lay the Runway B-roll clip on a track above.
3. Use the corresponding `reel_N.srt` subtitle file.
4. Align the B-roll with the on-screen text suggestion for maximum impact.

## Example Workflow

1. Open Runway → Text to Video.
2. Paste the prompt for Reel 1.
3. Set duration to 5 seconds and aspect ratio to 9:16.
4. Generate and download.
5. Repeat for Reels 2–5.
6. Import into CapCut / Premiere Pro / DaVinci Resolve with SRT files.
