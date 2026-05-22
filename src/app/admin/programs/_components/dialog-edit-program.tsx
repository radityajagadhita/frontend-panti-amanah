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
      if (fileInputRef.current?.files?.[0]) {
        formData.append("images", fileInputRef.current.files[0]);
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
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
      >
        Edit
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-2xl w-[500px] max-h-[90vh] overflow-y-auto">

            <h1 className="text-3xl font-bold mb-6">
              Edit Program
            </h1>

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
            >

              <label>Judul Program</label>
              <input
                type="text"
                className="w-full border p-4 rounded-xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label>Deskripsi Program</label>
              <textarea
                className="w-full border p-4 rounded-xl h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <label>Gambar</label>
              <input
                type="file"
                placeholder="Images"
                className="w-full border p-4 rounded-xl"
                ref={fileInputRef}
              />

              <label>Tanggal</label>
              <input
                type="date"
                className="w-full border p-4 rounded-xl"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label>Lokasi</label>
              <input
                type="text"
                placeholder="Lokasi"
                className="w-full border p-4 rounded-xl"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <label>Waktu</label>
              <input
                type="time"
                className="w-full border p-4 rounded-xl"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

              <div className="flex gap-4">

                <button
                  type="submit"
                  className="bg-green-700 text-white px-5 py-3 rounded-xl"
                >
                  Update
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