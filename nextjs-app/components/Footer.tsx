import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "Locations" },
  { href: "/our-story", label: "Our Story" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/toyrepublicusa/",
    gradient: "from-[#FEDA75] via-[#FA7E1E] via-40% to-[#D62976]",
    solid: "bg-gradient-to-br from-[#FEDA75] via-[#FA7E1E] to-[#D62976]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    solid: "bg-[#1877F2]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.2v2.3H7.4V13h2.7v8h3.4z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/",
    solid: "bg-black",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.3 8.2a6.5 6.5 0 01-3.8-1.2v7.5a5.3 5.3 0 11-5.3-5.3c.3 0 .6 0 .9.1v2.7a2.7 2.7 0 102 2.6V2.5h2.6a4 4 0 003.6 3.5v2.2z" />
      </svg>
    ),
  },
  {
    name: "Google reviews",
    href: "https://www.google.com/search?q=Toy+Republic+Paramus+reviews",
    solid: "bg-white",
    iconColor: "",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
          fill="#4285F4"
          d="M21.6 12.2c0-.7-.1-1.3-.2-2H12v3.8h5.4c-.2 1.2-.9 2.3-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0012 22z"
        />
        <path
          fill="#FBBC05"
          d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3a10 10 0 000 9.2l3.4-2.6z"
        />
        <path
          fill="#EA4335"
          d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 003 7.4l3.4 2.6C7.2 7.7 9.4 5.9 12 5.9z"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-200 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-pink-400 to-amber-400"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-10 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-2xl font-extrabold text-white tracking-tight">
            Toy Republic
          </p>
          <p className="mt-3 text-sm text-gray-400 max-w-sm leading-relaxed">
            Your favorite toy destination in New Jersey &amp; New York.
            Five stores. Big smiles. Hand-picked toys you&apos;ll actually want.
          </p>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Follow the fun
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className={`group relative inline-flex items-center justify-center w-11 h-11 rounded-full ${s.solid} text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            Explore
          </p>
          <nav className="flex flex-col gap-2.5 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-brand transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            Visit us
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            5 stores across New Jersey &amp; New York — bright, playful, and
            stocked with the toys kids love.
          </p>
          <Link
            href="/locations"
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand text-white text-sm font-semibold shadow-sm hover:bg-brand-dark hover:shadow-md transition-all"
          >
            Find a store
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M7 5l6 5-6 5" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Toy Republic. All rights reserved.
          </p>
          <p className="text-gray-600">Made with ♥ for kids &amp; families</p>
        </div>
      </div>
    </footer>
  );
}
