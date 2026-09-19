import type { DogProfile, Product } from "../types";

const countMatches = (a: string[], b: string[]) => {
  return a.filter((item) => b.includes(item)).length;
};

const isAvailable = (product: Product) =>
  product.isPublished && product.isInStock;

const isSuitableForAge = (profile: DogProfile) => (product: Product) =>
  product.suitableAges.includes(profile.age);

const isFreeOfAllergens = (profile: DogProfile) => (product: Product) =>
  profile.allergies.length === 0 ||
  countMatches(product.allergens, profile.allergies) === 0;

const meetsARequirement = (profile: DogProfile) => (product: Product) =>
  profile.requirements.length === 0 ||
  countMatches(product.requirements, profile.requirements) > 0;

const byRequirementMatchesThenPrice =
  (profile: DogProfile) => (a: Product, b: Product) =>
    countMatches(b.requirements, profile.requirements) -
    countMatches(a.requirements, profile.requirements) ||
    a.price - b.price;

export function getRecommendedProducts(
  profile: DogProfile,
  catalogue: Product[],
  limit: number = 3,
): Product[] {
  const results = catalogue
    .filter(isAvailable)
    .filter(isSuitableForAge(profile))
    .filter(isFreeOfAllergens(profile))
    .filter(meetsARequirement(profile))
    .toSorted(byRequirementMatchesThenPrice(profile))
    .slice(0, limit);

  return results;
}
