"use client";

import {
  useEffect,
  useState,
} from "react";

import api from "../../../lib/api";

import ColumnTableLocations
from "./_components/column-table-locations";

import DialogCreateLocation
from "./_components/dialog-create-location";

export default function LocationsPage() {

  const [locations, setLocations] =
    useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {

    try {

      const response =
        await api.get(
          "/locations"
        );

      setLocations(
        response.data || []
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Locations
          </h1>

          <p className="text-gray-500">
            Manage panti locations
          </p>

        </div>

        <DialogCreateLocation
          onSuccess={fetchLocations}
        />

      </div>

      <ColumnTableLocations
        data={locations}
        onSuccess={fetchLocations}
      />

    </div>
  );
}