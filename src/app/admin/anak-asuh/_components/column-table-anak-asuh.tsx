"use client";

import { useState } from "react";
import api from "../../../../lib/api";
import DialogEditAnakAsuh from "./dialog-edit-anak-asuh";
import ConfirmModal from "../../../../components/admin/confirmModal";
import AlertModal from "../../../../components/admin/alertModal";

export default function ColumnTableAnakAsuh({
  data,
  onSuccess,
  currentPage = 1,
  perPage = 10,
}: any) {

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleDelete = async (id: number) => {

    try {

      await api.delete(`/anak-asuh/${id}`);

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Anak asuh berhasil dihapus",
      });

    } catch (error) {
      console.log(error);

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal menghapus anak asuh",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="overflow-y-auto flex-1 scrollbar-thin">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="p-4 text-left">No</th>
              <th className="p-4 text-left">Photo</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Age</th>
              <th className="p-4 text-left">Gender</th>
              <th className="p-4 text-left">Education</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((child: any, index: number) => (
              <tr
                key={child.id}
                className="border-t"
              >
                <td className="p-4 text-sm text-gray-500">  {/* tambah ini */}
                  {(currentPage - 1) * perPage + index + 1}
                </td>
                <td className="p-4">
                  <img
                    src={child.photo_url}
                    alt=""
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
                <td className="p-4">
                  {child.name}
                </td>
                <td className="p-4">
                  {child.age}
                </td>
                <td className="p-4">
                  {child.gender}
                </td>
                <td className="p-4">
                  {child.education}
                </td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <DialogEditAnakAsuh
                      child={child}
                      onSuccess={onSuccess}
                    />
                    <button
                      onClick={() => setDeleteId(child.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl"
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
        title="Hapus Anak Asuh"
        message="Apakah Anda yakin ingin menghapus data anak asuh ini? Tindakan ini tidak dapat dibatalkan."
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