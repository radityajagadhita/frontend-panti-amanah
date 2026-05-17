"use client";

import { useState } from "react";

import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";

export default function DialogCreateAnakAsuh({
  onSuccess,
}: any) {

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Laki-laki");
  const [education, setEducation] = useState("");
  const [badge, setBadge] = useState("");
  const [TanggalLahir, setTanggalLahir] = useState("");
  const [description, setDescription] = useState("");

  const [photo, setPhoto] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("education", education);
      formData.append("badge", badge);
      formData.append("tanggal_lahir", TanggalLahir);
      formData.append("description", description);

      if (photo) {
        formData.append("photo", photo);
      }

      await api.post("/anak-asuh", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOpen(false);

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Anak asuh berhasil dibuat",
      });

    } catch (error: any) {

      console.log(error.response?.data);

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal create anak asuh",
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
        Create Anak Asuh
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">

          <div className="bg-white p-8 rounded-2xl w-[600px]">

            <h1 className="text-3xl font-bold mb-6">
              Create Anak Asuh
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Nama"
                className="w-full border p-4 rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="number"
                placeholder="Umur"
                className="w-full border p-4 rounded-xl"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <select
                className="w-full border p-4 rounded-xl"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Laki-laki">
                  Laki-laki
                </option>

                <option value="Perempuan">
                  Perempuan
                </option>
              </select>

              <input
                type="text"
                placeholder="Pendidikan"
                className="w-full border p-4 rounded-xl"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />

              <input
                type="text"
                placeholder="Badge"
                className="w-full border p-4 rounded-xl"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
              />

              <input
                type="date"
                placeholder="Tanggal lahir"
                className="w-full border p-4 rounded-xl"
                value={TanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
              />

              <textarea
                placeholder="Description"
                className="w-full border p-4 rounded-xl h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label className="flex items-center gap-4 border rounded-2xl px-5 py-4 cursor-pointer hover:border-black-500 transition-all">

                <span className="bg-gray-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
                  Choose File
                </span>

                <span className="text-gray-500 text-sm">
                  {
                    photo
                      ? photo.name
                      : "No file chosen"
                  }
                </span>
              
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e: any) =>
                  setPhoto(e.target.files[0])
                }
              />

              </label>

              <div className="flex gap-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-700 text-white px-5 py-3 rounded-xl"
                >
                  {loading ? "Loading..." : "Save"}
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