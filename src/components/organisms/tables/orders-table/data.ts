import z from "zod";

export const orders_schema = z.object({
  id: z.string(),
  product_name: z.string().nonoptional(),
  price: z.number().nonoptional(),
  date: z.date(),
  status: z.enum(["active", "pending", "done"]),
  product_img: z.url()
})

export type Order = z.infer<typeof orders_schema>;

// dummy data
export const orders: Order[] =[
  {
    "id": "524502",
    "product_name": "Classic Blue Baseball Cap",
    "price": 86,
    "date": new Date("2025-08-24T08:35:31.775Z"),
    "status": "done",
    "product_img": "https://i.imgur.com/wXuQ7bm.jpeg"
  },
  {
    "id": "123124",
    "product_name": "Classic Olive Chino Shorts",
    "price": 84,
    "date": new Date("2025-08-24T08:35:31.775Z"),
    "status": "active",
    "product_img": "https://i.imgur.com/UsFIvYs.jpeg"
  },
  {
    "id": "213432",
    "product_name": "Classic White Crew Neck T-Shirt",
    "price": 39,
    "date": new Date("2025-08-24T08:35:31.775Z"),
    "status": "pending",
    "product_img": "https://i.imgur.com/axsyGpD.jpeg"
  },
  {
    "id": "967852",
    "product_name": "Classic High-Waisted Athletic Shorts",
    "price": 43,
    "date": new Date("2025-08-24T08:35:31.775Z"),
    "status": "active",
    "product_img": "https://i.imgur.com/eGOUveI.jpeg"
  },
  {
    "id": "732853",
    "product_name": "Classic White Tee - Timeless Style and Comfort",
    "price": 73,
    "date": new Date("2025-08-24T08:35:31.775Z"),
    "status": "done",
    "product_img": "https://i.imgur.com/Y54Bt8J.jpeg"
  },
  {
    "id": "710240",
    "product_name": "Classic Black T-Shirt",
    "price": 35,
    "date": new Date("2025-08-24T08:35:31.775Z"),
    "status": "active",
    "product_img": "https://i.imgur.com/9DqEOV5.jpeg"
  },
  {
    "id": "492402",
    "product_name": "Sleek White & Orange Wireless Gaming Controller",
    "price": 69,
    "date": new Date("2025-08-24T08:35:31.775Z"),
    "status": "active",
    "product_img": "https://i.imgur.com/ZANVnHE.jpeg"
  },
  {
    "id": "502340",
    "product_name": "Sleek Wireless Headphone & Inked Earbud Set",
    "price": 44,
    "date": new Date("2025-08-24T08:35:31.775Z"),
    "status": "active",
    "product_img": "https://i.imgur.com/yVeIeDa.jpeg"
  },
  {
    "id": "105320",
    "product_name": "Sleek Comfort-Fit Over-Ear Headphones",
    "price": 28,
    "date": new Date("2025-08-24T08:35:31.775Z"),
    "status": "pending",
    "product_img": "https://i.imgur.com/SolkFEB.jpeg"
  },
  {
    "id": "172524",
    "product_name": "Efficient 2-Slice Toaster",
    "price": 48,
    "date": new Date("2025-08-24T08:35:31.775Z"),
    "status": "active",
    "product_img": "https://i.imgur.com/keVCVIa.jpeg"
  }
]