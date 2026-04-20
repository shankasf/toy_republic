import type { Metadata } from "next";
import ApplicationForm from "@/components/ApplicationForm";
import StaffMemberPosting from "@/components/StaffMemberPosting";
import { getLocations } from "@/lib/locations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers | Toy Republic",
  description:
    "Career opportunities at Toy Republic — Staff Member roles across our NJ and NY stores.",
};

export default async function CareersPage() {
  const locations = await getLocations();

  return (
    <div className="bg-gradient-to-b from-brand-light/40 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <header className="text-center mb-12">
          <p className="inline-block bg-white border border-brand/20 text-brand font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Careers
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            Join Our Team
          </h1>
          <div className="mt-5 max-w-2xl mx-auto space-y-3 text-gray-700 text-lg">
            <p>
              We&apos;re always looking for friendly, energetic people to join
              the Toy Republic team.
            </p>
            <p>
              If you enjoy working with customers and being part of a fun,
              fast-paced environment, we&apos;d love to hear from you.
            </p>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Open Positions
          </h2>
          <StaffMemberPosting />
        </section>

        <section id="apply" className="scroll-mt-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Application Form
            </h2>
            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
              Tell us a bit about you and we&apos;ll get in touch.
            </p>
          </div>
          <ApplicationForm locations={locations} />
        </section>
      </div>
    </div>
  );
}
