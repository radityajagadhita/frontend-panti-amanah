"use client";

import { useState } from "react";

export default function DialogDetailDonation({
  donation,
}: any) {

  const [open, setOpen] = useState(false);

  return (
    <>

      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        Detail
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-2xl w-[700px] max-h-[90vh] overflow-auto">

            <div className="flex justify-between items-center mb-6">

              <h1 className="text-3xl font-bold">
                Donation Detail
              </h1>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500"
              >
                ✕
              </button>

            </div>

            <div className="space-y-4">

              <div>

                <p className="text-gray-500">
                  Donor Name
                </p>

                <h2 className="text-2xl font-bold">
                  {donation.donor_name}
                </h2>

              </div>

              <div>

                <p className="text-gray-500">
                  Phone Number
                </p>

                <h2 className="text-xl">
                  {donation.phone_number}
                </h2>

              </div>

              <div>

                <p className="text-gray-500">
                  Tujuan
                </p>

                <h2 className="text-xl">
                  {donation.tujuan}
                </h2>

              </div>

              <div>

                <p className="text-gray-500">
                  Amount
                </p>

                <h2 className="text-3xl font-bold text-green-700">
                  {`Rp ${Number(donation.amount)
                    .toLocaleString
                    ("id-ID")}`
                  }
                </h2>

              </div>

              <div>

                <p className="text-gray-500 mb-3">
                  Payment Proof
                </p>

                <img
                  src={
                    donation.payment_proof
                  }
                  alt=""
                  className="w-full rounded-2xl border"
                />

              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}