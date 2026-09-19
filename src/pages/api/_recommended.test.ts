import { describe, expect, it } from "vitest";
import { POST } from "./recommended";
import type { DogProfile, Product } from "../../types";

const call = (body: unknown) =>
  POST({
    request: new Request("http://localhost/api/recommended", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  } as Parameters<typeof POST>[0]);

describe("POST /api/recommended", () => {
  it("returns JSON recommendations for the example profile", async () => {
    const profile: DogProfile = {
      age: "Adult",
      requirements: ["Healthy skin"],
      allergies: ["Lamb"],
    };

    const response = await call(profile);
    const body = (await response.json()) as Product[];

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");
    expect(body.map((p) => p.id)).toEqual(["salmon-oat-adult", "salmon-quinoa-skin-coat"]);
    body.forEach((p) => {
      expect(p.isPublished && p.isInStock).toBe(true);
      expect(p.suitableAges).toContain("Adult");
      expect(p.allergens).not.toContain("Lamb");
    });
  });

  it("returns an empty array when nothing matches", async () => {
    const response = await call({ age: "Puppy", requirements: ["Joint support"], allergies: [] });
    expect(await response.json()).toEqual([]);
  });
});
