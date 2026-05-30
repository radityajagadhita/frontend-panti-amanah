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
        className="bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-primary-500/30 transition-all font-medium"
      >
        Create Anak Asuh
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">

          <div className="bg-white p-8 max-h-[90vh] overflow-y-auto scrollbar-hide rounded-2xl w-[600px]">

            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Create Anak Asuh
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
              <label> Nama Anak</label>
              <input
                type="text"
                placeholder="Nama"
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label> Umur Anak</label>
              <input
                type="number"
                placeholder="Umur"
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <label> Jenis Kelamin</label>
              <select
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
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
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
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
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              />

              <label> Tempat Lahir</label>
              <input
                type="text"
                placeholder="Tempat Lahir"
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                value={tempatLahir}
                onChange={(e) => setTempatLahir(e.target.value)}
              />

              <label> Status</label>
              <select
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
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
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                value={TanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
              />

              <label> Deskripsi</label>
              <textarea
                placeholder="Description"
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl h-32 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none resize-none"
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
                  className="bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-primary-500/30 transition-all font-medium"
                >
                  {loading ? "Loading..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
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