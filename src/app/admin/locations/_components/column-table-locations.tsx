"use client";

import api from "../../../../lib/api";

import DialogEditLocation
from "./dialog-edit-location";

export default function ColumnTableLocations({
  data,
  onSuccess,
}: any) {

  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete = confirm(
      "Hapus location?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/locations/${id}`
      );

      alert(
        "Location berhasil dihapus"
      );

      onSuccess();

    } catch (error) {

      console.log(error);
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
                      handleDelete(
                        location.id
                      )
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

    </div>
  );
}