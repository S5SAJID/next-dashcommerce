# Developer Handbook: A Guide to the Customized Eco Codebase

This document is the official Code Style Guide and Pattern Handbook for the Customized Eco project. Its purpose is to ensure consistency, quality, and maintainability across the development team by providing a single source of truth for our architectural patterns, coding conventions, and best practices.

Adherence to this guide is mandatory for all developers. It is designed to be a living document that will evolve with the project.

## Table of Contents

1.  [Philosophy & Core Principles](#1-philosophy--core-principles)
2.  [Technology Stack](#2-technology-stack)
3.  [Repository & Folder Structure](#3-repository--folder-structure)
4.  [Database & Data Layer](#4-database--data-layer)
    *   [Schema Definition (Drizzle)](#schema-definition-drizzle)
    *   [Multi-Tenancy Model](#multi-tenancy-model)
    *   [Querying Data (Server Actions)](#querying-data-server-actions)
    *   [Migrations](#migrations)
5.  [Application Structure & Routing (Next.js)](#5-application-structure--routing-nextjs)
    *   [Route Groups](#route-groups)
    *   [Layouts & Providers](#layouts--providers)
    *   [Server State Management (TanStack Query)](#server-state-management-tanstack-query)
6.  [Frontend & Component Architecture](#6-frontend--component-architecture)
    *   [Atomic Design](#atomic-design)
    *   [Component Style Guide](#component-style-guide)
    *   [Client-Side State](#client-side-state)
    *   [Styling Conventions](#styling-conventions)
7.  [Core Logic & Utilities](#7-core-logic--utilities)
    *   [Shared Utilities (`/lib`)](#shared-utilities-lib)
    *   [Custom Hooks (`/hooks`)](#custom-hooks-hooks)
8.  [Tooling & Standards](#8-tooling--standards)
    *   [TypeScript (`tsconfig.json`)](#typescript-tsconfigjson)
    *   [Linting (`eslint.config.mjs`)](#linting-eslintconfigmjs)
    *   [Next.js Configuration (`next.config.ts`)](#nextjs-configuration-nextconfigts)
9.  [Rules for Junior Developers](#9-rules-for-junior-developers)
    *   [The Golden Rule of Multi-Tenancy](#the-golden-rule-of-multi-tenancy)
    *   [Code Quality Checklist](#code-quality-checklist)
    *   [Common Pitfalls](#common-pitfalls)

---

## 1. Philosophy & Core Principles

This codebase is built on a foundation of modern, type-safe, and scalable practices.

*   **Convention over Configuration:** We leverage the proven defaults and standards of our chosen frameworks (Next.js, Drizzle) to minimize boilerplate and maximize predictability.
*   **End-to-End Type Safety:** From the database schema to the component props, TypeScript is our single source of truth. If it's not type-safe, it's not ready.
*   **Clear Separation of Concerns:** The application is logically partitioned into distinct layers (data, UI, routing) and features (dashboard, storefront) to ensure maintainability and scalability.
*   **Robust & Reusable Code:** Shared logic is centralized in utilities and custom hooks. Code should be written to be resilient, handling edge cases and providing clear error states.

## 2. Technology Stack

| Category             | Technology                                                              | Purpose                                          |
| -------------------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| **Framework**        | [Next.js (App Router)](https://nextjs.org/docs)                         | Full-stack application framework                 |
| **Language**         | [TypeScript](https://www.typescriptlang.org/)                           | End-to-end type safety                           |
| **UI Library**       | [React](https://react.dev/)                                             | Component-based user interfaces                  |
| **Database ORM**     | [Drizzle ORM](https://orm.drizzle.team/)                                | Type-safe SQL query builder and schema management|
| **Database**         | [PostgreSQL](https://www.postgresql.org/)                               | Relational database                              |
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
│   ├── hooks/              # Custom, reusable React hooks
│   ├── lib/                # Core utilities and shared logic
│   └── providers/          # Global context providers (Theme, QueryClient)
├── drizzle.config.ts       # Configuration for Drizzle Kit
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## 4. Database & Data Layer

Our data layer is built on PostgreSQL and managed with the Drizzle ORM to ensure full type safety between our database and application code.

### Schema Definition (Drizzle)

The single source of truth for our database schema is the set of TypeScript files located in `src/db/schema/`.

*   **Organization:** Schema files are organized by feature area (e.g., `src/db/schema/tables/stores/`, `src/db/schema/tables/products/`).
*   **Naming Convention:** Tables are defined as `pgTable` and exported with a `Table` suffix (e.g., `StoreTable`, `ProductTable`).
*   **Type Safety:** Use Drizzle's built-in types (`varchar`, `uuid`, `timestamp`). For `jsonb` columns, provide a TypeScript type for compile-time safety.

**Example: `StoreTable` Definition**
```typescript
// src/db/schema/tables/stores/index.ts
import { jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

type StoreSettingsType = { /* ... */ }

export const StoreTable = pgTable("stores", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  domain: varchar({ length: 255 }).notNull().unique(),
  settings: jsonb("settings").$type<StoreSettingsType>().notNull(),
  // ... timestamps
})
```

### Multi-Tenancy Model

This is a multi-tenant application where each "tenant" is a "store". All data that belongs to a store **must** be isolated from other stores.

*   **The Golden Rule:** Any table containing store-specific data **must** have a `store_id` column that is a foreign key to `StoreTable.id`.
*   **Indexing:** To ensure query performance, most indexes on tenant-specific tables should be composite indexes starting with `store_id`.

**Example: `ProductTable` with Tenant Isolation**
```typescript
// src/db/schema/tables/products/index.ts
import { pgTable, uuid, varchar, unique } from "drizzle-orm/pg-core"
import { StoreTable } from "@/db/schema";

export const ProductTable = pgTable("products", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  // This foreign key is the cornerstone of our multi-tenant architecture.
  store_id: uuid().references(() => StoreTable.id).notNull(),
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
  // ... other fields
}, (table) => [
  // This composite index ensures fast lookups within a specific store.
  unique("store_slug_idx").on(table.store_id, table.slug)
])
```

### Querying Data (Server Actions)

All database queries are executed via **Next.js Server Actions** located in `src/db/actions/`. This keeps server-side logic out of components and provides a clear, reusable API for data access.

*   **Location:** Actions are organized by route group (`dashboard`, `storefront`) to match their usage context.
*   **Security Warning:** When querying for tenant-specific data, you **MUST** filter by the `store_id` to prevent data leaks.

#### The Secure Pattern (✅ Do this)

This pattern uses a relational query or subquery to ensure that the requested resource belongs to the correct tenant *before* returning it.

```typescript
// src/db/actions/storefront/products/public/actionts.ts
export async function getPublicStorefrontProduct(domain: string, slug: string) {
  const product = await db.query.ProductTable.findFirst({
    where: (productTable) => and(
      eq(productTable.slug, slug),
      // This subquery ensures the product's store_id matches the store with the correct domain.
      exists(
        db.select()
          .from(StoreTable)
          .where(and(
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

The following function is **critically flawed**. It fetches products without filtering by the store, leading to a massive data leak where one store's products would be visible on another's.

```typescript
// This is an example of what NOT to do.
export async function getPublicStorefrontProducts(domain: string) {
  const store_id = storeExists(domain); // It gets the store_id...
  if (!store_id) return notFound();

  // ...but then fails to use it in the query, fetching all products from all stores.
  const products = await db.select().from(ProductTable).orderBy(desc(ProductTable.updated_at))
  return products;
}
```

### Migrations

Database migrations are managed by **Drizzle Kit**. You should **never** write SQL migration files by hand.

1.  **Modify Schema:** Make changes to your schema files in `src/db/schema/`.
2.  **Generate Migration:** Run the following command:
    ```bash
    bun drizzle-kit generate:pg
    ```
3.  **Apply Migration:** Run the migration against your database (this step depends on your deployment process).

## 5. Application Structure & Routing (Next.js)

We use the Next.js App Router to define our application's structure, routing, and data-fetching patterns.

### Route Groups

Route groups are used to partition the application into logical sections without affecting the URL structure.

*   `(dashboard)`: Contains all routes and layouts for the internal admin dashboard.
*   `(storefront)`: Contains all routes and layouts for the public-facing e-commerce store.

### Layouts & Providers

Layouts (`layout.tsx`) define the UI shell for a set of routes. We use a **centralized provider pattern** to supply global context to different sections of the app.

*   A `providers.tsx` component is created to group all context providers (`QueryClientProvider`, `ThemeProvider`, etc.).
*   This provider component then wraps the `{children}` in the corresponding `layout.tsx` file.

**Example: Dashboard Layout**
```tsx
// src/app/(dashboard)/layout.tsx
import DashboardProviders from "@/providers/dashboard/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProviders>
      {/* ...UI shell components like sidebar and header... */}
      <main>{children}</main>
    </DashboardProviders>
  )
}
```

### Server State Management (TanStack Query)

**TanStack Query** is the standard for managing all server state (fetching, caching, updating).

*   **Configuration:** The `QueryClient` is instantiated once (e.g., `src/lib/dashboardQueryClient.tsx`) and provided to the application in the provider component.
*   **Devtools:** `ReactQueryDevtools` must be included in development environments to facilitate debugging.

**Example: Dashboard Providers Setup**
```tsx
// src/providers/dashboard/providers.tsx
"use client";

import { dashboardQueryClient } from "@/lib/dashboardQueryClient";
import { ThemeProvider } from "../theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function DashboardProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={dashboardQueryClient}>
      <ThemeProvider attribute="class" defaultTheme="system">
        {children}
        <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
```

## 6. Frontend & Component Architecture

Our component architecture is based on **Atomic Design** to promote reusability and a clear separation of concerns.

### Atomic Design

Components are organized by their level of complexity.

*   **`src/components/atoms`**: The simplest, indivisible building blocks of the UI (e.g., a custom-styled button, a label, an input).
*   **`src/components/molecules`**: Compositions of atoms that form a distinct, functional unit (e.g., a search bar composed of an input and a button).
*   **`src/components/organisms`**: Complex UI components composed of atoms and molecules that represent a section of the interface (e.g., a site header, a product grid).

### Component Style Guide

All new components must follow these conventions.

1.  **File Naming:** Use kebab-case (e.g., `bread-crumb-navigation.tsx`).
2.  **Props:** Define props with a TypeScript `interface`.
3.  **Styling:** Use Tailwind CSS utility classes.
4.  **Dynamic Classes:** Use the `cn` utility from `src/lib/utils.ts` to conditionally apply and merge classes.
5.  **Icons:** Use icons from the `lucide-react` library.
6.  **Composition:** Favor composition via the `children` prop.

**Example: A Perfect "Atom" Component**
```tsx
// src/components/atoms/breadcrumb/breadcrumb-item.tsx
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItemProps {
  children: React.ReactNode
  isLast?: boolean
  className?: string
}

export function BreadcrumbItem({ children, isLast = false, className }: BreadcrumbItemProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
      {!isLast && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
    </div>
  )
}
```

### Client-Side State

*   **Simple State:** For local, non-persistent component state, use standard React hooks (`useState`, `useReducer`).
*   **URL State:** For state that should be reflected in the URL, use Next.js hooks like `usePathname` and `useSearchParams`.
*   **Persistent State:** For state that needs to persist in the browser, use a custom hook like `useLocalStorage`.

### Styling Conventions

*   **Tailwind CSS:** All styling must be done with Tailwind CSS utility classes. Do not write custom CSS files.
*   **`cn()` Utility:** Always use the `cn()` function when you need to conditionally apply classes or merge classes coming from props. This prevents CSS class conflicts.

## 7. Core Logic & Utilities

Shared, reusable logic is centralized in `src/lib` and `src/hooks`.

### Shared Utilities (`/lib`)

The `src/lib` directory contains logic that can be used across the application, on both the server and the client.

*   **`utils.ts`:** The home for generic, pure helper functions like `formatPrice` or `isActivePath`.
*   **`subdomain.ts`:** Contains the critical business logic for identifying the current tenant from the request's hostname. This is designed for use in Next.js Middleware.

### Custom Hooks (`/hooks`)

The `src/hooks` directory contains reusable client-side logic.

*   **Convention:** Custom hooks should be robust, handling edge cases (like server-side rendering) and, where possible, composing other hooks from trusted libraries like `usehooks-ts`.
*   **Example (`useLocalStorage`):** Our `useLocalStorage` hook is the gold standard. It is isomorphic, resilient to errors, and synchronizes state across browser tabs.

## 8. Tooling & Standards

Our project enforces code quality and consistency through a set of configured tools.

### TypeScript (`tsconfig.json`)

*   **`"strict": true`**: Strict mode is **mandatory**. It is the single most important setting for ensuring code quality and preventing runtime errors.
*   **`"paths": { "@/*": ["./src/*"] }`**: Path aliases are the standard. **Do not use relative imports** like `../../`. Always use the `@/` alias for imports from the `src` directory.

### Linting (`eslint.config.mjs`)

*   **Standard Configuration:** We use the officially recommended ESLint configuration from Next.js (`next/core-web-vitals`).
*   **No Custom Rules:** There are no project-specific overrides. The Next.js standard *is* our standard.

### Next.js Configuration (`next.config.ts`)

*   **Image Security:** Any external domains used for images **must** be added to the `images.remotePatterns` array to be optimized by Next.js.
*   **Typed Environment Variables:** We use the experimental `typedEnv: true` feature to ensure all environment variables are accessed in a type-safe manner.

## 9. Rules for Junior Developers

This section highlights the most critical patterns and potential pitfalls for developers new to the project.

### The Golden Rule of Multi-Tenancy

**Every single database query for a resource that belongs to a store MUST be filtered by `store_id`.** Failure to do so is a critical security vulnerability that will leak data between stores. Review the [Secure Pattern](#the-secure-pattern-do-this) section and ensure you understand it perfectly.

### Code Quality Checklist

Before you submit a pull request, ask yourself:

1.  **Data Query:** If this touches the database, does my query include a `WHERE` clause filtering by `store_id`?
2.  **Imports:** Am I using the `@/` path alias for all imports?
3.  **Typing:** Are all my function arguments, props, and variables strongly typed?
4.  **Styling:** Am I using the `cn()` function for any dynamic or merged Tailwind CSS classes?
5.  **Component Structure:** Does my new component fit logically into the `atoms`, `molecules`, or `organisms` structure?
6.  **Reusability:** Have I checked `src/lib` and `src/hooks` to see if a utility for my task already exists?

### Common Pitfalls

*   **The Insecure Query:** Forgetting to filter by `store_id`. (See above).
*   **Relative Import Paths:** Writing `import MyComponent from '../../components/atoms/my-component'`. This is incorrect. Use `import MyComponent from '@/components/atoms/my-component'`.
*   **"use client" Misuse:** Forgetting to add `"use client"` at the top of a file that uses React hooks like `useState` or `useEffect`. If you see an error about hooks only working in client components, this is the reason.
*   **Modifying `shadcn/ui` Components:** Do not directly edit the files in `src/components/ui`. These are foundational components. If you need a variation, create a new component that wraps the `ui` component and applies different styles or props.