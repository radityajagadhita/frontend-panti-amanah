"use client";

import { useState }
from "react";

import api from "../../../../lib/api";

export default function DialogCreateLocation({
  onSuccess,
}: any) {

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
    address: "",
    google_maps_url: "",
    });

  const handleChange = (
    e: any
  ) => {

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

      await api.post(
        "/locations",
        form
      );

      alert(
        "Location berhasil dibuat"
      );

      setOpen(false);

      onSuccess();

    } catch (error: any) {

      console.log(
        error.response?.data
      );

      alert(
        "Gagal create location"
      );
    }

    setLoading(false);
  };

  return (
    <>

      <button
        onClick={() =>
          setOpen(true)
        }
        className="bg-green-700 text-white px-5 py-3 rounded-xl"
      >
        Create Location
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-2xl w-[500px]">

            <h1 className="text-3xl font-bold mb-6">
              Create Location
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
                />

                <input
                type="text"
                name="google_maps_url"
                placeholder="Google Maps URL"
                value={form.google_maps_url}
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