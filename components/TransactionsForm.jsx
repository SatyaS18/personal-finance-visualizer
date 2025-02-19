"use client";
import { useState, useContext } from "react";
import { TransactionContext } from "@/context/TransactionContext";

const categories = [
  "Food",
  "Shopping",
  "Transport",
  "Entertainment",
  "Bills",
  "Health",
  "Other",
];

export default function TransactionForm() {
  const { setTransactions } = useContext(TransactionContext);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!amount || !description || !category || !date) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Submitting Transaction:", {
      amount,
      description,
      category,
      date,
    });

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, description, category, date }),
    });

    if (response.ok) {
      const newTransaction = await response.json();
      setTransactions((prev) => [newTransaction, ...prev]);
      setAmount("");
      setDescription("");
      setCategory(categories[0]);
      setDate("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded-lg flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold">Add Transaction</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Add Transaction
      </button>
    </form>
  );
}
