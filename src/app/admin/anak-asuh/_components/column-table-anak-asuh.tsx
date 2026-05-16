"use client";

import api from "../../../../lib/api";
import DialogEditAnakAsuh from "./dialog-edit-anak-asuh";

export default function ColumnTableAnakAsuh({
  data,
  onSuccess,
}: any) {

  const handleDelete = async (id: number) => {

    const confirmDelete = confirm(
      "Yakin hapus anak asuh?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/anak-asuh/${id}`);

      alert("Berhasil dihapus");

      onSuccess();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="overflow-y-auto flex-1 scrollbar-thin">

      <table className="w-full">

        <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">

          <tr>

            <th className="p-4 text-left">
              Photo
            </th>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Age
            </th>

            <th className="p-4 text-left">
              Gender
            </th>

            <th className="p-4 text-left">
              Education
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((child: any) => (

            <tr
              key={child.id}
              className="border-t"
            >

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
                    onClick={() => handleDelete(child.id)}
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

    </div>
  );
}