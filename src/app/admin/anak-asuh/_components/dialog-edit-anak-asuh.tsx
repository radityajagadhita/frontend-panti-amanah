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
  const [removeImage, setRemoveImage] = useState(false);

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

      if (photo && !removeImage) {
        formData.append("photo", photo);
      }
      
      if (removeImage) {
        formData.append("remove_image", "1");
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

          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-white/40 w-[600px] max-h-[90vh] overflow-y-auto scrollbar-hide">

            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Edit Anak Asuh
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
              onSubmit={handleUpdate}
              className="space-y-4"
            >

              <label> Nama</label>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
              />

              <label> Umur</label>
              <input
                type="number"
                placeholder="Umur"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
              />

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
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
              />

              <label> Tempat Lahir</label>
              <input
                type="text"
                placeholder="Tempat Lahir"
                value={tempatLahir}
                onChange={(e) => setTempatLahir(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
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

              <label> Deskripsi</label>
              <textarea
                placeholder="Deskripsi"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl h-32 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none resize-none"
              />

              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e: any) =>
                    setPhoto(e.target.files[0])
                  }
                  className="flex-1 bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                  disabled={removeImage}
                />
                <label className="flex items-center gap-2 cursor-pointer text-sm text-red-500 font-medium whitespace-nowrap bg-red-50 px-4 py-4 rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={removeImage}
                    onChange={(e) => setRemoveImage(e.target.checked)}
                    className="w-4 h-4 text-red-500 rounded border-red-200 focus:ring-red-500"
                  />
                  Hapus Gambar
                </label>
              </div>

              <div className="flex gap-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-primary-500/30 transition-all font-medium"
                >
                  {loading ? "Loading..." : "Update"}
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