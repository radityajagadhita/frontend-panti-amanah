"use client";

import api from "../../../../lib/api";

import DialogEditNeed
from "./dialog-edit-need";

export default function ColumnTableNeeds({
  data,
  onSuccess,
}: any) {

  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete = confirm(
      "Hapus need?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/needs/${id}`
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
              Title
            </th>

            <th className="p-4 text-left">
              Target
            </th>

            <th className="p-4 text-left">
              Bank
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((need: any) => (

            <tr
              key={need.id}
              className="border-t"
            >

              <td className="p-4">
                {need.title}
              </td>

              <td className="p-4">
                Rp
                {Number(
                  need.target_amount
                ).toLocaleString()}
              </td>

              <td className="p-4">
                {
                  need.bank_account
                    ?.bank_name
                }
              </td>

              <td className="p-4">

                <div className="flex gap-3">

                  <DialogEditNeed
                    need={need}
                    onSuccess={onSuccess}
                  />

                  <button
                    onClick={() =>
                      handleDelete(
                        need.id
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