"use client";

import { User, BookOpen, GraduationCap } from "lucide-react";
import { AnakAsuh, AnakAsuhCardProps } from "@/src/data/AnakAsuh";

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

export default function AnakAsuhCard({
  child,
  index,
  onViewDetail,
}: AnakAsuhCardProps) {
  const gradient = avatarGradients[index % avatarGradients.length];

  const initials = child.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1">
      {/* Avatar / Photo */}
      <div
        className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${gradient}`}
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
        <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary-700 shadow-sm">
          {child.status}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-gray-900 leading-snug">
          {child.name}
        </h3>

        <div className="mt-3 space-y-2">
          {/* Gender */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User className="h-4 w-4 shrink-0 text-primary-400" />
            <span>{child.age} Tahun</span>
          </div>

          {/* Education */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <GraduationCap className="h-4 w-4 shrink-0 text-primary-400" />
            <span>{child.education} - {child.education_level}</span>
          </div>
        </div>

        {/* Detail button */}
        {onViewDetail && (
          <button
            onClick={() => onViewDetail(child)}
            className="mt-auto pt-4"
          >
            <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary-100 bg-primary-50/50 py-2.5 text-sm font-semibold text-primary-700 transition-all duration-200 hover:bg-primary-600 hover:text-white hover:border-primary-600">
              <BookOpen className="h-4 w-4" />
              Lihat Detail
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
