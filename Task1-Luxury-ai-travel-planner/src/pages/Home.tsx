import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Globe,
  Shield,
  Compass,
  Star,
  ArrowRight,
  MapPin,
  Crown,
  Gem,
  Plane,
} from "lucide-react";
import { destinations } from "../data/destinations";
import Footer from "../components/Footer";

const features = [
  {
    icon: Crown,
    title: "Private AI Concierge",
    description:
      "Your dedicated luxury travel consultant, available around the clock. Expert knowledge across 150+ destinations worldwide.",
  },
  {
    icon: Gem,
    title: "Bespoke Itineraries",
    description:
      "Every journey is crafted to your precise preferences — pace, style, budget, and occasion — with multiple curated options.",
  },
  {
    icon: Compass,
    title: "Global Destination Expertise",
    description:
      "From private Maldives islands to Kyoto ryokans, East African safaris to French Riviera villas — no destination is out of reach.",
  },
  {
    icon: Shield,
    title: "Discreet & Professional",
    description:
      "Refined, composed service. Your travel preferences and details are handled with the utmost discretion and professionalism.",
  },
  {
    icon: Star,
    title: "Ultra-Luxury Standards",
    description:
      "Only the finest hotels, experiences, and service standards are recommended. Quality is never compromised.",
  },
  {
    icon: Globe,
    title: "360° Travel Intelligence",
    description:
      "From honeymoon planning to luxury safaris, business travel to wellness retreats — all travel styles, expertly curated.",
  },
];

const travelThemes = [
  { label: "Honeymoon", emoji: "💎", count: "50+ destinations" },
  { label: "Private Island", emoji: "🏝️", count: "30+ resorts" },
  { label: "Luxury Safari", emoji: "🦁", count: "20+ camps" },
  { label: "Cultural Escape", emoji: "🏛️", count: "60+ cities" },
  { label: "Wellness Retreat", emoji: "🌿", count: "40+ sanctuaries" },
  { label: "Adventure Luxury", emoji: "⛰️", count: "35+ experiences" },
  { label: "Cruise & Yacht", emoji: "⚓", count: "25+ routes" },
  { label: "Business Class", emoji: "✈️", count: "100+ cities" },
];

const showcaseDestinations = destinations.slice(0, 6);

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/85 via-[#0A0A0A]/70 to-[#0A0A0A]" />
        {/* Gold glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A84C]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C9A84C]/5 rounded-full blur-3xl" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center relative z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-widest uppercase">
              AI-Powered Luxury Travel
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-light text-[#FAF7F2] leading-none mb-4 tracking-tight">
            Luxy Travel
            <br />
            <span className="gold-shimmer font-medium">Persona</span>
          </h1>

          <p className="text-[#FAF7F2]/55 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Your private AI travel persona for refined global journeys.
            <br className="hidden sm:block" />
            Bespoke. Discreet. Extraordinary.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => navigate("/concierge")}
              className="btn-primary px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase flex items-center gap-2 group"
            >
              Start Planning
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/destinations")}
              className="btn-outline px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase"
            >
              Explore Destinations
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {[
              { value: "150+", label: "Destinations" },
              { value: "AI-Powered", label: "Concierge" },
              { value: "24/7", label: "Availability" },
              { value: "∞", label: "Possibilities" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl sm:text-3xl font-medium text-[#C9A84C]">
                  {stat.value}
                </div>
                <div className="text-[#FAF7F2]/35 text-xs tracking-widest uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C]/50 to-transparent" />
        </div>
      </section>

      {/* ─── WHAT IS LUXY ─────────────────────────────────── */}
      <section className="py-24 bg-[#0D1B2A]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-2 mb-6">
                <span className="text-[#C9A84C] text-xs font-medium tracking-widest uppercase">
                  About Your Persona
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-light text-[#FAF7F2] mb-6 leading-tight">
                Designed for
                <br />
                <em className="text-[#C9A84C] not-italic">bespoke travel</em>
                <br />
                planning
              </h2>
              <p className="text-[#FAF7F2]/55 leading-relaxed mb-6">
                Luxy Travel Persona is not a generic travel booking tool. It is a private AI luxury travel consultant that engages with your preferences, asks the right questions, and designs personalised journeys of exceptional quality.
              </p>
              <p className="text-[#FAF7F2]/55 leading-relaxed mb-8">
                Whether you are planning a romantic honeymoon in the Maldives, a multi-country cultural odyssey through Europe, a family safari in East Africa, or a last-minute wellness escape — your Persona understands refined travel.
              </p>
              <div className="space-y-3">
                {[
                  "Multiple destination options, not just one answer",
                  "Structured, elegant, and readable itineraries",
                  "Professionally handles every traveller type",
                  "Never pretends to confirm reservations",
                  "Maintains luxury standards across all budgets",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2 flex-shrink-0" />
                    <span className="text-[#FAF7F2]/65 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass rounded-3xl p-8 space-y-4">
                {/* Mock chat preview */}
                <div className="flex items-center gap-3 pb-4 border-b border-[#C9A84C]/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#9A7A2E] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <div className="text-[#FAF7F2] text-xs font-semibold">Luxy Concierge</div>
                    <div className="text-[#C9A84C] text-xs">Online · Ready to plan</div>
                  </div>
                  <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>

                {/* Sample messages */}
                <div className="space-y-3">
                  <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-2xl rounded-tl-none p-3 max-w-xs">
                    <p className="text-[#FAF7F2]/80 text-xs leading-relaxed">
                      Good evening. I would be pleased to help you plan an extraordinary journey. May I ask where in the world you feel drawn to?
                    </p>
                  </div>
                  <div className="ml-auto bg-gradient-to-r from-[#C9A84C] to-[#9A7A2E] rounded-2xl rounded-tr-none p-3 max-w-xs">
                    <p className="text-[#0A0A0A] text-xs font-medium leading-relaxed">
                      We want a honeymoon — somewhere private and beautiful.
                    </p>
                  </div>
                  <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-2xl rounded-tl-none p-3">
                    <p className="text-[#FAF7F2]/80 text-xs leading-relaxed">
                      A perfect occasion. May I suggest three exceptional directions — the Maldives for overwater seclusion, Seychelles for private island romance, or Santorini for Aegean intimacy...
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/concierge")}
                  className="btn-primary w-full py-3 rounded-xl text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  <Plane className="w-3.5 h-3.5" />
                  Open AI Concierge
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ────────────────────────────────────── */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-2 mb-6">
              <span className="text-[#C9A84C] text-xs font-medium tracking-widest uppercase">
                Features
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-[#FAF7F2] mb-4">
              Luxury travel, <em className="text-[#C9A84C] not-italic">reimagined</em>
            </h2>
            <p className="text-[#FAF7F2]/45 max-w-xl mx-auto">
              Every feature is crafted to meet the standards of the world's most discerning travellers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="luxury-card glass rounded-2xl p-6"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <h3 className="font-display text-lg font-medium text-[#FAF7F2] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#FAF7F2]/45 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRAVEL THEMES ───────────────────────────────── */}
      <section className="py-24 bg-[#0D1B2A]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl sm:text-5xl font-light text-[#FAF7F2] mb-4">
              Every travel <em className="text-[#C9A84C] not-italic">style</em>
            </h2>
            <p className="text-[#FAF7F2]/45">
              Your Persona understands all forms of luxury travel.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {travelThemes.map((theme) => (
              <button
                key={theme.label}
                onClick={() =>
                  navigate(`/concierge?q=I want to plan a ${theme.label} trip`)
                }
                className="luxury-card glass rounded-2xl p-5 text-center group hover:border-[#C9A84C]/40 transition-all"
              >
                <div className="text-3xl mb-3">{theme.emoji}</div>
                <div className="font-display text-base font-medium text-[#FAF7F2] mb-1">
                  {theme.label}
                </div>
                <div className="text-[#C9A84C]/70 text-xs">{theme.count}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DESTINATION SHOWCASE ────────────────────────── */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-light text-[#FAF7F2] mb-2">
                Popular <em className="text-[#C9A84C] not-italic">destinations</em>
              </h2>
              <p className="text-[#FAF7F2]/45">
                Explore a selection of the world's finest travel experiences.
              </p>
            </div>
            <button
              onClick={() => navigate("/destinations")}
              className="btn-outline hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseDestinations.map((dest) => (
              <div
                key={dest.id}
                className="luxury-card glass rounded-2xl overflow-hidden cursor-pointer"
                onClick={() =>
                  navigate(`/concierge?q=Plan a luxury trip to ${dest.name}`)
                }
              >
                <div
                  className={`bg-gradient-to-br ${dest.imageGradient} h-44 relative`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-xl font-medium text-[#FAF7F2]">
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3 h-3 text-[#C9A84C]" />
                      <span className="text-[#C9A84C] text-xs">
                        {dest.country}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#0A0A0A]/60 border border-[#C9A84C]/30 text-[#C9A84C] text-xs px-2.5 py-1 rounded-full">
                      {dest.luxuryStyle}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[#FAF7F2]/50 text-xs leading-relaxed line-clamp-2">
                    {dest.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3 text-[#C9A84C] text-xs font-medium">
                    Plan this journey
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <button
              onClick={() => navigate("/destinations")}
              className="btn-outline px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold"
            >
              View All Destinations
            </button>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-[#0D1B2A]/50 to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="gold-divider mb-16" />
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#FAF7F2] mb-6">
            Begin your
            <br />
            <em className="text-[#C9A84C] not-italic">extraordinary</em> journey
          </h2>
          <p className="text-[#FAF7F2]/45 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Your personal AI luxury travel consultant is ready. Tell us where you wish to go.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/concierge")}
              className="btn-primary px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4" />
              Open AI Concierge
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/planner")}
              className="btn-outline px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase"
            >
              Travel Planner Form
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
