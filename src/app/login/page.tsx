"use client";

import { useForm } from "react-hook-form";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {
    router.push("/admin/dashboard");
  }

}, []);
  const { register, handleSubmit } = useForm();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post("/login", data);

      localStorage.setItem(
        "token",
        response.data.access_token
        );

      alert("Login berhasil");

      router.push("/admin/dashboard");

    } catch (error: any) {
  console.log(error.response?.data);

  alert("Login gagal");
      }
      const handleLogout = () => {

  localStorage.removeItem("token");

  router.push("/admin/login");
};
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
    </div>
  );
}