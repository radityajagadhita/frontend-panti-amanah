"use client";

import { useState } from "react";
import api from "../../../../lib/api";

import ConfirmModal from "../../../../components/admin/confirmModal";
import AlertModal from "../../../../components/admin/alertModal";
import DialogEditBankAccount from "./dialog-edit-bank-account";

export default function ColumnTableBankAccounts({
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
        `/bank-accounts/${id}`
      );

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Rekening berhasil dihapus",
      });

    } catch (error) {

      console.log(error);

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal menghapus rekening",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="overflow-y-auto flex-1 scrollbar-thin">

      <table className="w-full">

        <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">

          <tr>

            <th className="p-4 text-sm font-semibold text-gray-700 text-left">
              Bank
            </th>

            <th className="p-4 text-sm font-semibold text-gray-700 text-left">
              Account Name
            </th>

            <th className="p-4 text-sm font-semibold text-gray-700 text-left">
              Account Number
            </th>

            <th className="p-4 text-sm font-semibold text-gray-700 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((bank: any) => (

            <tr
              key={bank.id}
              className="border-t"
            >

              <td className="p-4 text-sm text-gray-600">
                {bank.bank_name}
              </td>

              <td className="p-4 text-sm text-gray-600">
                {bank.account_holder}
              </td>

              <td className="p-4 text-sm text-gray-600">
                {bank.account_number}
              </td>

              <td className="p-4 text-sm text-gray-600">

                <div className="flex gap-3">

                  <DialogEditBankAccount
                    bank={bank}
                    onSuccess={onSuccess}
                  />

                  <button
                    onClick={() =>
                      setDeleteId(bank.id)
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
        title="Hapus Rekening"
        message="Apakah Anda yakin ingin menghapus rekening ini? Tindakan ini tidak dapat dibatalkan."
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