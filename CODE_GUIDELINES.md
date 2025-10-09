# 📘 The Dashcommerce Developer Handbook & Engineering Standards

This document is the official, unified Code Style Guide and Pattern Handbook for the Dashcommerce project (also known as "Customized Eco" or "ExpEcommerce"). Its purpose is to ensure consistency, quality, security, and maintainability by providing a single source of truth for our architectural patterns, coding conventions, and engineering philosophy.

**Adherence to this guide is mandatory for all team members.** It is a living document, designed to evolve with the project.

---

## 📜 Table of Contents

1.  [**Part 1: General Principles & Philosophy**](#part-1-general-principles--philosophy)
2.  [**Part 2: Technology Stack**](#part-2-technology-stack)
3.  [**Part 3: Architecture & Structural Patterns**](#part-3-architecture--structural-patterns)
4.  [**Part 4: Code & Naming Conventions**](#part-4-code--naming-conventions)
5.  [**Part 5: Quality, Reliability, & Security**](#part-5-quality-reliability--security)
6.  [**Part 6: Team Workflow**](#part-6-team-workflow)
7.  [**Part 7: AI Agent & Tooling Guidelines**](#part-7-ai-agent--tooling-guidelines)
8.  [**Part 8: Guide for New Developers**](#part-8-guide-for-new-developers)

---

## Part 1: General Principles & Philosophy

Dashcommerce is an experimental, modern e-commerce platform built with Next.js, focused on **simplicity, customizability, and developer experience**. This handbook is the single source of truth for how we build software, guided by these core principles:

*   **Readability:** Code is read far more often than it is written. We prioritize clear, self-documenting code and straightforward patterns over clever or overly abstract solutions.
*   **Type Safety:** We leverage TypeScript's strict mode and Zod for runtime validation to create an end-to-end type-safe application. This is our primary defense against entire classes of runtime bugs.
*   **Simplicity & Convention over Configuration:** We avoid unnecessary complexity and leverage the proven defaults of our frameworks (Next.js, Drizzle) to minimize boilerplate and maximize predictability.
*   **Maintainability & Modularity:** We build for the long term. A maintainable codebase is well-documented, consistently styled, and has a clear separation of concerns through Atomic Design patterns and logical partitioning of the application.

---

## Part 2: Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js (App Router)](https://nextjs.org/docs) | Full-stack application framework |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | End-to-end type safety |
| **UI Library** | [React](https://react.dev/) | Component-based user interfaces |
| **Database ORM** | [Drizzle ORM](https://orm.drizzle.team/) | Type-safe SQL query builder & schema management|
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Relational database with RLS & JSONB support |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) | Foundational, accessible UI components |
| **Server State** | [TanStack Query](https://tanstack.com/query/latest) | Data fetching, caching, and server state synchronization |
| **Validation** | [Zod](https://zod.dev/) | Schema-based validation and type inference |
| **Forms** | [React Hook Form](https://react-hook-form.com/) | Performant and flexible form management |
| **Icons** | [Lucide React](https://lucide.dev/) | Icon library |
| **Linting/Formatting** | [ESLint](https://eslint.org/) / [Prettier](https://prettier.io/) | Code quality and style enforcement |
| **Schema Migrations**| [Drizzle Kit](https://orm.drizzle.team/drizzle-kit/overview) | Automatic SQL migration generation |
| **Package Manager**| [Bun](https://bun.sh/) | Recommended package manager |

---

## Part 3: Architecture & Structural Patterns

### 3.1 Directory & File Structure

Our codebase follows a feature-based structure derived from Next.js conventions, organized for clarity and separation of concerns.

```
/
├── public/                 # Static assets (images, fonts)
├── src/
│   ├── app/                # Next.js App Router: routing, pages, and layouts
│   │   ├── (dashboard)/    # Route group for the admin dashboard
│   │   └── (storefront)/   # Route group for the public storefront
│   ├── components/         # Reusable React components (Atomic Design)
│   │   ├── atoms/          # Smallest reusable components (Button, Input)
│   │   ├── molecules/      # Compositions of atoms (Search Form)
│   │   └── organisms/      # Complex UI sections (Products Table, Header)
│   ├── db/                 # Database logic and schema
│   │   ├── actions/        # Server Actions for DB queries & mutations
│   │   └── schema/         # Drizzle schema definitions
│   ├── hooks/              # Custom, reusable React hooks (e.g., use-local-storage)
│   ├── lib/                # Core utilities and shared logic (e.g., utils.ts)
│   └── providers/          # Global context providers (e.g., dashboard/providers.tsx)
├── .env.local              # Environment variables (untracked)
├── drizzle.config.ts       # Configuration for Drizzle Kit
├── next.config.ts          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

### 3.2 Architectural Patterns

#### Layered Architecture & Data Flow
The application follows a three-tier layered architecture, embracing the Next.js "server-first" model.

1.  **Presentation Layer** (`/src/app`, `/src/components`): Next.js pages and React Components. Components are **Server Components by default**, with `"use client"` used only when interactivity (hooks, event handlers) is required.
2.  **Business Logic Layer** (`/src/db/actions`): **Next.js Server Actions** handle all business logic, mutations, and data queries.
3.  **Data Access Layer** (`/src/db/schema`): **Drizzle ORM** schemas define the database structure and provide a type-safe interface for querying.

**Data Flow:**
```
User Interaction → Client Component → Server Action → Drizzle ORM → Database → Response
```

#### Multi-Tenancy Architecture
The foundation of our scalability and security is the multi-tenant database architecture.

*   **Tenant Identifier:** Each business entity ("store") is a tenant. The `store_id` is the universal tenant identifier.
*   **Data Isolation:** Every table containing store-specific data (e.g., `products`, `orders`) **must** have a non-nullable `store_id` foreign key.
*   **Performance:** Composite indexes starting with `store_id` (e.g., `unique("store_slug_idx").on(table.store_id, table.slug)`) are critical for ensuring that queries remain fast as the number of tenants grows.

### 3.3 Core Design Patterns

We consistently use several key design patterns to ensure our code is robust, reusable, and maintainable.

*   **Server Actions Pattern:** All database reads and writes are handled exclusively through Next.js Server Actions located in `src/db/actions/`. These are functions marked with `"use server"`. This co-locates business logic with data definitions and provides a secure RPC-like interface.

*   **TanStack Query for Server State:** We use TanStack Query (`@tanstack/react-query`) for all client-side data fetching, caching, and state synchronization. It provides a robust framework for handling loading states, error states, and cache invalidation, making the UI feel instantaneous.

*   **Atomic Design for Components:** Components are organized by complexity (`atoms` → `molecules` → `organisms`) to promote reusability, enforce separation of concerns, and create a clear component hierarchy.

*   **Zod for Validation & Type Inference:** Zod schemas are the single source of truth for data validation. We infer TypeScript types directly from these schemas (`z.infer<typeof schema>`), eliminating type duplication and ensuring validation rules always match the type definitions.

*   **Provider Pattern:** Global and feature-specific contexts (like `QueryClient` or theme state) are managed through a centralized provider component (e.g., `DashboardProviders`) that wraps the application layout. This avoids "prop drilling" and makes dependencies available to any component in the tree.

---

## Part 4: Code & Naming Conventions

Consistency is key to a readable and maintainable codebase. These conventions are enforced by our tooling (ESLint, Prettier) and must be followed by all developers.

### 4.1 Naming Conventions

| Category | Convention | ✅ Good Example | ❌ Bad Example |
| :--- | :--- | :--- | :--- |
| **Variables & Functions** | `camelCase` | `getDashboardProducts` | `GetProducts`, `get_products` |
| **React Components** | `PascalCase` | `ProductForm`, `BackButton` | `productForm`, `back-button` |
| **Types & Interfaces** | `PascalCase` | `ProductFormType`, `Store` | `productFormType`, `store_type` |
| **Constants & Enums** | `UPPER_SNAKE_CASE` | `MAX_LOGIN_ATTEMPTS` | `maxLoginAttempts` |
| **Files & Directories** | `kebab-case` | `product-card.tsx`, `db-actions/` | `ProductCard.tsx`, `dbActions/` |
| **Database Tables (Schema)** | `PascalCase` + "Table" | `export const ProductTable = ...` | `export const product_table = ...`|
| **Database Columns (SQL)** | `snake_case` | `created_at`, `store_id` | `createdAt`, `storeId` |
| **TypeScript Properties** | `camelCase` | `createdAt`, `storeId` | `created_at`, `store_id` |

### 4.2 Formatting & Style (via Prettier)

Our formatting is automated by **Prettier**. Ensure your code is formatted before committing.

| Rule | Convention |
| :--- | :--- |
| **Indentation** | 2 spaces |
| **Line Length** | Max 120 characters |
| **Quotes** | Double quotes (`"`) for JSX, single (`'`) is acceptable elsewhere |
| **Semicolons** | Used at the end of statements |
| **Trailing Commas** | Yes (where valid) |
| **Import Ordering** | Sorted automatically: React -> 3rd Party -> Local (`@/`) |

### 4.3 TypeScript Best Practices

*   **Strict Mode is Mandatory:** Our `tsconfig.json` has `"strict": true` enabled. All code must be strictly typed. Avoid `any` whenever possible.
*   **Use Path Aliases:** Always use the `@/*` path alias for imports within the `src` directory to avoid fragile relative paths (`../../`).
*   **Prefer `async/await`:** Use `async/await` with `try/catch` blocks for asynchronous operations for improved readability over `.then()` chains.
*   **Use Modern Array Methods:** Prefer functional methods like `.map()`, `.filter()`, and `.reduce()` over traditional `for` loops for immutable and declarative data transformations.
*   **Type Inference:** Let TypeScript infer types when it's obvious, but be explicit with function arguments and return types for clarity and safety.

### 4.4 React & Next.js Idioms

*   **Server vs. Client Components:**
    *   **Default to Server Components:** No directive needed. Use for data fetching and non-interactive UI.
    *   `"use client"`: Required at the top of files using React hooks (`useState`, `useEffect`), event handlers (`onClick`), or browser APIs.
    *   `"use server"`: Required at the top of files containing Server Actions or inside functions defined within Server Components.
*   **Composition:** Favor composition via the `children` prop over complex prop passing.

---

## Part 5: Quality, Reliability, & Security

### 5.1 The Golden Rule of Multi-Tenancy Security

This is our most critical security principle. Failure to adhere to it is a severe vulnerability.

> **Every single database query for a resource that belongs to a store MUST be filtered by `store_id`.**

Failure to do so will leak data between tenants, allowing one store's data to be viewed or modified by another.

#### The Secure Pattern (✅ Do this)

This pattern uses a subquery or relational join to ensure the requested product belongs to the correct tenant *before* returning it.

```typescript
// src/db/actions/storefront/products/public/actions.ts
export async function getPublicStorefrontProduct(domain: string, slug: string) {
  const product = await db.query.ProductTable.findFirst({
    where: (productTable, { and, eq, exists }) => and(
      eq(productTable.slug, slug),
      // This subquery is the key to security. It verifies the product's
      // store_id matches the store associated with the correct domain.
      exists(
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

The following function is **critically flawed**. It fetches a product by its ID but fails to check if that product belongs to the current user's store.

```typescript
// This is a CRITICAL SECURITY RISK and must be avoided at all costs.
export async function getProductById(productId: string) {
  // This query is insecure because it lacks a store_id filter.
  // Any user who knows a product ID from another store could access it.
  const product = await db.select()
    .from(ProductTable)
    .where(eq(ProductTable.id, productId)); // Missing store_id check!

  return product;
}
```

### 5.2 Error Handling & Logging

*   **Server Action Responses:** Server Actions must return a standardized success/error object to provide clear feedback to the client.
    ```typescript
    // Success
    { success: true, message: "Operation completed", data: ... }
    // Error
    { success: false, error: "An unexpected error occurred." }
    ```
*   **`try/catch` Blocks:** All asynchronous operations that can fail (database queries, API calls) **must** be wrapped in `try/catch` blocks.
*   **Client-Side Notifications:** Use the `sonner` library with `toast.promise()` to handle loading, success, and error states for user-initiated actions.
*   **Logging:** Use `console.log()` and `console.error()` for development. The Drizzle logger is enabled for debugging database queries.

### 5.3 Data Validation

*   **Zod for All Inputs:** All data coming from the client (e.g., form submissions) or external sources **must** be validated using a Zod schema on the server.
*   **`.safeParse()` in Server Actions:** Use `schema.safeParse(data)` at the beginning of Server Actions to validate input and return a structured error if validation fails.

### 5.4 Secrets Management

*   All secrets (API keys, database URLs) **must** be stored in environment variables and accessed via `process.env`.
*   Local secrets are stored in `.env.local`, which is gitignored.
*   **Never hardcode secrets in the source code.**

### 5.5 Testing Philosophy

While the project is currently experimental, we will adopt the **Testing Pyramid** model.

*   **Unit Tests (Vitest):** For utility functions, hooks, and isolated business logic.
*   **Integration Tests (Vitest + React Testing Library):** For interactions between components and Server Actions.
*   **End-to-End (E2E) Tests (Playwright):** For critical user flows like login, product creation, and checkout.

---

## Part 6: Team Workflow

### 6.1 Git & Version Control

*   **Branching Strategy: GitHub Flow**
    *   `main` is our primary branch. It is always stable and deployable.
    *   All new work (features, fixes) **must** be done on a feature branch created from `main`.
    *   Branch names must be descriptive and follow the format: `<type>/<ticket-id>-<short-description>`.
        *   **Examples:** `feat/PROJ-123-add-product-reviews`, `fix/PROJ-456-correct-cart-calculation`

*   **Commit Messages: Conventional Commits**
    *   We adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification.
    *   **Format:** `<type>(<scope>): <subject>`
    *   **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`.
    *   **Examples:**
        *   `feat(products): implement product image uploads`
        *   `fix(checkout): resolve race condition in inventory check`
        *   `docs(api): update documentation for products endpoint`

### 6.2 Code Review Process

*   **Pull Requests (PRs):** All code must be reviewed via a Pull Request before being merged into `main`. Do not merge your own PRs.
*   **Keep PRs Small:** Focus on a single feature or fix.
*   **PR Template:** Use the project's PR template to provide a clear description, link to the relevant ticket, and explain how to test the changes.
*   **Review Guidelines:** At least **one approval** from another team member is required. Reviewers should focus on logic, adherence to this handbook, and potential edge cases.

---

## Part 7: AI Agent & Tooling Guidelines

### 7.1 Core Principles for AI Usage

1.  **AI as a Copilot:** AI accelerates development but does not replace engineering judgment.
2.  **Developer Accountability:** You are responsible for all committed code, regardless of its origin. You must review, understand, and test all AI-generated code.
3.  **Adherence is Mandatory:** All AI-generated code must strictly follow this handbook.
4.  **Context is King:** Always provide existing, compliant code examples when prompting.

### 7.2 System Prompt for Code Generation AI

Use this prompt to configure your AI tools (ChatGPT, Copilot, etc.) for project-specific tasks.

```markdown
You are an expert TypeScript/Next.js engineer assigned to the **Dashcommerce** project. Your sole purpose is to help developers write code that is 100% compliant with our established Developer Handbook & Engineering Standards.

**Core Instructions:**

1.  **Analyze Provided Context**: Before writing any code, carefully analyze user-provided snippets, file structures, and examples to understand our patterns.

2.  **Strictly Adhere to Rules**:
    *   **Architecture**: Default to React Server Components. Use "use client" only for interactivity. Use `"use server"` for all database operations (Server Actions).
    *   **Security**: All tenant-specific database queries MUST be filtered by `store_id`. This is a non-negotiable, critical security requirement. Add a `// TODO: Filter by store_id` comment if context is missing.
    *   **Naming Conventions**: `camelCase` for functions/variables, `PascalCase` for components/types, `kebab-case` for files/directories. Drizzle schemas use `PascalCase` + "Table" suffix (`ProductTable`).
    *   **Error Handling**: Server Actions must return `{ success: boolean, error?: string }`. All async operations must be in `try/catch` blocks.
    *   **Validation**: Use Zod for all input validation with `.safeParse()`. Infer types from Zod schemas.
    *   **Styling**: Use Tailwind CSS with the `cn()` utility for dynamic classes.

3.  **Prioritize Readability**: Generate clear, simple, and well-commented code. Prefer explicit over clever.

4.  **Ask for Clarification**: If the user's request is ambiguous or conflicts with the handbook, ask for clarification instead of generating non-compliant code.

5.  **Explain Your Code**: Briefly explain the generated code and how it aligns with our patterns.
```

---

## Part 8: Guide for New Developers

Welcome to the team! This section highlights the most critical patterns you need to know.

### 8.1 The Golden Rule (Again)

It's worth repeating: **Every single database query for a resource that belongs to a store MUST be filtered by `store_id`.** If you are unsure, ask for a review. This is the most important rule in this entire handbook.

### 8.2 Code Quality Checklist

Before you submit a pull request, ask yourself:

1.  **Data Query Security:** If this touches the database, does my query include a `WHERE` clause filtering by `store_id`?
2.  **Path Aliases:** Am I using the `@/` path alias for all internal imports? (No `../../`)
3.  **Type Safety:** Are all my function arguments, props, and variables strongly typed? Is `any` used anywhere?
4.  **Styling:** Am I using the `cn()` function for any dynamic or merged Tailwind CSS classes?
5.  **Reusability:** Have I checked `src/lib`, `src/hooks`, and `src/components` to see if a utility for my task already exists?
6.  **Conventions:** Does my code follow all the naming and formatting conventions in this guide?

### 8.3 Common Pitfalls

*   **The Insecure Query:** Forgetting to filter by `store_id`.
*   **Relative Import Paths:** Writing `import X from '../../components/atoms/x'`. This is incorrect. Use `import X from '@/components/atoms/x'`.
*   **`"use client"` Misuse:** Forgetting to add `"use client"` at the top of a file that uses React hooks (`useState`, `useEffect`). If you see an error about hooks only working in client components, this is the reason.
*   **Modifying `shadcn/ui` Components:** Do not directly edit files in `src/components/ui`. These are foundational. If you need a variation, create a new component that wraps the `ui` component and applies different styles or props.