"use client";

import api from "../../../../lib/api";

import DialogDetailDonation
from "./dialog-detail-donation";

export default function ColumnTableDonations({
  data,
  onSuccess,
}: any) {

  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete = confirm(
      "Yakin hapus donation?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/donations/${id}`
      );

      alert("Donation berhasil dihapus");

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
              Donor
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Tujuan
            </th>

            <th className="p-4 text-left">
              Proof
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((donation: any) => (

            <tr
              key={donation.id}
              className="border-t"
            >

              <td className="p-4">
                {donation.donor_name}
              </td>

              <td className="p-4 font-bold text-green-700">
                Rp {donation.amount}
              </td>

              <td className="p-4">
                {donation.tujuan}
              </td>

              <td className="p-4">

                <img
                  src={
                    donation.payment_proof_url
                  }
                  alt=""
                  className="w-20 h-20 object-cover rounded-xl border"
                />

              </td>

              <td className="p-4">

                <div className="flex gap-3">

                  <DialogDetailDonation
                    donation={donation}
                  />

                  <button
                    onClick={() =>
                      handleDelete(
                        donation.id
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