import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { queryOne } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin();

  const appsRow = await queryOne<{ count: string }>(
    `SELECT count(*)::text AS count FROM job_applications`
  );
  const newsRow = await queryOne<{ count: string }>(
    `SELECT count(*)::text AS count FROM news_articles`
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-5">
        <Link
          href="/admin/applications"
          className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 hover:shadow-md transition"
        >
          <h2 className="text-lg font-extrabold text-gray-900">Applications</h2>
          <p className="mt-1 text-4xl font-black text-brand">
            {appsRow?.count ?? "0"}
          </p>
          <p className="mt-1 text-sm text-gray-600">View & download resumes</p>
        </Link>
        <Link
          href="/admin/news"
          className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 hover:shadow-md transition"
        >
          <h2 className="text-lg font-extrabold text-gray-900">News & Blog</h2>
          <p className="mt-1 text-4xl font-black text-brand">
            {newsRow?.count ?? "0"}
          </p>
          <p className="mt-1 text-sm text-gray-600">Create & edit articles</p>
        </Link>
      </div>
    </div>
  );
}
