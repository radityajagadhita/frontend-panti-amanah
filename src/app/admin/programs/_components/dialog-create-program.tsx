"use client";

import { useState, useRef } from "react";
import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";
// HAPUS: import { time } from "console"; // ini import yang salah!

export default function DialogCreateProgram({ onSuccess }: any) {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null); // tambah ref

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(); // pakai FormData seperti di edit

      formData.append("title", title);
      formData.append("description", description);
      if (date) formData.append("date", date);
      if (location) formData.append("location", location);
      if (time) formData.append("time", time.slice(0, 5)); // trim detik

      if (fileInputRef.current?.files?.[0]) {
        formData.append("images", fileInputRef.current.files[0]);
      }

      await api.post("/programs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOpen(false);
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setTime("");
      if (fileInputRef.current) fileInputRef.current.value = ""; // reset file input

      onSuccess();

      setAlertModal({ isOpen: true, type: "success", message: "Program berhasil dibuat" });

    } catch (error: any) {
      console.log(error.response?.data);
      setAlertModal({ isOpen: true, type: "error", message: "Gagal create program" });
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-primary-500/30 transition-all font-medium"
      >
        Create Program
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-white/40 w-[500px] max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Create Program
              </h1>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <label>Judul Program</label>
              <input
                type="text"
                placeholder="Program title"
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <textarea
                placeholder="Deskripsi Program"
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl h-32 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <label>Gambar (Jika ada)</label>
              <input
                type="file"
                ref={fileInputRef}
                className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                // HAPUS value dan onChange
              />

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