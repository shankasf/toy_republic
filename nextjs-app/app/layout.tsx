import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toy Republic — Your Favorite Toy Destination in NJ & NY",
  description:
    "Toy Republic — five toy stores across New Jersey and New York. Trending toys, viral favorites, plush, and collectibles. Visit a store today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
