"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Users,
  HeartHandshake,
  Banknote,
  MapPin,
  UserCircle,
  FolderKanban,
  Leaf,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/programs", icon: FolderKanban, label: "Programs" },
    { href: "/admin/galleries", icon: ImageIcon, label: "Galleries" },
    { href: "/admin/anak-asuh", icon: Users, label: "Anak Asuh" },
    { href: "/admin/donations", icon: HeartHandshake, label: "Donations" },
    { href: "/admin/bank-accounts", icon: Banknote, label: "Bank Accounts" },
    { href: "/admin/locations", icon: MapPin, label: "Locations" },
    { href: "/admin/profile", icon: UserCircle, label: "Profile" },
  ];

  return (
    <aside className="w-72 bg-emerald-950 text-emerald-50 min-h-screen p-6 fixed overflow-y-auto z-50 border-r border-emerald-900 shadow-2xl">
      <div className="flex items-center gap-3 mb-10 px-2 mt-2">
        <div className="bg-gradient-to-br from-primary-400 to-emerald-500 p-2 rounded-xl shadow-lg">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-100 to-primary-200 tracking-tight">
          Panti Amanah
        </h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-primary-600 to-emerald-600 text-white shadow-md shadow-primary-900/50 font-medium"
                  : "hover:bg-emerald-900/50 hover:text-white text-emerald-200/80"
              }`}
            >
              <item.icon
                size={22}
                className={`${
                  isActive
                    ? "text-white"
                    : "text-emerald-400 group-hover:text-emerald-300"
                } transition-colors`}
              />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}