"use client";

import { useEffect } from "react";
import { X, Cake, Star, User, Heart } from "lucide-react";
import type { Child } from "@/src/data/mockChildren";

interface ChildDetailModalProps {
  child: Child;
  onClose: () => void;
}

export default function ChildDetailModal({ child, onClose }: ChildDetailModalProps) {
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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="animate-slide-up relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Avatar Header */}
        <div className="flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600 py-10">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-4xl font-bold text-white ring-4 ring-white/30">
            {initials}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-center text-2xl font-bold text-gray-900">{child.name}</h2>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center rounded-xl bg-primary-50 p-3">
              <Cake className="h-5 w-5 text-primary-500" />
              <span className="mt-1 text-xs text-gray-500">Lahir</span>
              <span className="text-xs font-semibold text-gray-700">{formattedDate}</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-primary-50 p-3">
              <Star className="h-5 w-5 text-primary-500" />
              <span className="mt-1 text-xs text-gray-500">Hobi</span>
              <span className="text-xs font-semibold text-gray-700">{child.hobby}</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-primary-50 p-3">
              <User className="h-5 w-5 text-primary-500" />
              <span className="mt-1 text-xs text-gray-500">Usia</span>
              <span className="text-xs font-semibold text-gray-700">{child.age} Tahun</span>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-gray-50 p-4">
            <p className="text-sm leading-relaxed text-gray-600">{child.bio}</p>
          </div>

          <button
            onClick={onClose}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:shadow-xl hover:shadow-primary-500/30"
          >
            <Heart className="h-4 w-4" />
            Dukung {child.name.split(" ")[0]}
          </button>
        </div>
      </div>
    </div>
  );
}
