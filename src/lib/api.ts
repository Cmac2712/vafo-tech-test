import type { DogProfile, Product } from "../types";

export const RECOMMENDATIONS_PATH = "/api/recommended";

export async function fetchRecommendations(
  profile: DogProfile,
  baseUrl: URL | string,
): Promise<Product[]> {
  const response = await fetch(new URL(RECOMMENDATIONS_PATH, baseUrl), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  return response.ok ? response.json() : [];
}
