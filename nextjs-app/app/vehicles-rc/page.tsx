import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicles & RC | Toy Republic",
  description: "Remote-control vehicles and more — coming soon.",
};

export default function VehiclesRCPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand">
          Vehicles & RC
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Engines revving. Batteries charging.
        </p>
      </header>
      <div className="rounded-2xl border-2 border-dashed border-brand/40 bg-brand-light/40 p-12 md:p-20 text-center">
        <div className="text-5xl md:text-6xl mb-4">*</div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Collection coming soon
        </h2>
        <p className="mt-3 text-gray-600 max-w-md mx-auto">
          We&apos;re stocking the shelves with the latest RC cars, trucks, and
          collectible vehicles. Check back soon — or stop into any of our
          stores today.
        </p>
      </div>
    </div>
  );
}
