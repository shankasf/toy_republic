import Link from "next/link";

type Props = {
  action: (formData: FormData) => Promise<void>;
  initial?: {
    title?: string;
    slug?: string;
    summary?: string;
    body?: string;
    hero_image?: string | null;
    published_at?: string;
  };
  submitLabel: string;
};

export default function ArticleForm({ action, initial, submitLabel }: Props) {
  const i = initial ?? {};
  return (
    <form
      action={action}
      className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 md:p-8 space-y-5 max-w-3xl"
    >
      <div>
        <Label>Title</Label>
        <input
          name="title"
          required
          defaultValue={i.title ?? ""}
          className={inputCls}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <Label>Slug</Label>
          <input
            name="slug"
            defaultValue={i.slug ?? ""}
            placeholder="auto from title"
            className={inputCls}
          />
          <p className="mt-1 text-xs text-gray-500">
            URL path — leave blank to auto-generate
          </p>
        </div>
        <div>
          <Label>Published date</Label>
          <input
            type="date"
            name="published_at"
            defaultValue={i.published_at ?? ""}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <Label>Hero image URL</Label>
        <input
          name="hero_image"
          defaultValue={i.hero_image ?? ""}
          placeholder="/images/news/hero.jpg or https://…"
          className={inputCls}
        />
      </div>

      <div>
        <Label>Summary</Label>
        <textarea
          name="summary"
          required
          rows={2}
          defaultValue={i.summary ?? ""}
          className={inputCls}
        />
      </div>

      <div>
        <Label>Body</Label>
        <textarea
          name="body"
          required
          rows={14}
          defaultValue={i.body ?? ""}
          className={`${inputCls} font-mono text-sm`}
        />
        <p className="mt-1 text-xs text-gray-500">
          Plain text or HTML — displayed as-is on the article page.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin/news"
          className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {children}
    </label>
  );
}
