"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";

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

      setPrograms(
        response.data.data || []
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-24 px-8 bg-white">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-16">
          Program Kami
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {programs.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition-all"
            >

              <div className="h-64 bg-gray-200">

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}

              </div>

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {item.title}
                </h2>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {item.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}