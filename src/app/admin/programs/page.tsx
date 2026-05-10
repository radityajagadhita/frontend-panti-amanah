"use client";

import api from "../../../lib/api";
import { useEffect, useState } from "react";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await api.get("/programs");

      setPrograms(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Programs
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            {programs.map((program) => (
              <tr key={program.id} className="border-b">
                <td className="p-4">{program.title}</td>
                <td className="p-4">{program.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}