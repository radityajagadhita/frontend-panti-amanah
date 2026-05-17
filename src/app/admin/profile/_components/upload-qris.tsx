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

      formData.append("qris_file", file);

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

  return (
    <div className="bg-white p-8 rounded-2xl shadow space-y-6">

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

        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Uploading..." : "Upload QRIS"}
        </button>

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