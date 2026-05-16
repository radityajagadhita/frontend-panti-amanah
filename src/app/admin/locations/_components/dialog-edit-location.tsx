"use client";

import { useState }
from "react";

import api from "../../../../lib/api";

export default function DialogEditLocation({
  location,
  onSuccess,
}: any) {

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      address:
        location.address || "",
      google_maps_url:
        location.google_maps_url || "",
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

      await api.put(
        `/locations/${location.id}`,
        form
      );

      alert(
        "Location berhasil diupdate"
      );

      setOpen(false);

      onSuccess();

    } catch (error: any) {

      console.log(
        error.response?.data
      );

      alert(
        "Gagal update location"
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
        className="bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        Edit
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-2xl w-[500px]">

            <h1 className="text-3xl font-bold mb-6">
              Edit Location
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl"
                />

                <input
                type="text"
                name="google_maps_url"
                value={form.google_maps_url}
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