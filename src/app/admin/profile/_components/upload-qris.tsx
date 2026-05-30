"use client";

import { useState } from "react";

import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";

export default function UploadQris({
  profile,
  onSuccess,
}: any) {

  const [file, setFile] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "warning";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleUpload = async (e: any) => {

    e.preventDefault();

    if (!file) {
      setAlertModal({
        isOpen: true,
        type: "warning",
        message: "Pilih file QRIS terlebih dahulu",
      });
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("qris_code", file);

      await api.post(
        "/profile/qris",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "QRIS berhasil diupload",
      });

    } catch (error: any) {

      console.log(error.response?.data);

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal upload QRIS",
      });
    }

    setLoading(false);
  };

  const handleRemoveQris = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("remove_image", "1");

      await api.post("/profile/qris", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "QRIS berhasil dihapus",
      });

    } catch (error: any) {
      console.log(error.response?.data);
      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal menghapus QRIS",
      });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-white/40 shadow space-y-6">

      <div>

        <h2 className="text-3xl font-bold mb-4">
          QRIS
        </h2>

        {profile.qris_url && (

          <img
            src={profile.qris_url}
            alt=""
            className="w-72 rounded-2xl border"
          />

        )}

      </div>

      <form
        onSubmit={handleUpload}
        className="space-y-4"
      >

        <label className="flex items-center gap-4 border rounded-2xl px-5 py-4 cursor-pointer hover:border-yellow-500 transition-all">

  <span className="bg-gray-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
    Choose File
  </span>

  <span className="text-gray-500 text-sm">
    {
      file
        ? file.name
        : "No file chosen"
    }
  </span>

  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e: any) =>
      setFile(
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
            {loading ? "Loading..." : "Upload QRIS"}
          </button>

          {profile?.qris_url && (
            <button
              type="button"
              onClick={handleRemoveQris}
              disabled={loading}
              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-6 py-3 rounded-xl transition-colors font-medium"
            >
              Hapus QRIS
            </button>
          )}
        </div>

      </form>

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal((s) => ({ ...s, isOpen: false }))}
        type={alertModal.type}
        message={alertModal.message}
      />

    </div>
  );
}