import type { AgeGroup } from "./dog";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  suitableAges: AgeGroup[];
  requirements: string[];
  ingredients: string[];
  allergens: string[];
  isPublished: boolean;
  isInStock: boolean;
};
