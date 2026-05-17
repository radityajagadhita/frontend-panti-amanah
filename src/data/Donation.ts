export interface BankAccount {
  id: number;
  bank_name: string;
  account_number: string;
  account_holder: string;
}

export interface Profile {
  qris_code: string | null;
  Whatsapp_number?: string;
  whatsapp_link?: string | null;
}