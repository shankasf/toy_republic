import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story | Toy Republic",
  description:
    "How Toy Republic became your favorite toy destination in New Jersey and New York.",
};

const STORY_IMAGE = "/images/353761_1920aaee02cb4e4bbdd80c45a6982e44~mv2.jpg";

export default function OurStoryPage() {
  return (
    <div className="bg-gradient-to-b from-brand-light/40 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <header className="text-center mb-10 md:mb-14">
          <p className="inline-block bg-white border border-brand/20 text-brand font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            About Us
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            Our Story
          </h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Left: main story */}
          <article className="lg:col-span-2 space-y-6">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={STORY_IMAGE}
                alt="Inside a Toy Republic store"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl leading-relaxed">
                Toy Republic started with a simple idea: bring back the magic
                of walking into a real toy store. The kind of place where every
                shelf feels like a little adventure and every visit ends with a
                smile.
              </p>
              <p>
                What began as a single neighborhood store in New Jersey has
                grown into five locations across NJ and NY — each one packed
                with the toys kids actually want, the brands families trust,
                and the viral favorites everyone is talking about.
              </p>
              <p>
                We&apos;re a family-run business, and we treat every customer
                like part of ours. From Squishmallows and sensory toys to plush
                classics and limited collectibles, our team curates each shelf
                with the same care we&apos;d give our own kids.
              </p>
              <p>
                In 2025, we were honored to be ranked the{" "}
                <strong>#1 Toy Store in Paramus</strong> by Google Reviews —
                thanks entirely to the amazing families who shop with us. That
                trust is everything.
              </p>
              <p>
                Whether you&apos;re hunting for the latest drop or just stopping
                by to make a kid&apos;s day, we can&apos;t wait to see you in
                store.
              </p>
            </div>
          </article>

          {/* Right: supporting */}
          <aside className="space-y-6">
            <div className="rounded-3xl bg-white border border-gray-200 p-6 md:p-7 shadow-sm">
              <h2 className="text-xl font-extrabold text-brand">
                What We Bring
              </h2>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-brand">★</span>
                  <span>
                    A curated mix of trending toys, viral favorites, and
                    timeless classics.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand">★</span>
                  <span>
                    Friendly, knowledgeable staff who actually love what they
                    sell.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand">★</span>
                  <span>
                    Bright, playful stores designed for browsing — and for fun.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand">★</span>
                  <span>
                    Weekly restocks of the brands kids ask for by name.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-brand text-white p-6 md:p-7 shadow-md">
              <h2 className="text-xl font-extrabold">Where to Find Us</h2>
              <p className="mt-3 text-white/90">
                Five stores across New Jersey and New York. Drop in any time —
                no cart needed, just curiosity.
              </p>
              <Link
                href="/locations"
                className="mt-5 inline-flex px-5 py-2.5 rounded-full bg-white text-brand font-semibold hover:bg-brand-light"
              >
                See All Locations
              </Link>
            </div>

            <div className="rounded-3xl bg-white border border-gray-200 p-6 md:p-7 shadow-sm">
              <h2 className="text-xl font-extrabold text-brand">
                Want to Join Us?
              </h2>
              <p className="mt-3 text-gray-700">
                We&apos;re always looking for friendly, energetic people to
                join the team.
              </p>
              <Link
                href="/careers"
                className="mt-4 inline-block text-brand font-semibold hover:underline"
              >
                See open roles →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
