import Chart from "react-apexcharts";
import dayjs from "dayjs";

const DashboardCharts = ({ owners, miscExpenses }) => {
  // Calculate totals
  const totalMaintenance = owners.reduce((sum, o) => {
    const total =
      o.ledger?.reduce((acc, l) => (l.amount > 0 ? acc + l.amount : acc), 0) ||
      0;
    return sum + total;
  }, 0);

  const totalMisc = miscExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Pie chart for distribution
  const pieOptions = {
    labels: ["Maintenance Collected", "Miscellaneous Spent"],
    colors: ["#10b981", "#ef4444"],
    legend: { position: "bottom" },
  };

  const pieSeries = [totalMaintenance, totalMisc];

  // Monthly trend for misc
  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs().month(i).format("MMM")
  );

  const monthlyExpenses = months.map((month, idx) => {
    const matching = miscExpenses.filter((e) => dayjs(e.date).month() === idx);
    return matching.reduce((sum, e) => sum + e.amount, 0);
  });

  const barOptions = {
    chart: {
      id: "misc-expenses",
      toolbar: { show: false },
    },
    xaxis: {
      categories: months,
    },
    colors: ["#6366f1"],
    dataLabels: {
      enabled: false,
    },
  };

  const barSeries = [
    {
      name: "Miscellaneous Expenses",
      data: monthlyExpenses,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
        <h3 className="text-base font-medium text-gray-800 dark:text-white mb-2 text-center">
          📊 Miscellaneous Expenses Trend (Monthly)
        </h3>
        <Chart
          options={barOptions}
          series={barSeries}
          type="bar"
          height={450}
        />
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
        <h3 className="text-base font-medium text-gray-800 dark:text-white mb-2 text-center">
          💰 Expense Distribution
        </h3>
        <Chart
          options={pieOptions}
          series={pieSeries}
          type="pie"
          width="100%"
        />
      </div>
    </div>
  );
};

export default DashboardCharts;
