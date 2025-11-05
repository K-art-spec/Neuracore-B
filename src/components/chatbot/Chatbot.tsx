"use client";

import React from "react";

type Message = { role: "user" | "bot"; text: string };

export default function Chatbot() {
  const [messages, setMessages] = React.useState<Message[]>(() => {
    // Load history from localStorage (free persistence)
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("neuracore_chat_history");
        if (raw) return JSON.parse(raw) as Message[];
      } catch {}
    }
    return [{ role: "bot", text: "Hi! I’m your Neuracore helper. Say hello to begin." }];
  });
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  // Persist history when it changes
  React.useEffect(() => {
    try {
      localStorage.setItem("neuracore_chat_history", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Auto-scroll to bottom on new messages
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, busy]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const next = [...messages, { role: "user", text }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: next }),
      });
      const data = (await res.json()) as { reply: string };
      setMessages((m) => [...m, { role: "bot", text: data.reply }]);
    } finally {
      setBusy(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send();
  };

  return (
    <div className="bg-bg-gray rounded-3xl p-4 md:p-6 max-w-md w-full border border-border-secondary">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-secondary">
        <div className="w-2 h-2 bg-color-border-primary rounded-full animate-pulse"></div>
        <h3 className="text-white font-semibold text-sm">Neuracore Assistant</h3>
      </div>
      <div ref={scrollRef} className="h-64 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div className={`max-w-[80%] px-3 py-2 rounded-lg ${
              m.role === "user" 
                ? "bg-color-border-primary text-white" 
                : "bg-[#242424] text-neutral-300 border border-border-secondary"
            }`}>
              <p className="text-sm">{m.text}</p>
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex justify-start">
            <div className="bg-[#242424] border border-border-secondary px-3 py-2 rounded-lg">
              <span className="text-neutral-400 text-sm">Typing...</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 text-white bg-[#242424] rounded-lg border-none outline-none px-3 py-2 text-sm placeholder:text-neutral-500 transition duration-400 hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)] focus:shadow-[0_0_0_0.15vw_#DF1616]"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={busy}
        />
        <button 
          className="px-4 py-2 bg-color-btn-primary hover:bg-color-btn-primary-hover text-color-btn-text rounded-lg font-medium text-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={send} 
          disabled={busy || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}


