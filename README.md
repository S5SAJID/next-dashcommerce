# NextDash Commerce - Highly Experimental E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green?style=flat-square&logo=drizzle)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Experimental-orange?style=flat-square)]()
[![Work in Progress](https://img.shields.io/badge/WIP-Active%20Development-yellow?style=flat-square)]()

A modern e-commerce platform built with Next.js 15, featuring an admin dashboard and storefront. This project explores cutting-edge web development patterns with a focus on type safety, multi-tenancy, and developer experience. It's actively evolving - think of it as a solid foundation that's still growing. It's a working foundation that's getting better—and more stable—every day.

![Preview](./public/preview.png)

## 🚀 What's This About?

Honestly? I needed a fresh, clean slate to push the limits of what a modern stack can do. This project is a working e-commerce site (it does the basics like products, carts, and orders). **This is a real e-commerce platform that actually works**, maybe sometimes break but who knows 🤣 - but it's also my playground for exploring modern web development (i had similar project in the graveyard also, so its not first attempt😁). I'm building this to learn and experiment with patterns like multi-tenancy (It's a tricky pattern, and I'm determined to nail the implementation), type-safe full-stack development, and modern authentication flows (most of which i already am proficient on).

Yeah, I've got a similar project collecting dust in the digital graveyard, so consider this the refined, second-time's-the-charm attempt.

Here's what's cooking:

- 🏗️ **Multi-tenant architecture** - One codebase, multiple stores (the foundation is solid)
- 🔐 **Modern authentication** - Better Auth with email verification and OAuth
- 🎯 **End-to-end type safety** - TypeScript + Zod from database to UI
- ⚡ **Latest tech stack** - Next.js 15, React 19, Drizzle ORM
- 🎨 **Clean UI** - shadcn/ui components with Tailwind CSS
- 📱 **Responsive design** - Works on desktop and mobile
- 🛍️ **Full e-commerce flow** - Products, orders, customers, checkout

**Fair warning**: I'm actively developing this, so things change. But the core functionality is there and working. Real talk: You can clone this, set it up, and run a store. Some parts are ready for prime time; others still feel like a construction site.

## 🎥 Quick Preview

_This video shows only some of the admin dashboard in action:_

<video src="./public/preview.mp4" alt="Dashboard preview" controls width="100%"></video>

## 🛠️ What's Actually Built

> **Real talk**: This stuff actually works. Some parts are more polished than others, but you can genuinely run an e-commerce store with this.

### 🔐 Authentication & Security

- ✅ **Better Auth setup** - Email/password + GitHub OAuth that actually works
- ✅ **Email verification** - Sends real emails, verifies accounts
- ✅ **Password reset** - Full flow with secure tokens
- 🔄 **Multi-tenant security** - The core logic to prevent cross-tenant data access is in place, but I'm still hammering out the last few security edge cases. It's a huge focus, but don't treat it as battle-tested just yet.
- 🎯 **Input validation** - Zod schemas everywhere, type-safe forms

### 🏪 Store Management

- ✅ **Multi-store support** - Create stores, manage settings, works as intended
- ✅ **Store settings** - General settings, layout customization
- 🔄 **Data isolation** - Each store sees only its data (the important part works)
- 🎯 **Custom domains** - Architecture ready, just need to wire it up

### 📦 Product Management

- ✅ **Full CRUD** - Create, edit, delete products with a decent UI
- ✅ **Image uploads** - Local storage working, cloud storage on the roadmap
- ✅ **Product attributes** - Flexible JSONB fields for custom properties
- ✅ **SEO-friendly URLs** - Automatic slug generation
- 🔄 **Product variants** - Database ready, UI in progress
- 🎯 **Categories** - Next on the list

### 🛒 Orders & Customers

- ✅ **Checkout flow** - From cart to order confirmation
- ✅ **Customer management** - Both guest and registered customers
- ✅ **Order tracking** - Status updates, order history
- 🔄 **Inventory management** - Basic stock tracking, needs more features

### 🎨 Admin Dashboard

- ✅ **Clean, responsive UI** - shadcn/ui components that look good
- ✅ **Data tables** - Sorting, filtering, pagination with TanStack Table
- ✅ **Form handling** - React Hook Form + Zod validation
- ✅ **Real-time feedback** - Toast notifications, loading states
- ✅ **Dark/light themes** - Because why not?

### 🛍️ Storefront

- ✅ **Product catalog** - Browse products, search functionality
- ✅ **Shopping cart** - Add items, update quantities, persistent state
- ✅ **Product pages** - Image galleries, product details
- ✅ **Responsive design** - Works on mobile, tablet, desktop
- 🔄 **SEO optimization** - Good foundation, always room for improvement

**Legend**: ✅ Solid & Working | 🔄 Good but Evolving | 🎯 Next Up

## 🛠️ Tech Stack

| Category             | Technology                                      | Purpose                                     |
| -------------------- | ----------------------------------------------- | ------------------------------------------- |
| **Framework**        | [Next.js 15](https://nextjs.org/)               | Full-stack React framework with App Router  |
| **Language**         | [TypeScript](https://www.typescriptlang.org/)   | Type-safe development                       |
| **Database**         | [PostgreSQL](https://www.postgresql.org/)       | Relational database with JSONB support      |
| **ORM**              | [Drizzle ORM](https://orm.drizzle.team/)        | Type-safe SQL query builder                 |
| **Authentication**   | [Better Auth](https://www.better-auth.com/)     | Modern authentication solution              |
| **UI Framework**     | [React 19](https://reactjs.org/)                | Component-based UI library                  |
| **Styling**          | [Tailwind CSS](https://tailwindcss.com/)        | Utility-first CSS framework                 |
| **Components**       | [shadcn/ui](https://ui.shadcn.com/)             | High-quality, accessible components         |
| **State Management** | [TanStack Query](https://tanstack.com/query/)   | Server state management                     |
| **Forms**            | [React Hook Form](https://react-hook-form.com/) | Performant form handling                    |
| **Validation**       | [Zod](https://zod.dev/)                         | Schema validation and type inference        |
| **Icons**            | [Lucide React](https://lucide.dev/)             | Beautiful icon library                      |
| **Email**            | [Nodemailer](https://nodemailer.com/)           | Email sending functionality                 |
| **Package Manager**  | [Bun](https://bun.sh/)                          | Fast JavaScript runtime and package manager |

## 🏗️ Architecture

### Multi-Tenant Design

Using a **shared database, shared schema** approach that actually works:

- **Store Isolation**: Every tenant-specific table has a `store_id` column with proper filtering
- **Security**: Database queries are scoped to the current store (no data leakage)
- **Performance**: Composite indexes starting with `store_id` for fast queries
- **Scalability**: One codebase serves multiple stores efficiently

This isn't just theoretical - it's implemented and working. Could it be more sophisticated? Sure. Does it work for real stores? Absolutely.

### Component Architecture

Following **Atomic Design** principles:

```
src/components/
├── atoms/          # Basic building blocks (Button, Input)
├── molecules/      # Simple combinations (SearchBar, ProductCard)
├── organisms/      # Complex UI sections (ProductTable, Header)
└── ui/            # shadcn/ui base components
```

### Data Flow

```
User Interaction → Client Component → Server Action → Drizzle ORM → PostgreSQL
```

---

## 🔒 A Note on Security

> **Let's be realistic**: This project follows a lot of smart security practices, but it's still in the early stages. The foundations are good, but I'm not claiming it's ready to handle billions in transactions.

- **Isolation is Key:** The multi-tenant security relies on proper **`store_id` filtering on every single query**. This is the non-negotiable part.
- **Validation:** Every form input is validated with Zod schemas and Drizzle's parameterized queries prevent SQL injection.
- **Next Steps:** I plan to add **PostgreSQL Row-Level Security (RLS)** for an extra layer of database-enforced protection. That's a serious feature that will significantly harden the isolation.

**Bottom line: The security patterns are solid, but treat it as a project in active, heavy development.**

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** or **Bun**
- **PostgreSQL 14+**
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/S5SAJID/next-dashcommerce
cd next-dashcommerce
```

### 2. Install Dependencies

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Database Setup

```bash
# Create a PostgreSQL database
createdb learn_drizzle

# Or using psql
psql -c "CREATE DATABASE learn_drizzle;"
```

### 4. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/learn_drizzle"

# Better Auth
BETTER_AUTH_SECRET="your-super-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# GitHub OAuth (optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email Configuration (for notifications)
SMTP_SERVER_HOST="smtp.gmail.com"
SMTP_SERVER_USERNAME="your-email@gmail.com"
SMTP_SERVER_PASSWORD="your-app-password"
```

### 5. Database Migration

```bash
# Generate and run migrations
npx drizzle-kit generate
npx drizzle-kit migrate

# Or push schema directly (development only)
npx drizzle-kit push
```

### 6. Start Development Server

```bash
# Using Bun
bun run dev

# Or using npm
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application!

## 📁 Project Structure

```
customized-eco/
├── public/               # Static assets
│   ├── preview.png       # Project preview image
│   ├── preview.mp4       # Demo video
│   ├── storefront        # Demo Storefront images
│   └── uploads/          # User uploaded files
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Authentication pages
│   │   ├── (dashboard)/  # Admin dashboard
│   │   └── (storefront)/ # Public storefront
│   ├── components/       # React components (Atomic Design)
│   │   ├── atoms/        # Basic components
│   │   ├── molecules/    # Composite components
│   │   ├── organisms/    # Complex sections
│   │   ├── storefront/   # Storefront specific
│   │   └── ui/           # shadcn/ui components
│   ├── db/               # Database layer
│   │   ├── actions/      # Server Actions
│   │   ├── schema/       # Drizzle schema definitions
│   │   └── drizzle/      # Generated migrations
│   ├── lib/              # Utilities and configurations
│   │   ├── auth/         # Authentication setup
│   │   └── email/        # Email templates and sending
│   ├── hooks/            # Custom React hooks
│   └── providers/        # Context providers
├── drizzle.config.ts     # Drizzle ORM configuration
├── next.config.ts        # Next.js configuration
└── components.json       # shadcn/ui configuration
```

## 🛣️ Available Routes

### Authentication

- `/signin` - User sign in
- `/signup` - User registration
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset form
- `/new-store` - Create new store

### Admin Dashboard

- `/products` - Product management
- `/products/create` - Create new product
- `/products/[slug]` - Edit product
- `/orders` - Order management
- `/orders/[slug]` - Order details
- `/customers` - Customer management
- `/settings/general` - General store settings
- `/settings/layout` - Layout customization

### Storefront

- `/store/[store_slug]` - Store homepage
- `/store/[store_slug]/products` - Product catalog
- `/store/[store_slug]/products/[slug]` - Product details
- `/store/[store_slug]/checkout` - Checkout process
- `/store/[store_slug]/checkout/success` - Order confirmation

## 🔒 Security

> **Honest assessment**: The security fundamentals are solid, but I'm not claiming this is bank-grade yet.

### Multi-Tenant Security

- ✅ **Store-level isolation** - Proper `store_id` filtering on all queries
- ✅ **Secure query patterns** - No cross-tenant data access
- 🎯 **Row-Level Security** - PostgreSQL RLS is on the roadmap for extra protection

### Authentication Security

- ✅ **Email verification** - Required for account activation
- ✅ **Secure password reset** - Time-limited tokens, proper flow
- ✅ **Session management** - Better Auth handles this well
- 🔄 **Rate limiting** - Basic protection, could be more sophisticated

### Data Protection

- ✅ **Input validation** - Zod schemas validate everything
- ✅ **SQL injection prevention** - Drizzle ORM parameterized queries
- ✅ **XSS protection** - React's built-in escaping
- ✅ **CSRF protection** - Next.js handles this

**Real talk**: This follows security best practices, but like any project, it could always be more hardened. Use your judgment.

## 🎨 Customization

### Styling

- **Tailwind CSS** for utility-first styling
- **CSS variables** for easy theme customization
- **Dark/light mode** support out of the box
- **Responsive design** with mobile-first approach

### Components

- **shadcn/ui base** - High-quality, accessible components
- **Atomic Design** - Modular, reusable component architecture
- **TypeScript props** - Fully typed component interfaces

### Database Schema

- **Flexible product attributes** using JSONB fields
- **Extensible user profiles** with additional fields
- **Custom store settings** stored as JSON

## 🤝 Contributing

I welcome contributions! Please see our [Contributing Guidelines](CODE_GUIDELINES.md) (actually i dont have that, you know lazy to write 😂) for detailed information about:

- Code style and conventions
- Development workflow
- Pull request process
- Security considerations

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Make your changes following our [Code Guidelines](CODE_GUIDELINES.md)
4. Run tests: `bun test` (when available)
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/) (i sometimes not follow this but you have to 😁)
6. Push and create a Pull Request

## 📝 Scripts

```bash
# Development
bun run dev              # Start development server with Turbopack
bun run build            # Build for production
bun run start            # Start production server
bun run lint             # Run ESLint

# Database
bun drizzle-kit generate      # Generate Drizzle migrations
bun drizzle-kit migrate       # Run database migrations
bun drizzle-kit studio        # Open Drizzle Studio (database GUI)
bun drizzle-kit push          # Push schema changes directly (dev only)
```

## 🎯 What's Next & Known Quirks

### Things I'm Working On

- 🔄 **Cloud storage** - Moving from local file storage to something more robust
- 🔄 **Email templates** - Making them look less like they're from 2005
- 🔄 **Product variants** - Size/color options (database is ready, UI needs work)
- 🔄 **Better error handling** - Some edge cases still throw ugly errors
- 🔄 **Mobile polish** - Most things work on mobile, but could be smoother
- 🔄 **Security** - Because let me be honest, it's experimental
- 🔄 **Row-Level Security** - PostgreSQL RLS at DB level
- 🔄 **Advanced search** - Full-text search with PostgreSQL

### What I'm Learning

- How multi-tenant architecture really works in practice
- Modern authentication patterns with Better Auth
- Type-safe full-stack development (it's actually pretty nice)
- Advanced PostgreSQL features beyond basic CRUD
- Server Components and the new React patterns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Drizzle Team](https://orm.drizzle.team/) for the excellent ORM
- [Better Auth](https://www.better-auth.com/) for modern authentication
- [Vercel](https://vercel.com/) for Next.js and deployment platform

## 💬 Support

- 📧 **Email**: [s5sajidyt@gmail.com](mailto:s5sajidyt@gmail.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/S5SAJID/next-dashcommerce/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/S5SAJID/next-dashcommerce/discussions)

---

**🤝 The Real Deal**

This is a real project that I'm actively building and learning from. It's not a toy project, but it's also not trying to be something hmm, i dont know. I'm sharing it because I think the patterns and approaches might be useful to other developers.

Is it production-ready? Depends on your definition of production. Could you run a small store with this? Probably. Should you bet your business on it without understanding the code? Probably not.

**Built by a developer who got tired of overcomplicated e-commerce solutions and decided to build something cleaner.** it may seems not simpler but you got me 😆

If you're working on similar stuff or have ideas for improvements, I'd love to hear about it! ⭐ Star the repo if you find it useful or interesting.
