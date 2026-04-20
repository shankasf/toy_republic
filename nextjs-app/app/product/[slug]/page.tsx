import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return { title: "Not Found | Toy Republic" };
  }
  return {
    title: `${product.title} | Toy Republic`,
    description: product.description || `${product.title} at Toy Republic.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const gallery = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <Link
        href="/squishmallow"
        className="inline-flex items-center text-sm font-semibold text-brand hover:text-brand-dark mb-6"
      >
        &larr; Back to Squishmallows
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
            <Image
              src={`/images/${product.image}`}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-6"
              priority
            />
          </div>

          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((img, i) => (
                <div
                  key={`${img}-${i}`}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-200"
                >
                  <Image
                    src={`/images/${img}`}
                    alt={`${product.title} ${i + 1}`}
                    fill
                    sizes="20vw"
                    className="object-contain p-2"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-brand font-semibold">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
            {product.title}
          </h1>
          {product.description && product.description.trim().length > 1 && (
            <p className="mt-5 text-gray-700 leading-relaxed">
              {product.description}
            </p>
          )}
          <div className="mt-8 rounded-xl bg-brand-light/60 p-5 text-sm text-gray-700">
            <p className="font-semibold text-brand-dark mb-1">
              Available in-store
            </p>
            <p>
              This item can be found at any Toy Republic location. Visit our{" "}
              <Link href="/locations" className="underline hover:text-brand">
                stores page
              </Link>{" "}
              for hours and directions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
