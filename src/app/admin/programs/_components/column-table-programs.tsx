"use client";

import { useState } from "react";
import api from "../../../../lib/api";

import DialogEditProgram from "./dialog-edit-program";
import ConfirmModal from "../../../../components/admin/confirmModal";
import AlertModal from "../../../../components/admin/alertModal";

export default function ColumnTablePrograms({
  data,
  onSuccess,
}: any) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/programs/${id}`);
      onSuccess();
      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Program berhasil dihapus",
      });
    } catch (error) {
      console.log(error);
      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal menghapus program",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="overflow-y-auto flex-1 scrollbar-thin">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">
              Title
            </th>

            <th className="p-4 text-left">
              Description
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((program: any) => (

            <tr
              key={program.id}
              className="border-t"
            >

              <td className="p-4">
                {program.title}
              </td>

              <td className="p-4">
                {program.description}
              </td>

              <td className="p-4">

                <div className="flex gap-3">

                  <DialogEditProgram
                    program={program}
                    onSuccess={onSuccess}
                  />

                  <button
                    onClick={() => setDeleteId(program.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

        </table>
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId !== null) handleDelete(deleteId);
        }}
        title="Hapus Program"
        message="Apakah Anda yakin ingin menghapus program ini? Tindakan ini tidak dapat dibatalkan."
      />

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal((s) => ({ ...s, isOpen: false }))}
        type={alertModal.type}
        message={alertModal.message}
      />
    </div>
  );
}