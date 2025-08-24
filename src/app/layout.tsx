import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/Header";



export const metadata: Metadata = {
  title: "GitHub Trending Repositories",
  description: "A list of trending repositories on GitHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
      <div className="min-h-screen bg-pink-100">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-4">
          {children}
        </main>
      </div>
        <Analytics />
      </body>
    </html>
  );
}
