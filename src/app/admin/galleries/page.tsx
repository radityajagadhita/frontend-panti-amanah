"use client";

import { useEffect, useState } from "react";

import api from "../../../lib/api";

import DialogCreateGallery from "./_components/dialog-create-gallery";
import ColumnTableGalleries from "./_components/column-table-galleries";

export default function GalleriesPage() {

  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {

    try {

      const response = await api.get("/galleries");

      setGalleries(response.data.data || []);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Galleries
          </h1>

          <p className="text-gray-500">
            Manage gallery images
          </p>

        </div>

        <DialogCreateGallery
          onSuccess={fetchGalleries}
        />

      </div>

      <ColumnTableGalleries
        data={galleries}
        onSuccess={fetchGalleries}
      />

    </div>
  );
}