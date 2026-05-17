export interface AnakAsuh {
  id: number;
  name: string;
  age: number;
  gender: string; // "L" | "P"
  education: string;
  photo_url?: string | null;
}

export interface AnakAsuhCardProps {
  child: AnakAsuh;
  index: number;
  onViewDetail?: (child: AnakAsuh) => void;
}