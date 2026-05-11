"use client";

import {
  useEffect,
  useState,
} from "react";

import api from "../../../../lib/api";

export default function DialogCreateNeed({
  onSuccess,
}: any) {

  const [open, setOpen] =
    useState(false);

  const [banks, setBanks] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    photo: null,
    bank_account_id: "",
    target_amount: "",
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

      const formData = new FormData();

        Object.entries(form).forEach(
        ([key, value]: any) => {

            if (value !== null) {

            formData.append(
                key,
                value
            );
            }
        }
        );

        await api.post(
        "/needs",
        formData,
        {
            headers: {
            "Content-Type":
                "multipart/form-data",
            },
        }
        );

      alert(
        "Need berhasil dibuat"
      );

      setOpen(false);

      onSuccess();

    } catch (error: any) {

      console.log(
        error.response?.data
      );

      alert(
        "Gagal create need"
      );
    }

    setLoading(false);
  };

  return (
    <>

      <button
        onClick={() => setOpen(true)}
        className="bg-green-700 text-white px-5 py-3 rounded-xl"
      >
        Create Need
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">

          <div className="bg-white p-8 rounded-2xl w-[700px]">

            <h1 className="text-3xl font-bold mb-6">
              Create Need
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl h-32"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e: any) =>
                    setForm({
                    ...form,
                    photo: e.target.files[0],
                    })
                }
                className="w-full border p-4 rounded-xl"
                />

              <select
                name="bank_account_id"
                value={form.bank_account_id}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
              >

                <option value="">
                  Select Bank
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
                name="target_amount"
                placeholder="Target Amount"
                value={form.target_amount}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
              />

              <div className="flex gap-3">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-700 text-white px-5 py-3 rounded-xl"
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