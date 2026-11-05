import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marketing",
  description: "marketing",
};

// No font yet: Tailwind's default sans stack until the repo earns Product Sans like design.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
