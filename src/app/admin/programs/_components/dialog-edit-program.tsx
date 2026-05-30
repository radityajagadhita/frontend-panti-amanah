"use client";

import { useState, useRef } from "react";
import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";

export default function DialogEditProgram({
  program,
  onSuccess,
}: any) {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(program?.title || "");
  const [description, setDescription] = useState(program?.description || "");
  const [date, setDate] = useState(program?.date || "");
  const [location, setLocation] = useState(program?.location || "");
  const [time, setTime] = useState(program?.time || "");
  const [removeImage, setRemoveImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleUpdate = async (e: any) => {

    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("_method", "PUT"); // Laravel method spoofing
      formData.append("title", title);
      formData.append("description", description);
      if (date) formData.append("date", date);
      if (location) formData.append("location", location);
      if (time) formData.append("time", time);

      // Kalau ada file gambar yang dipilih
      if (!removeImage && fileInputRef.current?.files?.[0]) {
        formData.append("images", fileInputRef.current.files[0]);
      }

      if (removeImage) {
        formData.append("remove_image", "1");
      }

      await api.post(`/programs/${program.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOpen(false);
      onSuccess();
      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Program berhasil diupdate",
      });

    } catch (error) {
      console.log(error);
      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal mengupdate program",
      });
    }
  };

  return (
    <>

      <button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/30 transition-all font-medium text-sm"
      >
        Edit
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-white/40 w-[500px] max-h-[90vh] overflow-y-auto scrollbar-hide">

            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Edit Program
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

              <label>Judul Program</label>
              <input
                type="text"
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label>Deskripsi Program</label>
              <textarea
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl h-32 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <label>Gambar</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  placeholder="Images"
                  className="flex-1 bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                  ref={fileInputRef}
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

              <label>Tanggal</label>
              <input
                type="date"
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label>Lokasi</label>
              <input
                type="text"
                placeholder="Lokasi"
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <label>Waktu</label>
              <input
                type="time"
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

              <div className="flex gap-4">

                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-primary-500/30 transition-all font-medium"
                >
                  Update
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