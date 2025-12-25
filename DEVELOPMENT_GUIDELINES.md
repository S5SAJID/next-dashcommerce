# Development Guidelines

This document serves as the comprehensive guide for development on the **Next DashCommerce** project. It outlines the architecture, coding standards, and best practices to ensure consistency, maintainability, and professional quality code.

## 1. Project Overview

**Next DashCommerce** is a high-performance, multi-tenant e-commerce platform built with modern web technologies. It emphasizes type safety, performance, and a premium user experience.

### Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Cache Components, Turbopack)
-   **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **UI Library**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
-   **Authentication**: [Better Auth](https://better-auth.com/)
-   **State Management**: [Nuqs](https://nuqs.47ng.com/) (URL state), React Server Actions
-   **Validation**: [Zod](https://zod.dev/)
-   **Linting/Formatting**: [Biome](https://biomejs.dev/)
-   **Caching**: Next.js 16 Cache Components with custom cache management system

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

## 11. API Development

-   **Framework**: Use `next-rest-framework` for type-safe, auto-documented REST APIs.
-   **Structure**: All APIs under `/api/v1/` (versioned). Separate by domain: `/(dashboard)/*` (protected), `/(storefront)/*` (public).
-   **Pattern**: Always use `routeOperation` and `routeHandler` - never raw Next.js route handlers for REST endpoints.
-   **Validation**: Define all request/response (if not available or the already present cant be used) schemas with Zod for runtime validation and auto-generated OpenAPI specs.
-   **Responses**: Standardize formats - `{ data, pagination }` for lists, `{ error, code }` for errors.
-   **Methods**: Follow REST conventions - `GET` (retrieve), `POST` (create), `PATCH` (update), `DELETE` (remove).
-   **Reuse Logic**: Call existing Server Actions from API routes - don't duplicate database logic.
-   **Documentation**: Run `bun run docs:generate` after changes. View at `/api/v1/docs`.

## 12. Anti-Repetition & Safety Patterns

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

## 13. Caching & Performance (Next.js 16 Cache Components)

We use Next.js 16's Cache Components architecture to achieve optimal performance through strategic caching. This system combines static prerendering with dynamic content delivery.

### Core Caching Concepts

#### Cache Components Architecture
- **Static Shell**: Prerendered HTML that loads instantly
- **Dynamic Content**: Streams at request time when needed
- **Cached Content**: Dynamic data cached for reuse across requests

#### The Three Content Types
1. **Static Content**: Automatically prerendered (imports, computations, synchronous operations)
2. **Cached Dynamic Content**: External data cached with `'use cache'` directive
3. **Runtime Dynamic Content**: Request-specific data wrapped in `<Suspense>`


### Caching Patterns

#### 1. The `'use cache'` Directive

**Rules:**
- Place `'use cache'` at the very top of functions/components
- Cannot be used with runtime data (`cookies()`, `headers()`, `params`) in the same scope
- Use for data that doesn't change frequently

**Example:**
```tsx
// ✅ CORRECT: Database action with caching
export const getProducts = dashboardActionClient.action(async ({ ctx }) => {
  'use cache';
  applyCache(tags.storeProducts(ctx.storeId));
  
  const products = await db.query.ProductTable.findMany({
    where: eq(ProductTable.store_id, ctx.storeId)
  });
  
  return products;
});
```

#### 2. Async-to-Child Pattern

**Rule**: Never access runtime data (`await params`, `cookies()`, `headers()`) in page components directly. Always delegate to child components wrapped in `<Suspense>`.

**Example:**
```tsx
// ✅ CORRECT: Async-to-Child Pattern
export default function ProductPage({ params }: PageProps) {
  return (
    <div>
      <h1>Static content in shell</h1>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductPageInner params={params} />
      </Suspense>
    </div>
  );
}

async function ProductPageInner({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CachedProductContent slug={slug} />;
}

async function CachedProductContent({ slug }: { slug: string }) {
  'use cache';
  applyCache(tags.storeProduct(storeId, slug));
  
  const product = await getProduct(slug);
  return <ProductDisplay product={product} />;
}
```

#### 3. Runtime Data Extraction Pattern

**Rule**: Extract values from runtime APIs and pass them as arguments to cached functions.

**Example:**
```tsx
// ✅ CORRECT: Extract runtime data, pass to cached function
export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContent />
    </Suspense>
  );
}

async function ProfileContent() {
  const session = (await cookies()).get('session')?.value;
  return <CachedUserData sessionId={session} />;
}

async function CachedUserData({ sessionId }: { sessionId: string }) {
  'use cache';
  applyCache(tags.userSession(sessionId));
  
  const userData = await fetchUserData(sessionId);
  return <UserProfile data={userData} />;
}
```

### Cache Management System

#### Cache Tags
We use a type-safe cache tagging system (`src/lib/cache/cache-manager.ts`):

```tsx
// ✅ Type-safe cache tagging
applyCache(
  tags.store(storeId),
  tags.storeProducts(storeId),
  tags.storeProduct(storeId, productId)
);
```

#### Cache Invalidation

**Use `updateTag` in Server Actions** for immediate cache invalidation:
```tsx
export const updateProduct = dashboardActionClient
  .action(async ({ parsedInput, ctx }) => {
    // Update product in database
    await db.update(ProductTable).set(parsedInput);
    
    // Immediately invalidate cache
    updateCache(
      tags.storeProducts(ctx.storeId),
      tags.storeProduct(ctx.storeId, parsedInput.id)
    );
  });
```

**Use `revalidateTag` for eventual consistency:**
```tsx
// For content that can tolerate stale-while-revalidate
revalidateTag('blog-posts', 'max');
```

#### Cache Life Profiles

**Choose appropriate cache durations:**
```tsx
// Static content (rarely changes)
applyCache(tags.store(storeId)).life('max');

// Product catalogs (changes occasionally)
applyCache(tags.storeProducts(storeId)).life('days');

// User sessions (changes frequently)
applyCache(tags.userSession(userId)).life('hours');

// Real-time data (changes very frequently)
applyCache(tags.analytics(storeId)).life('minutes');
```

### Anti-Patterns to Avoid

#### ❌ Runtime Data + 'use cache' Conflict
```tsx
// ❌ WRONG: Cannot use runtime data with 'use cache'
export default async function Page({ params }: PageProps) {
  'use cache'; // ← This conflicts with await params below
  const { slug } = await params; // ← Runtime data access
  // This will cause build errors
}
```

#### ❌ Contradictory Caching Strategy
```tsx
// ❌ WRONG: Cached component wrapped in Suspense
async function CachedComponent() {
  'use cache';
  return <div>Cached content</div>;
}

// If it's cached, it shouldn't need Suspense
<Suspense fallback={<Loading />}>
  <CachedComponent /> {/* Already cached, Suspense is redundant */}
</Suspense>
```

### Performance Guidelines

#### Suspense Placement
- **Place `<Suspense>` boundaries as close as possible** to dynamic components
- **Maximize static shell content** by keeping Suspense boundaries narrow
- **Use multiple Suspense boundaries** for parallel loading of independent sections

#### Cache Strategy Decision Tree

1. **Static content** (imports, computations) → Automatically prerendered
2. **External data that rarely changes** → Use `'use cache'` with long `cacheLife`
3. **External data that changes frequently** → Use `'use cache'` with short `cacheLife`
4. **Request-specific data** → Wrap in `<Suspense>`, extract values, pass to cached functions
5. **Real-time data** → Always wrap in `<Suspense>`, no caching

#### Migration from Legacy Patterns

**Replace deprecated segment configs:**
```tsx
// ❌ OLD: Route segment config (deprecated)
export const dynamic = 'force-static';
export const revalidate = 3600;

// ✅ NEW: Cache Components pattern
export default async function Page() {
  'use cache';
  cacheLife('hours');
  // Implementation
}
```

### Monitoring & Debugging

#### Verify Prerendering
- Check build output for static shell generation
- View page source to see prerendered content
- Use Next.js build analyzer to identify cache boundaries

#### Cache Performance
- Monitor cache hit rates through custom cache manager
- Use `applyCache().life()` to fine-tune cache durations
- Implement cache warming for critical paths

#### Cache Best Practices Summary

1. **Enable Cache Components** in `next.config.ts`
2. **Follow Async-to-Child Pattern** for runtime data
3. **Use type-safe cache tagging** with our cache manager
4. **Place `'use cache'` at function tops** for external data
5. **Wrap runtime data access in `<Suspense>`**
6. **Use `updateTag` in Server Actions** for immediate invalidation
7. **Choose appropriate `cacheLife` profiles** based on data volatility
8. **Maximize static shell content** with strategic Suspense placement
9. **Always define Props interfaces** for components
10. **Test cache behavior** in both development and production builds
