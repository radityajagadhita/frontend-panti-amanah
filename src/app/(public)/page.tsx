import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import Hero from "@/src/components/Hero";
import StatsCounter from "@/src/components/StatsCounter";
import { stats } from "@/src/data/mockStats";
import { children } from "@/src/data/mockChildren";
import { galleryItems } from "@/src/data/mockGallery";

const featuredChildren = children.slice(0, 3);
const featuredGallery = galleryItems.slice(0, 4);

const avatarGradients = [
  "from-primary-400 to-emerald-500",
  "from-teal-400 to-primary-500",
  "from-primary-500 to-green-600",
];

const categoryGradients: Record<string, string> = {
  Pendidikan: "from-blue-400 to-teal-500",
  Rekreasi: "from-amber-400 to-orange-500",
  Ibadah: "from-purple-400 to-indigo-500",
  Kegiatan: "from-primary-400 to-emerald-500",
};

export const metadata = {
  title: "Panti Amanah — Beranda",
  description:
    "Panti Amanah adalah lembaga sosial yang memberikan bantuan, pendidikan, dan kasih sayang kepada anak-anak yatim piatu dan kaum dhuafa.",
};

export default function HomePage() {
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
                .join("");
              return (
                <div
                  key={child.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-1"
                >
                  <div
                    className={`flex h-44 items-center justify-center bg-gradient-to-br ${gradient}`}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-3xl font-bold text-white">
                      {initials}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900">{child.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {child.age} Tahun &middot; {child.hobby}
                    </p>
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
            {featuredGallery.map((item) => {
              const gradient = categoryGradients[item.category];
              return (
                <div
                  key={item.id}
                  className="group relative h-56 overflow-hidden rounded-2xl"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center text-white/30`}
                  >
                    <Camera className="h-6 w-6" />
                  </div>
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm font-medium text-white">{item.caption}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
