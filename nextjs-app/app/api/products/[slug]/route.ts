import { getProduct } from "@/lib/products";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return new Response("Not found", { status: 404 });
  }
  return Response.json(product);
}
