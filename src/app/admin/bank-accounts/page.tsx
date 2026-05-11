"use client";

import { useEffect, useState } from "react";

import api from "../../../lib/api";

import ColumnTableBankAccounts
from "./_components/column-table-bank-accounts";

import DialogCreateBankAccount
from "./_components/dialog-create-bank-account";

export default function BankAccountsPage() {

  const [banks, setBanks] = useState([]);

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {

    try {

      const response = await api.get(
        "/bank-accounts"
      );

      setBanks(
        response.data.data || []
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Bank Accounts
          </h1>

          <p className="text-gray-500">
            Manage bank accounts
          </p>

        </div>

        <DialogCreateBankAccount
          onSuccess={fetchBanks}
        />

      </div>

      <ColumnTableBankAccounts
        data={banks}
        onSuccess={fetchBanks}
      />

    </div>
  );
}