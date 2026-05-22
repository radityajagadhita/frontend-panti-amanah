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
  const [education, setEducation] = useState("SD");
  const [educationLevel, setEducationLevel] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [status, setStatus] = useState("Dhuafa");
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
      formData.append("education_level", educationLevel);
      formData.append("tempat_lahir", tempatLahir);
      formData.append("status", status);
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

          <div className="bg-white p-8 max-h-[90vh] overflow-y-auto rounded-2xl w-[600px]">

            <h1 className="text-3xl font-bold mb-6">
              Create Anak Asuh
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <label> Nama Anak</label>
              <input
                type="text"
                placeholder="Nama"
                className="w-full border p-4 rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label> Umur Anak</label>
              <input
                type="number"
                placeholder="Umur"
                className="w-full border p-4 rounded-xl"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <label> Jenis Kelamin</label>
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
                className="w-full border p-4 rounded-xl"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              />

              <label> Tempat Lahir</label>
              <input
                type="text"
                placeholder="Tempat Lahir"
                className="w-full border p-4 rounded-xl"
                value={tempatLahir}
                onChange={(e) => setTempatLahir(e.target.value)}
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

              <label> Tanggal Lahir</label>
              <input
                type="date"
                placeholder="Tanggal lahir"
                className="w-full border p-4 rounded-xl"
                value={TanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
              />

              <label> Deskripsi</label>
              <textarea
                placeholder="Description"
                className="w-full border p-4 rounded-xl h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label> Foto (Jika ada)</label>

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