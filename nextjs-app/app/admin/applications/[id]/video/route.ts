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
    video_filename: string | null;
    video_data: Buffer | null;
    video_mime: string | null;
  }>(
    `SELECT video_filename, video_data, video_mime
       FROM job_applications WHERE id = $1`,
    [Number(id)]
  );
  if (!row?.video_data) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(row.video_data), {
    headers: {
      "Content-Type": row.video_mime ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${row.video_filename ?? `video-${id}`}"`,
    },
  });
}
