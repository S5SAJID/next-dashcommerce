import {z} from "zod";

export const productSchema = z.object({
  name: z.string().nonempty(),
  price: z.number().nonnegative(),
  collections: z.array(z.string()).optional(),
  img: z.url().default("https://via.placeholder.com/150"),
  status: z.enum(["active", "inactive"]),
})

export type Product = z.infer<typeof productSchema>

export const products: Product[] = [
  {
    "name": "Classic Blue Baseball Cap",
    "img": "https://i.imgur.com/wXuQ7bm.jpeg",
    "collections": ["caps", "accessories"],
    "price": 86,
    "status": "active"
  },
  {
    "name": "Classic Olive Chino Shorts",
    "img": "https://i.imgur.com/UsFIvYs.jpeg",
    "collections": ["shorts", "pants"],
    "price": 84,
    "status": "active"
  },
  {
    "name": "Classic White Crew Neck T-Shirt",
    "img": "https://i.imgur.com/axsyGpD.jpeg",
    "collections": ["t-shirts", "tops"],
    "price": 39,
    "status": "inactive"
  },
  {
    "name": "Classic High-Waisted Athletic Shorts",
    "img": "https://i.imgur.com/eGOUveI.jpeg",
    "collections": ["shorts", "activewear"],
    "price": 43,
    "status": "active"
  },
  {
    "name": "Classic White Tee - Timeless Style and Comfort",
    "img": "https://i.imgur.com/Y54Bt8J.jpeg",
    "collections": ["t-shirts", "tops"],
    "price": 73,
    "status": "active"
  },
  {
    "name": "Classic Black T-Shirt",
    "img": "https://i.imgur.com/9DqEOV5.jpeg",
    "collections": ["t-shirts", "tops"],
    "price": 35,
    "status": "active"
  },
  {
    "name": "Sleek White & Orange Wireless Gaming Controller",
    "img": "https://i.imgur.com/ZANVnHE.jpeg",
    "collections": ["gaming", "accessories"],
    "price": 69,
    "status": "active"
  },
  {
    "name": "Sleek Wireless Headphone & Inked Earbud Set",
    "img": "https://i.imgur.com/yVeIeDa.jpeg",
    "collections": ["headphones", "accessories"],
    "price": 44,
    "status": "active"
  },
  {
    "name": "Sleek Comfort-Fit Over-Ear Headphones",
    "img": "https://i.imgur.com/SolkFEB.jpeg",
    "collections": ["headphones", "accessories"],
    "price": 28,
    "status": "inactive"
  },
  {
    "name": "Efficient 2-Slice Toaster",
    "img": "https://i.imgur.com/keVCVIa.jpeg",
    "collections": ["kitchen", "appliances"],
    "price": 48,
    "status": "active"
  }
]