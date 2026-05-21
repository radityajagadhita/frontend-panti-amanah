export interface BankAccount {
  id: number;
  bank_name: string;
  account_number: string;
  account_holder: string;
}

export interface Donation {
  id: number;
  payment_method: string;
  amount: number;
  bank_account: BankAccount | null;
}

export interface Profile {
  qris_code: string | null;
  Whatsapp_number?: string;
  whatsapp_link?: string | null;
}