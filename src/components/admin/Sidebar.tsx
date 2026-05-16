"use client";

import Link from "next/link";

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
  return (
    <aside className="w-72 bg-yellow-400 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-10">
        Admin Panel
      </h1>

      <nav className="space-y-4">

        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 hover:bg-yellow-500 p-3 rounded-xl"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/admin/programs"
          className="flex items-center gap-3 hover:bg-yellow-500 p-3 rounded-xl"
        >
          <FolderKanban size={20} />
          Programs
        </Link>

        <Link
          href="/admin/galleries"
          className="flex items-center gap-3 hover:bg-yellow-500 p-3 rounded-xl"
        >
          <Image size={20} />
          Galleries
        </Link>

        <Link
          href="/admin/anak-asuh"
          className="flex items-center gap-3 hover:bg-yellow-500 p-3 rounded-xl"
        >
          <Users size={20} />
          Anak Asuh
        </Link>

        <Link
          href="/admin/donations"
          className="flex items-center gap-3 hover:bg-yellow-500 p-3 rounded-xl"
        >
          <HeartHandshake size={20} />
          Donations
        </Link>

        <Link
          href="/admin/bank-accounts"
          className="flex items-center gap-3 hover:bg-yellow-500 p-3 rounded-xl"
        >
          <Banknote size={20} />
          Bank Accounts
        </Link>

        <Link
          href="/admin/locations"
          className="flex items-center gap-3 hover:bg-yellow-500 p-3 rounded-xl"
        >
          <MapPin size={20} />
          Locations
        </Link>

        <Link
          href="/admin/profile"
          className="flex items-center gap-3 hover:bg-yellow-500 p-3 rounded-xl"
        >
          <UserCircle size={20} />
          Profile
        </Link>

      </nav>
    </aside>
  );
}