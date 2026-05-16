"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";

interface Program {
  id: number;
  title: string;
  description: string;
  image?: string;
}

export default function ProgramSection() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await api.get("/programs");

      setPrograms(response.data.data || response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      id="program"
      className="py-24 px-10 bg-white"
    >
      <h2 className="text-4xl font-bold text-center mb-16">
        Program Kami
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {programs.map((item) => (
          <div
            key={item.id}
            className="border rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="h-56 bg-gray-200">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}