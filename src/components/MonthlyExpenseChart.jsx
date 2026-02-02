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

const MonthlyExpenseChart = ({ expenses }) => {
  const monthlyTotals = {};

  expenses.forEach((exp) => {
    const date = new Date(exp.date);
    const month = `${date.getFullYear()}-${date.toLocaleString("default", {
      month: "short",
    })}`;
    monthlyTotals[month] = (monthlyTotals[month] || 0) + exp.amount;
  });

  const labels = Object.keys(monthlyTotals).sort();

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Expense (₹)",
        data: labels.map((m) => monthlyTotals[m]),
        borderColor: "blue",
        backgroundColor: "blue",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>🗓️ Monthly Expense Graph</h3>
      <Line data={data} />
    </div>
  );
};

export default MonthlyExpenseChart;
