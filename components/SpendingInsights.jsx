"use client";
import { useContext } from "react";
import { TransactionContext } from "@/context/TransactionContext";

export default function SpendingInsights() {
  const { transactions } = useContext(TransactionContext);

  const totalSpent = transactions.reduce(
    (acc, tx) => acc + Number(tx.amount),
    0
  );
  const highestSpending = transactions.reduce(
    (max, tx) => (tx.amount > max.amount ? tx : max),
    transactions[0] || {}
  );
  const mostSpentCategory = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const highestCategory = Object.entries(mostSpentCategory).reduce(
    (max, [category, amount]) =>
      amount > max.amount ? { category, amount } : max,
    { category: "", amount: 0 }
  );

  return (
    <div className="max-w-md mx-auto mt-6 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Spending Insights</h2>
      <p>
        Total Spent: <b>${totalSpent}</b>
      </p>
      <p>
        Highest Expense: {highestSpending.description} -{" "}
        <b>${highestSpending.amount}</b>
      </p>
      <p>
        Most Spent Category: {highestCategory.category} -{" "}
        <b>${highestCategory.amount}</b>
      </p>
    </div>
  );
}
