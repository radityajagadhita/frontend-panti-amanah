"use client";

import {
  useEffect,
  useState,
} from "react";

import api from "../../../lib/api";

import ColumnTableGalleries
from "./_components/column-table-galleries";

import DialogCreateGalleries
from "./_components/dialog-create-gallery";
export default function GalleriesPage() {

  const [galleries, setGalleries] =
    useState([]);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {

    try {

      const response =
        await api.get(
          "/galleries"
        );

      setGalleries(
        response.data.data || []
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Galleries
          </h1>

          <p className="text-gray-500">
            Manage gallery photos
          </p>

        </div>

        <DialogCreateGalleries
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