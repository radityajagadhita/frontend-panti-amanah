export interface StatItem {
  id: string;
  value: number;
  label: string;
  suffix: string;
  icon: "users" | "calendar" | "heart" | "book-open";
}

export const stats: StatItem[] = [
  {
    id: "children",
    value: 45,
    label: "Anak Asuh Aktif",
    suffix: "+",
    icon: "users",
  },
  {
    id: "years",
    value: 12,
    label: "Tahun Berdiri",
    suffix: "+",
    icon: "calendar",
  },
  {
    id: "donors",
    value: 200,
    label: "Donatur & Sponsor",
    suffix: "+",
    icon: "heart",
  },
  {
    id: "programs",
    value: 15,
    label: "Program Berjalan",
    suffix: "+",
    icon: "book-open",
  },
];
