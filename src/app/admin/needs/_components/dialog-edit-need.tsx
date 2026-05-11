"use client";

import {
  useEffect,
  useState,
} from "react";

import api from "../../../../lib/api";

export default function DialogEditNeed({
  need,
  onSuccess,
}: any) {

  const [open, setOpen] =
    useState(false);

  const [banks, setBanks] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    title: need.title || "",
    description:
      need.description || "",
    photo: need.photo || "",
    bank_account_id:
      need.bank_account_id || "",
    target_amount:
      need.target_amount || "",
  });

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
        `/needs/${need.id}`,
        form
      );

      alert(
        "Need berhasil diupdate"
      );

      setOpen(false);

      onSuccess();

    } catch (error: any) {

      console.log(
        error.response?.data
      );

      alert(
        "Gagal update need"
      );
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

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">

          <div className="bg-white p-8 rounded-2xl w-[700px]">

            <h1 className="text-3xl font-bold mb-6">
              Edit Need
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl h-32"
              />

              <input
                type="text"
                name="photo"
                value={form.photo}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
              />

              <select
                name="bank_account_id"
                value={form.bank_account_id}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
              >

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
                name="target_amount"
                value={form.target_amount}
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

    </>
  );
}