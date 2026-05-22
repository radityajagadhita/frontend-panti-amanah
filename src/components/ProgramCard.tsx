import { Calendar, Clock, MapPin } from "lucide-react";

export interface Program {
  id?: number | string;
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  image_url?: string;
}

interface ProgramCardProps {
  program: Program;
  index: number;
}

const avatarGradients = [
  "from-primary-400 to-emerald-500",
  "from-teal-400 to-primary-500",
  "from-primary-500 to-green-600",
  "from-emerald-400 to-teal-500",
  "from-green-400 to-primary-600",
  "from-primary-300 to-emerald-500",
  "from-teal-500 to-primary-400",
  "from-emerald-500 to-green-500",
];

export default function ProgramCard({ program, index }: ProgramCardProps) {
  const gradient = avatarGradients[index % avatarGradients.length];

  const initials = program.title
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1">
      <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${gradient}`}>
        {program.image_url ? (
          <img
            src={program.image_url}
            alt={program.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl font-bold text-white">
            {initials}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-gray-900">{program.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{program.description}</p>

        <div className="mt-6 space-y-3 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary-400" />
            <span>{program.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary-400" />
            <span>{program.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary-400" />
            <span>{program.location}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
