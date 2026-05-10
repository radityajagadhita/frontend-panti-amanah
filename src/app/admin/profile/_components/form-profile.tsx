"use client";

import { useState } from "react";

import api from "../../../../lib/api";

export default function FormProfile({
  profile,
  onSuccess,
}: any) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: profile.email || "",
    email_information: profile.email_information || "",
    phone_number: profile.phone_number || "",
    Whatsapp_number: profile.Whatsapp_number || "",
    contact_information: profile.contact_information || "",
    Operational_information:
      profile.Operational_information || "",
    whatsapp_link: profile.whatsapp_link || "",
  });

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

      alert("Profile berhasil diupdate");

      onSuccess();

    } catch (error: any) {

      console.log(error.response?.data);

      alert("Gagal update profile");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow">

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <input
          type="text"
          name="Whatsapp_number"
          placeholder="Whatsapp Number"
          value={form.Whatsapp_number}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <input
          type="url"
          name="whatsapp_link"
          placeholder="Whatsapp Link"
          value={form.whatsapp_link}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <textarea
          name="email_information"
          placeholder="Email Information"
          value={form.email_information}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl h-24"
        />

        <textarea
          name="contact_information"
          placeholder="Contact Information"
          value={form.contact_information}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl h-24"
        />

        <textarea
          name="Operational_information"
          placeholder="Operational Information"
          value={form.Operational_information}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl h-24"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Loading..." : "Save Profile"}
        </button>

      </form>

    </div>
  );
}