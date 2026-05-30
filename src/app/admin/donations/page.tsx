"use client";

import { useEffect, useState }
from "react";

import api from "../../../lib/api";

import ColumnTableDonations
from "./_components/column-table-donations";

import DialogCreateDonations
from "./_components/dialog-create-donations";

export default function DonationsPage() {

  const [donations, setDonations] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchDonations(currentPage);
  }, [currentPage]);

  const fetchDonations = async (page: number = 1) => {
    try {
      const response = await api.get(`/donations/pagination?page=${page}`);
      setDonations(response.data.data.data || response.data.data || []);
      setCurrentPage(response.data.data.current_page || 1);
      setPerPage(response.data.data.per_page || 10);
      setTotal(response.data.data.total || 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Donations
          </h1>

          <p className="text-gray-500">
            Incoming donation records
          </p>

        </div>

        <DialogCreateDonations
          onSuccess={() => fetchDonations(currentPage)}
        />

      </div>

      <ColumnTableDonations
        data={donations}
        onSuccess={() => fetchDonations(currentPage)}
        currentPage={currentPage}
        perPage={perPage}
        total={total}
        onPageChange={(page: number) => setCurrentPage(page)}
      />

    </div>
  );
}