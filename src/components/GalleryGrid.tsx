"use client";

import { useState } from "react";
import { Camera, BookOpen, TreePalm, Moon, Users } from "lucide-react";
import {
  galleryItems,
  galleryCategories,
  type GalleryCategory,
  type GalleryItem,
} from "@/src/data/mockGallery";

const categoryIcons: Record<string, React.ReactNode> = {
  Pendidikan: <BookOpen className="h-6 w-6" />,
  Rekreasi: <TreePalm className="h-6 w-6" />,
  Ibadah: <Moon className="h-6 w-6" />,
  Kegiatan: <Users className="h-6 w-6" />,
};

const categoryGradients: Record<string, string> = {
  Pendidikan: "from-blue-400 to-teal-500",
  Rekreasi: "from-amber-400 to-orange-500",
  Ibadah: "from-purple-400 to-indigo-500",
  Kegiatan: "from-primary-400 to-emerald-500",
};

function GalleryCard({ item }: { item: GalleryItem }) {
  const heightClass =
    item.aspectRatio === "portrait"
      ? "h-80"
      : item.aspectRatio === "square"
        ? "h-64"
        : "h-56";

  const gradient = categoryGradients[item.category];
  const icon = categoryIcons[item.category];

  return (
    <div
      className={`group relative mb-4 overflow-hidden rounded-2xl ${heightClass} break-inside-avoid`}
    >
      {/* Gradient placeholder */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center text-white/30`}
      >
        {icon}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
          <span className="mb-1 inline-block rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white">
            {item.category}
          </span>
          <p className="text-sm font-semibold text-white">{item.caption}</p>
          <p className="text-xs text-white/70">
            {new Date(item.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Camera icon on hover */}
      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Camera className="h-4 w-4" />
      </div>
    </div>
  );
}

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("Semua");

  const filtered =
    activeCategory === "Semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "bg-primary-600 text-white shadow-md shadow-primary-500/25"
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <Camera className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-4 text-gray-400">Belum ada foto untuk kategori ini</p>
        </div>
      )}
    </div>
  );
}
