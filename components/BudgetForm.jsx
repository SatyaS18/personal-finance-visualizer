"use client";
import { useState, useEffect } from "react";

const categories = [
  "Food",
  "Shopping",
  "Transport",
  "Entertainment",
  "Bills",
  "Health",
  "Other",
];

export default function BudgetForm() {
  const [budgets, setBudgets] = useState({});
  const [newBudget, setNewBudget] = useState({});
  const [error, setError] = useState("");

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

  const handleBudgetUpdate = async (category) => {
    if (!newBudget[category] || newBudget[category] <= 0) {
      setError("Budget must be a positive number.");
      return;
    }

    const response = await fetch("/api/budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, budget: newBudget[category] }),
    });

    if (response.ok) {
      const updatedBudget = await response.json();
      setBudgets((prev) => ({
        ...prev,
        [updatedBudget.category]: updatedBudget.budget,
      }));
      setNewBudget((prev) => ({ ...prev, [category]: "" }));
      setError("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Set Monthly Budgets</h2>
      {error && <p className="text-red-500">{error}</p>}
      {categories.map((category) => (
        <div
          key={category}
          className="flex justify-between items-center py-2 gap-2"
        >
          <span className="font-medium w-24">{category}</span>
          <input
            type="number"
            value={newBudget[category] || ""}
            onChange={(e) =>
              setNewBudget({ ...newBudget, [category]: e.target.value })
            }
            className="border p-1 w-20 rounded text-center"
          />
          <button
            onClick={() => handleBudgetUpdate(category)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Set
          </button>
        </div>
      ))}
    </div>
  );
}
