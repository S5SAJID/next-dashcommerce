# Development Guidelines

This document serves as the comprehensive guide for development on the **Next DashCommerce** project. It outlines the architecture, coding standards, and best practices to ensure consistency, maintainability, and professional quality code.

## 1. Project Overview

**Next DashCommerce** is a high-performance, multi-tenant e-commerce platform built with modern web technologies. It emphasizes type safety, performance, and a premium user experience.

### Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
-   **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **UI Library**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
-   **Authentication**: [Better Auth](https://better-auth.com/)
-   **State Management**: [Nuqs](https://nuqs.47ng.com/) (URL state), React Server Actions
-   **Validation**: [Zod](https://zod.dev/)
-   **Linting/Formatting**: [Biome](https://biomejs.dev/)

## 2. Core Philosophies

### Package First Strategy
-   **Leverage Open Source**: We prioritize high-quality, free, and open-source packages (e.g., `better-auth`, `react-use-cart`) over building complex features from scratch. This reduces maintenance burden and leverages community-tested solutions.
-   **Avoid Vendor Lock-in**: We strictly avoid packages with opaque pricing, hidden costs, or restrictive commercial licenses.
-   **Evaluation**: Always check maintenance status, type support, and community adoption before adding a dependency.

### Single Source of Truth (SSOT)
-   **Database Schema**: The Drizzle schema (`src/db/schema`) is the **absolute source of truth** for the data model. TypeScript types are inferred directly from the schema—never manually duplicated.
-   **Configuration**: Global settings and constants live in configuration files or environment variables, not scattered across components.

### DRY (Don't Repeat Yourself) & Maintainability
-   **Abstraction**: If logic is repeated, refactor it into a reusable hook, utility, or component.
-   **Separation of Concerns**: Keep business logic separate from UI presentation.
-   **Readability**: Write code that is easy to understand for the next developer. Clear structure and naming take precedence over clever, concise code.

## 3. Directory Structure

The project follows a feature-based and atomic design structure within the `src` directory.

```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/          # Route Group: Auth pages (URL: /login, /register) - Grouping doesn't affect URL path
│   ├── (dashboard)/     # Route Group: Admin Dashboard (URL: /dashboard/...)
│   ├── (storefront)/    # Route Group: Public Storefront (URL: /product/...)
│   └── api/             # API routes (minimal usage, prefer Actions)
├── components/          # UI Components (Atomic Design)
│   ├── atoms/           # Basic building blocks (buttons, inputs)
│   ├── molecules/       # Combinations of atoms (search bars, cards)
│   ├── organisms/       # Complex sections (headers, product grids)
│   ├── ui/              # Shadcn UI primitives (Shared across all features)
│   ├── storefront/      # Storefront-specific components (Isolated concern)
│   └── layout/          # Layout components (wrappers, containers)
├── db/                  # Database layer
│   ├── schema/          # Drizzle schema definitions (SSOT)
│   ├── actions/         # Server Actions for DB mutations
│   └── drizzle/         # Migrations
├── lib/                 # Utility functions and shared logic
├── hooks/               # Custom React hooks
└── providers/           # Context providers
```

## 4. Coding Standards

### TypeScript
-   **Strict Mode**: Always enabled. No `any` types allowed. Use `unknown` if necessary and narrow types.
-   **Type Definitions**:
    -   Use `type` for unions/intersections and `interface` for object shapes.
    -   Colocate types with components if specific to that component.
    -   Shared types go in `src/types` or are exported from schema files.

### Naming Conventions
-   **Files/Directories**: `kebab-case` (e.g., `product-card.tsx`, `use-auth.ts`).
-   **Components**: `PascalCase` (e.g., `ProductCard`).
-   **Functions/Variables**: `camelCase` (e.g., `fetchProducts`, `isLoading`).
-   **Constants**: `UPPER_SNAKE_CASE` for global constants.

### Exports
-   Use **Named Exports** for all components and functions to ensure consistent naming when importing.

### Comments
-   Use JSDoc for complex logic or utility functions.
-   Explain *why*, not *what*, if the code isn't self-explanatory.

## 5. Component Architecture

We follow **Atomic Design** principles to maximize reusability.

1.  **Atoms**: Indivisible elements (Labels, Buttons, Icons).
2.  **Molecules**: Simple groups of atoms (Input + Label, Search Bar).
3.  **Organisms**: Distinct sections of an interface (Navigation Bar, Product Card Grid).
4.  **Templates/Pages**: Handled by `src/app`.

**Rules:**
-   **Server Components by Default**: Keep components as Server Components unless they need interactivity. Add `"use client"` only when necessary.
-   **Props Interface**: Always define a `Props` interface for components.

## 6. Database & ORM (Drizzle)

### Schema Design
-   **Single Source of Truth**: The schema is defined in `src/db/schema`.
-   **Multi-tenancy**: Most tables **MUST** have a `tenant_id` to ensure data isolation.
-   **JSONB**: Use `jsonb` columns for flexible data (e.g., product attributes, settings).

### Data Access
-   **Server Actions**: Use Server Actions (`src/db/actions`) for mutations and data fetching.
-   **Repository Pattern**: Encapsulate DB logic to avoid repetition and ensure security (e.g., always filtering by `tenant_id`).

### Migrations
-   Never modify the DB manually.
-   Update the schema file, then run:
    ```bash
    npx drizzle-kit generate
    npx drizzle-kit migrate
    ```

## 7. State Management

-   **URL State**: Use `nuqs` to store state in the URL (search params) for shareable and persistent UI state (filters, pagination, tabs).
-   **Server State**: Rely on Next.js caching and revalidation.
-   **Client State**: Use `useState` or `useReducer` for local, ephemeral state. Avoid global state stores unless absolutely necessary.

## 8. Styling & UI/UX

-   **Tailwind CSS**: Use utility classes for styling.
-   **Shadcn UI**: Use the provided components in `src/components/ui` as the foundation. Customize via `components.json` or direct editing.
-   **Responsiveness**: Mobile-first approach.
-   **Dark Mode**: Support dark mode via `dark:` prefix and `next-themes`.

## 9. Git Workflow

-   **Branches**: `main` (production), `dev` (development).
-   **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat:`, `fix:`, `refactor:`).

## 10. Performance & Optimization

-   **Images**: Use `next/image`.
-   **Fonts**: Use `next/font`.
-   **Lazy Loading**: Use `dynamic()` imports for heavy client components.

## 11. Anti-Repetition & Safety Patterns

We strictly avoid repetitive boilerplate code, especially for cross-cutting concerns like authentication, validation, and context injection.

### Rule: Centralize Cross-Cutting Concerns
**Do not** manually check for authentication, validate user roles, or fetch common context (like `tenant_id`) inside every single function or action. This leads to bloat and security risks (forgetting a check).

### Pattern: Action Wrappers / Middleware
Wrap your business logic in reusable "clients" or middleware that handle the setup work upstream.

**Example Implementation (Context-Aware Clients):**
Instead of writing:
```tsx
// ❌ BAD: Repetitive and error-prone
export async function createProduct(data) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");
    const store = await getStore(data.storeId);
    if (store.ownerId !== session.user.id) throw new Error("Forbidden");
    
    // ... finally business logic
}
```

Use a wrapper pattern (like `dashboardActionClient`):
```tsx
// ✅ GOOD: Clean and safe
export const createProduct = dashboardActionClient
    .action(async ({ parsedInput, ctx }) => {
        // Auth and Store context are ALREADY injected into `ctx`
        // We can focus purely on the business logic
        await db.insert(products).values({ ...parsedInput, tenantId: ctx.store.id });
    });
```

### Benefits
1.  **Zero Bloat**: Business logic remains pure and focused.
2.  **Security by Default**: The wrapper guarantees that if the code runs, the request is safe.
3.  **DRY**: Auth logic is written once, used everywhere.
