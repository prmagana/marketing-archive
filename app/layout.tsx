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

// Courier Prime, the typewriter face, for every mono surface: the shelves, the labels, and the documents.
// Open Font License; the license text sits beside the files.
const courierPrime = localFont({
  src: [
    { path: "./fonts/CourierPrime-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/CourierPrime-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/CourierPrime-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/CourierPrime-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-courier-prime",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marketing",
  description: "The start of a vast marketing source for tapt.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${productSans.variable} ${courierPrime.variable} h-full antialiased`}>
      {/* className on body, same as design, so every element inherits the face. */}
      <body className={`${productSans.className} flex min-h-full flex-col bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
