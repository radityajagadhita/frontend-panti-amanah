"use client";

import { useEffect, useState } from "react";
import { Loader2, Camera } from "lucide-react";
import api from "../../../lib/api";
import GalleryGrid, { type GalleryItem } from "@/src/components/GalleryGrid";

export default function GaleriPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await api.get("/galleries");
      setGalleries(response.data.data || response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Galeri Kegiatan
          </h1>
          <p className="mt-4 text-lg text-primary-100/80">
            Dokumentasi momen-momen berharga kegiatan anak-anak Panti Amanah.
          </p>
          {!loading && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-5 py-2 text-sm font-medium text-white">
              <Camera className="h-4 w-4" />
              {galleries.length} Foto
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary-500" />
              <p className="text-sm">Memuat galeri...</p>
            </div>
          ) : (
            <GalleryGrid items={galleries} />
          )}
        </div>
      </section>
    </>
  );
}
