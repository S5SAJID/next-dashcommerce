# Developer Handbook & Engineering Standards

This document is the official Code Style Guide and Pattern Handbook for the Customized Eco project. Its purpose is to ensure consistency, quality, and maintainability by providing a single source of truth for our architectural patterns, coding conventions, and engineering philosophy.

Adherence to this guide is mandatory. It is a living document, designed to evolve with the project.

## Table of Contents

1.  [**1. Engineering Philosophy & Core Principles**](#1-engineering-philosophy--core-principles)
2.  [**2. Technology Stack**](#2-technology-stack)
3.  [**3. Repository & Folder Structure**](#3-repository--folder-structure)
4.  [**4. Scalability & Performance Patterns**](#4-scalability--performance-patterns)
5.  [**5. Database & Data Layer**](#5-database--data-layer)
6.  [**6. Application Structure & Routing**](#6-application-structure--routing)
7.  [**7. Frontend & Component Architecture**](#7-frontend--component-architecture)
8.  [**8. Tooling & Code Quality Standards**](#8-tooling--code-quality-standards)
9.  [**9. Future-Proofing: Advanced Recommendations**](#9-future-proofing-advanced-recommendations)
10. [**10. Guide for Junior Developers**](#10-guide-for-junior-developers)

---

## 1. Engineering Philosophy & Core Principles

*   **Convention over Configuration:** We leverage the proven defaults of our frameworks (Next.js, Drizzle) to minimize boilerplate and maximize predictability.
*   **End-to-End Type Safety:** TypeScript is our single source of truth. This is our primary defense against entire classes of runtime bugs.
*   **Clear Separation of Concerns:** The application is logically partitioned into distinct layers (data, UI, routing) and features (dashboard, storefront) to ensure maintainability.
*   **Minimize Boilerplate:** We abstract repetitive logic into reusable hooks, utilities, and components. Avoid copy-pasting code; seek to create a single, reliable implementation.

## 2. Technology Stack

| Category             | Technology                                                              | Purpose                                          |
| -------------------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| **Framework**        | [Next.js (App Router)](https://nextjs.org/docs)                         | Full-stack application framework                 |
| **Language**         | [TypeScript](https://www.typescriptlang.org/)                           | End-to-end type safety                           |
| **UI Library**       | [React](https://react.dev/)                                             | Component-based user interfaces                  |
| **Database ORM**     | [Drizzle ORM](https://orm.drizzle.team/)                                | Type-safe SQL query builder and schema management|
| **Database**         | [PostgreSQL](https://www.postgresql.org/)                               | Relational database (as per `db-design.md`)      |
| **Styling**          | [Tailwind CSS](https://tailwindcss.com/)                                | Utility-first CSS framework                      |
| **UI Components**    | [shadcn/ui](https://ui.shadcn.com/)                                     | Foundational, accessible UI components           |
| **Server State**     | [TanStack Query](https://tanstack.com/query/latest)                     | Data fetching, caching, and server state sync    |
| **Icons**            | [Lucide React](https://lucide.dev/)                                     | Icon library                                     |
| **Linting**          | [ESLint](https://eslint.org/)                                           | Code quality and style enforcement               |
| **Schema Migrations**| [Drizzle Kit](https://orm.drizzle.team/drizzle-kit/overview)            | Automatic SQL migration generation               |

## 3. Repository & Folder Structure

The repository is organized to enforce a clear separation of concerns.

```
/
├── public/                 # Static assets (images, fonts)
├── src/
│   ├── app/                # Next.js App Router: routing, pages, and layouts
│   │   ├── (dashboard)/    # Route group for the admin dashboard
│   │   └── (storefront)/   # Route group for the public storefront
│   ├── components/         # Reusable React components (Atomic Design)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── db/                 # Database logic and schema
│   │   ├── actions/        # Drizzle queries (Server Actions)
│   │   └── schema/         # Drizzle schema definitions
│   ├── hooks/              # Custom, reusable React hooks (e.g., use-localstorage.ts)
│   ├── lib/                # Core utilities and shared logic (e.g., utils.ts)
│   └── providers/          # Global context providers (e.g., dashboard/providers.tsx)
├── drizzle.config.ts       # Configuration for Drizzle Kit
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## 4. Scalability & Performance Patterns

This section explains the "why" behind our core architectural choices, focusing on how they contribute to a high-performance, scalable application.

### Database: Multi-Tenancy by Design

The foundation of our scalability is the multi-tenant database architecture, as defined in `db-design.md` and implemented in our schema.

*   **What it is:** Every table with store-specific data has a non-nullable `store_id` foreign key. For example, `ProductTable` in `src/db/schema/tables/products/index.ts` has a composite unique index on `(store_id, slug)`.
*   **Why it scales:** This composite index allows PostgreSQL to rapidly narrow its search space to a single tenant's data. This means that as we grow from 10 to 10,000 stores, the time it takes to look up one store's products remains consistently fast.

### Application: Server-First Architecture

We embrace the Next.js App Router's "server-first" model.

*   **What it is:** Components are **React Server Components (RSCs)** by default. Only components that require interactivity, like `BreadcrumbNavigation` in `src/components/molecules/bread-crumb-navigation.tsx`, are marked with `"use client"` because they use hooks like `usePathname`.
*   **Why it scales:** This drastically reduces the amount of JavaScript shipped to the user's browser, leading to faster page loads and a better user experience.

### State: Intelligent Caching with TanStack Query

As seen in `src/providers/dashboard/providers.tsx`, we use TanStack Query to manage server state.

*   **Why it scales:** TanStack Query provides an intelligent in-memory cache. If a user navigates away from a page and then returns, the data is served instantly from the cache while a fresh copy is fetched in the background. This avoids redundant network requests and makes the UI feel instantaneous.

## 5. Database & Data Layer

Our data layer is built on PostgreSQL and managed with the Drizzle ORM to ensure full type safety.

### Schema Definition (Drizzle)

The `src/db/schema/` directory is the single source of truth for our database.

*   **Why Drizzle?** It's a type-safety engine. The schema defined in files like `src/db/schema/tables/stores/index.ts` automatically generates TypeScript types, making it impossible to write a query that references a non-existent column.

### Querying Data (Server Actions)

We use Next.js Server Actions in `src/db/actions/` for all database operations.

*   **Why Server Actions?** This pattern, seen in files like `src/db/actions/storefront/products/public/actionts.ts`, allows us to securely query the database without manually creating API endpoints.

#### The Secure Pattern (✅ Do this)

This pattern from `actionts.ts` uses a relational query to ensure the requested product belongs to the correct tenant.

```typescript
// src/db/actions/storefront/products/public/actionts.ts
export async function getPublicStorefrontProduct(domain: string, slug: string) {
  const product = await db.query.ProductTable.findFirst({
    where: (productTable) => and(
      eq(productTable.slug, slug),
      exists( // This subquery is the key to security
        db.select().from(StoreTable).where(and(
          eq(StoreTable.domain, domain),
          eq(StoreTable.id, productTable.store_id)
        ))
      )
    ),
  });
  return product;
}
```

#### The Insecure Anti-Pattern (❌ Never do this)

The `getPublicStorefrontProducts` function in the same file is **critically flawed**. It fetches products without filtering by the `store_id`, leading to a massive data leak. This anti-pattern must be avoided at all costs.

### Migrations (Drizzle Kit)

Database migrations are managed by **Drizzle Kit**. You should **never** write SQL migration files by hand. This prevents human error and ensures migrations are always in sync with the schema.

## 6. Application Structure & Routing

### Route Groups: Separating Concerns

We use route groups (`(dashboard)`, `(storefront)`) to partition the application.

*   **Why Route Groups?** They allow us to create completely separate layouts, as seen with `src/app/(dashboard)/layout.tsx`, without affecting the URL. This is a powerful tool for logical separation.

### The Provider Pattern: Avoiding Prop Drilling

We use a centralized provider component, `DashboardProviders` in `src/providers/dashboard/providers.tsx`, to supply global context.

*   **Why this pattern?** Instead of passing props down through many layers of components ("prop drilling"), the provider pattern makes dependencies like the `QueryClient` or the current theme available to any component in the tree that needs it.

## 7. Frontend & Component Architecture

### Atomic Design: Building for Reusability

We organize components into `atoms`, `molecules`, and `organisms`.

*   **Why Atomic Design?** This forces us to build small, reusable components. For example, the `BreadcrumbItem` atom in `src/components/atoms/breadcrumb/breadcrumb-item.tsx` is a simple, reusable building block for the more complex `BreadcrumbNavigation` molecule.

### Component Style Guide

1.  **File Naming:** kebab-case (e.g., `bread-crumb-navigation.tsx`).
2.  **Props:** Typed with a TypeScript `interface`.
3.  **Styling:** Use Tailwind CSS.
4.  **Dynamic Classes:** Use the `cn` utility from `src/lib/utils.ts`.
5.  **Icons:** Use the `lucide-react` library.
6.  **Composition:** Favor the `children` prop.

**Example: A Perfect "Atom" Component**
```tsx
// src/components/atoms/breadcrumb/breadcrumb-item.tsx
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItemProps { /* ... */ }

export function BreadcrumbItem({ children, isLast = false, className }: BreadcrumbItemProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
      {!isLast && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
    </div>
  )
}
```

## 8. Tooling & Code Quality Standards

### TypeScript: Our Source of Truth

*   **`"strict": true`**: As defined in `tsconfig.json`, this is non-negotiable.
*   **`"paths": { "@/*": [...] }`**: Path aliases are mandatory. They prevent fragile relative imports.

### Linting: Automated Consistency

We use the default Next.js ESLint configuration from `eslint.config.mjs`. This enforces a consistent, community-approved code style.

## 9. Future-Proofing: Advanced Recommendations

To ensure the long-term health of the project, we should work towards implementing these best practices.

*   **Implement Row-Level Security (RLS):** While our application logic is secure, RLS in PostgreSQL would provide a database-level safety net, making it impossible to leak tenant data.
*   **Introduce Automated Testing:** Unit tests (with Vitest/Jest) for utilities in `src/lib` and E2E tests (with Playwright/Cypress) for critical user flows like checkout would prevent regressions.
*   **Adopt Structured Logging:** Using a library like `pino` would make our logs machine-readable and far more useful for debugging issues in production.

## 10. Guide for Junior Developers

### The Golden Rule of Multi-Tenancy

**Every single database query for a resource that belongs to a store MUST be filtered by `store_id`.** Failure to do so is a critical security vulnerability. Study the secure pattern in this guide.

### Code Quality Checklist

1.  **Data Query:** Does my query include a `WHERE` clause filtering by `store_id`?
2.  **Imports:** Am I using the `@/` path alias for all imports?
3.  **Typing:** Are all my function arguments, props, and variables strongly typed?
4.  **Styling:** Am I using the `cn()` function for any dynamic or merged Tailwind CSS classes?
5.  **Reusability:** Have I checked `src/lib` and `src/hooks` to see if a utility for my task already exists?