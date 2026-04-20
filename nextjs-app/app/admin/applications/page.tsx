import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

type Row = {
  id: number;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string;
  email: string;
  phone: string;
  position: string | null;
  location_label: string | null;
  schedule_preference: string | null;
  retail_experience: boolean | null;
  why_work_here: string | null;
  video_link: string | null;
  resume_filename: string | null;
  has_resume: boolean;
  has_video: boolean;
};

export default async function AdminApplications() {
  await requireAdmin();

  const rows = await query<Row>(
    `SELECT a.id,
            to_char(a.created_at, 'YYYY-MM-DD HH24:MI') AS created_at,
            a.first_name, a.last_name, a.full_name, a.email, a.phone,
            a.position, a.schedule_preference, a.retail_experience,
            a.why_work_here, a.video_link, a.resume_filename,
            (a.resume_data IS NOT NULL) AS has_resume,
            (a.video_data IS NOT NULL) AS has_video,
            CASE WHEN l.id IS NULL THEN NULL
                 ELSE l.name || ' — ' || l.city || ', ' || l.state END AS location_label
       FROM job_applications a
       LEFT JOIN locations l ON l.id = a.preferred_loc
       ORDER BY a.created_at DESC`
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Applications{" "}
        <span className="text-gray-400 font-normal text-xl">({rows.length})</span>
      </h1>

      {rows.length === 0 ? (
        <div className="rounded-2xl bg-white border border-gray-200 p-10 text-center text-gray-600">
          No applications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900">
                    {r.full_name || `${r.first_name ?? ""} ${r.last_name ?? ""}`}
                  </h3>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {r.position ?? "—"} · {r.location_label ?? "—"}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{r.created_at}</span>
              </div>

              <dl className="mt-4 grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <Row label="Email" value={r.email} />
                <Row label="Phone" value={r.phone} />
                <Row label="Schedule" value={r.schedule_preference} />
                <Row
                  label="Retail experience"
                  value={r.retail_experience ? "Yes" : "No"}
                />
                {r.video_link ? (
                  <Row
                    label="Video"
                    value={
                      <a
                        href={r.video_link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand underline break-all"
                      >
                        {r.video_link}
                      </a>
                    }
                  />
                ) : null}
              </dl>

              {r.why_work_here ? (
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase text-gray-500">
                    Why Toy Republic
                  </h4>
                  <p className="mt-1 text-sm text-gray-800 whitespace-pre-wrap">
                    {r.why_work_here}
                  </p>
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-3">
                {r.has_resume ? (
                  <a
                    href={`/admin/applications/${r.id}/resume`}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-dark"
                  >
                    Download resume
                    {r.resume_filename ? ` (${r.resume_filename})` : ""}
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">No resume</span>
                )}
                {r.has_video ? (
                  <a
                    href={`/admin/applications/${r.id}/video`}
                    className="inline-flex items-center px-4 py-2 rounded-full border border-gray-300 text-gray-800 text-sm font-semibold hover:bg-gray-100"
                  >
                    Download video
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-2">
      <dt className="text-gray-500 min-w-[130px]">{label}</dt>
      <dd className="text-gray-900">{value || "—"}</dd>
    </div>
  );
}
