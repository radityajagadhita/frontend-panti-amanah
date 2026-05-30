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
        <div className="grid gap-10 py-14 md:grid-cols-3">
          {/* About */}
          <div>
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
