"use client";

import { useEffect, useState } from "react";

import api from "../../../lib/api";

import DialogCreateAnakAsuh from "./_components/dialog-create-anak-asuh";

import ColumnTableAnakAsuh from "./_components/column-table-anak-asuh";

import { AnakAsuh } from "@/src/data/AnakAsuh";

export default function AnakAsuhPage() {

  const [children, setChildren] = useState<AnakAsuh[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchChildren(currentPage);
  }, [currentPage]);

  const fetchChildren = async (page: number = 1) => {

    try {

      const response = await api.get(`/anak-asuh/pagination?page=${page}`);

      setChildren(response.data.data.data || []);
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

          <h1 className="text-4xl font-bold">
            Anak Asuh
          </h1>

          <p className="text-gray-500">
            Manage anak asuh data
          </p>

        </div>

        <DialogCreateAnakAsuh
          onSuccess={() => fetchChildren(currentPage)}
        />

      </div>

      <ColumnTableAnakAsuh
        data={children}
        onSuccess={() => fetchChildren(currentPage)}
        currentPage={currentPage}
        perPage={perPage}
        total={total}
        onPageChange={(page) => setCurrentPage(page)}
      />

    </div>
  );
}