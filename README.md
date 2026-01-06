![NextDash Commerce Banner](./public/favico.svg)

# NextDash Commerce (S5ARC.)

[![Status](https://img.shields.io/badge/Status-Experimental-orange?style=flat-square)]()
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green?style=flat-square&logo=drizzle)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Biome](https://img.shields.io/badge/Biome-Formatter-blue?style=flat-square&logo=biome)](https://biomejs.dev/)

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

### Contributor License Agreement (CLA)

By contributing to this project, you agree that:

1. You grant the project maintainers a perpetual, worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your contributions.
2. The project maintainers retain the right to sublicense the project under different licensing terms (including commercial licenses).
3. Your contributions are your original work and do not violate any third-party rights.

This ensures that we can continue to offer commercial licensing options while maintaining the open-source version under AGPL-3.0.

## 📄 License

This project is licensed under the **AGPL-3.0 License** - see the [LICENSE](LICENSE) file for details.

### What does AGPL-3.0 mean?

The GNU Affero General Public License v3.0 (AGPL-3.0) is a strong copyleft license that requires you to:

- **Share source code**: If you modify and deploy this software (even as a web service), you must make the complete source code available to your users.
- **Same license**: Any derivative works must also be licensed under AGPL-3.0.
- **Attribution**: You must include a "Powered by S5ARC." link in your footer that links back to this repository.

### Commercial Licensing

**Need to use NextDash Commerce (S5ARC.) without AGPL restrictions?**

We offer commercial licenses for businesses that want to:

- Use the software without sharing source code modifications
- Integrate into proprietary systems
- Remove the "Powered by S5ARC." attribution requirement
- Receive priority support and custom features

For commercial licensing inquiries, please contact:

📧 **[s5sajid@gmail.com](mailto:s5sajid@gmail.com)**

### Attribution Requirement

If you use this software under the AGPL-3.0 license, you must include a visible "Powered by S5ARC." link in the footer of your application that links to this repository:

```html
<a href="https://github.com/S5SAJID/next-dashcommerce" target="_blank">
  Powered by S5ARC.
</a>
```

This helps users fulfill the AGPL requirement of making source code available and supports the continued development of this project.
