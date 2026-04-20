"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "Locations" },
  { href: "/our-story", label: "Our Story" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="h-1 bg-gradient-to-r from-brand via-pink-400 to-amber-400" />
      <div className="bg-white/95 backdrop-blur border-b border-gray-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 h-20 md:h-24 flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Toy Republic home"
            className="flex items-center shrink-0 -my-1"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/353761_393bcf6094764a16a9cbf94a246925e6~mv2.png"
              alt="Toy Republic"
              width={260}
              height={104}
              priority
              className="h-14 md:h-20 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors ${
                    active
                      ? "bg-brand-light text-brand"
                      : "text-gray-700 hover:text-brand hover:bg-brand-light/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/locations"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand text-white text-sm font-semibold shadow-sm hover:bg-brand-dark hover:shadow-md transition-all"
            >
              Visit a Store
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 5l6 5-6 5" />
              </svg>
            </Link>
            <span aria-hidden className="h-5 w-px bg-gray-200" />
            <Link
              href="/admin/login"
              title="Admin sign in"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand transition-colors"
            >
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="9" width="12" height="8" rx="2" />
                <path d="M7 9V6a3 3 0 016 0v3" />
              </svg>
              Admin
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-brand-light/60 hover:text-brand transition-colors"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>

        {open ? (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                      active
                        ? "bg-brand-light text-brand"
                        : "text-gray-800 hover:bg-brand-light/60 hover:text-brand"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/locations"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex justify-center items-center gap-1.5 px-4 py-3 rounded-full bg-brand text-white font-semibold shadow-sm hover:bg-brand-dark"
              >
                Visit a Store
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 5l6 5-6 5" />
                </svg>
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex justify-center items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-brand"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="9" width="12" height="8" rx="2" />
                  <path d="M7 9V6a3 3 0 016 0v3" />
                </svg>
                Admin sign in
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
