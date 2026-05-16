"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { children } from "@/src/data/mockChildren";
import type { Child } from "@/src/data/mockChildren";
import ChildCard from "@/src/components/ChildCard";
import ChildDetailModal from "@/src/components/ChildDetailModal";

export default function AnakAsuhPage() {
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Anak Asuh Kami
          </h1>
          <p className="mt-4 text-lg text-primary-100/80">
            Kenali anak-anak yang tumbuh dan berkembang dalam kasih sayang Panti Amanah.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-5 py-2 text-sm font-medium text-white">
            <Users className="h-4 w-4" />
            {children.length} Anak Asuh Aktif
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {children.map((child, i) => (
              <ChildCard
                key={child.id}
                child={child}
                index={i}
                onViewDetail={setSelectedChild}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedChild && (
        <ChildDetailModal
          child={selectedChild}
          onClose={() => setSelectedChild(null)}
        />
      )}
    </>
  );
}
