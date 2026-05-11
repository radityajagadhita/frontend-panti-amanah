"use client";

import api from "../../../../lib/api";

export default function ColumnTableBankAccounts({
  data,
  onSuccess,
}: any) {

  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete = confirm(
      "Hapus rekening?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/bank-accounts/${id}`
      );

      onSuccess();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">
              Bank
            </th>

            <th className="p-4 text-left">
              Account Name
            </th>

            <th className="p-4 text-left">
              Account Number
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((bank: any) => (

            <tr
              key={bank.id}
              className="border-t"
            >

              <td className="p-4">
                {bank.bank_name}
              </td>

              <td className="p-4">
                {bank.account_name}
              </td>

              <td className="p-4">
                {bank.account_number}
              </td>

              <td className="p-4">

                <button
                  onClick={() =>
                    handleDelete(bank.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-xl"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}