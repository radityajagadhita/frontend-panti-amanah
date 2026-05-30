"use client";

import { useState } from "react";

import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";

export default function DialogEditGalleries({
  gallery,
  onSuccess,
}: any) {

  const [open, setOpen] =
    useState(false);

  const [title, setTitle] =
    useState(gallery.title || "");

  const [image, setImage] =
    useState<any>(null);

  const [uploadedAt, setUploadedAt] =
    useState(
      gallery.uploaded_at || ""
    );

  const [loading, setLoading] =
    useState(false);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleSubmit = async (
    e: any
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "uploaded_at",
        uploadedAt
      );

      if (image) {

        formData.append(
          "image",
          image
        );
      }

      await api.post(
        `/galleries/${gallery.id}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setOpen(false);

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Gallery berhasil diupdate",
      });

    } catch (error: any) {

      console.log(
        error.response?.data
      );

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal update gallery",
      });
    }

    setLoading(false);
  };

  return (
    <>

      <button
        onClick={() => setOpen(true)}
        className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
      >
        Edit
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-white/40 w-[500px]">

            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Edit Gallery
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
                placeholder="Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e: any) =>
                  setImage(
                    e.target.files[0]
                  )
                }
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
              />

              {gallery.image_url && (

                <img
                  src={gallery.image_url}
                  alt={gallery.title}
                  className="w-full h-52 object-cover rounded-xl"
                />

              )}

              <div className="flex gap-3">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-5 py-3 rounded-xl"
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