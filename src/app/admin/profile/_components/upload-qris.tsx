"use client";

import { useState } from "react";

import api from "../../../../lib/api";

export default function UploadQris({
  profile,
  onSuccess,
}: any) {

  const [file, setFile] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: any) => {

    e.preventDefault();

    if (!file) {
      return alert("Pilih file QRIS");
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

      alert("QRIS berhasil diupload");

      onSuccess();

    } catch (error: any) {

      console.log(error.response?.data);

      alert("Gagal upload QRIS");
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

        <input
          type="file"
          accept="image/*"
          onChange={(e: any) =>
            setFile(e.target.files[0])
          }
          className="w-full border p-4 rounded-xl"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Uploading..." : "Upload QRIS"}
        </button>

      </form>

    </div>
  );
}