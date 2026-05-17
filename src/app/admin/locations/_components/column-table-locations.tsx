"use client";

import { useState } from "react";
import api from "../../../../lib/api";

import DialogEditLocation from "./dialog-edit-location";
import ConfirmModal from "../../../../components/admin/confirmModal";
import AlertModal from "../../../../components/admin/alertModal";

export default function ColumnTableLocations({
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
        `/locations/${id}`
      );

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Location berhasil dihapus",
      });

    } catch (error) {

      console.log(error);

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal menghapus location",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">
              Address
            </th>

            <th className="p-4 text-left">
              Google Maps
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((location: any) => (

            <tr
              key={location.id}
              className="border-t"
            >

              <td className="p-4 max-w-md">
                {location.address}
              </td>

              <td className="p-4">

                {location.google_maps_url ? (

                  <a
                    href={
                      location.google_maps_url
                    }
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Open Maps
                  </a>

                ) : (

                  <span className="text-gray-400">
                    No Link
                  </span>

                )}

              </td>

              <td className="p-4">

                <div className="flex gap-3">

                  <DialogEditLocation
                    location={location}
                    onSuccess={onSuccess}
                  />

                  <button
                    onClick={() =>
                      setDeleteId(location.id)
                    }
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

      <ConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId !== null) handleDelete(deleteId);
        }}
        title="Hapus Location"
        message="Apakah Anda yakin ingin menghapus location ini? Tindakan ini tidak dapat dibatalkan."
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