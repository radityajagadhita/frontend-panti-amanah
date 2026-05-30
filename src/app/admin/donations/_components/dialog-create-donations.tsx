
"use client";

import { useEffect, useState } from "react";

import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";

export default function DialogCreateDonations({
  onSuccess,
}: any) {

  const [open, setOpen] = useState(false);

  const [banks, setBanks] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    donor_name: "",
    phone_number: "",
    tujuan: "",
    payment_method: "",
    bank_account_id: "",
    amount: "",
  });

  const [paymentProof, setPaymentProof] =
    useState<any>(null);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {

    try {

      const response = await api.get(
        "/bank-accounts"
      );

      setBanks(
        response.data.data || []
      );

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    setLoading(true);

    try {

      const formData = new FormData();

      Object.entries(form).forEach(
        ([key, value]) => {

          formData.append(
            key,
            String(value)
          );
        }
      );

      if (paymentProof) {

        formData.append(
          "payment_proof",
          paymentProof
        );
      }

      await api.post(
        "/donations",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setOpen(false);

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Donation berhasil dibuat",
      });

    } catch (error: any) {

      console.log(error.response?.data);

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal create donation",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-primary-500/30 transition-all font-medium"
      >
        Create Donation
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">

          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-white/40 w-[700px]">

            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Create Donation
              </h1>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                name="donor_name"
                placeholder="Donor Name"
                value={form.donor_name}
                onChange={handleChange}
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
              />

              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={form.phone_number}
                onChange={handleChange}
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
              />

              <input
                type="text"
                name="tujuan"
                placeholder="Tujuan Donasi"
                value={form.tujuan}
                onChange={handleChange}
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
              />

              <label> Metode Pembayaran</label>
              <select
                name="payment_method"
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                value={form.payment_method}
                onChange={handleChange}
              >
                <option value="" disabled>Pilih Metode Pembayaran</option>
                <option value="bank_transfer">Transfer bank</option>
                <option value="cash">Cash</option>
                <option value="qris">Qris</option>
                <option value="lainnya">Lainnya</option>
              </select>

              {form.payment_method === "bank_transfer" && (
                <select
                  name="bank_account_id"
                  value={
                    form.bank_account_id
                  }
                  onChange={handleChange}
                  className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                >

                  <option value="">
                    Pilih Rekening
                  </option>

                  {banks.map((bank: any) => (

                    <option
                      key={bank.id}
                      value={bank.id}
                    >
                      {bank.bank_name}
                    </option>

                  ))}

                </select>
              )}

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
              />

              <label className="flex items-center gap-4 border rounded-2xl px-5 py-4 cursor-pointer hover:border-black-500 transition-all">

                <span className="bg-gray-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
                  Choose File
                </span>

                <span className="text-gray-500 text-sm">
                  {
                    paymentProof
                      ? paymentProof.name
                      : "No file chosen"
                  }
                </span>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e: any) =>
                    setPaymentProof(
                      e.target.files[0]
                    )
                  }
                />

              </label>

              <div className="flex gap-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-primary-500/30 transition-all font-medium"
                >
                  {loading
                    ? "Loading..."
                    : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl transition-colors font-medium"
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

