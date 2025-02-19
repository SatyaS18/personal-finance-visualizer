"use client";
import { useContext } from "react";
import { TransactionContext } from "@/context/TransactionContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CategoryPieChart({ selectedMonth, selectedYear }) {
  const { transactions } = useContext(TransactionContext);

  // Filter transactions by selected month & year
  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      txDate.getMonth() + 1 === selectedMonth &&
      txDate.getFullYear() === selectedYear
    );
  });

  const categoryData = filteredTransactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const chartData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const colors = [
    "#34D399",
    "#6366F1",
    "#FBBF24",
    "#EC4899",
    "#F87171",
    "#10B981",
    "#9CA3AF",
  ];

  return (
    <div className="max-w-md mx-auto mt-4 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
      {chartData.length === 0 ? (
        <p className="text-center text-gray-500">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
