"use client";

import { useState } from "react";
import api from "../../../../lib/api";

export default function DialogCreateProgram({
  onSuccess,
}: any) {

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    setLoading(true);

    try {

      await api.post("/programs", {
        title,
        description,
      });

      alert("Program berhasil dibuat");

      setOpen(false);

      setTitle("");
      setDescription("");

      onSuccess();

    } catch (error: any) {

      console.log(error.response?.data);

      alert("Gagal create program");
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

              <input
                type="text"
                placeholder="Program title"
                className="w-full border p-4 rounded-xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <textarea
                placeholder="Program description"
                className="w-full border p-4 rounded-xl h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
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

    </>
  );
}