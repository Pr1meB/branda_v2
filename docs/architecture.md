# Branda V2 Architecture

Branda V2 uses the Next.js App Router with a component-driven architecture, keeping server-rendered content separate from interactive client-side functionality.

The architecture is intentionally kept simple for the assessment while leaving clear boundaries for connecting the application to a production backend later.

## Component Architecture

### Server Components by Default

The application uses React Server Components by default.

Pages and components that primarily display data, such as market pages, service listings, service details, layouts, and service cards, remain server-rendered where possible.

This reduces the amount of JavaScript that needs to be shipped to the browser and allows data fetching to remain close to the server-rendered UI.

### Isolating Client Boundaries

Client Components are introduced only where browser-side interaction or state is required.

Examples include:

* `AddToCart`
* `Cart`
* `ServiceFilters`
* Quantity controls
* Checkout interactions

This keeps the interactive portion of the application focused rather than making entire pages client-rendered.

The general principle is to keep the `"use client"` boundary as close as possible to the component that actually requires it.

## App Router and Market Routing

Branda V2 uses Next.js dynamic routing to support multiple markets through subfolders.

The market structure is:

```text
/ng
/us
/uk
/ca
```

The application uses a dynamic `[market]` route internally, allowing the same page and component structure to serve different markets.

For example:

```text
/[market]/services
/[market]/services/[slug]
/[market]/cart
/[market]/checkout
```

A central market configuration defines supported markets and their associated information, including:

* Country/market.
* Currency.
* Locale.
* Market-specific content.
* Pricing configuration.

The market layout validates the requested market against this configuration. Unsupported markets can return `notFound()` rather than rendering an invalid page.

The root route can redirect users to the default market while allowing users to explicitly select another market.

This keeps the URL structure simple and SEO-friendly while avoiding duplicated page implementations for each country.

## State Management: Server vs Client

The application separates server data from interactive client state.

### Server State

The service catalog is treated as server-side data.

Service information is fetched and prepared for the relevant page rather than being stored in a global client-side state manager.

This keeps the initial rendering lightweight and makes the architecture easier to connect to a real API or CMS later.

### Client State

The shopping cart is client-side state because it needs to respond immediately to user actions such as:

* Adding an item.
* Removing an item.
* Changing quantity.
* Calculating the current cart contents.

Zustand is used for this purpose.

The cart store uses persistence so the cart can survive navigation and browser refreshes where appropriate.

### Why Zustand?

The cart does not require a large global state framework.

Zustand provides a small API and allows components to subscribe to the specific pieces of state they need. This keeps the implementation focused without introducing unnecessary Redux-style boilerplate.

The important architectural decision is not the specific state library itself, but keeping client state limited to state that genuinely needs to exist in the browser.

## URL-Driven Filtering

Service discovery uses URL search parameters for filters and sorting.

For example:

```text
/ng/services?category=Digital&industry=Technology&sort=price-asc
```

This approach provides several benefits:

* Filter state survives page refreshes.
* Results can be bookmarked.
* Filtered pages can be shared.
* Browser navigation works naturally.
* The server can use the parameters when rendering the page.
* The filtering model can later be connected directly to an API.

This is preferable to keeping the entire filtering state only inside a client-side component.

## Forms and Validation

The assessment uses native HTML form validation for the checkout experience, including attributes such as:

* `required`
* `type="email"`
* Appropriate input types.

For a production implementation, I would introduce schema-based validation using a library such as Zod and, where useful, React Hook Form for more complex forms.

The important principle is that validation should exist on both sides of a real application:

* Client-side validation for immediate user feedback.
* Server-side validation as the authoritative security boundary.

Client-side validation should never be treated as a replacement for server-side validation.

## Data and API Layer

The assessment currently uses local mock service data so that the frontend can be developed without depending on an external
