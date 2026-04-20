import { query, queryOne } from "./db";

export type Category = {
  id: number;
  slug: string;
  title: string;
  blurb: string;
  image: string;
  layout: "large" | "small";
  sort_order: number;
};

export type Brand = {
  id: number;
  name: string;
  logo: string | null;
  link_url: string | null;
};

export type Review = {
  id: number;
  author: string;
  rating: number;
  body: string;
  source: string;
};

export type NewsArticle = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  body: string;
  hero_image: string | null;
  published_at: string;
};

export type Job = {
  id: number;
  title: string;
  description: string;
  location_id: number;
  location_slug: string;
  location_name: string;
  location_city: string;
  location_state: string;
};

export async function getCategories(): Promise<Category[]> {
  return query<Category>(
    `SELECT id, slug, title, blurb, image, layout, sort_order
       FROM categories
       ORDER BY sort_order ASC`
  );
}

export async function getBrands(): Promise<Brand[]> {
  return query<Brand>(
    `SELECT id, name, logo, link_url
       FROM brands
       ORDER BY sort_order ASC, name ASC`
  );
}

export async function getReviews(limit = 6): Promise<Review[]> {
  return query<Review>(
    `SELECT id, author, rating, body, source
       FROM reviews
       ORDER BY sort_order ASC
       LIMIT $1`,
    [limit]
  );
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  return query<NewsArticle>(
    `SELECT id, slug, title, summary, body, hero_image,
            to_char(published_at, 'YYYY-MM-DD') AS published_at
       FROM news_articles
       ORDER BY published_at DESC`
  );
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  return queryOne<NewsArticle>(
    `SELECT id, slug, title, summary, body, hero_image,
            to_char(published_at, 'YYYY-MM-DD') AS published_at
       FROM news_articles
       WHERE slug = $1`,
    [slug]
  );
}

export async function getActiveJobs(): Promise<Job[]> {
  return query<Job>(
    `SELECT j.id, j.title, j.description, j.location_id,
            l.slug AS location_slug, l.name AS location_name,
            l.city AS location_city, l.state AS location_state
       FROM jobs j
       JOIN locations l ON l.id = j.location_id
       WHERE j.is_active = TRUE
       ORDER BY l.sort_order ASC`
  );
}
