# Migration Roadmap: `lup-frontend` to `lup-dashboard`

This document outlines the strategic plan for refactoring and migrating the legacy `lup-frontend` application to the new, high-performance `lup-dashboard`.

## 1. Architectural Shift

The primary goal is to move from a **Client-Heavy** architecture to a **Server-First** architecture using Next.js App Router.

| Feature | Legacy (`lup-frontend`) | New (`lup-dashboard`) |
| :--- | :--- | :--- |
| **Framework** | Next.js (Pages Router) | Next.js 15 (App Router) |
| **Rendering** | Mostly CSR (Client-Side Rendering) | RSC (React Server Components) + Streaming |
| **State Mgmt** | Redux Toolkit (Global) + Dexie (IndexedDB) | Redux (UI State) + React Query / Server Actions (Data) |
| **Auth Storage** | LocalStorage (Vulnerable to XSS) | HttpOnly Cookies (Secure) |
| **Data Strategy** | Sync *everything* to client DB on load | Fetch on demand / Prefetch on server |
| **Styling** | Tailwind + Custom CSS | Tailwind + Shadcn UI + CSS Variables |
| **Icons** | Custom SVGs / Mixed | `react-icons` (Standardized) |

## 2. Key Benefits

### 🚀 Performance
*   **Reduced Bundle Size**: By moving logic to the server, we send less JavaScript to the browser.
*   **Faster Initial Load**: We no longer need to download megabytes of location/product data before the app is usable.
*   **Streaming**: UI parts load progressively (e.g., Skeleton loaders) instead of blocking the whole page.

### 🔒 Security
*   **Middleware Protection**: Routes are protected at the server level before any UI is rendered.
*   **Secure Cookies**: Tokens are stored in `HttpOnly` cookies, making them inaccessible to client-side JavaScript (preventing XSS token theft).
*   **Environment Validation**: Strict schema validation for all environment variables using `zod`.

### 🛠 Developer Experience (DX)
*   **Type Safety**: Full integration with `levelup-sdk` types and strict TypeScript configuration.
*   **Better Tooling**: Built-in DevTools, standardized hooks (`useAuth`, `useDev`), and cleaner project structure.
*   **Maintainability**: Separation of concerns (Config vs. Logic vs. UI).

## 3. Migration Phases

### Phase 1: Foundation (✅ In Progress)
*   Initialize Next.js App Router project.
*   Integrate `levelup-sdk`.
*   Setup Redux Toolkit for session/UI state.
*   Implement secure `AuthenticationManager` (Cookies).
*   Create core hooks (`useAuth`, `useDev`).

### Phase 2: Core Infrastructure (🚧 Next)
*   **App Config**: Refactor `AppConfigManager` to be lighter.
*   **Data Fetching**: Replace Dexie caching with React Query / Server Actions where appropriate.
*   **Middleware**: Implement robust route guards in `middleware.ts`.
*   **Localization**: Port `next-intl` setup fully.

### Phase 3: UI System
*   Establish a design system using **Shadcn UI**.
*   Standardize icons using `react-icons`.
*   Build reusable form components with `react-hook-form` and `zod`.

### Phase 4: Feature Migration
*   Migrate features domain by domain (Auth -> Dashboard -> Orders -> etc.).
*   Refactor business logic to use the new hooks and store.
