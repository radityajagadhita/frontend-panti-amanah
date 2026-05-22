"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Leaf } from "lucide-react";
import icon from "../public/icon.png";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profile", label: "Tentang Kami" },
  { href: "/anak-asuh", label: "Anak Asuh" },
  { href: "/programs", label: "Program Kami" },
  { href: "/galeri", label: "Galeri" },
  { href: "/donasi", label: "Donasi" },
  { href: "/kalkulator-zakat", label: "Kalkulator Zakat" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 shadow-md bg-white${
        scrolled
          && "bg-white/80 backdrop-blur-md shadow-lg shadow-primary-900/5" 
          }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
              <img src={icon.src} alt="Panti Amanah" className="w-10 h-10 object-cover"/>
            <span className="text-xl font-bold tracking-tight text-primary-800">
              Panti <span className="text-primary-600">Amanah</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary-700 bg-primary-50"
                      : "text-gray-600 hover:text-primary-700 hover:bg-primary-50/50"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-primary-500" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80 border-t border-primary-100" : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-4 py-3 bg-white">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-primary-50/50 hover:text-primary-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

    </nav>
  );
}