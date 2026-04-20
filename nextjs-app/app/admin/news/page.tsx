import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { deleteArticle } from "./actions";

export const dynamic = "force-dynamic";

type Article = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  published_at: string;
};

export default async function AdminNewsList() {
  await requireAdmin();
  const rows = await query<Article>(
    `SELECT id, slug, title, summary,
            to_char(published_at, 'YYYY-MM-DD') AS published_at
       FROM news_articles
       ORDER BY published_at DESC, id DESC`
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-900">
          News & Blog{" "}
          <span className="text-gray-400 font-normal text-xl">
            ({rows.length})
          </span>
        </h1>
        <Link
          href="/admin/news/new"
          className="px-5 py-2.5 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark"
        >
          + New article
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl bg-white border border-gray-200 p-10 text-center text-gray-600">
          No articles yet.
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((a) => (
            <article
              key={a.id}
              className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 flex flex-wrap items-start justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{a.published_at}</span>
                  <span>·</span>
                  <span className="font-mono">/news/{a.slug}</span>
                </div>
                <h3 className="mt-1 text-lg font-extrabold text-gray-900">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm text-gray-700 line-clamp-2">
                  {a.summary}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/news/${a.id}/edit`}
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm font-semibold hover:bg-gray-100"
                >
                  Edit
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await deleteArticle(a.id);
                  }}
                >
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full border border-red-300 text-red-600 text-sm font-semibold hover:bg-red-50"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
