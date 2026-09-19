# PDP Tech Test

1. Take the starter project provided and build out an example page matching the reference desktop and mobile images (in ./references/). This should include an example nav and the PDP itself. The UI elements do not need to do anything, but they should be intractable (quantity selector, purchase type selector, delivery frequency select, add to basket button). Please break the page down as you see fit for an Astro project.
2. Create an Astro API route which accepts a DogProfile and returns a JSON response with an array of 3 recommended Products from ./src/data/products.ts. The criteria for the recommendations are:
   1. It is published
   2. It is in stock
   3. It is suitable for the dogs age
   4. It contains none of the dogs allergens
      - If the dog has no allergens, do not restrict the recommendations based on the allergens
   5. It satisfies at least one of the dogs requirements
      - If the dog has no specific requirements, do not restrict the recommendations based on the requirements
   6. Recommendations should be ordered by:
      1. Number of matching requirements (high to low)
      2. Price (low to high)
3. On the PDP make a call to the API route to get the recommended products for the DogProfile of the "current user" (An example hardcoded object is provided in PDP.astro so feel free to pass this in to the API route. This would come from the session in production). Output the JSON response from the API route at the bottom of the PDP page.

## Notes

- Please use Typescript
- Prefer functional programming principles
- Please use Vitest for unit tests of any testable functionality
- We aren't looking for pixel perfection when it comes to matching the reference image (if we were we would have provided a Figma link)
- Feel free to use placeholder images
- Content can be hardcoded in this tech test. In production it would be CMS driven.
- The test should take no more than 2 hours.
- Submit your completed test as a GitHub repo link returned to Alex or Kasia. It doesn't have to be hosted anywhere.

## Commands

All commands are run from the root of the project, from a terminal:

| Command       | Action                                      |
| :------------ | :------------------------------------------ |
| `npm install` | Installs dependencies                       |
| `npm run dev` | Starts local dev server at `localhost:4321` |
