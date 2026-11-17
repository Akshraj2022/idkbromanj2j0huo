import type { Metadata } from "next";
import { bodoni, oswald, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Erito — A wallet card for teens",
  description: "A first wallet for your child, built around standards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--dark)] text-[var(--cream)] selection:bg-[var(--cta)] selection:text-[var(--cream)]">
        {children}
      </body>
    </html>
  );
}
