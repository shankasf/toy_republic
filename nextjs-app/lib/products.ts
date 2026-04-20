import productsData from "@/data/products.json";

export type Product = {
  slug: string;
  title: string;
  category: string;
  image: string;
  images: string[];
  description: string;
};

const products: Product[] = productsData as Product[];

export function getProducts(): Product[] {
  return products;
}

export function getProductsByCategory(cat: string): Product[] {
  return products.filter((p) => p.category === cat);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
