"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  QrCode,
  Landmark,
  MessageCircle,
  Heart,
  Smartphone,
  Loader2,
} from "lucide-react";
import api, { BASE_URL } from "@/src/lib/api";
import { BankAccount, Profile } from "@/src/data/Donation";
import bgSection from "../../../public/bg-section.jpg";


/* ─── Helpers ────────────────────────────────────────────── */

const gradients = [
  "from-blue-500 to-blue-700",
  "from-yellow-500 to-blue-700",
  "from-blue-600 to-blue-900",
  "from-primary-500 to-teal-600",
  "from-green-500 to-teal-600",
  "from-purple-500 to-indigo-700",
];

function bankInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 3)
    .join("")
    .toUpperCase();
}

/* ─── CopyButton ─────────────────────────────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const raw = text.replace(/\s/g, "");
    try {
      await navigator.clipboard.writeText(raw);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = raw;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${copied
          ? "bg-primary-100 text-primary-700"
          : "bg-gray-100 text-gray-500 hover:bg-primary-50 hover:text-primary-600"
        }`}
      title="Salin nomor rekening"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Tersalin!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Salin
        </>
      )}
    </button>
  );
}



export default function DonasiPage() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bankRes, profileRes] = await Promise.all([
          api.get("/bank-accounts"),
          api.get("/profile"),
        ]);
        setBankAccounts(bankRes.data.data ?? bankRes.data ?? []);
        // profile may return single object or array — handle both
        const profileData = Array.isArray(profileRes.data)
          ? profileRes.data[0]
          : profileRes.data?.data ?? profileRes.data;
        setProfile(profileData ?? null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const waLink = profile?.whatsapp_link ?? "#";

  // Build QRIS image URL — qris_code may be a path or full URL
  const qrisUrl = profile?.qris_code
    ? profile.qris_code.startsWith("http")
      ? profile.qris_code
      : `${BASE_URL}/storage/${profile.qris_code}`
    : null;

  return (
    <>
      {/* Page Header */}
      <section className="py-16 md:py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(129, 121, 67, 0.71), rgba(121, 126, 66, 0.7)), url(${bgSection.src})`,
        }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Donasi
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-100/80">
            Setiap kontribusi Anda sangat berarti bagi masa depan anak-anak
            Panti Amanah. Pilih metode pembayaran yang paling nyaman untuk Anda.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-5 py-2 text-sm font-medium text-white">
            <Heart className="h-4 w-4" />
            Setiap rupiah berarti
          </div>
        </div>
      </section>

      {/* Donation Card */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary-500" />
              <p className="text-sm">Memuat informasi donasi...</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
              <div className="grid md:grid-cols-2">
                {/* ─── LEFT: Bank Transfer ─── */}
                <div className="p-8 md:p-10">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/20">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Transfer Bank
                      </h2>
                      <p className="text-xs text-gray-400">
                        Transfer manual ke rekening berikut
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {bankAccounts.length === 0 ? (
                      <p className="text-sm text-gray-400 py-4 text-center">
                        Belum ada rekening tersedia
                      </p>
                    ) : (
                      bankAccounts.map((bank, i) => (
                        <div
                          key={bank.id}
                          className="group rounded-2xl border border-gray-100 p-4 transition-all duration-200 hover:border-primary-200 hover:shadow-md hover:shadow-primary-500/5"
                        >
                          <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${gradients[i % gradients.length]} text-[10px] font-extrabold text-white tracking-tight`}
                              >
                                {bankInitials(bank.bank_name)}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  {bank.bank_name}
                                </p>
                                <p className="text-xs text-gray-400">
                                  A/N {bank.account_holder}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5">
                            <span className="font-mono text-sm font-semibold tracking-wider text-gray-700">
                              {bank.account_number}
                            </span>
                            <CopyButton text={bank.account_number} />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* ─── RIGHT: QRIS ─── */}
                <div className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-primary-50/30 p-8 md:border-t-0 md:border-l md:p-10">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/20">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        QRIS Payment
                      </h2>
                      <p className="text-xs text-gray-400">
                        Scan untuk membayar instan
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    {/* QRIS Image or Placeholder */}
                    <div className="relative mb-6 flex h-64 w-64 items-center justify-center rounded-2xl border-2 border-dashed border-primary-200 bg-white p-4 overflow-hidden">
                      {qrisUrl ? (
                        <img
                          src={qrisUrl}
                          alt="QRIS Panti Amanah"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-3 text-center">
                          <QrCode
                            className="h-20 w-20 text-primary-300"
                            strokeWidth={1}
                          />
                          <span className="text-xs font-medium text-gray-400">
                            QRIS belum tersedia
                          </span>
                        </div>
                      )}
                      {/* Corner accents */}
                      <div className="absolute top-2 left-2 h-4 w-4 rounded-tl-lg border-t-2 border-l-2 border-primary-400" />
                      <div className="absolute top-2 right-2 h-4 w-4 rounded-tr-lg border-t-2 border-r-2 border-primary-400" />
                      <div className="absolute bottom-2 left-2 h-4 w-4 rounded-bl-lg border-b-2 border-l-2 border-primary-400" />
                      <div className="absolute bottom-2 right-2 h-4 w-4 rounded-br-lg border-b-2 border-r-2 border-primary-400" />
                    </div>

                    {/* Instruction */}
                    <div className="rounded-xl bg-white border border-primary-100 p-4 text-center">
                      <div className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
                        <Smartphone className="h-4 w-4 text-primary-500" />
                        Cara Pembayaran
                      </div>
                      <p className="text-xs leading-relaxed text-gray-500">
                        Scan QRIS ini menggunakan aplikasi M-Banking atau
                        e-Wallet Anda{" "}
                        <span className="font-medium text-gray-600">
                          (GoPay, OVO, Dana, LinkAja, dll)
                        </span>
                        . Pembayaran akan diproses secara otomatis.
                      </p>
                    </div>

                    {/* Supported wallets */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      {["GoPay", "OVO", "Dana", "LinkAja", "ShopeePay"].map(
                        (wallet) => (
                          <span
                            key={wallet}
                            className="rounded-full bg-white border border-gray-200 px-3 py-1 text-[10px] font-semibold text-gray-500"
                          >
                            {wallet}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── BOTTOM: WhatsApp CTA ─── */}
              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 via-green-50/50 to-emerald-50 px-8 py-12 md:px-12 border-t border-green-100">
                <div className="mx-auto max-w-2xl text-center relative z-10">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#25D366] mb-4 shadow-md shadow-green-200/50">
                    <MessageCircle className="h-8 w-8 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Sudah Melakukan Transfer?
                  </h3>
                  <p className="mb-8 text-sm leading-relaxed text-gray-600 max-w-lg mx-auto">
                    Mohon konfirmasi donasi Anda melalui WhatsApp agar kami dapat segera memproses dan mengirimkan tanda terima resmi yayasan.
                  </p>
                  
                  <div className="relative inline-block w-full sm:w-auto group">
                    {/* Pulsing background ring */}
                    <div className="absolute -inset-1 rounded-2xl bg-[#25D366] opacity-30 blur group-hover:opacity-50 transition-opacity duration-300 animate-pulse" />
                    
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-10 py-4 text-base font-bold text-white shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:bg-[#1fba59] hover:-translate-y-1 sm:w-auto"
                    >
                      <MessageCircle className="h-6 w-6" />
                      Konfirmasi via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trust note */}
          <p className="mt-8 text-center text-xs text-gray-400">
            Donasi Anda akan digunakan sepenuhnya untuk kebutuhan anak-anak asuh
            Panti Amanah. Terima kasih atas kepercayaan dan kebaikan hati Anda.
            🙏
          </p>
        </div>
      </section>
    </>
  );
}
