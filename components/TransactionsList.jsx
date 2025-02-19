"use client";
import { useContext, useState } from "react";
import { TransactionContext } from "@/context/TransactionContext";

export default function TransactionList() {
  const { transactions, setTransactions } = useContext(TransactionContext);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    amount: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState("");

  const validateEdit = () => {
    if (!editData.amount || !editData.description || !editData.date) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(editData.amount) || editData.amount <= 0) {
      setError("Amount must be a positive number.");
      return false;
    }
    if (editData.description.length < 3) {
      setError("Description must be at least 3 characters long.");
      return false;
    }
    const selectedDate = new Date(editData.date);
    const today = new Date();
    if (selectedDate > today) {
      setError("Date cannot be in the future.");
      return false;
    }
    setError(""); // Clear error if validation passes
    return true;
  };

  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };

  const handleEdit = (tx) => {
    setEditId(tx._id);
    setEditData({
      amount: tx.amount,
      description: tx.description,
      date: tx.date.split("T")[0],
    });
  };

  const handleSaveEdit = async (id) => {
    if (!validateEdit()) return;

    const response = await fetch(`/api/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    if (response.ok) {
      const updatedTransaction = await response.json();
      setTransactions((prev) =>
        prev.map((t) => (t._id === id ? updatedTransaction : t))
      );
      setEditId(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="divide-y divide-gray-200">
        {transactions.map((tx) => (
          <li
            key={tx._id}
            className="flex justify-between items-center py-3 border-b"
          >
            {editId === tx._id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({ ...editData, amount: e.target.value })
                  }
                  className="border p-1 rounded"
                />
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="border p-1 rounded"
                />
                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                  className="border p-1 rounded"
                />
                <button
                  onClick={() => handleSaveEdit(tx._id)}
                  className="text-green-500"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium">
                  {tx.description} -{" "}
                  <span className="text-blue-500 mr-4">${tx.amount}</span>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(tx)}
                    className="text-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
