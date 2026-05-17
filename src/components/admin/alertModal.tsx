"use client";

import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: AlertType;
  title?: string;
  message?: string;
  /** Label for the close/confirm button */
  confirmLabel?: string;
}

const alertConfig: Record<
  AlertType,
  {
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    btnClass: string;
    defaultTitle: string;
  }
> = {
  success: {
    icon: <CheckCircle size={32} />,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    btnClass: "bg-green-500 hover:bg-green-600 text-white",
    defaultTitle: "Berhasil",
  },
  error: {
    icon: <XCircle size={32} />,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    btnClass: "bg-red-500 hover:bg-red-600 text-white",
    defaultTitle: "Gagal",
  },
  warning: {
    icon: <AlertTriangle size={32} />,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
    btnClass: "bg-yellow-500 hover:bg-yellow-600 text-white",
    defaultTitle: "Peringatan",
  },
  info: {
    icon: <Info size={32} />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    btnClass: "bg-blue-500 hover:bg-blue-600 text-white",
    defaultTitle: "Informasi",
  },
};

export default function AlertModal({
  isOpen,
  onClose,
  type = "success",
  title,
  message = "Aksi telah selesai dilakukan.",
  confirmLabel = "OK",
}: AlertModalProps) {
  if (!isOpen) return null;

  const config = alertConfig[type];
  const resolvedTitle = title ?? config.defaultTitle;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Tutup"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${config.iconBg} ${config.iconColor}`}
          >
            {config.icon}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          {resolvedTitle}
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">{message}</p>

        {/* Confirm button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className={`px-8 py-2 rounded-xl font-medium transition-colors ${config.btnClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
