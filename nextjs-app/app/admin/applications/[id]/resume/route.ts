import { NextRequest } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { queryOne } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return new Response("Unauthorized", { status: 401 });

  const { id } = await params;
  const row = await queryOne<{
    resume_filename: string | null;
    resume_data: Buffer | null;
    resume_mime: string | null;
  }>(
    `SELECT resume_filename, resume_data, resume_mime
       FROM job_applications WHERE id = $1`,
    [Number(id)]
  );
  if (!row?.resume_data) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(row.resume_data), {
    headers: {
      "Content-Type": row.resume_mime ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${row.resume_filename ?? `resume-${id}`}"`,
    },
  });
}
