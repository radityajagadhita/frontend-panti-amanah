"use client"

import { useState, useEffect } from "react";
import { Quote, Eye, Target, Award, Clock } from "lucide-react";
import { organizationProfile } from "@/src/data/mockProfile";
import bgSection from "../../../public/bg-section.jpg";
import api from "@/src/lib/api";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    ketua_yayasan: "",
    tahun_periode: "",
    profil_text: "",
  });
  const { vision, mission } = organizationProfile;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get("/profile");
      const data = response.data.data;
      
      const { ketua_yayasan, tahun_periode, profil_text } = data;
      setProfile({ ketua_yayasan, tahun_periode, profil_text });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section
        className="py-16 md:py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(129, 121, 67, 0.71), rgba(121, 126, 66, 0.7)), url(${bgSection.src})`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Tentang Kami
          </h1>
          <p className="mt-4 text-lg text-primary-100/80">
            Mengenal lebih dekat Panti Amanah, visi, misi, dan perjalanan kami.
          </p>
        </div>
      </section>

      {/* Sambutan */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Sambutan
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                Pesan dari Ketua Yayasan
              </p>
            </div>

            {loading ? (
              /* Loading Skeleton */
              <div className="relative rounded-2xl border border-primary-100 bg-primary-50/30 p-8 md:p-10 animate-pulse">
                <div className="mb-6 flex items-center gap-4">
                  {/* Avatar skeleton */}
                  <div className="h-16 w-16 rounded-full bg-gray-200" />
                  <div className="space-y-2">
                    {/* Name skeleton */}
                    <div className="h-4 w-36 rounded bg-gray-200" />
                    {/* Jabatan skeleton */}
                    <div className="h-3 w-48 rounded bg-gray-200" />
                    {/* Periode skeleton */}
                    <div className="h-3 w-24 rounded bg-gray-200" />
                  </div>
                </div>
                {/* Text skeleton */}
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-gray-200" />
                  <div className="h-3 w-full rounded bg-gray-200" />
                  <div className="h-3 w-3/4 rounded bg-gray-200" />
                </div>
              </div>
            ) : (
              /* Content */
              <div className="relative rounded-2xl border border-primary-100 bg-primary-50/30 p-8 md:p-10">
                <Quote className="absolute top-6 left-6 h-10 w-10 text-primary-200" />
                <div className="relative">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-xl font-bold text-white shadow-lg shadow-primary-500/25">
                      {profile.ketua_yayasan?.split(" ").map((n) => n[0]).slice(0, 2).join("") ?? ""}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {profile.ketua_yayasan ?? "-"}
                      </h3>
                      <p className="text-sm text-primary-600">Ketua Yayasan Panti Amanah</p>
                      <p className="text-xs text-gray-400">Periode {profile.tahun_periode ?? "-"}</p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-gray-600 italic">
                    &ldquo;{profile.profil_text ?? ""}&rdquo;
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Visi */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/20">
                  <Eye className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Visi</h2>
              </div>
              <p className="text-base leading-relaxed text-gray-600">{vision}</p>
            </div>

            {/* Misi */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/20">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Misi</h2>
              </div>
              <ul className="space-y-3">
                {mission.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}