"use client";

import { useState, type FormEvent } from "react";
import type { Location } from "@/lib/locations";

type Props = {
  locations: Location[];
};

type Status = "idle" | "submitting" | "success" | "error";

const MIN_AGE = 18;

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function yearsAgoIso(years: number): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function ageOnDate(dob: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  const [y, m, d] = dob.split("-").map(Number);
  const today = new Date();
  let age = today.getFullYear() - y;
  const beforeBirthday =
    today.getMonth() + 1 < m ||
    (today.getMonth() + 1 === m && today.getDate() < d);
  if (beforeBirthday) age -= 1;
  return age;
}

const hearOptions = [
  "Google search",
  "Instagram",
  "Facebook",
  "TikTok",
  "Friend or family",
  "In-store sign",
  "Other",
];

export default function ApplicationForm({ locations }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [videoMode, setVideoMode] = useState<"link" | "upload">("link");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const dob = String(data.get("date_of_birth") ?? "");
    const age = ageOnDate(dob);
    if (age === null) {
      setStatus("error");
      setError("Please enter a valid date of birth.");
      return;
    }
    if (age < MIN_AGE) {
      setStatus("error");
      setError(
        `You must be at least ${MIN_AGE} years old to work at our NJ and NY locations.`
      );
      return;
    }

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        body: data,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-brand-light border border-brand/20 p-8 text-center">
        <h3 className="text-2xl font-extrabold text-brand">
          Thanks — we got it!
        </h3>
        <p className="mt-2 text-gray-700">
          Your application is in. We&apos;ll be in touch if there&apos;s a
          match. Good luck!
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 inline-block px-5 py-2.5 bg-white border-2 border-brand text-brand font-semibold rounded-full"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6 md:p-8 space-y-6"
    >
      <p className="text-center text-gray-700">
        Fill out the form below and we&apos;ll get back to you soon!
      </p>

      <div>
        <Label htmlFor="position" required>
          Position
        </Label>
        <select
          id="position"
          name="position"
          required
          defaultValue="Staff Member (full-time)"
          className={selectClass}
        >
          <option>Staff Member (full-time)</option>
          <option>Staff Member (part-time)</option>
          <option>Seasonal Sales Associate</option>
          <option>Key Holder</option>
          <option>Store Manager</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="First Name" name="first_name" required />
        <Field label="Last Name" name="last_name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" required />
        <div>
          <Label htmlFor="date_of_birth" required>
            Date of Birth
          </Label>
          <input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            required
            max={yearsAgoIso(MIN_AGE)}
            min={yearsAgoIso(100)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
          />
          <p className="mt-1 text-xs text-gray-500">
            You must be at least {MIN_AGE} to apply (NJ &amp; NY requirement).
          </p>
        </div>
        <Field
          label="Available Start Date"
          name="available_start_date"
          type="date"
        />
        <div>
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            name="gender"
            defaultValue="Prefer not to say"
            className={selectClass}
          >
            <option>Prefer not to say</option>
            <option>Female</option>
            <option>Male</option>
            <option>Non-binary</option>
            <option>Self-describe</option>
          </select>
        </div>
        <div>
          <Label htmlFor="pronouns">Pronouns</Label>
          <select
            id="pronouns"
            name="pronouns"
            defaultValue="Prefer not to say"
            className={selectClass}
          >
            <option>Prefer not to say</option>
            <option>she/her</option>
            <option>he/him</option>
            <option>they/them</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          name="retail_experience"
          value="true"
          className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
        />
        I have previous retail or customer service experience
      </label>

      <div>
        <Label>Schedule Preference</Label>
        <div className="flex flex-wrap gap-5 mt-1">
          {["Weekdays", "Weekends", "Evenings", "Flexible"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="schedule_preference"
                value={opt}
                className="h-4 w-4 border-gray-300 text-brand focus:ring-brand"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="hear_about_us">How did you hear about us?</Label>
          <select
            id="hear_about_us"
            name="hear_about_us"
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select…
            </option>
            {hearOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="preferred_loc" required>
            Preferred Location
          </Label>
          <select
            id="preferred_loc"
            name="preferred_loc"
            required
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Choose a store…
            </option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} — {l.city}, {l.state}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="resume" required>
          Resume
        </Label>
        <div className="rounded-xl border-2 border-dashed border-gray-300 p-4">
          <input
            id="resume"
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx,.txt"
            required
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand hover:file:bg-brand hover:file:text-white"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">PDF, DOCX, or TXT — max 5MB</p>
      </div>

      <div>
        <Label htmlFor="why_work_here">Why do you want to work at Toy Republic?</Label>
        <textarea
          id="why_work_here"
          name="why_work_here"
          rows={4}
          placeholder="Tell us what excites you about working at Toy Republic…"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand resize-y"
        />
      </div>

      <div>
        <Label required>Video Introduction</Label>
        <p className="text-sm text-gray-600 mb-3">
          Record a short video answering the questions below, then share it via a
          link or upload it directly.
        </p>
        <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1.5 mb-4">
          <li>Tell us about yourself.</li>
          <li>Do you have any retail or customer service experience?</li>
          <li>
            Are you comfortable helping customers find products and making gift
            recommendations?
          </li>
          <li>Do you have any skills with merchandising or social media?</li>
          <li>Do you have open availability? If not, what is your availability?</li>
          <li>Are you comfortable enforcing store policies politely but firmly?</li>
          <li>
            This job involves standing, lifting, and moving throughout the shift —
            are you comfortable with that?
          </li>
          <li>Do you have reliable transportation?</li>
        </ol>

        <div className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1 mb-3">
          <button
            type="button"
            onClick={() => setVideoMode("link")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
              videoMode === "link"
                ? "bg-white text-brand shadow-sm"
                : "text-gray-600"
            }`}
          >
            Paste a link
          </button>
          <button
            type="button"
            onClick={() => setVideoMode("upload")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
              videoMode === "upload"
                ? "bg-white text-brand shadow-sm"
                : "text-gray-600"
            }`}
          >
            Upload a file
          </button>
        </div>

        {videoMode === "link" ? (
          <>
            <input
              type="url"
              name="video_link"
              placeholder="https://youtube.com/watch?v=… or Google Drive / Loom link"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
            />
            <p className="mt-1 text-xs text-gray-500">
              YouTube, Google Drive, Loom, or any shareable video link
            </p>
          </>
        ) : (
          <>
            <input
              type="file"
              name="video_file"
              accept="video/*"
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand hover:file:bg-brand hover:file:text-white"
            />
            <p className="mt-1 text-xs text-gray-500">Video file — max 25MB</p>
          </>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Emergency Contact Name" name="emergency_contact_name" />
        <Field
          label="Emergency Contact Phone"
          name="emergency_contact_phone"
          type="tel"
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center w-full px-7 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Submit Application"}
      </button>
    </form>
  );
}

const selectClass =
  "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand";

function Label({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold text-gray-700 mb-1"
    >
      {children} {required ? <span className="text-brand">*</span> : null}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
      />
    </div>
  );
}
