"use client";

import { useState } from "react";

import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";

export default function DialogCreateGallery({
  onSuccess,
}: any) {

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "warning";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    if (!image) {
      setAlertModal({
        isOpen: true,
        type: "warning",
        message: "Image wajib dipilih",
      });
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("image", image);

      formData.append(
        "uploaded_at",
        new Date().toISOString()
      );

      await api.post("/galleries", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOpen(false);

      setTitle("");
      setImage(null);

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Gallery berhasil dibuat",
      });

    } catch (error: any) {

      console.log(error.response?.data);

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal upload gallery",
      });
    }

    setLoading(false);
  };

  return (
    <>

      <button
        onClick={() => setOpen(true)}
        className="bg-green-700 text-white px-5 py-3 rounded-xl"
      >
        Upload Gallery
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-2xl w-[500px]">

            <h1 className="text-3xl font-bold mb-6">
              Upload Gallery
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Gallery title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-4 rounded-xl"
              />

              <label className="flex items-center gap-4 border rounded-2xl px-5 py-4 cursor-pointer hover:border-black-500 transition-all">

                <span className="bg-gray-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
                  Choose File
                </span>

                <span className="text-gray-500 text-sm">
                  {
                    image
                      ? image.name
                      : "No file chosen"
                  }
                </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e: any) =>
                  setImage(e.target.files[0])
                }
              />

              </label>

              <div className="flex gap-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-700 text-white px-5 py-3 rounded-xl"
                >
                  {loading ? "Uploading..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-300 px-5 py-3 rounded-xl"
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