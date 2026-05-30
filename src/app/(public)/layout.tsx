import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto">{children}</div>
      </main>
      <Footer />

      {/* Global Floating Donation Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          {/* Pulsating background ring */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-400 to-primary-500 opacity-40 blur-lg group-hover:opacity-60 transition-opacity duration-300 animate-pulse" />
          
          <Link
            href="/donasi"
            className="relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-primary-600 px-6 py-4 text-white shadow-2xl shadow-primary-500/40 transition-all duration-300 hover:scale-105 hover:shadow-primary-500/60"
          >
            <Heart className="h-5 w-5 fill-white animate-bounce" style={{ animationDuration: '2s' }} />
            <span className="font-bold tracking-wide">Donasi Sekarang</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
