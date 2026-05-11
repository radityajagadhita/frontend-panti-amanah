"use client";

import { useEffect, useState }
from "react";

import api from "../../../lib/api";

import ColumnTableNeeds
from "./_components/column-table-needs";

import DialogCreateNeed
from "./_components/dialog-create-need";

export default function NeedsPage() {

  const [needs, setNeeds] =
    useState([]);

  useEffect(() => {
    fetchNeeds();
  }, []);

  const fetchNeeds = async () => {

    try {

      const response = await api.get(
        "/needs"
      );

      setNeeds(
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

          <h1 className="text-4xl font-bold">
            Needs
          </h1>

          <p className="text-gray-500">
            Manage donation campaigns
          </p>

        </div>

        <DialogCreateNeed
          onSuccess={fetchNeeds}
        />

      </div>

      <ColumnTableNeeds
        data={needs}
        onSuccess={fetchNeeds}
      />

    </div>
  );
}