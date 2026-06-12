<div align="center">

# AI Image Generation Prompt Documentation

</div>

---

## 📑 Table of Contents

| # | Section | Description |
|---|---------|-------------|
| 01 | [Brand Consistency Guide](#-brand-consistency-guide) | Visual identity rules and palette |
| 02 | [Prompt Engineering Techniques](#-prompt-engineering-techniques) | Methods applied in this file |
| 03 | [Logo Prompt](#01_logo_prompt) | Brand logo concept |
| 04 | [Hero Image Prompt](#02_hero_image_prompt) | Website hero banner |
| 05 | [Character Prompt](#03_character_prompt) | AI consultant mascot |
| 06 | [Icon Set Prompt](#04_icon_set_prompt) | UI icon collection |
| 07 | [Social Media Prompt](#05_social_media_prompt) | Launch announcement poster |
| 08 | [Variation 1 Prompt](#06_variation1_prompt) | Character — Corporate Office |
| 09 | [Variation 2 Prompt](#07_variation2_prompt) | Character — City Street |
| 10 | [Variation 3 Prompt](#08_variation3_prompt) | Character — Command Center |
| 11 | [Supporting AI Tools](#-supporting-ai-tools) | Tools used for generation |
| 12 | [Usage Instructions](#-usage-instructions) | How to use these prompts |
| 13 | [Submission Notes](#-submission-notes) | Documentation context |

---

## 🎨 Brand Consistency Guide

All visual assets in this brand kit adhere to a unified **Cyberpunk-Corporate** aesthetic. The following guidelines must be maintained across every generated image.

| Property | Specification |
|----------|---------------|
| **Brand Mood** | Premium, futuristic, authoritative, high-tech enterprise |
| **Primary Colors** | Electric blue (`#00BFFF`), deep violet (`#7B2FBE`) |
| **Accent Colors** | Neon cyan highlights, soft purple glows |
| **Background Tone** | Deep black, dark navy, or dark charcoal |
| **Lighting Style** | Cinematic rim lighting, volumetric neon glow, dramatic contrast |
| **Visual Texture** | Dark glassmorphism, frosted surfaces, metallic chrome |
| **Typography Feel** | Sharp, geometric, minimal — no decorative or handwritten fonts |
| **Composition** | Clean negative space, centered focal point, balanced asymmetry |

### What to Avoid
- Warm or pastel color palettes
- Cartoon, anime, or illustrated art styles
- Cluttered or busy backgrounds
- Oversaturation or washed-out exposure
- Inconsistent lighting across assets
- Rainbow or multi-colored gradients not anchored to the brand palette
- Realistic photography aesthetics where a render is intended

---

## 🛠 Prompt Engineering Techniques

This file applies the following prompt engineering methods to ensure high-quality, brand-consistent outputs across all AI image generation platforms.

- **Positive Prompting** — Each prompt explicitly describes the desired subject, style, lighting, color, and composition to guide the model toward the intended result.
- **Negative Prompting** — Each prompt includes a dedicated negative prompt to suppress unwanted elements such as distorted anatomy, watermarks, inconsistent styles, and low-quality renders.
- **Aspect Ratio Control** — Aspect ratios are tailored per use case: `1:1` for logos and icons, `16:9` for banners, `9:16` for character portraits.
- **Lighting Control** — Lighting descriptors such as "cinematic rim lighting," "volumetric fog," and "neon ambient glow" are used consistently to reinforce the brand atmosphere.
- **Style Consistency** — Shared style anchors (dark glassmorphism, neon blue and violet, futuristic-corporate) appear across all prompts to create a cohesive visual system.
- **Image-to-Image Prompting** — Variation prompts (06–08) reference `ai_character.png` as a base image to maintain character identity across different scene contexts.
- **Reference-Based Character Consistency** — The AI consultant character's core design (dark suit with circuit detailing, holographic visor, neon blue and violet lighting) is preserved verbatim in all variation prompts.

---

## 01_logo_prompt

### Positive Prompt

```
Minimalist futuristic logo design for a premium tech corporation. Glowing hexagonal core symbol with electric blue and violet neon illumination. Pure black background. Clean geometric vector lines with sharp metallic chrome finish. Cyberpunk-corporate brand identity aesthetic. Professional, iconic, highly detailed. Ultra-sharp vector render.
```

### Negative Prompt

```
text, letterforms, watermark, blurry edges, distorted geometry, extra shapes, cluttered composition, messy lines, low quality render, cartoonish style, human figures, buildings, landscapes, realistic photography, rainbow colors, warm tones, gradients outside blue-violet palette, pixelated output, artifacts
```

### Advanced Configuration

```
Aspect Ratio  : 1:1          # Square format — standard for logo assets
Steps         : 20           # Number of diffusion steps; higher = more detail
CFG Scale     : 5            # Prompt adherence strength; range typically 3–10
Seed          : -1           # Random seed; set a fixed value to reproduce results
```

> **Note:** These settings are optimized for Stable Diffusion. Equivalent controls in Midjourney use `--ar`, `--chaos`, and `--seed` flags. DALL·E 3 does not expose steps or CFG scale directly.

---

## 02_hero_image_prompt

### Positive Prompt

```
Cinematic cyberpunk corporate website hero banner. Futuristic glass-and-steel skyscraper cityscape at night. Holographic AI data streams and floating particle grids fill the air. Professional executives interacting with glowing holographic interface panels. Deep navy background with neon cyan and violet accent lighting. Volumetric atmospheric fog. Premium enterprise SaaS technology aesthetic. Photorealistic, ultra-detailed, cinematic wide-angle composition.
```

### Negative Prompt

```
cartoon, anime, illustrated style, blurry render, low resolution, distorted faces, extra fingers, missing limbs, deformed anatomy, watermark, text overlay, cluttered composition, horror elements, cheap stock photo aesthetic, overexposed highlights, washed-out or desaturated colors, warm color palette, inconsistent lighting
```

### Advanced Configuration

```
Aspect Ratio  : 16:9         # Standard widescreen — ideal for website hero banners
Steps         : 20           # Sufficient for high-detail photorealistic renders
CFG Scale     : 5            # Balanced adherence; increase to 7 for stricter prompt follow
Seed          : -1           # Randomized; fix the seed to reproduce a specific composition
```

> **Note:** For Midjourney, append `--ar 16:9 --style raw` for a more photorealistic output.

---

## 03_character_prompt

### Positive Prompt

```
Full-body portrait of a futuristic AI consultant character for a premium cyberpunk tech corporation. Sleek dark suit with glowing electric-blue circuit-pattern detailing. Holographic visor projecting analytical data overlays across the eyes. Neon blue and violet ambient rim lighting against a deep black background. Confident, authoritative professional stance. Sharp, detailed facial features. Enterprise-grade AI mascot aesthetic. Photorealistic, cinematic lighting with soft volumetric glow.
```

### Negative Prompt

```
blurry render, deformed face, extra fingers, missing hands, extra limbs, distorted anatomy, cartoon, anime, illustrated style, ugly proportions, watermark, text overlay, multiple characters in frame, low quality, worst quality, overexposed, flat or studio-white lighting, childish illustration style, fashion photography aesthetic
```

### Advanced Configuration

```
Aspect Ratio  : 2:3          # Portrait format — optimal for character art and mascot assets
Steps         : 20           # Increase to 30+ for finer facial detail in Stable Diffusion
CFG Scale     : 5            # Raise to 6–7 if character details are not adhering closely
Seed          : -1           # Fix the seed after a satisfactory result to enable consistency
```

> **Note:** Record the seed value from this generation — it is used as the reference for all image-to-image variation prompts (Sections 06–08).

---

## 04_icon_set_prompt

### Positive Prompt

```
A set of six cohesive cyberpunk corporate technology icons arranged on a dark background. Flat vector style with neon blue and violet glowing outlines. Icons represent: AI neural brain, global data network, cloud computing infrastructure, security shield, analytics bar chart, and synaptic neural connection. Clean minimal geometric design with consistent stroke weight. Dark glassmorphism panel background. Professional UI icon system. Sharp, pixel-perfect edges.
```

### Negative Prompt

```
random or unrelated objects, inconsistent icon style, cartoon or comic aesthetic, rainbow or multi-color palette, blurry edges, low resolution, watermark, text labels embedded in icons, extra visual clutter, human figures, photorealistic rendering, 3D depth or drop shadows, mismatched stroke weights
```

### Advanced Configuration

```
Aspect Ratio  : 1:1          # Square canvas — standard for icon grid layouts
Steps         : 20           # Sufficient for flat vector-style output
CFG Scale     : 5            # Increase to 7 if icons appear inconsistent in style
Seed          : -1           # Fix seed to reproduce the same icon arrangement
```

> **Note:** For best results in Stable Diffusion, use a flat-design or vector-art checkpoint model. In Midjourney, append `--no 3d, shadows, gradients` to reinforce the flat aesthetic.

---

## 05_social_media_prompt

### Positive Prompt

```
Premium cyberpunk corporate social media launch announcement poster. Dramatic dark background with a glowing neon city skyline silhouette. Bold minimalist layout with generous negative space at center for text placement. Floating holographic geometric shapes and light-trail accents. Electric blue and deep violet neon gradient sweeping across the composition. Dramatic cinematic directional lighting. Professional enterprise AI product reveal visual. Ultra-detailed, sharp edges, luxury tech brand aesthetic.
```

### Negative Prompt

```
embedded text or typography, watermark, crowded or cluttered layout, cartoon, anime, illustrated style, blurry render, distorted elements, extra fingers, deformed faces, low quality, cheap design aesthetic, overexposed highlights, messy background, horror or dark fantasy imagery, inconsistent color palette
```

### Advanced Configuration

```
Aspect Ratio  : 1:1          # Square format — optimized for Instagram and LinkedIn posts
Steps         : 20           # Standard quality; increase to 30 for final production renders
CFG Scale     : 5            # Balanced; increase to 6 for stronger brand palette adherence
Seed          : -1           # Fix after a satisfactory composition is achieved
```

> **Note:** Leave the center area intentionally empty or minimal — this space is reserved for post-production text and headline overlays in a design tool such as Figma or Adobe Photoshop.

---

## 06_variation1_prompt

> **Image-to-Image Variation** — This prompt uses `ai_character.png` (generated in Section 03) as the reference image. The character's core identity — dark suit with circuit detailing, holographic visor, neon blue and violet color palette — is preserved while placing them in a new scene.

### Positive Prompt

```
The same cyberpunk AI consultant character from the reference image, now standing in a sleek futuristic corporate office environment. Large holographic data display panels cover the walls. Neon blue and violet ambient lighting fills the space. Floor-to-ceiling glass windows reveal a glowing smart city skyline at night. Professional enterprise atmosphere. Cinematic composition, ultra-detailed.
```

### Negative Prompt

```
blurry render, distorted face, extra fingers, extra or missing limbs, cartoon, anime, watermark, text overlay, low quality, overexposed highlights, multiple characters in frame, inconsistent character design, wrong suit color, missing visor, casual or non-corporate environment
```

### Advanced Configuration

```
Mode          : Image-to-Image          # Uses a reference image to guide composition
Reference     : ai_character.png        # Base character image from Section 03
Aspect Ratio  : 9:16                    # Vertical portrait — suitable for mobile and stories
Steps         : 20                      # Standard; increase for higher fidelity
CFG Scale     : 5                       # Keep consistent with the original character prompt
Seed          : -1                      # Fix if repeating the generation
```

> **Note:** In Stable Diffusion, set the denoising strength between `0.5–0.7` to preserve character identity while allowing scene variation. In Midjourney, use `--cref` with the character image and `--cw 80–100` for strong character consistency.

---

## 07_variation2_prompt

> **Image-to-Image Variation** — This prompt uses `ai_character.png` as the reference image. The character's identity is maintained while the scene transitions to a rain-soaked urban night environment.

### Positive Prompt

```
The same cyberpunk AI consultant character from the reference image, now standing on a rain-soaked futuristic city street at night. Neon blue and violet signs reflect across wet pavement below. Holographic advertisements float in the misty air above. A dark, atmospheric, cinematic environment with dramatic neon rim lighting. The character's suit, visor, and color palette remain identical to the reference. Ultra-detailed, photorealistic cinematic render.
```

### Negative Prompt

```
blurry render, distorted face, extra fingers, extra or missing limbs, cartoon, anime, watermark, text overlay, low quality, overexposed highlights, multiple characters in frame, inconsistent character design, wrong suit color, missing visor, daytime lighting, warm color palette, generic street photography aesthetic
```

### Advanced Configuration

```
Mode          : Image-to-Image          # Uses a reference image to guide composition
Reference     : ai_character.png        # Base character image from Section 03
Aspect Ratio  : 9:16                    # Vertical portrait — suitable for mobile and stories
Steps         : 20                      # Standard; increase for higher fidelity
CFG Scale     : 5                       # Keep consistent with the original character prompt
Seed          : -1                      # Fix if repeating the generation
```

> **Note:** Set denoising strength to `0.6` in Stable Diffusion for a strong scene change while preserving the character's appearance. Reflective wet ground effects benefit from higher CFG values (`6–7`).

---

## 08_variation3_prompt

> **Image-to-Image Variation** — This prompt uses `ai_character.png` as the reference image. The character is placed in a high-stakes enterprise command center while maintaining all defining visual traits.

### Positive Prompt

```
The same cyberpunk AI consultant character from the reference image, now standing inside a vast futuristic enterprise command center. A massive holographic world map dominates the rear wall. Multiple curved glowing screens display real-time AI analytics dashboards and data feeds. Neon blue and violet ambient lighting casts dramatic shadows throughout the dark high-tech environment. Cinematic wide-angle composition with strong depth perspective. Professional, authoritative atmosphere. Ultra-detailed render.
```

### Negative Prompt

```
blurry render, distorted face, extra fingers, extra or missing limbs, cartoon, anime, watermark, text overlay, low quality, overexposed highlights, multiple characters in frame, inconsistent character design, wrong suit color, missing visor, casual or residential setting, warm or neutral lighting
```

### Advanced Configuration

```
Mode          : Image-to-Image          # Uses a reference image to guide composition
Reference     : ai_character.png        # Base character image from Section 03
Aspect Ratio  : 9:16                    # Vertical portrait — suitable for mobile and stories
Steps         : 20                      # Standard; increase for higher fidelity
CFG Scale     : 5                       # Keep consistent with the original character prompt
Seed          : -1                      # Fix if repeating the generation
```

> **Note:** For the command center scene, a denoising strength of `0.65` in Stable Diffusion is recommended to allow significant background detail while anchoring the character to the reference. Use Midjourney's `--cref` flag with `--cw 90` for strict character fidelity.

---

## 🤖 Supporting AI Tools

The following AI image generation platforms were used or are recommended for generating the assets documented in this file.

| Tool | Primary Use Case | Strengths |
|------|-----------------|-----------|
| **Midjourney** | All prompts | Exceptional aesthetic quality, strong style adherence, `--cref` for character consistency |
| **DALL·E 3** | Logo, icon set, social media poster | Clean vector-leaning output, strong composition, accessible via ChatGPT |
| **Stable Diffusion** | All prompts, especially variations | Full control over steps, CFG scale, seed, and image-to-image denoising strength |

---

## 📖 Usage Instructions

### DALL·E 3 (via ChatGPT or API)
1. Copy the **Positive Prompt** for the desired asset.
2. Paste it directly into the ChatGPT interface or include it as the `prompt` parameter in the Images API call.
3. Set `size` to match the intended aspect ratio (e.g., `1792x1024` for 16:9, `1024x1024` for 1:1, `1024x1792` for 9:16).
4. DALL·E 3 does not support negative prompting natively — incorporate exclusion language into the positive prompt using phrasing such as "no watermarks, no text, no cartoon style."

### Midjourney
1. Use the `/imagine` command followed by the **Positive Prompt**.
2. Append `--ar` with the relevant ratio (e.g., `--ar 16:9`, `--ar 1:1`, `--ar 9:16`).
3. Append `--no` followed by key negative prompt terms (e.g., `--no cartoon, watermark, blurry`).
4. For image-to-image variations (Sections 06–08), attach `ai_character.png` using `--cref [image URL]` and set `--cw 80` to `--cw 100` for character consistency.
5. Use `--seed [number]` to reproduce a specific result.

### Stable Diffusion (WebUI / ComfyUI)
1. Paste the **Positive Prompt** into the positive prompt field.
2. Paste the **Negative Prompt** into the negative prompt field.
3. Apply the settings from the **Advanced Configuration** block (Steps, CFG Scale, Aspect Ratio).
4. For image-to-image variations (Sections 06–08):
   - Load `ai_character.png` into the img2img tab as the reference image.
   - Set **Denoising Strength** between `0.5–0.7` (lower = more character preservation, higher = more scene variation).
5. Record and reuse the **Seed** value to reproduce consistent results across multiple generations.

---

## 📝 Notes

- All eight prompt sections (Sections 01–08) correspond directly to visual assets produced for the fictional tech startup's **Cyberpunk-Corporate brand kit**.
- Prompts were engineered to be compatible across **DALL·E 3**, **Midjourney**, and **Stable Diffusion** with platform-specific adaptation notes provided where relevant.
- Image-to-image variation prompts (Sections 06–08) rely on `ai_character.png`, generated using the character prompt in Section 03, as a shared reference to maintain cross-asset character consistency.
- This file does not contain generated images. It documents the prompts, configurations, and methodologies used to produce them.
- All brand guidelines, negative prompts, and configuration notes are designed to support reproducibility and visual coherence across the full asset set.

---