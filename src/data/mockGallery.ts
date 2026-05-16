export type GalleryCategory = "Semua" | "Pendidikan" | "Rekreasi" | "Ibadah" | "Kegiatan";

export interface GalleryItem {
  id: number;
  caption: string;
  category: Exclude<GalleryCategory, "Semua">;
  date: string;
  imageUrl: string | null;
  aspectRatio: "portrait" | "landscape" | "square";
}

export const galleryCategories: GalleryCategory[] = [
  "Semua",
  "Pendidikan",
  "Rekreasi",
  "Ibadah",
  "Kegiatan",
];

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    caption: "Belajar Mengaji Bersama",
    category: "Ibadah",
    date: "2025-01-15",
    imageUrl: null,
    aspectRatio: "landscape",
  },
  {
    id: 2,
    caption: "Kelas Bahasa Inggris",
    category: "Pendidikan",
    date: "2025-02-10",
    imageUrl: null,
    aspectRatio: "portrait",
  },
  {
    id: 3,
    caption: "Piknik ke Taman Kota",
    category: "Rekreasi",
    date: "2025-03-05",
    imageUrl: null,
    aspectRatio: "landscape",
  },
  {
    id: 4,
    caption: "Buka Puasa Bersama 2025",
    category: "Ibadah",
    date: "2025-03-20",
    imageUrl: null,
    aspectRatio: "square",
  },
  {
    id: 5,
    caption: "Lomba Mewarnai Anak-anak",
    category: "Pendidikan",
    date: "2025-04-01",
    imageUrl: null,
    aspectRatio: "portrait",
  },
  {
    id: 6,
    caption: "Kerja Bakti Bersama",
    category: "Kegiatan",
    date: "2025-04-15",
    imageUrl: null,
    aspectRatio: "landscape",
  },
  {
    id: 7,
    caption: "Sholat Berjamaah",
    category: "Ibadah",
    date: "2025-05-01",
    imageUrl: null,
    aspectRatio: "square",
  },
  {
    id: 8,
    caption: "Bermain di Pantai",
    category: "Rekreasi",
    date: "2025-05-10",
    imageUrl: null,
    aspectRatio: "landscape",
  },
  {
    id: 9,
    caption: "Pelatihan Komputer",
    category: "Pendidikan",
    date: "2025-06-01",
    imageUrl: null,
    aspectRatio: "portrait",
  },
  {
    id: 10,
    caption: "Perayaan Hari Kemerdekaan",
    category: "Kegiatan",
    date: "2025-08-17",
    imageUrl: null,
    aspectRatio: "landscape",
  },
  {
    id: 11,
    caption: "Kunjungan ke Museum",
    category: "Rekreasi",
    date: "2025-09-05",
    imageUrl: null,
    aspectRatio: "square",
  },
  {
    id: 12,
    caption: "Pentas Seni Tahunan",
    category: "Kegiatan",
    date: "2025-10-20",
    imageUrl: null,
    aspectRatio: "landscape",
  },
];
