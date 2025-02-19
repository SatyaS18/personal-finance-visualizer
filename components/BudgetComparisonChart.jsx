"use client";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "@/context/TransactionContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BudgetComparisonChart({ selectedMonth, selectedYear }) {
  const { transactions } = useContext(TransactionContext);
  const [budgets, setBudgets] = useState({});

  useEffect(() => {
    async function fetchBudgets() {
      const response = await fetch("/api/budget");
      const data = await response.json();
      setBudgets(
        data.reduce(
          (acc, { category, budget }) => ({ ...acc, [category]: budget }),
          {}
        )
      );
    }
    fetchBudgets();
  }, []);

  // Filter transactions by selected month & year
  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      txDate.getMonth() + 1 === selectedMonth &&
      txDate.getFullYear() === selectedYear
    );
  });

  const spendingData = filteredTransactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const chartData = Object.keys(budgets).map((category) => ({
    category,
    Budget: budgets[category] || 0,
    Spent: spendingData[category] || 0,
  }));

  return (
    <div className="max-w-md mx-auto mt-6 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Budget vs. Actual Spending</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" angle={-20} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#10B981" />
          <Bar dataKey="Spent" fill="#F87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
