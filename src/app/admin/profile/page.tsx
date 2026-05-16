"use client";

import { useEffect, useState } from "react";

import api from "../../../lib/api";

import FormProfile from "./_components/form-profile";
import UploadQris from "./_components/upload-qris";

export default function ProfilePage() {

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const response = await api.get("/profile");
      console.log(response.data);


      setProfile(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-4xl font-bold">
          Profile Settings
        </h1>

        <p className="text-gray-500">
          Manage company profile panti
        </p>

      </div>

      <FormProfile
        profile={profile}
        onSuccess={fetchProfile}
      />

      <UploadQris
        profile={profile}
        onSuccess={fetchProfile}
      />

    </div>
  );
}