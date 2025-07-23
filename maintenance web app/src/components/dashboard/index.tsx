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
  const { data: ownerData, isLoading: loadingOwners } = useQuery({
    queryKey: ["owners"],
    queryFn: getOwners,
  });

  const { data: noticeData, isLoading: loadingNotices } = useQuery({
    queryKey: ["notices"],
    queryFn: getNotices,
  });

  const owners = ownerData?.data || [];

  const totalBalance = owners.reduce((sum, o) => {
    const total =
      o.ledger?.reduce((acc: number, entry: any) => acc + entry.amount, 0) || 0;
    return sum + total;
  }, 0);

  const allPayments = owners
    .flatMap((o) =>
      o.ledger
        ?.filter((l: any) => l.amount > 0)
        .map((l: any) => ({
          flat: o.flatNumber,
          name: o.ownerName,
          amount: l.amount,
          description: l.description || "Maintenance Payment",
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

        {/* Outstanding Balance */}
        <Col xs={24} sm={12} lg={8}>
          <div className="h-full rounded-2xl bg-gradient-to-br from-red-300 via-white to-red-600 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all p-6">
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
                  {loadingOwners ? "..." : `₹${Math.abs(totalBalance)}`}
                </div>
              </div>
            </div>
          </div>
        </Col>

        {/* Latest Notice */}
        <Col xs={24} sm={12} lg={8}>
          <div className="h-full rounded-2xl bg-gradient-to-br from-yellow-200 via-white to-yellow-400 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all p-6">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-500 text-white rounded-xl p-3">
                <BellOutlined style={{ fontSize: 24 }} />
              </div>
              <div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Latest Notice
                </div>
                <div className="text-base font-semibold mt-1 text-gray-900 dark:text-white line-clamp-2 max-w-[200px]">
                  {loadingNotices
                    ? "Loading..."
                    : latestNotice || "No recent notice"}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <div className="mt-12 max-w-4xl mx-auto">
        <div className="rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
            <Title level={4} className="!text-white !mb-0 text-center">
              💳 Recent Maintenance Payments
            </Title>
          </div>

          {allPayments.length > 0 ? (
            <div className="bg-white dark:bg-gray-900 px-6 py-4 max-h-[400px] overflow-y-auto space-y-4">
              {allPayments.map((p, idx) => (
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
