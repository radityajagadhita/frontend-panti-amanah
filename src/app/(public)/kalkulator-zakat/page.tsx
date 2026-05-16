"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  Wallet,
  Landmark,
  ArrowRight,
  Coins,
  TrendingDown,
  Briefcase,
  PiggyBank,
  Gem,
  CreditCard,
} from "lucide-react";

/* ─── Rupiah helpers ─── */

function parseRupiah(formatted: string): number {
  const digits = formatted.replace(/\D/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

function formatRupiah(value: number): string {
  if (!value) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* ─── Formatted input component ─── */

interface RupiahInputProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (raw: number, formatted: string) => void;
  placeholder?: string;
  optional?: boolean;
}

function RupiahInput({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder = "0",
  optional = false,
}: RupiahInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseRupiah(e.target.value);
    onChange(raw, formatRupiah(raw));
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
        {label}
        {optional && (
          <span className="text-xs font-normal text-gray-400">(opsional)</span>
        )}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          {icon}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-10 flex items-center text-sm font-medium text-gray-400">
          Rp
        </div>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-[4.5rem] pr-4 text-base font-semibold text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-300 placeholder:font-normal focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
      </div>
    </div>
  );
}

/* ─── Tab types ─── */

type ZakatType = "penghasilan" | "maal";

const tabs: { key: ZakatType; label: string; icon: React.ReactNode }[] = [
  { key: "penghasilan", label: "Zakat Penghasilan", icon: <Briefcase className="h-4 w-4" /> },
  { key: "maal", label: "Zakat Maal", icon: <PiggyBank className="h-4 w-4" /> },
];

/* ─── Page ─── */

export default function KalkulatorZakatPage() {
  const [activeTab, setActiveTab] = useState<ZakatType>("penghasilan");

  /* Penghasilan state */
  const [gaji, setGaji] = useState({ raw: 0, fmt: "" });
  const [lainnya, setLainnya] = useState({ raw: 0, fmt: "" });
  const [hutangPenghasilan, setHutangPenghasilan] = useState({ raw: 0, fmt: "" });

  /* Maal state */
  const [tabungan, setTabungan] = useState({ raw: 0, fmt: "" });
  const [emas, setEmas] = useState({ raw: 0, fmt: "" });
  const [hutangMaal, setHutangMaal] = useState({ raw: 0, fmt: "" });

  const makeSetState = useCallback(
    (setter: React.Dispatch<React.SetStateAction<{ raw: number; fmt: string }>>) =>
      (raw: number, fmt: string) =>
        setter({ raw, fmt }),
    []
  );

  const zakatPenghasilan = useMemo(() => {
    const total = (gaji.raw + lainnya.raw - hutangPenghasilan.raw) * 0.025;
    return Math.max(0, total);
  }, [gaji.raw, lainnya.raw, hutangPenghasilan.raw]);

  const zakatMaal = useMemo(() => {
    const total = (tabungan.raw + emas.raw - hutangMaal.raw) * 0.025;
    return Math.max(0, total);
  }, [tabungan.raw, emas.raw, hutangMaal.raw]);

  const currentZakat = activeTab === "penghasilan" ? zakatPenghasilan : zakatMaal;

  const hasInput =
    activeTab === "penghasilan"
      ? gaji.raw > 0 || lainnya.raw > 0
      : tabungan.raw > 0 || emas.raw > 0;

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Kalkulator Zakat
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-100/80">
            Hitung kewajiban zakat Anda dengan mudah dan tepat. Cukup masukkan
            nominal, hasilnya langsung muncul.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-5 py-2 text-sm font-medium text-white">
            <Calculator className="h-4 w-4" />
            Perhitungan otomatis &middot; 2.5% nisab
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
            {/* ─── Tabs ─── */}
            <div className="flex border-b border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.key
                      ? "border-b-2 border-primary-500 bg-primary-50/40 text-primary-700"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-10">
              {/* ─── Penghasilan Inputs ─── */}
              {activeTab === "penghasilan" && (
                <div className="space-y-5 animate-fade-in">
                  <RupiahInput
                    id="gaji"
                    label="Pendapatan / Gaji per Bulan"
                    icon={<Wallet className="h-4 w-4" />}
                    value={gaji.fmt}
                    onChange={makeSetState(setGaji)}
                    placeholder="5.000.000"
                  />
                  <RupiahInput
                    id="lainnya"
                    label="Pendapatan Lain-lain"
                    icon={<Coins className="h-4 w-4" />}
                    value={lainnya.fmt}
                    onChange={makeSetState(setLainnya)}
                    optional
                  />
                  <RupiahInput
                    id="hutang-penghasilan"
                    label="Hutang / Cicilan Bulanan"
                    icon={<TrendingDown className="h-4 w-4" />}
                    value={hutangPenghasilan.fmt}
                    onChange={makeSetState(setHutangPenghasilan)}
                    optional
                  />

                  {/* Formula hint */}
                  <div className="rounded-xl bg-gray-50 px-4 py-3 text-xs text-gray-400">
                    <span className="font-medium text-gray-500">Formula:</span>{" "}
                    (Gaji + Pendapatan Lain − Hutang) × 2,5%
                  </div>
                </div>
              )}

              {/* ─── Maal Inputs ─── */}
              {activeTab === "maal" && (
                <div className="space-y-5 animate-fade-in">
                  <RupiahInput
                    id="tabungan"
                    label="Tabungan / Deposito / Uang Tunai"
                    icon={<Landmark className="h-4 w-4" />}
                    value={tabungan.fmt}
                    onChange={makeSetState(setTabungan)}
                    placeholder="50.000.000"
                  />
                  <RupiahInput
                    id="emas"
                    label="Nilai Emas / Perak yang Dimiliki"
                    icon={<Gem className="h-4 w-4" />}
                    value={emas.fmt}
                    onChange={makeSetState(setEmas)}
                    optional
                  />
                  <RupiahInput
                    id="hutang-maal"
                    label="Hutang Jatuh Tempo"
                    icon={<CreditCard className="h-4 w-4" />}
                    value={hutangMaal.fmt}
                    onChange={makeSetState(setHutangMaal)}
                    optional
                  />

                  {/* Formula hint */}
                  <div className="rounded-xl bg-gray-50 px-4 py-3 text-xs text-gray-400">
                    <span className="font-medium text-gray-500">Formula:</span>{" "}
                    (Tabungan + Emas/Perak − Hutang) × 2,5%
                  </div>
                </div>
              )}
            </div>

            {/* ─── Result Box ─── */}
            <div className="border-t border-gray-100 bg-gradient-to-br from-primary-600 to-primary-700 px-8 py-8 md:px-10">
              <div className="text-center">
                <p className="text-sm font-medium text-primary-200">
                  Hasil Perhitungan Zakat
                </p>

                <div className="mt-3 flex items-baseline justify-center gap-1.5">
                  <span className="text-lg font-medium text-primary-200/70">Rp</span>
                  <span className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                    {hasInput ? formatRupiah(Math.round(currentZakat)) : "0"}
                  </span>
                </div>

                <p className="mt-2 text-xs text-primary-200/60">
                  {activeTab === "penghasilan"
                    ? "per bulan"
                    : "dari total harta yang dimiliki"}
                </p>

                {/* CTA */}
                <Link
                  href="/donasi"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-primary-700 shadow-lg shadow-black/10 transition-all duration-300 hover:bg-primary-50 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Bayar Zakat Sekarang
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-xs text-gray-400">
            Kalkulator ini bersifat estimasi. Untuk perhitungan zakat yang lebih
            detail, silakan berkonsultasi dengan ustadz atau lembaga zakat
            terpercaya.
          </p>
        </div>
      </section>
    </>
  );
}
