// Lightweight feature probes without external services
// - Auth: ensure client creator exists and can be called
// - Idea submission: confirm key components export
// - Toast (sonner): ensure module can be required

describe("Feature probes", () => {
  it("supabase client factory exists", async () => {
    const mod = await import("@/app/lib/supabase/client");
    expect(typeof mod.createClient).toBe("function");
    // Do not call network; just ensure function returns an object shape
    const client = mod.createClient();
    expect(client).toBeTruthy();
  });

  it("idea submission components export", async () => {
    const Toggle = (await import("@/components/submitIdea/Toggle")).default;
    expect(typeof Toggle).toBe("function");
  });

  it("toast library is importable", async () => {
    const sonner = await import("sonner");
    expect(sonner).toBeTruthy();
  });
});


