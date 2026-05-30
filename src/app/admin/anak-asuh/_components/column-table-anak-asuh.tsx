"use client";
import { useState } from "react";
import api from "../../../../lib/api";
import DialogEditAnakAsuh from "./dialog-edit-anak-asuh";
import ConfirmModal from "../../../../components/admin/confirmModal";
import AlertModal from "../../../../components/admin/alertModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ColumnTableAnakAsuh({
  data,
  onSuccess,
  currentPage = 1,
  perPage = 10,
  total = 0,
  onPageChange,
}: {
  data: any[];
  onSuccess: () => void;
  currentPage?: number;
  perPage?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}) {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });
  const safeData = Array.isArray(data) ? data : [];

  const totalPages = Math.ceil(total / perPage);
  const from = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/anak-asuh/${id}`);
      onSuccess();
      setAlertModal({ isOpen: true, type: "success", message: "Anak asuh berhasil dihapus" });
    } catch (error) {
      console.log(error);
      setAlertModal({ isOpen: true, type: "error", message: "Gagal menghapus anak asuh" });
    } finally {
      setDeleteId(null);
    }
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="overflow-y-auto flex-1 scrollbar-thin">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-700 text-left">No</th>
              <th className="p-4 text-sm font-semibold text-gray-700 text-left">Photo</th>
              <th className="p-4 text-sm font-semibold text-gray-700 text-left">Name</th>
              <th className="p-4 text-sm font-semibold text-gray-700 text-left">Age</th>
              <th className="p-4 text-sm font-semibold text-gray-700 text-left">Gender</th>
              <th className="p-4 text-sm font-semibold text-gray-700 text-left">Education</th>
              <th className="p-4 text-sm font-semibold text-gray-700 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeData.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-400">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              data.map((child: any, index: number) => (
                <tr key={child.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-gray-500">
                    {(currentPage - 1) * perPage + index + 1}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <img
                      src={child.photo_url}
                      alt=""
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="p-4 text-sm text-gray-600">{child.name}</td>
                  <td className="p-4 text-sm text-gray-600">{child.age}</td>
                  <td className="p-4 text-sm text-gray-600">{child.gender}</td>
                  <td className="p-4 text-sm text-gray-600">{child.education}</td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex gap-3">
                      <DialogEditAnakAsuh child={child} onSuccess={onSuccess} />
                      <button
                        onClick={() => setDeleteId(child.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          {/* Info */}
          <p className="text-sm text-gray-500">
            Menampilkan <span className="font-medium text-gray-700">{from}–{to}</span> dari{" "}
            <span className="font-medium text-gray-700">{total}</span> data
          </p>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {getPageNumbers().map((page, i) =>
              page === "..." ? (
                <span key={`ellipsis-${i}`} className="px-2 text-gray-400 select-none">
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange?.(page as number)}
                  className={`min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-primary-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { if (deleteId !== null) handleDelete(deleteId); }}
        title="Hapus Anak Asuh"
        message="Apakah Anda yakin ingin menghapus data anak asuh ini? Tindakan ini tidak dapat dibatalkan."
      />
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal((s) => ({ ...s, isOpen: false }))}
        type={alertModal.type}
        message={alertModal.message}
      />
    </div>
  );
}