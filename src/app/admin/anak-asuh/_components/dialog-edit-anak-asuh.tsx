"use client";

import { useState } from "react";

import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";

export default function DialogEditAnakAsuh({
  child,
  onSuccess,
}: any) {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(child.name || "");
  const [age, setAge] = useState(child.age);
  const [education, setEducation] = useState(child.education);
  const [educationLevel, setEducationLevel] = useState(child.education_level || "");
  const [tempatLahir, setTempatLahir] = useState(child.tempat_lahir || "");
  const [status, setStatus] = useState(child.status || "Dhuafa");

  const [description, setDescription] = useState(
    child.description || ""
  );

  const [photo, setPhoto] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleUpdate = async (e: any) => {

    e.preventDefault();

    setLoading(true);

    try {

      const formData = new FormData();
      formData.append("name", name);
      formData.append("age", age);
      formData.append("education", education);
      formData.append("education_level", educationLevel);
      formData.append("tempat_lahir", tempatLahir);
      formData.append("status", status);
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

      setOpen(false);

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Data berhasil diupdate",
      });

    } catch (error: any) {

      console.log(error.response?.data);

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal update data anak asuh",
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

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">

          <div className="bg-white p-8 rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto">

            <h1 className="text-3xl font-bold mb-6">
              Edit Anak Asuh
            </h1>

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
            >

              <label> Nama</label>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-4 rounded-xl"
              />

              <label> Umur</label>
              <input
                type="number"
                placeholder="Umur"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border p-4 rounded-xl"
              />

              <label> Pendidikan</label>
              <select
                className="w-full border p-4 rounded-xl"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                <option value="Tidak Sekolah">Tidak Sekolah</option>
                <option value="TK">TK</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="SMK">SMK</option>
                <option value="Kuliah">Kuliah</option>
              </select>

              <label> Tingkat Pendidikan</label>
              <input
                type="text"
                placeholder="Tingkat Pendidikan"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full border p-4 rounded-xl"
              />

              <label> Tempat Lahir</label>
              <input
                type="text"
                placeholder="Tempat Lahir"
                value={tempatLahir}
                onChange={(e) => setTempatLahir(e.target.value)}
                className="w-full border p-4 rounded-xl"
              />

              <label> Status</label>
              <select
                className="w-full border p-4 rounded-xl"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Dhuafa">Dhuafa</option>
                <option value="Yatim">Yatim</option>
                <option value="Piatu">Piatu</option>
              </select>

              <label> Deskripsi</label>
              <textarea
                placeholder="Deskripsi"
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

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal((s) => ({ ...s, isOpen: false }))}
        type={alertModal.type}
        message={alertModal.message}
      />

    </>
  );
}