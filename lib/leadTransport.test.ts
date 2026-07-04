import { afterEach, describe, expect, it, vi } from "vitest";
import { deliverLead, type Lead } from "./leadTransport";

const lead: Lead = {
  name: "Ana Novak",
  email: "ana@example.com",
  phone: "",
  message: "Prodala bi zlato verižico, 14k, približno 12 g.",
  category: "jewelry",
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("deliverLead", () => {
  it("falls back to structured log delivery when email transport is unconfigured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("CONTACT_INBOX", "");
    const info = vi.spyOn(console, "info").mockImplementation(() => {});

    const result = await deliverLead(lead);

    expect(result.transport).toBe("log");
    expect(info).toHaveBeenCalledOnce();
    const line = info.mock.calls[0]?.join(" ") ?? "";
    expect(line).toContain("[lead]");
    expect(line).toContain("ana@example.com");
  });

  it("sends via Resend when configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("CONTACT_INBOX", "owner@example.com");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email_1" }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await deliverLead(lead);

    expect(result.transport).toBe("resend");
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers).toMatchObject({
      Authorization: "Bearer re_test_key",
    });
    const body = JSON.parse(String(init.body));
    expect(body.to).toEqual(["owner@example.com"]);
    expect(body.text).toContain("Ana Novak");
    expect(body.text).toContain("zlato verižico");
  });

  it("throws with context when Resend rejects the request", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("CONTACT_INBOX", "owner@example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("nope", { status: 403 })),
    );

    await expect(deliverLead(lead)).rejects.toThrow(/lead delivery failed/i);
  });

  it("propagates network failures", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("CONTACT_INBOX", "owner@example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("fetch failed")),
    );

    await expect(deliverLead(lead)).rejects.toThrow();
  });
});
