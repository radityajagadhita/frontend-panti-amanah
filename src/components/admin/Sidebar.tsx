"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Image,
  Users,
  HeartHandshake,
  Banknote,
  MapPin,
  UserCircle,
  FolderKanban,
  HandCoins,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/programs", icon: FolderKanban, label: "Programs" },
    { href: "/admin/galleries", icon: Image, label: "Galleries" },
    { href: "/admin/anak-asuh", icon: Users, label: "Anak Asuh" },
    { href: "/admin/donations", icon: HeartHandshake, label: "Donations" },
    { href: "/admin/bank-accounts", icon: Banknote, label: "Bank Accounts" },
    { href: "/admin/locations", icon: MapPin, label: "Locations" },
    { href: "/admin/profile", icon: UserCircle, label: "Profile" },
  ];

  return (
    <aside className="w-72 bg-green-600 text-white min-h-screen p-6 fixed overflow-y-auto z-50">
      <h1 className="text-3xl font-bold mb-10">
        Admin Panel
      </h1>

      <nav className="space-y-5">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-2 transition-colors ${
                isActive ? "border-b-2 border-white font-bold" : "hover:bg-green-500/50"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}