"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import api from "@/src/lib/api";

interface SiteProfile {
  phone_number?: string;
  Whatsapp_number?: string;
  email?: string;
  whatsapp_link?: string | null;
  instagram?: string | null;
}

interface Location {
  id: number;
  address: string;
  google_maps_url?: string | null;
}

const quickLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profile", label: "Tentang Kami" },
  { href: "/anak-asuh", label: "Anak Asuh" },
  { href: "/galeri", label: "Galeri" },
  { href: "/donasi", label: "Donasi" },
  { href: "/kalkulator-zakat", label: "Kalkulator Zakat" },
];

export default function Footer() {
  const [profile, setProfile] = useState<SiteProfile | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        const data = Array.isArray(res.data)
          ? res.data[0]
          : res.data?.data ?? res.data;
        setProfile(data ?? null);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchLocations = async () => {
      try {
        const res = await api.get("/locations");
        setLocations(res.data?.data ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
    fetchLocations();
  }, []);

  return (
    <footer className="bg-primary-700 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="lg:pr-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600/30">
                <img src="/icon.png" alt="Panti Amanah" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Panti Amanah
              </span>
            </div>
            <h3 className="font-bold text-amber-200 mb-2">Lokasi Panti Asuhan</h3>
            {/* Alamat */}
            {locations.length > 0 ? (
              <ul className="space-y-3 text-sm text-primary-200/80">
                {locations.map((loc) => (
                  <li key={loc.id} className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-primary-200 mt-0.5" />
                    {loc.google_maps_url ? (
                      <a
                        href={loc.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors leading-relaxed"
                      >
                        {loc.address}
                      </a>
                    ) : (
                      <span className="leading-relaxed">{loc.address}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-3 text-sm text-primary-200/40 animate-pulse">
                <MapPin className="h-4 w-4 shrink-0 text-primary-200" />
                <span>Memuat alamat...</span>
              </div>
            )}
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
              {/* Phone */}
              {profile?.phone_number ? (
                <li className="flex items-center gap-3 text-sm text-primary-200/70">
                  <Phone className="h-4 w-4 shrink-0 text-primary-200" />
                  <span>{profile.phone_number}</span>
                </li>
              ) : (
                <li className="flex items-center gap-3 text-sm text-primary-200/40 animate-pulse">
                  <Phone className="h-4 w-4 shrink-0 text-primary-200" />
                  <span>Memuat...</span>
                </li>
              )}

              {/* WhatsApp */}
              {profile?.Whatsapp_number && (
                <li className="flex items-center gap-3 text-sm text-primary-200/70">
                  <MessageCircle className="h-4 w-4 shrink-0 text-primary-200" />
                  {profile.whatsapp_link ? (
                    <a
                      href={profile.whatsapp_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {profile.Whatsapp_number}
                    </a>
                  ) : (
                    <span>{profile.Whatsapp_number}</span>
                  )}
                </li>
              )}

              {/* Email */}
              {profile?.email ? (
                <li className="flex items-center gap-3 text-sm text-primary-200/70">
                  <Mail className="h-4 w-4 shrink-0 text-primary-200" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {profile.email}
                  </a>
                </li>
              ) : (
                <li className="flex items-center gap-3 text-sm text-primary-200/40 animate-pulse">
                  <Mail className="h-4 w-4 shrink-0 text-primary-200" />
                  <span>Memuat...</span>
                </li>
              )}

              {/* Instagram */}
              {profile?.instagram ? (
                <li className="flex items-center gap-3 text-sm text-primary-200/70">
                  <h5 className="font-semibold shrink-0 text-primary-200">IG: </h5>
                  <a
                    href={`https://www.instagram.com/${profile.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {profile.instagram}
                  </a>
                </li>
              ) : (
                <li className="flex items-center gap-3 text-sm text-primary-200/40 animate-pulse">
                  <h5 className="font-semibold shrink-0 text-primary-200">IG: </h5>
                  <span>Memuat...</span>
                </li>
              )}
            </ul>
          </div>

          {/* Map */}
          <div className="flex flex-col h-full">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-300">
              Peta Lokasi
            </h3>
            <div className="flex-1 w-full overflow-hidden rounded-xl border border-primary-600/50 min-h-[180px] relative bg-primary-800/50 shadow-inner group">
              {/* Note: This is a placeholder map embed pointing to a generic location. 
                  In production, the client can replace the src with their actual Google Maps embed URL. */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7920.892159349778!2d107.6376764!3d-6.9565899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e845bf585827%3A0x7cceaecba64697f5!2sPanti%20Asuhan%20Amanah!5e0!3m2!1sid!2sid!4v1780116218042!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-75 mix-blend-luminosity group-hover:mix-blend-normal group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
              ></iframe>
            </div>
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
