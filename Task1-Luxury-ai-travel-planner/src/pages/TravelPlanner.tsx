import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Sparkles,
  ChevronRight,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { TravelPlannerForm } from "../types";
import { sendChatMessage, OFFLINE_MESSAGE } from "../services/chatApi";
import Footer from "../components/Footer";

const ACTIVITY_OPTIONS = [
  "Beach & Ocean",
  "Cultural Sites",
  "Fine Dining",
  "Spa & Wellness",
  "Adventure Sports",
  "Wildlife & Nature",
  "Art & Museums",
  "Shopping",
  "Nightlife",
  "Cooking Classes",
  "Yachting",
  "Golf",
  "Skiing",
  "Hiking",
];

const defaultForm: TravelPlannerForm = {
  destinationPreference: "",
  departureCity: "",
  travelDatesFrom: "",
  travelDatesTo: "",
  numberOfTravelers: "2",
  tripType: "",
  budgetRange: "",
  hotelStyle: "",
  foodPreferences: "",
  activityPreferences: [],
  specialOccasion: "",
  mobilityNeeds: "",
  paceOfTravel: "balanced",
  luxuryLevel: "ultra-luxury",
};

type Step = 1 | 2 | 3;

export default function TravelPlanner() {
  const navigate = useNavigate();
  const [form, setForm] = useState<TravelPlannerForm>(defaultForm);
  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const updateForm = (field: keyof TravelPlannerForm, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleActivity = (activity: string) => {
    setForm((prev) => {
      const current = prev.activityPreferences;
      if (current.includes(activity)) {
        return { ...prev, activityPreferences: current.filter((a) => a !== activity) };
      }
      return { ...prev, activityPreferences: [...current, activity] };
    });
  };

  const buildPlannerPrompt = (f: TravelPlannerForm): string => {
    return `Please create a detailed luxury travel plan based on the following preferences:

**Destination Preference:** ${f.destinationPreference || "Open to suggestions"}
**Departure City:** ${f.departureCity || "Not specified"}
**Travel Dates:** ${f.travelDatesFrom ? `${f.travelDatesFrom} to ${f.travelDatesTo}` : "Flexible"}
**Number of Travelers:** ${f.numberOfTravelers}
**Trip Type:** ${f.tripType || "Not specified"}
**Budget Range:** ${f.budgetRange || "Ultra-luxury"}
**Hotel Style:** ${f.hotelStyle || "Ultra-luxury / Private villa"}
**Food Preferences:** ${f.foodPreferences || "Fine dining, local cuisine"}
**Activity Preferences:** ${f.activityPreferences.length > 0 ? f.activityPreferences.join(", ") : "Open"}
**Special Occasion:** ${f.specialOccasion || "None"}
**Mobility/Accessibility Needs:** ${f.mobilityNeeds || "None"}
**Pace of Travel:** ${f.paceOfTravel}
**Luxury Level:** ${f.luxuryLevel === "private-vip" ? "Private / VIP" : f.luxuryLevel === "ultra-luxury" ? "Ultra-Luxury" : "Premium"}

Please provide a polished, structured travel plan with multiple destination options if appropriate, day-by-day itinerary ideas, hotel style suggestions, and experience recommendations.`;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const prompt = buildPlannerPrompt(form);
      const reply = await sendChatMessage(prompt, []);
      setResult(reply);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const isNetworkError = err instanceof TypeError && err.message.includes("fetch");
      setError(isNetworkError ? OFFLINE_MESSAGE : "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatResult = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="font-display text-[#C9A84C] text-xl font-semibold mt-6 mb-2">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        return (
          <h3 key={i} className="font-display text-[#E8D5A3] text-base font-semibold mt-4 mb-1">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} className="font-semibold text-[#E8D5A3] mt-3">
            {line.slice(2, -2)}
          </p>
        );
      } else if (line.startsWith("- ") || line.startsWith("• ")) {
        return (
          <div key={i} className="flex gap-2 my-1">
            <span className="text-[#C9A84C]">—</span>
            <span className="text-[#FAF7F2]/75">{line.slice(2)}</span>
          </div>
        );
      } else if (/^\d+\. /.test(line)) {
        const match = line.match(/^(\d+)\. (.+)/);
        if (match) {
          return (
            <div key={i} className="flex gap-2 my-1.5">
              <span className="text-[#C9A84C] font-bold min-w-5">{match[1]}.</span>
              <span className="text-[#FAF7F2]/75">{match[2]}</span>
            </div>
          );
        }
      } else if (line.trim() === "") {
        return <div key={i} className="h-2" />;
      }
      return (
        <p key={i} className="text-[#FAF7F2]/75 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0D1B2A] to-[#0A0A0A] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-2 mb-6">
            <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-widest uppercase">
              Travel Planner
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#FAF7F2] mb-4">
            Design Your <em className="text-[#C9A84C] not-italic">Journey</em>
          </h1>
          <p className="text-[#FAF7F2]/50 text-lg max-w-xl mx-auto">
            Complete the form below and your AI luxury travel consultant will craft a bespoke travel plan.
          </p>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="glass rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#C9A84C]/15">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#9A7A2E] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#0A0A0A]" />
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-[#FAF7F2]">
                  Your Personalised Travel Plan
                </h2>
                <p className="text-[#C9A84C] text-xs">Luxy Travel Persona · AI Concierge</p>
              </div>
            </div>
            <div className="text-sm space-y-1">{formatResult(result)}</div>
            <div className="mt-8 pt-4 border-t border-[#C9A84C]/10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setResult(null);
                  setStep(1);
                }}
                className="btn-outline px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold"
              >
                Plan Another Trip
              </button>
              <button
                onClick={() =>
                  navigate(`/concierge?q=I want to refine my travel plan: ${form.destinationPreference || "my trip"}`)
                }
                className="btn-primary px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
              >
                Refine with AI Concierge
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {!result && (
        <div className="max-w-4xl mx-auto px-6 pb-16">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {([1, 2, 3] as Step[]).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    step === s
                      ? "bg-gradient-to-br from-[#C9A84C] to-[#9A7A2E] text-[#0A0A0A]"
                      : step > s
                      ? "bg-[#C9A84C]/30 text-[#C9A84C]"
                      : "bg-[#FAF7F2]/10 text-[#FAF7F2]/30"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <ChevronRight
                    className={`w-4 h-4 ${step > s ? "text-[#C9A84C]" : "text-[#FAF7F2]/20"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Basics */}
          {step === 1 && (
            <div className="glass rounded-3xl p-8 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-medium text-[#FAF7F2] mb-1">
                  Where & When
                </h2>
                <p className="text-[#FAF7F2]/40 text-sm">
                  Tell us about your destination and travel dates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                    Destination Preference
                  </label>
                  <input
                    type="text"
                    value={form.destinationPreference}
                    onChange={(e) => updateForm("destinationPreference", e.target.value)}
                    placeholder="e.g. Maldives, Japan, Europe, Open to suggestions"
                    className="luxury-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                    Departure City
                  </label>
                  <input
                    type="text"
                    value={form.departureCity}
                    onChange={(e) => updateForm("departureCity", e.target.value)}
                    placeholder="e.g. London, New York, Dubai"
                    className="luxury-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                    Number of Travellers
                  </label>
                  <select
                    value={form.numberOfTravelers}
                    onChange={(e) => updateForm("numberOfTravelers", e.target.value)}
                    className="luxury-select w-full rounded-xl px-4 py-3 text-sm"
                  >
                    {["1 (Solo)", "2 (Couple)", "3", "4", "5-8 (Group)", "9+ (Large Group)"].map((opt) => (
                      <option key={opt} value={opt.split(" ")[0]}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                    <Calendar className="inline w-3 h-3 mr-1" />
                    Travel From
                  </label>
                  <input
                    type="date"
                    value={form.travelDatesFrom}
                    onChange={(e) => updateForm("travelDatesFrom", e.target.value)}
                    className="luxury-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                    <Calendar className="inline w-3 h-3 mr-1" />
                    Travel To
                  </label>
                  <input
                    type="date"
                    value={form.travelDatesTo}
                    onChange={(e) => updateForm("travelDatesTo", e.target.value)}
                    className="luxury-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                    Trip Type
                  </label>
                  <select
                    value={form.tripType}
                    onChange={(e) => updateForm("tripType", e.target.value)}
                    className="luxury-select w-full rounded-xl px-4 py-3 text-sm"
                  >
                    <option value="">Select trip type</option>
                    {[
                      "Honeymoon",
                      "Anniversary",
                      "Birthday Celebration",
                      "Family Holiday",
                      "Solo Adventure",
                      "Group Travel",
                      "Business & Leisure",
                      "Wellness Retreat",
                      "Cultural Exploration",
                      "Safari Adventure",
                      "Cruise",
                      "Other",
                    ].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                    Special Occasion
                  </label>
                  <input
                    type="text"
                    value={form.specialOccasion}
                    onChange={(e) => updateForm("specialOccasion", e.target.value)}
                    placeholder="e.g. 10th anniversary, 40th birthday"
                    className="luxury-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="btn-primary px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <div className="glass rounded-3xl p-8 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-medium text-[#FAF7F2] mb-1">
                  Style & Preferences
                </h2>
                <p className="text-[#FAF7F2]/40 text-sm">
                  Help us understand your luxury travel style.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                    Budget Range
                  </label>
                  <select
                    value={form.budgetRange}
                    onChange={(e) => updateForm("budgetRange", e.target.value)}
                    className="luxury-select w-full rounded-xl px-4 py-3 text-sm"
                  >
                    <option value="">Select budget range</option>
                    <option value="$5,000–$10,000 total">$5,000–$10,000 total</option>
                    <option value="$10,000–$25,000 total">$10,000–$25,000 total</option>
                    <option value="$25,000–$50,000 total">$25,000–$50,000 total</option>
                    <option value="$50,000–$100,000 total">$50,000–$100,000 total</option>
                    <option value="$100,000+ total">$100,000+ (No Limit)</option>
                    <option value="Flexible – prioritize quality">Flexible – prioritize quality</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                    Preferred Hotel Style
                  </label>
                  <select
                    value={form.hotelStyle}
                    onChange={(e) => updateForm("hotelStyle", e.target.value)}
                    className="luxury-select w-full rounded-xl px-4 py-3 text-sm"
                  >
                    <option value="">Select hotel style</option>
                    <option value="Iconic 5-star hotel">Iconic 5-star hotel</option>
                    <option value="Private villa or estate">Private villa or estate</option>
                    <option value="Boutique luxury property">Boutique luxury property</option>
                    <option value="Overwater bungalow">Overwater bungalow / villa</option>
                    <option value="Historic palace or château">Historic palace or château</option>
                    <option value="Eco-luxury lodge">Eco-luxury lodge</option>
                    <option value="Private island resort">Private island resort</option>
                    <option value="Safari camp">Luxury safari camp or tent</option>
                    <option value="Ryokan (Japanese inn)">Ryokan (Japanese inn)</option>
                    <option value="Open to recommendations">Open to recommendations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                    Food Preferences
                  </label>
                  <input
                    type="text"
                    value={form.foodPreferences}
                    onChange={(e) => updateForm("foodPreferences", e.target.value)}
                    placeholder="e.g. Fine dining, vegetarian, local cuisine"
                    className="luxury-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                    Mobility / Accessibility Needs
                  </label>
                  <input
                    type="text"
                    value={form.mobilityNeeds}
                    onChange={(e) => updateForm("mobilityNeeds", e.target.value)}
                    placeholder="e.g. Wheelchair accessible, no hiking"
                    className="luxury-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
              </div>

              {/* Activity Preferences */}
              <div>
                <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3">
                  Activity Preferences
                </label>
                <div className="flex flex-wrap gap-2">
                  {ACTIVITY_OPTIONS.map((activity) => (
                    <button
                      key={activity}
                      type="button"
                      onClick={() => toggleActivity(activity)}
                      className={`px-4 py-2 rounded-full text-xs transition-all ${
                        form.activityPreferences.includes(activity)
                          ? "bg-gradient-to-r from-[#C9A84C] to-[#9A7A2E] text-[#0A0A0A] font-semibold"
                          : "bg-[#FAF7F2]/5 border border-[#FAF7F2]/15 text-[#FAF7F2]/55 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="btn-outline px-6 py-3 rounded-full text-sm font-semibold tracking-widest uppercase"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-primary px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Luxury Level */}
          {step === 3 && (
            <div className="glass rounded-3xl p-8 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-medium text-[#FAF7F2] mb-1">
                  Luxury Level & Pace
                </h2>
                <p className="text-[#FAF7F2]/40 text-sm">
                  Final details to craft your perfect plan.
                </p>
              </div>

              {/* Pace of Travel */}
              <div>
                <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4">
                  Pace of Travel
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {(["relaxed", "balanced", "packed"] as const).map((pace) => (
                    <button
                      key={pace}
                      type="button"
                      onClick={() => updateForm("paceOfTravel", pace)}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        form.paceOfTravel === pace
                          ? "border-[#C9A84C] bg-[#C9A84C]/10"
                          : "border-[#FAF7F2]/10 bg-[#FAF7F2]/3 hover:border-[#C9A84C]/40"
                      }`}
                    >
                      <div className="text-2xl mb-2">
                        {pace === "relaxed" ? "🌿" : pace === "balanced" ? "⚖️" : "🚀"}
                      </div>
                      <div
                        className={`text-sm font-medium capitalize ${
                          form.paceOfTravel === pace ? "text-[#C9A84C]" : "text-[#FAF7F2]/60"
                        }`}
                      >
                        {pace}
                      </div>
                      <div className="text-xs text-[#FAF7F2]/35 mt-1">
                        {pace === "relaxed"
                          ? "Few curated experiences"
                          : pace === "balanced"
                          ? "Mix of activities"
                          : "Full itinerary"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Luxury Level */}
              <div>
                <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4">
                  Luxury Level
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {(
                    [
                      {
                        value: "premium",
                        label: "Premium",
                        emoji: "⭐",
                        desc: "5-star quality",
                      },
                      {
                        value: "ultra-luxury",
                        label: "Ultra-Luxury",
                        emoji: "💎",
                        desc: "World's finest",
                      },
                      {
                        value: "private-vip",
                        label: "Private / VIP",
                        emoji: "👑",
                        desc: "No compromise",
                      },
                    ] as const
                  ).map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => updateForm("luxuryLevel", level.value)}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        form.luxuryLevel === level.value
                          ? "border-[#C9A84C] bg-[#C9A84C]/10"
                          : "border-[#FAF7F2]/10 bg-[#FAF7F2]/3 hover:border-[#C9A84C]/40"
                      }`}
                    >
                      <div className="text-2xl mb-2">{level.emoji}</div>
                      <div
                        className={`text-sm font-medium ${
                          form.luxuryLevel === level.value
                            ? "text-[#C9A84C]"
                            : "text-[#FAF7F2]/60"
                        }`}
                      >
                        {level.label}
                      </div>
                      <div className="text-xs text-[#FAF7F2]/35 mt-1">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 glass border border-red-500/20 rounded-xl px-4 py-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[#FAF7F2]/60 text-xs leading-relaxed whitespace-pre-line">
                    {error}
                  </p>
                </div>
              )}

              {/* Plan Summary */}
              <div className="glass rounded-2xl p-5 border border-[#C9A84C]/10">
                <h3 className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3">
                  Plan Summary
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#FAF7F2]/50">
                  <div>
                    <span className="text-[#FAF7F2]/30">Destination: </span>
                    {form.destinationPreference || "Open"}
                  </div>
                  <div>
                    <span className="text-[#FAF7F2]/30">Travellers: </span>
                    {form.numberOfTravelers}
                  </div>
                  <div>
                    <span className="text-[#FAF7F2]/30">Trip Type: </span>
                    {form.tripType || "Not specified"}
                  </div>
                  <div>
                    <span className="text-[#FAF7F2]/30">Budget: </span>
                    {form.budgetRange || "Flexible"}
                  </div>
                  <div>
                    <span className="text-[#FAF7F2]/30">Pace: </span>
                    {form.paceOfTravel}
                  </div>
                  <div>
                    <span className="text-[#FAF7F2]/30">Level: </span>
                    {form.luxuryLevel}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="btn-outline px-6 py-3 rounded-full text-sm font-semibold tracking-widest uppercase"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="btn-primary px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Crafting Your Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Travel Plan
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
