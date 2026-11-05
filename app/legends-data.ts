// The men on the shelf, oldest first. slug is the bucket folder under swipes/; route is the catalog's URL, the last name.
// bust: a headshot exists in public/legends. count: the bucket's folder as of the last upload, until the
// home page lists R2 for itself.
export type Legend = { slug: string; route: string; name: string; bust: boolean; count: number };

export const LEGENDS: Legend[] = [
  { slug: "claude-hopkins", route: "hopkins", name: "Claude Hopkins", bust: true, count: 9 },
  { slug: "robert-collier", route: "collier", name: "Robert Collier", bust: false, count: 2 },
  { slug: "john-caples", route: "caples", name: "John Caples", bust: false, count: 9 },
  { slug: "david-ogilvy", route: "ogilvy", name: "David Ogilvy", bust: false, count: 11 },
  { slug: "eugene-schwartz", route: "schwartz", name: "Eugene Schwartz", bust: true, count: 15 },
  { slug: "gary-halbert", route: "halbert", name: "Gary Halbert", bust: true, count: 13 },
  { slug: "joseph-sugarman", route: "sugarman", name: "Joseph Sugarman", bust: false, count: 1 },
  { slug: "john-carlton", route: "carlton", name: "John Carlton", bust: false, count: 10 },
  { slug: "no-author-provided", route: "misc", name: "No author provided", bust: false, count: 1 },
];

export const legend = (route: string) => LEGENDS.find((l) => l.route === route);
