"use client";

import { useForm } from "react-hook-form";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AlertModal from "@/src/components/admin/alertModal"; 
import { Mail, Lock, LogIn, Leaf, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleAlertClose = () => {
    setAlertState({ ...alertState, isOpen: false });
    if (alertState.type === "success") {
      router.push("/admin/dashboard");
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await api.post("/login", data);

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      setAlertState({
        isOpen: true,
        type: "success",
        title: "Berhasil",
        message: "Login berhasil, mengalihkan ke dashboard...",
      });

    } catch (error: any) {
      console.log(error.response?.data);

      setAlertState({
        isOpen: true,
        type: "error",
        title: "Gagal",
        message: error.response?.data?.message || "Login gagal. Silakan cek email dan password Anda.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-emerald-50 p-4 relative overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="h-16 w-16 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 mb-6 transform -rotate-6 hover:rotate-0 transition-all duration-300">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Admin Login
          </h1>
          <p className="text-gray-500 mt-2 text-center text-sm leading-relaxed">
            Masuk ke panel admin Panti Amanah untuk mengelola konten dan data.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
              Alamat Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input
                {...register("email")}
                type="email"
                placeholder="email"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none shadow-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
              Kata Sandi
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none shadow-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-500 hover:to-emerald-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-primary-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <LogIn className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>

      <AlertModal
        isOpen={alertState.isOpen}
        onClose={handleAlertClose}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
      />
    </div>
  );
}