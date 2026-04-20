import Image from "next/image";

const posts = [
  "/images/353761_1920aaee02cb4e4bbdd80c45a6982e44~mv2.jpg",
  "/images/353761_2688ed885d744687ae5e14f6bab74ce6~mv2.jpg",
  "/images/353761_38785a0c98fd48ddb605916e6dea2a58~mv2.jpg",
  "/images/353761_71e98912b4094c1cbc19db1735a8300a~mv2.jpg",
  "/images/353761_446a6bdd38c04febb166e9237a439fe5~mv2.jpg",
  "/images/353761_a20a876e55f043dcb25d3a7cbad1dd71~mv2.jpg",
];

const INSTAGRAM_URL = "https://www.instagram.com/toyrepublicusa/";

export default function InstagramFeed() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              @toyrepublicusa
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Follow the fun on Instagram
            </h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
          >
            Visit our Instagram →
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {posts.map((src, i) => (
            <a
              key={src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 group"
            >
              <Image
                src={src}
                alt={`Instagram post ${i + 1}`}
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
