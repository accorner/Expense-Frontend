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

const WeeklyExpenseChart = ({ expenses }) => {
  const weeklyTotals = {};

  expenses.forEach((exp) => {
    const date = new Date(exp.date);
    const week = `${date.getFullYear()}-W${Math.ceil(
      date.getDate() / 7
    )}`;
    weeklyTotals[week] = (weeklyTotals[week] || 0) + exp.amount;
  });

  const labels = Object.keys(weeklyTotals).sort();

  const data = {
    labels,
    datasets: [
      {
        label: "Weekly Expense (₹)",
        data: labels.map((w) => weeklyTotals[w]),
        borderColor: "blue",
        backgroundColor: "blue",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>📆 Weekly Expense Graph</h3>
      <Line data={data} />
    </div>
  );
};

export default WeeklyExpenseChart;
