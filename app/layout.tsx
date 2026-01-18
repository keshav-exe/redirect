import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const font = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "redirect",
  description: "Clean URLs for social profiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.variable}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
