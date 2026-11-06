import { doc } from "../../docs";

// The machine layer: a document as plain markdown at its own URL plus .md, rewritten here from next.config.ts.
export async function GET(_: Request, { params }: RouteContext<"/md/[...slug]">) {
  const { slug } = await params;
  const d = slug.length === 1 ? doc(slug[0]) : undefined;
  if (!d) return new Response(null, { status: 404 });
  return new Response(d.md, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
