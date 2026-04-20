import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  slug: string;
  title: string;
  image: string;
};

export default function ProductCard({ slug, title, image }: ProductCardProps) {
  return (
    <Link
      href={`/product/${slug}`}
      className="group block rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-brand hover:shadow-lg transition-all"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-brand line-clamp-2">
          {title}
        </h3>
      </div>
    </Link>
  );
}
