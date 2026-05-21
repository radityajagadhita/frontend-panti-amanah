"use client";

import { useState } from "react";
import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";
import { time } from "console";

export default function DialogCreateProgram({
  onSuccess,
}: any) {

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

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

      await api.post("/programs", {
        title,
        description,
        images,
        date: date || null,
        location: location || null,
        time: time || null,
      });

      setOpen(false);

      setTitle("");
      setDescription("");
      setImages("");
      setDate("");
      setLocation("");
      setTime("");

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Program berhasil dibuat",
      });

    } catch (error: any) {

      console.log(error.response?.data);

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal create program",
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
        Create Program
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-[500px]">

            <h1 className="text-3xl font-bold mb-6">
              Create Program
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <label>Judul Program</label>
              <input
                type="text"
                placeholder="Program title"
                className="w-full border p-4 rounded-xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <textarea
                placeholder="Deskripsi Program"
                className="w-full border p-4 rounded-xl h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <label>Gambar (URL atau nama file)</label>
              <input
                type="text"
                placeholder="Images"
                className="w-full border p-4 rounded-xl"
                value={images}
                onChange={(e) => setImages(e.target.value)}
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