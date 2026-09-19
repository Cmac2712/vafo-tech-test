import { describe, expect, it } from "vitest";
import type { DogProfile, Product } from "../types";
import {
  getRecommendedProducts,
} from "./recommendations";

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

describe("getRecommendedProducts", () => {
  const catalogue: Product[] = [
    product({ id: "best", requirements: ["Healthy skin", "Shiny coat"], price: 3000 }),
    product({ id: "cheap-single", requirements: ["Healthy skin"], price: 1000 }),
    product({ id: "dear-single", requirements: ["Shiny coat"], price: 2000 }),
    product({ id: "fourth", requirements: ["Healthy skin"], price: 4000 }),
    product({ id: "has-lamb", requirements: ["Healthy skin"], allergens: ["Lamb"], price: 500 }),
    product({ id: "puppy-only", requirements: ["Healthy skin"], suitableAges: ["Puppy"], price: 500 }),
    product({ id: "out-of-stock", requirements: ["Healthy skin"], isInStock: false, price: 500 }),
    product({ id: "unpublished", requirements: ["Healthy skin"], isPublished: false, price: 500 }),
    product({ id: "no-match", requirements: ["Joint support"], price: 500 }),
  ];

  const dog = profile({
    age: "Adult",
    requirements: ["Healthy skin", "Shiny coat"],
    allergies: ["Lamb"],
  });

  it("applies every filter, sorts, and caps at the limit", () => {
    const ids = getRecommendedProducts(dog, catalogue, 3).map((p) => p.id);
    expect(ids).toEqual(["best", "cheap-single", "dear-single"]);
  });

  it("returns fewer than the limit when fewer products qualify", () => {
    const ids = getRecommendedProducts(dog, catalogue.slice(0, 2), 3).map((p) => p.id);
    expect(ids).toEqual(["best", "cheap-single"]);
  });

  it("returns an empty array when nothing qualifies", () => {
    expect(getRecommendedProducts(profile({ age: "Senior" }), catalogue, 3)).toEqual([]);
  });

  it("ignores allergens and requirements when the profile has none", () => {
    const relaxed = profile({ age: "Adult", requirements: [], allergies: [] });
    const ids = getRecommendedProducts(relaxed, catalogue, 10).map((p) => p.id);
    expect(ids).toContain("has-lamb");
    expect(ids).toContain("no-match");
    expect(ids).not.toContain("puppy-only");
    expect(ids).not.toContain("out-of-stock");
    expect(ids).not.toContain("unpublished");
  });

  it("does not mutate the catalogue", () => {
    const copy = [...catalogue];
    getRecommendedProducts(dog, catalogue, 3);
    expect(catalogue).toEqual(copy);
  });
});
