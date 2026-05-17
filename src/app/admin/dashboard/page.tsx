"use client";

import api from "../../../lib/api";

import {
  useEffect,
  useState,
} from "react";

import {
  Images,
  HeartHandshake,
  Users,
  FolderKanban,
  Wallet,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {

  const [stats, setStats] =
    useState({
      programs: 0,
      galleries: 0,
      anakAsuh: 0,
      donations: 0,
      totalDonationAmount: 0,
    });

  const [
    recentDonations,
    setRecentDonations
  ] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const [
        programs,
        galleries,
        anakAsuh,
        donations,
      ] = await Promise.all([
        api.get("/programs"),
        api.get("/galleries"),
        api.get("/anak-asuh"),
        api.get("/donations"),
      ]);

      const donationList =
        donations.data.data || [];

      const totalDonationAmount =
        donationList.reduce(
          (
            acc: number,
            item: any
          ) =>
            acc +
            Number(item.amount),
          0
        );

      setStats({
        programs:
          programs.data.data
            ?.length || 0,

        galleries:
          galleries.data.data
            ?.length || 0,

        anakAsuh:
          anakAsuh.data.data
            ?.length || 0,

        donations:
          donationList.length || 0,

        totalDonationAmount,
      });

      setRecentDonations(
        donationList
      );

    } catch (error) {

      console.log(error);
    }
  };

  const donationChartData =
  Object.values(

    recentDonations.reduce(
      (acc: any, item: any) => {

        const bank =
          item.bank_account
            ?.bank_name
          || "Unknown";

        if (!acc[bank]) {

          acc[bank] = {
            bank,
            amount: 0,
          };
        }

        acc[bank].amount +=
          Number(item.amount);

        return acc;

      },
      {}
    )
  );

  const cards = [
    {
      title: "Programs",
      value: stats.programs,
      icon: FolderKanban,
    },
    {
      title: "Galleries",
      value: stats.galleries,
      icon: Images,
    },
    {
      title: "Anak Asuh",
      value: stats.anakAsuh,
      icon: Users,
    },
    {
      title: "Donations",
      value: stats.donations,
      icon: HeartHandshake,
    },
    {
      title: "Total Donations",
      value:
        `Rp ${stats.totalDonationAmount
          .toLocaleString("id-ID")}`,
      icon: Wallet,
    },
  ];

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Welcome Back Admin 👋
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          {new Date()
            .toLocaleDateString(
              "id-ID",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card, index) => {

          const Icon = card.icon;

          return (

            <div
              key={index}
              className={`
                bg-white p-6 rounded-2xl shadow min-h-[160px]
                hover:shadow-lg transition-all
                ${
                  card.title === "Total Donations"
                    ? "xl:col-span-2"
                    : ""
                }
              `}
            >

              <div className="flex justify-between items-start">

                <div className="flex-1">

                  <h2 className="text-gray-500 text-sm font-medium">
                    {card.title}
                  </h2>

                  <p
                    className={`
                      font-bold mt-5 text-yellow-500 break-words
                      ${
                        card.title === "Total Donations"
                          ? "text-3xl"
                          : "text-3xl"
                      }
                    `}
                  >
                    {Number(card.value)
                      ? Number(card.value)
                          .toLocaleString("id-ID")
                      : card.value}
                  </p>

                </div>

                <div className="bg-yellow-100 p-4 rounded-2xl">

                  <Icon
                    size={30}
                    className="text-yellow-500"
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* RECENT DONATIONS */}

        <div className="bg-white rounded-2xl shadow p-8 h-[500px] flex flex-col">

          <h1 className="text-3xl font-bold mb-8">
            Recent Donations
          </h1>

          <div className="space-y-5 overflow-y-auto scrollbar-thin pr-2 flex-1">

            {recentDonations.length > 0 ? (

              recentDonations
                .slice(0, 5)
                .map(
                  (donation: any) => (

                    <div
                      key={donation.id}
                      className="flex justify-between items-center border-b pb-5"
                    >

                      <div>

                        <h2 className="font-bold text-lg">
                          {
                            donation.donor_name
                          }
                        </h2>

                        <p className="text-gray-500">

                          {
                            donation.tujuan
                            || "Donasi"
                          }

                        </p>

                        <p className="text-sm text-yellow-500 font-bold">
                          {
                            donation.bank_account
                              ?.bank_name
                            || "-"
                          }
                        </p>

                      </div>

                      <p className="font-bold text-yellow-500 text-xl">
                        Rp
                        {Number(
                          donation.amount
                        ).toLocaleString(
                          "id-ID"
                        )}
                      </p>

                    </div>
                  )
                )

            ) : (

              <p className="text-gray-400">
                No donations yet
              </p>

            )}

          </div>

        </div>

        {/* DONATION ANALYTICS */}

        <div className="bg-white rounded-2xl shadow p-8 h-[500px]">

          <div className="mb-8">

            <h1 className="text-3xl font-bold">
              Donation Chart
            </h1>

            <p className="text-gray-500 mt-2">
              Total donation by bank
            </p>

          </div>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={donationChartData}
              >

                <XAxis dataKey="bank" />

                <YAxis
                  tickFormatter={(value) =>
                    `${value / 1000000} Juta`
                  }
                />

                <Tooltip
                  formatter={(value: any) =>
                    `Rp ${Number(value).toLocaleString(
                      "id-ID"
                    )}`
                  }
                />

                <Bar
                  dataKey="amount"
                  fill="#eab308"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}