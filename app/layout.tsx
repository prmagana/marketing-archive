import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Mirrors design: Regular=400, Bold mapped to 600 so font-semibold hits Bold.
const productSans = localFont({
  src: [
    { path: "./fonts/ProductSansRegular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/ProductSansBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-product-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marketing",
  description: "The start of a vast marketing source for tapt.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${productSans.variable} h-full antialiased`}>
      {/* className on body, same as design, so every element inherits the face. */}
      <body className={`${productSans.className} flex min-h-full flex-col bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
