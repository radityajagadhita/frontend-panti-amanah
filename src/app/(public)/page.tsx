"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Camera, User, GraduationCap } from "lucide-react";
import Hero from "@/src/components/Hero";
import StatsCounter from "@/src/components/StatsCounter";
import { stats } from "@/src/data/mockStats";
import api, { BASE_URL } from "@/src/lib/api";
import type { AnakAsuh } from "@/src/data/AnakAsuh";
import type { GalleryItem } from "@/src/components/GalleryGrid";

/* ─── Constants ──────────────────────────────────────────── */

const avatarGradients = [
  "from-primary-400 to-emerald-500",
  "from-teal-400 to-primary-500",
  "from-primary-500 to-green-600",
];

const galleryGradients = [
  "from-primary-400 to-emerald-500",
  "from-teal-400 to-primary-500",
  "from-blue-400 to-teal-500",
  "from-amber-400 to-orange-500",
];



/* ─── Page ───────────────────────────────────────────────── */

export default function HomePage() {
  const [featuredChildren, setFeaturedChildren] = useState<AnakAsuh[]>([]);
  const [featuredGallery, setFeaturedGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [childRes, galleryRes] = await Promise.all([
          api.get("/anak-asuh"),
          api.get("/galleries"),
        ]);

        const children: AnakAsuh[] =
          childRes.data?.data ?? childRes.data ?? [];
        setFeaturedChildren(children.slice(0, 3));

        const galleries: GalleryItem[] =
          galleryRes.data?.data ?? galleryRes.data ?? [];
        setFeaturedGallery(galleries.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Stats Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Dampak Kami
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Perjalanan Penuh Makna
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat) => (
              <StatsCounter key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Children Teaser */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Anak Asuh Kami
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                Kenali Mereka Lebih Dekat
              </p>
            </div>
            <Link
              href="/anak-asuh"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredChildren.map((child, i) => {
              const gradient = avatarGradients[i % avatarGradients.length];
              const initials = child.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

              return (
                <div
                  key={child.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-1"
                >
                  <div
                    className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${gradient}`}
                  >
                    {child.photo_url ? (
                      <img
                        src={child.photo_url}
                        alt={child.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-3xl font-bold text-white">
                        {initials}
                      </div>
                    )}
                    {/* Age badge */}
                    <div className="absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                      {child.age} Thn
                    </div>
                  </div>
                  <div className="p-5 space-y-1.5">
                    <h3 className="text-lg font-bold text-gray-900">
                      {child.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="h-3.5 w-3.5 text-primary-400" />
                      <span>{child.gender === "L" ? "Laki-laki" : "Perempuan"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <GraduationCap className="h-3.5 w-3.5 text-primary-400" />
                      <span>{child.education}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Galeri Kegiatan
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                Momen Berharga Bersama
              </p>
            </div>
            <Link
              href="/galeri"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              Lihat Galeri
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featuredGallery && featuredGallery.length > 0 ? (
              featuredGallery.map((item, i) => {
                const gradient = galleryGradients[i % galleryGradients.length];
                const imageUrl = item.image_path
                  ? item.image_path.startsWith("http")
                    ? item.image_path
                    : `${BASE_URL}/storage/${item.image_path}`
                  : null;

                return (
                  <div
                    key={item.id ?? i}
                    className="group relative h-56 overflow-hidden rounded-2xl"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center text-white/30`}
                      >
                        <Camera className="h-6 w-6" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-sm font-medium text-white">{item.title}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              // --- TEMPAT TULISAN FALLBACK JIKA KOSONG ---
              <div className="col-span-full py-12 text-center">
                <p className="text-gray-500 text-lg font-medium">Belum ada gambar yang diunggah.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
