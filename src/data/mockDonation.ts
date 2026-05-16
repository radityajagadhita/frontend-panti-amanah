export interface BankAccount {
  id: number;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountHolder: string;
  logoColor: string;
}

export const bankAccounts: BankAccount[] = [
  {
    id: 1,
    bankName: "Bank Central Asia",
    bankCode: "BCA",
    accountNumber: "123 456 7890",
    accountHolder: "Yayasan Panti Amanah",
    logoColor: "from-blue-500 to-blue-700",
  },
  {
    id: 2,
    bankName: "Bank Mandiri",
    bankCode: "MANDIRI",
    accountNumber: "1234 5678 9012 34",
    accountHolder: "Yayasan Panti Amanah",
    logoColor: "from-yellow-500 to-blue-700",
  },
  {
    id: 3,
    bankName: "Bank Rakyat Indonesia",
    bankCode: "BRI",
    accountNumber: "0123 0100 0456 789",
    accountHolder: "Yayasan Panti Amanah",
    logoColor: "from-blue-600 to-blue-900",
  },
  {
    id: 4,
    bankName: "Bank Syariah Indonesia",
    bankCode: "BSI",
    accountNumber: "7123 4567 890",
    accountHolder: "Yayasan Panti Amanah",
    logoColor: "from-primary-500 to-teal-600",
  },
];

export const whatsappConfig = {
  phoneNumber: "6281234567890",
  templateMessage:
    "Halo Admin Panti Amanah, saya ingin mengkonfirmasi donasi saya. Berikut detailnya:\n\nNama: \nBank Tujuan: \nNominal: \nTanggal Transfer: \n\nTerima kasih 🙏",
};
