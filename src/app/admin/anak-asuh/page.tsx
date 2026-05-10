"use client";

import { useEffect, useState } from "react";

import api from "../../../lib/api";

import DialogCreateAnakAsuh from "./_components/dialog-create-anak-asuh";

import ColumnTableAnakAsuh from "./_components/column-table-anak-asuh";

export default function AnakAsuhPage() {

  const [children, setChildren] = useState([]);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {

    try {

      const response = await api.get("/anak-asuh");

      setChildren(response.data || []);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Anak Asuh
          </h1>

          <p className="text-gray-500">
            Manage anak asuh data
          </p>

        </div>

        <DialogCreateAnakAsuh
          onSuccess={fetchChildren}
        />

      </div>

      <ColumnTableAnakAsuh
        data={children}
        onSuccess={fetchChildren}
      />

    </div>
  );
}