"use client";

import api from "../../../lib/api";
import { useEffect, useState } from "react";
import {
  Images,
  HeartHandshake,
  Users,
  FolderKanban,
  Wallet,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Donation } from "../../../data/Donation";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    programs: 0,
    galleries: 0,
    anakAsuh: 0,
    donations: 0,
    totalDonationAmount: 0,
  });

  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [programs, galleries, anakAsuh, donations] = await Promise.all([
        api.get("/programs"),
        api.get("/galleries"),
        api.get("/anak-asuh"),
        api.get("/donations"),
      ]);

      const donationList = donations.data.data || [];

      const totalDonationAmount = donationList.reduce(
        (acc: number, item: any) => acc + Number(item.amount),
        0
      );

      setStats({
        programs: programs.data.data?.length || 0,
        galleries: galleries.data.data?.length || 0,
        anakAsuh: anakAsuh.data.data?.length || 0,
        donations: donationList.length || 0,
        totalDonationAmount,
      });

      setRecentDonations(donationList as Donation[]);
    } catch (error) {
      console.log(error);
    }
  };

  const donationChartData = Object.values(
    recentDonations.reduce((acc: any, item: Donation) => {
      const bank = item.payment_method;
      if (!acc[bank]) {
        acc[bank] = { bank, amount: 0 };
      }
      acc[bank].amount += Number(item.amount);
      return acc;
    }, {})
  );

  const cards = [
    { title: "Programs", value: stats.programs, icon: FolderKanban, color: "from-blue-500 to-cyan-400" },
    { title: "Galleries", value: stats.galleries, icon: Images, color: "from-purple-500 to-pink-400" },
    { title: "Anak Asuh", value: stats.anakAsuh, icon: Users, color: "from-amber-500 to-orange-400" },
    { title: "Donations", value: stats.donations, icon: HeartHandshake, color: "from-rose-500 to-red-400" },
    { 
      title: "Total Donations", 
      value: `Rp ${stats.totalDonationAmount.toLocaleString("id-ID")}`, 
      icon: Wallet, 
      color: "from-emerald-600 to-primary-500" 
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome Back, Admin 👋
        </h1>
        <p className="text-gray-500 mt-2 text-sm font-medium">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const isLarge = card.title === "Total Donations";
          return (
            <div
              key={index}
              className={`
                relative overflow-hidden bg-white p-6 rounded-[2rem] border border-gray-100
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
                transition-all duration-300 group
                ${isLarge ? "xl:col-span-2 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white border-none" : ""}
              `}
            >
              {isLarge && (
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
              )}
              <div className="flex justify-between items-start relative z-10">
                <div className="flex-1">
                  <h2 className={`text-sm font-semibold mb-2 ${isLarge ? "text-emerald-200" : "text-gray-500"}`}>
                    {card.title}
                  </h2>
                  <p
                    className={`
                      font-bold tracking-tight break-words
                      ${isLarge ? "text-4xl lg:text-5xl text-white" : "text-3xl text-gray-900"}
                    `}
                  >
                    {Number(card.value) ? Number(card.value).toLocaleString("id-ID") : card.value}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl shadow-inner ${isLarge ? "bg-white/10 backdrop-blur-md" : `bg-gradient-to-br ${card.color}`}`}>
                  <Icon size={28} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* RECENT DONATIONS */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold text-gray-900">Recent Donations</h1>
          </div>
          
          <div className="space-y-4 overflow-y-auto pr-2 flex-1 scrollbar-hide">
            {recentDonations.length > 0 ? (
              recentDonations.slice(0, 5).map((donation: any) => (
                <div
                  key={donation.id}
                  className="flex justify-between items-center p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                      {donation.donor_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">{donation.donor_name}</h2>
                      <p className="text-sm text-gray-500">{donation.tujuan || "Donasi Umum"}</p>
                      <p className="text-xs font-semibold text-emerald-600 mt-0.5">
                        {donation.bank_account?.bank_name || donation.payment_method}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900">
                    Rp {Number(donation.amount).toLocaleString("id-ID")}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
                <HeartHandshake className="w-12 h-12 opacity-20" />
                <p>No donations yet</p>
              </div>
            )}
          </div>
        </div>

        {/* DONATION ANALYTICS */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 h-[500px] flex flex-col">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-900">Donation Analytics</h1>
            <p className="text-gray-500 text-sm mt-1">Total donation amount grouped by bank</p>
          </div>

          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donationChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="bank" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000000}M`}
                />
                <Tooltip
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => `Rp ${Number(value).toLocaleString("id-ID")}`}
                />
                <Bar dataKey="amount" fill="#10b981" radius={[6, 6, 6, 6]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}