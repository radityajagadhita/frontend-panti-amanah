"use client";

import { Camera } from "lucide-react";
import { BASE_URL } from "@/src/lib/api";

export interface GalleryItem {
  id?: number;
  title: string;
  image_path: string;
  uploaded_at: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

const gradients = [
  "from-primary-400 to-emerald-500",
  "from-teal-400 to-primary-500",
  "from-blue-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-purple-400 to-indigo-500",
  "from-green-400 to-primary-600",
  "from-rose-400 to-pink-500",
  "from-sky-400 to-blue-500",
];



function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const heightClass =
    index % 3 === 0 ? "h-72" : index % 3 === 1 ? "h-56" : "h-64";

  const gradient = gradients[index % gradients.length];

  const imageUrl = item.image_path
    ? `${BASE_URL}/storage/${item.image_path}`
    : null;


  return (
    <div
      className={`group relative mb-4 overflow-hidden rounded-2xl ${heightClass} break-inside-avoid`}
    >
      {/* Image or gradient fallback */}
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
          <Camera className="h-10 w-10" />
        </div>
      )}

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Caption on hover */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-sm font-semibold text-white leading-snug">
          {item.title}
        </p>
      </div>

      {/* Camera icon on hover */}
      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Camera className="h-4 w-4" />
      </div>
    </div>
  );
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <Camera className="mx-auto h-12 w-12 text-gray-300" />
        <p className="mt-4 text-gray-400">Belum ada foto di galeri</p>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((item, i) => (
        <GalleryCard key={item.id ?? i} item={item} index={i} />
      ))}
    </div>
  );
}
