"use client";

import { useState } from "react";

import api from "../../../../lib/api";
import AlertModal from "../../../../components/admin/alertModal";

export default function FormProfile({
  profile,
  onSuccess,
}: any) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: profile.email || "",
    phone_number: profile.phone_number || "",
    whatsapp_number: profile.whatsapp_number || "",
    whatsapp_link: profile.whatsapp_link || "",
    instagram: profile.instagram || "",
  });

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleChange = (e: any) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    setLoading(true);

    try {

      await api.put("/profile", form);

      onSuccess();

      setAlertModal({
        isOpen: true,
        type: "success",
        message: "Profile berhasil diupdate",
      });

    } catch (error: any) {

      console.log(error.response?.data);

      setAlertModal({
        isOpen: true,
        type: "error",
        message: "Gagal update profile",
      });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow">

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />
        
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <label className="block text-sm font-medium text-gray-700">Whatsapp Number</label>
        <input
          type="text"
          name="whatsapp_number"
          placeholder="Whatsapp Number"
          value={form.whatsapp_number}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <label className="block text-sm font-medium text-gray-700">Whatsapp Link</label>
        <input
          type="url"
          name="whatsapp_link"
          placeholder="Whatsapp Link"
          value={form.whatsapp_link}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <label className="block text-sm font-medium text-gray-700">akun instagram (tulis tanpa @)</label>
        <input
          type="string"
          name="instagram"
          placeholder="instagram"
          value={form.instagram}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Loading..." : "Save Profile"}
        </button>

      </form>

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal((s) => ({ ...s, isOpen: false }))}
        type={alertModal.type}
        message={alertModal.message}
      />

    </div>
  );
}