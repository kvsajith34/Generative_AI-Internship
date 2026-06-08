import { Clock, Star, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Destination } from "../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handlePlanTrip = () => {
    navigate(`/concierge?q=Plan a luxury trip to ${destination.name}, ${destination.country}`);
  };

  return (
    <div className="luxury-card glass rounded-2xl overflow-hidden group">
      {/* Header Gradient */}
      <div className={`bg-gradient-to-br ${destination.imageGradient} h-40 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-display text-xl font-medium text-[#FAF7F2]">
                {destination.name}
              </h3>
              <p className="text-[#C9A84C] text-xs tracking-wider">
                {destination.country} · {destination.continent}
              </p>
            </div>
            <span className="bg-[#C9A84C]/20 border border-[#C9A84C]/30 text-[#C9A84C] text-xs px-2.5 py-1 rounded-full">
              {destination.tag}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-[#FAF7F2]/65 text-xs leading-relaxed mb-4 line-clamp-2">
          {destination.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#C9A84C]" />
            <span className="text-[#FAF7F2]/50 text-xs">{destination.suggestedDuration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-[#C9A84C]" />
            <span className="text-[#FAF7F2]/50 text-xs truncate">{destination.seasonHint.split(",")[0]}</span>
          </div>
        </div>

        {/* Best For */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {destination.bestFor.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 text-[#FAF7F2]/50 text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expand / Collapse */}
        {expanded && (
          <div className="mb-4 border-t border-[#C9A84C]/10 pt-3">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase mb-2">
              Sample Experiences
            </p>
            <ul className="space-y-1">
              {destination.sampleExperiences.map((exp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Star className="w-2.5 h-2.5 text-[#C9A84C] mt-1 flex-shrink-0" />
                  <span className="text-[#FAF7F2]/55 text-xs">{exp}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <p className="text-[#FAF7F2]/40 text-xs">
                <span className="text-[#C9A84C]">Best season:</span> {destination.seasonHint}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[#C9A84C]/70 hover:text-[#C9A84C] text-xs transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3 h-3" /> Less
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" /> Details
              </>
            )}
          </button>

          <button
            onClick={handlePlanTrip}
            className="ml-auto btn-primary text-xs px-4 py-1.5 rounded-full"
          >
            Plan Trip
          </button>
        </div>
      </div>
    </div>
  );
}
