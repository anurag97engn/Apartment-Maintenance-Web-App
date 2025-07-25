<<<<<<< HEAD
import { Card, Col, Row, Statistic, Typography, Avatar } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getNotices } from "../../api/noticeApi";
import { getOwners } from "../../api/ownerApi";
import {
  BankOutlined,
  BellOutlined,
  DollarCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Dashboard = () => {
=======
import { Col, Row, Typography, Avatar, Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getNotices } from "../../api/noticeApi";
import { getOwners } from "../../api/ownerApi";
import { getMiscExpenses } from "../../api/miscellaneousApi";
import { BankOutlined, BellOutlined, TeamOutlined } from "@ant-design/icons";
import DashboardCharts from "./dashboardCharts";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const { Title } = Typography;

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedOwner, setSelectedOwner] = useState<string | null>(null);

>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
  const { data: ownerData, isLoading: loadingOwners } = useQuery({
    queryKey: ["owners"],
    queryFn: getOwners,
  });

  const { data: noticeData, isLoading: loadingNotices } = useQuery({
    queryKey: ["notices"],
    queryFn: getNotices,
  });

<<<<<<< HEAD
  const owners = ownerData?.data || [];

  const totalBalance = owners.reduce((sum, o) => {
    const total =
      o.ledger?.reduce((acc: number, entry: any) => acc + entry.amount, 0) || 0;
    return sum + total;
  }, 0);

=======
  const { data: miscData, isLoading: loadingMisc } = useQuery({
    queryKey: ["misc"],
    queryFn: getMiscExpenses,
  });

  const owners = ownerData?.data || [];
  const miscExpenses = miscData?.data || [];

  const totalLedgerBalance = owners.reduce((sum, o) => {
    const ownerLedgerTotal =
      o.ledger?.reduce((acc: number, entry: any) => acc + entry.amount, 0) || 0;
    return sum + ownerLedgerTotal;
  }, 0);

  const totalMisc = miscExpenses.reduce(
    (sum: number, e: any) => sum + e.amount,
    0
  );

  const totalBalance = totalLedgerBalance - totalMisc;

  // Helper to filter by selected month/year
  const matchesFilter = (dateStr: string) => {
    const date = new Date(dateStr);
    const monthMatch =
      selectedMonth === "all" ||
      date.getMonth() + 1 === parseInt(selectedMonth);
    const yearMatch =
      selectedYear === "all" || date.getFullYear() === parseInt(selectedYear);
    return monthMatch && yearMatch;
  };

  // All filtered and sorted payments
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
  const allPayments = owners
    .flatMap((o) =>
      o.ledger
        ?.filter((l: any) => l.amount > 0)
        .map((l: any) => ({
          flat: o.flatNumber,
          name: o.ownerName,
          amount: l.amount,
          description: l.description || "Maintenance Payment",
<<<<<<< HEAD
          date: new Date(l.date).toLocaleString(),
        }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const latestNotice = noticeData?.data?.[0]?.title || "No notices yet";

  return (
    <div className="p-6 md:p-10 bg-gradient-to-b from-gray-50 to-white min-h-screen dark:from-gray-900 dark:to-black">
      <h3
        className="text-center text-black dark:text-white font-bold text-3xl mb-8"
        style={{ marginBottom: "3rem" }}
      >
        🏢 Apartment Maintenance Dashboard
      </h3>

      <Row gutter={[24, 24]} justify="center" className="h-full">
        {/* Total Owners */}
        <Col xs={24} sm={12} lg={8}>
          <div className="h-full rounded-2xl bg-gradient-to-br from-gray-500 via-gray-200 to-gray-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all p-6">
=======
          date: dayjs.utc(l.date),
        }))
    )
    .filter((p) => (selectedOwner ? p.name === selectedOwner : true))
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());

  const filteredMisc = miscExpenses
    .filter((e: any) => matchesFilter(e.date))
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const latestNotice = noticeData?.data?.[0]?.title || "No notices yet";

  // Year and month dropdown options
  const currentYear = new Date().getFullYear();
  const years = [
    "all",
    ...Array.from({ length: 5 }, (_, i) => `${currentYear - i}`),
  ];
  const months = [
    { value: "all", label: "All Months" },
    ...Array.from({ length: 12 }, (_, i) => ({
      value: `${i + 1}`,
      label: dayjs().month(i).format("MMMM"),
    })),
  ];

  return (
    <div className="p-6 md:p-10 bg-gradient-to-b from-gray-50 to-white min-h-screen dark:from-gray-900 dark:to-black">
      <h3 className="text-center text-black dark:text-white font-bold text-3xl mb-8">
        🏢 Apartment Maintenance Dashboard
      </h3>

      <Row gutter={[24, 24]} justify="center">
        {/* Cards */}
        <Col xs={24} sm={12} lg={8}>
          <div className="h-full p-6 shadow-lg rounded-2xl bg-gradient-to-br from-gray-500 via-gray-200 to-gray-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white rounded-xl p-3">
                <TeamOutlined style={{ fontSize: 24 }} />
              </div>
              <div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Total Owners
                </div>
                <div className="text-2xl font-semibold dark:text-white">
                  {loadingOwners ? "..." : owners.length}
                </div>
              </div>
            </div>
          </div>
        </Col>

<<<<<<< HEAD
        {/* Outstanding Balance */}
        <Col xs={24} sm={12} lg={8}>
          <div className="h-full rounded-2xl bg-gradient-to-br from-red-300 via-white to-red-600 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all p-6">
=======
        <Col xs={24} sm={12} lg={8}>
          <div className="h-full p-6 shadow-lg rounded-2xl bg-gradient-to-br from-red-300 via-white to-red-600 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
            <div className="flex items-center gap-4">
              <div className="bg-green-600 text-white rounded-xl p-3">
                <BankOutlined style={{ fontSize: 24 }} />
              </div>
              <div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Outstanding Balance
                </div>
                <div
                  className={`text-2xl font-semibold ${
                    totalBalance < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
<<<<<<< HEAD
                  {loadingOwners ? "..." : `₹${Math.abs(totalBalance)}`}
=======
                  {loadingOwners || loadingMisc
                    ? "..."
                    : `₹${Math.abs(totalBalance).toLocaleString()}`}
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
                </div>
              </div>
            </div>
          </div>
        </Col>

<<<<<<< HEAD
        {/* Latest Notice */}
        <Col xs={24} sm={12} lg={8}>
          <div className="h-full rounded-2xl bg-gradient-to-br from-yellow-200 via-white to-yellow-400 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all p-6">
=======
        <Col xs={24} sm={12} lg={8}>
          <div className="h-full p-6 shadow-lg rounded-2xl bg-gradient-to-br from-yellow-200 via-white to-yellow-400 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
            <div className="flex items-center gap-4">
              <div className="bg-yellow-500 text-white rounded-xl p-3">
                <BellOutlined style={{ fontSize: 24 }} />
              </div>
              <div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Latest Notice
                </div>
                <div className="text-base font-semibold mt-1 text-gray-900 dark:text-white line-clamp-2 max-w-[200px]">
<<<<<<< HEAD
                  {loadingNotices
                    ? "Loading..."
                    : latestNotice || "No recent notice"}
=======
                  {loadingNotices ? "Loading..." : latestNotice}
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

<<<<<<< HEAD
      <div className="mt-12 max-w-4xl mx-auto">
=======
      <DashboardCharts owners={owners} miscExpenses={miscExpenses} />

      {/* Filters */}
      <div className="flex gap-4 justify-end mt-10 mb-2 max-w-7xl mx-auto px-4">
        <Select
          allowClear
          placeholder="Filter by Owner"
          value={selectedOwner || undefined}
          onChange={(value) => setSelectedOwner(value || null)}
          style={{ width: 250, marginBottom: 16 }}
          options={owners.map((owner) => ({
            label: `${owner.ownerName.toUpperCase()} (${owner.flatNumber})`,
            value: owner.ownerName,
          }))}
        />
        <Select
          value={selectedMonth}
          onChange={setSelectedMonth}
          options={months}
          style={{ width: 150 }}
        />
        <Select
          value={selectedYear}
          onChange={setSelectedYear}
          options={years.map((y) => ({
            value: y,
            label: y === "all" ? "All Years" : y,
          }))}
          style={{ width: 120 }}
        />
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
        {/* Payments */}
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
        <div className="rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
            <Title level={4} className="!text-white !mb-0 text-center">
              💳 Recent Maintenance Payments
            </Title>
          </div>

<<<<<<< HEAD
          {allPayments.length > 0 ? (
            <div className="bg-white dark:bg-gray-900 px-6 py-4 max-h-[400px] overflow-y-auto space-y-4">
              {allPayments.map((p, idx) => (
=======
          <div className="bg-white dark:bg-gray-900 px-6 py-4 max-h-[500px] overflow-y-auto space-y-4">
            {allPayments.length > 0 ? (
              allPayments.map((p, idx) => (
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
                <div
                  key={idx}
                  className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 hover:shadow-md transition rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                >
                  <Avatar
                    icon={p.name[0].toUpperCase()}
                    style={{
                      backgroundColor: "#4f46e5",
                      verticalAlign: "middle",
                    }}
                    size="large"
                  />
                  <div>
                    <div className="text-base font-semibold text-gray-800 dark:text-white">
                      {p.name.toUpperCase()}{" "}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        (Flat {p.flat})
                      </span>
                    </div>
                    <div className="text-green-600 dark:text-green-400 font-medium">
                      ₹{p.amount.toLocaleString()}
                    </div>
                    <div className="text-orange-600 dark:text-blue-400 font-medium">
                      {p.description}
                    </div>
<<<<<<< HEAD
                    <div className="text-xs text-gray-400 mt-1">{p.date}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 text-center text-gray-500 dark:text-gray-400 px-6 py-8">
              No payments recorded yet.
            </div>
          )}
=======
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(p.date).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 px-6 py-8">
                No payments recorded for selected filter.
              </div>
            )}
          </div>
        </div>

        {/* Miscellaneous */}
        <div className="rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-4">
            <Title level={4} className="!text-white !mb-0 text-center">
              🔧 Miscellaneous Expenses
            </Title>
          </div>

          <div className="bg-white dark:bg-gray-900 px-6 py-4 max-h-[500px] overflow-y-auto space-y-4">
            {filteredMisc.length > 0 ? (
              filteredMisc.map((expense: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 hover:shadow-md transition rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                >
                  <Avatar style={{ backgroundColor: "#e11d48" }} size="large">
                    ₹
                  </Avatar>
                  <div>
                    <div className="text-base font-semibold text-gray-800 dark:text-white">
                      {expense.description || "Misc Expense"}
                    </div>
                    <div className="text-red-600 dark:text-red-400 font-medium">
                      ₹{expense.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(expense.date).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 px-6 py-8">
                No miscellaneous expenses for selected filter.
              </div>
            )}
          </div>
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
