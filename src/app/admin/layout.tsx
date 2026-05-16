"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 ml-72">

        <Navbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}