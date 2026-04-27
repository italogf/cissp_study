import { describe, expect, it } from "vitest";

import { getSafeCallbackUrl, normalizeEmail } from "./auth.utils";

describe("auth.utils", () => {
  it("normalizes email for identity lookups", () => {
    expect(normalizeEmail("  Learner@Example.COM ")).toBe("learner@example.com");
  });

  it("keeps only local callback urls", () => {
    expect(getSafeCallbackUrl("en", "/en/study/session/123")).toBe("/en/study/session/123");
    expect(getSafeCallbackUrl("pt-BR", "https://evil.example")).toBe("/pt-BR/study");
    expect(getSafeCallbackUrl("en", null)).toBe("/en/study");
  });
});
