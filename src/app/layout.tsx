import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Panti Amanah",
  description: "Panti Amanah adalah sebuah organisasi yang didedikasikan untuk memberikan bantuan dan dukungan kepada anak-anak yatim piatu, kaum dhuafa, dan masyarakat kurang mampu. Kami berkomitmen untuk menciptakan lingkungan yang aman, nyaman, dan penuh kasih sayang bagi mereka yang membutuhkan. Melalui berbagai program sosial, pendidikan, dan kesehatan, kami berusaha untuk meningkatkan kualitas hidup mereka dan memberikan harapan untuk masa depan yang lebih baik.",

  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
