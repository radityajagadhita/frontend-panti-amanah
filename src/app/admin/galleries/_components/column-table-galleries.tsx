"use client";

import api from "../../../../lib/api";

import DialogEditGalleries
from "./dialog-edit-galleries";

export default function ColumnTableGalleries({
  data,
  onSuccess,
}: any) {

  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete = confirm(
      "Yakin hapus gallery?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/galleries/${id}`
      );

      alert(
        "Gallery berhasil dihapus"
      );

      onSuccess();

    } catch (error) {

      console.log(error);
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
                  handleDelete(
                    gallery.id
                  )
                }
                className="bg-red-500 text-white px-4 py-2 rounded-xl w-full"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}