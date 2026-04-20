import { redirect } from "next/navigation";
import { createSession, getCurrentAdmin, verifyLogin } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function loginAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const admin = await verifyLogin(email, password);
  if (!admin) {
    redirect("/admin/login?error=1");
  }
  await createSession(admin.id);
  redirect("/admin");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const existing = await getCurrentAdmin();
  if (existing) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center px-4 py-8">
      <form
        action={loginAction}
        className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-5"
      >
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">Admin Sign In</h1>
          <p className="text-sm text-gray-600 mt-1">Toy Republic</p>
        </div>

        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            Invalid email or password.
          </p>
        ) : null}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="username"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
          />
        </div>

        <button
          type="submit"
          className="w-full px-5 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
