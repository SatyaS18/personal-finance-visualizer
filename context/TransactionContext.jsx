"use client";
import { createContext, useState, useEffect } from "react";

export const TransactionContext = createContext(); // Named export for context

export function TransactionProvider({ children }) {
  // Named export for provider
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");
        const data = await response.json();

        console.log("Transactions fetched in Context:", data);

        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
}
