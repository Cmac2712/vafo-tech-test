import type { APIRoute } from "astro";
import { products } from "../../data/products";
import { getRecommendedProducts } from "../../lib/recommendations";
import type { DogProfile } from "../../types";

export const prerender = false;

export const POST = (async ({ request }) => {
  const profile = (await request.json()) as DogProfile;
  const recommendations = getRecommendedProducts(profile, products);

  return new Response(JSON.stringify(recommendations), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}) satisfies APIRoute;
