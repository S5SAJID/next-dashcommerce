# ExpEcommerce Stack (Experimental)

This is a **highly experimental** Next.js-based ecommerce admin dashboard and storefront, built with [shadcn/ui](https://ui.shadcn.com/) and Tailwind CSS. I'm actively working on this project—expect frequent changes and new features. The goal is a clean, modern, and truly customizable starting point for building ecommerce sites, without the usual bloat or "enterprise" overhead.

![Preview](./public/preview.png)

## What is this?

A simple, open-source ecommerce dashboard and storefront. You get:

- **Admin Dashboard**: Manage products, orders, customers, and settings.
- **Storefront**: A basic, hackable frontend for your shop.
- **Backend work in progress**: I'm currently working on backend integration, including databases, server actions, and more. Expect updates soon.

Everything is ready to be tweaked, extended, or torn apart for your own needs.

## Experimental Status & Roadmap

This project is **in active development**. Current focus is on backend features like:

- Database integration
- Caching strategies
- Dynamic data loading
- Advanced forms
- Server actions
- And much more...

Expect breaking changes and new features as things evolve.

## Why does this exist?

Most dashboards and starter kits are either too opinionated, too ugly, or hard to customize. I wanted something that:

- Looks decent out of the box (thanks, shadcn/ui)
- [Lucide Icons](https://lucide.dev/) (icons)

## Quick Preview
*This video preview only shows a small part of the dashboard. The full project has more pages and features.*
<video src="./public/preview.mp4" alt="Video preview showing the dashboard" controls></video>

## Getting Started

1. Clone this repo
2. Install dependencies:
   ```bash
   bun install # or npm install or yarn install
   ```
3. Run the dev server:
   ```bash
   bun run dev # or npm run dev or yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

- All UI is built with shadcn/ui, so you can swap out components, change styles, or add new pages easily.
- The sidebar, header, and table layouts are modular.
- Backend integration is coming soon, so you'll be able to plug in your own API, database, or whatever.

## Pages

- `/products` -> Product list
- `/products/create` -> Create new product
- `/products/details` -> Product details (should be replaced with [id])
- `/orders` -> Orders list
- `/customers` -> Customer list
- `/settings` -> Store/account/notification/display settings
- `/store` -> Basic storefront (should be replaced with domain with middleware eg: store.com will response with /store)
- `/store/products` -> Product listing
- `/store/products/[id]` -> Product details
- `/store/checkout` -> Checkout page

## Screenshots

If you take some nice screenshots, feel free to make a PR. (I’m lazy.)

## License

MIT. Do whatever you want. If you make something cool, let me know!

---

If this helps you, leave a star or just say hi. Made by a solo dev who just wanted a dashboard that doesn't suck. Enjoy!
