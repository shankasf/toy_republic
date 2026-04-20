"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export async function createArticle(formData: FormData) {
  await requireAdmin();
  const title = str(formData, "title");
  const summary = str(formData, "summary");
  const body = str(formData, "body");
  const heroImage = str(formData, "hero_image") || null;
  const publishedAt = str(formData, "published_at") || null;
  let slug = str(formData, "slug");
  if (!title || !summary || !body) {
    throw new Error("Title, summary, and body are required.");
  }
  if (!slug) slug = slugify(title);

  await query(
    `INSERT INTO news_articles (slug, title, summary, body, hero_image, published_at)
     VALUES ($1, $2, $3, $4, $5, COALESCE($6::date, CURRENT_DATE))`,
    [slug, title, summary, body, heroImage, publishedAt]
  );

  revalidatePath("/news");
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function updateArticle(id: number, formData: FormData) {
  await requireAdmin();
  const title = str(formData, "title");
  const summary = str(formData, "summary");
  const body = str(formData, "body");
  const heroImage = str(formData, "hero_image") || null;
  const publishedAt = str(formData, "published_at") || null;
  let slug = str(formData, "slug");
  if (!title || !summary || !body) {
    throw new Error("Title, summary, and body are required.");
  }
  if (!slug) slug = slugify(title);

  await query(
    `UPDATE news_articles
        SET slug = $2, title = $3, summary = $4, body = $5,
            hero_image = $6,
            published_at = COALESCE($7::date, published_at)
      WHERE id = $1`,
    [id, slug, title, summary, body, heroImage, publishedAt]
  );

  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function deleteArticle(id: number) {
  await requireAdmin();
  await query(`DELETE FROM news_articles WHERE id = $1`, [id]);
  revalidatePath("/news");
  revalidatePath("/admin/news");
}
