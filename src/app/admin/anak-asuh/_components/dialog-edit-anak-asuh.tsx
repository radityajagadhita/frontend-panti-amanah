"use client";

import { useState } from "react";

import api from "../../../../lib/api";

export default function DialogEditAnakAsuh({
  child,
  onSuccess,
}: any) {

  const [open, setOpen] = useState(false);

  const [age, setAge] = useState(child.age);
  const [education, setEducation] = useState(child.education);

  const [badge, setBadge] = useState(child.badge || "");

  const [description, setDescription] = useState(
    child.description || ""
  );

  const [photo, setPhoto] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: any) => {

    e.preventDefault();

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("age", age);
      formData.append("education", education);
      formData.append("badge", badge);
      formData.append("description", description);

      if (photo) {
        formData.append("photo", photo);
      }

      await api.post(
        `/anak-asuh/${child.id}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Data berhasil diupdate");

      setOpen(false);

      onSuccess();

    } catch (error: any) {

      console.log(error.response?.data);

      alert("Gagal update");
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

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">

          <div className="bg-white p-8 rounded-2xl w-[600px]">

            <h1 className="text-3xl font-bold mb-6">
              Edit Anak Asuh
            </h1>

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
            >

              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="text"
                placeholder="Education"
                value={education}
                onChange={(e) =>
                  setEducation(e.target.value)
                }
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="text"
                placeholder="Badge"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full border p-4 rounded-xl"
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full border p-4 rounded-xl h-32"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e: any) =>
                  setPhoto(e.target.files[0])
                }
                className="w-full border p-4 rounded-xl"
              />

              <div className="flex gap-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-700 text-white px-5 py-3 rounded-xl"
                >
                  {loading ? "Loading..." : "Update"}
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

    </>
  );
}