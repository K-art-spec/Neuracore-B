import { POST } from "@/app/api/chatbot/route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/chatbot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("Chatbot API", () => {
  it("responds to hello", async () => {
    const res = await POST(makeRequest({ message: "hello" }));
    const data = await res.json();
    expect(typeof data.reply).toBe("string");
    expect(data.reply.toLowerCase()).toContain("hello");
  });

  it("uses history for context fallback", async () => {
    const history = [{ role: "user", text: "Tell me about Neuracore" }];
    const res = await POST(makeRequest({ message: "How about that?", history }));
    const data = await res.json();
    expect(typeof data.reply).toBe("string");
  });
});


