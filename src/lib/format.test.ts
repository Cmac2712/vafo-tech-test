import { describe, expect, it } from "vitest";
import { formatPrice } from "./format";

describe("formatPrice", () => {
  it("formats pence as pounds", () => {
    expect(formatPrice(2850)).toBe("£28.50");
    expect(formatPrice(637)).toBe("£6.37");
    expect(formatPrice(0)).toBe("£0.00");
  });
});
