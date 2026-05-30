"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, Loader2 } from "lucide-react";
import api from "../../../../lib/api";
import { type Program } from "@/src/components/ProgramCard";

const avatarGradients = [
    "from-primary-400 to-emerald-500",
    "from-teal-400 to-primary-500",
    "from-primary-500 to-green-600",
    "from-emerald-400 to-teal-500",
];

export default function ProgramDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [program, setProgram] = useState<Program | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/programs/${id}`);
                setProgram(response.data.data || response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProgram();
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
                <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary-500" />
                <p className="text-sm">Memuat detail program...</p>
            </div>
        );
    }

    if (!program) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
                <p>Program tidak ditemukan.</p>
                <button onClick={() => router.push("/programs")} className="mt-4 text-primary-500 underline text-sm">
                    Kembali ke daftar
                </button>
            </div>
        );
    }

    const gradient = avatarGradients[Number(id) % avatarGradients.length];
    const initials = program.title
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <>
            {/* Content */}
            <section className="bg-surface py-12 md:py-16">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

                    {/* Tombol Kembali */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 px-4 py-2 rounded-xl mb-8 transition-all shadow-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </button>

                    {/* Gambar / Gradient */}
                    <div className={`relative w-full h-72 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center mb-8 shadow-md`}>
                        {program.image_url ? (
                            <img src={program.image_url} alt={program.title} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-6xl font-bold text-white/80">{initials}</span>
                        )}
                    </div>

                    {/* Judul */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h2>

                    {/* Meta bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 text-primary-400 shrink-0" />
                            <span>{program.date || <i>Tidak ada</i>}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-primary-400 shrink-0" />
                            <span>{program.time || <i>Tidak ada</i>}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-primary-400 shrink-0" />
                            <span>{program.location || <i>Tidak ada</i>}</span>
                        </div>
                    </div>

                    <hr className="border-gray-100 mb-6" />

                    {/* Deskripsi */}
                    <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                        {program.description}
                    </div>

                </div>
            </section>
        </>
    );
}