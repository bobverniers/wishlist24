import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mokum Vintage",
  description: "Find your vintage piece or set a wish.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className={`${geist.className} min-h-screen bg-black text-white antialiased`}>
        <header className="border-b border-white/10 px-6 py-5">
          <h1 className="text-2xl font-black tracking-tighter uppercase">
            Mokum Vintage
          </h1>
          <p className="text-xs text-white/40 tracking-widest uppercase mt-1">
            Amsterdam Archive
          </p>
        </header>
        <main className="px-4 py-8 max-w-2xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}