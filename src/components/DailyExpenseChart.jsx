import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);


const DailyExpenseChart = ({ expenses }) => {
  // 🔹 Group total expense by date
  const dailyTotals = expenses.reduce((acc, exp) => {
    acc[exp.date] = (acc[exp.date] || 0) + exp.amount;
    return acc;
  }, {});

  const labels = Object.keys(dailyTotals).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Daily Expense (₹)",
        data: labels.map((date) => dailyTotals[date]),
        borderColor: "blue",          // ✅ line color
        backgroundColor: "blue",      // ✅ point color
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", marginTop: "30px" }}>
      <h3>📈 Daily Expense Graph</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default DailyExpenseChart;
