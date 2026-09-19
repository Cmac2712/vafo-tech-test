import { afterEach, describe, expect, it, vi } from "vitest";
import type { DogProfile, Product } from "../types";
import { fetchRecommendations } from "./api";

const product = (overrides: Partial<Product> & { id: string }): Product => ({
  name: overrides.id,
  price: 1000,
  image: `/images/${overrides.id}.jpg`,
  suitableAges: ["Adult"],
  requirements: [],
  ingredients: [],
  allergens: [],
  isPublished: true,
  isInStock: true,
  ...overrides,
});

const profile = (overrides: Partial<DogProfile> = {}): DogProfile => ({
  age: "Adult",
  requirements: [],
  allergies: [],
  ...overrides,
});

describe("fetchRecommendations", () => {
  afterEach(() => vi.unstubAllGlobals());

  const dog = profile({ requirements: ["Healthy skin"], allergies: ["Lamb"] });

  it("POSTs the profile as JSON to the API route", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([product({ id: "a" })]), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchRecommendations(dog, "http://localhost:4321/PDP");

    expect(result.map((p) => p.id)).toEqual(["a"]);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe("http://localhost:4321/api/recommended");
    expect(init.method).toBe("POST");
    expect(init.headers["Content-Type"]).toBe("application/json");
    expect(JSON.parse(init.body)).toEqual(dog);
  });

  it("returns an empty array on a non-OK response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("nope", { status: 500 })));
    expect(await fetchRecommendations(dog, "http://localhost:4321")).toEqual([]);
  });
});
