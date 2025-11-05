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
    <div className="border rounded p-3 max-w-md w-full">
      <div ref={scrollRef} className="h-64 overflow-y-auto space-y-2 mb-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <span className={"inline-block px-2 py-1 rounded " + (m.role === "user" ? "bg-blue-100" : "bg-gray-100")}>{m.text}</span>
          </div>
        ))}
        {busy && (
          <div className="text-left">
            <span className="inline-block px-2 py-1 rounded bg-gray-100">Typing…</span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={busy}
        />
        <button className="px-3 py-1 border rounded" onClick={send} disabled={busy}>
          Send
        </button>
      </div>
    </div>
  );
}


