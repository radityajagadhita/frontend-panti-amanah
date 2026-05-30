"use client";

import { useState }
from "react";

import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";

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

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

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

      setOpen(false);

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Location berhasil dibuat",
      });

    } catch (error: any) {

      console.log(
        error.response?.data
      );

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal create location",
      });
    }

    setLoading(false);
  };

  return (
    <>

      <button
        onClick={() =>
          setOpen(true)
        }
        className="bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-primary-500/30 transition-all font-medium"
      >
        Create Location
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-white/40 w-[500px]">

            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Create Location
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
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                />

                <input
                type="text"
                name="google_maps_url"
                placeholder="Google Maps URL (link)"
                value={form.google_maps_url}
                onChange={handleChange}
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                />

              <div className="flex gap-3">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-primary-500/30 transition-all font-medium"
                >
                  Save
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