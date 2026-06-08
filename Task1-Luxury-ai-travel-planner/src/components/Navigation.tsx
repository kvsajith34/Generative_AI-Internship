import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "AI Concierge", path: "/concierge" },
  { label: "Travel Planner", path: "/planner" },
  { label: "Destinations", path: "/destinations" },
  { label: "Settings", path: "/settings" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#9A7A2E] flex items-center justify-center shadow-lg shadow-amber-900/30">
              <Sparkles className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-medium text-[#FAF7F2] tracking-wide">
                Luxy
              </span>
              <span className="font-display text-lg font-light text-[#C9A84C] tracking-wide ml-1">
                Travel Persona
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <NavLink
              to="/concierge"
              className="btn-primary px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            >
              Begin Journey
            </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#FAF7F2] hover:text-[#C9A84C] transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-dark border-t border-[#C9A84C]/10">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-3 nav-link text-sm border-b border-[#C9A84C]/10 last:border-0 ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-3">
              <NavLink
                to="/concierge"
                onClick={() => setMobileOpen(false)}
                className="btn-primary block text-center px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              >
                Begin Journey
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
