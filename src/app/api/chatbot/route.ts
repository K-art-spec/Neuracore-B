import { NextResponse } from "next/server";

type ChatMessage = { role: "user" | "bot"; text: string };

// Small in-file knowledge base (free, no external calls)
const KB: Array<{ pattern: RegExp; answer: string | ((m: RegExpMatchArray) => string) }> = [
  { pattern: /(hello|hi|hey)\b/i, answer: "Hello! How can I help?" },
  { pattern: /help|commands/i, answer: "You can ask: ‘time’, ‘about neuracore’, or general questions." },
  { pattern: /time|date/i, answer: () => `Current time: ${new Date().toLocaleString()}` },
  { pattern: /who are you|your name/i, answer: "I’m the Neuracore helper bot." },
  { pattern: /neuracore|project/i, answer: "Neuracore helps users share ideas, track achievements, and collaborate." },
];

function extractName(lastUser: string): string | null {
  // Very simple name capture: "I am X" / "I'm X" / "My name is X"
  const m = lastUser.match(/(?:i am|i'm|my name is)\s+([A-Za-z][A-Za-z\-']{1,30})/i);
  return m ? m[1] : null;
}

function findAnswer(text: string, history: ChatMessage[]): string | null {
  for (const kb of KB) {
    const match = text.match(kb.pattern);
    if (match) {
      return typeof kb.answer === "function" ? kb.answer(match) : kb.answer;
    }
  }

  // Simple context follow-up handling: if user mentions "that" or "it", reference previous user message topic
  if (/\b(that|it|this)\b/i.test(text) && history.length > 0) {
    const prevUser = [...history].reverse().find((m) => m.role === "user");
    if (prevUser) return `If you mean: "${prevUser.text}", I can give basics or point you to settings.`;
  }

  // If they asked a question, acknowledge
  if (text.trim().endsWith("?")) return "Good question! I don’t know yet, but I’m learning.";

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message: string = (body?.message ?? "").toString();
    const history: ChatMessage[] = Array.isArray(body?.history) ? body.history : [];

    const text = message.trim();
    if (!text) return NextResponse.json({ reply: "Hi! Ask me something." });

    // Context: learn user's name and greet later
    const nameFromThis = extractName(text);
    const knownName = nameFromThis || null;

    const contextual = findAnswer(text, history);
    let reply = contextual ?? `You said: ${text}`;

    if (!contextual && knownName) {
      reply = `Nice to meet you, ${knownName}! How can I help today?`;
    } else if (/\bthank(s| you)\b/i.test(text)) {
      reply = "You’re welcome!";
    }

    // Tiny short-term memory hint: if a name was detected earlier in history, use it for personalization
    if (!knownName) {
      const prevName = [...history]
        .reverse()
        .map((m) => (m.role === "user" ? extractName(m.text) : null))
        .find((n) => !!n);
      if (prevName) reply = reply.replace("How can I help?", `How can I help, ${prevName}?`);
    }

    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ reply: "Sorry, I had trouble reading that." }, { status: 200 });
  }
}


