import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Concierge from "./pages/Concierge";
import TravelPlanner from "./pages/TravelPlanner";
import Destinations from "./pages/Destinations";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0A0A0A]">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concierge" element={<Concierge />} />
          <Route path="/planner" element={<TravelPlanner />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/settings" element={<Settings />} />
          {/* Catch-all redirect */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
