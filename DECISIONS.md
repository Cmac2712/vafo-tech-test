Below are some of the key decisions I've made while executing this test:

## Using POST instead of GET
I opted for a POST instead of a GET request since the DogProfile data is an object which is easier to send via POST. It also doesn't need to be cached so GET wouldn't have any real benefit.

## Not prerendering the page
I decided against prerendering the page, for simplicity with the given time-frame. In a production app, I'd opt for server-side rendering of the PDP and have the 'recomendations' section load on the client side, after the initial page load.   

## Styling 
I've used Astro's scoped CSS for styling for simplicity and it doesn't require any 3rd party libs.

## File Structure
I've kept the file structure relatively simple, components are grouped by role (forms/layout/product). This works fine for a test like this, but in a production app I prefer a feature-based file structure.

## How I've used AI
I've used Claude Code to help me with this test, I've used it carefully, not letting it take over. I review all output and edit/streamline the code heavily. My goal is to use AI as an efficiency boost without losing any understanding of what the code is doing.

## What I would do to improve this test

I've already mentioned file structure and prerendering the PDP page, but here are some other points:

- I would add some state-management libraries for a production version of this test. I like Zustand for page-level state and React Query for server state.
- I'd extract some of the components into more generic base-level UI components, for example Button.astro, Select.astro etc for reusability/composability. These could be served via a component library which could be used across many different apps.