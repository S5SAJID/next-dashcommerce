![NextDash Commerce Banner](./public/favico.svg)

# NextDash Commerce (S5ARC.)

[![Status](https://img.shields.io/badge/Status-Experimental-orange?style=flat-square)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green?style=flat-square&logo=drizzle)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=flat-square&logo=postgresql)](https://www.postgresql.org/)

A modern e-commerce platform with a clean UI, beautiful user experience, and a modern stack (Next.js, Zod, shadcn/ui). Focused on type safety, multi-tenancy, and developer experience, it lets business owners create their own online stores with custom subdomains to add products and manage orders. Includes a full e-commerce flow: products, orders, customers, checkout, and modern authentication.

## 🚀 Key Features

-   **Multi-Tenancy Architecture**: Create and manage multiple stores with custom subdomains and isolated data.
-   **Modern Tech Stack**: Built with Next.js 15 (App Router), React 19, and Tailwind CSS v4.
-   **End-to-End Type Safety**: Full TypeScript integration with Zod validation and Drizzle ORM.
-   **Complete E-commerce Flow**: Product management, cart functionality, checkout process, and order tracking.
-   **Admin Dashboard**: Comprehensive dashboard for store owners to manage inventory, orders, and settings.
-   **Authentication**: Secure authentication flow using Better Auth with email verification.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
-   **Auth**: [Better Auth](https://better-auth.com/)
-   **Validation**: [Zod](https://zod.dev/)

## 🏁 Getting Started

### Prerequisites

-   Node.js 18+ or Bun
-   PostgreSQL Database

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/S5SAJID/next-dashcommerce.git
    cd next-dashcommerce
    ```

2.  **Install dependencies**
    ```bash
    bun install
    ```

3.  **Set up environment variables**
    Copy `.env.example` to `.env.local` and configure your database and auth secrets.

4.  **Run database migrations**
    ```bash
    bun drizzle-kit migrate
    ```

5.  **Start the development server**
    ```bash
    bun dev
    ```

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router (Auth, Dashboard, Storefront)
├── components/          # Atomic Design Components
├── db/                  # Drizzle Schema & Actions
├── lib/                 # Utilities & Configuration
└── hooks/               # Custom React Hooks
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
