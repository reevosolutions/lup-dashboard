# Migration Task List

Use this checklist to track the progress of the migration from `lup-frontend` to `lup-dashboard`.

## Phase 1: Foundation & Setup
- [x] **Project Initialization**
    - [x] Setup Next.js 15 with TypeScript.
    - [x] Configure aliases (`@/`, `@components/`, etc.).
    - [x] Setup `zod` environment variable validation.
- [x] **SDK Integration**
    - [x] Install `levelup-sdk`.
    - [x] Configure `tsconfig.json` to include SDK typings.
- [x] **State Management**
    - [x] Setup Redux Toolkit (`store`, `hooks`, `provider`).
    - [x] Create `auth-slice` with async thunks.
- [x] **Authentication Core**
    - [x] Create `AuthenticationManager` (Cookie-based).
    - [x] Implement `useAuth` hook.
    - [x] Implement `useDev` hook and DevTools UI.

## Phase 2: Core Infrastructure
- [ ] **Routing & Middleware**
    - [ ] Update `middleware.ts` to handle protected routes using `AuthenticationManager`.
    - [ ] Implement `PublicOnly` and `Protected` route guards.
- [ ] **App Configuration**
    - [ ] Port `AppConfigManager` logic (Locations, Settings).
    - [ ] Decide on caching strategy (Server Cache vs. Client Cache).
- [ ] **Localization**
    - [ ] Verify `next-intl` setup.
    - [ ] Migrate translation files (`messages/`).
- [ ] **API & Data Fetching**
    - [ ] Setup `React Query` (TanStack Query) provider.
    - [ ] Create base query hooks wrapping SDK methods.

## Phase 3: UI System & Components
- [ ] **Design System**
    - [ ] Configure Tailwind CSS theme (colors, fonts).
    - [ ] Install and configure `shadcn/ui`.
- [ ] **Icons**
    - [ ] Replace custom SVGs with `react-icons` (Lucide/Fa/Md).
- [ ] **Forms**
    - [ ] Setup `react-hook-form`.
    - [ ] Create reusable form components (Input, Select, DatePicker).
- [ ] **Layouts**
    - [ ] Create `AuthLayout` (Login/Register pages).
    - [ ] Create `DashboardLayout` (Sidebar, Header, Navigation).

## Phase 4: Feature Migration
### Authentication
- [ ] Login Page
- [ ] Register Page
- [ ] Forgot Password
- [ ] Profile Management

### Dashboard Core
- [ ] Overview / Analytics Widgets
- [ ] Navigation Menu (Dynamic based on roles)

### Domain: Logistics (Example)
- [ ] Offices List
- [ ] Warehouses List

### Domain: Accounts
- [ ] User Management
- [ ] Role Management

## Phase 5: Cleanup & Optimization
- [ ] Remove unused legacy code.
- [ ] Audit bundle size.
- [ ] Security audit (headers, cookies).
- [ ] Final QA & Testing.
