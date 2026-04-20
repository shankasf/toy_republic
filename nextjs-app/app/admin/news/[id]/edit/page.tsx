import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { queryOne } from "@/lib/db";
import ArticleForm from "../../ArticleForm";
import { updateArticle } from "../../actions";

export const dynamic = "force-dynamic";

type Article = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  body: string;
  hero_image: string | null;
  published_at: string;
};

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isInteger(idNum)) notFound();

  const article = await queryOne<Article>(
    `SELECT id, slug, title, summary, body, hero_image,
            to_char(published_at, 'YYYY-MM-DD') AS published_at
       FROM news_articles WHERE id = $1`,
    [idNum]
  );
  if (!article) notFound();

  async function save(formData: FormData) {
    "use server";
    await updateArticle(idNum, formData);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Edit article</h1>
      <ArticleForm action={save} initial={article} submitLabel="Save changes" />
    </div>
  );
}
