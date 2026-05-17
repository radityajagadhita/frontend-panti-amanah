"use client";

import { useState } from "react";
import api from "../../../../lib/api";

import DialogEditGalleries from "./dialog-edit-galleries";
import ConfirmModal from "../../../../components/admin/confirmModal";
import AlertModal from "../../../../components/admin/alertModal";

export default function ColumnTableGalleries({
  data,
  onSuccess,
}: any) {

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleDelete = async (
    id: number
  ) => {

    try {

      await api.delete(
        `/galleries/${id}`
      );

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Gallery berhasil dihapus",
      });

    } catch (error) {

      console.log(error);

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal menghapus gallery",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {data.map((gallery: any) => (

        <div
          key={gallery.id}
          className="bg-white rounded-2xl shadow overflow-hidden"
        >

          <img
            src={gallery.image_url}
            alt={gallery.title}
            className="w-full h-64 object-cover"
          />

          <div className="p-4 space-y-4">

            <div>

              <h1 className="text-xl font-bold">
                {gallery.title}
              </h1>

              <p className="text-gray-500 text-sm">
                {gallery.uploaded_at}
              </p>

            </div>

            <div className="flex gap-3">

              <DialogEditGalleries
                gallery={gallery}
                onSuccess={onSuccess}
              />

              <button
                onClick={() =>
                  setDeleteId(gallery.id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded-xl w-full"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      ))}

      <ConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId !== null) handleDelete(deleteId);
        }}
        title="Hapus Gallery"
        message="Apakah Anda yakin ingin menghapus gallery ini? Tindakan ini tidak dapat dibatalkan."
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