import z from "zod";

export const orders_schema = z.object({
  id: z.number(),
  product_name: z.string().nonoptional(),
  price: z.number().nonoptional(),
  date: z.date(),
  status: z.enum(["active", "pending", "done"])
})

export type Order = z.infer<typeof orders_schema>;

// dummy data
export const orders: Order[] = [
  {
    "id": Math.round(Math.random() * 200000 + 100000),
    "product_name": "Classic Blue Baseball Cap",
    "price": 86,
    date: new Date(Date.now()),
    "status": "done"
  },
  {
    "id": Math.round(Math.random() * 200000 + 100000),
    "product_name": "Classic Olive Chino Shorts",
    "price": 84,
    date: new Date(Date.now()),
    "status": "active"
  },
  {
    "id": Math.round(Math.random() * 200000 + 100000),
    "product_name": "Classic White Crew Neck T-Shirt",
    "price": 39,
    date: new Date(Date.now()),
    "status": "pending"
  },
  {
    "id": Math.round(Math.random() * 200000 + 100000),
    "product_name": "Classic High-Waisted Athletic Shorts",
    "price": 43,
    date: new Date(Date.now()),
    "status": "active"
  },
  {
    "id": Math.round(Math.random() * 200000 + 100000),
    "product_name": "Classic White Tee - Timeless Style and Comfort",
    "price": 73,
    date: new Date(Date.now()),
    "status": "done"
  },
  {
    "id": Math.round(Math.random() * 200000 + 100000),
    "product_name": "Classic Black T-Shirt",
    "price": 35,
    date: new Date(Date.now()),
    "status": "active"
  },
  {
    "id": Math.round(Math.random() * 200000 + 100000),
    "product_name": "Sleek White & Orange Wireless Gaming Controller",
    "price": 69,
    date: new Date(Date.now()),
    "status": "active"
  },
  {
    "id": Math.round(Math.random() * 200000 + 100000),
    "product_name": "Sleek Wireless Headphone & Inked Earbud Set",
    "price": 44,
    date: new Date(Date.now()),
    "status": "active"
  },
  {
    "id": Math.round(Math.random() * 200000 + 100000),
    "product_name": "Sleek Comfort-Fit Over-Ear Headphones",
    "price": 28,
    date: new Date(Date.now()),
    "status": "pending"
  },
  {
    "id": Math.round(Math.random() * 200000 + 100000),
    "product_name": "Efficient 2-Slice Toaster",
    "price": 48,
    date: new Date(Date.now()),
    "status": "active"
  }
]