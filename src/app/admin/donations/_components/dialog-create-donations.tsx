
"use client";

import { useEffect, useState } from "react";

import api from "../../../../lib/api";

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
    bank_account_id: "",
    amount: "",
  });

  const [paymentProof, setPaymentProof] =
    useState<any>(null);

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

      alert("Donation berhasil dibuat");

      setOpen(false);

      onSuccess();

    } catch (error: any) {

      console.log(error.response?.data);

      alert("Gagal create donation");
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-green-700 text-white px-5 py-3 rounded-xl"
      >
        Create Donation
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">

          <div className="bg-white p-8 rounded-2xl w-[700px]">

            <h1 className="text-3xl font-bold mb-6">
              Create Donation
            </h1>

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
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={form.phone_number}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="text"
                name="tujuan"
                placeholder="Tujuan"
                value={form.tujuan}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
              />

              <select
                name="bank_account_id"
                value={
                  form.bank_account_id
                }
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
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

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
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
                  className="bg-green-700 text-white px-5 py-3 rounded-xl"
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
                  className="bg-gray-300 px-5 py-3 rounded-xl"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}
    </>
  );
}

