"use client"

import { Quote, Eye, Target, Award, Clock } from "lucide-react";
import { organizationProfile } from "@/src/data/mockProfile";
import bgSection from "../../../public/bg-section.jpg";

export default function ProfilePage() {
  const { sambutan, vision, mission, motto, history } = organizationProfile;

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

            <div className="relative rounded-2xl border border-primary-100 bg-primary-50/30 p-8 md:p-10">
              <Quote className="absolute top-6 left-6 h-10 w-10 text-primary-200" />
              <div className="relative">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-xl font-bold text-white shadow-lg shadow-primary-500/25">
                    {sambutan.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{sambutan.name}</h3>
                    <p className="text-sm text-primary-600">{sambutan.title}</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed text-gray-600 italic">
                  &ldquo;{sambutan.message}&rdquo;
                </p>
              </div>
            </div>
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

      {/* Motto */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-500 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Award className="mx-auto mb-4 h-8 w-8 text-primary-200" />
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-200 mb-3">
            Motto Kami
          </p>
          <blockquote className="text-2xl font-bold text-white md:text-3xl lg:text-4xl leading-snug">
            &ldquo;{motto}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Sejarah / History */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Sejarah
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Perjalanan Kami
            </p>
          </div>

          <div className="relative mx-auto max-w-3xl">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary-100 md:left-1/2 md:-translate-x-px" />

            <div className="space-y-10">
              {history.map((event, i) => (
                <div
                  key={event.year}
                  className={`relative flex flex-col md:flex-row ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary-500 to-primary-600 text-xs font-bold text-white shadow-md shadow-primary-500/20 z-10">
                    <Clock className="h-4 w-4" />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                    }`}
                  >
                    <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-700 mb-2">
                      {event.year}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
