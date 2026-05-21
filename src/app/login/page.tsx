"use client";

import { useForm } from "react-hook-form";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AlertModal from "@/src/components/admin/alertModal"; 

export default function LoginPage() {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          Admin Login
        </h1>

        <div className="space-y-5">

          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full border p-4 rounded-xl"
          />

          <button
            className="w-full bg-green-700 text-white py-4 rounded-xl"
          >
            Login
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