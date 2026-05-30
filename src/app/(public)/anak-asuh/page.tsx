"use client";

import { useEffect, useState } from "react";
import { Users, Loader2 } from "lucide-react";
import api from "@/src/lib/api";
import AnakAsuhCard from "./component/anak-asuh_Card";
import { AnakAsuh } from "@/src/data/AnakAsuh";
import bgSection from "../../../public/bg-section.jpg";

export default function AnakAsuhPage() {
  const [children, setChildren] = useState<AnakAsuh[]>([]);
  const [filterGender, setFilterGender] = useState<"Semua" | "Laki-laki" | "Perempuan">("Semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/anak-asuh");
        setChildren(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data anak asuh. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  const filteredChildren = children.filter((child) => {
    if (filterGender === "Semua") return true;
    return child.gender === filterGender;
  });

  return (
    <>
      {/* Page Header */}
      <section className="py-16 md:py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(129, 121, 67, 0.71), rgba(121, 126, 66, 0.7)), url(${bgSection.src})`,
        }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Anak Asuh Kami
          </h1>
          <p className="mt-4 text-lg text-primary-100/80">
            Kenali anak-anak yang tumbuh dan berkembang dalam kasih sayang Panti
            Amanah.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-5 py-2 text-sm font-medium text-white">
            <Users className="h-4 w-4" />
            {loading ? "Memuat..." : `${children.length} Anak Asuh Aktif`}
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Gender Filter */}
          {!loading && !error && children.length > 0 && (
            <div className="mb-10 flex justify-center gap-2">
              {(["Semua", "Laki-laki", "Perempuan"] as const).map((gender) => (
                <button
                  key={gender}
                  onClick={() => setFilterGender(gender)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                    filterGender === gender
                      ? "bg-primary-600 text-white shadow-md shadow-primary-500/25 scale-105"
                      : "bg-white text-gray-500 hover:bg-primary-50 hover:text-primary-600 border border-gray-200"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary-500" />
              <p className="text-sm">Memuat data anak asuh...</p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-24 text-red-500">
              <p className="text-base font-medium">{error}</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && children.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <Users className="h-12 w-12 mb-4 opacity-40" />
              <p className="text-base">Belum ada data anak asuh.</p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && children.length > 0 && (
            <>
              {filteredChildren.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredChildren.map((child, i) => (
                    <div key={child.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${i * 100}ms` }}>
                      <AnakAsuhCard child={child} index={i} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400 animate-in fade-in">
                  <Users className="h-12 w-12 mb-4 opacity-40" />
                  <p className="text-base">Tidak ada anak asuh untuk filter ini.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
