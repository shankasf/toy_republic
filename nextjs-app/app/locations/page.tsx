import type { Metadata } from "next";
import LocationCard from "@/components/LocationCard";
import { getLocations } from "@/lib/locations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Locations | Toy Republic",
  description:
    "Visit any of our five Toy Republic stores across New Jersey and New York.",
};

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="bg-gradient-to-b from-brand-light/40 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <header className="mb-10 md:mb-12 text-center">
          <p className="inline-block bg-white border border-brand/20 text-brand font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Find a store
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            Our Locations
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Five stores, one Republic of fun. Drop by, say hi, and let&apos;s
            find your new favorite toy.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </div>
    </div>
  );
}
