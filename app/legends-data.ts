// The shelves under Swipes, oldest first, the books last. slug is the folder in the bucket; route is the URL.
// bust: a headshot exists in public/legends. count: the bucket's folder as of the last upload, until the home
// page lists R2 for itself.
export type Legend = { slug: string; route: string; name: string; prefix: string; bust: boolean; count: number };

const man = (slug: string, route: string, name: string, bust: boolean, count: number): Legend => ({
  slug, route, name, prefix: `swipes/${slug}/`, bust, count,
});

export const LEGENDS: Legend[] = [
  man("claude-hopkins", "hopkins", "Claude Hopkins", true, 9),
  man("robert-collier", "collier", "Robert Collier", false, 2),
  man("john-caples", "caples", "John Caples", false, 9),
  man("david-ogilvy", "ogilvy", "David Ogilvy", false, 11),
  man("eugene-schwartz", "schwartz", "Eugene Schwartz", true, 15),
  man("gary-halbert", "halbert", "Gary Halbert", true, 13),
  man("joseph-sugarman", "sugarman", "Joseph Sugarman", false, 1),
  man("john-carlton", "carlton", "John Carlton", false, 10),
  man("no-author-provided", "misc", "No author provided", false, 1),
  // The nine PDFs, whole books rather than ads, on the same shelf for now.
  { slug: "books", route: "books", name: "Books", prefix: "books/", bust: false, count: 9 },
];

// In the bucket but off the site. Bruno sits out until there is a place for him.
export const HIDDEN = new Set(["books/cause-principle-and-unity.pdf"]);

export const legend = (route: string) => LEGENDS.find((l) => l.route === route);
