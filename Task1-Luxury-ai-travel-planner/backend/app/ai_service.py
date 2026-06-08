"""
================================================================
Luxy Travel Persona — AI Service
================================================================
This module handles AI response generation.

It supports three modes:
1. demo     — High-quality built-in responses (no API key needed)
2. claude   — Anthropic Claude API (requires CLAUDE_API_KEY in .env)
3. gemini   — Google Gemini API (requires GEMINI_API_KEY in .env)

The mode is controlled by the AI_PROVIDER environment variable.
================================================================
"""

import os
import json
import random
from typing import List, Dict
from app.prompt import LUXY_SYSTEM_PROMPT

# ── Environment variables ─────────────────────────────────────
AI_PROVIDER = os.getenv("AI_PROVIDER", "demo").lower()
CLAUDE_API_KEY = os.getenv("CLAUDE_API_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")


# ══════════════════════════════════════════════════════════════
# DEMO MODE RESPONSES
# High-quality simulated luxury consultant responses
# ══════════════════════════════════════════════════════════════

def _demo_response(message: str) -> str:
    """
    Generate an intelligent demo response based on the user message.
    Covers a wide range of travel queries with luxury consultant quality.
    """
    msg = message.lower().strip()

    # ── Honeymoon requests ────────────────────────────────────
    if any(w in msg for w in ["honeymoon", "honey moon", "newlywed", "newly wed", "just married"]):
        if "bali" in msg:
            return """Certainly. For a 7-day luxury honeymoon in Bali, I would design the trip around privacy, natural beauty, slow romance, and a balance of jungle and ocean.

## Suggested Itinerary

**Days 1–3: Ubud — Jungle Romance**
Stay Style: Private pool villa surrounded by rice terraces or lush jungle canopy.

Experiences:
- Private floating breakfast in your villa pool
- Couples' signature spa ritual at COMO Shambhala or Komaneka
- Guided sunrise visit to Tirta Empul temple
- Romantic fine-dining dinner under the stars
- Tegallalang rice terrace walk with a private guide

**Days 4–7: Uluwatu or Seminyak — Ocean Elegance**
Stay Style: Clifftop ocean-view villa or beachfront luxury resort.

Experiences:
- Sunset Kecak fire dance at Uluwatu temple cliffs
- Private beach club day at Karma Beach
- Sunset catamaran cruise with private catering
- Balinese cooking class followed by a candlelit dinner
- Final morning: leisurely spa and rooftop pool time

## Recommended Style

For romance and privacy, I would pair Ubud with Uluwatu. Ubud gives you atmosphere, spirituality, and culture; Uluwatu gives you dramatic ocean views and a polished, glamorous ending.

**Estimated Luxury Budget Range:** $8,000–$20,000+ depending on villa selection and duration.

May I know whether you prefer complete seclusion, a mix of social and private moments, or whether you have a specific budget range in mind?"""

        elif "maldives" in msg:
            return """Certainly. The Maldives is one of the world's most celebrated honeymoon destinations — and for excellent reason.

## Three Honeymoon Styles in the Maldives

**1. Ultra-Private Overwater Retreat**
Properties such as Soneva Jani, Gili Lankanfushi, or North Island offer exceptional seclusion with private overwater villas, personal butlers, and bespoke dining experiences. Ideal for couples who want complete privacy.

**2. Romantic Luxury Resort**
Properties such as Four Seasons Landaa Giraavaru or The Nautilus offer world-class facilities — spas, underwater restaurants, marine experiences — with a more social atmosphere should you wish.

**3. Boutique Island Experience**
Smaller properties such as Kudadoo or Amilla offer intimate settings with fewer guests and highly personalized service.

## Suggested 7-Night Structure

- **Arrival:** Seaplane or speedboat transfer to your island
- **Days 1–3:** Settle in, spa ritual, snorkelling the house reef
- **Days 4–5:** Underwater dining experience, sunset dolphin cruise
- **Days 6–7:** Bioluminescent beach walk, private island picnic, final sunset dinner

**Estimated Luxury Budget Range:** $12,000–$40,000+ depending on resort and villa category.

May I know your preferred travel month? The dry season (November to April) generally offers the clearest waters and best weather."""

        else:
            return """Certainly. For a luxury honeymoon, I would suggest three of the world's most celebrated romantic destinations:

## Three Exceptional Honeymoon Directions

**1. Maldives — Overwater Paradise**
Private overwater villas, crystalline turquoise lagoons, sunrise snorkelling, underwater dining, and absolute seclusion. Ideal for 7–9 nights. The world's most iconic honeymoon setting.

**2. Bali, Indonesia — Jungle and Ocean Romance**
A beautiful pairing of Ubud's rice terrace villas and Uluwatu's clifftop ocean views. Private pool villas, couples spa rituals, temple visits, and candlelit dinners. Ideal for 7–10 nights.

**3. Santorini, Greece — Aegean Intimacy**
Whitewashed cliff villages, caldera sunsets, private cave suites with plunge pools, and Cycladic island exploration. Ideal for 6–8 nights. Perfect for couples who enjoy scenery and culture.

**Honourable Mentions:** Seychelles for private island seclusion, Amalfi Coast for coastal romance, Kyoto for cultural depth.

May I ask which style resonates most — ocean seclusion, tropical nature, Mediterranean scenery, or something entirely different?"""

    # ── Japan / Tokyo / Kyoto requests ───────────────────────
    if any(w in msg for w in ["japan", "tokyo", "kyoto", "osaka"]):
        return """Certainly. Japan offers one of the world's most extraordinary luxury travel experiences — a rare fusion of ancient refinement and ultramodern precision.

## Suggested 10-Day Japan Luxury Itinerary

**Days 1–4: Tokyo**
Stay Style: Aman Tokyo, The Peninsula Tokyo, or Park Hyatt Tokyo

Experiences:
- Omakase dinner at a Michelin three-star sushi counter
- Private Tsukiji outer market early morning tour
- Shibuya and Shinjuku private photography walk
- Teamlab digital art immersion (private evening session)
- Harajuku fashion district with a personal shopper

**Days 5–8: Kyoto**
Stay Style: Aman Kyoto, Suiran Luxury Collection, or Tawaraya Ryokan

Experiences:
- Private tea ceremony in a historic machiya townhouse
- Exclusive geisha dinner in Gion (rare and discreet)
- Kinkaku-ji and Fushimi Inari at dawn with a private guide
- Arashiyama bamboo grove and temple garden walk
- Nishiki Market private culinary tour

**Days 9–10: Optional Extension**
- Nara (deer park, ancient temples) by private car
- Hakone (Mount Fuji views, onsen, ryokan experience)
- Hiroshima and Miyajima Island day trip

## Key Recommendations

**Best Season:** Late March–early May (cherry blossom) or October–November (autumn foliage). Both are exceptional.

**Hotel Highlight:** A traditional ryokan stay with kaiseki dinner service is strongly recommended for at least 2–3 nights.

**Estimated Luxury Budget:** $15,000–$35,000+ for two.

Shall I develop a day-by-day itinerary with specific recommendations?"""

    # ── Europe / Italy / France / Greece requests ─────────────
    if any(w in msg for w in ["europe", "european", "italy", "france", "greek", "greece", "paris", "rome", "amalfi", "santorini", "tuscany"]):
        return """Certainly. Europe offers an extraordinary range of luxury experiences. Allow me to present three refined European directions:

## Three European Luxury Directions

**1. Italy — Romance and Coastal Grandeur (10–12 nights)**

Rome (3 nights) → Florence and Tuscany (3 nights) → Amalfi Coast (4 nights)

Highlights:
- Private Vatican twilight tour
- Dinner at a Michelin three-star restaurant in Rome
- Truffle hunting in Umbria with a private chef lunch
- Private yacht charter along the Amalfi Coast
- Positano cliff villa with sea views

**2. France — Culture, Cuisine, and Glamour (9–11 nights)**

Paris (4 nights) → Provence (3 nights) → French Riviera and Monaco (3 nights)

Highlights:
- Private Louvre after-hours tour
- Champagne cellar visit in Épernay
- Lavender fields of Provence (seasonal)
- Monaco casino and Michelin dining
- Private yacht from Nice along the Côte d'Azur

**3. Greece — Islands and Antiquity (8–10 nights)**

Athens (2 nights) → Santorini (4 nights) → Mykonos (3 nights)

Highlights:
- Private Acropolis sunrise visit
- Caldera cave suite with plunge pool in Oia
- Catamaran cruise between islands
- Sunset dinner overlooking the volcanic caldera
- Delos archaeological island day trip

## My Recommendation

Italy is ideal for those who love history, gastronomy, and scenery together. France is ideal for culture, cuisine, and elegance. Greece is ideal for romance, sunsets, and island beauty.

May I know your travel dates, number of travellers, and whether this is a celebration trip?"""

    # ── Maldives / value requests ─────────────────────────────
    if "maldives" in msg and any(w in msg for w in ["cheap", "budget", "affordable", "expensive", "cost", "value", "not too", "less"]):
        return """Certainly. The Maldives has a wide spectrum of luxury options — and there are excellent ways to create a refined experience without choosing purely the most iconic (and highest-priced) resorts.

## Value-Conscious Luxury in the Maldives

**Option 1: Boutique Island Resort**
Properties such as Kandima, Finolhu, or Amari Havodda offer beautiful overwater villas, excellent service, house reef snorkelling, and all the Maldivian atmosphere at a more accessible price point.

**Estimated range:** $5,000–$10,000 for 7 nights (couple, all-inclusive)

**Option 2: Speedboat-Transfer Resort**
Resorts accessible by speedboat rather than seaplane are typically 30–50% more affordable. The experience is nearly identical once you arrive — and transfer time is reduced.

**Estimated range:** $4,000–$9,000 for 7 nights (couple)

**Option 3: Shoulder Season Travel**
Traveling in May, June, or early November can reduce rates significantly at the finest resorts while retaining beautiful conditions. Some intermittent rain is possible but rarely disrupts a full day.

**Estimated range:** 20–35% reduction on peak-season rates

## Ways to Preserve the Luxury Without Overspending

- Choose a beach villa over an overwater bungalow — the savings are significant and beach villas often offer more space
- Select half-board rather than full all-inclusive if you prefer variety
- Book earlier — many resorts offer early-bird discounts subject to availability

If you share your approximate total budget for the trip, I can suggest specific property styles and configurations that would work well.

May I ask your approximate budget range and preferred travel month?"""

    # ── Dubai vs Singapore comparison ─────────────────────────
    if ("dubai" in msg and "singapore" in msg) or ("compare" in msg and ("dubai" in msg or "singapore" in msg)):
        return """Certainly. Both Dubai and Singapore are excellent choices for a family luxury trip, and they have quite different characters. Allow me to compare them properly.

## Dubai vs Singapore — Family Luxury Comparison

### Dubai

**Atmosphere:** Dramatic, glamorous, and grand. A city of superlatives — record-breaking architecture, gold-adorned interiors, and vast desert landscapes.

**Best for families:**
- Desert safari with dune dining and camel rides
- Burj Khalifa observation and Atmosphere restaurant
- Dubai Mall, Ski Dubai, and Aquaventure Waterpark
- Private beach clubs along Jumeirah
- Abu Dhabi day trip (Louvre, Ferrari World, Sheikh Zayed Mosque)

**Climate:** Best October–April. Avoid summer (extremely hot).

**Hotel style:** Palace-style mega-resorts, private beach access, vast pools, world-class spa facilities.

**Estimated luxury budget (family of 4, 7 nights):** $12,000–$30,000+

---

### Singapore

**Atmosphere:** Impeccably clean, diverse, safe, and extraordinarily curated. A compact city-state with world-class food, nature, and design.

**Best for families:**
- Universal Studios Singapore
- Singapore Zoo and Night Safari (world-class)
- Gardens by the Bay (children love Supertree Grove)
- Sentosa Island beach and activities
- Hawker food trail for diverse flavours

**Climate:** Year-round warmth. February–April tends to be slightly drier.

**Hotel style:** Marina Bay Sands (iconic rooftop infinity pool), Capella Singapore, Four Seasons.

**Estimated luxury budget (family of 4, 7 nights):** $10,000–$22,000+

---

## My Recommendation

**Choose Dubai** if you want spectacle, space, desert adventure, and ultra-luxury scale.

**Choose Singapore** if you want culture diversity, safety, food exploration, wildlife, and a cosmopolitan urban experience.

For families with young children, **Singapore** tends to be slightly more manageable and stimulating. For families seeking visual grandeur and luxury scale, **Dubai** is extraordinary.

Would you like me to design a detailed itinerary for either destination?"""

    # ── Safari requests ───────────────────────────────────────
    if any(w in msg for w in ["safari", "africa", "serengeti", "kenya", "tanzania", "maasai", "kruger", "wildlife"]):
        return """Certainly. A luxury safari is among the most extraordinary travel experiences on earth — and Africa offers several remarkable destinations, each with its own character.

## Three Premier Luxury Safari Directions

**1. Serengeti, Tanzania — The Great Migration**

Best season: June–October (dry season, peak migration) or January–March (calving season, spectacular predator activity).

Highlights:
- Exclusive private tented camp in the migration corridor
- Hot air balloon safari over the golden plains at dawn
- Walking safari with a master guide and tracker
- Sundowner on a kopje with personal chef and local storytelling
- Night game drive under the Milky Way

Recommended camps: Singita Grumeti, Nomad Tanzania, &Beyond Serengeti Under Canvas.

---

**2. Maasai Mara, Kenya — Classic Elegance**

Best season: July–October for river crossings, year-round for the Mara conservancies.

Highlights:
- Private game drives in exclusive conservancy (no crowds)
- Maasai village cultural immersion
- Early morning hot air balloon over the Mara
- Horseback riding across open grassland
- Private Big Five photography safari

Recommended camps: Angama Mara, Mahali Mzuri, Sanctuary Olonana.

---

**3. South Africa — Combination Safari and Cape Town**

Best season: May–September (dry winter, best wildlife visibility).

Highlights:
- Kruger or Sabi Sands private game reserve
- Big Five game drives morning and evening
- Cape Town + Stellenbosch wine country
- Helicopter over Cape Peninsula
- Intimate bush dinner

Recommended lodges: Singita Ebony, Royal Malewane, Thornybush.

---

## My Recommendation

For the most iconic wildlife spectacle, **Serengeti during the Great Migration** is unmatched. For culture combined with wildlife, **Kenya and the Mara** is extraordinary. For the easiest combination trip, **South Africa** pairs a safari seamlessly with Cape Town.

Would you like a day-by-day safari itinerary for any of these?"""

    # ── India luxury requests ─────────────────────────────────
    if any(w in msg for w in ["india", "rajasthan", "kerala", "goa", "mumbai", "delhi", "jaipur", "agra", "taj mahal", "andaman"]):
        return """Certainly. India is one of the world's most extraordinary luxury travel destinations — layered, diverse, and deeply rewarding for those who travel it thoughtfully.

## Four Exceptional Luxury Circuits in India

**1. Golden Triangle — History and Palaces (7–9 nights)**
Delhi → Agra → Jaipur → Delhi

Highlights:
- Private Taj Mahal sunrise access
- Amber Fort elephant gate and palace tour
- Palace-hotel experience at Rambagh Palace (Jaipur) or The Oberoi Amarvilas (Agra)
- Spice market and old Delhi culinary tour
- Private cooking class in a haveli

**2. Rajasthan Circuit — Royal India (10–14 nights)**
Delhi → Udaipur → Jodhpur → Jaisalmer → Jaipur

Highlights:
- Lake Palace Hotel, Udaipur (island palace on the lake)
- Mehrangarh Fort at golden hour
- Camel safari in the Thar Desert with private camp under the stars
- Heritage havelis and private palace dinners

**3. Kerala — Wellness and Backwaters (7–10 nights)**
Kochi → Kerala Backwaters → Munnar → Kovalam

Highlights:
- Private houseboat cruise on Kerala's backwaters
- Traditional Ayurvedic wellness programme (7–14 day deep retreat)
- Spice plantation walk in Munnar
- Kathakali performance with private storyteller

**4. Andaman Islands — Ocean Exclusivity (6–8 nights)**
Pristine diving, private beaches, coral reef snorkelling, and secluded island resorts. Far fewer tourists than the Maldives, with comparable natural beauty.

---

## My Recommendation

For first-time visitors, Rajasthan combined with Agra is unmissable. For luxury and wellness, Kerala is without equal in Asia. For ocean beauty, the Andamans are India's best-kept secret.

May I know the time of year you are considering and the style of experience you prefer?"""

    # ── December destination suggestions ─────────────────────
    if any(w in msg for w in ["december", "christmas", "new year", "winter holiday", "winter trip"]):
        return """Certainly. December is one of the most exciting months for luxury travel — with the northern hemisphere in winter, the options span warm escapes, festive city experiences, and southern hemisphere summer.

## Five Exceptional December Luxury Destinations

**1. Maldives**
December falls within the dry season — warm, sunny, and ideal for overwater villas, snorkelling, and complete relaxation. Perfect for those escaping winter. Many resorts offer exceptional New Year's Eve experiences.

**2. Dubai**
December is Dubai's finest month — warm, dry, and comfortable for outdoor dining, desert safaris, and beach clubs. The city also hosts a festive atmosphere with excellent seasonal programming.

**3. Seychelles**
The Indian Ocean at its most serene in December — calm waters, lush island greenery, and world-class resorts with festive private island experiences.

**4. New York City**
For those who love the festive season in its full urban spectacle — ice skating at Rockefeller Center, Michelin dining, Broadway shows, and the iconic Times Square New Year experience. Pair with a suite at The Mark or The Plaza.

**5. Patagonia, Argentina/Chile**
December marks the beginning of the southern summer — and Patagonia is at its finest. Torres del Paine trekking, Perito Moreno glacier, and extraordinary wilderness lodges under the long Patagonian summer light.

---

**Honourable mentions:** Sri Lanka (December–March is the west coast's best season), Tokyo (festive illuminations are stunning), Cape Town (peak summer, spectacular), Peru (dry season beginning).

Which direction appeals most — warm beach escape, festive city culture, or wilderness adventure?"""

    # ── Wellness retreat requests ─────────────────────────────
    if any(w in msg for w in ["wellness", "retreat", "spa", "meditation", "yoga", "detox", "healing", "mental health", "mindfulness"]):
        return """Certainly. A luxury wellness retreat is one of the most rewarding investments in travel — and the world's finest destinations offer extraordinary programmes.

## Four Premier Luxury Wellness Destinations

**1. Bhutan — Sacred Stillness**
Aman Kyoto's counterpart: Amankora across Bhutan's valleys offers one of the most meditative wellness experiences on earth. Ancient Buddhist culture, pristine Himalayan air, traditional healing arts, and extraordinary silence. For those seeking a genuine transformation.

**2. Maldives — Ocean Wellness**
Soneva Fushi, Joali Being, or Six Senses Laamu offer exceptional marine wellness programmes — marine-based therapies, sunrise yoga on private sandbanks, Ayurvedic treatments, and total digital detox if desired.

**3. Kerala, India — Ayurvedic Mastery**
India's Kerala is the world's premier destination for authentic Ayurvedic wellness. Programmes at Somatheeram, Kalari Rasayana, or Shreyas Retreat involve doctor-led consultations, tailored herbal treatments, yoga, and a deeply restorative stay of 7–21 days.

**4. Switzerland — Alpine Wellbeing**
Grand Resort Bad Ragaz, Clinique La Prairie, or Lanserhof Lans offer the world's most medically rigorous wellness programmes — biohacking, longevity diagnostics, precision nutrition, and supreme Alpine rest. Favoured by executives and those seeking measurable health transformation.

---

May I know how long you are considering for the retreat, and whether you prefer ocean, mountain, jungle, or cultural settings?"""

    # ── Angry / difficult customer responses ─────────────────
    if any(w in msg for w in ["useless", "terrible", "awful", "worst", "hate", "disgusting", "angry", "frustrated", "disappointed", "waste of time", "rubbish"]):
        return """I understand, and I appreciate you expressing that directly. Let me set aside any previous suggestions entirely and focus only on what would genuinely impress.

Allow me to present three exceptional options that represent the absolute pinnacle of luxury travel:

**1. Private Island Maldives**
A fully secluded island experience — private villa with ocean-facing pool, personal host service from arrival to departure, bespoke marine experiences including private snorkelling excursions, submarine dinner, and a dedicated spa treatment menu. Nothing is shared. Nothing is generic.

**2. French Riviera and Monaco**
A collection of the world's most glamorous experiences — a palace suite in Monaco, private yacht charter from Nice along the Côte d'Azur, dinner at Louis XV by Alain Ducasse, helicopter transfer from the helipad, and a custom itinerary built entirely around exclusivity and prestige.

**3. East African Luxury Safari — Private Camp**
A fully private safari camp in Kenya's Maasai Mara or Tanzania's Serengeti. Your own tented camp, your own vehicle and guide, your own chef, and exclusive access to areas most guests never see. One of the rarest and most memorable experiences available.

Each of these would be difficult to match in terms of exclusivity and impression.

Which direction is most aligned with what you have in mind?"""

    # ── Discount requests ─────────────────────────────────────
    if any(w in msg for w in ["discount", "cheaper", "too expensive", "lower price", "reduce", "save money", "afford"]):
        return """Certainly. Rather than reducing the quality of the experience, I would suggest a few ways to create better value while preserving the luxury standard you deserve.

## Value-Conscious Luxury Strategies

**1. Travel just outside peak season**
Traveling two to four weeks before or after the absolute peak period can reduce hotel rates by 20–40% at many of the world's finest properties, while the experience itself remains largely unchanged.

**2. Choose a boutique luxury property over an ultra-iconic resort**
The world's most famous resort names carry a significant prestige premium. An equally exquisite boutique property often offers more intimate service, more attentive staff ratios, and comparable quality at a more efficient price.

**3. Simplify the routing**
Multi-stop itineraries with private transfers and internal flights accumulate cost quickly. A more focused itinerary — fewer destinations, more depth — often feels more luxurious and costs less.

**4. Consider longer stays**
Subject to availability, some properties may offer added-value benefits or complimentary nights for extended stays.

**5. Travel to an equally beautiful but lesser-known destination**
For every Maldives, there is a Seychelles or an Andaman Islands. For every Santorini, there is a Lefkada or Milos. Equivalent beauty, significantly fewer crowds and costs.

If you share your approximate total budget and preferred style of travel, I can redesign the trip to feel exceptional within your parameters — without making it feel compromised."""

    # ── Business + leisure requests ───────────────────────────
    if any(w in msg for w in ["business", "work trip", "bleisure", "business travel", "corporate", "executive"]):
        return """Certainly. Business and leisure travel — often called bleisure — is one of the most satisfying ways to combine professional obligations with genuine luxury experiences.

## Three Excellent Business + Leisure Destinations

**1. Singapore**
One of Asia's premier business hubs, with an extraordinary personal lifestyle offering — exceptional food culture, immaculate safety, Gardens by the Bay, Sentosa Island, private rooftop clubs, and seamless connectivity to regional leisure destinations (Bali is 2.5 hours; Bangkok is 2 hours).

Suggested extension: Add 3–4 nights in Bali after your business days in Singapore.

**2. Dubai**
The Middle East's preeminent business gateway, with luxury lifestyle options that are arguably unmatched — beach clubs, desert dinners, helicopter tours, Michelin dining, and private yacht charters available at a moment's notice.

Suggested extension: Add a weekend in Abu Dhabi or a short Maldives extension.

**3. London**
For Europe-focused business, London combines world-class professional facilities with extraordinary cultural richness — West End theatre, Michelin dining, private members' clubs, Savile Row tailoring, and weekend escapes to the Cotswolds, Edinburgh, or Paris.

---

## Practical Considerations for Business Luxury Travel

- I would recommend suites at business-focused luxury hotels (Four Seasons, Mandarin Oriental, Aman) that offer genuine separation between workspace and relaxation.
- Club or first-class travel is advisable for any journey exceeding 4 hours.
- I can help design the leisure component of your trip around your confirmed business schedule if you share the dates.

Which destination are you considering, and how many business days are involved?"""

    # ── Multi-country / long trip ─────────────────────────────
    if any(w in msg for w in ["multi-country", "multi country", "15 day", "15-day", "multiple country", "two country", "three country", "month"]):
        return """Certainly. A multi-country luxury itinerary requires thoughtful pacing and careful routing to ensure the journey feels elegant rather than exhausting.

## Three Outstanding Multi-Country Luxury Circuits

**1. Southeast Asia Luxury Circuit (14–16 nights)**
Singapore (3 nights) → Bali, Indonesia (5 nights) → Luang Prabang, Laos (3 nights) → Hanoi and Ha Long Bay, Vietnam (4 nights)

A refined journey through four extraordinary cultures — modern urban sophistication, tropical island sanctuary, ancient Buddhist heritage, and dramatic limestone seascapes.

**2. Middle East and Indian Ocean (14–16 nights)**
Dubai (4 nights) → Jordan / Petra (3 nights) → Seychelles or Maldives (7 nights)

Desert grandeur, one of the ancient world's greatest archaeological sites, and an Indian Ocean island finale. A deeply varied and impressive journey.

**3. Southern Europe Grand Tour (14–18 nights)**
Paris (4 nights) → Tuscany (3 nights) → Rome (3 nights) → Amalfi Coast (4 nights) → Santorini (4 nights)

The classic European luxury journey — fashion, culture, gastronomy, history, coastal beauty, and Aegean romance.

---

## Key Planning Principles for Multi-Country Travel

- Allow at least 3 nights per destination to avoid feeling rushed
- Use private transfers between airports and hotels for seamless transitions
- Build in one fully unscheduled day per destination for flexibility
- For 15+ night journeys, I recommend no more than 4 destinations

Which part of the world interests you most, and is this journey for two, a family, or a group?"""

    # ── Unique / unusual destination requests ─────────────────
    if any(w in msg for w in ["unique", "unusual", "off the beaten", "different", "not common", "less known", "underrated", "hidden"]):
        return """Certainly. For travellers seeking the extraordinary over the familiar, allow me to suggest five remarkable destinations that most luxury travellers have yet to discover.

## Five Exceptional Underrated Luxury Destinations

**1. Bhutan**
The only carbon-negative country in the world — a Himalayan kingdom of ancient monasteries, pristine valleys, and a commitment to quality over quantity in tourism. The Amankora lodge circuit is one of the most extraordinary experiences in all of Asia. Access requires a daily visitor fee that intentionally limits crowds.

**2. Namibia**
Africa's most meditative wilderness — vast rust-red dunes, ancient quiver trees, extraordinary wildlife, and an absolute silence that is increasingly rare in this world. Sossusvlei dunes, Etosha National Park, and the Skeleton Coast. The skies here are extraordinary.

**3. Faroe Islands**
A dramatic North Atlantic archipelago of cliffs, waterfalls, and migratory seabirds, with a surprising and increasingly celebrated culinary scene. Raw, untamed, and extraordinarily photogenic. Best May–August.

**4. Palawan, Philippines**
Consistently ranked among the world's most beautiful islands — turquoise waters, limestone karsts, and small luxury resorts that feel genuinely secluded. Less commercialised than Bali, with comparable natural beauty.

**5. Oman**
The Arabian Peninsula's best-kept secret — ancient forts, pristine desert dunes, fjord-like coastlines, and one of the world's most warm and genuine cultures. The Alila Jabal Akhdar and Six Senses Zighy Bay are exceptional properties.

Which of these resonates with you, or shall I suggest something based on a specific style of travel?"""

    # ── Parents / family trip ─────────────────────────────────
    if any(w in msg for w in ["parents", "parent", "family", "children", "kids", "child", "grandparent"]):
        return """Certainly. Travelling with family — whether parents, children, or multiple generations — requires thoughtful planning to ensure everyone's comfort and enjoyment.

## Recommended Family Luxury Destinations

**For Families with Young Children:**

**1. Dubai** — Aquaventure Waterpark, Ski Dubai, desert safari, private beach clubs, and world-class family resorts. Exceptionally safe and well-organized.

**2. Singapore** — Zoo (world-class), Gardens by the Bay, Universal Studios, Sentosa Island, and extraordinary food variety. Very manageable and stimulating for children.

**3. Bali** — Cultural immersion, private villa living with pool, elephant sanctuary visits, and a warm, welcoming environment for families.

**For Multi-Generational Trips (including elderly parents or grandparents):**

**1. Italy (Rome and Tuscany)** — Cultural richness without excessive physical demands. Private car transfers, comfortable villas, fine dining, and extraordinary history. Suitable for a wide range of mobility levels.

**2. Switzerland** — Alpine scenery by train or cable car, lake cruises, Geneva and Lucerne culture. Exceptionally comfortable and safe for all ages.

**3. Japan** — Impeccably organized, respectful culture, excellent accessibility in major cities, and extraordinary variety across generations.

---

May I ask the ages of the travellers involved, approximate dates, and whether there are any mobility or accessibility considerations? That will allow me to refine the suggestion significantly."""

    # ── Birthday trip ─────────────────────────────────────────
    if any(w in msg for w in ["birthday", "celebration", "milestone", "anniversary", "special occasion"]):
        return """Certainly. A milestone birthday or anniversary deserves a truly exceptional setting — one that feels meaningful, private, and elevated beyond the ordinary.

## Five Exceptional Celebration Destinations

**1. Amalfi Coast, Italy**
Hillside villas, Michelin dining, private yacht charter, and cinematic coastline views — few settings create a more romantic and impressive celebration backdrop. A suite at Belmond Hotel Caruso in Ravello with a private terrace dinner is extraordinary.

**2. French Riviera and Monaco**
Champagne on a private yacht in the harbor, Michelin dining in Monaco, helicopter transfers, and the unmistakable glamour of the Côte d'Azur. Ideal for those who appreciate prestige and spectacle.

**3. Kyoto, Japan**
For a more thoughtful, culturally rich celebration — a traditional ryokan with kaiseki dinner, private temple ceremony blessing, and a quiet beauty that feels genuinely rare. A 50th or 60th birthday in Kyoto is unforgettable.

**4. Maldives — Private Island**
An entire private island or villa experience for a small group — bespoke beach dinners, personalized celebration touches, champagne sunsets, and complete seclusion. One of the most impressive ways to celebrate in complete privacy.

**5. Seychelles**
For a combination of natural beauty and intimate luxury — private island resorts, turquoise bays, and personalized celebration experiences that feel genuinely exclusive.

---

May I ask how many guests would be celebrating, the time of year, and whether you prefer a single destination or a journey across multiple places?"""

    # ── General / open-ended query ────────────────────────────
    if any(w in msg for w in ["suggest", "recommend", "where", "plan", "trip", "vacation", "holiday", "travel", "destination"]):
        return """Certainly. Since your preferences are open, allow me to suggest three refined directions that represent very different but equally exceptional travel experiences:

**1. Maldives — Private Island Escape**
Best for overwater villas, complete privacy, slow luxury, spa rituals, ocean dining, and marine experiences. Ideal for 6–9 nights. Perfect for couples, honeymoons, and anyone seeking absolute rest.

**2. Japan — Culture, Cuisine, and Precision**
A refined Tokyo and Kyoto experience with Michelin dining, private temple visits, luxury ryokan stays, and a cultural depth unlike anywhere else. Ideal for 8–10 nights. Perfect for curious, sophisticated travellers.

**3. Italy — Romance and Coastal Grandeur**
Rome, Florence, Tuscany, and the Amalfi Coast — private transfers, boutique luxury hotels, vineyard lunches, coastal yacht charter, and art-led experiences. Ideal for 9–12 nights. Perfect for those who love history, food, and scenery.

**Other directions I would be pleased to develop for you:**
- African safari (Kenya, Tanzania, South Africa)
- French Riviera and Monaco
- Bali and Southeast Asia
- Greece (Santorini, Mykonos, or Athens)
- India (Rajasthan, Kerala, Andaman Islands)
- South America (Patagonia, Peru, Brazil)
- Switzerland and the Alps

May I know whether this trip is for relaxation, celebration, cultural exploration, adventure, or a specific occasion? That will allow me to refine the recommendation significantly."""

    # ── Default fallback ──────────────────────────────────────
    return """Thank you for reaching out. I would be pleased to assist you with your travel planning.

To provide you with the most appropriate recommendations, may I ask a few questions:

— **Where in the world are you drawn to?** (or would you like me to suggest destinations?)
— **What is the style of experience you are seeking?** Relaxation, cultural immersion, adventure, wellness, celebration, or a combination?
— **How many travellers will be joining?** (couple, family, solo, group)
— **Do you have a preferred travel timeframe?**
— **Is there a special occasion for this journey?**

Even the smallest detail helps me design something genuinely suited to your preferences. I look forward to helping you plan an extraordinary journey."""


# ══════════════════════════════════════════════════════════════
# CLAUDE API INTEGRATION
# ══════════════════════════════════════════════════════════════

async def _call_claude(message: str, history: list) -> str:
    """
    Call the Anthropic Claude API.
    Requires CLAUDE_API_KEY in .env file.
    """
    import httpx

    # Build the messages array for Claude API
    messages = []

    # Add conversation history
    for item in history:
        if item.get("role") in ["user", "assistant"]:
            messages.append({
                "role": item["role"],
                "content": item["content"]
            })

    # Add the current user message
    messages.append({
        "role": "user",
        "content": message
    })

    headers = {
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
    }

    payload = {
        "model": "claude-3-5-sonnet-20241022",  # Update to latest available model
        "max_tokens": 2048,
        "system": LUXY_SYSTEM_PROMPT,
        "messages": messages
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            "https://api.anthropic.com/v1/messages",
            headers=headers,
            json=payload
        )

    if response.status_code != 200:
        raise Exception(f"Claude API error: {response.status_code} — {response.text}")

    data = response.json()
    return data["content"][0]["text"]


# ══════════════════════════════════════════════════════════════
# GEMINI API INTEGRATION
# ══════════════════════════════════════════════════════════════

async def _call_gemini(message: str, history: list) -> str:
    """
    Call the Google Gemini API.
    Requires GEMINI_API_KEY in .env file.
    """
    import httpx

    # Build contents array for Gemini API
    contents = []

    # Add conversation history
    for item in history:
        role = "user" if item.get("role") == "user" else "model"
        contents.append({
            "role": role,
            "parts": [{"text": item["content"]}]
        })

    # Add current message
    contents.append({
        "role": "user",
        "parts": [{"text": message}]
    })

    # System instruction for Gemini
    system_instruction = {
        "parts": [{"text": LUXY_SYSTEM_PROMPT}]
    }

    payload = {
        "system_instruction": system_instruction,
        "contents": contents,
        "generationConfig": {
            "temperature": 0.75,
            "maxOutputTokens": 2048,
        }
    }

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={GEMINI_API_KEY}"

    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(url, json=payload)

    if response.status_code != 200:
        raise Exception(f"Gemini API error: {response.status_code} — {response.text}")

    data = response.json()
    return data["candidates"][0]["content"]["parts"][0]["text"]


# ══════════════════════════════════════════════════════════════
# MAIN ENTRY POINT
# ══════════════════════════════════════════════════════════════

async def generate_travel_response(message: str, history: list) -> str:
    """
    Generate a luxury travel consultant response.

    Args:
        message: The user's current message
        history: List of previous messages [{role, content}, ...]

    Returns:
        str: The AI consultant's response

    Raises:
        Exception: If API call fails and no fallback is available
    """

    provider = AI_PROVIDER

    # Use Claude if configured
    if provider == "claude" and CLAUDE_API_KEY:
        try:
            return await _call_claude(message, history)
        except Exception as e:
            print(f"[Luxy] Claude API error: {e}. Falling back to demo mode.")
            return _demo_response(message)

    # Use Gemini if configured
    elif provider == "gemini" and GEMINI_API_KEY:
        try:
            return await _call_gemini(message, history)
        except Exception as e:
            print(f"[Luxy] Gemini API error: {e}. Falling back to demo mode.")
            return _demo_response(message)

    # Default to demo mode
    else:
        if provider not in ["demo"]:
            print(f"[Luxy] AI_PROVIDER='{provider}' set but no API key found. Using demo mode.")
        return _demo_response(message)
