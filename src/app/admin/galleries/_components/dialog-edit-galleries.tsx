"use client";

import { useState } from "react";

import api from "../../../../lib/api";

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

      alert(
        "Gallery berhasil diupdate"
      );

      setOpen(false);

      onSuccess();

    } catch (error: any) {

      console.log(
        error.response?.data
      );

      alert(
        "Gagal update gallery"
      );
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

          <div className="bg-white p-8 rounded-2xl w-[500px]">

            <h1 className="text-3xl font-bold mb-6">
              Edit Gallery
            </h1>

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
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="date"
                value={uploadedAt}
                onChange={(e) =>
                  setUploadedAt(
                    e.target.value
                  )
                }
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e: any) =>
                  setImage(
                    e.target.files[0]
                  )
                }
                className="w-full border p-4 rounded-xl"
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