"use client";

import { useEffect, useState } from "react";

import api from "../../../lib/api";

import ColumnTablePrograms from "./_components/column-table-programs";
import DialogCreateProgram from "./_components/dialog-create-program";

export default function ProgramsPage() {

  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {

    try {

      const response = await api.get("/programs");

      setPrograms(response.data.data || []);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Programs
          </h1>

          <p className="text-gray-500">
            Manage all programs
          </p>

        </div>

        <DialogCreateProgram
          onSuccess={fetchPrograms}
        />

      </div>

      <ColumnTablePrograms
        data={programs}
        onSuccess={fetchPrograms}
      />

    </div>
  );
}