# Performance Optimization in Branda V2

Performance was considered throughout the implementation of Branda V2, particularly around rendering strategy, image delivery, client-side JavaScript, state management, and responsive interactions.

Because this assessment uses local mock service data, some production optimizations described below represent how I would extend the implementation when connecting the application to a real CMS or API.

## Next.js Rendering Strategy

### Server Components vs Client Components

Branda V2 uses React Server Components by default.

Pages such as the market landing page, service listing, and service detail pages are primarily rendered on the server. Interactive functionality is isolated into Client Components where necessary, including service filters, cart interactions, quantity controls, and checkout interactions.

This keeps the client-side JavaScript focused on areas that actually require browser interaction instead of making entire pages client-rendered.

The general rule I followed was:

* Use Server Components for data fetching and static presentation.
* Use Client Components for interactive UI and browser APIs.
* Keep `"use client"` boundaries as small as practical.
* Avoid moving an entire page to the client because one child component requires interactivity.

## Static Generation and Caching

Service detail routes use Next.js dynamic routing and are structured so they can be statically generated using `generateStaticParams` when the service catalog is known ahead of time.

The current assessment uses local mock data, so there is no significant network latency to optimize.

In a production implementation backed by a CMS or API, I would use an appropriate caching and revalidation strategy such as ISR for service catalog content that changes periodically.

For example, service pages could be revalidated periodically rather than requiring every request to regenerate the page.

The exact revalidation interval would depend on how frequently Branda's service data changes.

## Image Optimization

Service imagery is handled with Next.js `Image` rather than using unoptimized `<img>` elements.

The implementation uses:

* Responsive image sizing through the `sizes` attribute.
* Appropriate width and height/aspect-ratio constraints.
* Lazy loading for images that are not immediately visible.
* Priority loading only for genuinely important above-the-fold imagery.
* Responsive image delivery through Next.js image optimization.

For example, a service grid can use responsive `sizes` so the browser does not unnecessarily download a desktop-sized image when the user is viewing the application on a mobile device.

This is particularly important for Branda because service discovery relies heavily on visual content.

## Client-Side State Management

The shopping cart requires client-side state because users need to add, remove, and update items interactively.

Zustand is used for this state rather than introducing a larger state-management framework.

The store is kept focused on cart concerns such as:

* Adding services.
* Removing services.
* Updating quantities.
* Calculating cart totals.
* Persisting the cart where appropriate.

Components subscribe only to the state they need. For example, the header can consume the cart item count without requiring unrelated components to subscribe to the entire cart state.

This keeps the state model simple and avoids unnecessary global complexity.

## Search and Filter Performance

Service filtering is implemented using URL query parameters so the filtered state is shareable, bookmarkable, and compatible with server-rendered pages.

Client-side interaction is kept lightweight. Search input updates can be debounced before updating the URL to avoid generating unnecessary updates while the user is typing.

For a production API-backed catalog, I would also consider server-side filtering and pagination rather than downloading the entire catalog into the browser.

This would become increasingly important as the number of services grows.

## Core Web Vitals

### LCP — Largest Contentful Paint

LCP measures how quickly the main content becomes visible.

For Branda V2, the main considerations are:

* Server-rendering important page content.
* Optimizing hero and service imagery.
* Using `next/image`.
* Avoiding unnecessary client-side JavaScript for initial rendering.
* Prioritizing only genuinely critical above-the-fold assets.

### INP — Interaction to Next Paint

INP measures how responsive the application is to user interactions.

The implementation helps keep interactions responsive by:

* Keeping interactive components relatively small.
* Avoiding unnecessary client-side rendering.
* Limiting global state.
* Keeping expensive work out of interaction handlers.
* Using server-side processing where appropriate.

For a production application, INP would also be monitored using real-user performance data.

### CLS — Cumulative Layout Shift

CLS measures unexpected visual movement during page loading.

The implementation reduces layout shifts by:

* Providing dimensions or aspect ratios for images.
* Maintaining stable card and grid layouts.
* Reserving space for dynamic content where appropriate.
* Using intentional loading states.
* Avoiding content being inserted unexpectedly above already-rendered content.

## API and Network Efficiency

The assessment currently uses local mock data, but the data layer is structured so it can be replaced with a real API without coupling API logic directly to UI components.

For a production API, I would optimize network usage by:

* Requesting only the data required by each page.
* Using pagination for large service collections.
* Caching data that does not change frequently.
* Avoiding duplicate requests.
* Moving appropriate data fetching to Server Components.
* Using parallel requests where independent data can be fetched simultaneously.
* Avoiding unnecessary client-side fetching for SEO-critical content.

Next.js also provides caching and request-level optimizations that can be used where appropriate depending on the application's data-fetching strategy.

## Code Splitting and Bundle Optimization

Next.js automatically splits application code by route, which means users do not need to download the JavaScript for unrelated pages upfront.

I also keep interactive functionality isolated so that components that do not require browser-side JavaScript can remain Server Components.

For larger production features, I would use dynamic imports where appropriate, particularly for functionality that is not required during the initial render.

I would also periodically inspect production bundle output to identify unnecessarily large dependencies or packages that could be replaced with lighter alternatives.

## Responsive and Mobile Performance

Branda V2 is designed mobile-first because a significant portion of service discovery and commerce traffic can happen on mobile devices.

Performance considerations include:

* Responsive images.
* Avoiding unnecessarily large assets.
* Limiting client-side JavaScript.
* Keeping interactions lightweight.
* Avoiding excessive animation.
* Maintaining stable layouts across viewport sizes.
* Testing important flows at mobile viewport sizes.

The goal is not only to make the desktop version fast, but to ensure that the experience remains usable on slower mobile devices and networks.

## Performance Monitoring

For a production deployment, I would monitor performance using a combination of:

* Chrome DevTools during development.
* Lighthouse for lab-based audits.
* Core Web Vitals.
* Real-user monitoring where available.
* Next.js build and bundle analysis.
* Application and API monitoring.

The most important principle is to measure before optimizing, identify the actual bottleneck, make the smallest effective change, and then measure again.
