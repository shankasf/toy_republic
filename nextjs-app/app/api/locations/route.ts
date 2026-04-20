import { getLocations } from "@/lib/locations";

export const dynamic = "force-dynamic";

export async function GET() {
  const locations = await getLocations();
  return Response.json(locations);
}
