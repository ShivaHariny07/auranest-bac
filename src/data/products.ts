export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  ingredients?: string[];
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  // Moisturizers
  {
    id: 1,
    name: "Vitamin C Daily Moisturizer",
    price: 899,
    originalPrice: 1299,
    image: "https://images.pexels.com/photos/6621466/pexels-photo-6621466.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Moisturizer",
    brand: "Dr. Sheth's",
    description: "Lightweight daily moisturizer with Vitamin C for brightening and hydration.",
    ingredients: ["Vitamin C", "Hyaluronic Acid", "Niacinamide"],
    rating: 4.5,
    reviews: 234
  },
  {
    id: 2,
    name: "Ceramide & Hyaluronic Acid Moisturizer",
    price: 749,
    originalPrice: 999,
    image: "https://images.pexels.com/photos/7690363/pexels-photo-7690363.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Moisturizer",
    brand: "Aqualogica",
    description: "Deep hydrating moisturizer with ceramides for dry skin.",
    ingredients: ["Ceramides", "Hyaluronic Acid", "Glycerin"],
    rating: 4.7,
    reviews: 189
  },
  {
    id: 3,
    name: "Overnight Repair Moisturizer",
    price: 1199,
    originalPrice: 1599,
    image: "https://images.pexels.com/photos/6621107/pexels-photo-6621107.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Moisturizer",
    brand: "Dr. Sheth's",
    description: "Night moisturizer with retinol and peptides for anti-aging.",
    ingredients: ["Retinol", "Peptides", "Shea Butter"],
    rating: 4.6,
    reviews: 156
  },

  // Sunscreens
  {
    id: 4,
    name: "SPF 50 Invisible Sunscreen",
    price: 649,
    originalPrice: 849,
    image: "https://images.pexels.com/photos/6621304/pexels-photo-6621304.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Sunscreen",
    brand: "Aqualogica",
    description: "Broad spectrum SPF 50 with invisible finish.",
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Vitamin E"],
    rating: 4.4,
    reviews: 312
  },
  {
    id: 5,
    name: "Mineral Sunscreen SPF 30",
    price: 799,
    originalPrice: 1099,
    image: "https://images.pexels.com/photos/6621028/pexels-photo-6621028.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Sunscreen",
    brand: "Dr. Sheth's",
    description: "Mineral sunscreen with SPF 30 for sensitive skin.",
    ingredients: ["Zinc Oxide", "Aloe Vera", "Green Tea"],
    rating: 4.3,
    reviews: 198
  },

  // Primers
  {
    id: 6,
    name: "Pore Minimizing Primer",
    price: 599,
    originalPrice: 799,
    image: "https://images.pexels.com/photos/6621095/pexels-photo-6621095.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Primer",
    brand: "Dr. Sheth's",
    description: "Silicone-free primer that minimizes pores and creates smooth base.",
    ingredients: ["Silica", "Dimethicone", "Hyaluronic Acid"],
    rating: 4.5,
    reviews: 267
  },
  {
    id: 7,
    name: "Illuminating Primer",
    price: 699,
    originalPrice: 899,
    image: "https://images.pexels.com/photos/6621063/pexels-photo-6621063.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Primer",
    brand: "Aqualogica",
    description: "Luminous primer with light-reflecting particles for glowing skin.",
    ingredients: ["Mica", "Pearl Powder", "Vitamin E"],
    rating: 4.6,
    reviews: 145
  },

  // Toners
  {
    id: 8,
    name: "Niacinamide Toner",
    price: 549,
    originalPrice: 749,
    image: "https://images.pexels.com/photos/6621282/pexels-photo-6621282.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Toner",
    brand: "Dr. Sheth's",
    description: "Balancing toner with niacinamide for oil control and pore refinement.",
    ingredients: ["Niacinamide", "Zinc PCA", "Salicylic Acid"],
    rating: 4.4,
    reviews: 223
  },
  {
    id: 9,
    name: "Hydrating Rose Toner",
    price: 499,
    originalPrice: 699,
    image: "https://images.pexels.com/photos/6621105/pexels-photo-6621105.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Toner",
    brand: "Aqualogica",
    description: "Gentle rose toner for hydration and soothing sensitive skin.",
    ingredients: ["Rose Water", "Glycerin", "Chamomile"],
    rating: 4.7,
    reviews: 189
  },

  // Foundations
  {
    id: 10,
    name: "Full Coverage Foundation",
    price: 1299,
    originalPrice: 1699,
    image: "https://images.pexels.com/photos/6621082/pexels-photo-6621082.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Foundation",
    brand: "Dr. Sheth's",
    description: "Long-wearing full coverage foundation with SPF 20.",
    ingredients: ["Titanium Dioxide", "Iron Oxides", "Hyaluronic Acid"],
    rating: 4.3,
    reviews: 167
  },
  {
    id: 11,
    name: "Natural Finish Foundation",
    price: 999,
    originalPrice: 1299,
    image: "https://images.pexels.com/photos/6621073/pexels-photo-6621073.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Foundation",
    brand: "Aqualogica",
    description: "Medium coverage foundation with natural finish.",
    ingredients: ["Titanium Dioxide", "Squalane", "Vitamin E"],
    rating: 4.5,
    reviews: 234
  },

  // Serums
  {
    id: 12,
    name: "Vitamin C Serum",
    price: 899,
    originalPrice: 1199,
    image: "https://images.pexels.com/photos/6621307/pexels-photo-6621307.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Serum",
    brand: "Dr. Sheth's",
    description: "Brightening vitamin C serum with ferulic acid.",
    ingredients: ["Vitamin C", "Ferulic Acid", "Hyaluronic Acid"],
    rating: 4.6,
    reviews: 312
  },
  {
    id: 13,
    name: "Niacinamide Serum",
    price: 749,
    originalPrice: 999,
    image: "https://images.pexels.com/photos/6621064/pexels-photo-6621064.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Serum",
    brand: "Aqualogica",
    description: "Pore-refining serum with 10% niacinamide.",
    ingredients: ["Niacinamide", "Zinc PCA", "Hyaluronic Acid"],
    rating: 4.4,
    reviews: 198
  },

  // Cleansers
  {
    id: 14,
    name: "Gentle Foaming Cleanser",
    price: 449,
    originalPrice: 599,
    image: "https://images.pexels.com/photos/6621035/pexels-photo-6621035.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Cleanser",
    brand: "Dr. Sheth's",
    description: "Gentle foaming cleanser for all skin types.",
    ingredients: ["Salicylic Acid", "Glycerin", "Chamomile"],
    rating: 4.5,
    reviews: 267
  },
  {
    id: 15,
    name: "Hydrating Cream Cleanser",
    price: 399,
    originalPrice: 549,
    image: "https://images.pexels.com/photos/6621106/pexels-photo-6621106.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Cleanser",
    brand: "Aqualogica",
    description: "Creamy cleanser that doesn't strip natural oils.",
    ingredients: ["Ceramides", "Hyaluronic Acid", "Glycerin"],
    rating: 4.7,
    reviews: 189
  },

  // Lipsticks
  {
    id: 16,
    name: "Matte Lipstick",
    price: 699,
    originalPrice: 899,
    image: "https://images.pexels.com/photos/6621084/pexels-photo-6621084.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Lipstick",
    brand: "Dr. Sheth's",
    description: "Long-wearing matte lipstick in bold red.",
    ingredients: ["Vitamin E", "Jojoba Oil", "Carnauba Wax"],
    rating: 4.6,
    reviews: 145
  },
  {
    id: 17,
    name: "Glossy Lipstick",
    price: 599,
    originalPrice: 799,
    image: "https://images.pexels.com/photos/6621085/pexels-photo-6621085.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Lipstick",
    brand: "Aqualogica",
    description: "Hydrating glossy lipstick with sheer color.",
    ingredients: ["Hyaluronic Acid", "Shea Butter", "Vitamin E"],
    rating: 4.4,
    reviews: 223
  },

  // Blush
  {
    id: 18,
    name: "Powder Blush",
    price: 549,
    originalPrice: 749,
    image: "https://images.pexels.com/photos/6621088/pexels-photo-6621088.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Blush",
    brand: "Dr. Sheth's",
    description: "Buildable powder blush in natural pink.",
    ingredients: ["Mica", "Talc", "Vitamin E"],
    rating: 4.5,
    reviews: 189
  },
  {
    id: 19,
    name: "Cream Blush",
    price: 649,
    originalPrice: 849,
    image: "https://images.pexels.com/photos/6621089/pexels-photo-6621089.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Blush",
    brand: "Aqualogica",
    description: "Cream blush for natural dewy finish.",
    ingredients: ["Shea Butter", "Jojoba Oil", "Vitamin E"],
    rating: 4.7,
    reviews: 167
  },

  // Mascara
  {
    id: 20,
    name: "Volumizing Mascara",
    price: 799,
    originalPrice: 999,
    image: "https://images.pexels.com/photos/6621090/pexels-photo-6621090.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Mascara",
    brand: "Dr. Sheth's",
    description: "Volumizing mascara for dramatic lashes.",
    ingredients: ["Carnauba Wax", "Beeswax", "Vitamin E"],
    rating: 4.6,
    reviews: 234
  }
];

export const categories = [
  "Moisturizer",
  "Sunscreen",
  "Primer",
  "Toner",
  "Foundation",
  "Serum",
  "Cleanser",
  "Lipstick",
  "Blush",
  "Mascara"
];