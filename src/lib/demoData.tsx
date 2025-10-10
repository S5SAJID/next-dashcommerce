type Product = {
    id: number;
    name: string;
    slug: string;
    description: string;
    category: string;
    price: number;
    images: string[];
    compare_at?: number | undefined;
    stock?: number | undefined;
    sku?: string | undefined;
}

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Essence Mascara Lash Princess",
    slug: "essence-mascara-lash-princess",
    description:
      "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    category: "beauty",
    price: 9.99,
    compare_at: 11.16,
    stock: 99,
    sku: "BEA-ESS-ESS-001",
    images: [
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
    ],
  },
  {
    id: 2,
    name: "Eyeshadow Palette with Mirror",
    slug: "eyeshadow-palette-with-mirror",
    description:
      "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    category: "beauty",
    price: 19.99,
    compare_at: 24.43,
    stock: 34,
    sku: "BEA-GLA-EYE-002",
    images: [
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
    ],
  },
  {
    id: 3,
    name: "Powder Canister",
    slug: "powder-canister",
    description:
      "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
    category: "beauty",
    price: 14.99,
    compare_at: 16.63,
    stock: 89,
    sku: "BEA-VEL-POW-003",
    images: [
      "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp",
    ],
  },
  {
    id: 4,
    name: "Red Lipstick",
    slug: "red-lipstick",
    description:
      "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
    category: "beauty",
    price: 12.99,
    compare_at: 14.79,
    stock: 91,
    sku: "BEA-CHI-LIP-004",
    images: [
      "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
    ],
  },
  {
    id: 5,
    name: "Red Nail Polish",
    slug: "red-nail-polish",
    description:
      "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
    category: "beauty",
    price: 8.99,
    compare_at: 10.15,
    stock: 79,
    sku: "BEA-NAI-NAI-005",
    images: [
      "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp",
    ],
  },
  {
    id: 6,
    name: "Calvin Klein CK One",
    slug: "calvin-klein-ck-one",
    description:
      "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    category: "fragrances",
    price: 49.99,
    compare_at: 50.95,
    stock: 29,
    sku: "FRA-CAL-CAL-006",
    images: [
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp",
    ],
  },
  {
    id: 7,
    name: "Chanel Coco Noir Eau De",
    slug: "chanel-coco-noir-eau-de",
    description:
      "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
    category: "fragrances",
    price: 129.99,
    compare_at: 155.7,
    stock: 58,
    sku: "FRA-CHA-CHA-007",
    images: [
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/3.webp",
    ],
  },
  {
    id: 8,
    name: "Dior J'adore",
    slug: "dior-j'adore",
    description:
      "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    category: "fragrances",
    price: 89.99,
    compare_at: 105.52,
    stock: 98,
    sku: "FRA-DIO-DIO-008",
    images: [
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/3.webp",
    ],
  },
  {
    id: 9,
    name: "Dolce Shine Eau de",
    slug: "dolce-shine-eau-de",
    description:
      "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
    category: "fragrances",
    price: 69.99,
    compare_at: 70.43,
    stock: 4,
    sku: "FRA-DOL-DOL-009",
    images: [
      "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/3.webp",
    ],
  },
  {
    id: 10,
    name: "Gucci Bloom Eau de",
    slug: "gucci-bloom-eau-de",
    description:
      "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
    category: "fragrances",
    price: 79.99,
    compare_at: 93.44,
    stock: 91,
    sku: "FRA-GUC-GUC-010",
    images: [
      "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/3.webp",
    ],
  },
  {
    id: 11,
    name: "Annibale Colombo Bed",
    slug: "annibale-colombo-bed",
    description:
      "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
    category: "furniture",
    price: 1899.99,
    compare_at: 2078.08,
    stock: 88,
    sku: "FUR-ANN-ANN-011",
    images: [
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/3.webp",
    ],
  },
  {
    id: 12,
    name: "Annibale Colombo Sofa",
    slug: "annibale-colombo-sofa",
    description:
      "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
    category: "furniture",
    price: 2499.99,
    compare_at: 2920.55,
    stock: 60,
    sku: "FUR-ANN-ANN-012",
    images: [
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/3.webp",
    ],
  },
  {
    id: 13,
    name: "Bedside Table African Cherry",
    slug: "bedside-table-african-cherry",
    description:
      "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
    category: "furniture",
    price: 299.99,
    compare_at: 370.77,
    stock: 64,
    sku: "FUR-FUR-BED-013",
    images: [
      "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/3.webp",
    ],
  },
  {
    id: 14,
    name: "Knoll Saarinen Executive Conference Chair",
    slug: "knoll-saarinen-executive-conference-chair",
    description:
      "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
    category: "furniture",
    price: 499.99,
    compare_at: 510.25,
    stock: 26,
    sku: "FUR-KNO-KNO-014",
    images: [
      "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/3.webp",
    ],
  },
  {
    id: 15,
    name: "Wooden Bathroom Sink With Mirror",
    slug: "wooden-bathroom-sink-with-mirror",
    description:
      "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
    category: "furniture",
    price: 799.99,
    compare_at: 877.18,
    stock: 7,
    sku: "FUR-BAT-WOO-015",
    images: [
      "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/3.webp",
    ],
  },
  {
    id: 16,
    name: "Apple",
    slug: "apple",
    description:
      "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    category: "groceries",
    price: 1.99,
    compare_at: 2.28,
    stock: 8,
    sku: "GRO-BRD-APP-016",
    images: ["https://cdn.dummyjson.com/product-images/groceries/apple/1.webp"],
  },
  {
    id: 17,
    name: "Beef Steak",
    slug: "beef-steak",
    description:
      "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
    category: "groceries",
    price: 12.99,
    compare_at: 14.37,
    stock: 86,
    sku: "GRO-BRD-BEE-017",
    images: [
      "https://cdn.dummyjson.com/product-images/groceries/beef-steak/1.webp",
    ],
  },
  {
    id: 18,
    name: "Cat Food",
    slug: "cat-food",
    description:
      "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
    category: "groceries",
    price: 8.99,
    compare_at: 9.94,
    stock: 46,
    sku: "GRO-BRD-FOO-018",
    images: [
      "https://cdn.dummyjson.com/product-images/groceries/cat-food/1.webp",
    ],
  },
  {
    id: 19,
    name: "Chicken Meat",
    slug: "chicken-meat",
    description:
      "Fresh and tender chicken meat, suitable for various culinary preparations.",
    category: "groceries",
    price: 9.99,
    compare_at: 11.58,
    stock: 97,
    sku: "GRO-BRD-CHI-019",
    images: [
      "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/2.webp",
    ],
  },
  {
    id: 20,
    name: "Cooking Oil",
    slug: "cooking-oil",
    description:
      "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
    category: "groceries",
    price: 4.99,
    compare_at: 5.5,
    stock: 10,
    sku: "GRO-BRD-COO-020",
    images: [
      "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/1.webp",
    ],
  },
  {
    id: 21,
    name: "Cucumber",
    slug: "cucumber",
    description:
      "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
    category: "groceries",
    price: 1.49,
    compare_at: 1.49,
    stock: 84,
    sku: "GRO-BRD-CUC-021",
    images: [
      "https://cdn.dummyjson.com/product-images/groceries/cucumber/1.webp",
    ],
  },
  {
    id: 22,
    name: "Dog Food",
    slug: "dog-food",
    description:
      "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
    category: "groceries",
    price: 10.99,
    compare_at: 12.25,
    stock: 71,
    sku: "GRO-BRD-FOO-022",
    images: [
      "https://cdn.dummyjson.com/product-images/groceries/dog-food/1.webp",
    ],
  },
  {
    id: 23,
    name: "Eggs",
    slug: "eggs",
    description:
      "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
    category: "groceries",
    price: 2.99,
    compare_at: 3.36,
    stock: 9,
    sku: "GRO-BRD-EGG-023",
    images: ["https://cdn.dummyjson.com/product-images/groceries/eggs/1.webp"],
  },
  {
    id: 24,
    name: "Fish Steak",
    slug: "fish-steak",
    description:
      "Quality fish steak, suitable for grilling, baking, or pan-searing.",
    category: "groceries",
    price: 14.99,
    compare_at: 15.65,
    stock: 74,
    sku: "GRO-BRD-FIS-024",
    images: [
      "https://cdn.dummyjson.com/product-images/groceries/fish-steak/1.webp",
    ],
  },
  {
    id: 25,
    name: "Green Bell Pepper",
    slug: "green-bell-pepper",
    description:
      "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
    category: "groceries",
    price: 1.29,
    compare_at: 1.29,
    stock: 33,
    sku: "GRO-BRD-GRE-025",
    images: [
      "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/1.webp",
    ],
  },
  {
    id: 26,
    name: "Green Chili Pepper",
    slug: "green-chili-pepper",
    description:
      "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
    category: "groceries",
    price: 0.99,
    compare_at: 1,
    stock: 3,
    sku: "GRO-BRD-GRE-026",
    images: [
      "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/1.webp",
    ],
  },
  {
    id: 27,
    name: "Honey Jar",
    slug: "honey-jar",
    description:
      "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
    category: "groceries",
    price: 6.99,
    compare_at: 8.17,
    stock: 34,
    sku: "GRO-BRD-HON-027",
    images: [
      "https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp",
    ],
  },
  {
    id: 28,
    name: "Ice Cream",
    slug: "ice-cream",
    description:
      "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
    category: "groceries",
    price: 5.49,
    compare_at: 6.01,
    stock: 27,
    sku: "GRO-BRD-CRE-028",
    images: [
      "https://cdn.dummyjson.com/product-images/groceries/ice-cream/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/ice-cream/2.webp",
      "https://cdn.dummyjson.com/product-images/groceries/ice-cream/3.webp",
      "https://cdn.dummyjson.com/product-images/groceries/ice-cream/4.webp",
    ],
  },
  {
    id: 29,
    name: "Juice",
    slug: "juice",
    description:
      "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
    category: "groceries",
    price: 3.99,
    compare_at: 4.54,
    stock: 50,
    sku: "GRO-BRD-JUI-029",
    images: ["https://cdn.dummyjson.com/product-images/groceries/juice/1.webp"],
  },
  {
    id: 30,
    name: "Kiwi",
    slug: "kiwi",
    description:
      "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
    category: "groceries",
    price: 2.49,
    compare_at: 2.94,
    stock: 99,
    sku: "GRO-BRD-KIW-030",
    images: ["https://cdn.dummyjson.com/product-images/groceries/kiwi/1.webp"],
  },
];
