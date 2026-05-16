"use client";

import { User, Cake, Star } from "lucide-react";
import type { Child } from "@/src/data/mockChildren";

const avatarGradients = [
  "from-primary-400 to-emerald-500",
  "from-teal-400 to-primary-500",
  "from-primary-500 to-green-600",
  "from-emerald-400 to-teal-500",
  "from-green-400 to-primary-600",
  "from-primary-300 to-emerald-500",
  "from-teal-500 to-primary-400",
  "from-emerald-500 to-green-500",
];

interface ChildCardProps {
  child: Child;
  index: number;
  onViewDetail: (child: Child) => void;
}

export default function ChildCard({ child, index, onViewDetail }: ChildCardProps) {
  const gradient = avatarGradients[index % avatarGradients.length];
  const initials = child.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  const formattedDate = new Date(child.dateOfBirth).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1">
      {/* Avatar Area */}
      <div className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${gradient}`}>
        {child.imageUrl ? (
          <img
            src={child.imageUrl}
            alt={child.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-3xl font-bold text-white">
              {initials}
            </div>
          </div>
        )}
        {/* Age badge */}
        <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary-700 shadow-sm">
          {child.age} Tahun
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-gray-900">{child.name}</h3>

        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Cake className="h-4 w-4 text-primary-400" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Star className="h-4 w-4 text-primary-400" />
            <span>{child.hobby}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User className="h-4 w-4 text-primary-400" />
            <span>{child.gender === "L" ? "Laki-laki" : "Perempuan"}</span>
          </div>
        </div>

        <button
          onClick={() => onViewDetail(child)}
          className="mt-auto pt-4"
        >
          <span className="inline-flex w-full items-center justify-center rounded-xl border-2 border-primary-100 bg-primary-50/50 py-2.5 text-sm font-semibold text-primary-700 transition-all duration-200 hover:bg-primary-600 hover:text-white hover:border-primary-600">
            Lihat Detail
          </span>
        </button>
      </div>
    </div>
  );
}
