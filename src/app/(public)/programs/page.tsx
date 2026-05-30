"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import ProgramCard, { type Program } from "@/src/components/ProgramCard";
import bgSection from "../../../public/bg-section.jpg";

export default function ProgramsPage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await api.get("/programs");
      setPrograms(response.data.data || response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        className="py-16 md:py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(129, 121, 67, 0.71), rgba(121, 126, 66, 0.7)), url(${bgSection.src})`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Program Kegiatan
          </h1>
          <p className="mt-4 text-lg text-primary-100/80">
            Lihat program sosial dan pengembangan yang dijalankan oleh Panti Amanah.
          </p>
          {!loading && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-5 py-2 text-sm font-medium text-white">
              {programs.length} Program
            </div>
          )}
        </div>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary-500" />
              <p className="text-sm">Memuat program...</p>
            </div>
          ) : programs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {programs.map((program, index) => (
                <ProgramCard
                  key={`${program.id ?? index}-${program.title}`}
                  program={program}
                  index={index}
                  onClick={() => router.push(`/programs/${program.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white p-14 text-center text-gray-600 shadow-sm">
              Tidak ada program yang dapat ditampilkan saat ini.
            </div>
          )}
        </div>
      </section>
    </>
  );
}