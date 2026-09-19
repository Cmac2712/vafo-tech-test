export type AgeGroup = "Puppy" | "Adult" | "Senior";

export type DogProfile = {
  age: AgeGroup;
  requirements: string[];
  allergies: string[];
};
