"use client";

import { useState } from "react";

const tags = ["Retail", "Full-time", "$16/hr", "18+"];

const description =
  "Toy Republic is a family-owned specialty toy store dedicated to providing a fun, welcoming shopping experience for customers of all ages. We are looking for a reliable, friendly team member who enjoys helping guests find the perfect toy. The Full-Time Staff Member will assist with daily store operations, including customer service, restocking, merchandising, and keeping the store clean and inviting. This role is ideal for someone who loves toys, enjoys interacting with customers, and takes pride in a well-organized retail environment.";

const availability = "Full-time, open availability required";

const responsibilities = [
  "Greet customers and operate the point-of-sale register",
  "Process retail transactions, gift receipts, and returns",
  "Assist shoppers in finding products and making gift recommendations",
  "Help with merchandising, product displays, and window setups (training available)",
  "Maintain cleanliness and organization throughout the store",
  "Restock shelves and monitor inventory levels",
  "Follow store policies and loss prevention guidelines",
  "Support the team with additional tasks as needed",
];

const requirements = [
  "Must be at least 18 years old",
  "Open availability required, including weekends and holidays",
  "Ability to assist with merchandising and displays",
  "Positive attitude and strong communication skills",
  "Comfort working with customers of all ages, including children and families",
  "Ability to stand for extended periods and lift up to 25 lbs",
  "Reliability and punctuality are essential",
  "Experience in retail or customer service is helpful but not required",
];

const niceToHave = [
  "Knowledge of popular toy brands (Squishmallow, Sanrio, etc.)",
  "Visual merchandising",
  "Gift wrapping experience",
  "Social media / content creation",
  "Bilingual (Spanish/English)",
  "POS or inventory system experience",
];

const perks = [
  "Fun, family-friendly work environment",
  "Employee discount on all toys and collectibles",
  "Training provided for all store operations",
  "Growth opportunities within the company",
];

export default function StaffMemberPosting() {
  const [expanded, setExpanded] = useState(true);

  return (
    <article className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900">Staff Member</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs font-semibold bg-brand-light text-brand px-3 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 px-4 py-2 bg-brand text-white text-sm font-semibold rounded-full hover:bg-brand-dark transition-colors"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>

      <p className="mt-5 text-gray-700 leading-relaxed">{description}</p>

      <p className="mt-4 text-sm italic text-gray-500 border-t border-gray-100 pt-4">
        {availability}
      </p>

      {expanded && (
        <>
          <div className="mt-6 grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                What You&apos;ll Do
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {responsibilities.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                What We&apos;re Looking For
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {requirements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              Nice to Have
            </h4>
            <div className="flex flex-wrap gap-2">
              {niceToHave.map((item) => (
                <span
                  key={item}
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              Perks
            </h4>
            <div className="flex flex-wrap gap-2">
              {perks.map((item) => (
                <span
                  key={item}
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      <a
        href="#apply"
        className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-full hover:bg-brand-dark transition-colors"
      >
        Apply Now <span aria-hidden>→</span>
      </a>
    </article>
  );
}
