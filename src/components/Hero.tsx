import Link from "next/link";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import bgHero from "../public/bg-hero.png";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(129, 121, 67, 0.71), rgba(121, 126, 66, 0.7)), url(${bgHero.src})`,
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-100/40 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-50/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-30">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-medium text-primary-700">
            <Sparkles className="h-3.5 w-3.5" />
            Yayasan Sosial Kemanusiaan
          </div>

          {/* Main heading */}
          <h1 className="animate-fade-in-up-delay-1 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Bersama Membangun{" "}
            <span className="bg-gradient-to-r from-primary-800 via-primary-600 to-primary-500 bg-clip-text text-transparent">
              Masa Depan Cerah
            </span>{" "}
            Anak-anak Kita
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up-delay-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
            Panti Amanah hadir sebagai rumah penuh kasih sayang bagi anak-anak
            yatim piatu dan kaum dhuafa. Mari berbagi kebahagiaan dan bersama
            mewujudkan harapan mereka.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5"
            >
              Kenali Kami
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/anak-asuh"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-200 bg-white px-7 py-3.5 text-sm font-semibold text-primary-700 transition-all duration-300 hover:border-primary-300 hover:bg-primary-50 hover:-translate-y-0.5"
            >
              <Heart className="h-4 w-4" />
              Bantu Mereka
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60V20C240 45 480 5 720 20C960 35 1200 0 1440 15V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}