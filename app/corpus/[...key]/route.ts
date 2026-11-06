import { getCloudflareContext } from "@opennextjs/cloudflare";

// Streams one object out of the bucket, by its full key. Only the shelves' prefixes are reachable.
const OPEN = ["swipes/", "books/"];

export async function GET(_: Request, { params }: RouteContext<"/corpus/[...key]">) {
  const key = (await params).key.join("/");
  if (!OPEN.some((p) => key.startsWith(p))) return new Response(null, { status: 404 });

  const { env } = await getCloudflareContext({ async: true });
  const object = await env.CORPUS.get(key);
  if (!object) return new Response(null, { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  // A day at the edge. Keys are stable, so a replaced file shows within the day without a purge.
  headers.set("cache-control", "public, max-age=86400");
  return new Response(object.body, { headers });
}
