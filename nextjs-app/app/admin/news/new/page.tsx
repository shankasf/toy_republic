import { requireAdmin } from "@/lib/auth";
import ArticleForm from "../ArticleForm";
import { createArticle } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  await requireAdmin();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900">New article</h1>
      <ArticleForm action={createArticle} submitLabel="Publish" />
    </div>
  );
}
