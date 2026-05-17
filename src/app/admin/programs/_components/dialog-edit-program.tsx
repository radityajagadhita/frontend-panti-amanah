"use client";

import { useState } from "react";
import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";

export default function DialogEditProgram({
  program,
  onSuccess,
}: any) {

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(program?.title || "");
  const [description, setDescription] = useState(program?.description || "");

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleUpdate = async (e: any) => {

    e.preventDefault();

    try {

      await api.put(`/programs/${program.id}`, {
        title,
        description,
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

          <div className="bg-white p-8 rounded-2xl w-[500px]">

            <h1 className="text-3xl font-bold mb-6">
              Edit Program
            </h1>

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
            >

              <input
                type="text"
                className="w-full border p-4 rounded-xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="w-full border p-4 rounded-xl h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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