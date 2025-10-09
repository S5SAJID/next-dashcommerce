# Dashcommerce: Code Style Guide & Pattern Handbook

## Part 1: General Principles

### 1.1 Philosophy & Goals

Welcome to the Dashcommerce engineering team! This handbook is the single source of truth for how we build software. Our primary goal is to create a scalable, maintainable, and secure e-commerce platform. To achieve this, we adhere to three core principles:

*   **Readability:** Code is read far more often than it is written. We prioritize clarity and simplicity to ensure that any developer can quickly understand the purpose and function of any part of the codebase.
*   **Simplicity:** We avoid unnecessary complexity. We build the simplest solution that works today, while keeping future scalability in mind. This means favoring clear, straightforward patterns over overly clever or abstract solutions.
*   **Maintainability:** We build for the long term. A maintainable codebase is well-documented, consistently styled, and has a strong safety net of automated tests. This allows us to evolve the platform confidently and efficiently.

### 1.2 Table of Contents

*   [Part 1: General Principles](#part-1-general-principles)
    *   [1.1 Philosophy & Goals](#11-philosophy--goals)
    *   [1.2 Table of Contents](#12-table-of-contents)
*   [Part 2: Architecture & Structural Patterns](#part-2-architecture--structural-patterns)
    *   [2.1 Directory & File Structure](#21-directory--file-structure)
    *   [2.2 Architectural Pattern: Next.js App Router](#22-architectural-pattern-nextjs-app-router)
    *   [2.3 Design Patterns](#23-design-patterns)
*   [Part 3: Code & Naming Conventions](#part-3-code--naming-conventions)
    *   [3.1 Naming Conventions](#31-naming-conventions)
    *   [3.2 Formatting & Style](#32-formatting--style)
    *   [3.3 TypeScript Best Practices](#33-typescript-best-practices)
*   [Part 4: Quality, Reliability, & Security](#part-4-quality-reliability--security)
    *   [4.1 Error Handling & Logging](#41-error-handling--logging)
    *   [4.2 Testing Philosophy](#42-testing-philosophy)
    *   [4.3 Security Best Practices](#43-security-best-practices)
*   [Part 5: Team Workflow](#part-5-team-workflow)
    *   [5.1 Git & Version Control](#51-git--version-control)
    *   [5.2 Code Review Process](#52-code-review-process)
*   [Part 6: AI Agent & Tooling Guidelines](#part-6-ai-agent--tooling-guidelines)
    *   [6.1 Core Principles for AI Usage](#61-core-principles-for-ai-usage)
    *   [6.2 Developer Prompting Guide](#62-developer-prompting-guide)
    *   [6.3 System Prompt for Code Generation AI](#63-system-prompt-for-code-generation-ai)

---

## Part 2: Architecture & Structural Patterns

### 2.1 Directory & File Structure

Our codebase follows a structure derived from Next.js conventions, organized for clarity and separation of concerns.

```
/
├── public/              # Static assets (images, fonts)
├── src/
│   ├── app/             # Next.js App Router: Pages and layouts
│   │   ├── (dashboard)/ # Routes for the merchant dashboard
│   │   └── (storefront)/# Routes for the customer-facing store
│   ├── components/      # React components (Atomic Design)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── db/              # Database layer (Drizzle ORM)
│   │   ├── actions/     # Server Actions for DB mutations/queries
│   │   └── schema/      # Drizzle schema definitions
│   ├── lib/             # Core utilities and helper functions
│   ├── providers/       # Global context providers (Theme, TanStack Query)
│   └── ...
├── .env.local           # Environment variables (untracked)
├── drizzle.config.ts    # Drizzle ORM configuration
├── next.config.ts       # Next.js configuration
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

### 2.2 Architectural Pattern: Next.js App Router

We leverage the Next.js App Router to structure our application. The key features of this pattern are:

*   **Server-Centric:** We default to using React Server Components (RSCs) for performance, fetching data on the server whenever possible. Client components (`"use client"`) are used only when interactivity is required.
*   **Route Groups:** The `(dashboard)` and `(storefront)` directories create distinct application contexts without affecting the URL structure. This allows for separate layouts and concerns between the merchant-facing and customer-facing parts of the application.
*   **Multi-Tenancy:** The application is multi-tenant. All data is scoped to a `store_id`. **All database queries for tenant-specific data MUST be filtered by the current user's `store_id`.**

### 2.3 Design Patterns

We consistently use several key design patterns to ensure our code is robust and maintainable.

*   **Server Actions for Mutations:** All database writes and mutations are handled exclusively through Next.js Server Actions, located in `src/db/actions/`. This ensures that business logic is co-located with data definitions and can be called securely from both client and server components.

    *Do This (Example: Deleting a product):*
    ```typescript
    // src/db/actions/dashboard/products/actions.ts
    "use server";
    import { db } from "@/db/db";
    import { ProductTable } from "@/db/schema";
    import { eq, and } from "drizzle-orm";

    export async function deleteDashboardProduct(productId: string, storeId: string) {
      // Note: storeId filter is MANDATORY
      await db.delete(ProductTable)
        .where(and(
          eq(ProductTable.id, productId),
          eq(ProductTable.store_id, storeId)
        ));
    }
    ```

*   **TanStack Query for Server State:** We use TanStack Query (`@tanstack/react-query`) for all client-side data fetching and caching. It provides a robust framework for handling loading states, error states, and cache invalidation.

    *Do This (Example: Fetching products in a component):*
    ```typescript
    // src/components/organisms/tables/products-table/index.tsx
    "use client";
    import { useQuery } from "@tanstack/react-query";
    import { getDashboardProducts } from "@/db/actions/dashboard/products/actions";

    export default function ProductsTable() {
      const productsQuery = useQuery({
        // The query key must include tenant-specific identifiers
        queryKey: ["products", storeId],
        queryFn: () => getDashboardProducts(storeId),
      });

      // ... component logic to handle loading, error, and data states
    }
    ```

*   **Atomic Design for Components:** Components are organized according to the principles of Atomic Design to promote reusability and a clear component hierarchy.
    *   **Atoms:** The smallest building blocks (e.g., `Button`, `Input`, `Label`). They are highly reusable and have no business logic.
    *   **Molecules:** Compositions of atoms that form simple UI elements (e.g., a search form with an input and a button).
    *   **Organisms:** Complex UI components composed of molecules and/or atoms that represent a distinct section of an interface (e.g., `ProductsTable`, `DashboardHeader`).

---

## Part 3: Code & Naming Conventions

To ensure consistency and readability across the project, we adhere to the following conventions. These are largely enforced by our tooling (ESLint, Prettier, TypeScript Compiler), but it is every developer's responsibility to understand and follow them.

### 3.1 Naming Conventions

| Rule                      | Convention        | ✅ Good Example                  | ❌ Bad Example                   |
| ------------------------- | ----------------- | -------------------------------- | -------------------------------- |
| Variables & Functions     | `camelCase`       | `const userCart = ...`           | `const UserCart = ...`           |
| Classes, Components, Types | `PascalCase`      | `class UserSession { ... }`      | `class user_session { ... }`     |
| Constants & Enums         | `UPPER_SNAKE_CASE`| `const MAX_LOGIN_ATTEMPTS = 5;`  | `const maxLoginAttempts = 5;`    |
| Files & Directories       | `kebab-case`      | `components/product-card.tsx`    | `components/ProductCard.tsx`     |
| Database Tables (Drizzle) | `PascalCase`      | `export const ProductTable = ...`| `export const product_table = ...` |
| Database Columns          | `snake_case`      | `created_at: timestamp(...)`     | `createdAt: timestamp(...)`      |

### 3.2 Formatting & Style

Our formatting is automated by **Prettier**. Before committing, ensure you have formatted your code. The key rules are:

| Rule             | Convention                               |
| ---------------- | ---------------------------------------- |
| Indentation      | 2 spaces                                 |
| Line Length      | Max 120 characters                       |
| Quotes           | Double quotes (`"`) for JSX, single (`'`) for JS/TS |
| Semicolons       | Always used at the end of statements     |
| Trailing Commas  | Yes (where valid)                        |
| Import Ordering  | Imports are sorted automatically by Prettier |

### 3.3 TypeScript Best Practices

*   **Strict Mode is Mandatory:** Our `tsconfig.json` has `"strict": true` enabled. All code must be strictly typed. Avoid `any` whenever possible.
*   **Use Path Aliases:** For clean and maintainable imports, always use the `@/*` path alias configured in `tsconfig.json`.

    *Do This:*
    ```typescript
    import { cn } from '@/lib/utils';
    import { ProductTable } from '@/db/schema';
    ```
    *Don't Do This:*
    ```typescript
    import { cn } from '../../lib/utils';
    import { ProductTable } from '../db/schema';
    ```

*   **Prefer `async/await`:** Use `async/await` for asynchronous operations over raw Promises for improved readability.

    *Do This:*
    ```typescript
    async function fetchProducts() {
      try {
        const products = await getDashboardProducts();
        // ...
      } catch (error) {
        // ...
      }
    }
    ```
    *Don't Do This:*
    ```typescript
    function fetchProducts() {
      getDashboardProducts()
        .then(products => { /* ... */ })
        .catch(error => { /* ... */ });
    }
    ```
*   **Use Modern Array Methods:** Prefer functional array methods like `.map()`, `.filter()`, and `.reduce()` over traditional `for` loops for immutable and more declarative data transformations.

---

## Part 4: Quality, Reliability, & Security

### 4.1 Error Handling & Logging

A robust application anticipates and handles errors gracefully. Our approach is as follows:

*   **Validation with Zod:** All data coming from the client (e.g., form submissions) or external APIs **must** be validated using Zod. Server Actions should use `zod.safeParse()` to handle validation errors and return structured error messages to the client.

*   **`try/catch` for Async Operations:** All asynchronous operations, especially database queries and API calls, must be wrapped in `try/catch` blocks to handle potential runtime errors.

    *Do This:*
    ```typescript
    export async function deleteDashboardProduct(id: string) {
      try {
        // ... database operation
        return { success: true };
      } catch (error) {
        console.error("Failed to delete product:", error);
        return { success: false, error: "An unexpected error occurred." };
      }
    }
    ```

*   **Logging:** Currently, logging is done via `console.log` and `console.error`. As the application matures, we will integrate a structured logging service.

### 4.2 Testing Philosophy

We follow the **Testing Pyramid** model to ensure a healthy and maintainable test suite. Our goal is to catch bugs as early as possible in the development cycle.

*   **Unit Tests (Base of the Pyramid):** These test the smallest units of code, like utility functions and individual React components in isolation.
    *   **Framework:** Vitest
    *   **Component Testing:** React Testing Library
    *   **Goal:** Verify that individual pieces of logic work as expected.

*   **Integration Tests (Middle of the Pyramid):** These test the interaction between multiple components, such as a form and its validation, or a component and a server action.
    *   **Framework:** Vitest + React Testing Library
    *   **Goal:** Ensure that different parts of the application work together correctly.

*   **End-to-End (E2E) Tests (Top of the Pyramid):** A small number of E2E tests verify critical user flows from start to finish in a real browser environment.
    *   **Framework:** Playwright (to be integrated)
    *   **Goal:** Guarantee that key user journeys (e.g., login, checkout) are fully functional.

### 4.3 Security Best Practices

*   **Secrets Management:** All secrets (API keys, database URLs, etc.) **must** be stored in environment variables (`.env.local`). Never hardcode secrets in the source code. Access them in the application via `process.env`.

*   **Multi-Tenancy Enforcement:** This is our most critical security concern. **Every database query that accesses tenant-specific data (e.g., products, orders) MUST include a `.where()` clause that filters by the user's `store_id`.** Failure to do so is a critical security vulnerability.

    *Do This:*
    ```typescript
    db.select().from(ProductTable).where(eq(ProductTable.store_id, storeId));
    ```
    *Don't Do This (Critical Security Risk):*
    ```typescript
    db.select().from(ProductTable).where(eq(ProductTable.id, productId)); // Missing store_id check
    ```

*   **Preventing XSS:** By using React, we are protected against most Cross-Site Scripting (XSS) attacks by default, as it automatically escapes content rendered in JSX. Be cautious when using `dangerouslySetInnerHTML`.

*   **Preventing SQL Injection:** By using Drizzle ORM with its query builder, we are protected against SQL injection vulnerabilities. Always use Drizzle's methods and never construct raw SQL queries with user input.

---

## Part 5: Team Workflow

A smooth workflow is key to our team's productivity and success. We follow these standardized processes for version control and code review.

### 5.1 Git & Version Control

*   **Branching Strategy: GitHub Flow**
    *   `main` is our primary branch. It is always considered stable and deployable.
    *   All new work (features, bug fixes) **must** be done on a feature branch created from `main`.
    *   Branch names should be descriptive and follow the format: `<type>/<ticket-id>-<short-description>`.
        *   **Examples:**
            *   `feat/PROJ-123-add-product-reviews`
            *   `fix/PROJ-456-correct-cart-calculation`
            *   `chore/PROJ-789-update-dependencies`

*   **Commit Messages: Conventional Commits**
    *   We adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification. This creates an explicit and readable commit history.
    *   The format is: `<type>(<scope>): <subject>`
        *   **`<type>`:** `feat`, `fix`, `build`, `chore`, `ci`, `docs`, `perf`, `refactor`, `revert`, `style`, `test`.
        *   **`<scope>` (optional):** The part of the codebase affected (e.g., `products`, `auth`, `checkout`).
        *   **`<subject>`:** A short, imperative-mood description of the change.
    *   **Examples:**
        *   `feat(auth): implement password reset via email`
        *   `fix(checkout): resolve race condition in inventory check`
        *   `docs(api): update documentation for products endpoint`
        *   `chore: upgrade next.js to version 15.5.1`

### 5.2 Code Review Process

*   **Pull Requests (PRs):** All code must be reviewed via a Pull Request before being merged into `main`. Do not merge your own PRs.
*   **PR Template:** Use the following markdown template for all PR descriptions to provide context for reviewers.

    ```markdown
    ## Description

    *A clear and concise description of the changes.*

    **Related Ticket:** [Link to Jira/Linear/GitHub Issue]

    ## Changes

    - [ ] Change 1
    - [ ] Change 2

    ## How to Test

    1. Go to '...'
    2. Click on '....'
    3. Scroll down to '....'
    4. See error

    ## Screenshots (if applicable)

    *Add before and after screenshots to help visualize the changes.*
    ```
*   **Review Guidelines:**
    *   **At least one approval** is required from another team member before merging.
    *   Reviewers should focus on logic, architectural adherence, and potential edge cases. Style and formatting are handled by our automated tools.
    *   Be constructive and clear in your feedback.

---

## Part 6: AI Agent & Tooling Guidelines

This section guides developers and AI assistants to ensure all generated code conforms to this handbook.

### 6.1 Core Principles for AI Usage

*   **AI as a Copilot:** AI is a tool to accelerate, not replace, engineering judgment. Use it to automate boilerplate, generate ideas, and learn, but always apply your own expertise.
*   **Developer is Accountable:** You are responsible for all code you commit, regardless of its origin. You must review, understand, and test all AI-generated code to ensure it meets our standards for quality, security, and performance.
*   **Adherence is Mandatory:** All AI-generated code **must** strictly adhere to this handbook. Do not commit non-compliant code generated by an AI.

### 6.2 Developer Prompting Guide

To get the best results from an AI assistant, you must provide high-quality context.

*   **Provide Context:** Always include snippets of existing, compliant code as examples in your prompt. The AI will learn from these examples and mimic the established patterns.
*   **Be Explicit:** Clearly state your requirements and reference the patterns in this handbook.

    *Good Prompt Example:*
    > "Using our standard pattern for TanStack Query and Drizzle, create a new Server Action called `getStoreAnalytics` that retrieves the total number of products and orders for a given `storeId`. The action must be in `src/db/actions/dashboard/analytics/actions.ts`. Ensure all data access is filtered by `storeId` for security. Here is our existing `getDashboardProducts` action for reference: [paste code]"

    *Bad Prompt Example:*
    > "make a function to get analytics"

### 6.3 System Prompt for Code Generation AI

To configure your AI tools (like ChatGPT, Copilot, etc.) for project-specific tasks, use the following system prompt.

```markdown
You are an expert software engineer assigned to the "Dashcommerce" project.
Your sole purpose is to help developers write code that is 100% compliant with our established Code Style Guide & Pattern Handbook.

**Core Instructions:**
1.  **Analyze Provided Context:** Before writing any code, carefully analyze the user-provided snippets, file structure, and examples to understand our patterns.
2.  **Strictly Adhere to Rules:** Follow all naming conventions (`camelCase`, `PascalCase`), architectural patterns (Next.js Server Actions, TanStack Query, Drizzle ORM), error handling strategies (`try/catch`, Zod validation), and formatting rules (Prettier with 120 char line length) defined in our handbook.
3.  **Prioritize Security:** All database queries for tenant-specific data MUST be filtered by `store_id`. This is a non-negotiable security requirement.
4.  **Prioritize Readability:** Generate clear, simple, and well-commented code.
5.  **Ask for Clarification:** If the user's request is ambiguous or conflicts with the handbook, ask for clarification instead of generating non-compliant code.
6.  **Explain Your Code:** Briefly explain the generated code and how it aligns with our patterns.
```