import Link from "next/link";
import { Leaf, MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profile", label: "Tentang Kami" },
  { href: "/anak-asuh", label: "Anak Asuh" },
  { href: "/galeri", label: "Galeri" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 py-14 md:grid-cols-3">
          {/* About */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600/30">
                <Leaf className="h-5 w-5 text-primary-300" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Panti Amanah
              </span>
            </div>
            <p className="text-sm leading-relaxed text-primary-200/80">
              Lembaga sosial yang didedikasikan untuk memberikan bantuan,
              pendidikan, dan kasih sayang kepada anak-anak yatim piatu dan
              kaum dhuafa. Bersama, kita wujudkan masa depan yang lebih cerah.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-300">
              Tautan Cepat
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-200/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-300">
              Hubungi Kami
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-200/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                <span>Jl. Kebaikan No. 123, Kec. Harapan, Kota Amanah, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-200/70">
                <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-200/70">
                <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                <span>info@pantiamanah.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800 py-6 text-center">
          <p className="text-xs text-primary-300/60">
            &copy; {new Date().getFullYear()} Panti Amanah. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
