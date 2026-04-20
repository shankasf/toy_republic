import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Squishmallows | Toy Republic",
  description: "Browse our full collection of Squishmallows.",
};

export default function SquishmallowPage() {
  const items = getProductsByCategory("squishmallow");

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand">
          Squishmallows
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Soft, squishy, irresistibly collectible. {items.length} characters
          available in-store.
        </p>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((p) => (
          <ProductCard
            key={p.slug}
            slug={p.slug}
            title={p.title}
            image={`/images/${p.image}`}
          />
        ))}
      </div>
    </div>
  );
}
