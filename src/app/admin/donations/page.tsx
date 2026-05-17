"use client";

import { useEffect, useState }
from "react";

import api from "../../../lib/api";

import ColumnTableDonations
from "./_components/column-table-donations";

import DialogCreateDonations
from "./_components/dialog-create-donations";

export default function DonationsPage() {

  const [donations, setDonations] =
    useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {

    try {

      const response = await api.get(
        "/donations"
      );

      setDonations(
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
            Donations
          </h1>

          <p className="text-gray-500">
            Incoming donation records
          </p>

        </div>

        <DialogCreateDonations
          onSuccess={fetchDonations}
        />

      </div>

      <ColumnTableDonations
        data={donations}
        onSuccess={fetchDonations}
      />

    </div>
  );
}