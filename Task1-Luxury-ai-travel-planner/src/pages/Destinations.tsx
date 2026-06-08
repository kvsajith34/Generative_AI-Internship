import { useState } from "react";
import { Search, Globe, Filter } from "lucide-react";
import { destinations, continents } from "../data/destinations";
import DestinationCard from "../components/DestinationCard";
import Footer from "../components/Footer";

const LUXURY_STYLES = [
  "All",
  "Romantic",
  "Adventure",
  "Wellness",
  "Culture",
  "Beach",
  "Safari",
  "Urban",
];

const STYLE_MAP: Record<string, string[]> = {
  Romantic: ["romance", "intimate", "honeymoon", "elegance", "aegean"],
  Adventure: ["adventure", "wilderness", "solitude", "discovery"],
  Wellness: ["wellness", "sanctuary", "zen", "retreat"],
  Culture: ["culture", "historic", "imperial", "grandeur", "refinement"],
  Beach: ["coastal", "island", "pacific", "ocean", "marine", "lagoon"],
  Safari: ["safari", "wildlife", "wilderness", "bush"],
  Urban: ["urban", "metropolitan", "sophistication", "glamour"],
};

export default function Destinations() {
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = destinations.filter((dest) => {
    const matchesContinent =
      selectedContinent === "All" || dest.continent === selectedContinent;

    const matchesStyle =
      selectedStyle === "All" ||
      STYLE_MAP[selectedStyle]?.some(
        (keyword) =>
          dest.luxuryStyle.toLowerCase().includes(keyword) ||
          dest.tag.toLowerCase().includes(keyword) ||
          dest.bestFor.some((b) => b.toLowerCase().includes(keyword))
      );

    const matchesSearch =
      !searchQuery ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.bestFor.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesContinent && matchesStyle && matchesSearch;
  });

  const continentCounts = continents.slice(1).map((continent) => ({
    continent,
    count: destinations.filter((d) => d.continent === continent).length,
  }));

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0D1B2A] to-[#0A0A0A] py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-2 mb-6">
            <Globe className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-widest uppercase">
              Destination Inspiration
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#FAF7F2] mb-4">
            The World's Finest <em className="text-[#C9A84C] not-italic">Destinations</em>
          </h1>
          <p className="text-[#FAF7F2]/50 text-lg max-w-xl mx-auto mb-8">
            Explore curated luxury destinations across every continent. Click any card to plan your journey with the AI concierge.
          </p>

          {/* Continent Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {continentCounts.map(({ continent, count }) => (
              <div
                key={continent}
                className="flex items-center gap-2 bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 rounded-full px-4 py-2"
              >
                <span className="text-[#C9A84C] text-xs font-medium">{continent}</span>
                <span className="text-[#FAF7F2]/35 text-xs">{count} destinations</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FAF7F2]/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations, countries, or travel styles..."
              className="luxury-input w-full rounded-full pl-11 pr-4 py-3 text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-[#FAF7F2]/50 hover:text-[#C9A84C] text-xs transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
            <div className="text-[#FAF7F2]/25 text-xs">
              Showing {filtered.length} of {destinations.length} destinations
            </div>
          </div>

          {showFilters && (
            <div className="space-y-4 animate-fade-in-up">
              {/* Continent Filter */}
              <div>
                <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                  Region
                </p>
                <div className="flex flex-wrap gap-2">
                  {continents.map((continent) => (
                    <button
                      key={continent}
                      onClick={() => setSelectedContinent(continent)}
                      className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                        selectedContinent === continent
                          ? "bg-gradient-to-r from-[#C9A84C] to-[#9A7A2E] text-[#0A0A0A] font-semibold"
                          : "bg-[#FAF7F2]/5 border border-[#FAF7F2]/15 text-[#FAF7F2]/55 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
                      }`}
                    >
                      {continent}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Filter */}
              <div>
                <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                  Travel Style
                </p>
                <div className="flex flex-wrap gap-2">
                  {LUXURY_STYLES.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                        selectedStyle === style
                          ? "bg-gradient-to-r from-[#C9A84C] to-[#9A7A2E] text-[#0A0A0A] font-semibold"
                          : "bg-[#FAF7F2]/5 border border-[#FAF7F2]/15 text-[#FAF7F2]/55 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {(selectedContinent !== "All" || selectedStyle !== "All" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedContinent("All");
                    setSelectedStyle("All");
                    setSearchQuery("");
                  }}
                  className="text-[#FAF7F2]/40 hover:text-[#C9A84C] text-xs transition-colors underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Destination Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Globe className="w-12 h-12 text-[#C9A84C]/30 mx-auto mb-4" />
            <h3 className="font-display text-2xl font-light text-[#FAF7F2]/50 mb-2">
              No destinations found
            </h3>
            <p className="text-[#FAF7F2]/30 text-sm">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <>
            {/* Group by continent */}
            {selectedContinent === "All" && !searchQuery && selectedStyle === "All" ? (
              <>
                {continents.slice(1).map((continent) => {
                  const continentDests = filtered.filter((d) => d.continent === continent);
                  if (continentDests.length === 0) return null;
                  return (
                    <div key={continent} className="mb-14">
                      <div className="flex items-center gap-4 mb-6">
                        <h2 className="font-display text-3xl font-light text-[#FAF7F2]">
                          {continent}
                        </h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#C9A84C]/30 to-transparent" />
                        <span className="text-[#FAF7F2]/30 text-xs">
                          {continentDests.length} destinations
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {continentDests.map((dest) => (
                          <DestinationCard key={dest.id} destination={dest} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
