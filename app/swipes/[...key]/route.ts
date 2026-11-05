import { getCloudflareContext } from "@opennextjs/cloudflare";

// Streams one object out of the bucket. Only swipes/ is reachable from here; the books stay private.
export async function GET(_: Request, { params }: RouteContext<"/swipes/[...key]">) {
  const { key } = await params;
  const { env } = await getCloudflareContext({ async: true });
  const object = await env.CORPUS.get(`swipes/${key.join("/")}`);
  if (!object) return new Response(null, { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  // A day at the edge. Keys are stable, so a replaced scan shows within the day without a purge.
  headers.set("cache-control", "public, max-age=86400");
  return new Response(object.body, { headers });
}
