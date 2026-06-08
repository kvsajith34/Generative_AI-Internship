import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Send,
  Sparkles,
  Trash2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { ChatMessage, DestinationCategory } from "../types";
import { sendChatMessage, OFFLINE_MESSAGE } from "../services/chatApi";
import { generateId, formatDate } from "../lib/utils";

const CATEGORIES: DestinationCategory[] = [
  "Honeymoon",
  "Family Luxury",
  "Private Island",
  "Cultural Escape",
  "Safari",
  "Wellness",
  "Business Class Trip",
  "Adventure Luxury",
  "Europe",
  "Asia",
  "Middle East",
  "Africa",
  "Americas",
  "Oceania",
];

const QUICK_PROMPTS = [
  "Plan a 7-day luxury honeymoon in Bali",
  "Suggest 5 luxury destinations for December",
  "Plan a 10-day Europe luxury trip",
  "Recommend private island experiences",
  "Plan a luxury safari in Africa",
  "Suggest luxury destinations in India",
  "Plan a family luxury trip to Dubai",
  "Recommend wellness retreats for two",
];

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: `Good day. I am your Luxy Travel Persona — a private AI luxury travel consultant, entirely at your service.

Whether you are planning a romantic escape, a family journey, a cultural expedition, a private island retreat, or something entirely unique, I am here to design a refined experience precisely tailored to your preferences.

**To begin, may I ask:**

— Where in the world are you drawn to?
— What style of travel do you prefer — relaxation, culture, adventure, or a thoughtful combination?
— Is this journey for a special occasion?

I look forward to crafting something extraordinary for you.`,
  timestamp: new Date(),
};

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 max-w-2xl">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#9A7A2E] flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-[#0A0A0A]" />
      </div>
      <div className="chat-message-ai rounded-2xl rounded-bl-none px-4 py-3">
        <div className="flex gap-1.5 items-center h-4">
          <div className="typing-dot w-2 h-2 bg-[#C9A84C]/70 rounded-full" />
          <div className="typing-dot w-2 h-2 bg-[#C9A84C]/70 rounded-full" />
          <div className="typing-dot w-2 h-2 bg-[#C9A84C]/70 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format content with basic markdown
  const formatContent = (text: string) => {
    const lines = text.split("\n");
    const result: React.ReactElement[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("## ")) {
        result.push(
          <h2 key={key++} className="font-display text-[#C9A84C] text-base font-semibold mt-3 mb-1">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        result.push(
          <h3 key={key++} className="font-display text-[#C9A84C] text-sm font-semibold mt-2 mb-1">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        result.push(
          <p key={key++} className="font-semibold text-[#E8D5A3] mt-2">
            {line.slice(2, -2)}
          </p>
        );
      } else if (line.startsWith("- ") || line.startsWith("• ")) {
        result.push(
          <div key={key++} className="flex gap-2 my-0.5">
            <span className="text-[#C9A84C] flex-shrink-0">—</span>
            <span>{formatInline(line.slice(2))}</span>
          </div>
        );
      } else if (/^\d+\. /.test(line)) {
        const match = line.match(/^(\d+)\. (.+)/);
        if (match) {
          result.push(
            <div key={key++} className="flex gap-2 my-1">
              <span className="text-[#C9A84C] font-semibold min-w-5 flex-shrink-0">{match[1]}.</span>
              <span>{formatInline(match[2])}</span>
            </div>
          );
        }
      } else if (line.trim() === "") {
        result.push(<div key={key++} className="h-2" />);
      } else {
        result.push(
          <p key={key++} className="leading-relaxed">
            {formatInline(line)}
          </p>
        );
      }
    }

    return result;
  };

  const formatInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-[#E8D5A3]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-xl">
          <div className="chat-message-user rounded-2xl rounded-tr-none px-4 py-3">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <div className="flex justify-end mt-1 pr-1">
            <span className="text-[#FAF7F2]/25 text-xs">{formatDate(message.timestamp)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-3 mb-6 max-w-3xl">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#9A7A2E] flex items-center justify-center flex-shrink-0 mb-5">
        <Sparkles className="w-3.5 h-3.5 text-[#0A0A0A]" />
      </div>
      <div className="flex-1">
        <div className="chat-message-ai rounded-2xl rounded-bl-none px-5 py-4 text-sm">
          <div className="text-[#FAF7F2]/85 space-y-0.5">{formatContent(message.content)}</div>
        </div>
        <div className="flex items-center gap-3 mt-1.5 pl-1">
          <span className="text-[#FAF7F2]/25 text-xs">{formatDate(message.timestamp)}</span>
          <button
            onClick={handleCopy}
            className="text-[#FAF7F2]/25 hover:text-[#C9A84C] transition-colors"
            aria-label="Copy response"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Concierge() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasHandledQuery = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle URL query parameter
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !hasHandledQuery.current) {
      hasHandledQuery.current = true;
      setTimeout(() => {
        handleSend(q);
      }, 500);
    }
  }, [searchParams]);

  const buildHistory = (msgs: ChatMessage[]) => {
    return msgs
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));
  };

  const handleSend = async (overrideMessage?: string) => {
    const text = (overrideMessage ?? input).trim();
    if (!text || isLoading) return;

    setInput("");
    setError(null);

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const history = buildHistory([...messages, userMessage]);
      const reply = await sendChatMessage(text, history.slice(0, -1));

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const isNetworkError =
        err instanceof TypeError && err.message.includes("fetch");

      if (isNetworkError) {
        setError(OFFLINE_MESSAGE);
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
    inputRef.current?.focus();
  };

  const handleCategoryClick = (category: DestinationCategory) => {
    const prompts: Record<DestinationCategory, string> = {
      Honeymoon: "Plan a luxury honeymoon trip for us",
      "Family Luxury": "Plan a luxury family holiday for 2 adults and 2 children",
      "Private Island": "Suggest private island experiences for an exclusive getaway",
      "Cultural Escape": "Plan an immersive cultural luxury trip",
      Safari: "Plan a luxury safari experience in Africa",
      Wellness: "Suggest luxury wellness retreats around the world",
      "Business Class Trip": "Plan a business luxury travel experience",
      "Adventure Luxury": "Suggest adventure luxury experiences worldwide",
      Europe: "Suggest the best luxury destinations in Europe",
      Asia: "Suggest the best luxury destinations in Asia",
      "Middle East": "Plan a luxury trip to the Middle East",
      Africa: "Plan a luxury trip to Africa",
      Americas: "Suggest luxury destinations in the Americas",
      Oceania: "Suggest luxury destinations in Oceania",
    };
    handleSend(prompts[category]);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] pt-16" style={{ backgroundImage: "url('/concierge-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      {/* Header */}
      <div className="glass-dark border-b border-[#C9A84C]/10 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#9A7A2E] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#0A0A0A]" />
          </div>
          <div>
            <h1 className="font-display text-base font-medium text-[#FAF7F2]">
              AI Concierge
            </h1>
            <p className="text-[#C9A84C] text-xs">Luxy Travel Persona · Private Consultant</p>
          </div>
          <div className="ml-2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[#FAF7F2]/40 text-xs">Online</span>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="flex items-center gap-1.5 text-[#FAF7F2]/40 hover:text-[#FAF7F2]/70 transition-colors text-xs"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Category Chips */}
      <div className="flex gap-2 px-4 sm:px-6 py-3 overflow-x-auto flex-shrink-0 border-b border-[#C9A84C]/10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            disabled={isLoading}
            className="flex-shrink-0 bg-[#FAF7F2]/5 hover:bg-[#C9A84C]/10 border border-[#FAF7F2]/10 hover:border-[#C9A84C]/30 text-[#FAF7F2]/60 hover:text-[#C9A84C] text-xs px-3 py-1.5 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-2" style={{ background: "rgba(10,10,10,0.7)" }}>
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isLoading && <TypingIndicator />}

          {error && (
            <div className="flex items-start gap-3 mb-4 max-w-2xl">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="glass border border-red-500/20 rounded-xl px-4 py-3 flex-1">
                <p className="text-red-300 text-xs font-semibold mb-1">
                  Connection Issue
                </p>
                <p className="text-[#FAF7F2]/60 text-xs leading-relaxed whitespace-pre-line">
                  {error}
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompts (shown when only welcome message) */}
      {messages.length === 1 && !isLoading && (
        <div className="px-4 sm:px-6 pb-2 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#FAF7F2]/30 text-xs mb-2 tracking-wider uppercase">
              Suggested prompts
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-left glass rounded-xl px-4 py-3 text-xs text-[#FAF7F2]/55 hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-all border border-transparent"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-[#C9A84C]/10 px-4 sm:px-6 py-4 flex-shrink-0 glass-dark">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your luxury travel consultant..."
                rows={1}
                disabled={isLoading}
                className="luxury-input w-full rounded-2xl px-5 py-3.5 text-sm resize-none max-h-32 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minHeight: "50px" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = Math.min(target.scrollHeight, 128) + "px";
                }}
              />
            </div>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#9A7A2E] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber-900/30 transition-all flex-shrink-0"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-[#0A0A0A]" />
              )}
            </button>
          </div>
          <p className="text-[#FAF7F2]/20 text-xs mt-2 text-center">
            Press Enter to send · Shift+Enter for new line · AI responses for planning purposes only
          </p>
        </div>
      </div>
    </div>
  );
}
