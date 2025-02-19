// import BudgetComparisonChart from "@/components/BudgetComparisonChart";
// import BudgetForm from "@/components/BudgetForm";
// import CategoryPieChart from "@/components/CategoryPieChart";
// import ExpenseChart from "@/components/ExpenseChart";
// import SpendingInsights from "@/components/SpendingInsights";
// import TransactionForm from "@/components/TransactionsForm";
// import TransactionList from "@/components/TransactionsList";
"use client";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";
import BudgetForm from "@/components/BudgetForm";
import CategoryPieChart from "@/components/CategoryPieChart";
import ExpenseChart from "@/components/ExpenseChart";
import SpendingInsights from "@/components/SpendingInsights";
import TransactionForm from "@/components/TransactionsForm";
import TransactionList from "@/components/TransactionsList";
import { useState } from "react";

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-center">
        Personal Finance Dashboard
      </h1>

      <TransactionForm />

      {/* Month & Year Selection */}
      <div className="flex gap-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border p-2 rounded-md"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border p-2 rounded-md"
        >
          {Array.from({ length: 5 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      {/* Expense and Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
        <ExpenseChart
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
        <CategoryPieChart
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
        {/* Budget vs. Actual Spending Chart */}
        <BudgetComparisonChart
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>

      <SpendingInsights
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />

      <TransactionList />
      <BudgetForm />
    </div>
  );
}
