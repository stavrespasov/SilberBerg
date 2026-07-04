import { describe, expect, it } from "vitest";
import { formatEurPerGram, formatUpdatedDate } from "./pricing";
import { indicativePrices, pricesUpdatedOn } from "./pricing.config";

describe("formatEurPerGram", () => {
  it("formats Slovenian prices with comma decimals and trailing symbol", () => {
    // sl-SI: NBSP before € (correct typography — the symbol never wraps alone)
    expect(formatEurPerGram(41.2, "sl")).toBe("41,20\u00A0€");
  });

  it("formats English prices with point decimals", () => {
    expect(formatEurPerGram(41.2, "en")).toBe("€41.20");
  });

  it("always renders exactly two decimals", () => {
    expect(formatEurPerGram(50, "en")).toBe("€50.00");
    expect(formatEurPerGram(50.128, "en")).toBe("€50.13");
  });

  it("formats zero (a legitimate 'call us' sentinel is not used — zero displays as zero)", () => {
    expect(formatEurPerGram(0, "en")).toBe("€0.00");
  });

  it("rejects negative prices", () => {
    expect(() => formatEurPerGram(-1, "en")).toThrow(/negative/i);
  });

  it("rejects non-finite values", () => {
    expect(() => formatEurPerGram(Number.NaN, "en")).toThrow();
    expect(() => formatEurPerGram(Infinity, "en")).toThrow();
  });

  it("handles large values with grouping", () => {
    expect(formatEurPerGram(12345.5, "en")).toBe("€12,345.50");
  });
});

describe("formatUpdatedDate", () => {
  const date = new Date(2026, 6, 1); // 1 July 2026, local time

  it("renders a long-form Slovenian date", () => {
    expect(formatUpdatedDate(date, "sl")).toBe("1. julij 2026");
  });

  it("renders a long-form English date", () => {
    expect(formatUpdatedDate(date, "en")).toBe("1 July 2026");
  });
});

describe("indicative price table", () => {
  it("covers the required gold purities and silver grades", () => {
    const labels = indicativePrices.map((r) => r.purity);
    for (const purity of ["585", "750", "875", "999.9", "925", "999"]) {
      expect(labels).toContain(purity);
    }
  });

  it("is entirely unconfirmed placeholder data until the client signs off", () => {
    expect(indicativePrices.every((r) => r.confirmed === false)).toBe(true);
  });

  it("keeps every price positive and finite", () => {
    for (const row of indicativePrices) {
      expect(Number.isFinite(row.eurPerGram)).toBe(true);
      expect(row.eurPerGram).toBeGreaterThan(0);
    }
  });

  it("has an updated-on date that is a valid date", () => {
    expect(Number.isNaN(pricesUpdatedOn.getTime())).toBe(false);
  });
});
