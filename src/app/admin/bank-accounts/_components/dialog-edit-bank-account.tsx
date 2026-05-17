"use client";

import { useState } from "react";

import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";

export default function DialogEditBankAccount({
  bank,
  onSuccess,
}: any) {

  const [open, setOpen] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    bank_name: bank.bank_name || "",
    account_holder:
      bank.account_holder || "",
    account_number:
      bank.account_number || "",
  });

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleChange = (e: any) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: any
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      await api.put(
        `/bank-accounts/${bank.id}`,
        form
      );

      setOpen(false);

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Bank account berhasil diupdate",
      });

    } catch (error: any) {

      console.log(
        error.response?.data
      );

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal update bank account",
      });
    }

    setLoading(false);
  };

  return (
    <>

      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        Edit
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-2xl w-[500px]">

            <h1 className="text-3xl font-bold mb-6">
              Edit Bank Account
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                name="bank_name"
                placeholder="Bank Name"
                value={form.bank_name}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="text"
                name="account_holder"
                placeholder="Account Holder"
                value={form.account_holder}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="text"
                name="account_number"
                placeholder="Account Number"
                value={form.account_number}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
              />

              <div className="flex gap-3">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-5 py-3 rounded-xl"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="bg-gray-300 px-5 py-3 rounded-xl"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal((s) => ({ ...s, isOpen: false }))}
        type={alertModal.type}
        message={alertModal.message}
      />

    </>
  );
}