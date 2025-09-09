# Next Ecommerce Stack

This is **Next Ecommerce Stack**, a Next.js-based ecommerce admin dashboard and storefront, built with [shadcn/ui](https://ui.shadcn.com/) and Tailwind CSS. I put this together because I wanted a clean, modern, and actually customizable starting point for building ecommerce sites, without all the usual bloat or "enterprise" nonsense.

![Preview](./public/preview.png)

## What is this?

It's a simple, open-source ecommerce dashboard and storefront. You get:

- **Admin Dashboard**: Manage products, orders, customers, and settings.
- **Storefront**: A basic, hackable frontend for your shop.
- **No backend included**: Just UI and client-side logic. You can wire it up to your own API, database, or whatever you like.

Everything is ready to be tweaked, extended, or torn apart for your own needs.

## Why does this exist?

Honestly, most dashboards and starter kits out there are either too opinionated, too ugly, or just a pain to customize. I wanted something that:

- Looks decent out of the box (thanks, shadcn/ui)
- Is easy to mess with
- Doesn't force you into a specific stack or backend
- Lets you build your own thing, fast

If you want a plug-and-play, all-in-one solution, this probably isn't it. But if you want a solid starting point you can actually understand and change, you might like it.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [shadcn/ui](https://ui.shadcn.com/) (for all the UI components)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) (form validation)
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
- No backend included, so you can plug in your own API, database, or whatever.

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
