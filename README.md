# Branda V2 Frontend Assessment

Welcome to the Branda V2 frontend assessment project. This project is a premium, multi-market platform for discovering and ordering branding services.

## Overview
Branda V2 is built to demonstrate production-quality React/Next.js architecture. It moves away from generic dashboard aesthetics toward a modern, highly-polished, editorial design system.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## Architecture Highlights
- **Component-Driven**: Heavy reliance on React Server Components (RSC) to minimize client-side JavaScript. Interactivity is isolated to specific Client Components (e.g., Cart, Filters).
- **Multi-Market Routing**: Fully implemented subfolder routing (`/ng`, `/us`, `/uk`, `/ca`) mapping directly to specific currencies, taxes, and service parameters.
- **URL-Driven State**: Service filters (Category, Use Case, Sort, Search) synchronize bidirectionally with URL parameters, allowing for shareable and crawlable search states.
- **Data Layer**: A clean separation of concerns. Services are fetched via dedicated methods (`src/data/services.ts`), preparing the project for easy integration with a live REST/GraphQL backend.

## Assessment Tasks Completed
- [x] Multi-market subfolder routing
- [x] Global Layout with Market Selector
- [x] Service Listing Page with URL-driven filters & debounced search
- [x] Pagination for Service Listing
- [x] Dynamic Service Detail Page with options selector
- [x] Client-side Cart with persistent state (Zustand)
- [x] Checkout Flow & Order Success states
- [x] Loading, Error, and Not-Found Next.js conventions
- [x] SEO & Metadata dynamic generation
- [x] Performance documentation (`docs/performance.md`)
- [x] Architecture documentation (`docs/architecture.md`)
- [x] Branda site review (`docs/branda-review.md`)
- [x] Screening answers (`docs/screening-answers.md`)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The root will automatically redirect to the default market (`/ng`).

### Production Build
```bash
npm run build
npm start
```

## Project Structure
```
branda/
├── docs/                      # Assessment documentation
├── src/
│   ├── app/                   # Next.js App Router (Pages & Layouts)
│   ├── components/            # React Components (UI, Layout, Cart)
│   ├── config/                # Global config (Markets)
│   ├── data/                  # Mock data & service layer
│   ├── lib/                   # Utilities (cn, formatCurrency, debounce)
│   ├── store/                 # Zustand state management
│   └── types/                 # TypeScript interfaces
```

## Key Technical Decisions
- **Why Zustand?** Cart state is client-side interactive state that needs to persist across routes, while service data remains server-rendered. Zustand is lightweight and avoids context hell.
- **Why Server Components?** Service content is primarily read-only and benefits from server rendering, SEO, and reduced client JavaScript.
- **Why URL search params for filters?** Filters need to be shareable, crawlable, and preserved on navigation.

## Future Improvements
- Integrate `react-hook-form` and `zod` for robust checkout validation.
- Implement `next-auth` for user accounts.
- Connect the data layer to a real backend API utilizing Next.js native `fetch` caching and ISR.
