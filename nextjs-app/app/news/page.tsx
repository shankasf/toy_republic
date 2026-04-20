import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getNewsArticles } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News | Toy Republic",
  description: "The latest news and announcements from Toy Republic.",
};

const AWARD_BADGES = [
  "/images/01c3aff52f2a4dffa526d7a9843d46ea.png",
  "/images/4057345bcf57474b96976284050c00df.png",
  "/images/9e47c827082f40bdb54d0cd16c3b28f6.png",
  "/images/e1aa082f7c0747168d9cf43e77046142.png",
];

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <div className="bg-gradient-to-b from-brand-light/40 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <header className="text-center mb-10">
          <p className="inline-block bg-white border border-brand/20 text-brand font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            News
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            What&apos;s New at Toy Republic
          </h1>
        </header>

        <div className="space-y-10">
          {articles.map((a) => (
            <article
              key={a.id}
              className="rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden"
            >
              {a.hero_image ? (
                <div className="relative aspect-[16/8] bg-brand-light/50">
                  <Image
                    src={a.hero_image}
                    alt={a.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-contain p-6"
                  />
                </div>
              ) : null}
              <div className="p-6 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {new Date(a.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-gray-900">
                  {a.title}
                </h2>
                <p className="mt-3 text-lg text-gray-700 italic">
                  {a.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 items-center">
                  {AWARD_BADGES.map((src) => (
                    <div
                      key={src}
                      className="relative w-16 h-16 md:w-20 md:h-20"
                    >
                      <Image
                        src={src}
                        alt="Award badge"
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6 prose prose-lg max-w-none text-gray-700">
                  <p>{a.body}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/locations"
                    className="inline-block px-6 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark"
                  >
                    Visit a Store
                  </Link>
                  <a
                    href="https://www.google.com/search?q=Toy+Republic+Paramus+reviews"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-full bg-white border-2 border-brand text-brand font-semibold hover:bg-brand-light"
                  >
                    Read Reviews
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
