import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Portfolio | Toy Republic",
  description: "A gallery of products from our stores.",
};

export default function PortfolioPage() {
  const items = getProducts().slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand">
          Portfolio
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          A snapshot of the toys, characters, and collectibles lining our
          shelves.
        </p>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.slug}`}
            className="group relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-200 hover:border-brand transition-colors"
          >
            <Image
              src={`/images/${p.image}`}
              alt={p.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <p className="text-white text-sm font-semibold line-clamp-1">
                {p.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
