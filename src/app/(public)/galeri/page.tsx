import GalleryGrid from "@/src/components/GalleryGrid";

export const metadata = {
  title: "Galeri Kegiatan — Panti Amanah",
  description:
    "Galeri foto kegiatan anak-anak Panti Amanah: pendidikan, rekreasi, ibadah, dan kegiatan sosial.",
};

export default function GaleriPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Galeri Kegiatan
          </h1>
          <p className="mt-4 text-lg text-primary-100/80">
            Dokumentasi momen-momen berharga kegiatan anak-anak Panti Amanah.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
