"use client";

import { useState } from "react";
import api from "../../../../lib/api";

import DialogDetailDonation from "./dialog-detail-donation";
import ConfirmModal from "../../../../components/admin/confirmModal";
import AlertModal from "../../../../components/admin/alertModal";

export default function ColumnTableDonations({
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
        `/donations/${id}`
      );

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Donation berhasil dihapus",
      });

    } catch (error) {
      console.log(error);

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal menghapus donation",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden h-[700px] flex flex-col">

      <div className="overflow-y-auto flex-1 scrollbar-thin">

        <table className="w-full">

        <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">

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
              Bank
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
                Rp{" "}
                  {Number(
                    donation.amount
                  ).toLocaleString("id-ID")}
              </td>

              <td className="p-4">
                {donation.tujuan}
              </td>

              <td className="p-4">

                <img
                  src={
                    donation.payment_proof
                  }
                  alt=""
                  className="w-20 h-20 object-cover rounded-xl border"
                />

              </td>

                <td className="p-4">{
                  donation.bank_account?.bank_name
                  || "-"
                }
                </td>

              <td className="p-4">

                <div className="flex gap-3">

                  <DialogDetailDonation
                    donation={donation}
                  />

                  <button
                    onClick={() =>
                      setDeleteId(donation.id)
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

      <ConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId !== null) handleDelete(deleteId);
        }}
        title="Hapus Donation"
        message="Apakah Anda yakin ingin menghapus data donation ini? Tindakan ini tidak dapat dibatalkan."
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