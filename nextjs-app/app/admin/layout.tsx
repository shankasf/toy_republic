import Link from "next/link";
import { redirect } from "next/navigation";
import { destroySession, getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function logoutAction() {
  "use server";
  await destroySession();
  redirect("/admin/login");
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-extrabold text-gray-900">
              Toy Republic Admin
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/admin" className="text-gray-700 hover:text-brand">
                Dashboard
              </Link>
              <Link
                href="/admin/applications"
                className="text-gray-700 hover:text-brand"
              >
                Applications
              </Link>
              <Link
                href="/admin/news"
                className="text-gray-700 hover:text-brand"
              >
                News
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">{admin.email}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
