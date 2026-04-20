import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating";
import InstagramFeed from "@/components/InstagramFeed";
import {
  getCategories,
  getBrands,
  getReviews,
} from "@/lib/content";

export const dynamic = "force-dynamic";

const HERO_IMAGE = "/images/353761_1920aaee02cb4e4bbdd80c45a6982e44~mv2.jpg";
const AWARD_IMAGES = [
  "/images/01c3aff52f2a4dffa526d7a9843d46ea.png",
  "/images/4057345bcf57474b96976284050c00df.png",
  "/images/9e47c827082f40bdb54d0cd16c3b28f6.png",
  "/images/e1aa082f7c0747168d9cf43e77046142.png",
];
const VALUE_IMAGE = "/images/353761_71e98912b4094c1cbc19db1735a8300a~mv2.jpg";
const EDU_IMG_1 = "/images/353761_38785a0c98fd48ddb605916e6dea2a58~mv2.jpg";
const EDU_IMG_2 = "/images/353761_a20a876e55f043dcb25d3a7cbad1dd71~mv2.jpg";

export default async function HomePage() {
  const [categories, brands, reviews] = await Promise.all([
    getCategories(),
    getBrands(),
    getReviews(6),
  ]);

  const largeCategory = categories.find((c) => c.layout === "large") ?? categories[0];
  const smallCategories = categories.filter((c) => c.id !== largeCategory?.id).slice(0, 2);

  return (
    <div>
      {/* 2.1 HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-light via-white to-white">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="inline-block bg-white border border-brand/20 text-brand font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              5 stores · NJ &amp; NY
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Your Favorite Toy Destination in{" "}
              <span className="text-brand">New Jersey &amp; New York</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-600 max-w-xl">
              Bright, playful stores filled with the toys kids actually want —
              come find your next favorite thing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                href="/locations"
                className="inline-block px-7 py-3 rounded-full bg-brand text-white font-semibold shadow-md hover:bg-brand-dark transition-colors"
              >
                Visit a Store
              </Link>
              <a
                href="#reviews"
                className="inline-block px-7 py-3 rounded-full bg-white border-2 border-brand text-brand font-semibold hover:bg-brand-light transition-colors"
              >
                See Reviews
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={HERO_IMAGE}
              alt="Inside a Toy Republic store"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2.2 AWARDS */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
            We&apos;re proud to be your{" "}
            <span className="text-brand">#1 Toy Store in Paramus</span>
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Thank you for all the amazing Google reviews! Ranked by Google
            Reviews — 2025.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {AWARD_IMAGES.map((src) => (
              <div
                key={src}
                className="relative w-24 h-24 md:w-32 md:h-32"
              >
                <Image
                  src={src}
                  alt="Award badge"
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          <a
            href="#reviews"
            className="mt-6 inline-block px-7 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark"
          >
            See What Customers Say
          </a>
        </div>
      </section>

      {/* 2.3 VALUE */}
      <section className="bg-brand-light/50">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl order-2 md:order-1">
            <Image
              src={VALUE_IMAGE}
              alt="Trending toys at Toy Republic"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              Toy shopping <span className="text-brand">made fun</span>
            </h2>
            <p className="mt-4 text-lg text-gray-700 max-w-lg">
              Discover trending toys, viral favorites, and the things
              everyone&apos;s talking about — all in one place.
            </p>
            <Link
              href="/locations"
              className="mt-6 inline-block px-7 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark"
            >
              Visit a Store
            </Link>
          </div>
        </div>
      </section>

      {/* 2.4 CATEGORY (3 cards) */}
      {largeCategory && smallCategories.length === 2 ? (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Explore What&apos;s in Store
              </h2>
              <p className="mt-2 text-gray-600">
                Hand-picked categories our customers love.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              <Link
                href="/locations"
                className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all aspect-[4/5] md:aspect-auto md:row-span-2"
              >
                <Image
                  src={largeCategory.image}
                  alt={largeCategory.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-90">
                    Featured
                  </p>
                  <h3 className="mt-1 text-2xl md:text-3xl font-extrabold">
                    {largeCategory.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base opacity-90 max-w-md">
                    {largeCategory.blurb}
                  </p>
                </div>
              </Link>
              {smallCategories.map((c) => (
                <Link
                  key={c.id}
                  href="/locations"
                  className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all aspect-[5/3]"
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-extrabold">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-xs md:text-sm opacity-90">
                      {c.blurb}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 2.5 BRANDS */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Brands We Carry
            </h2>
            <p className="mt-2 text-gray-600 text-sm">
              Stocked with the names you know and love.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center">
            {brands.map((b) => (
              <div
                key={b.id}
                className="relative h-20 grayscale hover:grayscale-0 hover:scale-105 transition-all"
                title={b.name}
              >
                {b.logo ? (
                  <Image
                    src={b.logo}
                    alt={b.name}
                    fill
                    sizes="(max-width: 640px) 33vw, 16vw"
                    className="object-contain"
                  />
                ) : (
                  <span className="block text-center text-gray-700 font-semibold">
                    {b.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.6 EDUCATIONAL */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              More Than Just Toys
            </h2>
            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
              Play sparks something bigger — here&apos;s what we believe.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl overflow-hidden bg-brand-light/40 border border-brand/10 hover:shadow-lg transition-all">
              <div className="relative aspect-[16/9]">
                <Image
                  src={EDU_IMG_1}
                  alt="Supports creativity"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">
                  Supports Creativity
                </h3>
                <p className="mt-2 text-gray-700">
                  From building sets to art kits, we curate toys that invite
                  kids to imagine, make, and tell their own stories.
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden bg-brand-light/40 border border-brand/10 hover:shadow-lg transition-all">
              <div className="relative aspect-[16/9]">
                <Image
                  src={EDU_IMG_2}
                  alt="Encourages learning through play"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">
                  Encourages Learning Through Play
                </h3>
                <p className="mt-2 text-gray-700">
                  Open-ended play helps kids problem-solve, collaborate, and
                  build confidence. Our shelves are stocked with toys that grow
                  with them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.7 INSTAGRAM */}
      <InstagramFeed />

      {/* 2.8 REVIEWS */}
      <section id="reviews" className="bg-brand-light/40 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              What Our Customers Say
            </h2>
            <p className="mt-2 text-gray-600">
              Real reviews from families across NJ &amp; NY.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <article
                key={r.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <StarRating rating={r.rating} />
                <p className="mt-3 text-gray-700 leading-relaxed">
                  &ldquo;{r.body}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-gray-900">
                  {r.author}
                </p>
                <p className="text-xs text-gray-500">{r.source}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://www.google.com/search?q=Toy+Republic+Paramus+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark"
            >
              View all reviews on Google
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
