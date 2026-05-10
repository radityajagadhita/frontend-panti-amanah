"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");

      router.push("/login");
  };

  return (
    <div className="bg-white border-b p-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Panti Amanah Admin
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-5 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}