"use client";

import { useRouter } from "next/navigation";
import { LogOut, Bell, Search } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 p-4 px-8 flex justify-between items-center sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4 bg-gray-100/80 px-4 py-2.5 rounded-xl border border-gray-200/50 w-96">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Cari sesuatu..." 
          className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-emerald-600 transition-colors relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-200"></div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl transition-colors font-medium text-sm border border-red-100"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </div>
  );
}