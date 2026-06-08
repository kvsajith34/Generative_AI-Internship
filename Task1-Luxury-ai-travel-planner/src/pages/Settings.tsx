import { useState, useEffect } from "react";
import {
  Settings2,
  Shield,
  Zap,
  Save,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Server,
  Info,
} from "lucide-react";
import { checkBackendHealth } from "../services/chatApi";
import Footer from "../components/Footer";

const SYSTEM_PROMPT_PREVIEW = `You are Luxy Travel Persona, a professional Luxury Travel Consultant AI for a high-end private travel planning brand.

You are not a casual chatbot. You are not a budget booking bot. You are not a generic assistant. You are a refined, composed, discreet, and intelligent luxury travel consultant.

Your job is to help users plan excellent trips around the world with premium taste, thoughtful personalization, and professional communication.

Tone: Sophisticated · Warm · Calm · Professional · Premium · Respectful

You must always remain in character as a Luxury Travel Consultant. You help users with luxury trip planning, destination recommendations, multi-country itineraries, honeymoon travel, family luxury trips, solo luxury escapes, private island experiences, safari planning, cruise planning, wellness retreats, cultural journeys, culinary travel, adventure luxury, and business travel.

[Full system prompt is stored in backend/app/prompt.py]`;

type Provider = "demo" | "claude" | "gemini";

export default function Settings() {
  const [provider, setProvider] = useState<Provider>("demo");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [temperature, setTemperature] = useState(0.75);
  const [backendUrl, setBackendUrl] = useState("http://localhost:8000");
  const [saved, setSaved] = useState(false);
  const [backendStatus, setBackendStatus] = useState<"checking" | "online" | "offline">("checking");
  const [showSystemPrompt, setShowSystemPrompt] = useState(false);

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem("luxy-settings");
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (settings.provider) setProvider(settings.provider);
        if (settings.temperature !== undefined) setTemperature(settings.temperature);
        if (settings.backendUrl) setBackendUrl(settings.backendUrl);
      } catch {
        // ignore parse errors
      }
    }
    checkHealth();
  }, []);

  const checkHealth = async () => {
    setBackendStatus("checking");
    const isOnline = await checkBackendHealth();
    setBackendStatus(isOnline ? "online" : "offline");
  };

  const handleSave = () => {
    const settings = { provider, temperature, backendUrl };
    localStorage.setItem("luxy-settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const providerInfo = {
    demo: {
      label: "Demo Mode",
      desc: "Uses intelligent built-in responses. No API key required. Perfect for testing.",
      color: "text-blue-400",
      bg: "bg-blue-400/10 border-blue-400/20",
    },
    claude: {
      label: "Claude (Anthropic)",
      desc: "Anthropic's Claude AI. Requires CLAUDE_API_KEY in backend .env file.",
      color: "text-purple-400",
      bg: "bg-purple-400/10 border-purple-400/20",
    },
    gemini: {
      label: "Gemini (Google)",
      desc: "Google's Gemini AI. Requires GEMINI_API_KEY in backend .env file.",
      color: "text-green-400",
      bg: "bg-green-400/10 border-green-400/20",
    },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0D1B2A] to-[#0A0A0A] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-2 mb-6">
            <Settings2 className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-widest uppercase">
              Settings
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#FAF7F2] mb-4">
            Configuration
          </h1>
          <p className="text-[#FAF7F2]/50 text-lg">
            Manage AI provider settings, API configuration, and system preferences.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-6">

        {/* Security Notice */}
        <div className="glass rounded-2xl p-5 border border-amber-500/20">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-amber-400 text-sm font-semibold mb-1">
                Security Notice
              </h3>
              <p className="text-[#FAF7F2]/55 text-xs leading-relaxed">
                For production, API calls should be routed through a secure backend or serverless function. Do not expose secret API keys in frontend code. All API keys must be stored in the backend <code className="bg-[#FAF7F2]/10 px-1 rounded">.env</code> file only.
              </p>
            </div>
          </div>
        </div>

        {/* Backend Connection Status */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#C9A84C]" />
              <h2 className="font-display text-lg font-medium text-[#FAF7F2]">
                Backend Connection
              </h2>
            </div>
            <button
              onClick={checkHealth}
              className="flex items-center gap-1.5 text-[#FAF7F2]/40 hover:text-[#C9A84C] transition-colors text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#FAF7F2]/3 border border-[#FAF7F2]/8">
            {backendStatus === "checking" && (
              <>
                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                <div>
                  <p className="text-[#FAF7F2]/70 text-sm">Checking connection...</p>
                </div>
              </>
            )}
            {backendStatus === "online" && (
              <>
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div>
                  <p className="text-green-400 text-sm font-medium">Backend Online</p>
                  <p className="text-[#FAF7F2]/40 text-xs">{backendUrl} · FastAPI running</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
              </>
            )}
            {backendStatus === "offline" && (
              <>
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div>
                  <p className="text-red-400 text-sm font-medium">Backend Offline</p>
                  <p className="text-[#FAF7F2]/40 text-xs">
                    Start with: <code className="bg-[#FAF7F2]/10 px-1 rounded">uvicorn main:app --reload</code>
                  </p>
                </div>
                <AlertCircle className="w-4 h-4 text-red-400 ml-auto" />
              </>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
              Backend URL
            </label>
            <input
              type="text"
              value={backendUrl}
              onChange={(e) => setBackendUrl(e.target.value)}
              className="luxury-input w-full rounded-xl px-4 py-3 text-sm"
              placeholder="http://localhost:8000"
            />
          </div>
        </div>

        {/* AI Provider */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-4 h-4 text-[#C9A84C]" />
            <h2 className="font-display text-lg font-medium text-[#FAF7F2]">
              AI Provider
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {(Object.entries(providerInfo) as [Provider, typeof providerInfo.demo][]).map(
              ([key, info]) => (
                <button
                  key={key}
                  onClick={() => setProvider(key)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    provider === key
                      ? `${info.bg} border-current`
                      : "border-[#FAF7F2]/10 bg-[#FAF7F2]/3 hover:border-[#FAF7F2]/20"
                  }`}
                >
                  <div className={`text-sm font-semibold mb-1 ${provider === key ? info.color : "text-[#FAF7F2]/60"}`}>
                    {info.label}
                  </div>
                  <div className="text-[#FAF7F2]/35 text-xs leading-relaxed">{info.desc}</div>
                </button>
              )
            )}
          </div>

          {/* Provider Details */}
          {provider !== "demo" && (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${providerInfo[provider].bg}`}>
                <div className="flex items-start gap-2">
                  <Info className={`w-4 h-4 ${providerInfo[provider].color} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`text-xs font-semibold ${providerInfo[provider].color} mb-1`}>
                      {provider === "claude" ? "Anthropic Claude" : "Google Gemini"} Configuration
                    </p>
                    <p className="text-[#FAF7F2]/50 text-xs leading-relaxed">
                      {provider === "claude"
                        ? "Add your CLAUDE_API_KEY to the backend .env file. The backend will automatically use Claude API when the key is present and AI_PROVIDER=claude is set."
                        : "Add your GEMINI_API_KEY to the backend .env file. The backend will automatically use Gemini API when the key is present and AI_PROVIDER=gemini is set."}
                    </p>
                    <div className="mt-3 bg-[#0A0A0A]/50 rounded-lg p-3 font-mono text-xs text-[#FAF7F2]/40">
                      <div className="text-[#C9A84C]"># backend/.env</div>
                      <div>AI_PROVIDER={provider}</div>
                      <div>
                        {provider === "claude" ? "CLAUDE_API_KEY=" : "GEMINI_API_KEY="}
                        <span className="text-[#FAF7F2]/25">your-api-key-here</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">
                  API Key Preview (stored in backend only)
                </label>
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Configure in backend .env file — do not store here"
                    className="luxury-input w-full rounded-xl px-4 py-3 text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FAF7F2]/30 hover:text-[#C9A84C] transition-colors"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-red-400/70 text-xs mt-1.5">
                  ⚠ Never enter real API keys in the frontend UI. Configure them in backend/.env
                </p>
              </div>
            </div>
          )}

          {provider === "demo" && (
            <div className="p-4 rounded-xl bg-blue-400/8 border border-blue-400/15">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-[#FAF7F2]/55 text-xs leading-relaxed">
                  Demo mode uses intelligent built-in responses that simulate a luxury travel consultant. It handles a wide range of travel queries including honeymoon planning, safari recommendations, budget questions, difficult customers, and more — without requiring any API key.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Temperature Control */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-4 h-4 text-[#C9A84C]" />
            <h2 className="font-display text-lg font-medium text-[#FAF7F2]">
              Response Creativity
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#FAF7F2]/70 text-sm">Temperature: <span className="text-[#C9A84C] font-semibold">{temperature.toFixed(2)}</span></p>
                <p className="text-[#FAF7F2]/35 text-xs mt-0.5">
                  {temperature < 0.4 ? "Conservative · Consistent responses" :
                   temperature < 0.7 ? "Balanced · Natural variation" :
                   temperature < 0.9 ? "Creative · More variety" :
                   "Highly creative · Maximum variation"}
                </p>
              </div>
              <div className="text-[#FAF7F2]/25 text-xs">0.0 — 1.0</div>
            </div>

            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-1.5 appearance-none cursor-pointer rounded-full"
              style={{
                background: `linear-gradient(to right, #C9A84C ${temperature * 100}%, rgba(255,255,255,0.1) ${temperature * 100}%)`,
              }}
            />

            <div className="flex justify-between text-xs text-[#FAF7F2]/25">
              <span>Conservative</span>
              <span>Balanced</span>
              <span>Creative</span>
            </div>
          </div>
        </div>

        {/* System Prompt Preview */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#C9A84C]" />
              <h2 className="font-display text-lg font-medium text-[#FAF7F2]">
                System Prompt Preview
              </h2>
            </div>
            <button
              onClick={() => setShowSystemPrompt(!showSystemPrompt)}
              className="text-[#FAF7F2]/40 hover:text-[#C9A84C] text-xs transition-colors"
            >
              {showSystemPrompt ? "Hide" : "Show"} Prompt
            </button>
          </div>

          <p className="text-[#FAF7F2]/45 text-xs mb-4">
            The full system prompt is stored securely in <code className="bg-[#FAF7F2]/10 px-1 rounded">backend/app/prompt.py</code> and is never exposed to the browser. Below is a preview summary.
          </p>

          {showSystemPrompt && (
            <div className="bg-[#0A0A0A]/70 rounded-xl p-4 font-mono text-xs text-[#FAF7F2]/50 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto border border-[#C9A84C]/10">
              {SYSTEM_PROMPT_PREVIEW}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all ${
              saved
                ? "bg-green-500/20 border border-green-500/40 text-green-400"
                : "btn-primary"
            }`}
          >
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Settings Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </button>
        </div>

        {/* Backend Setup Instructions */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display text-lg font-medium text-[#FAF7F2] mb-4">
            Backend Setup Instructions
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase mb-2">1. Navigate to backend directory</p>
              <div className="bg-[#0A0A0A]/70 rounded-lg p-3 font-mono text-xs text-[#FAF7F2]/50 border border-[#FAF7F2]/8">
                cd backend
              </div>
            </div>
            <div>
              <p className="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase mb-2">2. Create virtual environment</p>
              <div className="bg-[#0A0A0A]/70 rounded-lg p-3 font-mono text-xs text-[#FAF7F2]/50 border border-[#FAF7F2]/8 space-y-1">
                <div>python -m venv venv</div>
                <div className="text-[#FAF7F2]/30"># Windows:</div>
                <div>venv\Scripts\activate</div>
                <div className="text-[#FAF7F2]/30"># Mac/Linux:</div>
                <div>source venv/bin/activate</div>
              </div>
            </div>
            <div>
              <p className="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase mb-2">3. Install dependencies</p>
              <div className="bg-[#0A0A0A]/70 rounded-lg p-3 font-mono text-xs text-[#FAF7F2]/50 border border-[#FAF7F2]/8">
                pip install -r requirements.txt
              </div>
            </div>
            <div>
              <p className="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase mb-2">4. Configure environment (optional)</p>
              <div className="bg-[#0A0A0A]/70 rounded-lg p-3 font-mono text-xs text-[#FAF7F2]/50 border border-[#FAF7F2]/8 space-y-1">
                <div className="text-[#FAF7F2]/30"># Copy and edit .env.example → .env</div>
                <div>AI_PROVIDER=demo</div>
                <div className="text-[#FAF7F2]/30"># or claude / gemini with API keys</div>
              </div>
            </div>
            <div>
              <p className="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase mb-2">5. Start the server</p>
              <div className="bg-[#0A0A0A]/70 rounded-lg p-3 font-mono text-xs text-[#FAF7F2]/50 border border-[#FAF7F2]/8">
                uvicorn main:app --reload
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
