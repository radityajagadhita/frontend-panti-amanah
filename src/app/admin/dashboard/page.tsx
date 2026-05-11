"use client";

import api from "../../../lib/api";
import { useEffect, useState } from "react";

export default function DashboardPage() {

  const [stats, setStats] = useState({
    programs: 0,
    galleries: 0,
    anakAsuh: 0,
    donations: 0,
    needs: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const [
  programs,
  galleries,
  anakAsuh,
  donations,
  needs,
] = await Promise.all([
  api.get("/programs"),
  api.get("/galleries"),
  api.get("/anak-asuh"),
  api.get("/donations"),
  api.get("/needs"),
]);

setStats({
  programs:
    programs.data.data?.length || 0,

  galleries:
    galleries.data.data?.length || 0,

  anakAsuh:
    anakAsuh.data?.length || 0,

  donations:
    donations.data.data.data?.length || 0,

  needs:
    needs.data.data?.length || 0,
});

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-2">
            Programs
          </h2>

          <p className="text-4xl font-bold text-green-700">
            {stats.programs}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-2">
            Galleries
          </h2>

          <p className="text-4xl font-bold text-green-700">
            {stats.galleries}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-2">
            Anak Asuh
          </h2>

          <p className="text-4xl font-bold text-green-700">
            {stats.anakAsuh}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-2">
            Donations
          </h2>

          <p className="text-4xl font-bold text-green-700">
            {stats.donations}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-2">
            Needs
          </h2>
          <p className="text-4xl font-bold text-green-700">
            {stats.needs}
          </p>
        </div>

      </div>

    </div>
  );
}