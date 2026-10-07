# Frontend Engineer Screening Answers

## 1. Tell us about a complex frontend project you built and your role in it.

One of the more involved projects I've worked on required me to own significant parts of the frontend while also working across the backend and API layer. I worked with React/Next.js and TypeScript to build responsive interfaces, integrate APIs, and structure reusable components that could support different parts of the product.

At Instacodigo, for example, I worked across an Expo/TypeScript frontend and a Django/GraphQL backend, including integrations with Odoo. A major part of my role was making the frontend reliable and performant while working with real production data and APIs. I also worked on PWA and API performance improvements, with some API response times improved by up to about 40%.

That experience has made me comfortable owning a feature from the UI through to the API integration rather than treating frontend development as just the visual layer.

## 2. Why are you the right fit for the Branda V2 frontend team?

I have over 6 years of software engineering experience, with strong hands-on experience in React, Next.js, TypeScript, JavaScript, responsive UI development, API integration, and performance optimization.

What I bring is a combination of frontend depth and backend understanding. I can build the interface, but I also understand the data and API decisions behind it, which helps me make better frontend architecture decisions.

For Branda V2 specifically, I think that combination is valuable because the product needs to feel polished and responsive while also supporting things like service discovery, filtering, checkout, multiple markets, localization, and dynamic content.

## 3. Explain the difference between SSR, SSG, ISR, and CSR. When would you use each?

**SSR (Server-Side Rendering)** generates the page on the server when a request is made. I would use it when the content needs to be rendered from current data while still benefiting from server rendering and SEO.

**SSG (Static Site Generation)** generates pages ahead of time during the build. It works well for content that doesn't change frequently, such as relatively static marketing or informational pages.

**ISR (Incremental Static Regeneration)** combines the benefits of static generation with the ability to refresh content periodically. For Branda, this would be useful for service or category pages where the underlying data can change but doesn't need to be regenerated on every request.

**CSR (Client-Side Rendering)** happens primarily in the browser. I use it where the experience depends heavily on client-side interaction, such as interactive filters, cart controls, form interactions, or other UI state.

In practice, I don't treat these as mutually exclusive choices. A modern Next.js application can use different rendering strategies depending on what each part of the application needs.

## 4. How do you decide when to use a Server Component vs a Client Component in Next.js?

My default is to use Server Components and only introduce Client Components where they provide a clear benefit.

If a component mainly displays data or can fetch data on the server, I keep it as a Server Component. This helps reduce the amount of JavaScript sent to the browser and keeps data fetching closer to the server.

I use Client Components when I need browser interaction or client-side state, such as `useState`, event handlers, local storage, interactive filters, cart controls, or other browser APIs.

I also try to keep the client boundary as small as possible rather than turning an entire page into a Client Component just because one part of it needs interactivity.

## 5. Walk us through your process for debugging a performance issue on a Next.js site.

I start by reproducing the problem and measuring it rather than immediately changing code.

I normally use Chrome DevTools to look at the Network and Performance tabs and determine whether the issue is coming from slow API requests, excessive JavaScript, rendering, images, or something blocking the main thread.

I then look at the application's rendering strategy. For example, I check whether something that could be rendered on the server is unnecessarily being fetched and rendered on the client.

I also look at bundle size, image loading, unnecessary dependencies, repeated API requests, and component re-renders. On the API side, I check whether the frontend is requesting more data than it needs or making requests sequentially when they could be optimized.

I've applied this approach in production projects where API and frontend performance improvements resulted in response-time improvements of up to about 40%.

## 6. How do you approach building reusable, scalable components in React?

I start by identifying patterns that are genuinely shared rather than trying to abstract everything from the beginning.

For example, buttons, inputs, cards, modals, navigation elements, service cards, and layout primitives can usually be made reusable. I keep their APIs simple and strongly typed and use composition where it makes more sense than adding a large number of boolean or configuration props.

I also separate presentation from business logic where appropriate. That makes components easier to test and allows the same UI patterns to be reused without coupling them to one particular feature.

My goal is not maximum abstraction. It's a codebase where another developer can understand a component quickly, reuse it confidently, and change it without unexpectedly affecting unrelated parts of the application.

## 7. How do you handle loading, error, and empty states in an application?

I treat loading, error, and empty states as part of the feature rather than as edge cases added at the end.

With the Next.js App Router, I use conventions such as `loading.tsx`, `error.tsx`, and `not-found.tsx` where appropriate. For interactive sections, I also make sure the UI gives immediate feedback when an action is being processed.

For empty states, I try to explain what happened and give the user a useful next step. For example, an empty cart shouldn't just display a blank screen; it should explain that there are no
