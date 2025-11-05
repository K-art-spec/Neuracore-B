npm install## Microsoft Login and Simple Chatbot (Minimal Setup)

### Microsoft Login (via Supabase OAuth)
- Component: `src/components/auth/MicrosoftLoginButton.tsx`
- Prereq (in Supabase Project Settings → Auth → Providers):
  - Enable Azure provider and set your Client ID/Secret.
  - Redirect URL: your site origin (e.g., `http://localhost:3000`).
- Env (already used by app):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Usage example:
```tsx
// Any page or component
import MicrosoftLoginButton from "@/components/auth/MicrosoftLoginButton";

export default function Login() {
  return <MicrosoftLoginButton />;
}
```

### Simple Chatbot
- API route: `src/app/api/chatbot/route.ts` (rule-based, no external APIs)
- UI component: `src/components/chatbot/Chatbot.tsx`

Usage example:
```tsx
import Chatbot from "@/components/chatbot/Chatbot";

export default function Page() {
  return <Chatbot />;
}
```

Notes:
- No extra libraries added. All logic is client + built-in Next.js API route.
- API calls are minimal: one POST per user message to `/api/chatbot`.

### Smart Chatbot (history + typing + context)
- The Chatbot component persists message history in `localStorage` under `neuracore_chat_history`.
- The API receives `{ message, history }` and uses small rule-based logic for contextual replies.
- Typing indicator is shown while waiting on the API.

Extended usage (same import as above):
```tsx
import Chatbot from "@/components/chatbot/Chatbot";

export default function Support() {
  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-xl mb-2">Neuracore Assistant</h2>
      <Chatbot />
    </div>
  );
}
```


