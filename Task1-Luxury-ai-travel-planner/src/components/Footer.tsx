import { NavLink } from "react-router-dom";
import { Sparkles, Globe, Shield, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#C9A84C]/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#9A7A2E] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#0A0A0A]" />
              </div>
              <div>
                <span className="font-display text-base font-medium text-[#FAF7F2]">Luxy</span>
                <span className="font-display text-base font-light text-[#C9A84C] ml-1">Travel Persona</span>
              </div>
            </div>
            <p className="text-[#FAF7F2]/40 text-xs leading-relaxed">
              Your private AI travel persona for refined global journeys. Crafted for discerning travellers.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "AI Concierge", path: "/concierge" },
                { label: "Travel Planner", path: "/planner" },
                { label: "Destinations", path: "/destinations" },
              ].map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className="text-[#FAF7F2]/50 hover:text-[#C9A84C] text-xs transition-colors"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialities */}
          <div>
            <h4 className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4">Specialities</h4>
            <ul className="space-y-2.5">
              {[
                "Honeymoon Travel",
                "Private Islands",
                "Luxury Safaris",
                "Wellness Retreats",
                "Cultural Journeys",
                "Adventure Luxury",
              ].map((item) => (
                <li key={item}>
                  <span className="text-[#FAF7F2]/50 text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          <div>
            <h4 className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4">Important Notes</h4>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Globe className="w-3.5 h-3.5 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <p className="text-[#FAF7F2]/40 text-xs">Travel requirements may change. Verify through official government sources.</p>
              </div>
              <div className="flex gap-2">
                <Shield className="w-3.5 h-3.5 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <p className="text-[#FAF7F2]/40 text-xs">This is an AI planning assistant. Availability and bookings must be confirmed with actual travel partners.</p>
              </div>
              <div className="flex gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <p className="text-[#FAF7F2]/40 text-xs">For critical arrangements, consult a licensed travel professional.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="gold-divider mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#FAF7F2]/25 text-xs">
            © 2025 Luxy Travel Persona. AI-powered luxury travel planning.
          </p>
          <p className="text-[#FAF7F2]/25 text-xs">
            Powered by AI · Built for discerning travellers
          </p>
        </div>
      </div>
    </footer>
  );
}
